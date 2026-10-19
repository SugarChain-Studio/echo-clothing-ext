/**
 * 基于 WebGL2 的离屏渲染器，用于绘制角色动态部件（衣物、机关、液体等）。
 *
 * 特性：
 * - 可以给图片叠加单色（`drawImage` 的 `color` 选项），通过灰度调色着色器实现；
 * - 可以额外传入一张 alpha 遮罩（`alphaTex`），用它的 alpha 通道裁剪绘制结果，
 *   常用于配合 {@link PartsMask} 处理遮挡关系；
 * - 同一个画布复用一个渲染器实例（挂在 `canvas.__glRenderer` 上），
 *   以便复用着色器程序、顶点缓冲和纹理缓存。
 *
 * 颜色/遮罩都通过片元着色器完成，因此绘制结果直接写入 WebGL 画布，
 * 调用方之后可以像普通画布一样使用它（例如作为 `alphaTex` 或绘制到角色画布）。
 */

/**
 * @typedef {Object} GLCanvasExt
 * @property {GLImageRenderer} __glRenderer
 */

/**
 * @typedef {HTMLCanvasElement & Partial<GLCanvasExt>} GLCanvas
 */

/**
 * @typedef {[number, number, number]} Vec3
 */

/**
 * @typedef {[number, number, number, number]} Vec4
 */

/**
 * 判断图片是否适合按对象引用缓存 WebGL 纹理。
 *
 * `TexImageSource` 各类型的可变性不同：
 * - `ImageBitmap` / `VideoFrame`：解码后的不可变快照（仅在 `close()` 后失效），
 *   对象与像素内容一一对应，可以放心缓存；
 * - `HTMLImageElement`：加载完成后内容不再变化，但首次绘制时可能尚未加载完成，
 *   因此命中缓存后仍需重新上传一次；
 * - `HTMLCanvasElement` / `OffscreenCanvas` / `HTMLVideoElement` / `ImageData`：
 *   内容会随时间变化（canvas 重绘、视频换帧、buffer 被改写），缓存纹理会在下次
 *   绘制时读到旧内容，因此不缓存。
 * @param {TexImageSource} img
 * @returns {img is HTMLImageElement | ImageBitmap | VideoFrame}
 */
function shouldCache(img) {
    if (img instanceof HTMLImageElement) return true;
    if (typeof ImageBitmap !== "undefined" && img instanceof ImageBitmap) return true;
    if (typeof VideoFrame !== "undefined" && img instanceof VideoFrame) return true;
    return false;
}

/**
 * 判断图片内容是否是解码后就不再变化的快照：这类图片命中纹理缓存后无需重新上传。
 * @param {HTMLImageElement | ImageBitmap | VideoFrame} img
 * @returns {boolean}
 */
function isImmutable(img) {
    if (typeof ImageBitmap !== "undefined" && img instanceof ImageBitmap) return true;
    if (typeof VideoFrame !== "undefined" && img instanceof VideoFrame) return true;
    return false;
}

export class GLImageRenderer {
    /**
     * 创建（或取回）画布对应的渲染器。
     *
     * 同一画布只会创建一个实例：重复调用会直接返回 `canvas.__glRenderer`。
     * @param {GLCanvas} canvas 目标画布，需要是 WebGL2 可用的 canvas
     */
    constructor(canvas) {
        if (canvas.__glRenderer) return canvas.__glRenderer;

        /** @type {GLCanvas} */
        this.canvas = canvas;

        /** @type {WebGL2RenderingContext} */
        this.gl = canvas.getContext("webgl2", GLDrawGetOptions());

        /**
         * 图片对象 → 已分配的纹理，避免同一张图每次绘制都新建纹理
         * @type {WeakMap<HTMLImageElement | ImageBitmap | VideoFrame, WebGLTexture>}
         */
        this.textureCache = new WeakMap();

        const gl = this.gl;

        // ===== shaders =====

        const vs = `#version 300 es
      in vec2 a_pos;
      in vec2 a_uv;

      uniform vec2 u_resolution;

      out vec2 v_uv;
      out vec2 v_mask_uv;

      void main() {
        vec2 zeroToOne = a_pos / u_resolution;
        vec2 clip = zeroToOne * 2.0 - 1.0;
        gl_Position = vec4(clip * vec2(1, -1), 0, 1);
        v_uv = a_uv;
        v_mask_uv = zeroToOne;
      }
    `;

        // 原样绘制（无颜色修改）
        const fs_plain = `#version 300 es
      precision mediump float;

      in vec2 v_uv;
      in vec2 v_mask_uv;
      uniform sampler2D u_tex;
      uniform sampler2D u_mask;
      uniform float u_colorAlpha;

      out vec4 outColor;

      void main() {
        vec4 texColor = texture(u_tex, v_uv);
        vec4 maskColor = texture(u_mask, v_mask_uv);

        if (texColor.a < 0.01) discard;
        if (maskColor.a < 0.01) discard;

        texColor.a *= maskColor.a * u_colorAlpha;
        outColor = texColor;
      }
    `;

        // 灰度 + 调色
        const fs_color = `#version 300 es
      precision mediump float;

      in vec2 v_uv;
      in vec2 v_mask_uv;

      uniform sampler2D u_tex;
      uniform sampler2D u_mask;
      uniform vec4 u_color;
      uniform float u_colorAlpha;

      out vec4 outColor;

      void main() {
        vec4 texColor = texture(u_tex, v_uv);
        vec4 maskColor = texture(u_mask, v_mask_uv);

        if (texColor.a < 0.01) discard;
        if (maskColor.a < 0.01) discard;

        float t = (texColor.r + texColor.g + texColor.b) / 383.0;

        vec4 c = u_color * vec4(t, t, t, texColor.a * u_colorAlpha);
        c.a *= maskColor.a;

        outColor = c;
      }
    `;

        this.programPlain = this._createProgram(vs, fs_plain);
        this.programColor = this._createProgram(vs, fs_color);

        // 两个程序共用顶点着色器，属性/统一变量位置分别缓存
        this.locPlain = this._getLocations(this.programPlain, false);
        this.locColor = this._getLocations(this.programColor, true);

        /** @type {WebGLBuffer} */
        this.buffer = gl.createBuffer();

        // 1x1 白色纹理，未提供 alphaTex 时用它占位（遮罩 alpha 恒为 1）
        this.whiteTex = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, this.whiteTex);
        gl.texImage2D(
            gl.TEXTURE_2D,
            0,
            gl.RGBA,
            1,
            1,
            0,
            gl.RGBA,
            gl.UNSIGNED_BYTE,
            new Uint8Array([255, 255, 255, 255])
        );

        gl.enable(gl.BLEND);
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

        canvas.__glRenderer = this;
    }

    /**
     * 编译一个着色器。
     * @private
     * @param {number} type `gl.VERTEX_SHADER` 或 `gl.FRAGMENT_SHADER`
     * @param {string} src 着色器源码
     * @returns {WebGLShader}
     */
    _compile(type, src) {
        const gl = this.gl;
        const s = gl.createShader(type);
        gl.shaderSource(s, src);
        gl.compileShader(s);
        return s;
    }

    /**
     * 把顶点着色器与片元着色器链接成一个程序。
     * @private
     * @param {string} vs 顶点着色器源码
     * @param {string} fs 片元着色器源码
     * @returns {WebGLProgram}
     */
    _createProgram(vs, fs) {
        const gl = this.gl;
        const p = gl.createProgram();
        gl.attachShader(p, this._compile(gl.VERTEX_SHADER, vs));
        gl.attachShader(p, this._compile(gl.FRAGMENT_SHADER, fs));
        gl.linkProgram(p);
        return p;
    }

    /**
     * 查询程序里用到的属性与统一变量的位置。
     *
     * 不带着色分支的程序没有 `u_color`，此时返回 `null`。
     * @private
     * @param {WebGLProgram} prog
     * @param {boolean} withColor 是否为调色程序
     */
    _getLocations(prog, withColor) {
        const gl = this.gl;
        return {
            a_pos: gl.getAttribLocation(prog, "a_pos"),
            a_uv: gl.getAttribLocation(prog, "a_uv"),
            u_resolution: gl.getUniformLocation(prog, "u_resolution"),
            u_tex: gl.getUniformLocation(prog, "u_tex"),
            u_mask: gl.getUniformLocation(prog, "u_mask"),
            u_colorAlpha: gl.getUniformLocation(prog, "u_colorAlpha"),
            u_color: withColor ? gl.getUniformLocation(prog, "u_color") : null,
        };
    }

    /**
     * 取得图片对应的纹理，必要时上传并缓存。
     *
     * 命中缓存时：
     * - 不可变快照（`ImageBitmap` / `VideoFrame`）直接复用，无需重新上传；
     * - `HTMLImageElement` 重新上传一次，保证拿到最终图像（首次绘制时可能还没加载完）。
     * @private
     * @param {TexImageSource} img
     * @returns {WebGLTexture}
     */
    _prepareTex(img) {
        const gl = this.gl;

        const should_cache = shouldCache(img);

        if (should_cache) {
            const cachedTex = this.textureCache.get(img);
            if (cachedTex) {
                gl.bindTexture(gl.TEXTURE_2D, cachedTex);
                if (!isImmutable(img)) {
                    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
                }
                return cachedTex;
            }
        }

        const tex = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, tex);

        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);

        if (should_cache) {
            this.textureCache.set(img, tex);
        }

        return tex;
    }

    /**
     * 把绘制区域（左上角与尺寸）写入顶点缓冲。
     * @private
     * @param {number} x
     * @param {number} y
     * @param {number} w
     * @param {number} h
     */
    _setupQuad(x, y, w, h) {
        const gl = this.gl;

        const data = new Float32Array([x, y, 0, 0, x + w, y, 1, 0, x, y + h, 0, 1, x + w, y + h, 1, 1]);

        gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
        gl.bufferData(gl.ARRAY_BUFFER, data, gl.DYNAMIC_DRAW);
    }

    /**
     * 将 BCColor 转换为 GL 可用的颜色数组，如果是 "Default" 则返回 undefined
     * @param {BCColor} color
     */
    static BCColorToGLColor(color) {
        return color === "Default" ? undefined : /** @type {Vec4} */ (GLDrawHexToRGBA(color));
    }

    /**
     * 绘制图片。
     *
     * 传入 `color` 时走调色着色器（灰度 + 单色叠加），否则原样绘制；
     * `alphaTex` 提供额外的透明度遮罩，`colorAlpha` 整体调节不透明度。
     * @param {HTMLCanvasElement | HTMLImageElement | ImageBitmap} image
     * @param {number} x
     * @param {number} y
     * @param {{
     *   color?: Vec3 | Vec4,
     *   colorAlpha?: number,
     *   alphaTex?: HTMLCanvasElement | HTMLImageElement | ImageBitmap
     * }} [opts]
     */
    drawImage(image, x, y, opts = {}) {
        const { color, colorAlpha = 1, alphaTex } = opts;
        const gl = this.gl;

        const useColor = !!color;
        const program = useColor ? this.programColor : this.programPlain;
        const loc = useColor ? this.locColor : this.locPlain;

        gl.useProgram(program);
        gl.viewport(0, 0, this.canvas.width, this.canvas.height);

        this._setupQuad(x, y, image.width, image.height);

        const { a_pos, a_uv } = loc;

        gl.enableVertexAttribArray(a_pos);
        gl.vertexAttribPointer(a_pos, 2, gl.FLOAT, false, 16, 0);

        gl.enableVertexAttribArray(a_uv);
        gl.vertexAttribPointer(a_uv, 2, gl.FLOAT, false, 16, 8);

        const tex0 = this._prepareTex(image);
        const tex1 = alphaTex ? this._prepareTex(alphaTex) : this.whiteTex;

        // NOTE: 在 bind 之前 prepare
        // 因为 prepare 中会进行 bind
        // 避免 activeTexure 后导致绑定到错误的 texture unit 上

        // main tex
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, tex0);
        gl.uniform1i(loc.u_tex, 0);

        // mask
        gl.activeTexture(gl.TEXTURE1);
        gl.bindTexture(gl.TEXTURE_2D, tex1);
        gl.uniform1i(loc.u_mask, 1);

        gl.uniform2f(loc.u_resolution, this.canvas.width, this.canvas.height);
        gl.uniform1f(loc.u_colorAlpha, colorAlpha);

        if (useColor) {
            gl.uniform4f(loc.u_color, color[0], color[1], color[2], 1);
        }

        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    }

    /**
     * 清除指定矩形区域（透明）
     * @param {number} x
     * @param {number} y
     * @param {number} w
     * @param {number} h
     */
    clearRect(x, y, w, h) {
        const gl = this.gl;

        gl.enable(gl.SCISSOR_TEST);
        gl.scissor(x, this.canvas.height - y - h, w, h);

        gl.clearColor(0, 0, 0, 0);
        gl.clear(gl.COLOR_BUFFER_BIT);

        gl.disable(gl.SCISSOR_TEST);
    }

    /**
     * 绘制测试网格，用于调试画布坐标与尺寸。
     * @param {number} [size=50] 单个格子的边长
     */
    drawTestGrid(size = 50) {
        if (!this._gridCanvas) {
            const c = document.createElement("canvas");
            c.width = c.height = size;

            const ctx = c.getContext("2d");
            ctx.fillStyle = "#000";
            ctx.fillRect(0, 0, size, size);

            ctx.strokeStyle = "#0f0";
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(size, size);
            ctx.moveTo(size, 0);
            ctx.lineTo(0, size);
            ctx.stroke();

            this._gridCanvas = c;
        }

        for (let y = 0; y < this.canvas.height; y += size) {
            for (let x = 0; x < this.canvas.width; x += size) {
                this.drawImage(this._gridCanvas, x, y);
            }
        }
    }
}

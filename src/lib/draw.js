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

export class GLImageRenderer {
    /**
     * @param {GLCanvas} canvas
     */
    constructor(canvas) {
        if (canvas.__glRenderer) return canvas.__glRenderer;

        /** @type {GLCanvas} */
        this.canvas = canvas;

        /** @type {WebGL2RenderingContext} */
        this.gl = canvas.getContext("webgl2", GLDrawGetOptions());

        /** @type {WeakMap<HTMLImageElement, WebGLTexture>} */
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

        this.locPlain = this._getLocations(this.programPlain, false);
        this.locColor = this._getLocations(this.programColor, true);

        /** @type {WebGLBuffer} */
        this.buffer = gl.createBuffer();

        // white texture
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
     * @private
     * @param {number} type
     * @param {string} src
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
     * @private
     * @param {string} vs
     * @param {string} fs
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
     * @private
     * @param {WebGLProgram} prog
     * @param {boolean} withColor
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
     * @private
     * @param {TexImageSource} img
     * @returns {WebGLTexture}
     */
    _prepareTex(img) {
        const gl = this.gl;

        if (img instanceof HTMLImageElement) {
            const cachedTex = this.textureCache.get(img);
            if (cachedTex) {
                gl.bindTexture(gl.TEXTURE_2D, cachedTex);
                gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
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

        if (img instanceof HTMLImageElement) {
            this.textureCache.set(img, tex);
        }

        return tex;
    }

    /**
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
     * 绘制图片
     * @param {HTMLCanvasElement | HTMLImageElement} image
     * @param {number} x
     * @param {number} y
     * @param {{
     *   color?: Vec3 | Vec4,
     *   colorAlpha?: number,
     *   alphaTex?: HTMLCanvasElement | HTMLImageElement
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
     * 绘制测试网格
     * @param {number} [size=50]
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

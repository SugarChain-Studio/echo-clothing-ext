function transformScope(ctx, func) {
    ctx.save();
    func();
    ctx.restore();
}

/**
 * @typedef {object} Color
 * @property {number} r - 红色分量 (0-255)
 * @property {number} g - 绿色分量 (0-255)
 * @property {number} b - 蓝色分量 (0-255)
 * @property {number} a - 透明度 (0-255)
 */

/** @type {(a: number, b: number, t: number) => number} */
const lerp = (a, b, t) => a + (b - a) * t;

/**
 * 将颜色代码转换为 Color 对象
 * @param {string} color
 * @returns {Color} 返回一个包含 r, g, b, a 属性的对象
 */
const codeColor = (color) => {
    const hex = color.slice(1);
    return /** @type {Color} */ (
        ["r", "g", "b"].reduce(
            (acc, key, index) => {
                acc[key] = parseInt(
                    hex.length === 3 ? hex[index] + hex[index] : hex.slice(index * 2, index * 2 + 2),
                    16
                );
                return acc;
            },
            { a: hex.length === 8 ? parseInt(hex.slice(6, 8), 16) : 255 }
        )
    );
};

const colorCode = (color) =>
    `#${["r", "g", "b"]
        .map((k) => color[k])
        .map(Math.round)
        .map((v) => v.toString(16).padStart(2, "0"))
        .join("")}${color.a < 255 ? (color.a / 255).toString(16).slice(2, 4) : ""}`;

/**
 * 混合两种颜色
 * @param {Color} color1
 * @param {Color} color2
 * @param {number} ratio
 * @returns {Color}
 */
const colorMix = (color1, color2, ratio) =>
    /** @type {Color} */ (
        ["r", "g", "b", "a"].reduce((acc, key) => {
            acc[key] = lerp(color1[key], color2[key], ratio);
            return acc;
        }, /**@type {Partial<Color>}*/ ({}))
    );

const white = codeColor("#ffffff");
const black = codeColor("#000000");

/**
 * @typedef {(gradient: CanvasGradient) => void} GradientStopFunction
 */

/**
 * @param {string} baseColor
 * @returns {GradientStopFunction}
 */
const gradientStop = (baseColor) => {
    const color = codeColor(baseColor);
    /** @type {[number,string][]} */
    const steps = /** @type {[number, Color|function, ...any[]][]} */ ([
        [0, colorMix, color, white, 0.6],
        [0.2, colorMix, color, white, 0.4],
        [0.35, colorMix, color, white, 0.2],
        [0.5, color],
        [0.8, color],
        [0.95, colorMix, color, black, 0.4],
        [1, colorMix, color, black, 0.6],
    ]).map(([v, x, ...rest]) => [v, colorCode(typeof x === "function" ? x(...rest) : x)]);
    return (gradient) => steps.forEach(([stop, color]) => gradient.addColorStop(stop, color));
};

/**
 * 计算链条形状上的一个点
 * @param {number} theta
 * @param {number} halfWidth
 * @param {number} radius
 * @returns {{x: number, y: number}}
 */
const chainShapePoint = (theta, halfWidth, radius) => {
    const rSep = Math.cos(Math.atan2(halfWidth, radius));
    const cTheta = Math.cos(theta);
    const sTheta = Math.sin(theta);
    const tTheta = Math.tan(theta);

    if (cTheta < rSep && cTheta > -rSep) {
        return {
            x: (Math.sign(sTheta) * halfWidth) / tTheta,
            y: Math.sign(sTheta) * halfWidth,
        };
    }

    const partr = radius * radius * sTheta * sTheta;
    const partw = halfWidth * halfWidth * cTheta * cTheta;
    return {
        x: (Math.sign(cTheta) * (2 * radius * partw)) / (partr + partw),
        y: (2 * radius * sTheta * partw) / (partr + partw),
    };
};

/**
 * 绘制链条的一个段落
 * @param {CanvasRenderingContext2D} ctx Canvas 渲染上下文
 * @param {object} params
 * @param {number} params.ratio 链条宽度比例，控制链条的宽度与高度的比例
 * @param {{x: number, y: number}} params.startp 链条起点
 * @param {{x: number, y: number}} params.endp 链条终点
 * @param {number} params.thickness 链条的厚度
 * @param {"left" | "right"} params.side 链条的侧面，"left" 或 "right"，先绘制一侧再绘制另一侧，产生链条交错的效果
 * @param { GradientStopFunction} params.gradient 渐变停止函数，用于设置链条的渐变效果
 */
function drawChainSegment(ctx, { startp, endp, ratio, thickness, side, gradient }) {
    const center = { x: (startp.x + endp.x) / 2, y: (startp.y + endp.y) / 2 };
    const vec = { x: endp.x - startp.x, y: endp.y - startp.y };
    const distance = Math.hypot(vec.x, vec.y);
    const rotation = Math.atan2(vec.y, vec.x);
    const radius = (distance + thickness) / 4;
    const hWidth = radius * ratio;

    const rr = [hWidth, radius * 2];
    const rs = [Math.hypot(rr[0] + thickness / 2, rr[1] + thickness / 2), radius * 4 + thickness];
    const hlC = chainShapePoint((-Math.PI * 3) / 4 - rotation, hWidth, radius);
    const hlR = lerp(rs[0], rs[1], (Math.hypot(hlC.x, hlC.y) - rr[0]) / (rr[1] - rr[0]));
    const hlGradient = ctx.createRadialGradient(hlC.x, hlC.y, 0, hlC.x, hlC.y, hlR);
    gradient(hlGradient);

    const elp = (x, theta1, theta2) => ctx.ellipse(x, 0, radius, hWidth, 0, theta1, theta2);

    ctx.beginPath();
    transformScope(ctx, () => {
        ctx.translate(center.x, center.y);
        ctx.rotate(rotation);
        if (side === "left") {
            elp(radius, 0, Math.PI / 2);
            elp(-radius, Math.PI / 2, -Math.PI);
        } else {
            elp(-radius, -Math.PI, -Math.PI / 2);
            elp(radius, -Math.PI / 2, 0);
        }
        ctx.strokeStyle = hlGradient;
        ctx.lineWidth = thickness;
        ctx.stroke();
    });
}

/**
 * @typedef {object} ChainStyleParam
 * @property {string} baseColor - 链条基础颜色
 * @property {number} thickness - 链条厚度
 */

/**
 * 绘制链条
 * @param {{x: number, y: number}[]} points
 * @param {ChainStyleParam} param1
 * @returns {(ctx:CanvasRenderingContext2D, side?: "left" | "right" | undefined)=>void}
 */
export function drawChainCurry(points, { baseColor, thickness }) {
    const widthRatio = (i) =>
        0.5 + 0.25 * (Math.cos((i / (points.length - 1)) * Math.PI * 2 * Math.ceil(points.length / 10)) + 1);
    const gradient = gradientStop(baseColor);
    const repeatDraw = (ctx, init, side) => {
        for (let i = init; i < points.length; i += 2)
            drawChainSegment(ctx, {
                startp: points[i - 1],
                endp: points[i],
                ratio: widthRatio(Math.min(i, i - 1)),
                thickness,
                side,
                gradient,
            });
    };

    return (ctx, side) => {
        const orders = { right: [1, 2], left: [2, 1] };
        const defaultSides = ["right", "left"];
        const plan = side
            ? orders[side].map((i) => [i, side])
            : defaultSides.flatMap((s) => orders[s].map((i) => [i, s]));
        plan.forEach(([init, s]) => repeatDraw(ctx, init, s));
    };
}

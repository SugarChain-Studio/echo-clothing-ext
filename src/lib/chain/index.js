import { drawChainCurry } from "./draw";
import { calculateCatenaryPoints } from "./shape";

function distance(p1, p2) {
    const dx = p2.x - p1.x;
    const dy = p2.y - p1.y;
    return Math.hypot(dx, dy);
}

/**
 * @typedef {import("./shape").ChainShapeParam & import("./draw").ChainStyleParam} ChainCanvasCacheState
 */

/**
 * @param {ChainCanvasCacheState | any} oldState
 * @param {ChainCanvasCacheState} inputState
 * @returns {boolean}
 */
function compareState(oldState, inputState) {
    return (
        oldState.start &&
        distance(oldState.start, inputState.start) < 0.5 &&
        oldState.end &&
        distance(oldState.end, inputState.end) < 0.5 &&
        oldState.sagFactor === inputState.sagFactor &&
        oldState.linkSize === inputState.linkSize &&
        oldState.baseColor === inputState.baseColor &&
        oldState.thickness === inputState.thickness
    );
}

export class ChainCanvasCache {
    /**
     * @param {HTMLCanvasElement} canvas
     */
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d");
        /** @type {Partial<ChainCanvasCacheState & {draw: ReturnType<typeof drawChainCurry>}>} */
        this.old = {};
    }

    /**
     * @param {import("./shape").ChainShapeParam} param0
     * @param {import("./draw").ChainStyleParam} param1
     * @returns {HTMLCanvasElement}
     */
    chain(param0, param1) {
        if (!compareState(this.old, { ...param0, ...param1 })) {
            const { points } = calculateCatenaryPoints(param0);
            this.old = { ...param0, ...param1, draw: drawChainCurry(points, param1) };
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.old.draw(this.ctx);
        }
        return this.canvas;
    }
}

export class ChainCanvasCacheWSide {
    /**
     * @param {HTMLCanvasElement} canvasLeft
     * @param {HTMLCanvasElement} canvasRight
     */
    constructor(canvasLeft, canvasRight) {
        this.canvas = { left: canvasLeft, right: canvasRight };
        this.ctx = {
            left: this.canvas.left.getContext("2d"),
            right: this.canvas.right.getContext("2d"),
        };
        /** @type {Partial<ChainCanvasCacheState & {draw: ReturnType<typeof drawChainCurry>}>} */
        this.old = {};
    }

    /**
     * @param {import("./shape").ChainShapeParam} param0
     * @param {import("./draw").ChainStyleParam} param1
     * @param {"left" | "right"} side
     * @returns {HTMLCanvasElement}
     */
    chain(param0, param1, side) {
        if (!compareState(this.old, { ...param0, ...param1 })) {
            const { points } = calculateCatenaryPoints(param0);
            const draw = drawChainCurry(points, param1);
            this.old = { ...param0, ...param1, draw };
            [this.ctx.left, this.ctx.right].forEach((ctx) => {
                ctx.clearRect(0, 0, this.canvas.left.width, this.canvas.left.height);
            });
        }

        if (this.old[side]) {
            return this.canvas[side];
        } else {
            this.old.draw(this.ctx[side], side);
            this.old[side] = true;
            return this.canvas[side];
        }
    }
}

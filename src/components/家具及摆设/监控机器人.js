import { AssetManager } from "../../assetForward";
import { Tools } from "@mod-utils/Tools";
import { createAfterDrawProcess, GLImageRenderer, takeLayerNames } from "../../lib";
import { luziSuffixFixups } from "../../lib/fixups";

/** @type { CustomAssetDefinition} */
const asset = {
    Name: "监控机器人",
    Random: false,
    Top: 100,
    Left: 350,
    Time: 15,
    Fetish: ["Metal"],
    Category: ["SciFi"],
    Effect: [E.UseRemote],
    Audio: "FuturisticApply",
    Priority: 55,
    Difficulty: 60,
    AllowLock: true,
    Prerequisite: ["Collared", "NotSuspended", "NotMounted"],
    ExpressionTrigger: [
        { Name: "Medium", Group: "Blush", Timer: 15 },
        { Name: "Soft", Group: "Eyebrows", Timer: 5 },
    ],
    DynamicBeforeDraw: true,
    DynamicScriptDraw: true,
    DynamicAfterDraw: true,
    DefaultColor: ["#84DBFF", "#B2E8FF"],
    FixedPosition: true,
    Layer: [
        { Top: 0, Left: 0, Name: "绳子", ColorGroup: "绳子", HasImage: false },
        { Top: 0, Left: 0, Name: "绳子光芒", ColorGroup: "绳子", HasImage: false },
        { Name: "眼背景", AllowColorize: false },
        { Name: "眼睛", HasImage: false },
        { Name: "机器人" },
        { Name: "跟随模式", ColorGroup: "模式", AllowTypes: { typed: 1 } },
        { Name: "跟随模式_抓住", ColorGroup: "模式", AllowTypes: { typed: 1 } },
        { Name: "固定模式", ColorGroup: "模式", AllowTypes: { typed: 2 } },
    ],
};

/**
 * @typedef { {X:number,Y:number}} Position
 */

/**
 * @typedef {object} RopeState
 * @property {Position} Start 绳子起点坐标
 * @property {Position} End 绳子终点坐标
 * @property {Position} Control 绳子控制点坐标
 * @property {BCColor} Color 绳子颜色
 * @property {BCColor} LightColor 绳子光芒颜色
 */

/**
 * @param {RopeState} a
 * @param {RopeState} b
 */
function compareRopeState(a, b) {
    return (
        a.Start.X === b.Start.X &&
        a.Start.Y === b.Start.Y &&
        a.End.X === b.End.X &&
        a.End.Y === b.End.Y &&
        a.Color === b.Color &&
        a.LightColor === b.LightColor
    );
}

/**
 * @typedef {object} SurRobotDrawData
 * @property {number} EyeTimer 眼睛下次移动的时间戳
 * @property {Position} TargetOffset 眼睛目标偏移
 * @property {Position} CurOffset 眼睛当前偏移
 * @property {number} UpdateTimer 上次更新的时间戳
 * @property {number} FrameTimer 上次帧切换的时间戳
 * @property {RopeState} ropeState 绳子状态
 * @property {HTMLCanvasElement} ropeCanvas 绘制用的临时画布
 * @property {HTMLCanvasElement} eyeCanvas 绘制用的临时画布
 * @property {GLImageRenderer} eyeRenderer 绘制用的GL渲染器
 */

/** @type {ExtendedItemScriptHookCallbacks.BeforeDraw<TypedItemData, SurRobotDrawData>} */
function beforeDraw(mdata, originalFunction, drawData) {
    const { C, L, Property, PersistentData } = drawData;
    const data = PersistentData();

    if (Property?.TypeRecord?.typed === 1) {
        if (L === "跟随模式" && C.HasEffect("IsLeashed")) {
            return { Opacity: 0 };
        }
        if (L === "跟随模式_抓住" && !C.HasEffect("IsLeashed")) {
            return { Opacity: 0 };
        }
    }

    /** @type {(now: number) => number} */
    const next = (now) => now + (Math.random() * 10 + 2) * 1000;

    if (L === "眼睛") {
        const now = Date.now();
        data.EyeTimer ??= next(now);
        data.TargetOffset ??= { X: 0, Y: 0 };
        data.CurOffset ??= { X: 0, Y: 0 };
        if (!data.UpdateTimer) {
            data.UpdateTimer = now;
            return;
        }

        const delta = now - data.UpdateTimer;
        data.UpdateTimer = now;

        if (now > data.EyeTimer) {
            data.EyeTimer = next(now);
            const randX = Math.random();
            const randY = Math.random();
            data.TargetOffset = {
                X: (randX * randX - 0.5) * 8,
                Y: (randY * randY - 0.5) * 8,
            };
        }

        const dx = data.TargetOffset.X - data.CurOffset.X;
        const dy = data.TargetOffset.Y - data.CurOffset.Y;

        const hy = Math.hypot(dx, dy);

        if (hy < 0.01) {
            data.CurOffset = data.TargetOffset;
        } else {
            // speed = 6;
            const caphy = Math.min(hy, (6 * delta) / 1000);
            const mx = (dx / hy) * caphy;
            const my = (dy / hy) * caphy;
            data.CurOffset.X += mx;
            data.CurOffset.Y += my;
        }
    }
}

/** @type {ExtendedItemScriptHookCallbacks.ScriptDraw<TypedItemData, SurRobotDrawData>} */
function scriptDraw(mdata, originalFunction, { C, PersistentData }) {
    const data = PersistentData();
    Tools.drawUpdate(C, data);
}

const afterDraw = createAfterDrawProcess("typed", /** @type {SurRobotDrawData} */ ({}))
    .onLayer("绳子", (drawData) => {
        const { C, A, CA, L, Color, GroupName, AlphaMasks, drawCanvas, drawCanvasBlink, PersistentData } = drawData;
        const layer = A.Layer.find((l) => l.Name === L);
        const { fixedYOffset } = CommonDrawComputeDrawingCoordinates(C, A, layer, GroupName);

        const data = PersistentData();
        const canvas = (data.ropeCanvas ??= AnimationGenerateTempCanvas(C, A, 500, 1000 + CanvasUpperOverflow));
        const ctx = data.ropeCanvas.getContext("2d");

        const startX = 250;
        const startY = 225 + CanvasUpperOverflow;
        const endX = 420;
        const endY = 230 + fixedYOffset + CanvasUpperOverflow;
        const controlX = (startX + endX) / 2;
        const controlY = Math.max(startY, endY) + 50;

        const lightLayer = A.Layer.find((l) => l.Name === "绳子光芒");
        if (!lightLayer) return;

        const LightColor = CommonDrawResolveLayerColor(C, CA, lightLayer, GroupName);

        let shouldDrawRope = true;

        const nState = {
            Start: { X: startX, Y: startY },
            End: { X: endX, Y: endY },
            Control: { X: controlX, Y: controlY },
            Color,
            LightColor,
        };

        if (data.ropeState && compareRopeState(data.ropeState, nState)) {
            shouldDrawRope = false;
        }

        data.ropeState = nState;

        if (shouldDrawRope) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const lightColor = CommonDrawResolveLayerColor(C, CA, lightLayer, GroupName);

            ctx.strokeStyle = Color;
            ctx.lineWidth = 5;
            ctx.shadowBlur = 10;
            ctx.shadowColor = lightColor;

            ctx.beginPath();
            ctx.moveTo(startX, startY);
            ctx.quadraticCurveTo(controlX, controlY, endX, endY);
            ctx.stroke();

            ctx.beginPath();
            ctx.arc(startX, startY, ctx.lineWidth / 2, 0, Math.PI * 2);
            ctx.arc(endX, endY, ctx.lineWidth / 2, 0, Math.PI * 2);
            ctx.fillStyle = Color;
            ctx.fill();
        }

        drawCanvas(data.ropeCanvas, 0, 0, AlphaMasks);
        drawCanvasBlink(data.ropeCanvas, 0, 0, AlphaMasks);
    })
    .onLayer(["眼睛"], (drawData) => {
        const { C, A, X, Y, Color, PersistentData, drawCanvas, drawCanvasBlink } = drawData;

        const data = PersistentData();

        const canvas = (data.eyeCanvas ??= AnimationGenerateTempCanvas(C, A, 150, 230));
        const renderer = (data.eyeRenderer ??= new GLImageRenderer(canvas));

        Tools.getAssetImageThen(drawData).then((img) => {
            const color = GLImageRenderer.BCColorToGLColor(Color);
            renderer.clearRect(0, 0, canvas.width, canvas.height);
            renderer.drawImage(img, data.CurOffset.X, data.CurOffset.Y, { color });
            drawCanvas(canvas, X, Y);
            drawCanvasBlink(canvas, X, Y);
        });
    });

/** @type {TypedItemConfig} */
const extended = {
    Archetype: ExtendedArchetype.TYPED,
    DrawImages: false,
    Options: [
        {
            Name: "巡逻模式",
            Property: {},
        },
        {
            Name: "跟随模式",
            Property: {
                Effect: [E.Leash],
            },
        },
        {
            Name: "固定模式",
            Property: {
                Effect: [E.Tethered, E.IsLeashed, E.IsChained, E.MapImmobile],
            },
        },
    ],
    ChangeWhenLocked: false,
    ScriptHooks: {
        BeforeDraw: beforeDraw,
        ScriptDraw: scriptDraw,
        ...afterDraw.hooks(),
    },
};

/** @type {Translation.Dialog} */
const assetStrings = {
    CN: {
        Select: "选择模式",
        跟随模式: "跟随模式",
        巡逻模式: "巡逻模式",
        固定模式: "固定模式",
        Set跟随模式: "SourceCharacter将TargetCharacter的监控机器人设置为跟随牵引目标移动。",
        Set巡逻模式: "SourceCharacter将TargetCharacter的监控机器人设置为自由巡逻移动。",
        Set固定模式: "SourceCharacter将TargetCharacter的监控机器人设置为固定在当前位置。",
    },
    EN: {
        Select: "Select Mode",
        跟随模式: "Follow Mode",
        巡逻模式: "Patrol Mode",
        固定模式: "Fixed Mode",
        Set跟随模式: "SourceCharacter set the surveillance robot of TargetCharacter to follow leashing target.",
        Set巡逻模式: "SourceCharacter set the surveillance robot of TargetCharacter to patrol freely.",
        Set固定模式: "SourceCharacter set the surveillance robot of TargetCharacter to stay in place.",
    },
};

const translation = {
    CN: "监控机器人",
    EN: "Surveillance Robot",
};

const layerNames = {
    CN: {
        ...takeLayerNames(asset),
        绳子: "牵引光束",
        绳子光芒: "牵引光束发光",
        跟随模式_抓住: "跟随模式(抓住)",
    },
    EN: {
        绳子: "Leash Beam",
        绳子光芒: "Leash Beam Glow",
        模式: "Mode",
        机器人: "Robot",
        跟随模式: "Follow Mode",
        跟随模式_抓住: "Follow Mode (Grab)",
        固定模式: "Fixed Mode",
    },
};

export default function () {
    AssetManager.addAssetWithConfig("ItemNeckRestraints", asset, {
        translation,
        layerNames,
        assetStrings,
        extended,
    });
    luziSuffixFixups("ItemNeckRestraints", asset.Name);
}

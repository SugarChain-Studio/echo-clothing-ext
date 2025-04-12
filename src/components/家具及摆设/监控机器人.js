import { AssetManager } from "../../assetForward";
import { HookManager } from "@sugarch/bc-mod-hook-manager";
import { Tools } from "@mod-utils/Tools";
import { takeLayerNames } from "../../utils";

/** @type { CustomAssetDefinition} */
const asset = {
    Name: "监控机器人_Luzi",
    Random: false,
    Top: 100,
    Left: 350,
    Value: -1,
    Time: 15,
    Fetish: ["Metal"],
    Category: ["SciFi"],
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
        {
            Top: 0,
            Left: 0,
            Name: "绳子",
            ColorGroup: "绳子",
            HasImage: false,
        },
        {
            Top: 0,
            Left: 0,
            Name: "绳子光芒",
            ColorGroup: "绳子",
            HasImage: false,
        },
        {
            Name: "眼背景",
            AllowColorize: false,
        },
        {
            Name: "眼睛",
            HasImage: false,
            AllowColorize: false,
        },
        {
            Name: "机器人",
        },
        {
            Name: "跟随模式",
            ColorGroup: "模式",
            AllowTypes: { typed: 1 },
        },
        {
            Name: "跟随模式_抓住",
            ColorGroup: "模式",
            AllowTypes: { typed: 1 },
        },
        {
            Name: "固定模式",
            ColorGroup: "模式",
            AllowTypes: { typed: 2 },
        },
    ],
};

/**
 * @typedef { {X:number,Y:number}} Position
 * @typedef { { EyeTimer:number, TargetOffset: Position, CurOffset:Position, UpdateTimer:number, FrameTimer:number }} DataType
 */

/** @type {ExtendedItemCallbacks.BeforeDraw<DataType>} */
function beforeDraw(drawData) {
    const { C, A, L, X, Y, Property, PersistentData, drawCanvas, drawCanvasBlink } = drawData;
    const Data = PersistentData();

    if (Property?.TypeRecord?.typed === 1) {
        if (L === "跟随模式" && C.HasEffect("IsLeashed")) {
            return { Opacity: 0 };
        }
        if (L === "跟随模式_抓住" && !C.HasEffect("IsLeashed")) {
            return { Opacity: 0 };
        }
    }

    const next = (now) => now + (Math.random() * 10 + 2) * 1000;

    if (L === "眼睛") {
        const now = Date.now();
        if (!Data.EyeTimer) Data.EyeTimer = next(now);
        if (!Data.TargetOffset) Data.TargetOffset = { X: 0, Y: 0 };
        if (!Data.CurOffset) Data.CurOffset = { X: 0, Y: 0 };
        if (!Data.UpdateTimer) {
            Data.UpdateTimer = now;
            return;
        }

        const delta = now - Data.UpdateTimer;
        Data.UpdateTimer = now;

        if (now > Data.EyeTimer) {
            Data.EyeTimer = next(now);
            const randX = Math.random();
            const randY = Math.random();
            Data.TargetOffset = {
                X: (randX * randX - 0.5) * 8,
                Y: (randY * randY - 0.5) * 8,
            };
        }

        const canvas = AnimationGenerateTempCanvas(C, A, 150, 230);
        const layerSrc = Tools.getAssetURL(drawData);

        const dx = Data.TargetOffset.X - Data.CurOffset.X;
        const dy = Data.TargetOffset.Y - Data.CurOffset.Y;

        const hy = Math.hypot(dx, dy);

        if (hy < 0.01) {
            Data.CurOffset = Data.TargetOffset;
        } else {
            // speed = 6;
            const caphy = Math.min(hy, (6 * delta) / 1000);
            const mx = (dx / hy) * caphy;
            const my = (dy / hy) * caphy;
            Data.CurOffset.X += mx;
            Data.CurOffset.Y += my;
        }

        DrawImageEx(layerSrc, canvas.getContext("2d"), Data.CurOffset.X, Data.CurOffset.Y);

        drawCanvas(canvas, X, Y);
        drawCanvasBlink(canvas, X, Y);
    }
}

/** @type {ExtendedItemCallbacks.ScriptDraw<DataType>} */
function scriptDraw({ C, PersistentData }) {
    const Data = PersistentData();
    Tools.drawUpdate(C, Data);
}

/** @type {ExtendedItemCallbacks.AfterDraw<DataType>} */
function afterDraw(drawData) {
    const { C, A, L, Color, GroupName, AlphaMasks, drawCanvas, drawCanvasBlink } = drawData;
    if (L === "绳子" || L === "绳子光芒") {
        const layer = A.Layer.find((l) => l.Name === L);
        const { fixedYOffset } = CommonDrawComputeDrawingCoordinates(C, A, layer, GroupName);

        const tempCanvs = AnimationGenerateTempCanvas(C, A, 500, 1000 + CanvasUpperOverflow);
        const canvas2d = tempCanvs.getContext("2d");

        if (L === "绳子光芒") canvas2d.globalAlpha = 0.2;
        canvas2d.fillStyle = Color;

        const startX = 250;
        const startY = 225 + CanvasUpperOverflow;
        const endX = 420;
        const endY = 230 + fixedYOffset + CanvasUpperOverflow;

        const controlX = (startX + endX) / 2;
        const controlY = Math.max(startY, endY) + 50;

        canvas2d.beginPath();
        canvas2d.moveTo(startX, startY);
        canvas2d.quadraticCurveTo(controlX, controlY, endX, endY);
        canvas2d.strokeStyle = Color;
        canvas2d.lineWidth = L === "绳子" ? 5 : 15;
        canvas2d.stroke();

        canvas2d.beginPath();
        canvas2d.arc(startX, startY, canvas2d.lineWidth / 2, 0, Math.PI * 2);
        canvas2d.arc(endX, endY, canvas2d.lineWidth / 2, 0, Math.PI * 2);
        canvas2d.fillStyle = Color;
        canvas2d.fill();

        drawCanvas(tempCanvs, 0, 0, AlphaMasks);
        drawCanvasBlink(tempCanvs, 0, 0, AlphaMasks);
    }
}

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
};

/** @type {Translation.Dialog} */
const assetDialogs = {
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

const description = {
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
    HookManager.globalFunction(`AssetsItemNeckRestraints${asset.Name}BeforeDraw`, beforeDraw);
    HookManager.globalFunction(`AssetsItemNeckRestraints${asset.Name}ScriptDraw`, scriptDraw);
    HookManager.globalFunction(`AssetsItemNeckRestraints${asset.Name}AfterDraw`, afterDraw);

    AssetManager.addAssetWithConfig("ItemNeckRestraints", asset, {
        description,
        layerNames,
        assetDialogs,
        extended,
    });
}

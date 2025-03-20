import { AssetManager } from "../../assetForward";
import { HookManager } from "@sugarch/bc-mod-hook-manager";
import { DialogTools, Tools } from "@mod-utils/Tools";

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
    DefaultColor: ["#84DBFF", "#B2E8FF"],
    FixedPosition: true,
    Layer: [
        {
            Top: 0,
            Left: 0,
            Name: "绳子",
            PoseMapping: {
                AllFours: "AllFours",
                Hogtied: "Hogtied",
                Kneel: "Kneel",
                KneelingSpread: "Kneel",
                Suspension: PoseType.HIDE,
            },
        },
        {
            Top: 0,
            Left: 0,
            Name: "绳子光芒",
            PoseMapping: {
                AllFours: "AllFours",
                Hogtied: "Hogtied",
                Kneel: "Kneel",
                KneelingSpread: "Kneel",
                Suspension: PoseType.HIDE,
            },
        },
        {
            Name: "眼背景",
            AllowColorize: false,
        },
        {
            Name: "眼睛",
            HasImage: false,
        },
        {
            Name: "机器人",
            AllowColorize: false,
        },
        {
            Name: "跟随模式",
            AllowTypes: { typed: 1 },
        },
        {
            Name: "跟随模式_抓住",
            AllowTypes: { typed: 1 },
        },
        {
            Name: "固定模式",
            AllowTypes: { typed: 2 },
        },
    ],
};

/** @type {TypedItemConfig} */
const config = {
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
const dialog = DialogTools.replicateGroupedItemDialog(["ItemNeckRestraints"], ["监控机器人_Luzi"], {
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
});

/**
 * @typedef { {X:number,Y:number}} Position
 * @typedef { { EyeTimer:number, TargetOffset: Position, CurOffset:Position, UpdateTimer:number, FrameTimer:number }} DataType
 */

export default function () {
    HookManager.globalFunction(
        `AssetsItemNeckRestraints${asset.Name}BeforeDraw`,
        /** @type {ExtendedItemCallbacks.BeforeDraw<DataType>} */ (
            (drawData) => {
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

                if (L === "眼睛")
                    (() => {
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
                    })();
            }
        )
    );

    HookManager.globalFunction(
        `AssetsItemNeckRestraints${asset.Name}ScriptDraw`,
        /** @type {ExtendedItemCallbacks.ScriptDraw<DataType>} */ (
            ({ C, PersistentData }) => {
                const Data = PersistentData();
                Tools.drawUpdate(C, Data);
            }
        )
    );

    AssetManager.addAsset("ItemNeckRestraints", asset, config, {
        CN: "监控机器人",
        EN: "Surveillance Robot",
    });
    AssetManager.addCustomDialog(dialog);
}

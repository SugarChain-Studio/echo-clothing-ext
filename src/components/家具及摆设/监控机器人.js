import AssetManager from "@mod-utils/AssetManager";
import ModManager from "@mod-utils/ModManager";
import { Tools } from "@mod-utils/Tools";

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
const dialog = Tools.replicateTypedItemDialog(["ItemNeckRestraints"], ["监控机器人_Luzi"], {
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

export default function () {
    ModManager.globalFunction(
        `AssetsItemNeckRestraints${asset.Name}BeforeDraw`,
        /** @type {ExtendedItemCallbacks.BeforeDraw} */ (
            ({ C, L, Property }) => {
                if (Property?.TypeRecord?.typed === 1) {
                    if (L === "跟随模式" && C.HasEffect("IsLeashed")) {
                        return { Opacity: 0 };
                    }
                    if (L === "跟随模式_抓住" && !C.HasEffect("IsLeashed")) {
                        return { Opacity: 0 };
                    }
                }
            }
        )
    );

    AssetManager.addAsset("ItemNeckRestraints", asset, config, {
        CN: "监控机器人",
        EN: "Surveillance Robot",
    });
    AssetManager.addCustomDialog(dialog);
}

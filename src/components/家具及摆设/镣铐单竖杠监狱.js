import { AssetManager } from "../../assetForward";
import { Tools } from "@mod-utils/Tools";

/** @type {CustomAssetDefinition} */
const asset = {
    Name: "单监_Luzi",
    Random: false,
    Top: 0,
    Left: 0,
    Difficulty: 4,
    AllowLock: true,
    AllowTighten: true,
    DrawLocks: false,
    RemoveTime: 5,
    Time: 10,
    Effect: [E.Freeze, E.BlockWardrobe, E.Mounted, E.MapImmobile],
    Hide: [],
    Layer: [
        {
            Name: "A_底盘",
            ParentGroup: null,
            Priority: 3,
            ColorGroup: "金属主体",
        },
        {
            Name: "A_柱子伸缩",
            ParentGroup: null,
            Priority: 1,
        },
        {
            Name: "A_阳具",
            ParentGroup: null,
            Priority: 22,
        },
        {
            Name: "A_柱子1",
            ParentGroup: null,
            Priority: 4,
            ColorGroup: "金属主体",
        },
        {
            Name: "A_柱子2",
            ParentGroup: null,
            Priority: 4,
            ColorGroup: "金属主体",
        },
        {
            Name: "A_柱子3",
            ParentGroup: null,
            Priority: 4,
            ColorGroup: "金属主体",
        },

        {
            Name: "上腿杆",
            Priority: 22,
            ParentGroup: "BodyLower",
            PoseMapping: { LegsClosed: "Hide", Spread: "Spread" },
        },
        {
            Name: "下腿杆",
            Priority: 22,
            ParentGroup: "BodyLower",
            PoseMapping: { LegsClosed: "Hide", Spread: "Spread" },
        },
        {
            Name: "左小腿",
            Priority: 22,
            ParentGroup: "BodyLower",
            PoseMapping: { LegsClosed: "LegsClosed", Spread: "Spread" },
        },
        {
            Name: "右小腿",
            Priority: 22,
            ParentGroup: "BodyLower",
            PoseMapping: { LegsClosed: "LegsClosed", Spread: "Spread" },
        },
        {
            Name: "左大腿",
            Priority: 22,
            ParentGroup: "BodyLower",
            PoseMapping: { LegsClosed: "LegsClosed", Spread: "Spread" },
        },
        {
            Name: "右大腿",
            Priority: 22,
            ParentGroup: "BodyLower",
            PoseMapping: { LegsClosed: "LegsClosed", Spread: "Spread" },
        },
    ],
};

const layerNames = {
    CN: {
        A_底盘: "底盘",
        A_柱子伸缩: "柱子伸缩",
        A_阳具: "阳具",
        A_柱子1: "柱子1",
        A_柱子2: "柱子2",
        A_柱子3: "柱子3",

        金属主体: "金属主体",

        上腿杆: "上腿杆",
        下腿杆: "下腿杆",
        左小腿: "左小腿",
        右小腿: "右小腿",
        左大腿: "左大腿",
        右大腿: "右大腿",
    },
    EN: {
        A_底盘: "Base",
        A_柱子伸缩: "Piston",
        A_阳具: "Phallus",
        A_柱子1: "Column1",
        A_柱子2: "Column2",
        A_柱子3: "Column3",

        金属主体: "Metal Body",

        上腿杆: "Upper Leg",
        下腿杆: "Lower Leg",
        左小腿: "Left Calf",
        右小腿: "Right Calf",
        左大腿: "Left Thigh",
        右大腿: "Right Thigh",
    },
};

/**
 * @typedef {Object} SOBPData
 * @property {number} FrameTimer
 */

/** @type {ExtendedItemScriptHookCallbacks.ScriptDraw<ModularItemData, SOBPData>} */
function scriptDraw(data, originalFunction, { C, Item, PersistentData }) {
    const Data = PersistentData();
    const type = Item?.Property?.TypeRecord;
    // Obviously, type.d !== 0 is redundant, but it is here for clarity.
    if (type?.d && type.d !== 0) Tools.drawUpdate(C, Data);
}

/** @type {RectTuple} */
const mask = [200, 423, 100, 100];

const lFunction = (freq) => {
    const time = Date.now();
    const value = (1.2 * (Math.sin(((time * freq) / 1000) * 2 * Math.PI) + 1)) / 2;
    return Math.max(0, Math.min(1, value));
};

/** @type {ExtendedItemScriptHookCallbacks.BeforeDraw<ModularItemData, SOBPData>} */
function beforeDraw(data, originalFunction, { L, Y, Property }) {
    if (L === "A_柱子伸缩" || L === "A_阳具") {
        const type = Property?.TypeRecord;
        if (type && type.d) {
            if (type.d === 0) return { Y };
            const dY = (() => {
                const minDY = 60;
                const len = 40;
                switch (type.d) {
                    case 1:
                        return minDY + len;
                    case 2:
                        return minDY + len * lFunction(0.2);
                    case 3:
                        return minDY + len * lFunction(0.5);
                    case 4:
                        return minDY + len * lFunction(0.8);
                    case 5:
                        return minDY + len * lFunction(1.2);
                    default:
                        return 0;
                }
            })();
            return { Y: Y - dY, AlphaMasks: [mask] };
        }
    }
}

/** @type {AssetArchetypeConfig} */
const extended = {
    Archetype: ExtendedArchetype.MODULAR,
    ChangeWhenLocked: false,
    ChatTags: Tools.CommonChatTags(),
    ScriptHooks: {
        ScriptDraw: scriptDraw,
        BeforeDraw: beforeDraw,
    },
    Modules: [
        {
            Name: "腿",
            DrawImages: false,
            Key: "o",
            Options: [
                { Property: { SetPose: ["BaseLower"] } },
                { Property: { SetPose: ["LegsClosed"] } },
                { Property: { SetPose: ["Spread"] } },
            ],
        },
        {
            Name: "活塞",
            DrawImages: false,
            Key: "d",
            Options: [
                {},
                {
                    Property: { Intensity: 0, Effect: ["Egged"], Difficulty: 5 },
                },
                {
                    Property: { Intensity: 1, Effect: ["Egged", "Vibrating"], Difficulty: 4 },
                },
                {
                    Property: { Intensity: 2, Effect: ["Egged", "Vibrating"], Difficulty: 4 },
                },
                {
                    Property: { Intensity: 3, Effect: ["Egged", "Vibrating"], Difficulty: 4 },
                },
            ],
        },
    ],
};

/** @type {Translation.Dialog} */
const assetStrings = {
    CN: {
        SelectBase: "选择配置",
        Module腿: "腿部姿势",
        Module活塞: "活塞运动",

        Select腿: "选择腿部姿势",
        Optiono0: "默认",
        Optiono1: "并腿",
        Optiono2: "开腿",

        Seto0: "SourceCharacter通过AssetName将DestinationCharacter腿部姿势设置为基础姿势。",
        Seto1: "SourceCharacter通过AssetName将DestinationCharacter腿部姿势设置为并腿。",
        Seto2: "SourceCharacter通过AssetName将DestinationCharacter腿部姿势设置为开腿。",

        Select活塞: "选择活塞运动",
        Optiond0: "停在底部",
        Optiond1: "停在顶部",
        Optiond2: "低速",
        Optiond3: "中速",
        Optiond4: "高速",

        Setd0: "SourceCharacter将DestinationCharacterAssetName活塞运动设置为停在底部。",
        Setd1: "SourceCharacter将DestinationCharacterAssetName活塞运动设置为停在顶部。",
        Setd2: "SourceCharacter将DestinationCharacterAssetName活塞运动设置为低速。",
        Setd3: "SourceCharacter将DestinationCharacterAssetName活塞运动设置为中速。",
        Setd4: "SourceCharacter将DestinationCharacterAssetName活塞运动设置为高速。",
    },
    EN: {
        SelectBase: "Select Configuration",
        Module腿: "Leg Pose",
        Module活塞: "Piston Movement",

        Select腿: "Select Leg Pose",
        Optiono0: "Default",
        Optiono1: "Legs Closed",
        Optiono2: "Legs Spread",

        Seto0: "SourceCharacter makes TargetCharacter stand in base pose using AssetName.",
        Seto1: "SourceCharacter makes TargetCharacter close legs using AssetName.",
        Seto2: "SourceCharacter makes TargetCharacter spread legs using AssetName.",

        Select活塞: "Select Piston Movement",
        Optiond0: "Stop at Bottom",
        Optiond1: "Stop at Top",
        Optiond2: "Slow",
        Optiond3: "Medium",
        Optiond4: "Fast",
        Optiond5: "Very Fast",

        Setd0: "SourceCharacter sets DestinationCharacter AssetName piston movement to stop at bottom.",
        Setd1: "SourceCharacter sets DestinationCharacter AssetName piston movement to stop at top.",
        Setd2: "SourceCharacter sets DestinationCharacter AssetName piston movement to slow.",
        Setd3: "SourceCharacter sets DestinationCharacter AssetName piston movement to medium.",
        Setd4: "SourceCharacter sets DestinationCharacter AssetName piston movement to fast.",
    },
};

const translation = {
    CN: "镣铐单竖杠监狱",
    EN: "Shackled One-Bar Prison",
};

export default function () {
    AssetManager.addAssetWithConfig("ItemDevices", asset, { extended, translation, layerNames, assetStrings });
}

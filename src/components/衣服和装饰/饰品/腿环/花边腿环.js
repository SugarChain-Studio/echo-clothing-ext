import { AssetManager } from "../../../assetForward";

/** @type {CustomAssetDefinition} */
const asset = {
    Name: "花边腿环",
    Random: false,
    Gender: "F",
    Top: 462,
    DefaultColor: ["Default", "#E3E3E3", "#181818", "#3F3F3F", "Default", "#E3E3E3", "#181818", "#3F3F3F"],
    Left: {
        BaseLower: 0,
        Kneel: 0,
        KneelingSpread: 0,
        LegsClosed: 0,
        LegsOpen: 0,
        Spread: 0,
    },
    Priority: 22,
    PoseMapping: {
        Kneel: "Kneel",
        LegsClosed: "LegsClosed",
        Spread: "Spread",
        KneelingSpread: "KneelingSpread",
        Hogtied: PoseType.HIDE,
        AllFours: PoseType.HIDE,
    },
    Layer: [
        { Name: "左腿阴影", ColorGroup: "阴影", AllowTypes: { typed: [0, 2] } },
        { Name: "左腿花边", ColorGroup: "花边", AllowTypes: { typed: [0, 2] } },
        { Name: "左腿环", ColorGroup: "环", AllowTypes: { typed: [0, 2] } },
        { Name: "左腿蝴蝶结", ColorGroup: "蝴蝶结", AllowTypes: { typed: [0, 2] } },

        { Name: "右腿阴影", ColorGroup: "阴影", AllowTypes: { typed: [1, 2] } },
        { Name: "右腿花边", ColorGroup: "花边", AllowTypes: { typed: [1, 2] } },
        { Name: "右腿环", ColorGroup: "环", AllowTypes: { typed: [1, 2] } },
        { Name: "右腿蝴蝶结", ColorGroup: "蝴蝶结", AllowTypes: { typed: [1, 2] } },
    ],
};

const layerNames = {
    EN: {
        左腿阴影: "Left Leg Shadow",
        左腿花边: "Left Leg Lace",
        左腿环: "Left Leg Ring",
        左腿蝴蝶结: "Left Leg Bow",

        右腿阴影: "Right Leg Shadow",
        右腿花边: "Right Leg Lace",
        右腿环: "Right Leg Ring",
        右腿蝴蝶结: "Right Leg Bow",
    },
};

const extended = {
    Archetype: ExtendedArchetype.TYPED,
    DrawImages: false,
    Options: [{ Name: "左腿" }, { Name: "右腿" }, { Name: "双腿" }],
};

const translation = {
    CN: "花边腿环",
    EN: "Lace Leg Ring",
};

/** @type {Translation.Dialog} */
const assetStrings = {
    CN: {
        Select: "选择",
        左腿: "左腿",
        右腿: "右腿",
        双腿: "都有",
    },
    EN: {
        Select: "Select",
        左腿: "Left leg",
        右腿: "Right leg",
        双腿: "Both",
    },
};

export default function () {
    AssetManager.addAssetWithConfig("Garters", asset, { extended, translation, layerNames, assetStrings });
}

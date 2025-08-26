import { AssetManager } from "../../../assetForward";

/** @type {CustomAssetDefinition} */
const asset = {
    Name: "蕾丝边_Luzi",
    Random: false,
    Gender: "F",
    Top: 0,
    Left: 0,
    Priority: 22,
    Extended: true,
    PoseMapping: {
        Kneel: "Kneel",
        LegsClosed: "LegsClosed",
        Spread: "Spread",
        KneelingSpread: "KneelingSpread",
        Hogtied: PoseType.HIDE,
        AllFours: PoseType.HIDE,
    },
    Layer: [
        { Name: "带子" },
        {
            Name: "左腿",
            HasImage: false,
            HideColoring: true,
            AllowTypes: { typed: [1] },
            Alpha: [
                {
                    Group: ["Garters"],
                    Masks: [[251, 0, 250, 1000]],
                },
            ],
        },
        {
            Name: "右腿",
            HasImage: false,
            HideColoring: true,
            AllowTypes: { typed: [2] },
            Alpha: [
                {
                    Group: ["Garters"],
                    Masks: [[0, 0, 250, 1000]],
                },
            ],
        },
    ],
};

const layerNames = {
    EN: {
        带子: "Strap",
        左腿: "Left Leg",
        右腿: "Right Leg",
    },
};

const extended = {
    Archetype: ExtendedArchetype.TYPED,
    DrawImages: false,
    Options: [{ Name: "双腿" }, { Name: "左腿" }, { Name: "右腿" }],
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

/** @type {Translation.Entry} */
const translation = {
    CN: "蕾丝边",
    EN: "Lace Leg Strap",
};

export default function () {
    AssetManager.addAssetWithConfig("Garters", asset, { extended, translation, layerNames, assetStrings });
}

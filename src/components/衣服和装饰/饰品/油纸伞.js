import { AssetManager } from "../../../assetForward";

/** @type { CustomAssetDefinition } */
const asset = {
    Name: "油纸伞",
    Random: false,
    Top: -100,
    Left: -150,
    Difficulty: -10,
    ParentGroup: {},
    PoseMapping: {
        Yoked: PoseType.HIDE,
        OverTheHead: PoseType.HIDE,
        BackBoxTie: PoseType.HIDE,
        BackElbowTouch: PoseType.HIDE,
        BackCuffs: PoseType.HIDE,
        Hogtied: PoseType.HIDE,
        AllFours: PoseType.HIDE,
        TapedHands: PoseType.HIDE,
    },
    DefaultColor: ["#776451", "Default", "#776451", "#C3C0BA"],
    Layer: [
        { Name: "伞柄", Priority: 55 },
        { Name: "伞暗面", Priority: 2 },
        { Name: "伞骨", Priority: 2 },
        { Name: "伞面无图案", Priority: 1, AllowTypes: { typed: 0 } },
        { Name: "伞面花1", Priority: 1, AllowTypes: { typed: 1 } },
        { Name: "伞面花2", Priority: 1, AllowTypes: { typed: 2 } },
        { Name: "伞面山水", Priority: 1, AllowTypes: { typed: 3 } },
        { Name: "伞面竹子", Priority: 1, AllowTypes: { typed: 4 } },
        { Name: "伞面卡通", Priority: 1, AllowTypes: { typed: 5 } },
    ],
};

const layerNames = {
    EN: {
        伞柄: "Umbrella Handle",
        伞暗面: "Umbrella Dark Side",
        伞骨: "Umbrella Ribs",
        伞面无图案: "Umbrella No Pattern",
        伞面花1: "Umbrella Flower 1",
        伞面花2: "Umbrella Flower 2",
        伞面山水: "Umbrella Landscape",
        伞面竹子: "Umbrella Bamboo",
        伞面卡通: "Umbrella Cartoon",
    },
};

/** @type {AssetArchetypeConfig} */
const extended = {
    Archetype: ExtendedArchetype.TYPED,
    DrawImages: false,
    Options: [
        { Name: "无图案" },
        { Name: "花1" },
        { Name: "花2" },
        { Name: "山水" },
        { Name: "竹子" },
        { Name: "卡通" },
    ],
};

/** @type {Translation.Dialog} */
const assetStrings = {
    CN: {
        Select: "选择图案",
        无图案: "无图案",
        花1: "花1",
        花2: "花2",
        山水: "山水",
        竹子: "竹子",
        卡通: "卡通",
        Set无图案: "SourceCharacter为TargetCharacter换了一把没有图案的油纸伞。",
        Set花1: "SourceCharacter为TargetCharacter换了一把花图案的油纸伞。",
        Set花2: "SourceCharacter为TargetCharacter换了一把花图案的油纸伞。",
        Set山水: "SourceCharacter为TargetCharacter换了一把山水图案的油纸伞。",
        Set竹子: "SourceCharacter为TargetCharacter换了一把竹子图案的油纸伞。",
        Set卡通: "SourceCharacter为TargetCharacter换了一把卡通图案的油纸伞。",
    },
    EN: {
        Select: "Select Pattern",
        无图案: "No Pattern",
        花1: "Flower 1",
        花2: "Flower 2",
        山水: "Landscape",
        竹子: "Bamboo",
        卡通: "Cartoon",
        Set无图案: "SourceCharacter changes TargetCharacter to an oil-paper umbrella with no pattern.",
        Set花1: "SourceCharacter changes TargetCharacter to an oil-paper umbrella with a flower pattern.",
        Set花2: "SourceCharacter changes TargetCharacter to an oil-paper umbrella with a flower pattern.",
        Set山水: "SourceCharacter changes TargetCharacter to an oil-paper umbrella with a landscape pattern.",
        Set竹子: "SourceCharacter changes TargetCharacter to an oil-paper umbrella with a bamboo pattern.",
        Set卡通: "SourceCharacter changes TargetCharacter to an oil-paper umbrella with a cartoon pattern.",
    },
};

const translation = {
    CN: "油纸伞",
    EN: "Oil-paper umbrella",
};

export default function () {
    AssetManager.addAssetWithConfig("ItemHandheld", asset, { translation, layerNames, extended, assetStrings });
}

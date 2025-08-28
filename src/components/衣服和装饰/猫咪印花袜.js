import { AssetManager } from "../../assetForward";
import { SockLRTool } from "../../lib/sockLR";

/** @type {CustomAssetDefinition} */
const asset = {
    Name: "猫袜",
    Random: false,
    Top: 500,
    Left: { "": 100, "KneelingSpread": 130 },
    DynamicGroupName: "Socks",
    Layer: [
        { Name: "基础" },
        { Name: "红" },
        { Name: "差分1", AllowTypes: { typed: [0, 1] } },
        { Name: "差分2", AllowTypes: { typed: [2, 4] } },
        { Name: "差分3", AllowTypes: { typed: [0, 3, 4] } },
    ],
};

/** @type {Translation.Entry} */
const translation = {
    CN: "可爱猫咪印花袜",
    EN: "Cute Kitten Printed Socks",
};

const layerNames = {
    CN: {
        基础: "底色",
        红: "耳朵",
        差分1: "猫图案",
        差分2: "蝴蝶结",
        差分3: "猫尾巴",
    },
    EN: {
        基础: "Base Color",
        红: "Ears",
        差分1: "Cat Pattern",
        差分2: "Bow",
        差分3: "Cat Tail",
    },
};

/** @type {TypedItemConfig} */
const extended = {
    Archetype: ExtendedArchetype.TYPED,
    DrawImages: false,
    Options: [{ Name: "猫和尾" }, { Name: "猫" }, { Name: "蝴蝶结" }, { Name: "尾" }, { Name: "蝴蝶结和尾" }],
};

const assetStrings = {
    CN: {
        Select: "选择袜子样式",
        猫和尾: "猫图案和尾巴",
        猫: "仅猫图案",
        蝴蝶结: "仅蝴蝶结",
        尾: "仅尾巴",
        蝴蝶结和尾: "蝴蝶结和尾巴",
    },
    EN: {
        Select: "Select sock style",
        猫和尾: "Cat pattern and tail",
        猫: "Only cat pattern",
        蝴蝶结: "Only bow",
        尾: "Only tail",
        蝴蝶结和尾: "Bow and tail",
    },
};

export default function () {
    AssetManager.addAssetWithConfig(["Socks", "SuitLower"], asset, { translation, layerNames, extended, assetStrings });
    SockLRTool.createSockLR(asset).forEach(([key, value]) => {
        AssetManager.addAssetWithConfig(key, value, { translation, layerNames, extended, assetStrings });
    });
}

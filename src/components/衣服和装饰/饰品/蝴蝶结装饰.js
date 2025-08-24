import { AssetManager } from "../../../assetForward";
import { ExtendedTools } from "../../../lib";

/** @type { CustomAssetDefinition }} */
const asset = {
    Name: "蝴蝶结装饰",
    Random: false,
    Left: 100,
    Top: 450,
    ParentGroup: {},
    DefaultColor: [
        "#7d7d7d", // 右_底色 (bdbdbd * 0.66)
        "#92a3a8", // 右_装饰 (ddf7ff * 0.66)
        "#a888a7", // 右_本体 (ffcefd * 0.66)
        "#a8a580", // 右_装饰环 (fffac2 * 0.66)
        "#7699a8", // 右_装饰珠 (b2e7ff * 0.66)
        "#7d7d7d", // 左_底色 (bdbdbd * 0.66)
        "#92a3a8", // 左_装饰 (ddf7ff * 0.66)
        "#a888a7", // 左_本体 (ffcefd * 0.66)
        "#a8a580", // 左_装饰环 (fffac2 * 0.66)
        "#7699a8", // 左_装饰珠 (b2e7ff * 0.66)
    ],
    Priority: 34,
    Layer: [
        { Name: "右_底色", ColorGroup: "底色" },
        { Name: "右_装饰", ColorGroup: "装饰" },
        { Name: "右_本体", ColorGroup: "本体" },
        { Name: "右_装饰环", ColorGroup: "装饰环" },
        { Name: "右_装饰珠", ColorGroup: "装饰珠" },
        { Name: "左_底色", ColorGroup: "底色" },
        { Name: "左_装饰", ColorGroup: "装饰" },
        { Name: "左_本体", ColorGroup: "本体" },
        { Name: "左_装饰环", ColorGroup: "装饰环" },
        { Name: "左_装饰珠", ColorGroup: "装饰珠" },
    ],
};

/** @type { Translation.Entry } */
const translation = {
    CN: "蝴蝶结装饰",
    EN: "Bow Accessory",
};

/** @type { Translation.Dialog } */
const layerNames = {
    CN: {
        底色: "底色",
        装饰: "装饰",
        本体: "本体",
        装饰环: "装饰环",
        装饰珠: "装饰珠",

        右_底色: "右",
        右_装饰: "右",
        右_本体: "右",
        右_装饰环: "右",
        右_装饰珠: "右",

        左_底色: "左",
        左_装饰: "左",
        左_本体: "左",
        左_装饰环: "左",
        左_装饰珠: "左",
    },
    EN: {
        底色: "Base Color",
        装饰: "Accessory",
        本体: "Body",
        装饰环: "Accessory Ring",
        装饰珠: "Accessory Bead",

        右_底色: "Right",
        右_装饰: "Right",
        右_本体: "Right",
        右_装饰环: "Right",
        右_装饰珠: "Right",

        左_底色: "Left",
        左_装饰: "Left",
        左_本体: "Left",
        左_装饰环: "Left",
        左_装饰珠: "Left",
    },
};

export default function () {
    AssetManager.addAssetWithConfig("ClothAccessory", asset, {
        translation,
        layerNames,
        ...ExtendedTools.createLeftRightBoth(asset, { preset: "both", mirror: true }),
    });
}

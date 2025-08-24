import { AssetManager } from "../../../assetForward";
import { DialogTools } from "@mod-utils/Tools";
import { ExtendedTools } from "../../../lib";

const hairAccShared = {
    Random: false,
    Left: 100,
    Top: 0,
    Priority: 54,
    ParentGroup: {},
};

/** @type {Array<CustomAssetDefinition>}} */
const assets = [
    {
        Name: "发卡1",
        ...hairAccShared,
        DefaultColor: ["#621616", "#621616"],
        Layer: [{ Name: "右" }, { Name: "左" }],
    },
    {
        Name: "发卡2",
        ...hairAccShared,
        DefaultColor: ["#621616", "#621616"],
        Layer: [{ Name: "右" }, { Name: "左" }],
    },
    {
        Name: "X发卡",
        ...hairAccShared,
        DefaultColor: ["#621616", "#621616"],
        Layer: [{ Name: "右" }, { Name: "左" }],
    },
    {
        Name: "心型发卡",
        ...hairAccShared,
        DefaultColor: ["#9B3C5C", "#9B3C5C", "#9B3C5C", "#9B3C5C"],
        Layer: [{ Name: "右夹子" }, { Name: "右心" }, { Name: "左夹子" }, { Name: "左心" }],
    },
    {
        Name: "星星发卡",
        ...hairAccShared,
        DefaultColor: ["#D0CF58", "#D0CF58"],
        Layer: [{ Name: "右" }, { Name: "左" }],
    },
    {
        Name: "星星发卡2",
        ...hairAccShared,
        DefaultColor: ["#D0CF58", "#D0CF58"],
        Layer: [{ Name: "右" }, { Name: "左" }],
    },
    {
        Name: "月亮发饰",
        ...hairAccShared,
        DefaultColor: ["#D0CF58", "#D0CF58"],
        Layer: [{ Name: "右" }, { Name: "左" }],
    },
    {
        Name: "蝴蝶",
        ...hairAccShared,
        DefaultColor: ["#8B87FF", "#8B87FF"],
        Layer: [{ Name: "右" }, { Name: "左" }],
    },
    {
        Name: "蝴蝶2",
        ...hairAccShared,
        DefaultColor: ["#6382FF", "#6382FF", "#6382FF", "#6382FF"],
        Layer: [{ Name: "右后" }, { Name: "右前" }, { Name: "左后" }, { Name: "左前" }],
    },
    {
        Name: "蝙蝠翼发卡",
        ...hairAccShared,
        DefaultColor: ["#232323", "#232323"],
        Layer: [{ Name: "右" }, { Name: "左" }],
    },
];

/** @type { Translation.String } */
const translations = {
    CN: {
        发卡1: "基础发卡 1",
        发卡2: "基础发卡 2",
        X发卡: "X发卡",
        心型发卡: "心型发卡",
        星星发卡: "星星发卡",
        星星发卡2: "星星发卡 2",
        月亮发饰: "月亮发饰",
        蝙蝠翼发卡: "蝙蝠翼发卡",
        蝴蝶: "蝴蝶头饰",
        蝴蝶2: "蝴蝶头饰2",
    },
    EN: {
        发卡1: "Basic Hair Clip 1",
        发卡2: "Basic Hair Clip 2",
        X发卡: "X Hair Clip",
        心型发卡: "Heart Hair Clip",
        星星发卡: "Star Hair Clip",
        星星发卡2: "Star Hair Clip 2",
        月亮发饰: "Moon Hair Clip",
        蝙蝠翼发卡: "Bat Wing Hair Clip",
        蝴蝶: "Butterfly Hair Clip",
        蝴蝶2: "Butterfly Hair Clip 2",
    },
};

/** @type { Translation.String } */
const layerNames = {
    CN: {
        右: "右",
        左: "左",
        右夹子: "右夹子",
        右心: "右心",
        左夹子: "左夹子",
        左心: "左心",

        右后: "右后",
        右前: "右前",
        左后: "左后",
        左前: "左前",
    },
    EN: {
        右: "Right",
        左: "Left",
        右夹子: "Right Clip",
        右心: "Right Heart",
        左夹子: "Left Clip",
        左心: "Left Heart",

        右后: "Right Back",
        右前: "Right Front",
        左后: "Left Back",
        左前: "Left Front",
    },
};

export default function () {
    /** @type {CustomGroupName[]} */
    const groups = ["HairAccessory1", "HairAccessory3"];
    for (const asset of assets) {
        const translation = DialogTools.pickEntry(translations, asset.Name);
        for (const group of groups) {
            AssetManager.addAssetWithConfig(group, asset, {
                translation,
                layerNames,
                ...ExtendedTools.createLeftRightBoth(asset),
            });
        }
    }
}

import { AssetManager } from "../../../assetForward";
import { luziFixups } from "../../../lib/fixups";

/** @type {Partial<AssetLayerDefinition>} */
const upperLayer = {
    ParentGroup: "BodyUpper",
    PoseMapping: {
        Hogtied: "Hogtied",
        AllFours: PoseType.HIDE,
    },
};

/** @type {Partial<AssetLayerDefinition>} */
const lowerLayer = {
    ParentGroup: "BodyLower",
    PoseMapping: {
        LegsClosed: "LegsClosed",
        KneelingSpread: "KneelingSpread",
        Kneel: "Kneel",
        Spread: "Spread",
        Hogtied: PoseType.HIDE,
        AllFours: PoseType.HIDE,
    },
};

/** @type {CustomAssetDefinition} */
const asset = {
    Name: "塑身衣1-Luzi",
    Random: false,
    Top: 220,
    Left: 130,
    Priority: 14,
    Layer: [
        { Name: "上", ColorGroup: "基础", ...upperLayer },
        { Name: "下", ColorGroup: "基础", ...lowerLayer },
        {
            Name: "上蕾丝边",
            ColorGroup: "蕾丝",
            ParentGroup: "BodyUpper",
            PoseMapping: {
                Hogtied: PoseType.HIDE,
                AllFours: PoseType.HIDE,
            },
        },
        { Name: "下蕾丝边", ColorGroup: "蕾丝", ...lowerLayer },
        { Name: "上蕾丝中", ColorGroup: "蕾丝", ...upperLayer },
        { Name: "下蕾丝中", ColorGroup: "蕾丝", ...lowerLayer },
        { Name: "上边线", ColorGroup: "边线", ...upperLayer },
        { Name: "下边线", ColorGroup: "边线", ...lowerLayer },
        {
            Name: "上中线",
            ColorGroup: "边线",
            ParentGroup: "BodyUpper",
            PoseMapping: {
                Hogtied: PoseType.HIDE,
                AllFours: PoseType.HIDE,
            },
        },
        { Name: "下中线", ColorGroup: "边线", ...lowerLayer },
        { Name: "下底边", ColorGroup: "边线", ...lowerLayer },
        { Name: "上蕾丝上", ColorGroup: "蕾丝", ...upperLayer },
        { Name: "上钢圈", ColorGroup: "边线", ...upperLayer },
        { Name: "上肩带", ColorGroup: "边线", ...upperLayer },
    ],
};

const layerNames = {
    CN: {
        上: "上",
        下: "下",
        上蕾丝边: "两边上",
        下蕾丝边: "两边下",
        上蕾丝中: "中间上",
        下蕾丝中: "中间下",
        上边线: "边线",
        下边线: "边线",
        上中线: "中线",
        下中线: "中线",
        下底边: "底边",
        上蕾丝上: "文胸",
        上钢圈: "钢圈",
        上肩带: "肩带",
    },
    EN: {
        基础: "Bases",
        蕾丝: "Laces",
        边线: "Lines",

        上: "Top",
        下: "Bottom",
        上蕾丝边: "Side Upper",
        下蕾丝边: "Side Lower",
        上蕾丝中: "Middle Upper",
        下蕾丝中: "Middle Lower",
        上边线: "Side Upper",
        下边线: "Side Lower",
        上中线: "Middle Upper",
        下中线: "Middle Lower",
        下底边: "Bottom",
        上蕾丝上: "Bra",
        上钢圈: "Steel Ring",
        上肩带: "Shoulder Strap",
    },
};

/** @type {Translation.Entry} */
const translation = {
    CN: "束身衣 1",
    EN: "Shapewear 1",
};

export default function () {
    AssetManager.addAssetWithConfig("Bra", asset, { layerNames, translation });
    luziFixups("Bra", asset.Name);
}

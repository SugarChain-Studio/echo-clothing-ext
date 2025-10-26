import { PoseMapTool } from "../../../lib";
import { AssetManager } from "../../../assetForward";

/** @type {AddAssetWithConfigParams} */
const asset = [
    "ClothLower",
    {
        Name: "皮革中空短裙",
        Random: false,
        Left: {
            [PoseType.DEFAULT]: 120,
            KneelingSpread: 210,
        },
        Top: 420,
        Expose: ["ItemVulva", "ItemVulvaPiercings", "ItemButt"],
        PoseMapping: PoseMapTool.hideFullBody(),
        ParentGroup: {},
        Priority: 26,
        DefaultColor: ["Default", "Default", "#000000", "Default"],
        Layer: [
            { Name: "底", AllowTypes: { typed: 0 } },
            { Name: "底_亮色", AllowTypes: { typed: [1, 2] } },
            { Name: "底_暗色", AllowTypes: { typed: [1] } },
            { Name: "反光" },
        ],
    },
    {
        translation: { CN: "皮革中空短裙", EN: "Leather Sideway Skirt" },
        layerNames: {
            CN: { 底: "底色", 反光: "反光", 底_亮色: "分离/亮色底", 底_暗色: "暗色" },
            EN: { 底: "Base", 反光: "Reflective", 底_亮色: "Separation/Light Base", 底_暗色: "Shade" },
        },
        extended: {
            Archetype: "typed",
            DrawImages: false,
            Options: [{ Name: "基础" }, { Name: "分离暗色" }, { Name: "浅色" }],
        },
        assetStrings: {
            CN: {
                Select: "选择短裙图层样式",
                基础: "基础",
                分离暗色: "分离暗色",
                浅色: "浅色",
            },
            EN: {
                Select: "Select skirt layer style",
                基础: "Basic",
                分离暗色: "Dark Separation",
                浅色: "Light Color",
            },
        },
    },
];

export default function () {
    AssetManager.addAssetWithConfig(...asset);
}

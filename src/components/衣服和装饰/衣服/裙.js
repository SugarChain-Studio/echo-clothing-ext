import { AssetManager } from "../../../assetForward";
import { PoseMapTool } from "../../../lib";
import { luziSuffixFixups } from "../../../lib/fixups";

/** @type {CustomAssetDefinition} */
const asset = {
    Name: "裙",
    Random: false,
    Top: 0,
    Left: 0,
    Priority: 26,
    Expose: ["ItemVulva", "ItemVulvaPiercings", "ItemButt"],
    SetPose: ["LegsClosed"],
    AllowActivePose: ["Kneel", "LegsClosed"],
    DefaultColor: ["#7F1739", "Default", "Default"],
    PoseMapping: PoseMapTool.hideFullBody(),
    Layer: [
        { Name: "底面", Priority: 1, ParentGroup: {}, ...PoseMapTool.layerConfig(true, ["Kneel"]) },
        { Name: "上裙子" },
        { Name: "下裙子", ...PoseMapTool.layerConfig(true, ["Kneel"]) },
        { Name: "上拉链" },
        { Name: "下拉链", ...PoseMapTool.layerConfig(true, ["Kneel"]) },
        { Name: "上亮面" },
        { Name: "下亮面", ...PoseMapTool.layerConfig(true, ["Kneel"]) },
        { Name: "上高光" },
        { Name: "下高光", ...PoseMapTool.layerConfig(true, ["Kneel"]) },
    ],
};

const layerNames = {
    EN: {
        底面: "Base",
        上裙子: "Top Skirt",
        下裙子: "Bottom Skirt",
        上拉链: "Top Zipper",
        下拉链: "Bottom Zipper",
        上亮面: "Top Gloss",
        下亮面: "Bottom Gloss",
        上高光: "Top Highlight",
        下高光: "Bottom Highlight",
    },
};

/** @type {Translation.Entry} */
const translation = {
    CN: "开叉半身直筒裙",
    EN: "Slit Column Skirt",
};

export default function () {
    AssetManager.addAssetWithConfig("ClothLower", asset, { translation, layerNames });
    luziSuffixFixups("ClothLower", asset.Name);
}

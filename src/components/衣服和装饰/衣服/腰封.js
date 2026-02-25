import { PoseMapTool } from "../../../lib";
import { AssetManager } from "../../../assetForward";

/** @type {AddAssetWithConfigParams} */
const asset = [
    ["Corset"],
    {
        Name: "束腰",
        Random: false,
        Left: 180,
        Top: 320,
        Prerequisite: ["HasBreasts"],
        ParentGroup: "BodyUpper",
        PoseMapping: PoseMapTool.hideFullBody(),
        DynamicGroupName: "Corset",
        Layer: [{ Name: "A1" }, { Name: "A2" }, { Name: "A3" }, { Name: "A4" }],
    },
    {
        translation: { CN: "普通束腰", EN: "Regular Corset" },
        layerNames: {
            CN: { A1: "正面", A2: "侧腰", A3: "缝合", A4: "扣子" },
            EN: { A1: "Front", A2: "Side", A3: "Seam", A4: "Button" },
        },
    },
];

export default function () {
    AssetManager.addAssetWithConfig(...asset);
}

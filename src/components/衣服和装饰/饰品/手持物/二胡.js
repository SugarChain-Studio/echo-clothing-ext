import { AssetManager } from "../../../../assetForward";
import { ArmMaskTool } from "../../../../lib";

/** @type {AddAssetWithConfigParams} */
const asset = [
    "ClothAccessory",
    {
        Name: "二胡",
        Random: false,
        Left: 40,
        Top: 100,
        ParentGroup: {},
        DynamicGroupName: "ClothAccessory",
        PoseMapping: {},
        Layer: [{ Name: "A1" }, { Name: "A2" }],
    },
    {
        translation: { CN: "二胡", EN: "Erhu" },
        layerNames: {
            CN: { A2: "琴弓", A1: "琴身" },
            EN: { A2: "Bow", A1: "Body" },
        },
    },
];

export default function () {
    AssetManager.addAssetWithConfig(...asset);
    ArmMaskTool.createArmMaskForCloth("ClothAccessory", asset[1]);
}

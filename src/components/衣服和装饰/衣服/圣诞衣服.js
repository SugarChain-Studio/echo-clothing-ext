import { ArmMaskTool, PoseMapTool } from "../../../lib";
import { AssetManager } from "../../../assetForward";

/** @type {AddAssetWithConfigParams} */
const asset = [
    "Cloth",
    {
        Name: "圣诞25",
        Random: false,
        Left: 40,
        Top: 220,
        Priority: 32,
        ParentGroup: "BodyUpper",
        PoseMapping: PoseMapTool.hideFullBody(),
        DynamicGroupName: "Cloth",
        Layer: [
            { Name: "A1", ColorGroup: "肩带" },
            { Name: "A2", ColorGroup: "肩带" },
            { Name: "B1", ColorGroup: "裙子" },
            { Name: "B2", ColorGroup: "裙子" },
            { Name: "C1", ColorGroup: "裙边" },
            { Name: "C2", ColorGroup: "裙边" },
            { Name: "D1", ColorGroup: "绒毛" },
            { Name: "D2", ColorGroup: "绒毛" },
            { Name: "E1", ColorGroup: "绒毛" },
            { Name: "E2", ColorGroup: "绒毛" },
            { Name: "F1", ColorGroup: "蝴蝶结" },
            { Name: "F2", ColorGroup: "蝴蝶结" },
            { Name: "F3", ColorGroup: "蝴蝶结" },
            { Name: "G1" },
        ],
    },
    {
        translation: { CN: "圣诞 2025", EN: "Xmas 2025" },
        layerNames: {
            CN: { G1: "扣子" },
            EN: { 肩带: "Strap", 裙子: "Skirt", 裙边: "Skirt Edge", 绒毛: "Fur", 蝴蝶结: "Bow", G1: "Button" },
        },
    },
];

export default function () {
    ArmMaskTool.createArmMaskForCloth(asset[0], asset[1], "Arm1");
    AssetManager.addAssetWithConfig(...asset);
}

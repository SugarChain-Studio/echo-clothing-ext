import { PoseMapTools } from "@mod-utils/Tools";
import { AssetManager } from "../../../assetForward";

/** @type { AddAssetWithConfigParamsNoGroup[] }} */
const asset = [
    [
        {
            Name: "乳贴1",
            Random: false,
            Left: { "": 180, "AllFours": 190 },
            Top: { "": 290, "AllFours": 330 },
            ParentGroup: "BodyUpper",
            DefaultColor: ["#B16565", "#B16565"],
            Prerequisite: ["HasBreasts", "AccessBreast"],
            Expose: ["ItemBreast", "ItemNipples", "ItemNipplesPiercings"],
            PoseMapping: { AllFours: "AllFours" },
            Layer: [{ Name: "左" }, { Name: "右" }],
        },
        {
            translation: { CN: "乳贴1", EN: "Pasties 1" },
            layerNames: { EN: { 左: "Left", 右: "Right" } },
        },
    ],
    [
        {
            Name: "乳贴2",
            Random: false,
            Left: { "": 180, "AllFours": 190 },
            Top: { "": 290, "AllFours": 330 },
            ParentGroup: "BodyUpper",
            DefaultColor: ["#B16565", "#B16565"],
            Prerequisite: ["HasBreasts", "AccessBreast"],
            Expose: ["ItemBreast", "ItemNipples", "ItemNipplesPiercings"],
            PoseMapping: { AllFours: "AllFours" },
            Layer: [{ Name: "左" }, { Name: "右" }],
        },
        {
            translation: { CN: "乳贴2", EN: "Pasties 2" },
            layerNames: { EN: { 左: "Left", 右: "Right" } },
        },
    ],
];

export default function () {
    AssetManager.addAssetWithConfig(["Bra", "ItemNipples"], asset);
}

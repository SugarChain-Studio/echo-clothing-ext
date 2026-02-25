import { AssetManager } from "../../../assetForward";
import { PoseMapTool } from "../../../lib";

/** @type {AddAssetWithConfigParams} */
const asset = [
    ["Suit", "Bra", "Cloth"],
    {
        Name: "黑白泳装",
        Random: false,
        Left: 170,
        Top: 210,
        Priority: 20,
        PoseMapping: PoseMapTool.config(["Hogtied"], ["AllFours"]),
        DynamicGroupName: "Suit",
        DefaultColor: ["Default", "#2D2D2D", "Default", "Default", "Default", "Default"],
        Layer: [{ Name: "A1" }, { Name: "A2" }, { Name: "A3" }, { Name: "B1" }, { Name: "B2" }, { Name: "C1" }],
    },
    {
        translation: { CN: "复古泳装", EN: "Retro Swimsuit" },
        layerNames: {
            CN: { A1: "条纹1", A2: "条纹2", A3: "褶边", B1: "胸口", B2: "暗色", C1: "领子" },
            EN: { A1: "Stripe1", A2: "Stripe2", A3: "Frill", B1: "Chest", B2: "Dark", C1: "Collar" },
        },
    },
];

export default function () {
    AssetManager.addAssetWithConfig(...asset);
}

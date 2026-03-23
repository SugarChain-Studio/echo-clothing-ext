import { PoseMapTool } from "@local/lib/generator";
import { AssetManager } from "@local/AssetManager";

/** @type {AddAssetWithConfigParams} */
const asset = [
    ["Cloth"],
    {
        Name: "露胸短袖",
        Random: false,
        Gender: "F",
        Left: 140,
        Top: 190,
        Prerequisite: ["HasBreasts"],
        PoseMapping: PoseMapTool.config(["OverTheHead", "Yoked"], ["AllFours"]),
    },
    {
        translation: { CN: "沙滩衬衫", EN: "Beach Shirt" },
    },
];

export default function () {
    AssetManager.addAssetWithConfig(...asset);
}


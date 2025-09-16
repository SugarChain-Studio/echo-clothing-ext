import { AssetManager } from "../../../assetForward";

/** @type {CustomAssetDefinition} */
const asset = {
    Name: "Luzi_CheekRetractor",
    Random: false,
    Left: 220,
    Top: 170,
    Difficulty: 6,
    Time: 15,
    AllowLock: false,
    AllowTighten: true,
    Fetish: ["Leather", "Metal", "Gagged"],
    Hide: ["Mouth"],
    Block: [],
    Layer: [{ Name: "Lips" }, { Name: "Teeth" }, { Name: "Retractor" }],
};

const translation = {
    CN: "开口器",
    EN: "Cheek Retractor",
};

const layerNames = {
    CN: {
        Lips: "嘴唇",
        Teeth: "牙齿",
        Retractor: "开口器",
    },
    EN: {
        Lips: "Lips",
        Teeth: "Teeth",
        Retractor: "Retractor",
    },
};

export default function () {
    AssetManager.addAssetWithConfig("ItemMouth", asset, { translation, layerNames });
}

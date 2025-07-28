import { AssetManager } from "../../../assetForward";

/** @type {CustomAssetDefinition} */
const asset = {
    Name: "白布_Luzi",
    Random: false,
    Gender: "F",
    Top: 0,
    Left: 0,
    ParentGroup: {},
    Hide: ["HairFront"],
    AllowActivePose: ["BaseUpper", "BackBoxTie", "BackCuffs", "BackElbowTouch", "Yoked", "Hogtied", "AllFours"],
    PoseMapping: {
        Yoked: "Yoked",
    },
    Layer: [
        { Name: "前", Priority: 50 },
        { Name: "后", Priority: 5 },
        { Name: "图案", Priority: 61 },
    ],
};

const layerNames = {
    EN: {
        前: "Front",
        后: "Back",
        图案: "Pattern",
    },
};

const translation = {
    CN: "白布",
    EN: "Ghost Cloak",
};

export default function () {
    AssetManager.addAssetWithConfig("Cloth", asset, { translation, layerNames });
}

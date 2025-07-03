import { AssetManager } from "../../../assetForward";

/** @type {CustomAssetDefinition} */
const asset = {
    Name: "裤子1_Luzi",
    Random: false,
    Top: 0,
    Left: {
        [PoseType.DEFAULT]: 0,
        KneelingSpread: 90,
    },
    Layer: [
        { Name: "右_A0" },
        { Name: "右_A1", Priority: 1 },
        { Name: "右_B1" },
        { Name: "右_B2" },
        { Name: "右_C1" },
        { Name: "右_C2" },
        { Name: "右_C3" },
        { Name: "右_C4" },

        { Name: "左_A0" },
        { Name: "左_A1", Priority: 1 },
        { Name: "左_B1" },
        { Name: "左_B2" },
        { Name: "左_C1" },
        { Name: "左_C2" },
        { Name: "左_C3" },
        { Name: "左_C4" },
    ],
};

/** @type {Translation.Entry} */
const translation = {
    CN: "裤子 1",
    EN: "Pants 1",
};

export default function () {
    AssetManager.addAsset("ClothLower", asset, undefined, translation);
}

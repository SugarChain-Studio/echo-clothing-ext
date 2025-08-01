import { AssetManager } from "../../../assetForward";

/** @type {CustomAssetDefinition} */
const asset1 = {
    Name: "斗笠1_Luzi",
    Random: false,
    Gender: "F",
    Top: 0,
    Left: 0,
};

/** @type {CustomAssetDefinition} */
const asset2 = {
    Name: "斗笠2_Luzi",
    Random: false,
    Gender: "F",
    Top: 0,
    Left: 0,
};

const translations1 = {
    CN: "斗笠 1",
    EN: "Bamboo hat 1",
    RU: "DouLi 1",
};

const translations2 = {
    CN: "斗笠 2",
    EN: "Bamboo hat 2",
    RU: "DouLi 2",
};

export default function () {
    AssetManager.addAssetWithConfig("Hat", asset1, { translation: translations1, layerNames: {} });
    AssetManager.addAssetWithConfig("Hat", asset2, { translation: translations2, layerNames: {} });
}

import { AssetManager } from "../../../assetForward";

/** @type {CustomAssetDefinition} */
const asset = {
    Name: "透明身体",
    Random: false,
    Gender: "F",
    ParentGroup: {},
    Hide: [
        "HandsLeft",
        "HandsRight",
        "BodyUpper",
        "BodyLower",
        "ArmsLeft",
        "ArmsRight",
        "HairFront",
        "HairBack",
        "Eyebrows",
        "Pussy",
        "Mouth",
        "Head",
        "Eyes",
        "Eyes2",
        "Nipples",
        "右眼_Luzi",
        "左眼_Luzi",
        "新前发_Luzi",
        "新后发_Luzi",
    ],
    Layer: [],
};

const translations = {
    CN: "透明身体",
    EN: "Transparent body",
};

export default function () {
    AssetManager.addAsset("动物身体_Luzi", asset, undefined, translations);
}

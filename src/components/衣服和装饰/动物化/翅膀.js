import { AssetManager } from "../../assetForward";

/** @type {CustomAssetDefinition} */
const asset = {
    Name: "翅膀1",
    Random: false,
    Top: 0,
    Left: 0,
    DefaultColor: ["#141414", "#000000"],
    Layer: [
        {
            Name: "翼膜",
        },
        {
            Name: "翼骨",
        },
    ],
};

const layerNames = {
    EN: {
        翼膜: "Wing Membrane",
        翼骨: "Wing Bone",
    },
};

const translation = {
    CN: "翅膀 1",
    EN: "Wing 1",
    RU: "Крыло 1",
    UA: "Крило 1",
};

export default function () {
    AssetManager.addAssetWithConfig("Wings", asset, { translation, layerNames });
}

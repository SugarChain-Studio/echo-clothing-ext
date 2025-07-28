import { AssetManager } from "../../../assetForward";

/** @type {CustomAssetDefinition} */
const asset = {
    Name: "短穿环_Luzi",
    Fetish: ["Metal"],
    Value: -1,
    Difficulty: 10,
    Time: 15,
    AllowLock: true,
    Prerequisite: ["AccessBreast", "AccessBreastSuitZip"],
    ExpressionTrigger: [
        { Name: "Closed", Group: "Eyes", Timer: 5 },
        { Name: "Angry", Group: "Eyebrows", Timer: 5 },
    ],
};

const translation = {
    CN: "短穿环",
    EN: "Short Straight Piercings",
};

export default function () {
    AssetManager.addAssetWithConfig("ItemNipplesPiercings", asset, { translation, layerNames: {} });
}

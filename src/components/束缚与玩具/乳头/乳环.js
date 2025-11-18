import { AssetManager } from "../../../assetForward";
import { luziSuffixFixups } from "../../../lib/fixups";

/** @type {CustomAssetDefinition} */
const asset = {
    Name: "短穿环",
    Fetish: ["Metal"],
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
    luziSuffixFixups(["ItemNipplesPiercings"], asset.Name);
}

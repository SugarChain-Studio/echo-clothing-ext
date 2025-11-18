import { AssetManager } from "../../../assetForward";
import { luziSuffixFixups } from "../../../lib/fixups";

/** @type {CustomAssetDefinition} */
const asset = {
    Name: "乳夹",
    Fetish: ["Metal"],
    Difficulty: 10,
    Time: 15,
    Top: 0,
    Left: 0,
    AllowLock: true,
    Prerequisite: ["AccessBreast", "AccessBreastSuitZip"],
    Effect: [E.Wiggling, E.UseRemote],
    ExpressionTrigger: [
        { Name: "Closed", Group: "Eyes", Timer: 5 },
        { Name: "Angry", Group: "Eyebrows", Timer: 5 },
    ],
    PoseMapping: { AllFours: "Hide" },
    Layer: [{ Name: "乳夹" }, { Name: "链子", ParentGroup: {} }],
};

const layerNames = {
    EN: {
        乳夹: "Nipple Clamps",
        链子: "Chain",
    },
};

const extended = {
    Archetype: ExtendedArchetype.VIBRATING,
};

const translation = {
    CN: "乳夹",
    EN: "Nipple Clamps",
    RU: "Зажимы для сосков",
    UA: "Зажими для сосків",
};

export default function () {
    AssetManager.addAssetWithConfig("ItemNipples", asset, {
        extended,
        translation,
        layerNames,
    });
    luziSuffixFixups("ItemNipples", asset.Name);
}

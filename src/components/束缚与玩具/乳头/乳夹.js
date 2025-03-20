import { AssetManager } from "../../../assetForward";

/** @type {CustomAssetDefinition} */
const asset = {
    Name: "乳夹_Luzi",
    Fetish: ["Metal"],
    Value: -1,
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
    PoseMapping: {
        AllFours: "Hide",
    },
    Layer: [
        {
            Name: "乳夹",
        },
        {
            Name: "链子",
            ParentGroup: {},
        },
    ],
};

const extended = {
    Archetype: ExtendedArchetype.VIBRATING,
};

const translations = {
    CN: "乳夹",
    EN: "Nipple Clamps",
    RU: "Зажимы для сосков",
    UA: "Зажими для сосків",
};

export default function () {
    AssetManager.addAsset("ItemNipples", asset, extended, translations);
}

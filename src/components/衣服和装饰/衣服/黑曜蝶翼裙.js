import { AssetManager } from "../../../assetForward";
import { luziFixups } from "../../../lib/fixups";

/** @type {CustomAssetDefinition} */
const asset = {
    Name: "黑曜蝶翼裙-Luzi",
    Random: false,
    Left: { "": 60, "KneelingSpread": 150 },
    Top: 380,
    Priority: 24,
    PoseMapping: {
        Hogtied: PoseType.HIDE,
        AllFours: PoseType.HIDE,
    },
    Expose: ["ItemVulva", "ItemVulvaPiercings", "ItemButt"],
    Layer: [
        { Name: "A1", ColorGroup: "A" },
        { Name: "A2", ColorGroup: "A" },
        { Name: "B1", ColorGroup: "B" },
        { Name: "B2", ColorGroup: "B" },
        { Name: "C1", ColorGroup: "C" },
        { Name: "C2", ColorGroup: "C" },
        { Name: "D1", ColorGroup: "D" },
        { Name: "D2", ColorGroup: "D" },
    ],
};

/** @type {Translation.Entry} */
const translation = {
    CN: "黑曜蝶翼裙",
    EN: "Black Butterfly Skirt",
};

/** @type {Translation.String} */
const layerNames = {
    CN: {
        A: "底部裙衬",
        B: "蝶翼裙摆",
        C: "前裙摆",
        D: "腰封",

        A1: "左",
        A2: "右",
        B1: "左",
        B2: "右",
        C1: "左",
        C2: "右",
        D1: "左",
        D2: "右",
    },
    EN: {
        A: "Bottom Skirt Lining",
        B: "Butterfly Skirt Hem",
        C: "Front Skirt Hem",
        D: "Waistband",

        A1: "Left",
        A2: "Right",
        B1: "Left",
        B2: "Right",
        C1: "Left",
        C2: "Right",
        D1: "Left",
        D2: "Right",
    },
};

export default function () {
    AssetManager.addAssetWithConfig("ClothLower", asset, { translation, layerNames });
    luziFixups("ClothLower", asset.Name);
}

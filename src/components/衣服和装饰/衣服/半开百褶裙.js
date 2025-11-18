import { AssetManager } from "../../../assetForward";
import { luziSuffixFixups } from "../../../lib/fixups";

/** @type {CustomAssetDefinition} */
const asset = {
    Name: "半开百褶裙",
    Random: false,
    Top: 0,
    Left: {
        [PoseType.DEFAULT]: 0,
        KneelingSpread: 90,
    },
    DefaultColor: ["#7F1739", "Default", "Default"],
    Expose: ["ItemVulva", "ItemVulvaPiercings", "ItemButt"],
    PoseMapping: {
        Kneel: "KneelingSpread",
        Hogtied: PoseType.HIDE,
        AllFours: PoseType.HIDE,
    },
    Priority: 26,
    Layer: [{ Name: "裙子" }, { Name: "白线" }, { Name: "链子" }],
};

/** @type {Translation.Entry} */
const translation = {
    CN: "半开百褶裙",
    EN: "Half pleated skirt",
};

/** @type {Translation.Dialog} */
const layerNames = {
    EN: {
        裙子: "Skirt",
        白线: "White line",
        链子: "Chain",
    },
};

export default function () {
    AssetManager.addAssetWithConfig("ClothLower", asset, { translation, layerNames });
    luziSuffixFixups("ClothLower", asset.Name);
}

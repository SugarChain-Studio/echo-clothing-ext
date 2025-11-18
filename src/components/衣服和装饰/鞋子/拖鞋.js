import { AssetManager } from "../../../assetForward";
import { luziSuffixFixups } from "../../../lib/fixups";

/** @type {CustomAssetDefinition} */
const asset = {
    Name: "拖鞋",
    Random: false,
    Top: 0,
    Left: 0,
    PoseMapping: {
        Kneel: "Hide",
        KneelingSpread: "Hide",
        LegsClosed: "LegsClosed",
        Spread: "Spread",
        Hogtied: "Hide",
        AllFours: "Hide",
    },
    Priority: 23,
};

const translation = {
    CN: "拖鞋",
    EN: "Slippers",
};

export default function () {
    AssetManager.addAssetWithConfig("Shoes", asset, { layerNames: {}, translation });
    luziSuffixFixups("Shoes", asset.Name);
}

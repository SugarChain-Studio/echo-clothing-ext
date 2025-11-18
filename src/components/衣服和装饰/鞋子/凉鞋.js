import { AssetManager } from "../../../assetForward";
import { luziSuffixFixups } from "../../../lib/fixups";

/** @type {CustomAssetDefinition} */
const asset = {
    Name: "凉鞋",
    Random: false,
    Top: 840,
    Left: 120,
    PoseMapping: {
        Kneel: "Hide",
        KneelingSpread: "Hide",
        LegsClosed: "LegsClosed",
        Spread: "Spread",
        Hogtied: "Hide",
        AllFours: "Hide",
    },
    DefaultColor: ["#623B3B", "#181818"],
    Layer: [
        {
            Name: "鞋带",
            Priority: 17,
        },
        {
            Name: "鞋底",
            Priority: 1,
        },
    ],
};

const layerNames = {
    EN: {
        鞋带: "Laces",
        鞋底: "Sole",
    },
};

const translation = {
    CN: "凉鞋",
    EN: "Sandals",
};

export default function () {
    AssetManager.addAssetWithConfig("Shoes", asset, { layerNames, translation });
    luziSuffixFixups("Shoes", asset.Name);
}

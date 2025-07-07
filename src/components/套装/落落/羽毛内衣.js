import { AssetManager } from "../../../assetForward";

/** @type {CustomAssetDefinition} */
const asset = {
    Name: "羽毛内衣",
    Random: false,
    Left: 0,
    Top: 0,
    Priority: 20,
    ParentGroup: "BodyUpper",
    DynamicGroupName: "Cloth",
    Layer: [{ Name: "1" }, { Name: "2" }],
};

const translation = {
    CN: "羽毛内衣",
    EN: "Feather Lingerie",
};

/** @type { Translation.String } */
const layerNames = {
    CN: {
        1: "左",
        2: "右",
    },
    EN: {
        1: "Left",
        2: "Right",
    },
};

export default function () {
    /** @type {CustomGroupName[]} */
    const groups = ["Cloth", "Bra", "Suit"];
    for (const group of groups) {
        AssetManager.addAssetWithConfig(group, asset, {
            translation,
            layerNames,
        });
    }
}

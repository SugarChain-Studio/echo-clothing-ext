import { AssetManager } from "../../../assetForward";

/** @type {"HairFront"} */
const hairFront = "HairFront";

const hairAttrShared = {
    Random: false,
    Left: 120,
    Top: 50,
    Priority: 52,
    ParentGroup: {},
    Extended: false,
    InheritColor: hairFront,
    Hide: [hairFront],
};

/** @type { CustomGroupedAssetDefinitions }} */
const assets = {
    新前发_Luzi: [
        {
            Name: "蓬松卷发1",
            ...hairAttrShared,
            Layer: [{ Name: "A" }, { Name: "B" }],
        },
        {
            Name: "蓬松卷发2",
            ...hairAttrShared,
            Layer: [{ Name: "A" }, { Name: "B" }],
        },
    ],
};

/** @type { Translation.GroupedEntries } */
const translations = {
    CN: {
        新前发_Luzi: {
            蓬松卷发1: "蓬松卷发1",
            蓬松卷发2: "蓬松卷发2",
        },
    },
    EN: {
        新前发_Luzi: {
            蓬松卷发1: "Fluffy Curls 1",
            蓬松卷发2: "Fluffy Curls 2",
        },
    },
};

const layerNames = {
    CN: {
        蓬松卷发1: {
            A: "两侧",
            B: "头顶",
        },
        蓬松卷发2: {
            A: "两侧",
            B: "头顶",
        },
    },
    EN: {
        蓬松卷发1: {
            A: "Sides",
            B: "Top",
        },
        蓬松卷发2: {
            A: "Sides",
            B: "Top",
        },
    },
};

export default function () {
    AssetManager.addGroupedAssetsWithConfig(assets, translations, layerNames);
}

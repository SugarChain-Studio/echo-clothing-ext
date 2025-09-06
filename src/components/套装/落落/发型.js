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
    新后发_Luzi: [
        {
            Name: "蓬松卷发1",
            ...hairAttrShared,
            DynamicGroupName: "新前发_Luzi",
            Layer: [{ Name: "A" }, { Name: "B" }],
        },
        {
            Name: "蓬松卷发2",
            ...hairAttrShared,
            DynamicGroupName: "新前发_Luzi",
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
        新后发_Luzi: {
            蓬松卷发1: "蓬松卷发1",
            蓬松卷发2: "蓬松卷发2",
        },
    },
    EN: {
        新前发_Luzi: {
            蓬松卷发1: "Fluffy Curls 1",
            蓬松卷发2: "Fluffy Curls 2",
        },
        新后发_Luzi: {
            蓬松卷发1: "Fluffy Curls 1",
            蓬松卷发2: "Fluffy Curls 2",
        },
    },
};

/** @type {Translation.String} */
const layerNameBase = {
    CN: {
        A: "两侧",
        B: "头顶",
    },
    EN: {
        A: "Sides",
        B: "Top",
    },
};

const layerNames = {
    CN: {
        新前发_Luzi: {
            蓬松卷发1: layerNameBase.CN,
            蓬松卷发2: layerNameBase.CN,
        },
        新后发_Luzi: {
            蓬松卷发1: layerNameBase.CN,
            蓬松卷发2: layerNameBase.CN,
        },
    },
    EN: {
        新前发_Luzi: {
            蓬松卷发1: layerNameBase.EN,
            蓬松卷发2: layerNameBase.EN,
        },
        新后发_Luzi: {
            蓬松卷发1: layerNameBase.EN,
            蓬松卷发2: layerNameBase.EN,
        },
    },
};

export default function () {
    AssetManager.addGroupedAssetsWithConfig(assets, translations, layerNames);
}

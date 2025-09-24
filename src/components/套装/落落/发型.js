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

/** @type {Translation.String} */
const layerNames = {
    CN: {
        A: "两侧",
        B: "头顶",
    },
    EN: {
        A: "Sides",
        B: "Top",
    },
};

/** @type {AddAssetWithConfigParams[]} */
const assets = [
    [
        ["新前发_Luzi", "新后发_Luzi"],
        {
            Name: "蓬松卷发1",
            ...hairAttrShared,
            DynamicGroupName: "新前发_Luzi",
            Layer: [{ Name: "A" }, { Name: "B" }],
        },
        { translation: { CN: "蓬松卷发1", EN: "Fluffy Curls 1" }, layerNames },
    ],
    [
        ["新前发_Luzi", "新后发_Luzi"],
        {
            Name: "蓬松卷发2",
            ...hairAttrShared,
            DynamicGroupName: "新前发_Luzi",
            Layer: [{ Name: "A" }, { Name: "B" }],
        },
        { translation: { CN: "蓬松卷发2", EN: "Fluffy Curls 2" }, layerNames },
    ],
];

export default function () {
    AssetManager.addAssetWithConfig(assets);
}

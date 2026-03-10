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
    [
        ["新前发_Luzi"],
        {
            Name: "姬发公主切前",
            Random: false,
            Left: 0,
            Top: 0,
            ParentGroup: {},
            Extended: false,
            InheritColor: hairFront,
            DynamicGroupName: "新前发_Luzi",
            Layer: [{ Name: "A1" }, { Name: "A2" }, { Name: "B" }, { Name: "C" }],
        },
        { translation: { CN: "姬发公主切(前)", EN: "Hime Cut (Front)" }, layerNames },
    ],
    [
        ["新后发_Luzi"],
        {
            Name: "姬发公主切后",
            Random: false,
            Left: 0,
            Top: 0,
            ParentGroup: {},
            Extended: false,
            InheritColor: hairFront,
            DynamicGroupName: "新后发_Luzi",
            Layer: [{ Name: "A1" }, { Name: "A2" }, { Name: "C" }],
        },
        { translation: { CN: "姬发公主切(后)", EN: "Hime Cut (Back)" }, layerNames },
    ],
];

export default function () {
    AssetManager.addAssetWithConfig(assets);
}

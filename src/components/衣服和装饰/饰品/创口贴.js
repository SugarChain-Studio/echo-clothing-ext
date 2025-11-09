import { AssetManager } from "../../../assetForward";
import { Typing } from "../../../lib";

/** @type {CustomAssetDefinitionBase} */
const baseAsset = {
    Name: "创口贴",
    Random: false,
    ParentGroup: {},
    DynamicGroupName: "Suit",
    Prerequisite: ["HasVagina", "HasBreasts"],
    Layer: [
        { Left: 180, Top: 300, Name: "上", ParentGroup: "BodyUpper" },
        { Left: 240, Top: 500, Name: "下" },
    ],
};

/** @type {CustomAssetDefinitionBase} */
const lowerAsset = {
    Name: "创口贴_下",
    Random: false,
    Left: 240,
    Top: 500,
    ParentGroup: {},
    Prerequisite: ["HasVagina"],
    DynamicGroupName: "Suit",
    PoseMapping: { AllFours: PoseType.HIDE, Hogtied: PoseType.HIDE },
};

/** @type {CustomAssetDefinitionBase} */
const upperAsset = {
    Name: "创口贴",
    Random: false,
    Left: 180,
    Top: 300,
    Prerequisite: ["HasBreasts", "AccessBreast"],
    Expose: ["ItemBreast", "ItemNipples", "ItemNipplesPiercings"],
    ParentGroup: "BodyUpper",
    DynamicGroupName: "Suit",
    Layer: [{ Name: "上" }],
};

const translation = { CN: "创口贴", EN: "BandAid" };
const layerNames = { EN: { 上: "Top", 下: "Bottom" } };

const CraftGroup = "创口贴";

/** @type {AddAssetWithConfigParams[]} */
const assetN = [
    ["Suit", Typing.assetApp(baseAsset), { translation, layerNames }],
    ["Bra", Typing.assetApp(upperAsset), { translation, layerNames }],
    [
        "Panties",
        Typing.assetApp(lowerAsset, { Expose: ["ItemVulvaPiercings", "ItemButt"] }),
        { translation, layerNames },
    ],
    ["ItemNipples", Typing.assetItem(upperAsset, { CraftGroup }), { translation, layerNames }],
    ["ItemVulva", Typing.assetItem(lowerAsset, { CraftGroup }), { translation, layerNames }],
    [
        "ItemVulvaPiercings",
        Typing.assetItem(lowerAsset, { CraftGroup, Block: ["ItemVulva"] }),
        { translation, layerNames },
    ],
];

export default function () {
    AssetManager.addImageMapping({
        "Assets/Female3DCG/Suit/Preview/创口贴_下.png": "Assets/Female3DCG/Suit/Preview/创口贴.png",
    });
    AssetManager.addAssetWithConfig(assetN);
}

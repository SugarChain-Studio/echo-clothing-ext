import { AssetManager } from "../../../assetForward";

/** @type {CustomAssetDefinitionAppearance} */
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

/** @type {CustomAssetDefinitionAppearance} */
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

/** @type {CustomAssetDefinitionAppearance} */
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

/** @type {AddAssetWithConfigParams[]} */
const assetN = [
    ["Suit", baseAsset, { translation, layerNames }],
    ["Bra", upperAsset, { translation, layerNames }],
    ["Panties", { ...lowerAsset, Expose: ["ItemVulvaPiercings", "ItemButt"] }, { translation, layerNames }],
    ["ItemNipples", upperAsset, { translation, layerNames }],
    ["ItemVulva", lowerAsset, { translation, layerNames }],
    ["ItemVulvaPiercings", { ...lowerAsset, Block: ["ItemVulva"] }, { translation, layerNames }],
];

export default function () {
    AssetManager.addImageMapping({
        "Assets/Female3DCG/Suit/Preview/创口贴_下.png": "Assets/Female3DCG/Suit/Preview/创口贴.png",
    });
    AssetManager.addAssetWithConfig(assetN);
}

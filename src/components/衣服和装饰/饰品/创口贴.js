import { AssetManager } from "../../../assetForward";

/** @type {CustomAssetDefinitionAppearance} */
const baseAsset = {
    Name: "创口贴",
    Random: false,
    ParentGroup: {},
    DynamicGroupName: /** @type {"Suit"}*/ ("Suit"),
    Prerequisite: /** @type {AssetPrerequisite[]} */ (["HasVagina", "HasBreasts"]),
    Layer: [
        { Left: 180, Top: 300, Name: "上", ParentGroup: "BodyUpper" },
        { Left: 240, Top: 500, Name: "下" },
    ],
};

const lowerAsset = {
    Name: "创口贴_下",
    Random: false,
    Left: 240,
    Top: 500,
    ParentGroup: {},
    Prerequisite: /** @type {AssetPrerequisite[]} */ (["HasVagina"]),
    DynamicGroupName: /** @type {const}*/ ("Suit"),
    PoseMapping: { AllFours: PoseType.HIDE, Hogtied: PoseType.HIDE },
};

const upperAsset = {
    Name: "创口贴",
    Random: false,
    Left: 180,
    Top: 300,
    Prerequisite: /** @type {AssetPrerequisite[]} */ (["HasBreasts"]),
    ParentGroup: /** @type {const}*/ ("BodyUpper"),
    DynamicGroupName: /** @type {const}*/ ("Suit"),
    Layer: [{ Name: "上" }],
};

/** @type { CustomGroupedAssetDefinitions } */
const asset = {
    Suit: [baseAsset],
    Bra: [upperAsset],
    Panties: [{ ...lowerAsset, Expose: ["ItemVulvaPiercings", "ItemButt"] }],
    ItemNipples: [upperAsset],
    ItemVulva: [lowerAsset],
    ItemVulvaPiercings: [{ ...lowerAsset, Block: ["ItemVulva"] }],
};

/** @type {Translation.GroupedEntries} */
const translations = {
    CN: Object.fromEntries(
        Object.entries(asset).map(([group, assets]) => [
            group,
            Object.fromEntries(assets.map((asset) => [asset.Name, "创口贴"])),
        ])
    ),
    EN: Object.fromEntries(
        Object.entries(asset).map(([group, assets]) => [
            group,
            Object.fromEntries(assets.map((asset) => [asset.Name, "BandAid"])),
        ])
    ),
};

const layerNames = {
    EN: { Suit: { 创口贴: { 上: "Top", 下: "Bottom" } } },
};

export default function () {
    AssetManager.addImageMapping({
        "Assets/Female3DCG/Suit/Preview/创口贴_下.png": "Assets/Female3DCG/Suit/Preview/创口贴.png",
    });
    AssetManager.addGroupedAssetsWithConfig(asset, translations, layerNames);
}

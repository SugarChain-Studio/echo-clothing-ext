import { AssetManager } from "../../../assetForward";

/** @type {CustomAssetDefinition} */
const asset = {
    Name: "西装露肩_Luzi",
    Random: false,
    Left: 30,
    Top: 50,
    Priority: 35,
    ParentGroup: {},
    DynamicGroupName: "Cloth",
    PoseMapping: {
        ...AssetPoseMapping.Cloth,
        AllFours: PoseType.HIDE,
        BackCuffs: PoseType.HIDE,
        Hogtied: PoseType.HIDE,
    },
    Layer: [
        { Name: "base", AllowTypes: { typed: 0 } },
        { Name: "plain", CopyLayerColor: "base", AllowTypes: { typed: 1 } },
        { Name: "shadow", AllowColorize: false, AllowTypes: { typed: 1 } },
    ],
};

const layerNames = {
    CN: {
        base: "基础",
        plain: "分层基础",
        shadow: "分层阴影",
    },
    EN: {
        base: "Normal Base (Colored)",
        plain: "Layered Base",
        shadow: "Layered Shadow",
    },
};

const translation = {
    CN: "随意滑落西装",
    EN: "Casual Dropped Suit",
};

const extended = {
    Archetype: ExtendedArchetype.TYPED,
    DrawImages: false,
    Options: [{ Name: "B" }, { Name: "L" }],
};

const assetStrings = {
    CN: {
        Select: "选择西装图层模式",
        B: "基础",
        L: "分层(较亮)",
    },
    EN: {
        Select: "Select Suit Layer Mode",
        B: "Base (Colored)",
        L: "Layered (Lighter)",
    },
};

export default function () {
    /** @type {AssetGroupBodyName[]} */
    const groups = ["Cloth", "ClothOuter"];
    for (const group of groups) {
        AssetManager.addAssetWithConfig(group, asset, {
            translation,
            layerNames,
            extended,
            assetStrings,
        });
    }
}

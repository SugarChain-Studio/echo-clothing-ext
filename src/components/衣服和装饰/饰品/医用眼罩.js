import { AssetManager } from "../../../assetForward";

const ENlang = {
    左: "Left",
    右: "Right",
};

const assets = ["左", "右"].map((side) => ({
    /** @type {CustomAssetDefinition} */ asset: {
        Name: `医用眼罩${side}`,
        Random: false,
        Left: 190,
        Top: 130,
        ParentGroup: {},
        Priority: 29,
        Extended: true,
        DynamicGroupName: "Glasses",
        DefaultColor: ["Default", "Default", "#F65E5E", "#242424"],
        Layer: [
            { Name: "线" },
            { Name: "底" },
            { Name: "心", AllowTypes: { typed: 1 } },
            { Name: "X", AllowTypes: { typed: 2 } },
        ],
    },
    translation: /** @type {Translation.Entry}*/ ({
        CN: `医用眼罩${side}`,
        EN: `Medical Eye Mask ${ENlang[side]}`,
    }),
    extended: /** @type {TypedItemConfig}*/ ({
        Archetype: ExtendedArchetype.TYPED,
        DrawImages: false,
        Options: [{ Name: "无图案" }, { Name: "心" }, { Name: "叉" }],
    }),
    layerNames: /** @type {Translation.String}*/ ({
        EN: {
            线: "Line",
            底: "Base",
            心: "Heart",
            X: "Cross",
        },
    }),
    assetStrings: /** @type {Translation.String}*/ ({
        CN: {
            Select: "选择图案",
            无图案: "无图案",
            心: "心",
            叉: "叉",
        },
        EN: {
            Select: "Select Pattern",
            无图案: "No Pattern",
            心: "Heart",
            叉: "Cross",
        },
    }),
}));

export default function () {
    for (const { asset, translation, extended, layerNames, assetStrings } of assets) {
        AssetManager.addAssetWithConfig(["Glasses", "Mask"], asset, {
            translation,
            extended,
            layerNames,
            assetStrings,
        });
    }
}

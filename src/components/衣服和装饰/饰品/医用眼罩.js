import { AssetManager } from "../../../assetForward";

/** @type {CustomAssetDefinition} */
const asset1 = {
    Name: "医用眼罩左",
    Random: false,
    Top: 0,
    Left: 0,
    ParentGroup: {},
    Priority: 29,
    Extended: true,
    DefaultColor: ["Default", "Default", "#F65E5E", "#242424"],
    Layer: [
        { Name: "线" },
        { Name: "底" },
        { Name: "心", AllowTypes: { typed: 1 } },
        { Name: "X", AllowTypes: { typed: 2 } },
    ],
};

const translations1 = {
    CN: "医用眼罩左",
    EN: "Medical Eye Mask Left",
};

const asset2 = {
    Name: "医用眼罩右",
    Random: false,
    Top: 0,
    Left: 0,
    ParentGroup: {},
    Priority: 29,
    Extended: true,
    DefaultColor: ["Default", "Default", "#F65E5E", "#242424"],
    Layer: [
        { Name: "线" },
        { Name: "底" },
        { Name: "心", AllowTypes: { typed: 1 } },
        { Name: "X", AllowTypes: { typed: 2 } },
    ],
};

const translations2 = {
    CN: "医用眼罩右",
    EN: "Medical Eye Mask Right",
};

const extended = {
    Archetype: ExtendedArchetype.TYPED,
    DrawImages: false,
    Options: [{ Name: "无图案" }, { Name: "心" }, { Name: "叉" }],
};

const layerNames = {
    EN: {
        线: "Line",
        底: "Base",
        心: "Heart",
        X: "Cross",
    },
};

/** @type {Translation.Dialog} */
const assetStrings = {
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
};

export default function () {
    AssetManager.addAssetWithConfig("Glasses", asset1, {
        layerNames,
        translation: translations1,
        extended,
        assetStrings,
    });
    AssetManager.addAssetWithConfig("Glasses", asset2, {
        layerNames,
        translation: translations2,
        extended,
        assetStrings,
    });
}

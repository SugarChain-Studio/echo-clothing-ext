import { AssetManager } from "../../../assetForward";

/** @type {CustomAssetDefinition} */
const asset = {
    Name: "珍珠带",
    Random: false,
    Left: 170,
    Top: 460,
    ParentGroup: {},
    Expose: ["ItemVulva", "ItemVulvaPiercings", "ItemButt"],
    PoseMapping: {},
    DefaultColor: ["#545454", "#000000", "Default"],
    Layer: [
        { Name: "rd" },
        { Name: "rg", AllowColorize: false, BlendingMode: "screen" },
        { Name: "sd" },
        { Name: "sg", AllowColorize: false, BlendingMode: "screen" },
        { Name: "pd" },
        { Name: "pg", AllowColorize: false, BlendingMode: "screen" },
    ],
};

/** @type {Translation.Entry} */
const translation = {
    CN: "珍珠带内裤",
    EN: "Pearl Strap Panties",
};

/** @type {Translation.Dialog} */
const layerNames = {
    CN: { rd: "金属环", sd: "绳带", pd: "珍珠" },
    EN: { rd: "Metal Ring", sd: "Strap", pd: "Pearl" },
};

export default function () {
    AssetManager.addAssetWithConfig("Panties", asset, { translation, layerNames });
}

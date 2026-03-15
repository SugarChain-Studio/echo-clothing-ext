import { AssetManager } from "../../../assetForward";
import { Type } from "../../../lib";

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
        Type.screenLayer({ Name: "rg" }),
        { Name: "sd" },
        Type.screenLayer({ Name: "sg" }),
        { Name: "pd" },
        Type.screenLayer({ Name: "pg" }),
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

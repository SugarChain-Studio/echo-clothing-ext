import { AssetManager } from "@local/AssetManager";
import { Layer } from "@local/lib/type";

/** @type {CustomAssetDefinition} */
const asset = {
    Name: "珍珠带",
    Random: false,
    Left: 170,
    Top: 460,
    ParentGroup: {},
    Expose: ["ItemVulva", "ItemVulvaPiercings", "ItemButt"],
    PoseMapping: {},
    Layer: [
        { Color: ["#545454"], Name: "rd" },
        Layer.screen({ Name: "rg" }),
        { Color: ["#000000"], Name: "sd" },
        Layer.screen({ Name: "sg" }),
        { Name: "pd" },
        Layer.screen({ Name: "pg" }),
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

import { ArmMaskTool } from "../../../lib";
import { AssetManager } from "../../../assetForward";
import { luziFixups } from "../../../lib/fixups";

/** @type {CustomAssetDefinition} */
const asset = {
    Name: "女仆装4-Luzi",
    Random: false,
    Top: 0,
    Left: 0,
    Priority: 30,
    PoseMapping: {
        Hogtied: "Hogtied",
        AllFours: PoseType.HIDE,
    },
    Layer: [{ Name: "A1" }, { Name: "A2" }, { Name: "A3" }, { Name: "A4" }, { Name: "A5" }, { Name: "A6" }],
};

/** @type {Translation.Entry} */
const translation = {
    CN: "女仆装4",
    EN: "Maid Dress 4",
};

/** @type {Translation.String} */
const layerNames = {
    CN: {
        A1: "内衬裙",
        A2: "上衣",
        A3: "裙子",
        A4: "围裙",
        A5: "束腰绳",
        A6: "束腰",
    },
    EN: {
        A1: "Lining Skirt",
        A2: "Top",
        A3: "Skirt",
        A4: "Apron",
        A5: "Waist Rope",
        A6: "Waist",
    },
};

export default function () {
    ArmMaskTool.createArmMaskForCloth("Cloth", asset);
    AssetManager.addAssetWithConfig("Cloth", asset, { translation, layerNames });
    luziFixups("Cloth", asset.Name);
}

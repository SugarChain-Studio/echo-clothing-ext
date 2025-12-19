import { ArmMaskTool } from "../../../lib";
import { AssetManager } from "../../../assetForward";

/** @type {CustomAssetDefinition} */
const asset = {
    Name: "糖果手杖",
    Random: false,
    Gender: "F",
    Top: 0,
    Left: 0,
    ParentGroup: {},
    Fetish: ["Sadism"],
    DefaultColor: ["#969696", "#A30000"],
    AllowActivity: ["RubItem", "SpankItem"],
    Layer: [{ Name: "Base" }, { Name: "Pattern" }],
};

const translation = {
    CN: "糖果手杖",
    EN: "Candy Cane",
};

const layerNames = {
    CN: { Base: "基础", Pattern: "图案" },
    EN: { Base: "Base", Pattern: "Pattern" },
};

export default function () {
    ArmMaskTool.createArmMaskForCloth("ItemHandheld", asset, "Right");
    AssetManager.addAssetWithConfig("ItemHandheld", asset, { translation, layerNames });
}

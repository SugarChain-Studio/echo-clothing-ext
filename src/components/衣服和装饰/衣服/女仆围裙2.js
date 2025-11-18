import { ArmMaskTool, PoseMapTool } from "../../../lib";
import { AssetManager } from "../../../assetForward";
import { luziSuffixFixups } from "../../../lib/fixups";

/** @type {CustomAssetDefinition} */
const asset = {
    Name: "女仆围裙2",
    Random: false,
    Top: 0,
    Left: 0,
    Priority: 32,
    DefaultColor: ["Default", "#000000"],
    ParentGroup: "BodyUpper",
    DynamicGroupName: "Cloth",
    PoseMapping: PoseMapTool.hideFullBody(),
    Layer: [{ Name: "裙" }, { Name: "扣子" }],
};

/** @type {Translation.Entry} */
const translation = {
    CN: "女仆围裙 2",
    EN: "Maid Apron 2",
};

const layerNames = {
    EN: {
        裙: "Skirt",
        扣子: "Button",
    },
};

export default function () {
    ArmMaskTool.createArmMaskForCloth("Cloth", asset);
    AssetManager.addAssetWithConfig(["Cloth", "ClothAccessory"], asset, { translation, layerNames });
    luziSuffixFixups(["Cloth", "ClothAccessory"], asset.Name);
}

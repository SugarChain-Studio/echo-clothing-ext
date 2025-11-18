import { ArmMaskTool } from "../../../lib";
import { AssetManager } from "../../../assetForward";
import { luziSuffixFixups } from "../../../lib/fixups";

/** @type {CustomAssetDefinition} */
const asset = {
    Name: "女仆装3",
    Random: false,
    Top: 0,
    Left: 0,
    Priority: 30,
    PoseMapping: {
        Hogtied: "Hogtied",
        AllFours: PoseType.HIDE,
    },
    Layer: [
        { Name: "A1" },
        { Name: "A2" },
        { Name: "B1" },
        { Name: "B2" },
        { Name: "B3" },
        { Name: "C1" },
        { Name: "C2" },
        { Name: "C3" },
        { Name: "C4" },
    ],
};

/** @type {Translation.Entry} */
const translation = {
    CN: "女仆装 3",
    EN: "Maid Dress 3",
};

/** @type {Translation.String} */
const layerNames = {
    CN: {
        A1: "后背蝴蝶结",
        A2: "内衬裙",
        B1: "衬衣色调",
        B2: "衬衣亮部",
        B3: "衬衣暗部",
        C1: "围裙色调",
        C2: "围裙暗部",
        C3: "扣子",
        C4: "衬衣衣领",
    },
    EN: {
        A1: "Back Bow",
        A2: "Lining Skirt",
        B1: "Shirt Tone",
        B2: "Shirt Bright Part",
        B3: "Shirt Dark Part",
        C1: "Apron Tone",
        C2: "Apron Dark Part",
        C3: "Buttons",
        C4: "Shirt Collar",
    },
};

export default function () {
    ArmMaskTool.createArmMaskForCloth("Cloth", asset);
    AssetManager.addAssetWithConfig("Cloth", asset, { translation, layerNames });
    luziSuffixFixups("Cloth", asset.Name);
}

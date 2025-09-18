import { ArmMaskTool } from "../../../lib";
import { AssetManager } from "../../../assetForward";
import { DialogTools, Tools } from "@mod-utils/Tools";

/** @type {CustomAssetDefinition} */
const asset = {
    Name: "警棍",
    Random: false,
    Left: 190,
    Top: 270,
    ParentGroup: {},
    Fetish: ["Sadism"],
    DefaultColor: ["Default", "Default", "Default", "#000000"],
    Layer: [
        { Name: "m" },
        { Name: "h2" },
        { Name: "h1" },
        { Name: "dp", CreateLayerTypes: ["typed"] },
        { Name: "gp", BlendingMode: "screen", AllowColorize: false, CreateLayerTypes: ["typed"] },
    ],
};

const layerNames = {
    CN: {
        m: "手柄金属",
        h2: "手柄颜色2",
        h1: "手柄颜色1",
        dp: "棍基础色",
    },
    EN: {
        m: "Handle Metal",
        h2: "Handle Color 2",
        h1: "Handle Color 1",
        dp: "Stick Base",
    },
};

const translation = {
    CN: "R18警棍",
    EN: "R18 Baton",
};

/** @type {TypedItemConfig} */
const extended = {
    Archetype: ExtendedArchetype.TYPED,
    DrawImages: false,
    ChatTags: Tools.CommonChatTags(),
    Options: [
        { Name: "1", Property: { AllowActivity: ["PenetrateItem"] } },
        { Name: "2", Property: { AllowActivity: ["MasturbateItem", "PenetrateItem"] } },
        { Name: "3", Property: { AllowActivity: ["RubItem", "PenetrateItem"] } },
    ],
};

const assetStrings = DialogTools.autoItemStrings(
    {
        CN: {
            Select: "选择R18警棍样式",
            1: "假阳具",
            2: "振动棒",
            3: "触手",
        },
        EN: {
            Select: "Select R18 Baton Style",
            1: "Dildo",
            2: "Vibrator",
            3: "Tentacle",
        },
    },
    extended
);

export default function () {
    ArmMaskTool.createArmMaskForCloth("ItemHandheld", asset, "Right");
    AssetManager.addAssetWithConfig("ItemHandheld", asset, {
        layerNames,
        translation,
        extended,
        assetStrings,
    });
}

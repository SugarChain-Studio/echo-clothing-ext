import { ArmMaskTool, Typing } from "../../../lib";
import { AssetManager } from "../../../assetForward";

/** @type {CustomAssetDefinition} */
const asset = {
    Name: "榨汁枪",
    Random: false,
    Left: 110,
    Top: 360,
    ParentGroup: {},
    AllowActivity: ["MasturbateItem"],
    Fetish: ["Sadism"],
    DefaultColor: ["Default", "#000000", "Default"],
    Layer: [
        { Name: "dc" },
        Typing.screenLayer({ Name: "gc" }),
        { Name: "dg" },
        Typing.screenLayer({ Name: "gg" }),
        { Name: "l" },
    ],
};

const layerNames = {
    CN: {
        dc: "杯基本",
        gc: "杯光泽",
        dg: "枪基本",
        gg: "枪光泽",
        l: "灯光",
    },
    EN: {
        dc: "Cup Base",
        gc: "Cup Gloss",
        dg: "Gun Base",
        gg: "Gun Gloss",
        l: "Light",
    },
};

const translation = {
    CN: "榨汁枪",
    EN: "Cup Gun",
};

export default function () {
    ArmMaskTool.createArmMaskForCloth("ItemHandheld", asset, "Right");
    AssetManager.addAssetWithConfig("ItemHandheld", asset, {
        layerNames,
        translation,
    });
}

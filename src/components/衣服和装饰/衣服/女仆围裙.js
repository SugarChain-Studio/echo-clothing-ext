import { ArmMaskTool, PoseMapTool } from "../../../lib";
import { AssetManager } from "../../../assetForward";

/** @type {CustomAssetDefinition} */
const asset = {
    Name: "女仆围裙_Luzi",
    Random: false,
    Top: 0,
    Left: 0,
    Priority: 32,
    DefaultColor: ["Default", "Default", "Default", "Default", "#000000"],
    ParentGroup: "BodyUpper",
    PoseMapping: PoseMapTool.hideFullBody(),
    Layer: [
        {
            Name: "肩带内",
            ColorGroup: "肩带",
            ParentGroup: {},
        },
        {
            Name: "肩带外",
            ColorGroup: "肩带",
            ParentGroup: {},
            PoseMapping: PoseMapTool.hideFullBody({
                Yoked: "Yoked",
                OverTheHead: "OverTheHead",
            }),
        },
        {
            Name: "裙",
            PoseMapping: PoseMapTool.hideFullBody(),
        },
        {
            Name: "荷叶边",
            PoseMapping: PoseMapTool.hideFullBody(),
        },
        {
            Name: "线上",
            ColorGroup: "描边线",
            PoseMapping: PoseMapTool.hideFullBody(),
        },
        {
            Name: "线下",
            ColorGroup: "描边线",
            ParentGroup: {},
            PoseMapping: PoseMapTool.hideFullBody(),
        },
    ],
};

/** @type {Translation.Entry} */
const translation = {
    CN: "女仆围裙",
    EN: "Maid Apron",
};

const layerNames = {
    CN: {
        肩带内: "内侧",
        肩带外: "外侧",
        肩带: "肩带",

        裙: "裙子",
        荷叶边: "荷叶边",
        描边线: "描边线",
        线下: "下边缘",
        线上: "上边缘",
    },
    EN: {
        肩带内: "Inner strap",
        肩带外: "Outer strap",
        肩带: "Strap",

        裙: "Skirt",
        荷叶边: "Ruffle",
        描边线: "Outline",
        线下: "Bottom edge",
        线上: "Top edge",
    },
};

export default function () {
    ArmMaskTool.createArmMaskForCloth("Cloth", asset, "Arm1");
    AssetManager.addAssetWithConfig("Cloth", asset, { translation, layerNames });
    AssetManager.addAssetWithConfig(
        "ClothAccessory",
        { ...asset, DynamicGroupName: "Cloth" },
        { translation, layerNames }
    );
}

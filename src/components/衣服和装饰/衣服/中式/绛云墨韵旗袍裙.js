import { ArmMaskTool, PoseMapTool } from "../../../lib";
import { AssetManager } from "../../../assetForward";
import { luziSuffixFixups } from "../../../lib/fixups";

/** @type {AssetLayerDefinition} */
const hideFB = {
    PoseMapping: PoseMapTool.hideFullBody(),
};

/** @type {CustomAssetDefinition} */
const asset = {
    Name: "绛云墨韵旗袍裙",
    Random: false,
    Gender: "F",
    Top: 0,
    Left: 0,
    Priority: 30,
    Prerequisite: ["HasBreasts"],
    PoseMapping: {
        AllFours: PoseType.HIDE,
        Hogtied: "Hogtied",
    },
    DefaultColor: [
        "Default",
        "Default",
        "Default",
        "Default",
        "#302D2D",
        "#2C2626",
        "Default",
        "#000000",
        "Default",
        "#302D2D",
        "#2C2626",
        "Default",
        "#000000",
        "Default",
        "#302D2D",
        "#2C2626",
        "Default",
        "Default",
        "Default",
        "Default",
    ],
    Layer: [
        { Name: "A1", ColorGroup: "Petticoat", Priority: 6, ...hideFB },
        { Name: "A2", ColorGroup: "Petticoat", ...hideFB },
        { Name: "A3", ColorGroup: "Petticoat", ...hideFB },
        { Name: "B1", ColorGroup: "Lace" },
        { Name: "B2", ColorGroup: "Cloth" },
        { Name: "B3", ColorGroup: "Darkening" },
        { Name: "B4", ColorGroup: "Edge", ...hideFB },
        { Name: "B5", ColorGroup: "Outline" },
        { Name: "B6", ColorGroup: "Edge" },
        { Name: "C1", ColorGroup: "Cloth", ...hideFB },
        { Name: "C2", ColorGroup: "Darkening", ...hideFB },
        { Name: "C3", ColorGroup: "Edge", ...hideFB },
        { Name: "C4", ColorGroup: "Outline", ...hideFB },
        { Name: "D1", ColorGroup: "Lace" },
        { Name: "D2", ColorGroup: "Cloth" },
        { Name: "D3", ColorGroup: "Darkening" },
        { Name: "D4", ColorGroup: "Acc" },
        { Name: "D5", ColorGroup: "Edge" },
        { Name: "D6", ColorGroup: "Acc", ...hideFB },
        { Name: "D7", ColorGroup: "Acc", ...hideFB },
    ],
};

const layerNames = {
    CN: {
        Petticoat: "蓬蓬裙",
        A1: "内侧",
        A2: "主体",
        A3: "阴影",

        Cloth: "旗袍布料",
        B2: "主体",
        C1: "两侧",
        D2: "肩部",

        Darkening: "旗袍阴影",
        B3: "主体",
        C2: "两侧",
        D3: "肩部",

        Edge: "旗袍边缘",
        B4: "主体",
        B6: "胸下",
        C3: "两侧",
        D5: "肩部",

        Outline: "旗袍描边",
        B5: "主体",
        C4: "两侧",

        Lace: "胸口花边",
        B1: "胸下",
        D1: "胸上",

        Acc: "配件",
        D4: "领口扣子",
        D6: "腰绳",
        D7: "下摆绳结",
    },
    EN: {
        Petticoat: "Petticoat",
        A1: "Inner",
        A2: "Main",
        A3: "Shadow",

        Cloth: "Qipao Fabric",
        B2: "Main",
        C1: "Sides",
        D2: "Shoulders",

        Darkening: "Qipao Shadow",
        B3: "Main",
        C2: "Sides",
        D3: "Shoulders",

        Edge: "Qipao Edge",
        B4: "Main",
        B6: "Under Chest",
        C3: "Sides",
        D5: "Shoulders",

        Outline: "Qipao Outline",
        B5: "Main",
        C4: "Sides",

        Lace: "Chest Lace",
        B1: "Under Chest",
        D1: "Upper Chest",

        Acc: "Accessories",
        D4: "Collar Button",
        D6: "Waist String",
        D7: "Hem Knot",
    },
};

const translation = {
    CN: "绛云墨韵旗袍裙",
    EN: "Crimson Clouds & Ink Rhyme Qipao Dress",
};

export default function () {
    ArmMaskTool.createArmMaskForCloth("Cloth", asset);
    AssetManager.addAssetWithConfig("Cloth", asset, { translation, layerNames });
    luziSuffixFixups("Cloth", asset.Name);
}

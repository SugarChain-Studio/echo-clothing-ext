import { ArmMaskTool } from "../../../armMask";
import { AssetManager } from "../../../assetForward";

const hideHogtied = {
    AllFours: PoseType.HIDE,
    Hogtied: PoseType.HIDE,
};

/** @type {CustomAssetDefinition} */
const asset = {
    Name: "绛云墨韵旗袍裙_Luzi",
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
        {
            Name: "A1",
            ColorGroup: "Petticoat",
            Priority: 6,
            PoseMapping: hideHogtied,
        },
        { Name: "A2", ColorGroup: "Petticoat", PoseMapping: hideHogtied },
        { Name: "A3", ColorGroup: "Petticoat", PoseMapping: hideHogtied },
        { Name: "B1", ColorGroup: "Lace" },
        { Name: "B2", ColorGroup: "Cloth" },
        { Name: "B3", ColorGroup: "Darkening" },
        { Name: "B4", ColorGroup: "Edge", PoseMapping: hideHogtied },
        { Name: "B5", ColorGroup: "Outline" },
        { Name: "B6", ColorGroup: "Edge" },
        { Name: "C1", ColorGroup: "Cloth", PoseMapping: hideHogtied },
        { Name: "C2", ColorGroup: "Darkening", PoseMapping: hideHogtied },
        { Name: "C3", ColorGroup: "Edge", PoseMapping: hideHogtied },
        { Name: "C4", ColorGroup: "Outline", PoseMapping: hideHogtied },
        { Name: "D1", ColorGroup: "Lace" },
        { Name: "D2", ColorGroup: "Cloth" },
        { Name: "D3", ColorGroup: "Darkening" },
        { Name: "D4" },
        { Name: "D5", ColorGroup: "Edge" },
        { Name: "D6", PoseMapping: hideHogtied },
        { Name: "D7", PoseMapping: hideHogtied },
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

        D4: "胸口扣子",
        D6: "腰绳",
        D7: "下摆绳结",
    },
    EN: {
        A1: "Petticoat Inner",
        A2: "Petticoat Main",
        A3: "Petticoat Shadow",

        Cloth: "Qipao Fabric",
        B2: "Qipao Fabric Main",
        C1: "Qipao Fabric Sides",
        D2: "Qipao Fabric Shoulders",

        Darkening: "Qipao Shadow",
        B3: "Qipao Shadow Main",
        C2: "Qipao Shadow Sides",
        D3: "Qipao Shadow Shoulders",

        Edge: "Qipao Edge",
        B4: "Qipao Edge Main",
        B6: "Qipao Edge Under Chest",
        C3: "Qipao Edge Sides",
        D5: "Qipao Edge Shoulders",

        Outline: "Qipao Outline",
        B5: "Qipao Outline Main",
        C4: "Qipao Outline Sides",

        Lace: "Chest Lace",
        B1: "Under Chest",
        D1: "Upper Chest",

        D4: "Chest Button",
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
}

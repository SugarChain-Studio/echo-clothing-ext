import { ArmMaskTool } from "../../../lib";
import { AssetManager } from "../../../assetForward";

/** @type {Partial<AssetLayerDefinition>} */
const hogShow = {
    ParentGroup: "BodyUpper",
    PoseMapping: {
        AllFours: PoseType.HIDE,
        Hogtied: "Hogtied",
    },
};

/** @type {Partial<AssetLayerDefinition>} */
const hogHide = {
    ParentGroup: "BodyUpper",
    PoseMapping: {
        AllFours: PoseType.HIDE,
        Hogtied: PoseType.HIDE,
    },
};

/** @type {Partial<AssetLayerDefinition>} */
const noPose = {
    PoseMapping: {},
    ParentGroup: {},
};

/** @type {CustomAssetDefinition} */
const asset = {
    Name: "洋装",
    Random: false,
    Gender: "F",
    Left: 70,
    Top: 200,
    Prerequisite: ["HasBreasts"],
    Priority: 30,
    DefaultColor: [
        "#000000",
        "#0E164D",
        "#020212",
        "#040820",
        "#020212",
        "#121113",
        "#000000",
        "#363330",
        "#0E164D",
        "#020212",
        "#0E164D",
        "#020212",
        "#0E164D",
        "#020212",
        "#0E164D",
        "#020212",
        "#0E164D",
        "#020212",
        "#0E164D",
        "#020212",
        "#0E164D",
        "#020212",
        "#0E164D",
        "#020212",
        "#1D1D1D",
        "#000000",
        "#0E164D",
        "#020212",
    ],
    Layer: [
        { Name: "E1", ...noPose },

        { Name: "A1", ...hogShow },
        { Name: "A2", ...hogShow },
        { Name: "B1", ...hogHide, Priority: 6 }, // Hogtied 是空的
        { Name: "B2", ...hogHide, Priority: 6 }, // Hogtied 是空的
        { Name: "C1", ...hogShow },
        { Name: "C2", ...hogShow },
        { Name: "C3", ...hogShow },
        { Name: "DA1", ...hogHide, ColorGroup: "花" }, // Hogtied 是空的
        { Name: "DA2", ...hogHide, ColorGroup: "花阴影" }, // Hogtied 是空的
        { Name: "DB1", ...hogHide, ColorGroup: "花" }, // Hogtied 是空的
        { Name: "DB2", ...hogHide, ColorGroup: "花阴影" }, // Hogtied 是空的
        { Name: "DC1", ...hogHide, ColorGroup: "花" }, // Hogtied 是空的
        { Name: "DC2", ...hogHide, ColorGroup: "花阴影" }, // Hogtied 是空的
        { Name: "DD1", ...hogShow, ColorGroup: "花" },
        { Name: "DD2", ...hogShow, ColorGroup: "花阴影" },
        { Name: "DE1", ...hogShow, ColorGroup: "花" },
        { Name: "DE2", ...hogShow, ColorGroup: "花阴影" },
        { Name: "DF1", ...hogHide, ColorGroup: "蝴蝶结" }, // Hogtied 是空的
        { Name: "DF2", ...hogHide, ColorGroup: "蝴蝶结阴影" }, // Hogtied 是空的
        { Name: "DG1", ...hogHide, ColorGroup: "蝴蝶结" }, // Hogtied 是空的
        { Name: "DG2", ...hogHide, ColorGroup: "蝴蝶结阴影" }, // Hogtied 是空的
        { Name: "DH1", ...hogHide, ColorGroup: "蝴蝶结" }, // Hogtied 是空的
        { Name: "DH2", ...hogHide, ColorGroup: "蝴蝶结阴影" }, // Hogtied 是空的

        { Name: "FA1", ...noPose }, // 项圈
        { Name: "FA2", ...noPose },
        { Name: "FB1", ...noPose, ColorGroup: "花" },
        { Name: "FB2", ...noPose, ColorGroup: "花阴影" },
    ],
};

const layerNames = {
    CN: {
        E1: "吊带",
        A1: "荷叶边",
        A2: "荷叶边阴影",

        B1: "侧边蝴蝶结",
        B2: "侧边蝴蝶结阴影",

        C1: "衣服",
        C2: "衣服阴影",
        C3: "衣服细节",

        DA1: "裙边A",
        DA2: "裙边A",
        DB1: "裙边B",
        DB2: "裙边B",
        DC1: "裙边C",
        DC2: "裙边C",
        FB1: "项圈",
        FB2: "项圈",

        花: "花",
        花阴影: "花阴影",

        DD1: "胸口装饰带",
        DD2: "胸口装饰带",
        DE1: "胸口",
        DE2: "胸口",

        DF1: "腰",
        DF2: "腰",

        DG1: "裙边A",
        DG2: "裙边A",
        DH1: "裙边B",
        DH2: "裙边B",

        蝴蝶结: "蝴蝶结",
        蝴蝶结阴影: "蝴蝶结阴影",

        FA1: "项圈花纹",
        FA2: "项圈底色",
    },
    EN: {
        E1: "Strap",
        A1: "Ruffle",
        A2: "Ruffle Shadow",

        B1: "Side Bow",
        B2: "Side Bow Shadow",

        C1: "Dress",
        C2: "Dress Shadow",
        C3: "Dress Detail",

        DA1: "Edge A",
        DA2: "Edge A",
        DB1: "Edge B",
        DB2: "Edge B",
        DC1: "Edge C",
        DC2: "Edge C",
        FB1: "Collar",
        FB2: "Collar",
        花: "Flower",
        花阴影: "Flower Shadow",

        DD1: "Chest Strap",
        DD2: "Chest Strap",
        DE1: "Chest",
        DE2: "Chest",

        DF1: "Waist",
        DF2: "Waist",

        DG1: "Edge A",
        DG2: "Edge A",
        DH1: "Edge B",
        DH2: "Edge B",

        蝴蝶结: "Bow",
        蝴蝶结阴影: "Bow Shadow",

        FA1: "Collar Pattern",
        FA2: "Collar Base",
    },
};

const translation = {
    CN: "洛丽塔小洋装",
    EN: "Lolita Short Dress",
};

export default function () {
    ArmMaskTool.createArmMaskForCloth("Cloth", asset);
    AssetManager.addAssetWithConfig("Cloth", asset, { translation, layerNames });
}

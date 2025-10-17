import { ArmMaskTool } from "../../../lib";
import { AssetManager } from "../../../assetForward";

/** @type {Partial<AssetLayerDefinition>} */
const bottomLayerShared = {
    PoseMapping: {
        AllFours: PoseType.HIDE,
        Hogtied: "Hogtied",
    },
};

/** @type {Partial<AssetLayerDefinition>} */
const bottomLayerShared2 = {
    PoseMapping: {
        AllFours: PoseType.HIDE,
        Hogtied: PoseType.HIDE,
    },
};

/** @type {Partial<AssetLayerDefinition>} */
const bottomLayerShared3 = {
    PoseMapping: {}, ParentGroup: {},
};

/** @type {CustomAssetDefinition} */
const asset = {
    Name: "洋装",
    Random: false,
    Gender: "F",
    Top: 0,
    Left: 0,
    Prerequisite: ["HasBreasts"],
    Priority: 30,
    DefaultColor: ["#000000", "#0E164D", "#020212", "#040820", "#020212", "#121113", "#000000", "#363330",
        "#0E164D", "#020212",
        "#0E164D", "#020212",
        "#0E164D", "#020212",
        "#0E164D", "#020212",
        "#0E164D", "#020212",
        "#0E164D", "#020212",
        "#0E164D", "#020212",
        "#0E164D", "#020212",
        "#1D1D1D", "#000000",
        "#0E164D", "#020212",
    ],
    Layer: [
        { Name: "E1", ...bottomLayerShared3 },

        { Name: "A1", ...bottomLayerShared },
        { Name: "A2", ...bottomLayerShared },
        { Name: "B1", ...bottomLayerShared2 }, // Hogtied 是空的
        { Name: "B2", ...bottomLayerShared2 }, // Hogtied 是空的
        { Name: "C1", ...bottomLayerShared },
        { Name: "C2", ...bottomLayerShared },
        { Name: "C3", ...bottomLayerShared },
        { Name: "DA1", ...bottomLayerShared2 }, // Hogtied 是空的
        { Name: "DA2", ...bottomLayerShared2 }, // Hogtied 是空的
        { Name: "DB1", ...bottomLayerShared2 }, // Hogtied 是空的
        { Name: "DB2", ...bottomLayerShared2 }, // Hogtied 是空的
        { Name: "DC1", ...bottomLayerShared2 }, // Hogtied 是空的
        { Name: "DC2", ...bottomLayerShared2 }, // Hogtied 是空的
        { Name: "DD1", ...bottomLayerShared },
        { Name: "DD2", ...bottomLayerShared },
        { Name: "DE1", ...bottomLayerShared },
        { Name: "DE2", ...bottomLayerShared },
        { Name: "DF1", ...bottomLayerShared2 }, // Hogtied 是空的
        { Name: "DF2", ...bottomLayerShared2 }, // Hogtied 是空的
        { Name: "DG1", ...bottomLayerShared2 }, // Hogtied 是空的
        { Name: "DG2", ...bottomLayerShared2 }, // Hogtied 是空的
        { Name: "DH1", ...bottomLayerShared2 }, // Hogtied 是空的
        { Name: "DH2", ...bottomLayerShared2 }, // Hogtied 是空的

        { Name: "FA1", ...bottomLayerShared3 }, // 项圈
        { Name: "FA2", ...bottomLayerShared3 },
        { Name: "FB1", ...bottomLayerShared3 },
        { Name: "FB2", ...bottomLayerShared3 },
    ],
};

const layerNames = {
    CN: {
        // A1: "", // 荷叶边
        // A2: "",
        // B1: "", // 侧边蝴蝶结
        // B2: "",
        // C1: "", // 衣服
        // C2: "",
        // C3: "",
        // DA1: "",
        // DA2: "",
        // DB1: "",
        // DB2: "",
        // DC1: "",
        // DC2: "",
        // DD1: "",
        // DD2: "",
        // DE1: "",
        // DE2: "",
        // DF1: "",
        // DF2: "",
        // DG1: "",
        // DG2: "",
        // DH1: "",
        // DH2: "",
    },
};

const translation = {
    CN: "洋装",
    EN: "洋装",
};

export default function () {
    ArmMaskTool.createArmMaskForCloth("Cloth", asset);
    AssetManager.addAssetWithConfig("Cloth", asset, { translation, layerNames });
}

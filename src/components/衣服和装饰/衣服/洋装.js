import { AssetManager } from "../../../assetForward";

/** @type {CustomAssetDefinition} */
const asset = {
    Name: "洋装",
    Random: false,
    Gender: "F",
    Top: 0,
    Left: 0,
    ParentGroup: {},
    Prerequisite: ["HasBreasts"],
    PoseMapping: {
        Hogtied: "Hogtied",
    },
    Priority: 30,
    Layer: [
        { Name: "A1" },
        { Name: "A2" },
        { Name: "B1" },
        { Name: "B2" },
        { Name: "C1" },
        { Name: "C2" },
        { Name: "C3" },
        { Name: "DA1" },
        { Name: "DA2" },
        { Name: "DB1" },
        { Name: "DB2" },
        { Name: "DC1" },
        { Name: "DC2" },
        { Name: "DD1" },
        { Name: "DD2" },
        { Name: "DE1" },
        { Name: "DE2" },
        { Name: "DF1" },
        { Name: "DF2" },
        { Name: "DG1" },
        { Name: "DG2" },
        { Name: "DH1" },
        { Name: "DH2" },

    ],
};

const layerNames = {
    EN: {
        前: "Front",
        后: "Back",
        图案: "Pattern",
    },
};

const translation = {
    CN: "洋装",
    EN: "Ghost Cloak",
};

export default function () {
    AssetManager.addAssetWithConfig("Cloth", asset, { translation, layerNames });
}

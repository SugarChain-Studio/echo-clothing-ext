import { AssetManager } from "../../assetForward";

/** @type {CustomAssetDefinition} */
const asset = {
    Name: "正坐椅",
    Random: false,
    Left: 110,
    Top: 500,
    Gender: "F",
    SetPose: ["Kneel"],
    Priority: 2,
    ParentGroup: {},
    Layer: [{ Name: "椅子" }, { Name: "垫子" }],
};

const layerNames = {
    CN: { 椅子: "椅子", 垫子: "垫子" },
    EN: { 椅子: "Chair", 垫子: "Cushion" },
};

const translation = {
    CN: "正坐椅",
    EN: "Seizaisu",
};

/** @type {CustomAssetDefinition} */
const asset2 = {
    Name: "正坐椅L",
    Random: false,
    Left: 140,
    Top: 490,
    Gender: "F",
    SetPose: ["Kneel"],
    Priority: 2,
    ParentGroup: {},
    Layer: [{ Name: "椅子" }, { Name: "垫子" }],
};

export default function () {
    AssetManager.addAssetWithConfig("ItemDevices", asset, { layerNames, translation });
    AssetManager.addAssetWithConfig("ItemDevices", asset2, {
        layerNames,
        translation: {
            CN: "正坐椅 (传统)",
            EN: "Seizaisu (Traditional)",
        },
    });
}

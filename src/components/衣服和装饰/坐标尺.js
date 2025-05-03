import { AssetManager } from "../../assetForward";

/** @type {CustomAssetDefinition} */
const asset = {
    Name: "坐标尺_Luzi",
    Random: false,
    Top: 0,
    Left: 0,
    Priority: 99,
    DynamicGroupName: "BodyMarkings2_Luzi",
    Alpha: [
        {
            Group: ["ItemDevices"],
            Masks: [
                [0, 100, 100, 100], //下
            ],
        },
    ],
};

const translation = { CN: "坐牢尺", EN: "Grid" };

export default function () {
    AssetManager.addAssetWithConfig("BodyMarkings2_Luzi", asset, { translation, layerNames: {} });
}

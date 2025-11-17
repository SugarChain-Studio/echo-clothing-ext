import { AssetManager } from "../../../assetForward";
import { PoseMapTool } from "../../../lib";

/** @type {CustomAssetDefinition} */
const asset = {
    Name: "乳胶紧身衣-Luzi",
    Random: false,
    Top: 0,
    Left: 0,
    Priority: 16,
    ParentGroup: "BodyUpper",
    PoseMapping: PoseMapTool.config(["Hogtied"], ["AllFours"]),
    Layer: [{ Name: "衣" }, { Name: "阴影" }, { Name: "高光" }],
};

const layerNames = {
    EN: {
        衣: "Cloth",
        阴影: "Shadow",
        高光: "Highlight",
    },
};

/** @type {Translation.Entry} */
const translation = {
    CN: "乳胶紧身衣",
    EN: "Latex Bodysuit",
};

export default function () {
    AssetManager.addAssetWithConfig("Suit", asset, { translation, layerNames });
}

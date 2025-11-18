import { AssetManager } from "../../../assetForward";
import { PoseMapTool } from "../../../lib";
import { luziSuffixFixups } from "../../../lib/fixups";

/** @type {CustomAssetDefinition} */
const asset = {
    Name: "奶牛",
    Random: false,
    Gender: "F",
    Top: 0,
    Left: 0,
    Prerequisite: ["HasBreasts"],
    PoseMapping: PoseMapTool.hideFullBody(),
    Layer: [
        { Name: "衣服", Priority: 26 },
        { Name: "边缘", Priority: 26 },
    ],
};

const layerNames = {
    EN: {
        衣服: "Clothes",
        边缘: "Edge",
    },
};

const translation = {
    CN: "奶牛",
    EN: "Cow",
    RU: "Корова",
};

export default function () {
    AssetManager.addAssetWithConfig("Cloth", asset, { translation, layerNames });
    luziSuffixFixups("Cloth", asset.Name);
}

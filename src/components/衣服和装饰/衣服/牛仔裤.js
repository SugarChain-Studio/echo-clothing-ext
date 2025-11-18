import { PoseMapTool } from "../../../lib";
import { AssetManager } from "../../../assetForward";
import { luziFixups } from "../../../lib/fixups";

/** @type {CustomAssetDefinition} */
const asset = {
    Name: "牛仔裤-Luzi",
    Random: false,
    Top: 0,
    Left: {
        [PoseType.DEFAULT]: 0,
        KneelingSpread: 90,
    },
    Layer: [
        {
            Name: "扣子",
            Priority: 27,
            PoseMapping: PoseMapTool.hideFullBody(),
        },
        {
            Name: "裤子A1",
            Priority: 26,
            PoseMapping: PoseMapTool.hideFullBody({
                Kneel: "Kneel",
                KneelingSpread: "KneelingSpread",
                LegsClosed: "LegsClosed",
                Spread: "Spread",
            }),
        },
        {
            Name: "裤子A2",
            Priority: 1,
            PoseMapping: PoseMapTool.hideFullBody({
                Kneel: PoseType.HIDE,
                KneelingSpread: PoseType.HIDE,
                LegsClosed: "LegsClosed",
                Spread: "Spread",
            }),
        },
    ],
};

const layerNames = {
    EN: {
        扣子: "Buttons",
        裤子A1: "Pants A1",
        裤子A2: "Pants A2",
    },
};

/** @type {Translation.Entry} */
const translation = {
    CN: "宽松牛仔裤",
    EN: "Baggy Jeans",
};

export default function () {
    AssetManager.addAssetWithConfig("ClothLower", asset, { translation, layerNames });
    luziFixups("ClothLower", asset.Name);
}

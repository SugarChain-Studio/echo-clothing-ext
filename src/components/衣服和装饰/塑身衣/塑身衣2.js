import { PoseMapTool } from "../../../lib";
import { AssetManager } from "../../../assetForward";

/** @type {AssetLayerDefinition} */
const base = {
    PoseMapping: PoseMapTool.hideFullBody({
        LegsClosed: PoseType.DEFAULT,
        Kneel: PoseType.DEFAULT,
    }),
};

/** @type {AssetLayerDefinition} */
const baseLC = {
    PoseMapping: PoseMapTool.hideFullBody({
        LegsClosed: "LegsClosed",
        Kneel: "LegsClosed",
    }),
};

/** @type {CustomAssetDefinition} */
const asset = {
    Name: "塑身衣2_Luzi",
    Random: false,
    Top: 0,
    Left: {
        [PoseType.DEFAULT]: 0,
        KneelingSpread: 90,
    },
    Priority: 14,
    SetPose: ["LegsClosed", "Kneel"],
    AllowActivePose: ["LegsClosed", "Kneel"],
    Layer: [
        { Name: "上", ...base },
        { Name: "下", ...baseLC },
        { Name: "上图案", ...base },
        { Name: "下图案", ...baseLC },
        { Name: "上中线", ...base },
        { Name: "下中线", ...baseLC },
        { Name: "上线", ...base },
        { Name: "下线", ...baseLC },
    ],
};

const layerNames = {
    EN: {
        上: "Top",
        下: "Bottom",
        上图案: "Top Pattern",
        下图案: "Bottom Pattern",
        上中线: "Top Center",
        下中线: "Bottom Center",
        上线: "Top Line",
        下线: "Bottom Line",
    },
};

/** @type {Translation.Entry} */
const translation = {
    CN: "塑身衣 2",
    EN: "Shapewear 2",
};

export default function () {
    AssetManager.addAssetWithConfig("ClothLower", asset, { layerNames, translation });
}

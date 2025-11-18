import { AssetManager } from "../../../assetForward";
import { luziSuffixFixups } from "../../../lib/fixups";

/** @type {CustomAssetDefinition} */
const asset = {
    Name: "女仆胸罩",
    Random: false,
    Left: 170,
    Top: 270,
    Priority: 16,
    Layer: [
        {
            Name: "花边",
            ParentGroup: "BodyLower",
            PoseMapping: {
                Hogtied: PoseType.DEFAULT,
                AllFours: PoseType.HIDE,
            },
        },
        {
            Name: "胸罩",
            ParentGroup: "BodyUpper",
            PoseMapping: {
                Hogtied: "Hogtied",
                AllFours: PoseType.HIDE,
            },
        },
    ],
};

const layerNames = { EN: { 花边: "Lace", 胸罩: "Bra" } };

/** @type {Translation.Entry} */
const translation = { CN: "女仆胸罩", EN: "Maid Bra" };

export default function () {
    AssetManager.addAssetWithConfig("Bra", asset, { layerNames, translation });
    luziSuffixFixups("Bra", asset.Name);
}

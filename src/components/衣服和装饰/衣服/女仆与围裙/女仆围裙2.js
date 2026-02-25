import { ArmMaskTool, PoseMapTool, PostPass } from "../../../../lib";
import { AssetManager } from "../../../../assetForward";
import { luziSuffixFixups } from "../../../../lib/fixups";

/** @type {AddAssetWithConfigParams} */
const asset = [
    ["Cloth", "ClothAccessory"],
    PostPass.asset(
        {
            Name: "女仆围裙2",
            Random: false,
            Top: 0,
            Left: 0,
            Priority: 32,
            DefaultColor: ["Default", "#000000"],
            ParentGroup: "BodyUpper",
            DynamicGroupName: "Cloth",
            PoseMapping: PoseMapTool.hideFullBody(),
            Layer: [{ Name: "裙" }, { Name: "扣子" }],
        },
        (asset) => {
            ArmMaskTool.createArmMaskForCloth("Cloth", asset);
            luziSuffixFixups(["Cloth", "ClothAccessory"], asset.Name);
        }
    ),
    {
        translation: { CN: "女仆围裙 2", EN: "Maid Apron 2" },
        layerNames: {
            EN: {
                裙: "Skirt",
                扣子: "Button",
            },
        },
    },
];

export default function () {
    AssetManager.addAssetWithConfig(...asset);
}

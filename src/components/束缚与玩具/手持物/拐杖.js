import { AssetManager } from "../../../assetForward";
import { ArmMaskTool, PostPass } from "../../../lib";

/** @type {AddAssetWithConfigParams} */
const asset = [
    ["ItemHandheld", "ClothAccessory"],
    PostPass.asset(
        {
            Name: "拐杖",
            Random: false,
            Left: 200,
            Top: 420,
            Difficulty: -10,
            Priority: 35,
            IsRestraint: false,
            DynamicGroupName: "ItemHandheld",
            ParentGroup: {},
            PoseMapping: {},
        },
        (asset) => {
            ArmMaskTool.createArmMaskForCloth("ItemHandheld", asset, "Right");
        }
    ),
    {
        translation: { CN: "拐杖", EN: "Walking Cane" },
    },
];

export default function () {
    AssetManager.addAssetWithConfig(...asset);
}

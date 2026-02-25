import { ArmMaskTool, PoseMapTool, PostPass } from "../../../../lib";
import { AssetManager } from "../../../../assetForward";

/** @type {AddAssetWithConfigParams} */
const asset = [
    "ClothAccessory",
    PostPass.asset(
        {
            Name: "围裙",
            Random: false,
            Left: 110,
            Top: 400,
            Priority: 27,
            ParentGroup: {},
            PoseMapping: PoseMapTool.hideFullBody(),
            DynamicGroupName: "ClothAccessory",
            DefaultColor: ["Default", "Default", "Default", "#242424"],
            Layer: [{ Name: "A1" }, { Name: "A2" }, { Name: "A3" }, { Name: "A4" }],
        },
        (asset) => {
            ArmMaskTool.createArmMaskForCloth("Cloth", asset);
        }
    ),
    {
        translation: { CN: "猫爪围裙", EN: "Cat Paw Apron" },
        layerNames: {
            CN: { A1: "底色", A2: "明暗", A3: "边缘", A4: "猫爪" },
            EN: { A1: "Base Color", A2: "Shading", A3: "Edge", A4: "Cat Paw" },
        },
    },
];

export default function () {
    AssetManager.addAssetWithConfig(...asset);
}

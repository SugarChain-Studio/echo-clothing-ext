import { AssetManager } from "../../../../assetForward";
import { PoseMapTool } from "../../../../lib";

/** @type { AddAssetWithConfigParams }} */
const assets = [
    ["ClothAccessory", "长袖子_Luzi"],
    {
        Name: "袖子",
        Random: false,
        Left: 60,
        Top: 60,
        ParentGroup: "BodyUpper",
        DynamicGroupName: "长袖子_Luzi",
        DefaultColor: ["Default", "Default", "#333333", "Default"],
        PoseMapping: PoseMapTool.config(
            ["BackBoxTie", "BackCuffs", "BackElbowTouch", "OverTheHead", "Yoked"],
            ["Hogtied", "AllFours"]
        ),
        Priority: 36,
        Layer: [
            { Name: "A1" },
            { Name: "A2" },
            { Name: "A3" },
            { Name: "A4", ...PoseMapTool.layerConfig(true, [], ["BackBoxTie", "BackElbowTouch"]) },
        ],
    },
    {
        translation: { CN: "分离羊腿袖", EN: "Detached Gigot Sleeve" },
        layerNames: {
            CN: { A1: "底色", A2: "明暗", A3: "边线", A4: "袖口" },
            EN: { A1: "Base", A2: "Shading", A3: "Outline", A4: "Cuffs" },
        },
    },
];

export default function () {
    AssetManager.addAssetWithConfig(...assets);
}

import { PoseMapTools } from "@mod-utils/Tools";
import { AssetManager } from "../../../assetForward";

/** @type { AddAssetWithConfigParams }} */
const asset = [
    "Bracelet",
    {
        Name: "女仆手镯",
        Random: false,
        Left: { "": 160, "OverTheHead": 120, "Yoked": 60 },
        Top: { "": 370, "OverTheHead": 60, "Yoked": 200 },
        ParentGroup: {},
        PoseMapping: PoseMapTools.HideFullBody({
            OverTheHead: "OverTheHead",
            Yoked: "Yoked",
            BackElbowTouch: "Hide",
            BackBoxTie: "Hide",
            BackCuffs: "Hide",
        }),
        Layer: [
            { Name: "左1", ColorGroup: "褶边" },
            { Name: "右1", ColorGroup: "褶边" },
            { Name: "左2", ColorGroup: "主体" },
            { Name: "右2", ColorGroup: "主体" },
        ],
    },
    {
        translation: { CN: "女仆手镯", EN: "Maid Bracelet" },
        layerNames: { EN: { 左: "Left", 右: "Right", 褶边: "Frill", 主体: "Main" } },
    },
];

export default function () {
    AssetManager.addAssetWithConfig(...asset);
}

import { AssetManager } from "../../../assetForward";

/** @type { AddAssetWithConfigParams }} */
const assets = [
    "长袖子_Luzi",
    {
        Name: "广袖_Luzi",
        Random: false,
        Top: 0,
        Left: 0,
        ParentGroup: {},
        PoseMapping: {
            BackBoxTie: "Hide",
            BackCuffs: "Hide",
            BackElbowTouch: "Hide",
            OverTheHead: "OverTheHead",
            Yoked: "Yoked",
            Hogtied: "Hide",
            AllFours: "Hide",
        },
        Layer: [
            { Name: "袖子", Priority: 36 },
            {
                Name: "臂环",
                Priority: 36,
                InheritPoseMappingFields: true,
                PoseMapping: { OverTheHead: "Hide" },
                CopyLayerColor: "袖子",
            },
            { Name: "渐变", Priority: 35 },
            { Name: "花纹", Priority: 36 },
        ],
    },
    {
        translation: { CN: "广袖", EN: "Wide Sleeve" },
    },
];

export default function () {
    AssetManager.addAssetWithConfig(...assets);
}

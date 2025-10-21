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
        Priority: 36,
        Layer: [
            { Name: "袖子" },
            { Name: "渐变", Priority: 35 },
            { Name: "花纹" },
            {
                Name: "臂环渐变",
                InheritPoseMappingFields: true,
                PoseMapping: { OverTheHead: "Hide" },
                CopyLayerColor: "臂环",
                Priority: 35,
                AllowTypes: { ar: 0 },
            },
            {
                Name: "臂环",
                InheritPoseMappingFields: true,
                PoseMapping: { OverTheHead: "Hide" },
                CopyLayerColor: "袖子",
                AllowTypes: { ar: 0 },
            },
        ],
    },
    {
        translation: { CN: "广袖", EN: "Wide Sleeve" },
        layerNames: {
            EN: {
                袖子: "Sleeve",
                渐变: "Gradient",
                花纹: "Pattern",
            },
        },
        extended: {
            Archetype: ExtendedArchetype.MODULAR,
            DrawImages: false,
            Modules: [{ Name: "臂环", Key: "ar", Options: [{}, {}] }],
        },
        assetStrings: {
            CN: {
                SelectBase: "配置广袖",

                Module臂环: "臂环",
                Select臂环: "配置臂环",
                Optionar0: "显示",
                Optionar1: "隐藏",
            },
            EN: {
                SelectBase: "Configure Wide Sleeve",

                Module臂环: "Arm Ring",
                Select臂环: "Configure Arm Ring",
                Optionar0: "Show",
                Optionar1: "Hide",
            },
        },
    },
];

export default function () {
    AssetManager.addAssetWithConfig(...assets);
}

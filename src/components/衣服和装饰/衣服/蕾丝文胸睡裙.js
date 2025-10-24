import { ArmMaskTool, PostPass } from "../../../lib";
import { AssetManager } from "../../../assetForward";

/** @type {AddAssetWithConfigParams} */
const asset = [
    ["Cloth", "Bra"],
    PostPass.asset(
        {
            Name: "蕾丝文胸睡裙",
            Random: false,
            Left: 150,
            Top: 220,
            Priority: 21,
            ParentGroup: "BodyUpper",
            PoseMapping: {
                Hogtied: "Hogtied",
                AllFours: PoseType.HIDE,
            },
            DynamicGroupName: "Cloth",
            DefaultColor: ["#797070", "#937373", "#25251F", "#AA8484"],
            Layer: [
                { Name: "基础" },
                { Name: "文胸基础" },
                { Name: "边缘" },
                { Name: "文胸基础阴影", BlendingMode: "multiply", AllowColorize: false },
                { Name: "文胸蕾丝" },
                {
                    Name: "下摆阴影",
                    BlendingMode: "multiply",
                    AllowColorize: false,
                    PoseMapping: {
                        Hogtied: PoseType.HIDE,
                        AllFours: PoseType.HIDE,
                    },
                },
                { Name: "文胸阴影", BlendingMode: "multiply", AllowColorize: false },
            ],
        },
        (asset) => ArmMaskTool.createArmMaskForCloth("Cloth", asset)
    ),
    {
        translation: { CN: "蕾丝文胸睡裙", EN: "Lace Bra Nightgown" },
        layerNames: {
            EN: {
                基础: "Base",
                文胸基础: "Bra Base",
                边缘: "Edge",
                文胸基础阴影: "Bra Base Shadow",
                文胸蕾丝: "Bra Lace",
                下摆阴影: "Hem Shadow",
                文胸阴影: "Bra Shadow",
            },
        },
    },
];

export default function () {
    AssetManager.addAssetWithConfig(...asset);
}

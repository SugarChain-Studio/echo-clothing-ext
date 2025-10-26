import { AssetManager } from "../../../assetForward";
import { ArmMaskTool } from "../../../lib";

/** @type {AddAssetWithConfigParams} */
const asset = [
    ["ItemHandheld", "ClothAccessory"],
    {
        Name: "电吉他",
        Random: false,
        Left: 30,
        Top: 180,
        Difficulty: -10,
        Priority: 35,
        IsRestraint: false,
        DynamicGroupName: "ItemHandheld",
        ParentGroup: {},
        DefaultColor: [
            "Default",
            "Default",
            "Default",
            "#202020",
            "Default",
            "Default",
            "Default",
            "#333333",
            "Default",
            "Default",
            "Default",
        ],
        PoseMapping: {},
        Layer: [
            { Name: "A1", ColorGroup: "肩带", Priority: 6 },
            { Name: "A2", ColorGroup: "肩带" },
            { Name: "A3" },
            { Name: "B1" },
            { Name: "B2", BlendingMode: "multiply", AllowColorize: false },
            { Name: "B3" },
            { Name: "B4" },
            { Name: "B5" },
            { Name: "B6" },
            { Name: "B7" },
            { Name: "B8" },
            { Name: "B9" },
        ],
    },
    {
        translation: { CN: "电吉他", EN: "Electric Guitar" },
        layerNames: {
            CN: {
                A1: "后",
                A2: "前",
                A3: "肩带挂钩",
                B1: "基础",
                B2: "基础高光",
                B3: "拾音器面板",
                B4: "琴颈",
                B5: "拾音器和琴桥",
                B6: "轮廓线",
                B7: "旋钮",
                B8: "品丝",
                B9: "琴弦",

                肩带: "肩带",
            },
            EN: {
                A1: "A",
                A2: "B",
                A3: "Strap Hook",
                B1: "Base",
                B2: "Base Highlight",
                B3: "Pickup Panel",
                B4: "Neck",
                B5: "Pickups and Bridge",
                B6: "Outline",
                B7: "Tuners",
                B8: "Frets",
                B9: "Strings",

                肩带: "Shoulder Strap",
            },
        },
    },
];

export default function () {
    ArmMaskTool.createArmMaskForCloth("ItemHandheld", asset[1], "Short");
    AssetManager.addAssetWithConfig(...asset);
}

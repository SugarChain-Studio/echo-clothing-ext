import { AssetManager } from "../../../assetForward";
import { ArmMaskTool } from "../../../lib";

/** @type { AddAssetWithConfigParams[] }} */
const assets = [
    [
        "ItemHands",
        {
            Name: "拳击手套_Luzi",
            Random: false,
            Gender: "F",
            ParentGroup: {},
            PoseMapping: {
                ...AssetPoseMapping.ItemHands,
                Yoked: "Yoked",
                OverTheHead: "OverTheHead",
                BackCuffs: "Hide",
                AllFours: "Hide",
            },
            SetPose: ["TapedHands"],
            AllowLock: true,
            Effect: [E.Block, E.BlockWardrobe, E.MergedFingers],
            Hide: ["ItemHandheld"],
        },
        { translation: { CN: "拳击手套", EN: "Boxing Gloves" } },
    ],
    [
        "ItemHandheld",
        {
            Name: "电蚊拍_Luzi",
            Random: false,
            Top: -110,
            Left: 0,
            Difficulty: -10,
            ParentGroup: {},
            Fetish: ["Sadism"],
            AllowActivity: ["ShockItem"],
            ActivityAudio: ["Shocks"],
            PoseMapping: { ...AssetPoseMapping.ItemHandheld },
        },
        { translation: { CN: "电蚊拍", EN: "Electric Fly Swatter" } },
    ],
    [
        "ItemHandheld",
        {
            Name: "书",
            Random: false,
            Left: 180,
            Top: 340,
            Difficulty: -10,
            ParentGroup: {},
            PoseMapping: { ...AssetPoseMapping.ItemHandheld },
            Layer: [{ Name: "页" }, { Name: "壳" }],
        },
        { translation: { CN: "书", EN: "Book" } },
    ],
    [
        "ItemHandheld",
        {
            Name: "奶瓶",
            Random: false,
            Left: 200,
            Top: 350,
            Difficulty: -10,
            ParentGroup: {},
            Priority: 46,
            PoseMapping: { ...AssetPoseMapping.ItemHandheld },
            Layer: [{ Name: "奶" }, { Name: "玻璃" }, { Name: "盖子" }],
        },
        { translation: { CN: "奶瓶", EN: "Milk Bottle" } },
    ],
    [
        "ItemHandheld",
        {
            Name: "红包",
            Random: false,
            Top: 0,
            Left: 0,
            Difficulty: -10,
            ParentGroup: {},
            Priority: 46,
            PoseMapping: { ...AssetPoseMapping.ItemHandheld },
        },
        { translation: { CN: "红包", EN: "Red Packet" } },
    ],
    [
        "ItemHandheld",
        {
            Name: "伊偶_Luzi",
            Random: false,
            Gender: "F",
            Top: { OverTheHead: -100 },
            Difficulty: -10,
            ParentGroup: {},
            Priority: 46,
            PoseMapping: { ...AssetPoseMapping.ItemHandheld, Yoked: "Yoked", OverTheHead: "OverTheHead" },
        },
        { translation: { CN: "伊偶", EN: "Cyäegha Doll" } },
    ],
];

export default function () {
    const book = assets.find(([_, asset]) => asset.Name === "书");
    ArmMaskTool.createArmMaskForCloth("ItemHandheld", book[1]);
    AssetManager.addAssetWithConfig(assets);
}

import { AssetManager } from "../../../assetForward";

/** @type { CustomGroupedAssetDefinitions }} */
const assets = {
    ItemHands: [
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
    ],
    ItemHandheld: [
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
        {
            Name: "书",
            Random: false,
            Left: 180,
            Top: 340,
            Difficulty: -10,
            ParentGroup: {},
            Priority: 26,
            PoseMapping: { ...AssetPoseMapping.ItemHandheld },
            Layer: [{ Name: "页" }, { Name: "壳" }],
        },
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
    ],
};

/** @type { Translation.GroupedEntries } */
const translations = {
    CN: {
        ItemHandheld: {
            电蚊拍_Luzi: "电蚊拍",
            伊偶_Luzi: "伊偶",
            书: "书",
            奶瓶: "奶瓶",
            红包: "红包",
        },
    },
    EN: {
        ItemHands: {
            拳击手套_Luzi: "Boxing Gloves",
        },
        ItemHandheld: {
            电蚊拍_Luzi: "Electric Fly Swatter",
            书: "Book",
            奶瓶: "Milk Bottle",
            红包: "Red Packet",
            拳击手套_Luzi: "Boxing Gloves",
            伊偶_Luzi: "Cyäegha Doll",
        },
    },
};

export default function () {
    AssetManager.addGroupedAssets(assets, translations);
}

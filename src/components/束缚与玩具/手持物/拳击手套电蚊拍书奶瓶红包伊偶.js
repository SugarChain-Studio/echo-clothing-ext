import { AssetManager } from "../../../assetForward";
import { ArmMaskTool, PostPass } from "../../../lib";
import { luziSuffixFixups } from "../../../lib/fixups";

/** @type { AddAssetWithConfigParams[] }} */
const assets = [
    [
        "ItemHands",
        {
            Name: "拳击手套",
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
            Name: "电蚊拍",
            Random: false,
            Top: -110,
            Left: 0,
            Difficulty: -10,
            IsRestraint: false,
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
        PostPass.asset(
            {
                Name: "书",
                Random: false,
                Left: 180,
                Top: 340,
                Difficulty: -10,
                IsRestraint: false,
                ParentGroup: {},
                PoseMapping: { ...AssetPoseMapping.ItemHandheld },
                Layer: [{ Name: "页" }, { Name: "壳" }],
            },
            (asset) => {
                ArmMaskTool.createArmMaskForCloth("ItemHandheld", asset);
            }
        ),
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
            IsRestraint: false,
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
            IsRestraint: false,
            ParentGroup: {},
            Priority: 46,
            PoseMapping: { ...AssetPoseMapping.ItemHandheld },
        },
        { translation: { CN: "红包", EN: "Red Packet" } },
    ],
    [
        "ItemHandheld",
        {
            Name: "伊偶",
            Random: false,
            Gender: "F",
            Top: { OverTheHead: -100 },
            Difficulty: -10,
            IsRestraint: false,
            ParentGroup: {},
            Priority: 46,
            PoseMapping: { ...AssetPoseMapping.ItemHandheld, Yoked: "Yoked", OverTheHead: "OverTheHead" },
        },
        { translation: { CN: "伊偶", EN: "Cyäegha Doll" } },
    ],
];

export default function () {
    AssetManager.addAssetWithConfig(assets);
    for (const a of assets) {
        luziSuffixFixups(a[0], a[1].Name);
    }
}

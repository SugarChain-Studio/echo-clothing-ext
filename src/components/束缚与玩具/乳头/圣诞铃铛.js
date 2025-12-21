import { AssetManager } from "../../../assetForward";
import { Typing } from "../../../lib";

/** @type {AddAssetWithConfigParams[]} */
const asset = [
    [
        "ItemNipples",
        {
            Name: "铃铛P",
            Difficulty: 10,
            Time: 15,
            Left: 180,
            Top: 300,
            AllowLock: true,
            Prerequisite: ["AccessBreast", "AccessBreastSuitZip"],
            Effect: [E.Wiggling, E.UseRemote],
            PoseMapping: { AllFours: "Hide" },
            DynamicGroupName: "ItemNipples",
            ParentGroup: "BodyUpper",
            Layer: [{ Name: "Bow" }, { Name: "Bell" }],
        },
        {
            translation: { CN: "圣诞铃铛", EN: "Xmas Bell" },
            layerNames: {
                CN: { Bow: "蝴蝶结", Bell: "铃铛" },
                EN: { Bow: "Bow", Bell: "Bell" },
            },
        },
    ],
    ...Typing.mergeAddAssetParams(
        [
            [],
            {
                Name: "铃铛C",
                Left: 220,
                Top: 210,
                AllowLock: true,
                PoseMapping: {},
                DynamicGroupName: "ClothAccessory",
                ParentGroup: {},
                Layer: [{ Name: "Bow" }, { Name: "Bell" }],
            },
            {
                translation: { CN: "圣诞铃铛", EN: "Xmas Bell" },
                layerNames: {
                    CN: { Bow: "蝴蝶结", Bell: "铃铛" },
                    EN: { Bow: "Bow", Bell: "Bell" },
                },
            },
        ],
        [
            ["ClothAccessory", {}, {}],
            [
                "ItemNeckAccessories",
                {
                    Prerequisite: "Collared",
                    Audio: "MetalClip",
                    Difficulty: 3,
                    Time: 5,
                },
                {},
            ],
        ]
    ),
];

export default function () {
    AssetManager.addAssetWithConfig(asset);
}

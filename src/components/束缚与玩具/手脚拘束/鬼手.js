import { DialogTools, ImageMapTools, Tools } from "@mod-utils/Tools";
import { AssetManager } from "../../../assetForward";
import { ImmPass, PoseMapTool, PostPass } from "../../../lib";

/** @type {AddAssetWithConfigParams[]} */
const asset = [
    [
        "ItemArms",
        PostPass.asset(
            {
                Name: "鬼手A",
                Random: false,
                Left: 50,
                Top: 40,
                Time: 5,
                Difficulty: 7,
                RemoveTime: 30,
                Effect: [E.Freeze, E.Block, E.BlockWardrobe],
                DrawLocks: false,
                SetPose: ["Yoked"],
                DynamicGroupName: "ItemArms",
                ParentGroup: {},
                PoseMapping: PoseMapTool.config(
                    ["OverTheHead", "Yoked", "BackBoxTie", "BackElbowTouch"],
                    ["BackCuffs", "BaseUpper"]
                ),
                Layer: [
                    { Name: "B2", Priority: 6 },
                    {
                        Name: "B1",
                        CopyLayerColor: "B2",
                        ...PoseMapTool.LayerConfig(true, [], ["BackElbowTouch"]),
                    },
                ],
            },
            (asset) => {
                AssetManager.addImageMapping({
                    [ImageMapTools.assetPreview("ItemArms", asset.Name)]: ImageMapTools.assetPreview(
                        "ItemArms",
                        "鬼手"
                    ),
                });
            }
        ),
        ImmPass.assetConfig(
            {
                translation: { CN: "鬼手", EN: "Ghost Hand" },
                extended: {
                    Archetype: "typed",
                    ChatTags: Tools.CommonChatTags(),
                    Options: [
                        { Name: "P1", Property: { SetPose: ["Yoked"] } },
                        { Name: "P2", Property: { SetPose: ["OverTheHead"] } },
                        { Name: "P3", Property: { SetPose: ["BackBoxTie"] } },
                        { Name: "P4", Property: { SetPose: ["BackElbowTouch"] } },
                    ],
                },
                assetStrings: {
                    CN: { Select: "选择鬼手样式", P1: "举手", P2: "高举手", P3: "双手背后", P4: "紧缚背后" },
                    EN: {
                        Select: "Select Ghost Hand Style",
                        P1: "Hands Up",
                        P2: "Hands High",
                        P3: "Hands Behind",
                        P4: "Tight Behind",
                    },
                },
            },
            (config) => {
                config.assetStrings = DialogTools.autoItemStrings(
                    config.assetStrings,
                    /** @type {TypedItemConfig}*/ (config.extended)
                );
            }
        ),
    ],
    [
        "ItemFeet",
        PostPass.asset(
            {
                Name: "鬼手L",
                Random: false,
                Left: 90,
                Top: 740,
                Time: 5,
                Difficulty: 7,
                RemoveTime: 30,
                Effect: [E.Freeze, E.BlockWardrobe],
                DrawLocks: false,
                SetPose: ["BaseLower"],
                DynamicGroupName: "ItemArms",
                ParentGroup: {},
                PoseMapping: PoseMapTool.config([], ["Kneel", "KneelingSpread", "LegsClosed", "Spread"]),
                Layer: [
                    { Name: "B2", Priority: 6 },
                    { Name: "B1", CopyLayerColor: "B2" },
                ],
            },
            (asset) => {
                AssetManager.addImageMapping({
                    [ImageMapTools.assetPreview("ItemArms", asset.Name)]: ImageMapTools.assetPreview(
                        "ItemArms",
                        "鬼手"
                    ),
                });
            }
        ),
        { translation: { CN: "鬼手", EN: "Ghost Hand" } },
    ],
    [
        "ItemMouth",
        PostPass.asset(
            {
                Name: "鬼手M",
                Random: false,
                Left: 170,
                Top: 170,
                Time: 5,
                Difficulty: 7,
                RemoveTime: 30,
                Effect: [E.GagMedium],
                DrawLocks: false,
                SetPose: ["BaseLower"],
                DynamicGroupName: "ItemArms",
                ParentGroup: {},
                PoseMapping: {},
                Layer: [
                    { Name: "B2", Priority: 6 },
                    { Name: "B1", CopyLayerColor: "B2" },
                ],
            },
            (asset) => {
                AssetManager.addImageMapping({
                    [ImageMapTools.assetPreview("ItemArms", asset.Name)]: ImageMapTools.assetPreview(
                        "ItemArms",
                        "鬼手"
                    ),
                });
            }
        ),
        { translation: { CN: "鬼手", EN: "Ghost Hand" } },
    ],
    [
        "ItemHead",
        PostPass.asset(
            {
                Name: "鬼手E",
                Random: false,
                Left: 160,
                Top: 130,
                Time: 5,
                Difficulty: 7,
                RemoveTime: 30,
                Effect: [E.BlindNormal],
                DrawLocks: false,
                SetPose: ["BaseLower"],
                DynamicGroupName: "ItemArms",
                ParentGroup: {},
                PoseMapping: {},
                Layer: [
                    { Name: "B2", Priority: 6 },
                    { Name: "B1", CopyLayerColor: "B2" },
                ],
            },
            (asset) => {
                AssetManager.addImageMapping({
                    [ImageMapTools.assetPreview("ItemArms", asset.Name)]: ImageMapTools.assetPreview(
                        "ItemArms",
                        "鬼手"
                    ),
                });
            }
        ),
        { translation: { CN: "鬼手", EN: "Ghost Hand" } },
    ],
    [
        "ItemVulva",
        PostPass.asset(
            {
                Name: "鬼手G",
                Random: false,
                Left: 210,
                Top: 420,
                Time: 5,
                Difficulty: 7,
                RemoveTime: 30,
                Effect: [E.GagLight],
                DrawLocks: false,
                SetPose: ["BaseLower"],
                Prerequisite: ["HasVagina"],
                DynamicGroupName: "ItemArms",
                ParentGroup: {},
                PoseMapping: {},
                Layer: [{ Name: "B1" }],
            },
            (asset) => {
                AssetManager.addImageMapping({
                    [ImageMapTools.assetPreview("ItemArms", asset.Name)]: ImageMapTools.assetPreview(
                        "ItemArms",
                        "鬼手"
                    ),
                });
            }
        ),
        { translation: { CN: "鬼手", EN: "Ghost Hand" }, extended: { Archetype: "vibrating" } },
    ],
];

export default function () {
    AssetManager.addAssetWithConfig(asset);
}

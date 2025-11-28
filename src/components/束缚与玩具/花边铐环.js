import { AssetManager } from "../../assetForward";
import { PoseMapTool, Typing } from "../../lib";

/** @type {AddAssetWithConfigParams[]} */
const assets = [
    [
        ["ItemArms", "Bracelet"],
        {
            Name: "花边手环",
            Random: false,
            Left: 60,
            Top: 60,
            DrawLocks: false,
            ParentGroup: {},
            DynamicGroupName: "ItemArms",
            PoseMapping: PoseMapTool.config(
                ["OverTheHead", "Yoked"],
                ["BackBoxTie", "BackCuffs", "BackElbowTouch", "AllFours", "Hogtied"]
            ),
            Layer: [
                { Name: "A1", ColorGroup: "Lace" },
                { Name: "B1", ColorGroup: "Lace" },
                { Name: "A2", ColorGroup: "Cuff" },
                { Name: "B2", ColorGroup: "Cuff" },
            ],
        },
        {
            translation: { CN: "花边手环", EN: "Lace Wrist Cuffs" },
            layerNames: {
                CN: {
                    ...Typing.stringEntries([["A1", "A2"], "左"]),
                    ...Typing.stringEntries([["B1", "B2"], "右"]),
                    Lace: "花边",
                    Cuff: "铐环",
                },
                EN: {
                    ...Typing.stringEntries([["A1", "A2"], "Left"]),
                    ...Typing.stringEntries([["B1", "B2"], "Right"]),
                    Lace: "Lace",
                    Cuff: "Cuff",
                },
            },
        },
    ],
    [
        ["ItemLegs", "Garters"],
        {
            Name: "花边大腿环",
            Random: false,
            Left: 100,
            Top: 540,
            DrawLocks: false,
            ParentGroup: "BodyLower",
            DynamicGroupName: "ItemArms",
            PoseMapping: PoseMapTool.config(
                ["Kneel", "KneelingSpread", "LegsClosed", "Spread"],
                ["AllFours", "Hogtied"]
            ),
            Layer: [
                { Name: "A1", ColorGroup: "Lace" },
                { Name: "B1", ColorGroup: "Lace" },
                { Name: "A2", ColorGroup: "Cuff" },
                { Name: "B2", ColorGroup: "Cuff" },
                { Name: "A3", ColorGroup: "Ring" },
                { Name: "B3", ColorGroup: "Ring" },
                { Name: "A4", ColorGroup: "Chain" },
                { Name: "B4", ColorGroup: "Chain" },
            ],
        },
        {
            translation: { CN: "花边大腿环", EN: "Lace Thigh Cuffs" },
            layerNames: {
                CN: {
                    ...Typing.stringEntries([["A1", "A2", "A3", "A4"], "左"]),
                    ...Typing.stringEntries([["B1", "B2", "B3", "B4"], "右"]),
                    Lace: "花边",
                    Cuff: "铐环",
                    Ring: "环",
                    Chain: "链条",
                },
                EN: {
                    ...Typing.stringEntries([["A1", "A2", "A3", "A4"], "Left"]),
                    ...Typing.stringEntries([["B1", "B2", "B3", "B4"], "Right"]),
                    Lace: "Lace",
                    Cuff: "Cuff",
                    Ring: "Ring",
                    Chain: "Chain",
                },
            },
        },
    ],
];

export default function () {
    AssetManager.addAssetWithConfig(assets);
}

import { AssetManager } from "../../assetForward";
import { PoseMapTool } from "../../lib";

const upperPose = PoseMapTool.config(["Hogtied"]);
const lowerPose = PoseMapTool.config(["Kneel"]);

/** @type {AddAssetWithConfigParamsNoGroup[]} */
const asset = [
    [
        {
            Name: "LuziFBT",
            Random: false,
            Gender: "F",
            Left: 160,
            Top: 210,
            Time: 15,
            Difficulty: 25,
            AllowLock: true,
            DrawLocks: false,
            Effect: [E.Block, E.BlockWardrobe, E.Slow],
            Prerequisite: ["HasBreasts"],
            SetPose: ["BackElbowTouch", "LegsClosed"],
            AllowActivePose: ["BackElbowTouch", "Kneel", "LegsClosed"],
            Layer: [
                { Name: "↑_B1", PoseMapping: upperPose, ColorGroup: "束带", ParentGroup: "BodyUpper" },
                { Name: "↑_B3", PoseMapping: upperPose, ColorGroup: "边线", ParentGroup: "BodyUpper" },
                { Name: "↓_B1", PoseMapping: lowerPose, ColorGroup: "束带", ParentGroup: "BodyLower" },
                { Name: "↓_B3", PoseMapping: lowerPose, ColorGroup: "边线", ParentGroup: "BodyLower" },
                { Name: "↑_B2", PoseMapping: upperPose, ColorGroup: "环阴影", ParentGroup: "BodyUpper" },
                { Name: "↓_B2", PoseMapping: lowerPose, ColorGroup: "环阴影", ParentGroup: "BodyLower" },
                { Name: "↑_A1", PoseMapping: upperPose, ColorGroup: "环", ParentGroup: "BodyUpper" },
                { Name: "↓_A1", PoseMapping: lowerPose, ColorGroup: "环", ParentGroup: "BodyLower" },
            ],
        },
        {
            translation: { CN: "全身捆绑带", EN: "Full Body Straps" },
            layerNames: {
                CN: { 环: "环", 束带: "束带", 环阴影: "环阴影", 边线: "边线" },
                EN: { 环: "Ring", 束带: "Strap", 环阴影: "Ring Shadow", 边线: "Edge" },
            },
        },
    ],
];

export default function () {
    AssetManager.addAssetWithConfig(["ItemArms", "ItemTorso"], asset);
}

import { PoseMapTool, Typing } from "../../../lib";
import { AssetManager } from "../../../assetForward";

/** @type {CustomAssetDefinitionBase} */
const assetBase = {
    Name: "书包",
    Random: false,
    Gender: "F",
    Left: 170,
    Top: 190,
    ParentGroup: {},
    DynamicGroupName: "ClothAccessory",
    Priority: 5,
    PoseMapping: PoseMapTool.hideFullBody(),
    Layer: [
        { Name: "StrapF", Priority: 55 },
        { Name: "Back" },
        { Name: "StrapB", CopyLayerColor: "StrapF" },
        { Name: "AccStrap" },
        { Name: "Acc" },
    ],
};

/** @type {AddAssetWithConfigParams[]} */
const asset = [
    [
        "ClothAccessory",
        Typing.mergeApp(assetBase),
        {
            translation: { CN: "书包", EN: "School Bag" },
            layerNames: {
                CN: { StrapF: "肩带", Acc: "搭扣", AccStrap: "搭扣带", Back: "背包" },
                EN: { StrapF: "Strap Front", Acc: "Buckle", AccStrap: "Buckle Strap", Back: "Bag" },
            },
        },
    ],
    [
        "ItemArms",
        Typing.mergeItem(assetBase, {
            SetPose: ["BackElbowTouch"],
            AllowActivePose: ["BackElbowTouch"],
            Time: 30,
            Difficulty: 6,
            Effect: [E.Block, E.BlockWardrobe],
        }),
        {
            translation: { CN: "拘束书包", EN: "Restraint School Bag" },
            layerNames: {
                CN: { StrapF: "肩带", Acc: "搭扣", AccStrap: "搭扣带", Back: "背包" },
                EN: { StrapF: "Strap Front", Acc: "Buckle", AccStrap: "Buckle Strap", Back: "Bag" },
            },
        },
    ],
];

export default function () {
    AssetManager.addAssetWithConfig(asset);
}

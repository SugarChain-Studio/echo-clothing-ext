import { AssetManager } from "../../../assetForward";
import { luziPrefixFixups } from "../../../lib/fixups";

/** @type {AddAssetWithConfigParams[]} */
const asset = [
    [
        ["Hat", "HairAccessory1", "HairAccessory3"],
        {
            Name: "羽翼头饰",
            Left: 150,
            Top: 60,
            Random: false,
            ParentGroup: {},
            PoseMapping: {},
            DynamicGroupName: "Mask",
            Layer: [{ Name: "A" }, { Name: "B" }],
        },
        {
            translation: { CN: "羽翼头饰", EN: "Feathered Headpiece" },
            layerNames: { CN: { A: "右", B: "左" }, EN: { A: "Right", B: "Left" } },
        },
    ],
    [
        ["Mask", "Glasses", "HairAccessory1", "HairAccessory3"],
        {
            Name: "羽翼眼罩",
            Left: 150,
            Top: 60,
            Random: false,
            ParentGroup: {},
            PoseMapping: {},
            DynamicGroupName: "Mask",
            Layer: [{ Name: "A" }, { Name: "B" }],
        },
        {
            translation: { CN: "羽翼眼罩", EN: "Feathered Eyepatch" },
            layerNames: { CN: { A: "右", B: "左" }, EN: { A: "Right", B: "Left" } },
        },
    ],
];

export default function () {
    AssetManager.addAssetWithConfig(asset);
}

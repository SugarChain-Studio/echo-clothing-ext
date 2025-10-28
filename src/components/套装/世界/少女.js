import { AssetManager } from "../../../assetForward";

/** @type {AddAssetWithConfigParams[]} */
const asset = [
    [
        ["HairAccessory1", "HairAccessory3"],
        {
            Name: "Luzi_DamseletteHA",
            Random: false,
            Left: 110,
            Top: 0,
            Priority: 5,
            DynamicGroupName: "HairAccessory1",
            ParentGroup: {},
            PoseMapping: {},
            Layer: [{ Name: "W1" }, { Name: "W2" }, { Name: "W3" }],
        },
        {
            translation: { CN: "翅膀头饰", EN: "Winged Headpiece" },
        },
    ],
    [
        "Mask",
        {
            Name: "Luzi_DamseletteM",
            Random: false,
            Left: 190,
            Top: 110,
            Priority: 25,
            DynamicGroupName: "Mask",
            DefaultColor: "#BBB",
            ParentGroup: {},
            PoseMapping: {},
        },
        {
            translation: { CN: "透明网格面纱", EN: "Transparent Grid Veil" },
        },
    ],
];

export default function () {
    AssetManager.addAssetWithConfig(asset);
}

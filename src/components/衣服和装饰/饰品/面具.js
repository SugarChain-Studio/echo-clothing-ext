import { AssetManager } from "@local/AssetManager";

/** @type {AddAssetWithConfigParams[]} */
const asset = [
    [
        ["Mask", "Glasses", "HairAccessory1", "HairAccessory3"],
        {
            Name: "面具",
            Left: 150,
            Top: 90,
            Random: false,
            ParentGroup: {},
            PoseMapping: {},
            DynamicGroupName: "Mask",
        },
        {
            translation: { CN: "面具", EN: "Mask" },
        },
    ],
];

export default function () {
    AssetManager.addAssetWithConfig(asset);
}


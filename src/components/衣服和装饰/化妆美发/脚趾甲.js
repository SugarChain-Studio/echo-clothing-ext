import { AssetManager } from "../../../assetForward";

/** @type {AddAssetWithConfigParams} */
const asset = [
    ["Shoes", "Socks", "BodyMarkings"],
    {
        Name: "脚趾甲",
        Random: false,
        Left: 130,
        Top: 930,
        Priority: 10,
        DynamicGroupName: "Shoes",
        Layer: [{ Name: "左" }, { Name: "右" }],
    },
    {
        translation: { CN: "脚趾美甲", EN: "Toe Nails" },
        layerNames: {
            EN: { 左: "Left", 右: "Right" },
        },
    },
];

export default function () {
    AssetManager.addAssetWithConfig(...asset);
}

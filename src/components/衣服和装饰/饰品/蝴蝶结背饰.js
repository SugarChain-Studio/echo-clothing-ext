import { AssetManager } from "../../../assetForward";

/** @type { AddAssetWithConfigParams[] }} */
const assets = [
    [
        ["Wings", "ClothAccessory"],
        {
            Name: "蝴蝶结背饰_Luzi",
            Random: false,
            Top: -110,
            Left: 0,
            DynamicGroupName: "Wings",
        },
        { translation: { CN: "大蝴蝶结装饰", EN: "Large Bow Accessory" } },
    ],
];

export default function () {
    AssetManager.addAssetWithConfig(assets);
}

import { AssetManager } from "../../assetForward";

/** @type {AddAssetWithConfigParams} */
const assets = [
    "ItemDevices",
    {
        Name: "猪猪_Luzi",
        Random: false,
        Top: -110,
        Left: 0,
        SetPose: ["KneelingSpread"],
        AllowActivePose: ["KneelingSpread"],
        OverrideHeight: { Height: -150, Priority: 21 },
        Layer: [
            { Name: "鼻子", Priority: 56 },
            { Name: "猪猪", Priority: 55 },
            { Name: "缰绳", Priority: 26 },
        ],
    },
    {
        translation: { CN: "猪猪", EN: "Piggy", RU: "Поросёнок", UA: "Свинка" },
    },
];

export default function () {
    AssetManager.addAssetWithConfig(...assets);
}

import { AssetManager } from "../../assetForward";

/** @type {AddAssetWithConfigParams} */
const assets = [
    "ItemDevices",
    {
        Name: "架子鼓",
        Random: false,
        Top: 200,
        Left: -200,
        DynamicGroupName: "ItemDevices",
        FixedPosition: true,
        DefaultColor: ["Default", "Default", "Default", "Default", "Default", "Default", "#111"],
        Layer: [
            { Name: "A1" },
            { Name: "A2" },
            { Name: "A3" },
            { Name: "A4" },
            { Name: "A5" },
            { Name: "A6" },
            { Name: "A7" },
            { Name: "A7g", BlendingMode: "screen", AllowColorize: false },
        ],
    },
    {
        translation: { CN: "架子鼓", EN: "Drum Set" },
        layerNames: {
            CN: {
                A1: "镲",
                A2: "脚鼓",
                A3: "军鼓",
                A4: "左嗵鼓",
                A5: "右嗵鼓",
                A6: "侧嗵鼓",
                A7: "金属结构",
            },
            EN: {
                A1: "Cymbals",
                A2: "Bass Drum",
                A3: "Snare Drum",
                A4: "Left Tom",
                A5: "Right Tom",
                A6: "Floor Tom",
                A7: "Metal Frame",
            },
        },
    },
];

export default function () {
    AssetManager.addAssetWithConfig(...assets);
}

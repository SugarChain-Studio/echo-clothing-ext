import { AssetManager } from "@local/AssetManager";
import { Layer } from "@local/lib/type";

/** @type {AddAssetWithConfigParamsNoGroup[]} */
const asset = [
    [
        {
            Name: "翅膀1",
            Random: false,
            Top: 0,
            Left: 0,
            Layer: [
                { Color: ["#141414"], Name: "翼膜" },
                { Color: ["#000000"], Name: "翼骨" },
            ],
        },
        {
            translation: {
                CN: "翅膀 1",
                EN: "Wing 1",
                RU: "Крыло 1",
                UA: "Крило 1",
            },
            layerNames: {
                EN: {
                    翼膜: "Wing Membrane",
                    翼骨: "Wing Bone",
                },
            },
        },
    ],
    [
        {
            Name: "翅2",
            Random: false,
            Left: -175,
            Top: -125,
            Layer: [
                { Color: ["#A5A5A5"], Name: "BL" },
                { Color: ["#A5A5A5"], Name: "BR" },
                Layer.multiply({ Name: "SL" }),
                Layer.multiply({ Name: "SR" }),
            ],
        },
        {
            translation: {
                CN: "羽翼",
                EN: "Feather Wings",
            },
            layerNames: {
                CN: { BL: "左", BR: "右", Base: "基础" },
                EN: { BL: "Left", BR: "Right", Base: "Base" },
            },
        },
    ],
    [
        {
            Name: "翅3",
            Random: false,
            Left: -205,
            Top: 95,
            Layer: [{ Name: "BL" }, { Name: "BR" }, Layer.multiply({ Name: "SL" }), Layer.multiply({ Name: "SR" })],
        },
        {
            translation: {
                CN: "细鳞翼",
                EN: "Fine-Scaled Wings",
            },
            layerNames: {
                CN: { BL: "左", BR: "右" },
                EN: { BL: "Left", BR: "Right" },
            },
        },
    ],
];

export default function () {
    AssetManager.addAssetWithConfig("Wings", asset);
}

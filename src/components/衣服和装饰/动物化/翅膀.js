import { AssetManager } from "../../../assetForward";
import { Typing } from "../../../lib";

/** @type {AddAssetWithConfigParamsNoGroup[]} */
const asset = [
    [
        {
            Name: "翅膀1",
            Random: false,
            Top: 0,
            Left: 0,
            DefaultColor: ["#141414", "#000000"],
            Layer: [{ Name: "翼膜" }, { Name: "翼骨" }],
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
            DefaultColor: ["#A5A5A5", "#A5A5A5"],
            Layer: [
                { Name: "BL" },
                { Name: "BR" },
                Typing.multiplyLayer({ Name: "SL" }),
                Typing.multiplyLayer({ Name: "SR" }),
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
            Layer: [
                { Name: "BL" },
                { Name: "BR" },
                Typing.multiplyLayer({ Name: "SL" }),
                Typing.multiplyLayer({ Name: "SR" }),
            ],
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

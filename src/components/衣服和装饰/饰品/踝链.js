import { ImageMapTools } from "@mod-utils/Tools";
import { AssetManager } from "../../../assetForward";
import { PostPass, PoseMapTool } from "../../../lib";
import { LRTool } from "../../../lib/sockLR";

/** @type { AddAssetWithConfigParams[] } */
const asset = [
    [
        "Jewelry",
        PostPass.asset(
            {
                Name: "踝链A",
                Random: false,
                Left: 130,
                Top: 850,
                Priority: 20,
                DynamicGroupName: "Jewelry",
                ParentGroup: "BodyLower",
                DefaultColor: ["Default", "#9FEEFF", "Default"],
                PoseMapping: PoseMapTool.Config(["Spread", "LegsClosed"], ["Kneel", "KneelingSpread"]),
                Layer: [
                    { Name: "链" },
                    { Name: "钻", AllowTypes: { s: 0 } },
                    { Name: "珠", AllowTypes: { s: 1 } },
                    { Name: "链2", Priority: 7, CopyLayerColor: "链" },
                ],
            },
            (asset) => {
                AssetManager.addImageMapping(
                    ImageMapTools.mirrorBodyTypeLayer("Jewelry", asset, "Normal", ["Small", "Large"])
                );
                LRTool.createLRConfig("Jewelry", asset, { key: "lr", Left: 1, Right: 2 });
            }
        ),
        {
            translation: { CN: "踝链A", EN: "Anklet A" },
            layerNames: {
                CN: { 链: "链条", 钻: "钻石", 珠: "珍珠" },
                EN: { 链: "Chain", 钻: "Diamond", 珠: "Pearl" },
            },
            extended: {
                Archetype: "modular",
                DrawImages: false,
                Modules: [
                    { Name: "左右", Key: "lr", Options: [{}, {}, {}] },
                    { Name: "样式", Key: "s", Options: [{}, {}] },
                ],
            },
            assetStrings: {
                CN: {
                    SelectBase: "配置踝链样式",

                    Module左右: "左右",
                    Select左右: "选择佩戴哪一边",
                    Optionlr0: "都有",
                    Optionlr1: "左",
                    Optionlr2: "右",

                    Module样式: "样式",
                    Select样式: "选择踝链样式",
                    Options0: "钻石",
                    Options1: "珍珠",
                },
                EN: {
                    SelectBase: "Select Anklet Style",

                    Module左右: "Side",
                    Select左右: "Select which side to wear",
                    Optionlr0: "Both",
                    Optionlr1: "Left",
                    Optionlr2: "Right",

                    Module样式: "Style",
                    Select样式: "Select anklet style",
                    Options0: "Diamond",
                    Options1: "Pearl",
                },
            },
        },
    ],
];

export default function () {
    AssetManager.addAssetWithConfig(asset);
}

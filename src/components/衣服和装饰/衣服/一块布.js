import { AssetManager } from "../../../assetForward";
import { PoseMapTools } from "@mod-utils/Tools";

/** @type {AddAssetWithConfigParamsNoGroup[]} */
const asset = [
    [
        {
            Name: "一块布",
            Random: false,
            Gender: "F",
            Left: 170,
            Top: 300,
            Priority: 18,
            DefaultColor: ["#000000", "#000000", "#000000", "#2B2931", "#000000"],
            Prerequisite: ["HasBreasts"],
            ParentGroup: "BodyUpper",
            PoseMapping: PoseMapTools.HideFullBody(),
            Layer: [
                { Name: "A1", AllowTypes: { typed: 0 } },
                { Name: "A2", AllowTypes: { typed: 1 }, CopyLayerColor: "A1" },
                { Name: "A3" },
                { Name: "A4" },
                { Name: "A5" },
                { Name: "A6" },
            ],
        },
        {
            translation: { CN: "诱惑侧开迷你裙", EN: "Allure Sidecut" },
            layerNames: {
                CN: {
                    A1: "基础色",
                    A3: "束带",
                    A4: "描边",
                    A5: "细节光泽",
                    A6: "细节阴影",
                },
                EN: {
                    A1: "Base Color",
                    A3: "Strap",
                    A4: "Outline",
                    A5: "Detail Gloss",
                    A6: "Detail Shadow",
                },
            },
            extended: {
                Archetype: ExtendedArchetype.TYPED,
                ChangeWhenLocked: false,
                DrawImages: false,
                Options: [{ Name: "A" }, { Name: "H" }],
            },
            assetStrings: {
                CN: { Select: "配置样式", A: "默认", H: "透明" },
                EN: { Select: "Style", A: "Default", H: "Transparent" },
            },
        },
    ],
];

export default function () {
    AssetManager.addAssetWithConfig("Cloth", asset);
}

import { Tools } from "@mod-utils/Tools";
import { AssetManager } from "@local/AssetManager";

/** @type { AddAssetWithConfigParamsNoGroup[] }} */
const asset = [
    [
        {
            Name: "乳贴1",
            Random: false,
            ...Tools.topLeftBuilder({ Left: 180, Top: 290 }, ["AllFours", { Left: 190, Top: 330 }]),
            ParentGroup: "BodyUpper",
            Prerequisite: ["HasBreasts", "AccessBreast"],
            Expose: ["ItemBreast", "ItemNipples", "ItemNipplesPiercings"],
            PoseMapping: { AllFours: "AllFours" },
            DynamicGroupName: "Bra",
            Layer: [
                { Color: ["#B16565"], Name: "左" },
                { Color: ["#B16565"], Name: "右" },
            ],
        },
        {
            translation: { CN: "乳贴1", EN: "Pasties 1" },
            layerNames: { EN: { 左: "Left", 右: "Right" } },
        },
    ],
    [
        {
            Name: "乳贴2",
            Random: false,
            ...Tools.topLeftBuilder({ Left: 180, Top: 290 }, ["AllFours", { Left: 190, Top: 330 }]),
            ParentGroup: "BodyUpper",
            Prerequisite: ["HasBreasts", "AccessBreast"],
            Expose: ["ItemBreast", "ItemNipples", "ItemNipplesPiercings"],
            PoseMapping: { AllFours: "AllFours" },
            DynamicGroupName: "Bra",
            Layer: [
                { Color: ["#B16565"], Name: "左" },
                { Color: ["#B16565"], Name: "右" },
            ],
        },
        {
            translation: { CN: "乳贴2", EN: "Pasties 2" },
            layerNames: { EN: { 左: "Left", 右: "Right" } },
        },
    ],
];

export default function () {
    AssetManager.addAssetWithConfig(["Bra", "ItemNipples"], asset);
}

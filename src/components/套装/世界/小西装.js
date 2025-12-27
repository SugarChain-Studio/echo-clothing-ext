import { Tools } from "@mod-utils/Tools";
import { AssetManager } from "../../../assetForward";
import { PoseMapTool } from "../../../lib";

/** @type {AddAssetWithConfigParams[]} */
const asset = [
    [
        "Cloth",
        {
            Name: "小西装S",
            Random: false,
            Left: 170,
            Top: 210,
            Priority: 27,
            DynamicGroupName: "Cloth",
            Expose: ["ItemBreast", "ItemNipples", "ItemNipplePiercings"],
            PoseMapping: PoseMapTool.config(["Yoked", "OverTheHead"], ["AllFours"]),
            Layer: [
                { Name: "A1", ColorGroup: "衬衫" },
                { Name: "A2", ColorGroup: "衬衫", ...PoseMapTool.layerConfig(true, [], ["Hogtied"]) },
                { Name: "B1", ColorGroup: "衬衫" },
                { Name: "B2", ColorGroup: "衬衫", ...PoseMapTool.layerConfig(true, [], ["Hogtied"]) },
                { Name: "扣子", ParentGroup: {}, PoseMapping: { Hogtied: "Hide" } },
                { Name: "领带", PoseMapping: {}, AllowTypes: { t: 0 } },
            ],
        },
        {
            translation: { CN: "小西装衬衫", EN: "Little Formal Shirt" },
            layerNames: {
                CN: { A1: "左肩", A2: "左腰", B1: "右肩", B2: "右腰", 衬衫: "衬衫", 领带: "领带", 扣子: "扣子" },
                EN: {
                    A1: "L. Shoulder",
                    A2: "L. Waist",
                    B1: "R. Shoulder",
                    B2: "R. Waist",
                    衬衫: "Shirt",
                    领带: "Tie",
                    扣子: "Buttons",
                },
            },
            extended: {
                Archetype: "modular",
                Modules: [{ Name: "领带", Key: "t", Options: [{}, {}] }],
            },
            assetStrings: {
                CN: {
                    SelectBase: "选择衬衫样式",
                    Module领带: "领带",
                    Select领带: "选择是否有领带",
                    Optiont0: "有",
                    Optiont1: "无",
                },
                EN: {
                    SelectBase: "Select Shirt Style",
                    Module领带: "Tie",
                    Select领带: "Select Whether to Have a Tie",
                    Optiont0: "Yes",
                    Optiont1: "No",
                },
            },
        },
    ],
    [
        ["Cloth", "ClothOuter"],
        {
            Name: "小西装T",
            Random: false,
            ...Tools.topLeftBuilder(
                { Left: 130, Top: 210 },
                ["Hogtied", { Left: 160, Top: 210 }],
                ["Yoked", { Left: 60, Top: 210 }],
                ["OverTheHead", { Left: 80, Top: 70 }]
            ),
            Priority: 27,
            DynamicGroupName: "Cloth",
            Expose: ["ItemBreast", "ItemNipples", "ItemNipplePiercings"],
            PoseMapping: PoseMapTool.config(
                ["Yoked", "OverTheHead", "Hogtied", "BackBoxTie", "BackElbowTouch", "BackCuffs"],
                ["AllFours"]
            ),
            Layer: [
                { Name: "C1", Left: 170, Top: 210, Priority: 5, PoseMapping: {} },
                { Name: "A1", ColorGroup: "西装" },
                { Name: "A2", ColorGroup: "西装" },
                { Name: "B1", ColorGroup: "西装" },
                { Name: "B2", ColorGroup: "西装" },
            ],
        },
        {
            translation: { CN: "小西装外套", EN: "Little Formal Suit" },
            layerNames: {
                CN: { A1: "左袖", A2: "左襟", B1: "右袖", B2: "右襟", C1: "内衬", 西装: "西装" },
                EN: {
                    A1: "L. Sleeve",
                    A2: "L. Lapel",
                    B1: "R. Sleeve",
                    B2: "R. Lapel",
                    C1: "Inner Liner",
                    西装: "Suit",
                },
            },
        },
    ],
];

export default function () {
    AssetManager.addAssetWithConfig(asset);
}

import { AssetManager } from "@local/AssetManager";
import { luziSuffixFixups } from "@local/lib/fixups";

/** @type { AddAssetWithConfigParamsNoGroup[]} */
const assets = [
    [
        {
            Name: "冕旒",
            Random: false,
            Left: 0,
            Top: -18,
            Priority: 55,
            Layer: [
                { Color: ["#660606"], Name: "帽顶" },
                { Color: ["#000000"], Name: "帽身" },
                { Color: ["#C18A34"], Name: "纹样" },
                { Color: ["#CFAC68"], Name: "帽帘" },
            ],
        },
        {
            translation: { CN: "冕旒", EN: "Mian Liu" },
            layerNames: {
                CN: { 帽顶: "帽顶", 帽身: "帽身", 纹样: "纹样", 帽帘: "帽帘" },
                EN: { 帽顶: "Hat Top", 帽身: "Hat Body", 纹样: "Pattern", 帽帘: "Hat Curtain" },
            },
        },
    ],
    [
        {
            Name: "狐狸面具",
            Random: false,
            Left: 0,
            Top: 0,
            Priority: 55,
            Layer: [
                { Name: "底" },
                { Color: ["#FFF260"], Name: "眼白" },
                { Color: ["#3E5FBB"], Name: "瞳孔" },
                { Color: ["#F83A3A"], Name: "涂色" },
            ],
        },
        {
            translation: { CN: "狐狸面具", EN: "Fox Mask" },
            layerNames: {
                CN: { 底: "底", 眼白: "眼白", 瞳孔: "瞳孔", 涂色: "涂色" },
                EN: { 底: "Base", 眼白: "White Eye", 瞳孔: "Pupil", 涂色: "Coloring" },
            },
        },
    ],
    [
        {
            Name: "帽子2",
            Random: false,
            Left: 160,
            Top: 20,
            Priority: 7,
            Layer: [
                { Color: ["#FFB1B1"], Name: "A1" },
                { Color: ["#FFB1B1"], Name: "A2" },
                { Color: ["#856757"], Name: "A3" },
                { Color: ["#5A4A41"], Name: "A4" },
            ],
        },
        {
            translation: { CN: "邦尼特帽", EN: "Bonnet Colonial Hat" },
            layerNames: {
                CN: { A1: "左侧花", A2: "右侧花", A3: "帽边沿", A4: "内衬" },
                EN: { A1: "Left Flower", A2: "Right Flower", A3: "Hat Edge", A4: "Lining" },
            },
        },
    ],
];

export default function () {
    AssetManager.addAssetWithConfig("Hat", assets);
    for (const a of assets) {
        luziSuffixFixups("Hat", a[0].Name);
    }
}

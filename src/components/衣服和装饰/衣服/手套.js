import { Tools } from "@mod-utils/Tools";
import { AssetManager } from "../../../assetForward";
import { luziFixups } from "../../../lib/fixups";

/** @type {(overrides?: AssetPoseMapping) => AssetPoseMapping} */
const glovePoseM = (overrides) => ({
    ...{
        TapedHands: "TapedHands",
        Yoked: "Yoked",
        OverTheHead: "OverTheHead",
        BackBoxTie: "BackBoxTie",
        BackElbowTouch: "Hide",
        BackCuffs: "BackCuffs",
        Hogtied: "Hide",
        AllFours: "Hide",
    },
    ...overrides,
});

/** @type { AddAssetWithConfigParamsNoGroup[] }} */
const assets = [
    [
        {
            Name: "袖手套-Luzi",
            Random: false,
            ...Tools.topLeftBuilder(
                { Left: 150, Top: 310 },
                ["BackCuffs", { Left: 290, Top: 300 }],
                ["Yoked", { Left: 60, Top: 150 }],
                ["OverTheHead", { Left: 90, Top: 10 }]
            ),
            PoseMapping: glovePoseM(),
            DefaultColor: ["default", "#ADAA9A"],
            Layer: [{ AllowTypes: { typed: 0 } }, { Name: "L", AllowTypes: { typed: 1 } }],
        },
        {
            translation: { CN: "袖手套", EN: "Sleeve Gloves" },
            layerNames: { CN: { L: "浅色" }, EN: { L: "Lighter" } },
            extended: {
                Archetype: ExtendedArchetype.TYPED,
                DrawImages: false,
                Options: [{ Name: "B" }, { Name: "L" }],
            },
            assetStrings: {
                CN: { Select: "选择颜色样式", B: "深色", L: "浅色" },
                EN: { Select: "Select Color Style", B: "Dark", L: "Light" },
            },
        },
    ],
    [
        {
            Name: "丝手套2-Luzi",
            Random: false,
            Top: 0,
            Left: 0,
            PoseMapping: glovePoseM({ BackCuffs: "Hide" }),
        },
        { translation: { CN: "丝手套 2", EN: "Silk Gloves 2" } },
    ],
    [
        {
            Name: "手套渐变-Luzi",
            Random: false,
            Top: 0,
            Left: 0,
            PoseMapping: glovePoseM({ BackCuffs: "Hide" }),
        },
        { translation: { CN: "渐变手套", EN: "Gradient Gloves" } },
    ],
];

export default function () {
    AssetManager.addAssetWithConfig("Gloves", assets);
    for (const a of assets) {
        luziFixups("Gloves", a[0].Name);
    }
}

import { AssetManager } from "../../../assetForward";
import { PostPass } from "../../../lib";
import { luziSuffixFixups } from "../../../lib/fixups";

/** @type {AddAssetWithConfigParams} */
const asset = [
    ["Cloth", "ClothOuter"],
    PostPass.asset(
        {
            Name: "西装露肩",
            Random: false,
            Left: 30,
            Top: 50,
            Priority: 31,
            ParentGroup: {},
            DynamicGroupName: "Cloth",
            PoseMapping: {
                ...AssetPoseMapping.Cloth,
                AllFours: PoseType.HIDE,
                BackCuffs: PoseType.HIDE,
                Hogtied: PoseType.HIDE,
                TapedHands: "",
            },
            Layer: [
                { Name: "base", AllowTypes: { typed: 0 } },
                { Name: "plain", CopyLayerColor: "base", AllowTypes: { typed: 1 } },
                { Name: "shadow", AllowColorize: false, AllowTypes: { typed: 1 } },
            ],
        },
        (asset) => {
            luziSuffixFixups(["Cloth", "ClothOuter"], asset.Name);
        }
    ),
    {
        translation: {
            CN: "随意滑落西装",
            EN: "Casual Dropped Suit",
        },
        layerNames: {
            CN: {
                base: "基础",
                plain: "分层基础",
                shadow: "分层阴影",
            },
            EN: {
                base: "Normal Base (Colored)",
                plain: "Layered Base",
                shadow: "Layered Shadow",
            },
        },
        extended: {
            Archetype: ExtendedArchetype.MODULAR,
            DrawImages: false,
            Modules: [
                { Name: "图层模式", Key: "typed", Options: [{}, {}] },
                { Name: "镜像", Key: "M", Options: [{}, { DrawOptions: { Mirror: true } }] },
            ],
        },
        assetStrings: {
            CN: {
                SelectBase: "配置随意滑落西装",

                Module图层模式: "图层模式",
                Select图层模式: "选择西装图层模式",
                Optiontyped0: "基础(有色)",
                Optiontyped1: "分层(较亮)",

                Module镜像: "左右翻转",
                Select镜像: "选择左右翻转状态",
                OptionM0: "默认",
                OptionM1: "左右翻转",
            },
            EN: {
                SelectBase: "Select Casual Dropped Suit Configuration",

                Module图层模式: "Layer Mode",
                Select图层模式: "Select Suit Layer Mode",
                Optiontyped0: "Normal Base (Colored)",
                Optiontyped1: "Layered (Lighter)",

                Module镜像: "Mirror",
                Select镜像: "Select Mirror State",
                OptionM0: "Default",
                OptionM1: "Mirrored",
            },
        },
    },
];

export default function () {
    AssetManager.addAssetWithConfig(...asset);
    luziSuffixFixups(asset[0], asset[1].Name);
}

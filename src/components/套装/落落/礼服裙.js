import { ArmMaskTool, PostPass } from "../../../lib";
import { AssetManager } from "../../../assetForward";
import { luziSuffixFixups } from "../../../lib/fixups";

/** @type {ExtendedItemScriptHookCallbacks.BeforeDraw<ModularItemData, {}>} */
function beforeDraw(data, originalFunction, drawData) {
    const { C, Pose } = drawData;
    if (C.HasEffect(E.Suspended)) {
        if (Pose === "Kneel" || Pose === "KneelingSpread") return { Pose: /** @type {AssetPoseName} */ ("") };
        else return { Pose };
    }
}

/** @type {AddAssetWithConfigParams} */
const asset = [
    "Cloth",
    PostPass.asset(
        {
            Name: "长裙",
            Random: false,
            Left: 20,
            Top: 200,
            Priority: 30,
            ParentGroup: "BodyUpper",
            DynamicGroupName: "Cloth",
            PoseMapping: { ...AssetPoseMapping.ClothLower },
            Layer: [
                { Name: "1" },
                { Name: "2" },
                { Name: "3" },
                { Name: "4" },
                { Name: "I0", Priority: 29, ColorGroup: "内衬", ParentGroup: {} },
                { Name: "I1", Priority: 6, ColorGroup: "内衬", ParentGroup: {} },
            ],
        },
        (asset) => {
            ArmMaskTool.createArmMaskForCloth("Cloth", asset);
        }
    ),
    {
        translation: {
            CN: "夜空银海礼服裙",
            EN: "Starry Ocean Evening Gown",
        },
        layerNames: {
            CN: {
                1: "裙装",
                2: "腰带",
                3: "身体珠宝",
                4: "裙珠宝",
                I0: "后",
                I1: "前",
                内衬: "内衬",
            },
            EN: {
                1: "Dress",
                2: "Belt",
                3: "Body Jewelry",
                4: "Dress Jewelry",
                I0: "Back",
                I1: "Front",
                内衬: "Lining",
            },
        },
        extended: {
            Archetype: "modular",
            DrawImages: false,
            Modules: [{ Name: "镜像", Key: "M", Options: [{}, { DrawOptions: { Mirror: true } }] }],
            ScriptHooks: { BeforeDraw: beforeDraw },
        },
        assetStrings: {
            CN: {
                SelectBase: "配置礼服裙",

                Module镜像: "水平翻转",
                Select镜像: "选择水平翻转状态",
                OptionM0: "默认",
                OptionM1: "水平翻转",
            },
            EN: {
                SelectBase: "Select Evening Gown Configuration",

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

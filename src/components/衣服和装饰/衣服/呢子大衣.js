import { ArmMaskTool, PoseMapTool } from "../../../lib";
import { AssetManager } from "../../../assetForward";

/** @type {ExtendedItemScriptHookCallbacks.BeforeDraw<ModularItemData, {}>} */
function beforeDraw(data, originalFunction, { C, Property, Pose, L }) {
    const type = Property?.TypeRecord;
    if (type?.d === 0) {
        if (!C.AllowedActivePose.includes("BaseUpper") && Pose !== "BackCuffs" && C.IsRestrained()) {
            if (L === "A2") return { Opacity: 0 };
            if (L === "A3") return { Opacity: 1 };
        } else {
            if (L === "A2") return { Opacity: 1 };
            if (L === "A3") return { Opacity: 0 };
        }
    }
}

/** @type {AddAssetWithConfigParams} */
const asset = [
    ["Cloth", "ClothOuter"],
    {
        Name: "大衣",
        Random: false,
        Left: 60,
        Top: 50,
        DynamicGroupName: "ClothOuter",
        ParentGroup: {},
        Priority: 55,
        PoseMapping: PoseMapTool.hideFullBody(),
        Layer: [
            { Name: "A1", Priority: 6 },
            {
                Name: "A2",
                ParentGroup: "BodyUpper",
                AllowTypes: { d: [0, 1] },
                PoseMapping: PoseMapTool.config(["BackBoxTie", "BackCuffs", "BackElbowTouch", "OverTheHead", "Yoked"]),
            },
            {
                Name: "A3",
                ParentGroup: "BodyUpper",
                AllowTypes: { d: [0, 2] },
                PoseMapping: { BackCuffs: "Hide" },
                CopyLayerColor: "A2",
            },
            { Name: "B1", ColorGroup: "外套" },
            { Name: "B2", ColorGroup: "外套" },
            { Name: "C1", ColorGroup: "外套" },
        ],
    },
    {
        translation: { CN: "呢子大衣", EN: "Wool Coat" },
        layerNames: {
            CN: { A1: "领口", A2: "外套", B1: "皮带", B2: "搭扣", C1: "扣子" },
            EN: { A1: "Collar", A2: "Coat", B1: "Belt", B2: "Buckle", C1: "Buttons" },
        },
        extended: {
            Archetype: "modular",
            DrawImages: false,
            Modules: [
                {
                    Name: "伪装",
                    Key: "d",
                    Options: [{}, {}, { Property: { SetPose: ["BackElbowTouch"] } }],
                },
            ],
            ScriptHooks: { BeforeDraw: beforeDraw },
        },
        assetStrings: {
            CN: {
                SelectBase: "配置呢子大衣",

                Module伪装: "伪装拘束",
                Select伪装: "选择伪装拘束模式",
                Optiond0: "自动",
                Optiond1: "不伪装",
                Optiond2: "保持伪装",
            },
            EN: {
                SelectBase: "Configure Wool Coat",
                Module伪装: "Disguise",
                Select伪装: "Select Disguise Restraint Mode",
                Optiond0: "Automatic",
                Optiond1: "No Disguise",
                Optiond2: "Always Disguise",
            },
        },
    },
];

export default function () {
    AssetManager.addAssetWithConfig(...asset);
    ArmMaskTool.createArmMaskForCloth(asset[0], asset[1], "Hand", { d: [0, 1] });
}

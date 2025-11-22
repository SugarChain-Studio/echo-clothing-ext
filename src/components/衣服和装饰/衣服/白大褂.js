import { ArmMaskTool, PoseMapTool } from "../../../lib";
import { AssetManager } from "../../../assetForward";

/** @type {ExtendedItemScriptHookCallbacks.BeforeDraw<TypedItemData, {}>} */

function beforeDraw(data, originalFunction, { C, Property, Pose }) {
    const type = Property?.TypeRecord;
    if (type?.typed === 0 && Pose !== "BackCuffs") {
        if (!C.AllowedActivePose.includes("BaseUpper") && C.IsRestrained()) {
            return { LayerType: "r", Pose: null };
        }
    } else if (type?.typed === 2) {
        return { LayerType: "r", Pose: null };
    }
}

/** @type {AddAssetWithConfigParams} */
const asset = [
    ["Cloth", "ClothOuter"],
    {
        Name: "白大褂",
        Random: false,
        Left: 50,
        Top: 50,
        DynamicGroupName: "ClothOuter",
        ParentGroup: {},
        Priority: 55,
        PoseMapping: PoseMapTool.config(
            ["BackBoxTie", "BackElbowTouch", "BackCuffs", "OverTheHead", "Yoked"],
            ["AllFours", "Hogtied"]
        ),
        Layer: [
            { Name: "A", Priority: 4 },
            { Name: "B", ColorGroup: "外套" },
            { Name: "C", ColorGroup: "外套" },
        ],
    },
    {
        translation: { CN: "白大褂", EN: "Lab Coat" },
        layerNames: {
            CN: { A: "内衬", B: "右", C: "左" },
            EN: { A: "Lining", B: "Right", C: "Left", 外套: "Coat" },
        },
        extended: {
            Archetype: "typed",
            DrawImages: false,
            Options: [{ Name: "A" }, { Name: "P" }, { Name: "F", Property: { SetPose: ["BackElbowTouch"] } }],
            ScriptHooks: { BeforeDraw: beforeDraw },
        },
        assetStrings: {
            CN: { Select: "选择白大褂伪装拘束模式", A: "自动", P: "不伪装", F: "保持伪装" },
            EN: { Select: "Select Lab Coat Disguise Restraint Mode", A: "Auto", P: "No Disguise", F: "Keep Disguise" },
        },
    },
];

export default function () {
    AssetManager.addAssetWithConfig(...asset);
    ArmMaskTool.createArmMaskForCloth(asset[0], asset[1], "Hand");
}

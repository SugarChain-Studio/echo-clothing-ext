import { DialogTools, Tools } from "@mod-utils/Tools";
import { AssetManager } from "../../../assetForward";
import { ArmMaskTool } from "../../../lib";

/** @type {ExtendedItemScriptHookCallbacks.BeforeDraw<TypedItemData, {}>} */
function beforeDraw(data, originalFunction, { Pose }) {
    if (Pose === "Yoked") return { LayerType: "" };
}

/** @type {TypedItemConfig} */
const extended = {
    Archetype: ExtendedArchetype.TYPED,
    ChatTags: Tools.CommonChatTags(),
    DrawImages: false,
    ScriptHooks: { BeforeDraw: beforeDraw },
    Options: [{ Name: "关闭" }, { Name: "打开", Property: { OverridePriority: 35 } }],
};

/** @type {AddAssetWithConfigParams} */
const asset = [
    "ItemHandheld",
    {
        Name: "笔记本电脑",
        Random: false,
        Left: { "": 160, "Yoked": 10 },
        Top: { "": 300, "Yoked": 130 },
        Difficulty: -10,
        ParentGroup: {},
        PoseMapping: { ...AssetPoseMapping.ItemHandheld, Yoked: "Yoked" },
        Layer: [
            { Name: "main", CreateLayerTypes: ["typed"] },
            { Name: "tm", CreateLayerTypes: ["typed"] },
        ],
    },
    {
        translation: { CN: "笔记本电脑", EN: "Laptop" },
        layerNames: { CN: { main: "主体", tm: "樱桃公司" }, EN: { main: "Main", tm: "Cherry Inc." } },
        extended,
        assetStrings: DialogTools.autoItemStrings(
            {
                CN: {
                    Select: "选择笔记本状态",
                    关闭: "关闭",
                    打开: "打开",
                },
                EN: {
                    Select: "Select Laptop State",
                    关闭: "Closed",
                    打开: "Open",
                },
            },
            extended
        ),
    },
];

export default function () {
    ArmMaskTool.createArmMaskForCloth("ItemHandheld", asset[1], "Right", { typed: [0] });
    AssetManager.addAssetWithConfig(...asset);
}

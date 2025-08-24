import { Tools } from "@mod-utils/Tools";
import { ArmMaskTool } from "../../../armMask";
import { AssetManager } from "../../../assetForward";

/** @type {CustomGroupName} */
const group = "ItemHandheld";

/** @type {CustomAssetDefinition} */
const asset = {
    Name: "杯饮",
    Random: false,
    Left: 225,
    Top: 360,
    Priority: 34,
    Difficulty: -10,
    ParentGroup: {},
    IsRestraint: false,
    PoseMapping: { ...AssetPoseMapping.ItemHandheld },
    AllowActivity: ["RubItem"],
    Layer: [
        { Name: "空杯", AllowTypes: { typed: 0 } },
        { Name: "橙汁", AllowTypes: { typed: 1 } },
        { Name: "可乐", AllowTypes: { typed: 2 } },
        { Name: "牛奶", AllowTypes: { typed: 3 } },
    ],
};

/** @type {TypedItemConfig} */
const extended = {
    Archetype: ExtendedArchetype.TYPED,
    ChatTags: Tools.CommonChatTags(),
    Options: [
        { Name: "空杯" },
        { Name: "橙汁", Property: { AllowActivity: ["SipItem"] } },
        { Name: "可乐", Property: { AllowActivity: ["SipItem"] } },
        { Name: "牛奶", Property: { AllowActivity: ["SipItem"] } },
    ],
};

const translation = {
    CN: "玻璃杯饮料",
    EN: "Glass Cup Drink",
};

const assetStrings = {
    CN: {
        Select: "选择饮料类型",
        空杯: "没有饮料",
        橙汁: "橙汁",
        可乐: "可乐",
        牛奶: "牛奶",

        Set牛奶: "SourceCharacter将牛奶倒入DestinationCharacterAssetName中。",
        Set可乐: "SourceCharacter将可乐倒入DestinationCharacterAssetName中。",
        Set橙汁: "SourceCharacter将橙汁倒入DestinationCharacterAssetName中。",
        Set空杯: "SourceCharacter将DestinationCharacterAssetName倒空了。",
    },
    EN: {
        Select: "Select Drink Type",
        空杯: "No Drink",
        橙汁: "Orange Juice",
        可乐: "Cola",
        牛奶: "Milk",

        Set牛奶: "SourceCharacter filled DestinationCharacter AssetName with milk.",
        Set可乐: "SourceCharacter filled DestinationCharacter AssetName with cola.",
        Set橙汁: "SourceCharacter filled DestinationCharacter AssetName with orange juice.",
        Set空杯: "SourceCharacter emptied DestinationCharacter AssetName.",
    },
};

export default function () {
    AssetManager.addAssetWithConfig(group, asset, { extended, translation, layerNames: {}, assetStrings });
    ArmMaskTool.createArmMaskForCloth(group, asset, "Right");
    AssetManager.addImageMapping(
        ["空杯", "橙汁", "可乐", "牛奶"].reduce((acc, curr) => {
            acc[`Assets/Female3DCG/${group}/杯饮_${curr}.png`] = `Assets/Female3DCG/ItemTorso/托盘_${curr}.png`;
            return acc;
        }, {})
    );
}

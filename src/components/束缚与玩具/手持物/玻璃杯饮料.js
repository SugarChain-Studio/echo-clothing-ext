import { Tools } from "@mod-utils/Tools";
import { ArmMaskTool } from "../../../lib";
import { AssetManager } from "../../../assetForward";
import { ActivityEvents } from "@sugarch/bc-event-handler";

/** @type {CustomGroupName} */
const group = "ItemHandheld";

/** @type {CustomAssetDefinition} */
const asset = {
    Name: "杯饮",
    Random: false,
    Left: 225,
    Top: 360,
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

/** @type {ModularItemConfig} */
const extended = {
    Archetype: ExtendedArchetype.MODULAR,
    ChatTags: Tools.CommonChatTags(),
    Modules: [
        {
            Name: "Content",
            Key: "typed",
            Options: [
                {},
                { Property: { AllowActivity: ["SipItem"] } },
                { Property: { AllowActivity: ["SipItem"] } },
                { Property: { AllowActivity: ["SipItem"] } },
            ],
        },
        {
            Name: "Volume",
            Key: "v",
            Options: [{}, {}],
        },
    ],
};

/** @type {(character:Character)=>(Item|undefined)} */
export function holdsEmptyGlass(character) {
    const item = character.Appearance.find((a) => a.Asset.Group.Name === group && a.Asset.Name === asset.Name);
    return item?.Property?.TypeRecord?.typed === 0 ? item : undefined;
}

/** @typedef {""|"橙汁"|"可乐"|"牛奶"} GlassContent */

/** @type {Record<GlassContent, number>} */
const typeMap = {
    "": 0,
    "橙汁": 1,
    "可乐": 2,
    "牛奶": 3,
};

/**
 * @param {Character} chara
 * @param {Item} item
 * @param {""|"橙汁"|"可乐"|"牛奶"} content
 */
export function setGlassContent(chara, item, content) {
    const nt = typeMap[content];
    if (nt !== undefined) {
        ExtendedItemSetOptionByRecord(chara, item, { typed: nt }, { refresh: true, push: true });
    }
}

const translation = {
    CN: "玻璃杯饮料",
    EN: "Glass Cup Drink",
};

const assetStrings = {
    CN: {
        SelectBase: "配置玻璃杯饮料。",

        ModuleContent: "饮料类型",
        SelectContent: "选择饮料类型",
        Optiontyped0: "没有饮料",
        Optiontyped1: "橙汁",
        Optiontyped2: "可乐",
        Optiontyped3: "牛奶",

        Settyped0: "SourceCharacter将DestinationCharacterAssetName倒空了。",
        Settyped1: "SourceCharacter将橙汁倒入DestinationCharacterAssetName中。",
        Settyped2: "SourceCharacter将可乐倒入DestinationCharacterAssetName中。",
        Settyped3: "SourceCharacter将牛奶倒入DestinationCharacterAssetName中。",

        ModuleVolume: "饮用次数",
        SelectVolume: "选择可饮用次数",
        Optionv0: "一次",
        Optionv1: "一次(移除制作)",
        Optionv2: "无限",

        Setv0: "SourceCharacter使DestinationCharacterAssetName只能饮用一次。",
        Setv1: "SourceCharacter使DestinationCharacterAssetName只能饮用一次，且饮用后移除制作。",
        Setv2: "SourceCharacter使DestinationCharacterAssetName可以无限次饮用。",
    },
    EN: {
        Select: "Select Drink Type",

        ModuleContent: "Drink Type",
        SelectContent: "Select the type of drink",
        Optiontyped0: "Empty",
        Optiontyped1: "Orange Juice",
        Optiontyped2: "Cola",
        Optiontyped3: "Milk",

        Settyped0: "SourceCharacter emptied DestinationCharacter AssetName.",
        Settyped1: "SourceCharacter poured orange juice into DestinationCharacter AssetName.",
        Settyped2: "SourceCharacter poured cola into DestinationCharacter AssetName.",
        Settyped3: "SourceCharacter poured milk into DestinationCharacter AssetName.",

        ModuleVolume: "Drink Volume",
        SelectVolume: "Select how many times the drink can be consumed",
        Optionv0: "One Time",
        Optionv1: "One Time (Remove Crafting)",
        Optionv2: "Infinite",

        Setv0: "SourceCharacter made DestinationCharacter AssetName can only be consumed once.",
        Setv1: "SourceCharacter made DestinationCharacter AssetName can only be consumed once and remove crafting when consumed.",
        Setv2: "SourceCharacter made DestinationCharacter AssetName drinkable infinitely.",
    },
};

ActivityEvents.on("SelfOnSelf", "SipItem", (sender, player) => {
    const item = player.Appearance.find((a) => a.Asset.Group.Name === group && a.Asset.Name === asset.Name);
    if (!item) return;
    if (item.Property?.TypeRecord?.v !== 2) {
        if (item.Property?.TypeRecord?.v === 1) {
            item.Craft = undefined;
        }
        ExtendedItemSetOptionByRecord(player, item, { typed: 0 }, { refresh: true, push: true });
    }
});

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

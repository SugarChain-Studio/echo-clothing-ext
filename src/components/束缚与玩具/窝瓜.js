import { AssetManager } from "../../assetForward";
import { Tools } from "@mod-utils/Tools";
import { PathTools } from "@sugarch/bc-mod-utility";
import { luziSuffixFixups } from "../../lib/fixups";

/** @type {CustomAssetDefinition} */
const asset = {
    Name: "窝瓜",
    Random: false,
    Top: 140,
    Left: 0,
    Fetish: ["Pet"],
    Difficulty: -25,
    AllowLock: true,
    SelfBondage: 0,
    Time: 5,
    RemoveTime: 5,
    Effect: [E.Tethered],
    RemoveAtLogin: true,
    SetPose: ["Kneel"],
    AllowActivePose: [...PoseAllKneeling, "AllFours", "Hogtied"],
    FixedPosition: true,
    Extended: true,
    PoseMapping: {
        AllFours: "AllFours",
        Hogtied: "AllFours",
    },
    Layer: [
        { Name: "后", Priority: 1 },
        { Name: "前", Priority: 58 },
        { Name: "灯", Priority: 57 },
        { Name: "盖", Priority: 2 },
        {
            Name: "盖1",
            Priority: 58,
            AllowTypes: { typed: 1 },
        },
    ],
};

const layerNames = {
    EN: {
        后: "Back",
        前: "Front",
        灯: "Light",
        盖: "Lid",
        盖1: "Lid 1",
    },
};

/** @type {AssetArchetypeConfig} */
const extended = {
    Archetype: ExtendedArchetype.TYPED,
    ChatTags: Tools.CommonChatTags(),
    DrawImages: false,
    Options: [
        {
            Name: "没盖子",
        },
        {
            Name: "有盖子",
            Property: {
                SetPose: ["AllFours"],
                AllowActivePose: ["Hogtied"],
                Hide: ["ItemArms", "ItemButt", "TailStraps", "Wings"],
                HideItem: ["ItemMiscTeddyBear"],
                HideItemExclude: ["ItemArmsBitchSuit", "ItemArmsBitchSuitExposed", "ItemArmsShinyPetSuit"],
                Block: [
                    "ItemArms",
                    "ItemBreast",
                    "ItemButt",
                    "ItemFeet",
                    "ItemBoots",
                    "ItemLegs",
                    "ItemMisc",
                    "ItemNipples",
                    "ItemNipplesPiercings",
                    "ItemPelvis",
                    "ItemTorso",
                    "ItemVulva",
                    "ItemVulvaPiercings",
                ],
            },
            Random: false,
        },
    ],
};

/** @type {Record<string, string>} */
const icons = {
    "Screens/Inventory/ItemDevices/窝瓜/没盖子.png": PathTools.emptyImage,
    "Screens/Inventory/ItemDevices/窝瓜/有盖子.png": PathTools.emptyImage,
};

/** @type {Translation.Dialog} */
const assetStrings = {
    CN: {
        Select: "选择窝配置",
        没盖子: "推开盖子",
        有盖子: "盖上盖子",
        Set没盖子: "SourceCharacter推开了DestinationCharacterAssetName的盖子",
        Set有盖子: "SourceCharacter为DestinationCharacterAssetName盖上了盖子",
    },
    EN: {
        Select: "Select Configuration",
        没盖子: "Push open the lid",
        有盖子: "Close the lid",
        Set没盖子: "SourceCharacter pushed open the lid of DestinationCharacter AssetName.",
        Set有盖子: "SourceCharacter closed the lid of DestinationCharacter AssetName.",
    },
    RU: {
        Select: "Выбрать конфигурацию",
        没盖子: "Открыть крышку",
        有盖子: "Закрыть крышку",
        Set没盖子: "SourceCharacter открыл крышку DestinationCharacter AssetName.",
        Set有盖子: "SourceCharacter закрыл крышку DestinationCharacter AssetName.",
    },
};

const translation = {
    CN: "窝瓜",
    EN: "Pumpkin",
    RU: "Тыква",
};

export default function () {
    AssetManager.addAssetWithConfig("ItemDevices", asset, {
        layerNames,
        extended,
        translation,
        assetStrings,
    });

    AssetManager.addImageMapping(icons);
    luziSuffixFixups("ItemDevices", asset.Name);
}

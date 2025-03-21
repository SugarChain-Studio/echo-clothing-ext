import { AssetManager } from "../../../assetForward";

/** @type {CustomGroupedAssetDefinitions} */
const assets = {
    ItemMouth: [
        {
            Name: "肛鞭",
            Random: false,
            Top: 0,
            Left: 0,
            Priority: 55,
            Difficulty: -10,
            ParentGroup: {},
            Effect: [],
        },
    ],
    ItemHandheld: [
        {
            Name: "肛鞭",
            Random: false,
            Top: 0,
            Left: 0,
            Difficulty: -10,
            ParentGroup: {},
            PoseMapping: {
                TapedHands: PoseType.DEFAULT,
                Yoked: "Hide",
                OverTheHead: "Hide",
                BackBoxTie: "Hide",
                BackElbowTouch: "Hide",
                BackCuffs: "Hide",
                Hogtied: "Hide",
                AllFours: "Hide",
            },
        },
    ],
};

/** @type { Translation.GroupedEntries } */
const translations = {
    CN: {
        ItemHandheld: {
            肛鞭: "肛鞭",
        },
        ItemMouth: {
            肛鞭: "肛鞭",
        },
    },
    EN: {
        ItemHandheld: {
            肛鞭: "Long Anal Plug",
        },
        ItemMouth: {
            肛鞭: "Long Anal Plug",
        },
    },
};

/** @type { CustomAssetDefinition } */
const assetItem = {
    Name: "肛鞭",
    Time: 14,
    Prerequisite: ["AccessButt"],
    Effect: [E.IsPlugged],
    ExpressionTrigger: [{ Name: "Low", Group: "Blush", Timer: 10 }],
    Extended: true,
    Activity: "MasturbateItem",
    CreateLayerTypes: ["typed"],
    PoseMapping: {
        Hogtied: "Hide",
        AllFours: "Hide",
    },
    Layer: [
        {
            Name: "一半",
            Top: -200,
            AllowTypes: { typed: 0 },
            Alpha: [
                {
                    Group: ["ItemButt"],
                    Masks: [[220, 0, 60, 540]],
                },
            ],
        },
        {
            Name: "全部",
            Top: -364,
            AllowTypes: { typed: 1 },
            Alpha: [
                {
                    Group: ["ItemButt"],
                    Masks: [[220, 0, 60, 540]],
                },
            ],
        },
    ],
};

/** @type {AssetArchetypeConfig} */
const extendedItem = {
    Archetype: ExtendedArchetype.TYPED,
    Options: [
        {
            Name: "一半",
        },
        {
            Name: "全部",
        },
    ],
    ScriptHooks: {
        PublishAction: analWhipAction,
    },
    DrawImages: false,
};

/** @type {Translation.Dialog} */
const dialogItem = {
    CN: {
        ItemButt肛鞭Select: "选择塞入程度",
        ItemButt肛鞭一半: "拔出一半",
        ItemButt肛鞭全部: "全部塞入",
        ItemButt肛鞭Set一半: "SourceCharacter将肛鞭从TargetCharacter的肛门拔出了一半.",
        ItemButt肛鞭Set全部: "SourceCharacter将肛鞭全部塞入TargetCharacter的肛门.",
    },
    EN: {
        ItemButt肛鞭Select: "Select insertion length",
        ItemButt肛鞭一半: "Pull out half.",
        ItemButt肛鞭全部: "Stuff it all in.",
        ItemButt肛鞭Set一半: "SourceCharacter pulls the anal whip halfway out of DestinationCharacter anus.",
        ItemButt肛鞭Set全部: "SourceCharacter inserts all the anal whips into DestinationCharacter anus.",
    },
};

const translationsItem = {
    CN: "肛鞭",
    EN: "Large pull beads",
};

/** @type {ExtendedItemScriptHookCallbacks.PublishAction<TypedItemData, TypedItemOption>} */
function analWhipAction(data, _originalFunction, C, item, newOption, previousOption) {
    if (data.chatSetting === TypedItemChatSetting.SILENT || newOption.Name === previousOption.Name) {
        return;
    }

    /** @type {ExtendedItemChatData<TypedItemOption>} */
    const chatData = {
        C,
        previousOption,
        newOption,
        previousIndex: data.options.indexOf(previousOption),
        newIndex: data.options.indexOf(newOption),
    };
    const dictionary = ExtendedItemBuildChatMessageDictionary(chatData, data, item)
        .performActivity("MasturbateItem", item.Asset.Group, item)
        .build();

    let msg = data.dialogPrefix.chat;
    if (typeof msg === "function") {
        msg = msg(chatData);
    }

    if (data.chatSetting === TypedItemChatSetting.FROM_TO) msg += `${previousOption.Name}To`;
    msg += newOption.Name;

    ChatRoomPublishCustomAction(`${msg}${newOption.Name}`, true, dictionary);

    if (C.IsPlayer()) {
        ActivityArousalItem(C, C, item.Asset);
    }
}

const itemGroup = "ItemButt";

export default function () {
    AssetManager.addGroupedAssets(assets, translations);

    AssetManager.addImageMapping({
        "Assets/Female3DCG/ItemButt/肛鞭_typed0_一半.png": "Assets/Female3DCG/ItemButt/肛鞭.png",
        "Assets/Female3DCG/ItemButt/肛鞭_typed1_全部.png": "Assets/Female3DCG/ItemButt/肛鞭.png",
    });
    AssetManager.addAsset(itemGroup, assetItem, extendedItem, translationsItem);
    AssetManager.addCustomDialog(dialogItem);
}

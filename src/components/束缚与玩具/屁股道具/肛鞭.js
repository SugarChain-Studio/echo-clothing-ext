import { AssetManager } from "../../../assetForward";
import { DialogTools } from "@mod-utils/Tools";

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
            CopyLayerColor: "一半",
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
const dialog = {
    CN: {
        Select: "选择塞入程度",
        一半: "拔出一半",
        全部: "全部塞入",
        Set一半: "SourceCharacter将肛鞭从TargetCharacter的肛门拔出了一半.",
        Set全部: "SourceCharacter将肛鞭全部塞入TargetCharacter的肛门.",
    },
    EN: {
        Select: "Select insertion length",
        一半: "Pull out half.",
        全部: "Stuff it all in.",
        Set一半: "SourceCharacter pulls the anal whip halfway out of DestinationCharacter anus.",
        Set全部: "SourceCharacter inserts all the anal whips into DestinationCharacter anus.",
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

    ChatRoomPublishCustomAction(`${msg}${newOption.Name}`, true, dictionary);

    if (C.IsPlayer()) {
        ActivityArousalItem(C, C, item.Asset);
    }
}

export default function () {
    AssetManager.addGroupedAssets(assets, translations);

    AssetManager.addImageMapping({
        "Assets/Female3DCG/ItemButt/肛鞭_typed0_一半.png": "Assets/Female3DCG/ItemButt/肛鞭.png",
        "Assets/Female3DCG/ItemButt/肛鞭_typed1_全部.png": "Assets/Female3DCG/ItemButt/肛鞭.png",
    });
    AssetManager.addAssetWithConfig("ItemButt", assetItem, {
        extended: extendedItem,
        translation: translationsItem,
        layerNames: {},
        assetStrings: dialog,
    });
}

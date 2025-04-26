import { HookManager } from "@sugarch/bc-mod-hook-manager";
import { AssetManager } from "../../../assetForward";

import { Tools } from "@mod-utils/Tools";

/** @type {CustomGroupedAssetDefinitions} */
const cAssets = {
    ItemMouth: [
        {
            Name: "大号拉珠",
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
            Name: "大号拉珠",
            Random: false,
            Top: 0,
            Left: 0,
            Difficulty: -10,
            ParentGroup: {},
            PoseMapping: {
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
const cAssetsTranslations = {
    CN: {
        ItemHandheld: {
            大号拉珠: "大号拉珠",
        },
        ItemMouth: {
            大号拉珠: "大号拉珠",
        },
    },
    EN: {
        ItemHandheld: {
            大号拉珠: "Large beads",
        },
        ItemMouth: {
            大号拉珠: "Large beads",
        },
    },
    RU: {
        ItemHandheld: {
            大号拉珠: "Большие бусины",
        },
        ItemMouth: {
            大号拉珠: "Большие бусины",
        },
    },
};

/** @type { CustomAssetDefinition } */
const assetButt = {
    Name: "大号拉珠",
    Time: 14,
    Prerequisite: ["AccessButt"],
    Effect: [E.IsPlugged],
    ExpressionTrigger: [{ Name: "Low", Group: "Blush", Timer: 10 }],
    Extended: true,
    DynamicBeforeDraw: true,
    Activity: "MasturbateItem",
    PoseMapping: {
        Hogtied: "Hide",
        AllFours: "Hide",
    },
};

/** @type {AssetArchetypeConfig} */
const extended = {
    Archetype: ExtendedArchetype.TYPED,
    ChatTags: Tools.CommonChatTags(),
    DrawImages: false,
    ChatSetting: TypedItemChatSetting.SILENT,
    ScriptHooks: {
        PublishAction: publishAction,
    },
    Options: Array.from({ length: 9 }, (_, i) => ({
        Name: `${i + 1}`,
        Property: /**@type {ItemProperties}*/ ({ InsertedBeads: i + 1 }),
    })),
};

const translation = {
    CN: "大号拉珠",
    EN: "Large Anal Beads",
};

/** @type {Translation.Dialog} */
const assetDialogs = {
    CN: {
        Select: "选择塞入珠子的数量",
        SetIncrease: `SourceCharacter抓住AssetName，慢慢将BCount个珠子塞入TargetCharacter的肛门.`,
        SetDecrease: `SourceCharacter抓住AssetName，慢慢将BCount个珠子拉出TargetCharacter的肛门.`,

        ...Array.from({ length: 9 }, (_, i) => i).reduce((acc, i) => {
            const bcount = i + 1;
            acc[`${bcount}`] = `${bcount}个珠子`;

            return acc;
        }, /** @type {Translation.Entry} */ ({})),
    },
    EN: {
        Select: "Select number of beads inserted",
        SetIncrease: `SourceCharacter grabs AssetName, slowly inserts BCount bead(s) in TargetCharacter butt.`,
        SetDecrease: `SourceCharacter grabs AssetName, slowly pulls BCount bead(s) from TargetCharacter butt.`,

        ...Array.from({ length: 9 }, (_, i) => i).reduce((acc, i) => {
            const bcount = i + 1;
            const bead = i === 0 ? "Bead" : "Beads";
            acc[`${bcount}`] = `${bcount} ${bead}`;
            return acc;
        }, /** @type {Translation.Entry} */ ({})),
    },
};

/** @type {ExtendedItemScriptHookCallbacks.PublishAction<TypedItemData, TypedItemOption>} */
function publishAction(data, originalFunction, C, item, newOption, previousOption) {
    const beadsOld = previousOption.Property.InsertedBeads || 1;
    const beadsNew = newOption.Property.InsertedBeads || 1;
    const beadsChange = beadsNew - beadsOld;
    if (beadsChange === 0 || data === null) {
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
        .focusGroup(/** @type {AssetGroupItemName}*/ (item.Asset.Group.Name))
        .text("BCount", `${Math.abs(beadsChange)}`)
        .build();
    dictionary.push({ ActivityName: "MasturbateItem" }, { ActivityCounter: Math.abs(beadsChange) });

    const Prefix =
        typeof data.dialogPrefix.chat === "function" ? data.dialogPrefix.chat(chatData) : data.dialogPrefix.chat;
    const Suffix = beadsChange > 0 ? "Increase" : "Decrease";
    ChatRoomPublishCustomAction(`${Prefix}${Suffix}`, true, dictionary);

    if (C.IsPlayer()) {
        // The Player pulls beads from her own butt
        for (let i = beadsChange; i < 0; i++) {
            ActivityArousalItem(C, C, item.Asset);
        }
    }
}

/** @type {ExtendedItemCallbacks.BeforeDraw<TypedItemData>} */
function beforeDraw({ Y, Property }) {
    const bcount = Property.InsertedBeads || 1;
    return { Y: Y - (bcount - 1) * 44, AlphaMasks: [[220, 0, 60, 512]] };
}

export default function () {
    HookManager.globalFunction(`AssetsItemButt${assetButt.Name}BeforeDraw`, beforeDraw);
    AssetManager.addGroupedAssets(cAssets, cAssetsTranslations);
    AssetManager.addAssetWithConfig("ItemButt", assetButt, {
        translation,
        layerNames: {},
        extended,
        assetDialogs,
    });
}

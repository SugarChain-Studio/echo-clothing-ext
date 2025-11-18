import { AssetManager } from "../../assetForward";
import { DialogTools, Tools } from "@mod-utils/Tools";
import { luziSuffixFixups } from "../../lib/fixups";

/**
 * @typedef { { LastBlink:number, ShockTime:number, ShockOnOff: boolean, ShockIsRunning:boolean } } ShockDeviceData
 */

const shockInterval = 2000;
const shockRunNextTime = () => CommonTime() + (Math.random() * 5 + 5) * 60 * 1000;

/** @type {ExtendedItemScriptHookCallbacks.BeforeDraw<ExtendedItemData, ShockDeviceData>} */
function beforeDraw(data, originalFunction, { L, PersistentData }) {
    if (L === "闪光") {
        const Data = PersistentData();
        if (Data.ShockOnOff && Data.ShockIsRunning && CommonTime() < Data.LastBlink + 100) {
            return { Opacity: 1 };
        }
        return { Opacity: 0 };
    }
}

function setNextShockRunTime(C, Item) {
    if (!C.IsPlayer()) return;
    Item.Property.NextShockTime = shockRunNextTime();
    if (ServerPlayerIsInChatRoom()) {
        ChatRoomCharacterItemUpdate(Player, Item.Asset.Group.Name);
    }
}

/** @type {ExtendedItemScriptHookCallbacks.ScriptDraw<ExtendedItemData, ShockDeviceData>} */
function scriptDraw(data, originalFunction, { C, PersistentData, Item }) {
    const shockL = Item.Property?.ShockLevel || 0;

    const Data = PersistentData();
    Data.LastBlink = Data.LastBlink ?? CommonTime();
    Data.ShockTime = Data.ShockTime ?? 0;
    Data.ShockIsRunning = Data.ShockIsRunning ?? false;

    if (shockL === 1 && !Data.ShockOnOff) {
        Data.ShockOnOff = true;
        setNextShockRunTime(C, Item);
    }

    if (Data.ShockOnOff) {
        const runBeginTime = Item.Property.NextShockTime;
        const runEndTime = Item.Property.NextShockTime + 60 * 1000;
        const now = CommonTime();
        Data.LastBlink = Math.floor((now - Data.LastBlink) / shockInterval) * shockInterval + Data.LastBlink;

        if (runBeginTime < now && now < runEndTime) {
            AnimationRequestRefreshRate(C, 100);
            AnimationRequestDraw(C);
        }

        if (C.IsPlayer()) {
            const dialogKey = DialogTools.dialogKey(Item);

            const chatRoomMsg = (Key) => {
                const Content = dialogKey(Key);
                const Dictionary = new DictionaryBuilder()
                    .sourceCharacter(C)
                    .asset(Item.Asset, "AssetName", Item.Craft && Item.Craft.Name)
                    .build();
                ChatRoomMessage({
                    Content,
                    Type: "Action",
                    Sender: C.MemberNumber,
                    Dictionary,
                });
            };

            if (runBeginTime < now && now < runEndTime) {
                if (!Data.ShockIsRunning) {
                    Data.ShockIsRunning = true;
                    chatRoomMsg("开始间歇持续电击");
                }

                if (Data.ShockTime < Data.LastBlink) {
                    Data.ShockTime = Data.LastBlink + shockInterval;
                    PropertyShockPublishAction(C, Item, true);
                }
            } else if (now > runEndTime) {
                Data.ShockIsRunning = false;
                if (Item.Property.NextShockTime + 20 * 60 * 1000 > CommonTime()) {
                    chatRoomMsg("停止间歇持续电击");
                }
                setNextShockRunTime(C, Item);
            }
        }
    }
}

const 持续电击开关 = {
    X: 1185,
    Y: 675,
    W: 64,
    H: 64,
};

const 触发电击按钮 = {
    X: 1510,
    Y: 675,
    W: 225,
    H: 55,
};

/** @type {ExtendedItemScriptHookCallbacks.Draw<ExtendedItemData>} */
function dialogDraw(Data, originalFunction) {
    originalFunction();
    if (!DialogFocusItem) return;

    const shockL = DialogFocusItem.Property?.ShockLevel || 0;

    const prevAlign = MainCanvas.textAlign;
    MainCanvas.textAlign = "center";
    ExtendedItemCustomDraw("ItemLegs电击器触发电击", 触发电击按钮.X, 触发电击按钮.Y);
    MainCanvas.textAlign = "left";
    ExtendedItemDrawCheckbox("GlowSwitch", 持续电击开关.X, 持续电击开关.Y, shockL > 0, {
        text: AssetTextGet("ItemLegs电击器持续电击开关"),
        textColor: "White",
    });
    MainCanvas.textAlign = prevAlign;
}

/** @type {ExtendedItemScriptHookCallbacks.Click<ExtendedItemData>} */
function dialogClick(Data, originalFunction) {
    originalFunction();

    if (MouseIn(触发电击按钮.X, 触发电击按钮.Y, 触发电击按钮.W, 触发电击按钮.H)) {
        const targetItem = DialogFocusItem;
        targetItem.Property.ShowText = false;
        PropertyShockPublishAction(CharacterGetCurrent(), targetItem, false);
        targetItem.Property.ShowText = true;
    } else if (MouseIn(持续电击开关.X, 持续电击开关.Y, 持续电击开关.W, 持续电击开关.H)) {
        const property = DialogFocusItem.Property || {};

        const dialogKey = DialogTools.dialogKey(DialogFocusItem);

        ExtendedItemCustomClickAndPush(
            CharacterGetCurrent(),
            DialogFocusItem,
            "持续电击",
            () => {
                const shockL = property.ShockLevel || 0;
                property.ShockLevel = shockL > 0 ? 0 : 1;
            },
            false,
            false
        );

        const Dictionary = new DictionaryBuilder()
            .sourceCharacter(Player)
            .destinationCharacterName(CharacterGetCurrent())
            .asset(DialogFocusItem.Asset, "AssetName", DialogFocusItem.Craft && DialogFocusItem.Craft.Name)
            .build();
        ChatRoomPublishCustomAction(
            dialogKey(`设置${property.ShockLevel ? "开始" : "停止"}间歇持续电击`),
            false,
            Dictionary
        );
    }
}

/** @type { CustomAssetDefinition } */
const asset = {
    Name: "电击器",
    Random: false,
    Gender: "F",
    Left: {
        [PoseType.DEFAULT]: 0,
        KneelingSpread: 60,
    },
    Top: 0,
    Difficulty: 3,
    Priority: 14,
    Fetish: ["Masochism"],
    Extended: true,
    Effect: [],
    PoseMapping: {
        AllFours: "Hide",
        Hogtied: "Hide",
        Kneel: "Kneel",
        KneelingSpread: "KneelingSpread",
        Spread: "Spread",
        LegsClosed: "LegsClosed",
    },
    Layer: [
        { Name: "绑带" },
        { Name: "本体" },
        { Name: "电击肛塞", AllowTypes: [{ a: 1 }] },
        { Name: "阴部", AllowTypes: [{ p: 1 }] },
        { Name: "大腿内侧", AllowTypes: [{ u: 1 }] },
        { Name: "小腹", AllowTypes: [{ d: 1 }] },
        { Name: "闪光" },
    ],
};

const layerNames = {
    EN: {
        绑带: "Straps",
        本体: "Body",
        电击肛塞: "Electro Butt Plug",
        阴部: "Vulva",
        大腿内侧: "Inner Thigh",
        小腹: "Lower Abdomen",
        闪光: "Glow",
    },
};

/** @type {AssetArchetypeConfig} */
const extended = {
    Archetype: ExtendedArchetype.MODULAR,
    ScriptHooks: {
        BeforeDraw: beforeDraw,
        ScriptDraw: scriptDraw,
        Draw: dialogDraw,
        Click: dialogClick,
    },
    ChatTags: Tools.CommonChatTags(),
    Modules: [
        {
            Name: "电击肛塞",
            Key: "a",
            DrawImages: false,
            Options: [
                {},
                {
                    Prerequisite: ["ButtEmpty"],
                    Property: {
                        Block: ["ItemButt"],
                        Effect: [E.IsPlugged],
                    },
                },
            ],
        },
        {
            Name: "阴部",
            Key: "p",
            DrawImages: false,
            Options: [
                {},
                {
                    Prerequisite: ["VulvaEmpty"],
                    Property: {
                        Block: ["ItemVulva"],
                    },
                },
            ],
        },
        {
            Name: "大腿内侧",
            Key: "u",
            DrawImages: false,
            Options: [{}, {}],
        },
        {
            Name: "小腹",
            Key: "d",
            DrawImages: false,
            Options: [{}, {}],
        },
    ],
    BaselineProperty: {
        ShockLevel: 0,
        ShowText: false,
        NextShockTime: 0,
    },
};

/** @type {Translation.Dialog} */
const assetStrings = {
    CN: {
        SelectBase: "选择配置",
        Module电击肛塞: "电击肛塞",
        Module阴部: "阴部",
        Module大腿内侧: "大腿内侧",
        Module小腹: "小腹",

        Select电击肛塞: "配置电击肛塞",
        Optiona0: "无",
        Optiona1: "有",
        Seta0: "SourceCharacter在TargetCharacter身上使用了电击肛塞",
        Seta1: "SourceCharacter从TargetCharacter身上移除了电击肛塞",

        Select阴部: "配置阴部",
        Optionp0: "无",
        Optionp1: "有",
        Setp0: "SourceCharacter在TargetCharacter身上使用了阴部电击器",
        Setp1: "SourceCharacter从TargetCharacter身上移除了阴部电击器",

        Select大腿内侧: "配置大腿内侧",
        Optionu0: "无",
        Optionu1: "有",
        Setu0: "SourceCharacter在TargetCharacter身上使用了大腿内侧电击器",
        Setu1: "SourceCharacter从TargetCharacter身上移除了大腿内侧电击器",

        Select小腹: "配置小腹",
        Optiond0: "无",
        Optiond1: "有",
        Setd0: "SourceCharacter在TargetCharacter身上使用了小腹电击器",
        Setd1: "SourceCharacter从TargetCharacter身上移除了小腹电击器",

        持续电击开关: "持续电击",
        触发电击: "触发电击",

        设置开始间歇持续电击: "SourceCharacter让DestinationCharacter身上的AssetName会间歇持续电击",
        设置停止间歇持续电击: "SourceCharacter让DestinationCharacter身上的AssetName不再间歇持续电击",

        开始间歇持续电击: "SourceCharacter身上的AssetName突然开始电击！",
        停止间歇持续电击: "SourceCharacter身上的AssetName停止电击。",
    },
    EN: {
        SelectBase: "Select configuration",
        Module电击肛塞: "Electro Butt Plug",
        Module阴部: "Vulva",
        Module大腿内侧: "Inner Thigh",
        Module小腹: "Lower Abdomen",

        Select电击肛塞: "Configure Electro Butt Plug",
        Optiona0: "None",
        Optiona1: "Present",
        Seta0: "SourceCharacter used an Electro Butt Plug on TargetCharacter",
        Seta1: "SourceCharacter removed an Electro Butt Plug from TargetCharacter",

        Select阴部: "Configure Vulva",
        Optionp0: "None",
        Optionp1: "Present",
        Setp0: "SourceCharacter used a Vulva Shock Device on TargetCharacter",
        Setp1: "SourceCharacter removed a Vulva Shock Device from TargetCharacter",

        Select大腿内侧: "Configure Inner Thigh",
        Optionu0: "None",
        Optionu1: "Present",
        Setu0: "SourceCharacter used an Inner Thigh Shock Device on TargetCharacter",
        Setu1: "SourceCharacter removed an Inner Thigh Shock Device from TargetCharacter",

        Select小腹: "Configure Lower Abdomen",
        Optiond0: "None",
        Optiond1: "Present",
        Setd0: "SourceCharacter used a Lower Abdomen Shock Device on TargetCharacter",
        Setd1: "SourceCharacter removed a Lower Abdomen Shock Device from TargetCharacter",

        持续电击开关: "Continuous",
        触发电击: "Trigger Shock",

        设置开始间歇持续电击:
            "SourceCharacter enabled intermittent continuous shocks on DestinationCharacter AssetName",
        设置停止间歇持续电击:
            "SourceCharacter disabled intermittent continuous shocks on DestinationCharacter AssetName",

        开始间歇持续电击: "AssetName on SourceCharacter suddenly starts to shock!",
        停止间歇持续电击: "AssetName SourceCharacter stops shocking.",
    },
};

const translation = {
    CN: "电击器",
    EN: "Shock Device",
};

export default function () {
    AssetManager.addAssetWithConfig("ItemLegs", asset, { extended, translation, layerNames, assetStrings });
    luziSuffixFixups("ItemLegs", asset.Name);
}

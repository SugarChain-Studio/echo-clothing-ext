import { AssetManager } from "../../../assetForward";
import { DialogTools, Tools } from "@mod-utils/Tools";
import { luziSuffixFixups } from "../../../lib/fixups";
import { createItemDialogModular, PoseMapTool, PostPass } from "../../../lib";
import { ChatRoomRemoteEventEmitter } from "@sugarch/bc-event-handler";

/**
 * @typedef {Object} ShockEvent
 * @property {[{Group:AssetGroupItemName, Asset:string}]} immediateShock
 */

/** @type {ChatRoomRemoteEventEmitter<ShockEvent>} */
export const luggageHandler = new ChatRoomRemoteEventEmitter("EchoClothingExt@ShockEventHandler");

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

const dialog = createItemDialogModular({
    buttons: [
        {
            location: { x: 1510, y: 675, w: 225, h: 55 },
            key: "触发电击",
            hover: () => "H_触发电击",
            show: ({ data }) => data.currentModule === "Base",
            onclick: ({ item, chara }) => {
                PropertyShockPublishAction(chara, item, false);
            },
        },
    ],
    checkboxes: [
        {
            location: { x: 1185, y: 675 },
            text: ({ text }) => text("持续电击开关"),
            checked: ({ item }) => item.Property?.ShockLevel > 0,
            onclick: ({ item }) => {
                const shockL = item.Property?.ShockLevel || 0;
                item.Property ??= {};
                item.Property.ShockLevel = shockL > 0 ? 0 : 1;
            },
            actionKey: ({ item }) => `设置${item.Property?.ShockLevel ? "开始" : "停止"}间歇持续电击`,
        },
    ],
});

/** @type { AddAssetWithConfigParams } */
const asset = [
    ["ItemLegs"],
    PostPass.asset(
        {
            Name: "电击器",
            Random: false,
            Gender: "F",
            ...Tools.topLeftBuilder({ Top: 0, Left: 0 }, ["KneelingSpread", { Left: 60 }]),
            Difficulty: 3,
            Priority: 14,
            Fetish: ["Masochism"],
            DynamicGroupName: "ItemLegs",
            PoseMapping: PoseMapTool.config(
                ["Kneel", "KneelingSpread", "Spread", "LegsClosed"],
                ["AllFours", "Hogtied"]
            ),
            Layer: [
                { Name: "绑带" },
                { Name: "本体" },
                { Name: "电击肛塞", AllowTypes: [{ a: 1 }] },
                { Name: "阴部", AllowTypes: [{ p: 1 }] },
                { Name: "大腿内侧", AllowTypes: [{ u: 1 }] },
                { Name: "小腹", AllowTypes: [{ d: 1 }] },
                { Name: "闪光" },
            ],
        },
        (asset) => {
            luziSuffixFixups("ItemLegs", asset.Name);
        }
    ),
    {
        translation: { CN: "电击器", EN: "Shock Device" },
        layerNames: {
            EN: {
                绑带: "Straps",
                本体: "Body",
                电击肛塞: "Anal",
                阴部: "Vaginal",
                大腿内侧: "Inner Thigh",
                小腹: "Lower Abdomen",
                闪光: "Glow",
            },
        },
        extended: {
            Archetype: ExtendedArchetype.MODULAR,
            ScriptHooks: dialog.createHooks({ BeforeDraw: beforeDraw, ScriptDraw: scriptDraw }),
            ChatTags: Tools.CommonChatTags(),
            Modules: [
                {
                    Name: "电击肛塞",
                    Key: "a",
                    DrawImages: false,
                    Options: [
                        {},
                        { Prerequisite: ["ButtEmpty"], Property: { Block: ["ItemButt"], Effect: [E.IsPlugged] } },
                    ],
                },
                {
                    Name: "阴部",
                    Key: "p",
                    DrawImages: false,
                    Options: [{}, { Prerequisite: ["VulvaEmpty"], Property: { Block: ["ItemVulva"] } }],
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
                {
                    Name: "随机电击",
                    Key: "r",
                    DrawImages: false,
                    Options: [{}, {}],
                },
            ],
            BaselineProperty: {
                ShowText: false,
                NextShockTime: 0,
            },
        },
        assetStrings: {
            CN: {
                SelectBase: "选择配置",

                ...DialogTools.repeatEntries([["Optiona0", "Optionp0", "Optionu0", "Optiond0"], "无"]),
                ...DialogTools.repeatEntries([["Optiona1", "Optionp1", "Optionu1", "Optiond1"], "有"]),

                Module电击肛塞: "电击肛塞",
                Select电击肛塞: "配置电击肛塞",
                Seta0: "SourceCharacter在DestinationCharacter身上使用了电击肛塞，并连接到AssetName。",
                Seta1: "SourceCharacter从DestinationCharacter身上移除了电击肛塞。",

                Module阴部: "电击阴栓",
                Select阴部: "配置电击阴栓",
                Setp0: "SourceCharacter在DestinationCharacter身上使用了阴部电击栓，并连接到AssetName。",
                Setp1: "SourceCharacter从DestinationCharacter身上移除了阴部电击栓。",

                Module大腿内侧: "大腿内侧贴片",
                Select大腿内侧: "配置大腿内侧贴片",
                Setu0: "SourceCharacter在DestinationCharacter身上使用了大腿内侧电击贴片，并连接到AssetName。",
                Setu1: "SourceCharacter从DestinationCharacter身上移除了大腿内侧电击贴片。",

                Module小腹: "小腹贴片",
                Select小腹: "配置小腹贴片",
                Setd0: "SourceCharacter在DestinationCharacter身上使用了小腹电击贴片，并连接到AssetName。",
                Setd1: "SourceCharacter从DestinationCharacter身上移除了小腹电击贴片。",

                Module随机电击: "随机电击",
                Select随机电击: "配置随机电击",
                Setr0: "SourceCharacter关闭了DestinationCharacterAssetName的随机电击功能。",
                Setr1: "SourceCharacter启动了DestinationCharacterAssetName的随机电击功能。",

                持续电击开关: "持续电击",
                触发电击: "触发电击",

                开始间歇持续电击: "SourceCharacter身上的AssetName突然开始电击！",
                停止间歇持续电击: "SourceCharacter身上的AssetName停止电击。",
            },
            EN: {
                SelectBase: "Select configuration",
                Module电击肛塞: "Anal Shock Plug",
                Select电击肛塞: "Configure Anal Shock Plug",
                Optiona0: "None",
                Optiona1: "Present",
                Seta0: "SourceCharacter used an Anal Shock Plug on TargetCharacter",
                Seta1: "SourceCharacter removed an Anal Shock Plug from TargetCharacter",

                Module阴部: "Vaginal Shock Plug",
                Select阴部: "Configure Vaginal Shock Plug",
                Optionp0: "None",
                Optionp1: "Present",
                Setp0: "SourceCharacter used a Vaginal Shock Plug on TargetCharacter",
                Setp1: "SourceCharacter removed a Vaginal Shock Plug from TargetCharacter",

                Module大腿内侧: "Inner Thigh Patch",
                Select大腿内侧: "Configure Inner Thigh Patch",
                Optionu0: "None",
                Optionu1: "Present",
                Setu0: "SourceCharacter used an Inner Thigh Shock Patch on TargetCharacter",
                Setu1: "SourceCharacter removed an Inner Thigh Shock Patch from TargetCharacter",

                Module小腹: "Lower Abdomen Patch",
                Select小腹: "Configure Lower Abdomen Patch",
                Optiond0: "None",
                Optiond1: "Present",
                Setd0: "SourceCharacter used a Lower Abdomen Shock Patch on TargetCharacter",
                Setd1: "SourceCharacter removed a Lower Abdomen Shock Patch from TargetCharacter",
                持续电击开关: "Continuous Shock",
                触发电击: "Trigger Shock",

                设置开始间歇持续电击:
                    "SourceCharacter enabled intermittent continuous shocks on DestinationCharacter AssetName",
                设置停止间歇持续电击:
                    "SourceCharacter disabled intermittent continuous shocks on DestinationCharacter AssetName",

                开始间歇持续电击: "AssetName on SourceCharacter suddenly starts to shock!",
                停止间歇持续电击: "AssetName SourceCharacter stops shocking.",
            },
        },
    },
];

export default function () {
    AssetManager.addAssetWithConfig(...asset);
}

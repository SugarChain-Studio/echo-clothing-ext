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
 * @typedef {Object} ShockDeviceData
 * @property {number} BlinkLastTimer - 上次闪烁的时间戳
 * @property {number} BlinkOnTimer - 闪烁开启的时间戳，用于控制闪烁持续时间
 * @property {boolean} BlinkLed - 闪烁状态，用于在beforeDraw时切换图层显示
 * @property {boolean} BlinkLedJustOn - 闪烁刚刚亮起的标记，用于在scriptDraw中触发一次性效果
 * @property {"RUN" | undefined} ShockState - 电击状态，"RUN"表示正在电击中，undefined表示未电击
 * @property {number} ShockTime - 上次触发电击的时间戳
 * @property {boolean} ShockIsRunning - 电击是否正在进行
 */

// 间隔时间配置
// 最小间隔
// 0 - 1 - 2 - 3 - 4
// 1分钟 - 5分钟 - 10分钟 - 30分钟 - 60分钟
// 最大间隔（在最小间隔基础上增加的随机时间）
// 0 - 1 - 2 - 3 - 4
// 0分钟 - 1分钟 - 5分钟 - 10分钟 - 30分钟
// 随机电击持续时间
// 0 - 1 - 2
// 5秒 - 10秒 - 30秒

/**
 * @typedef {Object} ShockDevicePropertiesExt
 * @property {number} [Luzi_RandomIntervalMin] - 随机电击最小间隔
 * @property {number} [Luzi_RandomIntervalRange] - 随机电击间隔范围
 * @property {number} [Luzi_RandomShockDuration] - 随机电击持续时间
 * @property {boolean} [Luzi_ShockHardcore] - 是否开启硬核模式（电击时中止挣扎并停止移动）
 * @property {number} [Luzi_ManualShock] - 手动触发电击的标记，设置为当前时间戳时触发一次电击
 * @property {number} [Luzi_ShockEndTime] - 电击结束时间戳，用于控制电击持续时间，以及控制闪烁图层显示
 */

/**
 * @typedef {ShockDevicePropertiesExt & ItemProperties} ShockDeviceProperties
 */

/** @type {(p: ItemProperties) => ShockDeviceProperties} */
const props = (p) => p;

const minute = 60 * 1000;

/** @param {ItemProperties} p */
const timeDetail = (p) =>
    new (class {
        /** @param {ItemProperties} ps */
        constructor(ps) {
            this._props = props(ps);
        }
        get minInterval() {
            const v = this._props.Luzi_RandomIntervalMin;
            if (![0, 1, 2, 3, 4].includes(v)) return minute;
            return [1, 5, 10, 30, 60][v] * minute;
        }
        get minIntervalText() {
            return `${this.minInterval / minute}min`;
        }
        get intervalRange() {
            const v = this._props.Luzi_RandomIntervalRange;
            if (![0, 1, 2, 3, 4].includes(v)) return minute;
            return [0, 1, 5, 10, 30][v] * minute;
        }
        get maxIntervalText() {
            return `${(this.intervalRange + this.minInterval) / minute}min`;
        }
        get duration() {
            const v = this._props.Luzi_RandomShockDuration;
            if (![0, 1, 2].includes(v)) return 5;
            return [5, 10, 30][v] * 1000;
        }
        get durationText() {
            return `${this.duration / 1000}s`;
        }
    })(p);

const shockInterval = 2000;
const blinkInterval = shockInterval / 2;

/**
 * @param {Character} C
 * @param {Item} Item
 * @param {boolean} Auto
 */
function customShock(C, Item, Auto) {
    if (C.IsPlayer()) {
        if (props(Item.Property)?.Luzi_ShockHardcore) {
            if (StruggleMinigameIsRunning()) {
                StruggleProgress = 0;
                StruggleMinigameStop();
            }
            if (DialogMenuMode === "struggle") {
                DialogLeave();
            }
        }
        if (ChatRoomSlowtimer !== 0) {
            ChatRoomSlowLeaveCancel();
        }
        PropertyShockPublishAction(C, Item, Auto);
    }
}

/** @type {ExtendedItemScriptHookCallbacks.BeforeDraw<ModularItemData, ShockDeviceData>} */
function beforeDraw(mdata, originalFunction, { L, PersistentData }) {
    if (L === "闪光") {
        const data = PersistentData();
        if (data.BlinkLed && data.ShockIsRunning) {
            return { Opacity: 1 };
        }
        return { Opacity: 0 };
    }
    return {};
}

/** @type {ExtendedItemScriptHookCallbacks.ScriptDraw<ModularItemData, ShockDeviceData>} */
function scriptDraw(mdata, originalFunction, { C, PersistentData, Item }) {
    const now = Date.now();

    const data = PersistentData();
    data.BlinkLastTimer ??= now;
    data.ShockTime ??= 0;
    data.ShockIsRunning ??= false;

    if (now - data.BlinkLastTimer > blinkInterval) {
        data.BlinkLed = !data.BlinkLed;
        data.BlinkLastTimer = now;

        data.BlinkLedJustOn = data.BlinkLed;

        CharacterRefresh(C);
    } else {
        data.BlinkLedJustOn = false;
    }

    const property = props(Item.Property);

    let shouldUpdate = false;

    if (C.IsPlayer()) {
        if (property.Luzi_ManualShock) {
            shouldUpdate = true;
            property.Luzi_ManualShock = 0;
            property.Luzi_ShockEndTime = Math.max(property.Luzi_ShockEndTime || 0, now + shockInterval);
        }

        if (property.TypeRecord?.r === 1) {
            const detail = timeDetail(property);
            if (typeof data.ShockTime !== "number") {
                data.ShockTime = now + detail.minInterval + Math.round(Math.random() * detail.intervalRange);
                data.ShockState = undefined;
            }

            if (now > data.ShockTime && data.ShockState === undefined) {
                shouldUpdate = true;
                property.Luzi_ShockEndTime = now + detail.duration;
                data.ShockState = "RUN";
            } else if (now > property.Luzi_ShockEndTime && data.ShockState === "RUN") {
                data.ShockState = undefined;
                data.ShockTime = now + detail.minInterval + Math.round(Math.random() * detail.intervalRange);
            }
        } else {
            data.ShockState = undefined;
        }

        if (property.Luzi_ShockEndTime > now && data.BlinkLedJustOn) {
            customShock(C, Item, true);
        }

        if (property.Luzi_ShockEndTime > 0 && property.Luzi_ShockEndTime <= now) {
            shouldUpdate = true;
            property.Luzi_ShockEndTime = 0;
        }
    }

    data.ShockIsRunning = property.Luzi_ShockEndTime > now;

    if (shouldUpdate) {
        ChatRoomCharacterItemUpdate(C, Item.Asset.Group.Name);
    }
}

/**
 * @typedef {object} SliderConfigExtended
 * @property {keyof Omit<ShockDevicePropertiesExt,"Luzi_ShockHardcore">} PropsKey
 * @property {string} TextKey
 * @property {"minIntervalText" | "maxIntervalText" | "durationText"} rightLabelKey
 *
 * @typedef {Partial<ItemDialog.SliderConfig<ModularItemData>> & SliderConfigExtended} SliderConfigExtendedType
 */

const dialog = createItemDialogModular({
    buttons: [
        {
            location: { x: 1385, y: 675, w: 225, h: 55 },
            key: "D_触发电击",
            hover: () => "H_触发电击",
            show: ({ data }) => data.currentModule === "Base",
            onclick: ({ item }) => {
                props(item.Property).Luzi_ManualShock = Date.now();
            },
            leaveDialog: true,
        },
    ],
    checkboxes: [
        {
            location: { x: 1400, y: 550 },
            text: ({ text }) => text("D_HardCoreMode"),
            checked: ({ item }) => props(item.Property)?.Luzi_ShockHardcore,
            show: ({ data }) => data.currentModule === "随机电击",
            hover: () => "H_HardCoreMode",
            onclick: ({ item }) => {
                item.Property ??= {};
                props(item.Property).Luzi_ShockHardcore = !props(item.Property)?.Luzi_ShockHardcore;
            },
        },
    ],
    sliders: /** @type {SliderConfigExtendedType[]} */ ([
        {
            location: { x: 1250, y: 650, w: 500 },
            config: { min: 0, max: 4 },
            PropsKey: "Luzi_RandomIntervalMin",
            TextKey: "MinInterval",
            rightLabelKey: "minIntervalText",
        },
        {
            location: { x: 1250, y: 720, w: 500 },
            config: { min: 0, max: 4 },
            PropsKey: "Luzi_RandomIntervalRange",
            TextKey: "MaxInterval",
            rightLabelKey: "maxIntervalText",
        },
        {
            location: { x: 1250, y: 790, w: 500 },
            config: { min: 0, max: 2 },
            PropsKey: "Luzi_RandomShockDuration",
            TextKey: "ShockDuration",
            rightLabelKey: "durationText",
        },
    ]).map(
        (config) =>
            /** @type {ItemDialog.SliderConfig<ModularItemData>} */ ({
                show: ({ data, item }) =>
                    data.currentModule === "随机电击" && [1, 2].includes(item.Property?.TypeRecord?.r),
                value: ({ item }) => props(item.Property)?.[config.PropsKey] ?? 0,
                onChange: ({ item }, value) => {
                    item.Property ??= {};
                    props(item.Property)[config.PropsKey] = value;
                },
                leftLabel: ({ text }) => text(config.TextKey),
                rightLabel: ({ item }) => timeDetail(item.Property)[config.rightLabelKey],
                ...config,
            })
    ),
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
            Time: 10,
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
            BaselineProperty: /** @type {ShockDeviceProperties} */ ({
                ShowText: false,
                Luzi_RandomIntervalMin: 0,
                Luzi_RandomIntervalRange: 0,
                Luzi_RandomShockDuration: 0,
                Luzi_ShockHardcore: false,
                ShockLevel: 2,
            }),
            DrawImages: false,
            Modules: [
                {
                    Name: "电击肛塞",
                    Key: "a",
                    Options: [
                        {},
                        { Prerequisite: ["ButtEmpty"], Property: { Block: ["ItemButt"], Effect: [E.IsPlugged] } },
                    ],
                },
                {
                    Name: "阴部",
                    Key: "p",
                    Options: [{}, { Prerequisite: ["VulvaEmpty"], Property: { Block: ["ItemVulva"] } }],
                },
                { Name: "大腿内侧", Key: "u", Options: [{}, {}] },
                { Name: "小腹", Key: "d", Options: [{}, {}] },
                { Name: "随机电击", Key: "r", Options: [{}, {}] },
            ],
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
                Optionr0: "关闭",
                Optionr1: "启用",
                Setr0: "SourceCharacter关闭了DestinationCharacterAssetName的随机电击功能。",
                Setr1: "SourceCharacter启动了DestinationCharacterAssetName的随机电击功能。",

                持续电击开关: "持续电击",
                D_触发电击: "触发电击",
                H_触发电击: "立即触发一次电击",

                D_HardCoreMode: "硬核模式",
                H_HardCoreMode: "电击器的电击会中止挣扎、停止移动。",

                MinInterval: "最小间隔",
                MaxInterval: "最大间隔",
                ShockDuration: "持续时间",
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
                D_触发电击: "Trigger Shock",
                H_触发电击: "Trigger Shock Immediately",

                Module随机电击: "Random Shock",
                Select随机电击: "Configure Random Shock",
                Optionr0: "Off",
                Optionr1: "On",
                Setr0: "SourceCharacter turned off Random Shock on DestinationCharacter AssetName.",
                Setr1: "SourceCharacter turned on Random Shock on DestinationCharacter AssetName.",

                D_HardCoreMode: "Hardcore Mode",
                H_HardCoreMode: "The shocker will stop struggling and stop leaving room.",

                MinInterval: "Min Interval",
                MaxInterval: "Max Interval",
                ShockDuration: "Duration",
            },
        },
    },
];

export default function () {
    AssetManager.addAssetWithConfig(...asset);
}

import { Tools } from "@mod-utils/Tools";
import { AssetManager } from "../assetForward";

/** @type {AssetPoseName[]} */
const PoseAllUpper = ["BaseUpper", "Yoked", "OverTheHead", "BackBoxTie", "BackElbowTouch", "BackCuffs"];

/** @type {CustomAssetDefinition} */
const asset = {
    Name: "隐形药水_Luzi",
    Random: false,
    Gender: "F",
    Top: 0,
    Left: 0,
    Difficulty: 18,
    AllowLock: true,
    AllowTighten: true,
    DrawLocks: false,
    RemoveTime: 5,
    Time: 10,
    Effect: [E.Slow, E.Block],
    DynamicBeforeDraw: true,
    AllowActivePose: [...PoseAllStanding, ...PoseAllUpper],
    SetPose: ["BaseLower"],
    Hide: [
        "ItemHandheld",
        "HandsLeft",
        "HandsRight",
        "Bracelet",
        "AnkletLeft",
        "AnkletRight",
        "HandAccessoryLeft",
        "HandAccessoryRight",
        "Shoes",
        "Shoes_笨笨蛋Luzi",
        "Garters",
        "Socks",
        "Socks_笨笨蛋Luzi",
        "SocksRight",
        "SocksLeft",
    ],
    HideItem: [
        "ItemArmsCeilingShackles",
        "ItemArmsBolero",
        "ItemArmsYoke",
        "ItemArmsLatexButterflyLeotard",
        "ItemArmsLatexSleevelessLeotard",
        "ItemArmsPillory",
        "ItemArmsHeavyYoke",
    ],
    Block: ["ItemLegs", "ItemFeet", "ItemBoots"],
    Extended: true,
    ParentGroup: {},
    PoseMapping: {},
    Layer: [
        {
            Name: "身体遮罩",
            Top: 0,
            Left: 0,
            BlendingMode: "destination-out",
            TextureMask: {
                Groups: ["BodyUpper"],
            },
            PoseMapping: {
                BaseUpper: "Hide",
                TapedHands: "Hide",
                BackCuffs: "Hide",
                BackElbowTouch: "Hide",
                OverTheHead: "Hide",
                Yoked: "Hide",
                Hogtied: "Hogtied",
                AllFours: "Hide",
            },
        },
        {
            Name: "手臂遮罩",
            Top: 0,
            Left: 0,
            BlendingMode: "destination-out",
            TextureMask: {
                Groups: [
                    "ArmsLeft",
                    "ArmsRight",
                    "Bra",
                    "Bra_笨笨蛋Luzi",
                    "Bracelet",
                    "Gloves",
                    "Gloves_笨笨蛋Luzi",
                    "Suit",
                    "Suit_笨笨蛋Luzi",
                    "ItemTorso",
                    "ItemTorso2",
                    "ItemArms",
                ],
            },
            ParentGroup: {
                "": "BodyUpper",
                "OverTheHead": "",
                "Yoked": "",
            },
            PoseMapping: {
                TapedHands: "",
                BackCuffs: "",
                BackElbowTouch: "",
                OverTheHead: "OverTheHead",
                Yoked: "Yoked",
                Hogtied: "Hide",
                AllFours: "Hide",
            },
        },
        {
            Name: "下身遮罩",
            Top: 460,
            Left: 0,
            BlendingMode: "destination-out",
            TextureMask: {
                Groups: [
                    "BodyLower",
                    "Bra",
                    "Bra_笨笨蛋Luzi",
                    "SuitLower",
                    "SuitLower_笨笨蛋Luzi",
                    "ItemTorso",
                    "ItemTorso2",
                    "Liquid2_Luzi",
                    "BodyMarkings",
                    "身体痕迹_Luzi",
                    "BodyMarkings2_Luzi",
                ],
            },
            PoseMapping: {
                Kneel: "",
                KneelingSpread: "KneelingSpread",
                LegsClosed: "",
                Spread: "",
                Hogtied: "Hide",
                AllFours: "Hide",
            },
        },
        {
            Name: "臂环",
            Priority: 6,
            Top: 0,
            Left: 0,
            ColorGroup: "固定环",
            PoseMapping: {
                BackBoxTie: "",
                BackCuffs: "BackCuffs",
                BackElbowTouch: "Hide",
                OverTheHead: "OverTheHead",
                Yoked: "Yoked",
                Hogtied: "Hide",
                AllFours: "Hide",
            },
        },
        {
            Name: "腿环",
            Priority: 6,
            Top: 460,
            Left: 0,
            ColorGroup: "固定环",
            PoseMapping: {
                Kneel: "LegsClosed",
                KneelingSpread: "KneelingSpread",
                LegsClosed: "LegsClosed",
                Spread: "Spread",
                Hogtied: "Hide",
                AllFours: "Hide",
            },
        },
        {
            Name: "腿杆",
            Priority: 6,
            Top: 460,
            Left: 0,
            AllowTypes: { l: [4, 5] },
        },
        {
            Name: "腿杆链",
            Priority: 6,
            Top: 460,
            Left: 0,
            ColorGroup: "锁链",
            AllowTypes: { l: 5 },
        },
        {
            Name: "Cross链",
            Priority: 31,
            Top: 0,
            Left: 0,
            ColorGroup: "锁链",
            ShowForAttribute: [/** @type {AssetAttribute}*/ ("LuziXCross")],
            AllowTypes: { a: 0, l: 0 },
        },
        {
            Name: "Cross锚",
            Priority: 31,
            Top: 0,
            Left: 0,
            ShowForAttribute: [/** @type {AssetAttribute}*/ ("LuziXCross")],
            AllowTypes: { a: 0, l: 0 },
        },
        {
            Name: "脚链",
            Priority: 31,
            Top: 460,
            Left: 0,
            ParentGroup: "BodyLower",
            ColorGroup: "传送器",
            PoseMapping: {
                Kneel: "LegsClosed",
                KneelingSpread: "KneelingSpread",
                LegsClosed: "LegsClosed",
                Spread: "Spread",
                Hogtied: "Hide",
                AllFours: "Hide",
            },
        },
        {
            Name: "手链",
            Priority: 31,
            Top: 0,
            Left: 0,
            ParentGroup: "BodyUpper",
            ColorGroup: "传送器",
            PoseMapping: {
                BackBoxTie: "BackBoxTie",
                BackCuffs: "BackCuffs",
                BackElbowTouch: "Hide",
                OverTheHead: "OverTheHead",
                Yoked: "Yoked",
                Hogtied: "Hide",
                AllFours: "Hide",
            },
        },
        {
            Name: "手链链子",
            Priority: 8,
            AllowTypes: { a: 1 },
            Top: -430,
            Left: 0,
            ColorGroup: "锁链",
        },
        {
            Name: "脚链链子",
            Priority: 8,
            AllowTypes: { l: 1 },
            Top: -430,
            Left: 0,
            ColorGroup: "锁链",
        },
        {
            Name: "脚链链子反",
            Priority: 8,
            AllowTypes: { l: [2, 3] },
            Top: 530,
            Left: 0,
            CopyLayerColor: "脚链链子",
        },
        {
            Name: "吊顶链",
            Priority: 6,
            AllowTypes: { a: 3 },
            Top: -400,
            Left: -10,
            CopyLayerColor: "手链链子",
        },
    ],
};

const layerNames = {
    CN: {
        固定环: "固定环",
        锁链: "锁链",
        传送器: "传送器",

        臂环: "臂环",
        腿环: "腿环",
        腿杆: "腿杆",

        手链链子: "手臂链",
        脚链链子: "腿部链",

        Cross链: "X字架连接链",
        Cross锚: "X字架连接锚",
        手链: "手臂传送器",
        脚链: "腿部传送器",
    },
    EN: {
        固定环: "Fixed Ring",
        锁链: "Chain",
        传送器: "Teleporter",

        臂环: "Arm Ring",
        腿环: "Leg Ring",
        腿杆: "Leg Rod",

        手链链子: "Arm Chain",
        脚链链子: "Leg Chain",

        Cross链: "X-Cross Connection Chain",
        Cross锚: "X-Cross Connection Anchor",
        手链: "Arm Teleporter",
        脚链: "Leg Teleporter",
    },
};

/**@type {AssetArchetypeConfig} */
const extended = {
    Archetype: ExtendedArchetype.MODULAR,
    ChangeWhenLocked: false,
    ChatTags: Tools.CommonChatTags(),
    Modules: [
        {
            Name: "臂链",
            Key: "a",
            Options: [
                {
                    Property: {
                        Effect: [E.CuffedArms],
                        OverrideHeight: {
                            Height: -350,
                            Priority: 9,
                            HeightRatioProportion: 0,
                        },
                    },
                },
                {
                    Property: {
                        Effect: [E.Tethered, E.Suspended],
                        SetPose: ["OverTheHead"],
                        AllowActivePose: ["OverTheHead"],
                    },
                },
                {
                    Property: {
                        SetPose: ["BackElbowTouch"],
                        AllowActivePose: ["BackElbowTouch"],
                        OverrideHeight: {
                            Height: -350,
                            Priority: 9,
                            HeightRatioProportion: 0,
                        },
                    },
                },
                {
                    Property: {
                        Effect: [E.Tethered, E.Suspended],
                        SetPose: ["BackElbowTouch"],
                        AllowActivePose: ["BackElbowTouch"],
                    },
                },
            ],
        },
        {
            Name: "腿链",
            Key: "l",
            Options: [
                { Property: { Effect: [E.Slow, E.CuffedFeet] } },
                {
                    Property: {
                        Effect: [E.Tethered, E.Suspended],
                        SetPose: ["KneelingSpread"],
                        AllowActivePose: ["KneelingSpread"],
                    },
                },
                {
                    Property: {
                        Effect: [E.Tethered, E.Suspended],
                        SetPose: ["Spread"],
                        AllowActivePose: ["Spread"],
                    },
                },
                {
                    Property: {
                        Effect: [E.Tethered, E.Suspended],
                        SetPose: ["Spread", "Suspension"],
                        AllowActivePose: ["Spread"],
                    },
                },
                { Property: { Effect: [E.Slow], SetPose: ["LegsClosed"], AllowActivePose: ["LegsClosed"] } },
                {
                    Property: {
                        Effect: [E.Tethered, E.Suspended],
                        SetPose: ["LegsClosed", "Suspension"],
                        AllowActivePose: ["LegsClosed"],
                    },
                },
            ],
        },
        {
            Name: "高度",
            Key: "h",
            Options: [
                {},
                {
                    HasSubscreen: true,
                    ArchetypeConfig: {
                        Archetype: ExtendedArchetype.VARIABLEHEIGHT,
                        MaxHeight: 0,
                        MinHeight: -250,
                        DrawData: {
                            elementData: [{ position: [1140, 650, 100, 500], icon: "rope" }],
                        },
                        DialogPrefix: {
                            Chat: "SuspensionChange",
                        },
                    },
                },
            ],
        },
    ],
};

/**@type {Translation.Dialog} */
const dialog = {
    CN: {
        SelectBase: "选择隐形药水配置",
        Module臂链: "手部锁链",
        Module腿链: "腿部锁链",
        Module中链: "中间锁链",
        Module高度: "调整高度",

        Select臂链: "选择手臂锁链",
        Optiona0: "无",
        Optiona1: "添加铁链(向上吊起来)",
        Optiona2: "添加铁链(背后连接)",
        Optiona3: "添加铁链(背后吊起来)",
        Seta0: "SourceCharacter移除了附加在DestinationCharacterAssetName手臂装置上的锁链",
        Seta1: "SourceCharacter在DestinationCharacterAssetName手臂装置上添加了锁链，把TargetCharacter吊起来",
        Seta2: "SourceCharacter在DestinationCharacterAssetName手臂装置上添加了锁链，把DestinationCharacter手臂连接在一起",
        Seta3: "SourceCharacter在DestinationCharacterAssetName手臂装置上添加了锁链，把DestinationCharacter手臂连接在一起，并把TargetCharacter吊起来",

        Select腿链: "选择腿部锁链",
        Optionl0: "无",
        Optionl1: "添加铁链(向上)",
        Optionl2: "添加铁链(向下)",
        Optionl3: "添加铁链(向下倒吊)",
        Optionl4: "添加铁链(并腿)",
        Optionl5: "添加铁链(并腿倒吊)",
        Setl0: "SourceCharacter移除了附加在DestinationCharacterAssetName腿部装置上的锁链",
        Setl1: "SourceCharacter在DestinationCharacterAssetName腿部装置上添加了锁链，把TargetCharacter吊起来",
        Setl2: "SourceCharacter在DestinationCharacterAssetName腿部装置上添加了锁链，把DestinationCharacter腿连接到地板上",
        Setl3: "SourceCharacter在DestinationCharacterAssetName腿部装置上添加了锁链，把TargetCharacter倒吊起来",
        Setl4: "SourceCharacter在DestinationCharacterAssetName腿部装置上添加了锁链，把DestinationCharacter腿连接在一起",
        Setl5: "SourceCharacter在DestinationCharacterAssetName腿部装置上添加了锁链，把DestinationCharacter腿连接在一起并倒吊起来",

        Select高度: "调整高度",
        Optionh0: "无",
        Optionh1: "调整高度",
        Seth0: "SourceCharacter取消了DestinationCharacter高度调整",
        Seth1: "SourceCharacter调整了DestinationCharacter悬挂高度",
    },
    EN: {
        SelectBase: "Select Invisibility Potion Config",
        Module臂链: "Arm Chain",
        Module腿链: "Leg Chain",
        Module中链: "Middle Chain",
        Module高度: "Adjust Height",

        Select臂链: "Select Arm Chain",
        Optiona0: "None",
        Optiona1: "Add Chain (Suspension)",
        Optiona2: "Add Chain (Back)",
        Optiona3: "Add Chain (Back Suspension)",
        Seta0: "SourceCharacter removed the chain from DestinationCharacterAssetName arm device",
        Seta1: "SourceCharacter added a chain to DestinationCharacterAssetName arm device and suspended TargetCharacter",
        Seta2: "SourceCharacter added a chain to DestinationCharacterAssetName arm device and connected DestinationCharacter arms together",
        Seta3: "SourceCharacter added a chain to DestinationCharacterAssetName arm device and connected DestinationCharacter arms together and suspended TargetCharacter",

        Select腿链: "Select Leg Chain",
        Optionl0: "None",
        Optionl1: "Add Chain (Up)",
        Optionl2: "Add Chain (Down)",
        Optionl3: "Add Chain (Down Suspension)",
        Optionl4: "Add Chain (Legs Together)",
        Optionl5: "Add Chain (Legs Together Suspension)",
        Setl0: "SourceCharacter removed the chain from DestinationCharacterAssetName leg device",
        Setl1: "SourceCharacter added a chain to DestinationCharacterAssetName leg device and suspended TargetCharacter",
        Setl2: "SourceCharacter added a chain to DestinationCharacterAssetName leg device and connected DestinationCharacter legs to the floor",
        Setl3: "SourceCharacter added a chain to DestinationCharacterAssetName leg device and suspended TargetCharacter upside down",
        Setl4: "SourceCharacter added a chain to DestinationCharacterAssetName leg device and connected DestinationCharacter legs together",
        Setl5: "SourceCharacter added a chain to DestinationCharacterAssetName leg device and connected DestinationCharacter legs together and suspended upside down",

        Select高度: "Adjust Height",
        Optionh0: "None",
        Optionh1: "Adjust Height",
        Seth0: "SourceCharacter removed the height adjustment from DestinationCharacter",
        Seth1: "SourceCharacter adjusted the suspension height of DestinationCharacter",
    },
};

const translation = {
    CN: "四肢传送装置",
    EN: "Limb Teleportation Device",
    RU: "Устройство телепортации конечностей",
};

export default function () {
    AssetManager.addAssetWithConfig("ItemAddon", asset, { translation, layerNames, extended, assetStrings: dialog });
    AssetManager.modifyAsset("ItemDevices", "X-Cross", (group, asset) => {
        asset.Attribute = /** @type {AssetAttribute[]}*/ ([...asset.Attribute, "LuziXCross"]);
    });
}

import { Tools } from "@mod-utils/Tools";
import { AssetManager } from "../assetForward";

/** @type {AssetPoseName[]} */
const PoseAllLower = [...PoseAllKneeling, ...PoseAllStanding];
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
    AllowActivePose: [...PoseAllLower, ...PoseAllUpper],
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
    Layer: [
        {
            Name: "身体遮罩",
            Top: 0,
            Left: 0,
            BlendingMode: "destination-out",
            TextureMask: {
                Groups: ["BodyUpper"],
            },
            ParentGroup: {},
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
                TapedHands: "BaseUpper",
                BackCuffs: "BaseUpper",
                BackElbowTouch: "BaseUpper",
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
            ParentGroup: {},
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
            Name: "脚链",
            Priority: 31,
            Top: 460,
            Left: 0,
            CopyLayerColor: "手链",
            ParentGroup: "BodyLower",
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
            CopyLayerColor: "吊顶链",
        },
        {
            Name: "脚链链子",
            Priority: 8,
            AllowTypes: { l: 1 },
            Top: -430,
            Left: 0,
            CopyLayerColor: "吊顶链",
        },
        {
            Name: "脚链链子反",
            Priority: 8,
            AllowTypes: { l: [2, 3] },
            Top: 530,
            Left: 0,
            CopyLayerColor: "吊顶链",
        },
        {
            Name: "脚链拘束",
            Priority: 30,
            AllowTypes: { l: 4 },
            Top: 460,
            Left: 0,
            CopyLayerColor: "吊顶链",
        },
        {
            Name: "吊顶链",
            Priority: 1,
            AllowTypes: { c: [1] },
            Top: -400,
            Left: -10,
        },
    ],
    OverrideHeight: {
        Height: -450,
        Priority: 9,
        HeightRatioProportion: 0,
    },
};

const layerNames = {
    CN: {
        手链: "四肢传送器",
        吊顶链: "锁链",
    },
    EN: {
        手链: "Limb Teleportation Device",
        吊顶链: "Chains",
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
            DrawImages: false,
            Key: "a",
            Options: [
                { Property: { Effect: [E.CuffedArms] } },
                {
                    Prerequisite: ["NotSuspended"],
                    Property: { Effect: [E.Suspended], SetPose: ["OverTheHead"] },
                    Expression: [{ Group: "Blush", Name: "Medium", Timer: 10 }],
                },
                {
                    Property: { SetPose: ["BackElbowTouch"] },
                    Expression: [{ Group: "Blush", Name: "Medium", Timer: 10 }],
                },
            ],
        },
        {
            Name: "腿链",
            DrawImages: false,
            Key: "l",
            Options: [
                { Property: { Effect: [E.CuffedFeet] } },
                {
                    Property: {
                        Effect: [E.Suspended],
                        SetPose: ["BackBoxTie", "KneelingSpread"],
                    },
                    Expression: [{ Group: "Blush", Name: "Medium", Timer: 10 }],
                },
                {
                    Property: {
                        Effect: [E.Suspended],
                        SetPose: ["BackBoxTie", "KneelingSpread"],
                    },
                    Expression: [{ Group: "Blush", Name: "Medium", Timer: 10 }],
                },
                {
                    Property: {
                        Effect: [E.Suspended],
                        SetPose: ["BackBoxTie", "KneelingSpread", "Suspension"],
                    },
                    Expression: [{ Group: "Blush", Name: "Medium", Timer: 10 }],
                },
                {
                    Property: { SetPose: ["Kneel"] },
                    Expression: [{ Group: "Blush", Name: "Medium", Timer: 10 }],
                },
            ],
        },
        {
            Name: "中链",
            DrawImages: false,
            Key: "c",
            Options: [
                {},
                {
                    Property: { Effect: [E.Suspended] },
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
        Module自定义高度: "调整高度",

        Select臂链: "选择手臂锁链",
        Optiona0: "无",
        Optiona1: "添加铁链(向上吊起来)",
        Optiona2: "添加铁链(背后连接)",
        Seta0: "SourceCharacter移除了附加在DestinationCharacterAssetName手臂装置上的锁链",
        Seta1: "SourceCharacter在DestinationCharacterAssetName手臂装置上添加了锁链，把TargetCharacter吊起来",
        Seta2: "SourceCharacter在DestinationCharacterAssetName手臂装置上添加了锁链，把DestinationCharacter手臂连接在一起",

        Select腿链: "选择腿部锁链",
        Optionl0: "无",
        Optionl1: "添加铁链(向上)",
        Optionl2: "添加铁链(向下)",
        Optionl3: "添加铁链(向下倒吊)",
        Optionl4: "添加铁链(并腿)",
        Setl0: "SourceCharacter移除了附加在DestinationCharacterAssetName腿部装置上的锁链",
        Setl1: "SourceCharacter在DestinationCharacterAssetName腿部装置上添加了锁链，把TargetCharacter吊起来",
        Setl2: "SourceCharacter在DestinationCharacterAssetName腿部装置上添加了锁链，把DestinationCharacter腿连接到地板上",
        Setl3: "SourceCharacter在DestinationCharacterAssetName腿部装置上添加了锁链，将TargetCharacter倒吊起来",
        Setl4: "SourceCharacter在DestinationCharacterAssetName腿部装置上添加了锁链，把DestinationCharacter腿连接在一起",

        Select中链: "中间锁链",
        Optionc0: "无",
        Optionc1: "添加铁链",
        Setc0: "SourceCharacter移除了DestinationCharacter身体中间的悬挂链",
        Setc1: "SourceCharacter在DestinationCharacter身体中间添加了悬挂链",
    },
    EN: {
        SelectBase: "Select Limb Teleportation Device Configuration",
        Module臂链: "Arm Chain",
        Module腿链: "Leg Chain",
        Module中链: "Middle Chain",
        Module自定义高度: "Adjust Height",

        Select臂链: "Select Arm Chain",
        Optiona0: "None",
        Optiona1: "Add Chain (Suspended)",
        Optiona2: "Add Chain (Back)",
        Seta0: "SourceCharacter removed the chain from DestinationCharacter AssetName arm device",
        Seta1: "SourceCharacter added a chain to DestinationCharacter AssetName arm device, suspending TargetCharacter",
        Seta2: "SourceCharacter added a chain to DestinationCharacter AssetName arm device, connecting DestinationCharacter arms together",

        Select腿链: "Select Leg Chain",
        Optionl0: "None",
        Optionl1: "Add Chain (Up)",
        Optionl2: "Add Chain (Down)",
        Optionl3: "Add Chain (Upside Down)",
        Optionl4: "Add Chain (Legs Together)",
        Setl0: "SourceCharacter removed the chain from DestinationCharacter AssetName leg device",
        Setl1: "SourceCharacter added a chain to DestinationCharacter AssetName leg device, suspending TargetCharacter",
        Setl2: "SourceCharacter added a chain to DestinationCharacter AssetName leg device, connecting DestinationCharacter legs to the floor",
        Setl3: "SourceCharacter added a chain to DestinationCharacter AssetName leg device, suspending TargetCharacter upside down",
        Setl4: "SourceCharacter added a chain to DestinationCharacter AssetName leg device, connecting DestinationCharacter legs together",

        Select中链: "Middle Chain",
        Optionc0: "None",
        Optionc1: "Add Chain",
        Setc0: "SourceCharacter removed the suspension chain from the middle of DestinationCharacter body",
        Setc1: "SourceCharacter added a suspension chain to the middle of DestinationCharacter body",
    },
};

const translation = {
    CN: "四肢传送装置",
    EN: "Limb Teleportation Device",
    RU: "Устройство телепортации конечностей",
};

export default function () {
    const group = "ItemAddon";
    AssetManager.addAssetWithConfig(group, asset, { translation, layerNames, extended, assetStrings: dialog });
}

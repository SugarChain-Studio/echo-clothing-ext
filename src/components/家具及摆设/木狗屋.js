import { Tools } from "@mod-utils/Tools";
import { AssetManager } from "../../assetForward";

/** @type {AssetPoseMapping} */
const baseMapping = {
    AllFours: PoseType.HIDE,
    Hogtied: PoseType.HIDE,
};

/** @type {AssetPoseMapping} */
const foursMapping = {
    BaseUpper: PoseType.HIDE,
    BaseLower: PoseType.HIDE,
    Yoked: PoseType.HIDE,
    OverTheHead: PoseType.HIDE,
    BackBoxTie: PoseType.HIDE,
    BackElbowTouch: PoseType.HIDE,
    BackCuffs: PoseType.HIDE,
    Spread: PoseType.HIDE,
    Kneel: PoseType.HIDE,
    KneelingSpread: PoseType.HIDE,
    LegsClosed: PoseType.HIDE,
};

/** @type { (string)=>Partial<AssetLayerDefinition> } */
const bLConfig = (name) => ({
    Name: name,
    PoseMapping: baseMapping,
});

/** @type { (string)=>Partial<AssetLayerDefinition> } */
const fLConfig = (name) => ({
    Name: name,
    CopyLayerColor: name,
    Priority: 57,
    PoseMapping: foursMapping,
});

/** @type { CustomAssetDefinition } */
const asset = {
    Name: "木狗屋",
    Random: false,
    Top: 420,
    Left: 0,
    Effect: [E.Mounted, E.MapImmobile, E.OnBed],
    LayerVisibility: true,
    Difficulty: -10,
    Time: 15,
    AllowLock: true,
    FixedPosition: true,
    ParentGroup: {},
    Priority: 1,
    Layer: [
        { Name: "Back" },
        { Name: "Floor" },
        { Name: "Carpet", AllowTypes: { c: 0 } },
        { ...bLConfig("Front"), ColorGroup: "Front" },
        { ...bLConfig("Frame"), ColorGroup: "Front" },
        { ...bLConfig("Door"), AllowTypes: { d: 1 } },
        { ...bLConfig("Bar"), AllowTypes: { d: 2 } },
        { ...bLConfig("HolderR"), ColorGroup: "Holder" },
        { ...bLConfig("HolderL"), ColorGroup: "Holder", AllowTypes: { d: [1, 2] } },
        { ...bLConfig("LockArch"), ColorGroup: "Lock", LockLayer: true, AllowTypes: { d: [1, 2] } },
        { ...bLConfig("LockBody"), ColorGroup: "Lock", LockLayer: true, AllowTypes: { d: [1, 2] } },
        { ...bLConfig("Plaque"), ColorGroup: "Front" },
        { ...bLConfig("Text") },
        { ...bLConfig("Stair") },
        {
            Name: "Mask",
            HasImage: false,
            AllowColorize: false,
            PoseMapping: foursMapping,
            Priority: 57,
            Alpha: [
                {
                    Masks: [
                        [-100, 0, 700, 600],
                        [-100, 980, 700, 20],
                        [-100, 0, 240, 1000],
                        [360, 0, 240, 1000],
                        AssetLowerOverflowAlpha,
                        AssetUpperOverflowAlpha,
                    ],
                    Pose: ["AllFours", "Hogtied"],
                },
            ],
        },
        { ...fLConfig("Front") },
        { ...fLConfig("Frame") },
        { ...fLConfig("Door"), AllowTypes: { d: 1 } },
        { ...fLConfig("Bar"), AllowTypes: { d: 2 } },
        { ...fLConfig("HolderR") },
        { ...fLConfig("HolderL"), AllowTypes: { d: 1 } },
        { ...fLConfig("LockArch"), LockLayer: true, AllowTypes: { d: 1 } },
        { ...fLConfig("LockBody"), LockLayer: true, AllowTypes: { d: 1 } },
        { ...fLConfig("Plaque") },
        { ...fLConfig("Text") },
        { ...fLConfig("Stair") },
    ],
};

const translation = {
    CN: "木狗屋",
    EN: "Wooden Dog House",
};

const layerNames = {
    CN: {
        Back: "后面",
        Floor: "地板",
        Carpet: "地毯",
        Front: "前面",
        Frame: "框架",
        Stair: "楼梯",
        Door: "木门",
        Bar: "铁栅栏门",
        HolderR: "右侧锁搭扣",
        HolderL: "左侧锁搭扣",
        Holder: "锁搭扣",
        Lock: "锁",
        LockArch: "锁梁",
        LockBody: "锁体",
        Plaque: "铭牌",
        Text: "文字",
    },
    EN: {
        Back: "Back",
        Floor: "Floor",
        Carpet: "Carpet",
        Front: "Front",
        Frame: "Frame",
        Stair: "Stair",
        Door: "Wooden Door",
        Bar: "Iron Grille Door",
        HolderR: "Lock Holder Right",
        HolderL: "Lock Holder Left",
        Lock: "Lock",
        LockArch: "Lock Arch",
        LockBody: "Lock Body",
        Plaque: "Plaque",
        Text: "Text",
    },
};

/** @type {ModularItemConfig} */
const extended = {
    Archetype: ExtendedArchetype.MODULAR,
    ChatTags: Tools.CommonChatTags(),
    ChangeWhenLocked: false,
    BaselineProperty: { Text: "Puppy" },
    Modules: [
        {
            Name: "Door",
            Key: "d",
            Options: [
                {},
                {
                    Difficulty: 6,
                    Property: {
                        Effect: [E.Enclose, E.BlockWardrobe, E.Mounted, E.MapImmobile],
                        SetPose: ["AllFours"],
                        AllowActivePose: ["AllFours", "Hogtied"],
                    },
                },
                {
                    Difficulty: 6,
                    Property: {
                        Effect: [E.OneWayEnclose, E.BlockWardrobe, E.Mounted, E.MapImmobile],
                        SetPose: ["AllFours"],
                        AllowActivePose: ["AllFours", "Hogtied"],
                    },
                },
            ],
        },
        {
            Name: "Carpet",
            Key: "c",
            Options: [{}, {}],
        },
        {
            Name: "Text",
            Key: "t",
            Options: [
                {
                    HasSubscreen: true,
                    ArchetypeConfig: {
                        Archetype: ExtendedArchetype.TEXT,
                        MaxLength: { Text: 16 },
                        Font: "'Satisfy', cursive",
                        ScriptHooks: {
                            AfterDraw: afterDraw,
                        },
                    },
                },
                {
                    HasSubscreen: true,
                    ArchetypeConfig: {
                        Archetype: ExtendedArchetype.TEXT,
                        MaxLength: { Text: 16, Text2: 16 },
                        Font: "'Satisfy', cursive",
                        ScriptHooks: {
                            AfterDraw: afterDraw,
                        },
                    },
                },
            ],
        },
    ],
};

const assetStrings = {
    CN: {
        SelectBase: "配置木狗屋选项",
        ModuleDoor: "门",
        ModuleCarpet: "地毯",
        ModuleText: "文字",

        SelectDoor: "选择门的类型",
        Optiond0: "无门",
        Optiond1: "木门",
        Optiond2: "铁栅栏门",
        Setd0: "SourceCharacter拆除了DestinationCharacterAssetName的门。",
        Setd1: "SourceCharacter用木门将DestinationCharacter关在AssetName里。",
        Setd2: "SourceCharacter用铁栅栏门将DestinationCharacter关在AssetName里。",

        SelectCarpet: "选择地毯的类型",
        Optionc0: "有地毯",
        Optionc1: "无地毯",
        Setc0: "SourceCharacter在DestinationCharacterAssetName里放置了地毯。",
        Setc1: "SourceCharacter移除了DestinationCharacterAssetName里的地毯。",

        SelectText: "选择文字的类型",
        Optiont0: "一行文字",
        Optiont1: "两行文字",
        Sett0: "SourceCharacter开始编辑DestinationCharacterAssetName上的一行文字。",
        Sett1: "SourceCharacter开始编辑DestinationCharacterAssetName上的两行文字。",
    },
    EN: {
        SelectBase: "Configure Wooden Dog House Options",
        ModuleDoor: "Door",
        ModuleCarpet: "Carpet",
        ModuleText: "Text",

        SelectDoor: "Select the type of door",
        Optiond0: "No Door",
        Optiond1: "Wooden Door",
        Optiond2: "Iron Grille Door",
        Setd0: "SourceCharacter removed the door from DestinationCharacter AssetName.",
        Setd1: "SourceCharacter locked DestinationCharacter in AssetName with a wooden door.",
        Setd2: "SourceCharacter locked DestinationCharacter in AssetName with an iron grille door.",

        SelectCarpet: "Select the type of carpet",
        Optionc0: "With Carpet",
        Optionc1: "No Carpet",
        Setc0: "SourceCharacter placed a carpet in DestinationCharacter AssetName.",
        Setc1: "SourceCharacter removed the carpet from DestinationCharacter AssetName.",

        SelectText: "Select the type of text",
        Optiont0: "One Line Text",
        Optiont1: "Two Line Text",
        Sett0: "SourceCharacter started editing one line of text on DestinationCharacter AssetName.",
        Sett1: "SourceCharacter started editing two lines of text on DestinationCharacter AssetName.",
    },
};

/** @type {ExtendedItemScriptHookCallbacks.AfterDraw<TextItemData>} */
function afterDraw(
    data,
    originalFunction,
    { C, A, CA, X, Y, Property, AlphaMasks, L, Color, drawCanvas, drawCanvasBlink }
) {
    // 176, 131 // top-left
    // 324, 224 // bottom-right
    const Width = 324 - 176;
    const Height = 224 - 131;

    if (L === "Text") {
        const singleLine = (Property.TypeRecord?.t ?? 0) === 0;
        const TempCanvas = AnimationGenerateTempCanvas(C, A, Width, Height);

        TextItem.Init(data, C, CA, false, false);

        /** @type {DynamicDrawOptions} */
        const config = {
            fontSize: 22,
            fontFamily: data.font,
            color: Color,
            textAlign: "center",
            width: Width,
        };
        const ctx = TempCanvas.getContext("2d");

        if (singleLine) {
            const { Text } = CA.Property;
            DynamicDrawText(Text, ctx, Width / 2, Height / 2, { ...config, fontSize: 30 });
        } else {
            const { Text, Text2 } = CA.Property;
            DynamicDrawText(Text, ctx, Width / 2, Height / 2 - 14, config);
            DynamicDrawText(Text2, ctx, Width / 2, Height / 2 + 14, config);
        }

        drawCanvas(TempCanvas, X + 176, Y + 131, AlphaMasks);
        drawCanvasBlink(TempCanvas, X + 176, Y + 131, AlphaMasks);
    }
}

export default function () {
    AssetManager.addAssetWithConfig("ItemDevices", asset, { translation, layerNames, extended, assetStrings });
}

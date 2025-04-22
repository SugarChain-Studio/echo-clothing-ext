import { AssetManager } from "../../assetForward";
import { HookManager } from "@sugarch/bc-mod-hook-manager";
import { DialogTools } from "@mod-utils/Tools";

function scriptDrawHook(data, originalFunction, drawData) {
    originalFunction(drawData);

    const Data = drawData.PersistentData();
    const Properties = drawData.Item.Property || {};
    const FrameTime = Player.GraphicsSettings ? Math.max(30, Player.GraphicsSettings.AnimationQuality * 0.6) : 30;
    const Intensity = typeof Properties.Intensity === "number" ? Properties.Intensity : -1;
    const FuckLength = 32;

    if (typeof Data.FuckChangeTime !== "number") Data.FuckChangeTime = CommonTime() + FrameTime;
    if (typeof Data.DildoState !== "number") Data.DildoState = 0;

    if (Data.FuckChangeTime < CommonTime() && !(Intensity === -1 && FuckLength <= Data.DildoState)) {
        Data.FuckChangeTime = CommonTime() + FrameTime;
        AnimationRequestRefreshRate(drawData.C, FrameTime);
        AnimationRequestDraw(drawData.C);
    }
}

function beforeDraw({ PersistentData, L, Y, Property }) {
    const Data = PersistentData();
    if (typeof Data.DildoState !== "number") Data.DildoState = 0;
    if (typeof Data.Modifier !== "number") Data.Modifier = 1;

    //if (L === "DevicePleasureHolder") return { Y: Y + Data.DildoState };
    if (L !== "触手" && L !== "触手背后") return;

    const Properties = Property || {};
    const Intensity = typeof Properties.Intensity === "number" ? Properties.Intensity : -1;

    const FuckLength = 15;
    const TimeModifier = 0.007;
    const AnimationQualityRatio =
        (Player.GraphicsSettings ? Math.max(Player.GraphicsSettings.AnimationQuality * 0.6, 30) : 30) / 30;
    Data.Speed = (Intensity + 1) * 2;
    if (Data.DildoState >= 1 && Intensity > -1) {
        Data.Modifier = -1;
    } else if (Data.DildoState <= 0) {
        Data.Modifier = 1;
    } else if (Data.DildoState <= 1 && Intensity === -1) {
        Data.Modifier = 1;
        Data.Speed = 1;
    }

    Data.DildoState += Data.Modifier * Data.Speed * AnimationQualityRatio * TimeModifier;
    if (AnimationQualityRatio > FuckLength) Data.DildoState = Math.random();

    return { Y: Y + FuckLength * -Math.cos(Data.DildoState * 2 * Math.PI) };
}

/** @type {CustomAssetDefinition} */
const asset = {
    Name: "触手服_Luzi",
    Random: false,
    Gender: "F",
    Top: 0,
    Left: 0,
    Difficulty: 8,
    AllowLock: true,
    AllowTighten: true,
    DrawLocks: false,
    Prerequisite: ["HasBreasts"],
    DynamicBeforeDraw: true,
    DynamicScriptDraw: true,
    RemoveTime: 5,
    Extended: true,
    Time: 10,
    Layer: [
        {
            AllowTypes: { d: 0 },
            Name: "触手服",
            Priority: 15,
            PoseMapping: { AllFours: "Hide", Hogtied: "Hogtied" },
        },
        {
            AllowTypes: { s: 1 },
            Name: "上衣",
            Priority: 16,
            PoseMapping: { AllFours: "Hide", Hogtied: "Hogtied" },
        },
        {
            AllowTypes: { d: [1, 2] },
            Name: "触手服开",
            Priority: 15,
            PoseMapping: { AllFours: "Hide", Hogtied: "Hogtied" },
        },
        {
            AllowTypes: { m: 1 },
            Name: "触手服嘴套",
            Priority: 15,
            ParentGroup: "ItemHood",
            PoseMapping: { AllFours: PoseType.DEFAULT, Hogtied: PoseType.DEFAULT },
        },
        {
            AllowTypes: { h: [1, 2] },
            ParentGroup: "BodyUpper",
            Name: "触手服手套",
            Priority: 27,
            PoseMapping: {
                AllFours: "Hide",
                Hogtied: "Hide",
                Yoked: "Yoked",
                OverTheHead: "OverTheHead",
                BackCuffs: "BackCuffs",
                BackBoxTie: "BackBoxTie",
                TapedHands: "TapedHands",
                BackElbowTouch: "BackElbowTouch",
            },
        },
        {
            AllowTypes: { f: 1 },
            Name: "触手服脚套",
            Priority: 15,
            ParentGroup: "BodyLower",
            PoseMapping: {
                AllFours: "Hide",
                Hogtied: "Hide",
                Kneel: "Kneel",
                KneelingSpread: "KneelingSpread",
                LegsClosed: "LegsClosed",
                Spread: "Spread",
            },
        },
        {
            ParentGroup: "ItemVulva",
            AllowTypes: { d: 2 },
            Name: "Pussy",
            Priority: 13,
            PoseMapping: { AllFours: "Hide" },
        },
        {
            ParentGroup: "ItemVulva",
            AllowTypes: { d: 2 },
            Name: "PussyMask",
            Priority: 14,
            PoseMapping: { AllFours: "Hide" },
            InheritColor: "BodyLower",
            HideColoring: true,
            ColorSuffix: { HEX_COLOR: "White" },
        },
        {
            Name: "触手",
            Priority: 13,
            AllowTypes: { d: 2 },
            ParentGroup: "ItemVulva",
            PoseMapping: { AllFours: "Hide" },
        },
        {
            Name: "触手背后",
            Priority: 2,
            AllowTypes: { d: 2 },
            ParentGroup: "ItemVulva",
            PoseMapping: { AllFours: "Hide" },
        },
    ],
};

/** @type {ModularItemConfig} */
const extended = {
    Archetype: ExtendedArchetype.MODULAR,
    ChangeWhenLocked: false,
    Modules: [
        {
            Name: "触手状态",
            Key: "d",
            Options: [
                {
                    Property: { Block: ["ItemVulva", "ItemVulvaPiercings", "ItemButt"] },
                },
                {},
                {
                    HasSubscreen: true,
                    Prerequisite: ["AccessVulva", "VulvaEmpty", "AccessButt", "ButtEmpty"],
                    Property: {
                        Effect: [E.VulvaShaft, E.Vibrating, E.IsPlugged],
                        Intensity: 2,
                        Block: ["ItemVulva", "ItemButt"],
                    },
                    ArchetypeConfig: {
                        Archetype: ExtendedArchetype.VIBRATING,
                        ScriptHooks: {
                            ScriptDraw: scriptDrawHook,
                        },
                    },
                },
            ],
        },
        {
            Name: "上衣开关",
            // DrawImages: false,
            Key: "s",
            Options: [{}, {}],
        },
        {
            Name: "手套开关",
            // DrawImages: false,
            Key: "h",
            Options: [
                {},
                {},
                {
                    Property: {
                        Difficulty: 13,
                        SetPose: ["BackElbowTouch"],
                        Effect: [E.Block],
                        Block: ["ItemArms", "ItemHands"],
                    },
                },
            ],
        },
        {
            Name: "嘴套开关",
            Key: "m",
            Options: [
                {},
                {
                    Property: {
                        Effect: [E.BlockMouth, E.GagLight],
                        // 只阻挡最里层的嘴部
                        Block: ["ItemMouth"],
                    },
                },
            ],
        },
        {
            Name: "脚套开关",
            Key: "f",
            Options: [
                {},
                {
                    Property: {
                        Effect: [E.Slow],
                    },
                },
            ],
        },
    ],
};

/** @type {Translation.Dialog} */
const dialogs = DialogTools.replicateGroupedItemDialog(["ItemTorso"], ["触手服_Luzi"], {
    CN: {
        SelectBase: "选择配置",
        Select触手状态: "选择触手状态",
        Select上衣开关: "选择上衣状态",
        Select手套开关: "选择手套状态",
        Select嘴套开关: "选择嘴套状态",
        Select脚套开关: "选择脚套状态",
        Module手套开关: "选择手套状态",
        Module嘴套开关: "选择嘴套状态",
        Module脚套开关: "选择脚套状态",
        Module触手状态: "选择触手状态",
        Module上衣开关: "选择上衣状态",
        Optiond0: "封闭阴部",
        Optiond1: "暴露阴部",
        Optiond2: "触手插入",
        Options0: "上衣隐藏",
        Options1: "上衣显示",
        Optionm0: "嘴套隐藏",
        Optionm1: "嘴套显示",
        Optionh0: "手套隐藏",
        Optionh1: "手套显示",
        Optionh2: "束缚手臂",
        Optionf0: "脚套隐藏",
        Optionf1: "脚套显示",

        Setd0: "TargetCharacterName的触手服下部的小口逐渐合上,粘连在一起.",
        Setd1: "TargetCharacterName的触手服下部裂开一个小口,露出阴部.",
        Setd2: "TargetCharacterName的触手服下部裂开一个小口,露出阴部,触手服下长出一只湿滑的触手插入了阴道.",
        Sets0: "TargetCharacterName的触手服缓慢变化,露出胸部.",
        Sets1: "TargetCharacterName的触手服缓慢变化,生长覆盖了胸部.",
        Seth0: "TargetCharacterName的触手服缓慢变化,露出手臂.",
        Seth1: "TargetCharacterName的触手服缓慢变化,生长覆盖了手部.",
        Seth2: "TargetCharacterName的触手服缓慢变化,强制将手臂束缚在身后.",
        Setf0: "TargetCharacterName的触手服缓慢变化,露出腿部.",
        Setf1: "TargetCharacterName的触手服缓慢变化,生长覆盖了脚部.",
        Setm0: "TargetCharacterName的触手服缓慢变化,露出嘴部.",
        Setm1: "TargetCharacterName的触手服缓慢变化,生长覆盖嘴部.",
    },
    EN: {
        SelectBase: "Select Configuration",
        Select触手状态: "Select Tentacle Status",
        Select上衣开关: "Select Top Status",
        Select手套开关: "Select Glove Status",
        Select嘴套开关: "Select Mouth Cover Status",
        Select脚套开关: "Select Foot Cover Status",
        Module手套开关: "Select Glove Status",
        Module嘴套开关: "Select Mouth Cover Status",
        Module脚套开关: "Select Foot Cover Status",
        Module触手状态: "Select Tentacle Status",
        Module上衣开关: "Select Top Status",
        Optiond0: "Seal Genital Area",
        Optiond1: "Expose Genital Area",
        Optiond2: "Insert Tentacle",
        Options0: "Hide Top",
        Options1: "Display Top",
        Optionm0: "Hide Mouth Cover",
        Optionm1: "Display Mouth Cover",
        Optionh0: "Hide Gloves",
        Optionh1: "Display Gloves",
        Optionh2: "Bind Arms",
        Optionf0: "Hide Foot Covers",
        Optionf1: "Display Foot Covers",

        Setd0: "The lower opening of TargetCharacterName's tentacle suit gradually closes and adheres together.",
        Setd1: "A small opening in the lower part of TargetCharacterName's tentacle suit splits to reveal the genital area.",
        Setd2: "A small opening in the lower part of TargetCharacterName's tentacle suit splits to reveal the genital area, and a slimy tentacle grows out from the suit and inserts into the vagina.",
        Sets0: "The tentacle suit on TargetCharacterName slowly changes, revealing the chest.",
        Sets1: "The tentacle suit on TargetCharacterName slowly changes, growing over the chest.",
        Seth0: "The tentacle suit on TargetCharacterName slowly changes, revealing the arms.",
        Seth1: "The tentacle suit on TargetCharacterName slowly changes, growing over the hands.",
        Seth2: "The tentacle suit on TargetCharacterName slowly changes, forcibly binding the arms behind the back.",
        Setf0: "The tentacle suit on TargetCharacterName slowly changes, revealing the legs.",
        Setf1: "The tentacle suit on TargetCharacterName slowly changes, growing over the feet.",
        Setm0: "The tentacle suit on TargetCharacterName slowly changes, revealing the mouth.",
        Setm1: "The tentacle suit on TargetCharacterName slowly changes, growing over the mouth.",
    },
    UA: {
        SelectBase: "Виберіть конфігурацію костюму",
        Select触手状态: "Статус костюму",
        Select上衣开关: "Статус поверхні костюму",
        Select手套开关: "Статус щупальцевих рукавиць",
        Select嘴套开关: "Статус каверу на рот",
        Select脚套开关: "Статус щупальцевих шкарпеток",
        Module手套开关: "Статус щупальцевих рукавиць",
        Module嘴套开关: "Статус каверу на рот",
        Module脚套开关: "Статус щупальцевих шкарпеток",
        Module触手状态: "Статус щупальцевого костюму",
        Module上衣开关: "Статус поверхні костюму",
        Optiond0: "Защільнити геніталії",
        Optiond1: "Оголити геніталії",
        Optiond2: "Вставити щупальце",
        Options0: "Зняти",
        Options1: "Надіти",
        Optionm0: "Зняти",
        Optionm1: "Надіти",
        Optionh0: "Зняти",
        Optionh1: "Надіти",
        Optionh2: "Зв'язати руки",
        Optionf0: "Зняти",
        Optionf1: "Надіти",

        Setd0: "Нижнє відкриття щупальцевого костюму на тілі TargetCharacterName щільно закривається.",
        Setd1: "Нижня частина щупальцевого костюму на тілі TargetCharacterName потроху відкривається оголюючи PronounPossessive гетіналю.",
        Setd2: "Нижня частина щупальцевого костюму на тілі TargetCharacterName потроху відкривається оголюючи PronounPossessive гетіналю, як потім щупальце зростає позаду носія направляючи свій шлях у вагіну.",
        Sets0: "щупальцевий костюм на тілі TargetCharacterName потроху змінюється, оголюючи груди носія.",
        Sets1: "щупальцевий костюм на тілі TargetCharacterName потроху змінюється, як воно зростає на грудях носія.",
        Seth0: "щупальцевий костюм на тілі TargetCharacterName потроху змінюється, оголюючи руки носія.",
        Seth1: "щупальцевий костюм на тілі TargetCharacterName потроху змінюється, як воно зростає на руках носія покриваючи їх в щупальцевому костюмі.",
        Seth2: "щупальцевий костюм на тілі TargetCharacterName потроху змінюється, як воно зв'язує руки носія за PronounPossessive спиною.",
        Setf0: "щупальцевий костюм на тілі TargetCharacterName потроху змінюється, оголюючи ноги носія.",
        Setf1: "щупальцевий костюм на тілі TargetCharacterName потроху змінюється, як воно зростає на ногах носія покриваючи їх в щупальцевому костюмі.",
        Setm0: "щупальцевий костюм на тілі TargetCharacterName потроху змінюється, оголюючи рот носія.",
        Setm1: "щупальцевий костюм на тілі TargetCharacterName потроху змінюється, як воно зростає на роті носія.",
    },
    RU: {
        SelectBase: "Select Configuration",
        Select触手状态: "Select Tentacle Status",
        Select上衣开关: "Select Top Status",
        Select手套开关: "Select Glove Status",
        Select嘴套开关: "Select Mouth Cover Status",
        Select脚套开关: "Select Foot Cover Status",
        Module手套开关: "Select Glove Status",
        Module嘴套开关: "Select Mouth Cover Status",
        Module脚套开关: "Select Foot Cover Status",
        Module触手状态: "Select Tentacle Status",
        Module上衣开关: "Select Top Status",
        Optiond0: "Seal Genital Area",
        Optiond1: "Expose Genital Area",
        Optiond2: "Insert Tentacle",
        Options0: "Hide Top",
        Options1: "Display Top",
        Optionm0: "Hide Mouth Cover",
        Optionm1: "Display Mouth Cover",
        Optionh0: "Hide Gloves",
        Optionh1: "Display Gloves",
        Optionh2: "Bind Arms",
        Optionf0: "Hide Foot Covers",
        Optionf1: "Display Foot Covers",

        Setd0: "The lower opening of TargetCharacterName's tentacle suit gradually closes and adheres together.",
        Setd1: "A small opening in the lower part of TargetCharacterName's tentacle suit splits to reveal the genital area.",
        Setd2: "A small opening in the lower part of TargetCharacterName's tentacle suit splits to reveal the genital area, and a slimy tentacle grows out from the suit and inserts into the vagina.",
        Sets0: "The tentacle suit on TargetCharacterName slowly changes, revealing the chest.",
        Sets1: "The tentacle suit on TargetCharacterName slowly changes, growing over the chest.",
        Seth0: "The tentacle suit on TargetCharacterName slowly changes, revealing the arms.",
        Seth1: "The tentacle suit on TargetCharacterName slowly changes, growing over the hands.",
        Seth2: "The tentacle suit on TargetCharacterName slowly changes, forcibly binding the arms behind the back.",
        Setf0: "The tentacle suit on TargetCharacterName slowly changes, revealing the legs.",
        Setf1: "The tentacle suit on TargetCharacterName slowly changes, growing over the feet.",
        Setm0: "The tentacle suit on TargetCharacterName slowly changes, revealing the mouth.",
        Setm1: "The tentacle suit on TargetCharacterName slowly changes, growing over the mouth.",
    },
});

const translations = { CN: "触手服", EN: "Tentacle Suit", UA: "Щупальцевий костюм", RU: "Костюм для щупальца" };

export default function () {
    AssetManager.addAsset("ItemTorso", asset, extended, translations);
    AssetManager.addCustomDialog(dialogs);
    // 使用CopyConfig设置后，只需要设置一次
    HookManager.globalFunction("AssetsBeforeDraw", beforeDraw);
    HookManager.globalFunction("AssetsItemTorso2触手服_LuziBeforeDraw", beforeDraw);
}

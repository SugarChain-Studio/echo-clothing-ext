import { AssetManager } from "../../assetForward";
import { Tools } from "@mod-utils/Tools";
import { Typing, PoseMapTool } from "../../lib";
import { luziFixups } from "../../lib/fixups";

/** @type {ExtendedItemScriptHookCallbacks.ScriptDraw<VibratingItemData, {}>} */
function scriptDrawHook(data, originalFunction, drawData) {
    originalFunction(drawData);
    const Data = drawData.PersistentData();
    const Intensity = drawData.Item?.Property?.Intensity;
    if (typeof Intensity === "number" && Intensity >= 0) {
        Tools.drawUpdate(drawData.C, Data);
    }
}

/** @type {RectTuple[]} */
const mask = [
    [240, 400, 6, 118],
    [246, 400, 8, 114],
    [254, 400, 6, 118],
];

/** @type {ExtendedItemScriptHookCallbacks.BeforeDraw<ModularItemData, {}>} */
function beforeDraw(data, originalFunction, { L, Y, Property }) {
    if (L !== "触手" && L !== "触手背后") return;

    /** @type {DynamicBeforeDrawOverrides} */
    const pdata = L === "触手" ? { AlphaMasks: mask } : {};

    const Intensity = Property?.Intensity;
    if (Intensity === undefined || Intensity < 0) return { Y, ...pdata };

    const time = Date.now();
    const freq = [0.2, 0.6, 1.2, 1.8][Intensity] ?? undefined;
    const ratio = freq ? (Math.cos(((time * freq) / 1000) * 2 * Math.PI) + 1) / 2 : 0;
    const dY = Math.round(ratio * 30);
    return { Y: Y + dY, ...pdata };
}

/** @type {CustomAssetDefinition} */
const asset = {
    Name: "触手服-Luzi",
    Random: false,
    Gender: "F",
    Top: 0,
    Left: 0,
    Difficulty: 8,
    AllowLock: true,
    AllowTighten: true,
    DrawLocks: false,
    Prerequisite: ["HasBreasts"],
    RemoveTime: 5,
    Extended: true,
    Time: 10,
    Priority: 15,
    ParentGroup: {},
    Layer: [
        {
            Name: "触手背后",
            CopyLayerColor: "触手",
            Priority: 4,
            Left: 220,
            Top: 470,
            AllowTypes: { d: 2 },
            PoseMapping: PoseMapTool.hideFullBody(),
        },
        {
            Name: "P",
            Priority: 13,
            Left: 240,
            Top: 500,
            AllowColorize: false,
            AllowTypes: { d: 2 },
            PoseMapping: PoseMapTool.hideFullBody(),
        },
        {
            Name: "触手",
            Priority: 13,
            Left: 220,
            Top: 470,
            AllowTypes: { d: 2 },
            PoseMapping: PoseMapTool.hideFullBody(),
        },
        {
            AllowTypes: { d: 0 },
            Name: "触手服",
            ParentGroup: "BodyUpper",
            PoseMapping: PoseMapTool.hideFullBody(),
        },
        {
            AllowTypes: { d: [1, 2] },
            Name: "触手服开",
            CopyLayerColor: "触手服",
            ParentGroup: "BodyUpper",
            PoseMapping: PoseMapTool.hideFullBody(),
        },
        {
            AllowTypes: { f: 1 },
            Name: "触手服脚套",
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
            AllowTypes: { s: 1 },
            Name: "上衣",
            ParentGroup: "BodyUpper",
            PoseMapping: PoseMapTool.hideFullBody(),
        },
        {
            AllowTypes: { h: [1, 2] },
            ParentGroup: "BodyUpper",
            Name: "触手服手套",
            Priority: 27,
            HideForAttribute: Typing.attributes(["LuziLimbTeleDevice"]),
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
            AllowTypes: { m: 1 },
            Name: "触手服嘴套",
            Priority: 35,
            PoseMapping: {},
        },
    ],
};

const layerNames = {
    CN: {
        触手: "插入触手",
        触手服: "触手服",
        触手服手套: "手套",
        触手服嘴套: "嘴套",
        触手服脚套: "脚套",
        上衣: "胸口触手服",
    },
    EN: {
        触手: "Inserting Tentacle",
        触手服: "Suit",
        触手服手套: "Gloves",
        触手服嘴套: "Mouth Cover",
        触手服脚套: "Leggings",
        上衣: "Breast Cover",
    },
};

/** @type {ModularItemConfig} */
const extended = {
    Archetype: ExtendedArchetype.MODULAR,
    ChangeWhenLocked: false,
    ScriptHooks: { BeforeDraw: beforeDraw },
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
                        Effect: [E.VulvaShaft],
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
            Key: "s",
            Options: [{}, {}],
        },
        {
            Name: "手套开关",
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
            Options: [{}, { Property: { Effect: [E.Slow] } }],
        },
    ],
};

/** @type {Translation.Dialog} */
const assetStrings = {
    CN: {
        SelectBase: "选择配置",

        Module手套开关: "手套状态",
        Module嘴套开关: "嘴套状态",
        Module脚套开关: "脚套状态",
        Module触手状态: "触手状态",
        Module上衣开关: "上衣状态",

        Select触手状态: "选择触手状态",
        Select上衣开关: "选择上衣状态",
        Select手套开关: "选择手套状态",
        Select嘴套开关: "选择嘴套状态",
        Select脚套开关: "选择脚套状态",

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
        Module手套开关: "Glove Status",
        Module嘴套开关: "Mouth Cover Status",
        Module脚套开关: "Foot Cover Status",
        Module触手状态: "Tentacle Status",
        Module上衣开关: "Top Status",

        Select触手状态: "Select Tentacle Status",
        Select上衣开关: "Select Top Status",
        Select手套开关: "Select Glove Status",
        Select嘴套开关: "Select Mouth Cover Status",
        Select脚套开关: "Select Foot Cover Status",

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
};

const translation = { CN: "触手服", EN: "Tentacle Suit", UA: "Щупальцевий костюм", RU: "Костюм для щупальца" };

export default function () {
    AssetManager.addAssetWithConfig("ItemTorso", asset, { extended, translation, layerNames, assetStrings });
    luziFixups(["ItemTorso", "ItemTorso2"], asset.Name);
}

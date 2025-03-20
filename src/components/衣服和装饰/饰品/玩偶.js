import { AssetManager } from "../../../assetForward";
import { PathTools } from "@sugarch/bc-mod-utility";
import { DialogTools, Tools } from "@mod-utils/Tools";

/** @type {AssetPoseMapping} */
const specialMapping = {
    TapedHands: "TapedHands",
    Yoked: "TapedHands",
    OverTheHead: "TapedHands",
    BackBoxTie: "TapedHands",
    BackElbowTouch: "TapedHands",
    BackCuffs: "TapedHands",
    Hogtied: "TapedHands",
    AllFours: "TapedHands",
};

/** @type {CustomAssetDefinition} */
const asset = {
    Name: "玩偶_Luzi",
    Random: false,
    Left: 125,
    Top: 225,
    ParentGroup: {},
    Priority: 50,
    PoseMapping: {},
    Layer: [
        // 玩具店
        { Name: "Saki", AllowTypes: { d: 1 } },
        { Name: "Luzi", AllowTypes: { d: 2 } },
        { Name: "若若", AllowTypes: { d: 3 } },
        { Name: "Lamia", AllowTypes: { d: 4 } },

        // 狼窝
        { Name: "Xin", AllowTypes: { s: 1 } },
        { Name: "吉娜", AllowTypes: { s: 2 } },
        { Name: "Ada", AllowTypes: { s: 3 } },
        { Name: "Luzi2", AllowTypes: { s: 4 } },
        { Name: "Reisigure", AllowTypes: { s: 5 } },
        { Name: "Atlantis", AllowTypes: { s: 6 } },

        // 芷窝
        {
            Name: "芷童",
            PoseMapping: specialMapping,
            AllowTypes: { z: 1 },
        },
        { Name: "Gin", AllowTypes: { z: 2 } },
        { Name: "Echo", AllowTypes: { z: 3 } },
        { Name: "ᐛ", AllowTypes: { z: 4 } },
        { Name: "ᐖ", AllowTypes: { z: 5 } },
        { Name: "芙缇娅", AllowTypes: { z: 6 } },
        { Name: "芷小童", AllowTypes: { z: 7 } },
        { Name: "临", AllowTypes: { z: 8 } },
        { Name: "小安", AllowTypes: { z: 9 } },
        { Name: "Suki", AllowTypes: { z: 10 } },
        { Name: "haru", AllowTypes: { z: 11 } },
        { Name: "兔叽", AllowTypes: { z: 12 } },

        // Catnest
        { Name: "XinLian", AllowTypes: { c: 1 } },
        { Name: "Zheiyun", AllowTypes: { c: 2 } },
        { Name: "Cyäegha", AllowTypes: { c: 3 } },
        { Name: "PumpkinPie", AllowTypes: { c: 4 } },
        { Name: "Lux", AllowTypes: { c: 5 } },
        { Name: "Caius", AllowTypes: { c: 6 } },
        { Name: "Neko", AllowTypes: { c: 7 } },
        { Name: "居x", AllowTypes: { c: 8 } },

        // 猫州猫庭府玩偶
        { Name: "Axa", AllowTypes: { f: 1 } },
        { Name: "Shirayuki", AllowTypes: { f: 2 } },
        { Name: "Nail", AllowTypes: { f: 3 } },
        { Name: "Nekonya蓝", AllowTypes: { f: 4 } },
        { Name: "小果", AllowTypes: { f: 5 } },

        // 小夜家玩偶
        { Name: "向归夜", AllowTypes: { y: 1 } },
        { Name: "圣光光", AllowTypes: { y: 2 } },
        { Name: "娜娜", AllowTypes: { y: 3 } },
        { Name: "彤酱", AllowTypes: { y: 4 } },
        { Name: "璃心", AllowTypes: { y: 5 } },
        { Name: "雫", AllowTypes: { y: 6 } },
        { Name: "小狼", AllowTypes: { y: 7 } },
        { Name: "小果", AllowTypes: { y: 8 } },
        { Name: "茗子", AllowTypes: { y: 9 } },
        { Name: "时光光", AllowTypes: { y: 10 } },
        { Name: "xxxx", AllowTypes: { y: 11 } },
        { Name: "果子狸", AllowTypes: { y: 12 } },
        { Name: "雪瑗", AllowTypes: { y: 13 } },
        { Name: "fu狸", AllowTypes: { y: 14 } },

        // 盒子的小黑屋
        { Name: "葡萄果汁盒", AllowTypes: { hz: 1 } },
        { Name: "时雨Tokiame", AllowTypes: { hz: 2 } },
        { Name: "殇梦溪", AllowTypes: { hz: 3 } },
        { Name: "Neko2", AllowTypes: { hz: 4 } },
        { Name: "mizuki池", AllowTypes: { hz: 5 } },
        { Name: "莉娅", AllowTypes: { hz: 6 } },
        { Name: "艾尔", AllowTypes: { hz: 7 } },

        // 吸血鬼城堡
        {
            Name: "岚岚",
            PoseMapping: specialMapping,
            AllowTypes: { x: 1 },
        },
        { Name: "欧佩娜", AllowTypes: { x: 2 } },
        { Name: "艾欧娜", AllowTypes: { x: 3 } },
        { Name: "柚子", AllowTypes: { x: 4 } },
        { Name: "梨子", AllowTypes: { x: 5 } },
        { Name: "Lyndis琳", AllowTypes: { x: 6 } },
        { Name: "黛烟", AllowTypes: { x: 7 } },

        // 笠花和An'an的家
        { Name: "笠花", AllowTypes: { lihua: 1 } },
        { Name: "Anan", AllowTypes: { lihua: 2 } },
        { Name: "雨笠银花", AllowTypes: { lihua: 3 } },
        { Name: "dudu", AllowTypes: { lihua: 4 } },
        { Name: "卜卜", AllowTypes: { lihua: 5 } },

        // 鸢堡
        { Name: "鸢", AllowTypes: { yb: 1 } },
        { Name: "ZforShort", AllowTypes: { yb: 2 } },
        { Name: "luobo", AllowTypes: { yb: 3 } },

        // 路过的玩偶
        { Name: "li", AllowTypes: { l: 1 } },
        { Name: "YouXiang", AllowTypes: { l: 2 } },
        { Name: "Lilian", AllowTypes: { l: 3 } },
        { Name: "泠雨", AllowTypes: { l: 4 } },
        { Name: "墨芸", AllowTypes: { l: 5 } },
        {
            Name: "Poi",
            PoseMapping: specialMapping,
            AllowTypes: { l: 6 },
        },
        { Name: "Pokemon", AllowTypes: { l: 7 } },
        { Name: "Clara", AllowTypes: { l: 8 } },
        { Name: "WallyIlma", AllowTypes: { l: 9 } },
        { Name: "奈芙塔莉", AllowTypes: { l: 10 } },
        { Name: "瑞饼", AllowTypes: { l: 11 } },
        { Name: "Annie", AllowTypes: { l: 12 } },
        { Name: "accoo", AllowTypes: { l: 13 } },
        { Name: "疾风", AllowTypes: { l: 14 } },
        { Name: "Eleanor", AllowTypes: { l: 15 } },
        { Name: "小铃铛", AllowTypes: { l: 16 } },
        { Name: "莉莉丝", AllowTypes: { l: 17 } },
        { Name: "LaBi", AllowTypes: { l: 18 } },
        { Name: "忧绪", AllowTypes: { l: 19 } },
        {
            Name: "澈羽枫灵",
            PoseMapping: specialMapping,
            AllowTypes: { l: 20 },
        },
        { Name: "五十提", AllowTypes: { l: 21 } },
        { Name: "Shika", AllowTypes: { l: 22 } },
        { Name: "依伊可", AllowTypes: { l: 23 } },
        { Name: "白墨鴝", AllowTypes: { l: 24 } },
        { Name: "希雅", AllowTypes: { l: 25 } },
        { Name: "墨璃", AllowTypes: { l: 26 } },
        { Name: "铃奈", AllowTypes: { l: 27 } },
    ],
};

const typeNames = {
    d: "玩具店玩偶",
    s: "狼窝玩偶",
    z: "芷窝玩偶",
    c: "Catnest玩偶",
    f: "猫州猫庭府玩偶",
    y: "小夜家玩偶",
    hz: "盒子的小黑屋玩偶",
    x: "吸血鬼城堡",
    lihua: "笠花和An'an的家",
    yb: "鸢堡",
    l: "路过的玩偶",
};

const translations = { CN: "玩偶", EN: "Plushies" };

/** @type {Translation.Dialog} */
const predefDialog = {
    CN: {
        ItemMisc玩偶_LuziOptionhz4: "Neko",
        ItemMisc玩偶_LuziOptionlihua2: "An'an",

        ItemMisc玩偶_LuziSetd2: "SourceCharacter给了DestinationCharacter一只笨蛋的Luzi玩偶.",
        ItemMisc玩偶_LuziSets3: "SourceCharacter给了DestinationCharacter一只笨蛋的Luzi玩偶.",
        ItemMisc玩偶_LuziSetc3: "SourceCharacter给了DestinationCharacter一只超厉害超威严bc第一的Cyäegha大人的眼线!",
        ItemMisc玩偶_LuziSetc4: "SourceCharacter给了DestinationCharacter一只超色气的PumpkinPie样子的玩偶.",
        ItemMisc玩偶_LuziSetx1:
            "SourceCharacter给了DestinationCharacter一只城堡真正的主人, 伟大! 优雅! 的吸血鬼始祖岚岚大人样子的玩偶.",
        ItemMisc玩偶_LuziSetl23:
            "SourceCharacter给了DestinationCharacter一只每天都在逛该踹门摸头, QQ乃乃好看到咩噗美少女依伊可.",
    },
};

// 下面是根据上面的内容，生成描述的代码
// 也就是说，不用手动写描述文字啦，只用写上面的内容就行

// 图层不允许调色
asset.Layer.forEach((layer) => {
    layer.AllowColorize = false;
});

// 生成模块定义
/** @type {ModularItemModuleConfig []} */
const modules = /** @type {AssetLayerDefinition[]}*/ (asset.Layer).reduce((pv, cv) => {
    const Key = Object.keys(cv.AllowTypes)[0];
    const Name = typeNames[Key];
    const module = pv.find((m) => m.Name === Name);
    if (!module) {
        pv.push({
            Name,
            DrawImages: true,
            Key,
            Options: [{}, {}],
        });
    } else {
        module.Options.push({});
    }
    return pv;
}, /** @type {ModularItemModuleConfig[]} */ ([]));

/** @type { Record<keyof typeof typeNames, string[]> } */
const typedLayerNames = /** @type {AssetLayerDefinition[]}*/ (asset.Layer).reduce((pv, cv) => {
    const [k] = Object.entries(cv.AllowTypes)[0];
    if (!pv[k]) pv[k] = [""];
    pv[k].push(cv.Name);
    return pv;
}, /** @type { Record<keyof typeof typeNames, string[]> } */ ({}));

modules.forEach((m) => {
    m.DrawData = {
        elementData: m.Options.map((opt, idx) => {
            if (idx === 0) return { imagePath: PathTools.emptyImage };
            return {
                imagePath: `Assets/Female3DCG/ItemMisc/玩偶_Luzi_${typedLayerNames[m.Key][idx]}.png`,
            };
        }),
    };
});

/** @type {ExtendedItemScriptHookCallbacks.ScriptDraw<ModularItemData, {lastType:string}>} */
function scriptDraw(mdata, originalFunction, { C, Item, PersistentData }) {
    const data = PersistentData();
    const typeRecord = Item.Property?.TypeRecord || {};

    let needUpdate = false;
    const activeType = Object.entries(typeRecord).find(([k, v]) => !!v && k !== data.lastType);
    if (activeType) {
        data.lastType = activeType[0];
        for (const k in typeRecord) {
            if (k !== data.lastType) typeRecord[k] = 0;
        }
        needUpdate = true;
    }

    if (needUpdate) {
        if (C.IsPlayer()) ChatRoomCharacterItemUpdate(C, Item.Asset.Group.Name);
        CharacterRefresh(C, false);
    }
}

/** @type {ModularItemConfig} */
const extended = {
    Archetype: ExtendedArchetype.MODULAR,
    ChangeWhenLocked: false,
    Modules: modules,
    DrawImages: false,
    DrawData: Tools.makeButtonGroup(modules.length),
    ScriptHooks: {
        ScriptDraw: scriptDraw,
    },
};

const layerNames = /** @type {AssetLayerDefinition[]}*/ (asset.Layer).reduce((pv, cv) => {
    const [k, v] = Object.entries(cv.AllowTypes)[0];
    pv[`${typeNames[k]}${v}`] = cv.Name;
    return pv;
}, /** @type { Record<string,string> } */ ({}));

const cnDialog = DialogTools.dialogGenerator(
    modules,
    {
        groups: ["ItemMisc"],
        itemNames: ["玩偶_Luzi"],
        selectBase: "选择玩偶房间",
        module: ({ Name }) => ({ Select: `选择${Name}`, Module: `${Name}` }),
        option: (option, optionIndex, { Name }) => {
            const layerName = layerNames[`${Name}${optionIndex}`];
            if (!layerName) return { Option: "空", Set: "SourceCharacter移除了DestinationCharacter手上的玩偶." };
            return {
                Option: `${layerName}`,
                Set: `SourceCharacter给DestinationCharacter一个可爱的${layerName}玩偶.`,
            };
        },
    },
    predefDialog.CN || {}
);

const enDialog = DialogTools.dialogGenerator(
    modules,
    {
        groups: ["ItemMisc"],
        itemNames: ["玩偶_Luzi"],
        selectBase: "Select Plushies Room",
        module: ({ Name }) => ({ Select: `Select ${Name}`, Module: `${Name}` }),
        option: (option, optionIndex, { Name }) => {
            const layerName = layerNames[`${Name}${optionIndex}`];
            if (!layerName)
                return { Option: "Empty", Set: "SourceCharacter removes the doll from DestinationCharacter hand." };
            return {
                Option: `${layerName}`,
                Set: `SourceCharacter gives DestinationCharacter a cute ${layerName} doll.`,
            };
        },
    },
    predefDialog.EN || {}
);

const ruDialog = DialogTools.dialogGenerator(
    modules,
    {
        groups: ["ItemMisc"],
        itemNames: ["玩偶_Luzi"],
        selectBase: "Выбрать комнату с куклами",
        module: ({ Name }) => ({ Select: `Выбрать ${Name}`, Module: `${Name}` }),
        option: (option, optionIndex, { Name }) => {
            const layerName = layerNames[`${Name}${optionIndex}`];
            if (!layerName)
                return { Option: "Пусто", Set: "SourceCharacter удаляет куклу из руки DestinationCharacter." };
            return {
                Option: `${layerName}`,
                Set: `SourceCharacter дает DestinationCharacter милую куклу ${layerName}.`,
            };
        },
    },
    predefDialog.RU || {}
);

/** @type {Translation.Dialog} */
const dialogs = {
    CN: cnDialog,
    EN: enDialog,
    RU: ruDialog,
};

export default function () {
    AssetManager.addAsset("ItemMisc", asset, extended, translations);
    AssetManager.addCustomDialog(dialogs);
}

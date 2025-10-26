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
    DynamicGroupName: "ItemMisc",
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
        {
            Name: "xin2",
            PoseMapping: specialMapping,
            AllowTypes: { s: 5 },
        },

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
        { Name: "Lux", AllowTypes: { z: 13 } },

        // Catnest
        { Name: "XinLian", AllowTypes: { c: 1 } },
        { Name: "Zheiyun", AllowTypes: { c: 2 } },
        { Name: "Cyäegha", AllowTypes: { c: 3 } },
        { Name: "PumpkinPie", AllowTypes: { c: 4 } },
        { Name: "Caius", AllowTypes: { c: 5 } },
        { Name: "Neko", AllowTypes: { c: 6 } },
        { Name: "居x", AllowTypes: { c: 7 } },
        { Name: "vaner", AllowTypes: { c: 8 } },

        // 猫州猫庭府玩偶
        { Name: "Axa", AllowTypes: { f: 1 } },
        { Name: "Shirayuki", AllowTypes: { f: 2 } },
        { Name: "Nail", AllowTypes: { f: 3 } },
        { Name: "Nekonya蓝", AllowTypes: { f: 4 } },
        { Name: "小果", AllowTypes: { f: 5 } },
        { Name: "埃菲尔徳", AllowTypes: { f: 6 } },
        { Name: "小寒", AllowTypes: { f: 7 } },

        // 小夜家玩偶
        { Name: "向归夜", AllowTypes: { y: 1 } },
        { Name: "圣光光", AllowTypes: { y: 2 } },
        { Name: "娜娜", AllowTypes: { y: 3 } },
        { Name: "彤酱", AllowTypes: { y: 4 } },
        { Name: "璃心", AllowTypes: { y: 5 } },
        { Name: "雫", AllowTypes: { y: 6 } },
        { Name: "小狼", AllowTypes: { y: 7 } },
        { Name: "小果", AllowTypes: { y: 8 } },
        { Name: "时光光", AllowTypes: { y: 9 } },
        { Name: "xxxx", AllowTypes: { y: 10 } },
        { Name: "果子狸", AllowTypes: { y: 11 } },
        { Name: "雪瑗", AllowTypes: { y: 12 } },
        { Name: "xiu狸子", AllowTypes: { y: 13 } },
        { Name: "布菈", AllowTypes: { y: 14 } },

        // 盒子的小黑屋
        { Name: "葡萄果汁盒", AllowTypes: { hz: 1 } },
        { Name: "时雨Tokiame", AllowTypes: { hz: 2 } },
        { Name: "殇梦溪", AllowTypes: { hz: 3 } },
        { Name: "Neko2", AllowTypes: { hz: 4 } },
        { Name: "mizuki池", AllowTypes: { hz: 5 } },
        { Name: "莉娅", AllowTypes: { hz: 6 } },
        { Name: "艾尔", AllowTypes: { hz: 7 } },
        { Name: "小火火", AllowTypes: { hz: 8 } },
        { Name: "梦语诗", AllowTypes: { hz: 9 } },
        { Name: "巧巧", AllowTypes: { hz: 10 } },

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
        { Name: "秋巧", AllowTypes: { lihua: 6 } },

        // 鸢堡
        { Name: "鸢", AllowTypes: { yb: 1 } },
        { Name: "梓析", AllowTypes: { yb: 2 } },
        { Name: "梓䒩", AllowTypes: { yb: 3 } },
        { Name: "梓姌", AllowTypes: { yb: 4 } },
        { Name: "梓璇", AllowTypes: { yb: 5 } },
        { Name: "梓爱", AllowTypes: { yb: 6 } },
        { Name: "呐呐梓", AllowTypes: { yb: 7 } },
        { Name: "梓咪", AllowTypes: { yb: 8 } },
        { Name: "馅饼梓", AllowTypes: { yb: 9 } },
        { Name: "梓棂", AllowTypes: { yb: 10 } },
        { Name: "ZforShort", AllowTypes: { yb: 11 } },
        { Name: "小a", AllowTypes: { yb: 12 } },
        { Name: "透透子", AllowTypes: { yb: 13 } },
        { Name: "luobo", AllowTypes: { yb: 14 } },

        // EILRSW
        { Name: "Pasimia", AllowTypes: { EILRSW: 1 } },
        { Name: "Alasade", AllowTypes: { EILRSW: 2 } },
        { Name: "Lyudmila", AllowTypes: { EILRSW: 3 } },
        { Name: "Emeia", AllowTypes: { EILRSW: 4 } },
        { Name: "希雅", AllowTypes: { EILRSW: 5 } },
        { Name: "酥酥", AllowTypes: { EILRSW: 6 } },
        { Name: "茗子", AllowTypes: { EILRSW: 7 } },
        { Name: "Kemera", AllowTypes: { EILRSW: 8 } },
        { Name: "viimi", AllowTypes: { EILRSW: 9 } },

        // 伊友玩偶
        { Name: "伊斯特", AllowTypes: { yytc: 1 } },
        { Name: "Pekora-Kino", AllowTypes: { yytc: 2 } },
        { Name: "幽灵", AllowTypes: { yytc: 3 } },
        { Name: "希尔薇娅", AllowTypes: { yytc: 4 } },
        { Name: "小沫", AllowTypes: { yytc: 5 } },
        { Name: "Sive", AllowTypes: { l: 43 } },
        { Name: "40", AllowTypes: { yytc: 7 } },
        { Name: "焦糖", AllowTypes: { yytc: 8 } },
        { Name: "早紀", AllowTypes: { yytc: 9 } },
        { Name: "rin", AllowTypes: { yytc: 10 } },
        { Name: "w", AllowTypes: { yytc: 11 } },
        { Name: "OwQ", AllowTypes: { yytc: 12 } },
        { Name: "绛翎", AllowTypes: { yytc: 13 } },
        { Name: "玖儿", AllowTypes: { yytc: 14 } },
        { Name: "白澜諪", AllowTypes: { yytc: 15 } },

        // 香喷喷酒吧
        { Name: "依伊可", AllowTypes: { xppjb: 1 } },
        { Name: "yumi", AllowTypes: { xppjb: 2 } },
        { Name: "白墨鴝", AllowTypes: { xppjb: 3 } },
        { Name: "忧绪", AllowTypes: { xppjb: 4 } },
        { Name: "五十提", AllowTypes: { xppjb: 5 } },
        { Name: "狸nux", AllowTypes: { xppjb: 6 } },
        { Name: "依", AllowTypes: { xppjb: 7 } },
        { Name: "珥九", AllowTypes: { xppjb: 8 } },
        { Name: "暴狸龙", AllowTypes: { xppjb: 9 } },
        { Name: "Fu狸", AllowTypes: { xppjb: 10 } },
        { Name: "依依", AllowTypes: { xppjb: 11 } },
        { Name: "wallyilma2", AllowTypes: { xppjb: 12 } },
        { Name: "Shadow", AllowTypes: { xppjb: 13 } },

        // 失乐园 sly
        // { Name: "Reisigure", AllowTypes: { sly: 1 } },
        // { Name: "Atlantis", AllowTypes: { sly: 2 } },
        // {
        //     Name: "澈羽枫灵",
        //     PoseMapping: specialMapping,
        //     AllowTypes: { sly: 3 },
        // },
        // { Name: "ReiSigureA", AllowTypes: { sly: 4 } },
        // { Name: "ReiSigureAE", AllowTypes: { sly: 5 } },
        // { Name: "ReiSigureEX", AllowTypes: { sly: 6 } },

        // Lilian的大杂烩
        { Name: "Lilian", AllowTypes: { lilian: 1 } },
        {
            Name: "幽",
            PoseMapping: specialMapping,
            AllowTypes: { lilian: 2 },
        },
        { Name: "墨璃", AllowTypes: { lilian: 3 } },
        { Name: "Linnn", AllowTypes: { lilian: 4 } },
        { Name: "天使Linnn", AllowTypes: { lilian: 5 } },
        { Name: "兔战Linnn", AllowTypes: { lilian: 6 } },

        // 莉柯莉絲家與她的朋友
        { Name: "莉柯莉絲1", AllowTypes: { lkls: 1 } },
        { Name: "莉柯莉絲2", AllowTypes: { lkls: 2 } },
        { Name: "六月", AllowTypes: { lkls: 3 } },
        { Name: "晓璃", AllowTypes: { lkls: 4 } },
        { Name: "約爾", AllowTypes: { lkls: 5 } },
        { Name: "mai", AllowTypes: { lkls: 6 } },
        { Name: "kiseki", AllowTypes: { lkls: 7 } },
        { Name: "madoka", AllowTypes: { lkls: 8 } },
        { Name: "mamotta", AllowTypes: { lkls: 9 } },
        { Name: "sunny", AllowTypes: { lkls: 10 } },
        { Name: "marina", AllowTypes: { lkls: 11 } },
        { Name: "橙汁", AllowTypes: { lkls: 12 } },
        { Name: "Cynthiaa", AllowTypes: { lkls: 13 } },
        { Name: "MIZU", AllowTypes: { lkls: 14 } },
        { Name: "暖海", AllowTypes: { lkls: 15 } },

        // Celestial Enchants
        { Name: "Celiko", AllowTypes: { ce: 1 } },
        { Name: "Lavender", AllowTypes: { ce: 2 } },
        { Name: "Siscuit", AllowTypes: { ce: 3 } },
        { Name: "Sabie", AllowTypes: { ce: 4 } },

        // Den of Sin
        { Name: "Sin", AllowTypes: { ds: 1 } },
        { Name: "Cassandra Lee", AllowTypes: { ds: 2 } },
        { Name: "Gangriel", AllowTypes: { ds: 3 } },
        { Name: "Roslin", AllowTypes: { ds: 4 } },
        { Name: "Rika", AllowTypes: { ds: 5 } },

        // Latex Lab
        { Name: "XDress", AllowTypes: { ll: 1 } },
        { Name: "Khloe", AllowTypes: { ll: 2 } },
        { Name: "Aeri", AllowTypes: { ll: 3 } },
        { Name: "Lillian", AllowTypes: { ll: 4 } },
        { Name: "Minerva", AllowTypes: { ll: 5 } },
        { Name: "delta", AllowTypes: { ll: 6 } },
        { Name: "Nabi", AllowTypes: { ll: 7 } },

        // 月见里的海边
        { Name: "蝶灵忧凪", AllowTypes: { hb: 1 } },
        { Name: "蛇灵忧凪", AllowTypes: { hb: 2 } },
        { Name: "忧咲", AllowTypes: { hb: 3 } },
        { Name: "红熙", AllowTypes: { hb: 4 } },

        // 自恋柴的衣橱
        { Name: "柴柴1", AllowTypes: { cai: 1 } },
        { Name: "柴柴2", AllowTypes: { cai: 2 } },
        { Name: "柴柴3", AllowTypes: { cai: 3 } },
        { Name: "柴柴4", AllowTypes: { cai: 4 } },
        { Name: "柴柴5", AllowTypes: { cai: 5 } },
        { Name: "柴柴6", AllowTypes: { cai: 6 } },
        { Name: "柴柴7", AllowTypes: { cai: 7 } },

        // nest
        { Name: "Dango", AllowTypes: { nest: 1 } },
        { Name: "狼狼虫", AllowTypes: { nest: 2 } },
        { Name: "喵头嘤", AllowTypes: { nest: 3 } },
        { Name: "喵头嘤2", AllowTypes: { nest: 4 } },
        { Name: "lunara", AllowTypes: { nest: 5 } },
        { Name: "Kitty", AllowTypes: { nest: 6 } },
        { Name: "柴柴", AllowTypes: { nest: 7 } },
        { Name: "UMI", AllowTypes: { nest: 8 } },
        { Name: "姜海琳", AllowTypes: { nest: 9 } },
        { Name: "姜海琳1", AllowTypes: { nest: 10 } },
        { Name: "姜海琳2", AllowTypes: { nest: 11 } },
        { Name: "辛西婭1", AllowTypes: { nest: 12 } },
        { Name: "辛西婭2", AllowTypes: { nest: 13 } },
        { Name: "優米", AllowTypes: { nest: 14 } },
        { Name: "Lana", AllowTypes: { nest: 15 } },
        { Name: "枳", AllowTypes: { nest: 16 } },
        { Name: "Arco", AllowTypes: { nest: 17 } },
        { Name: "Rinko", AllowTypes: { nest: 18 } },

        // Foxys Fun Experience
        { Name: "Gab", AllowTypes: { ffe: 1 } },
        { Name: "Seb", AllowTypes: { ffe: 2 } },
        { Name: "Ryoko", AllowTypes: { ffe: 3 } },

        // 1563
        { Name: "月月", AllowTypes: { pen: 1 } },
        { Name: "晓雾", AllowTypes: { pen: 2 } },
        { Name: "Penelope", AllowTypes: { pen: 3 } },

        // 鸭鸭窝
        { Name: "Sunny2", AllowTypes: { yyw: 1 } },
        { Name: "月诺诺", AllowTypes: { yyw: 2 } },

        // Gugugaga
        { Name: "白木", AllowTypes: { gggg: 1 } },
        { Name: "KocO", AllowTypes: { gggg: 2 } },
        { Name: "N", AllowTypes: { gggg: 3 } },

        // 路过的玩偶
        { Name: "li", AllowTypes: { l: 1 } },
        { Name: "YouXiang", AllowTypes: { l: 2 } },
        { Name: "泠雨", AllowTypes: { l: 3 } },
        { Name: "墨芸", AllowTypes: { l: 4 } },
        {
            Name: "Poi",
            PoseMapping: specialMapping,
            AllowTypes: { l: 5 },
        },
        { Name: "Pokemon", AllowTypes: { l: 6 } },
        { Name: "Clara", AllowTypes: { l: 7 } },
        { Name: "WallyIlma", AllowTypes: { l: 8 } },
        { Name: "奈芙塔莉", AllowTypes: { l: 9 } },
        { Name: "瑞饼", AllowTypes: { l: 10 } },
        { Name: "Annie", AllowTypes: { l: 11 } },
        { Name: "accoo", AllowTypes: { l: 12 } },
        { Name: "疾风", AllowTypes: { l: 13 } },
        { Name: "Eleanor", AllowTypes: { l: 14 } },
        { Name: "小铃铛", AllowTypes: { l: 15 } },
        { Name: "莉莉丝", AllowTypes: { l: 16 } },
        { Name: "LaBi", AllowTypes: { l: 17 } },
        { Name: "Shika", AllowTypes: { l: 18 } },
        { Name: "铃奈", AllowTypes: { l: 19 } },
        { Name: "小雨", AllowTypes: { l: 20 } },
        { Name: "清酒梓", AllowTypes: { l: 21 } },
        { Name: "忧绪bride", AllowTypes: { l: 22 } },
        { Name: "曦芙bride", AllowTypes: { l: 23 } },
        { Name: "小夏", AllowTypes: { l: 24 } },
        { Name: "玩偶师", AllowTypes: { l: 25 } },
        { Name: "触手姬", AllowTypes: { l: 26 } },
        { Name: "雪琪", AllowTypes: { l: 27 } },
        { Name: "溜溜猫", AllowTypes: { l: 28 } },
        { Name: "芋圆", AllowTypes: { l: 29 } },
        { Name: "月", AllowTypes: { l: 30 } },
        { Name: "er", AllowTypes: { l: 31 } },
        {
            Name: "Personas",
            PoseMapping: specialMapping,
            AllowTypes: { l: 32 },
        },
        { Name: "Soph", AllowTypes: { l: 33 } },
        { Name: "羽", AllowTypes: { l: 34 } },
        { Name: "Milim", AllowTypes: { l: 35 } },
        { Name: "爱丽丝梦游仙境", AllowTypes: { l: 36 } },
        { Name: "希尔薇娅", AllowTypes: { l: 37 } },
        { Name: "云喵", AllowTypes: { l: 38 } },
        { Name: "诺瑞莉卡", AllowTypes: { l: 39 } },
        { Name: "Kiki", AllowTypes: { l: 40 } },
        { Name: "YL", AllowTypes: { l: 41 } },
        { Name: "殘楓", AllowTypes: { l: 42 } },
        { Name: "幽玉", AllowTypes: { l: 43 } },
    ],
};

/** @type {Record<string, TypeNameEntry | FullAndShort>} */
const typeNameNext = {
    d: { Short: { CN: "玩具店", EN: "Night at Saotome" }, Full: { CN: "早乙女的玩具店", EN: "Night at Saotome" } },
    s: "狼窝",
    z: { CN: "芷窝", EN: "Mie" },
    c: "Catnest",
    f: { CN: "猫州猫庭府", EN: "Nekopara" },
    y: { CN: "小夜家", EN: "Home of Saya" },
    hz: { CN: "盒子的小黑屋", EN: "xiaoheiwu" },
    x: { CN: "吸血鬼城堡", EN: "Vampire Castle" },
    lihua: { CN: "笠花和An'an的家", EN: "Kasaki's room" },
    yb: "鸢堡",
    EILRSW: "EILRSW",
    yytc: { CN: "伊友", EN: "Friends of Yi" },
    xppjb: { CN: "香喷喷酒吧", EN: "xiangpenpen" },
    // sly: { CN: "失乐园", EN: "Paradise Lost" },
    ffe: { Short: "FFE", Full: "Foxys Fun Experience" },
    lilian: { CN: "Lilian的大杂烩", EN: "Lilian Home" },
    lkls: { CN: "莉柯莉絲家與她的朋友", EN: "Licolis" },
    ce: "Celestial Enchants",
    ds: "Den of Sin",
    ll: "Latex Lab",
    hb: "月见里的海边",
    cai: "柴坊",
    nest: "Nest",
    pen: "1563",
    yyw: "鸭鸭窝",
    gggg: "Gugugaga",
    l: { CN: "(路过的玩偶)", EN: "(Wanderers)" },
};

const translation = { CN: "玩偶", EN: "Plushies" };

/** @type {Translation.Dialog} */
const predefDialog = {
    CN: {
        Optionhz4: "Neko",
        Optionlihua2: "An'an",

        Optionxppjb13: "Shadow γ",

        Optioncai1: "柴",
        Optioncai2: "柴²",
        Optioncai3: "柴³",
        Optioncai4: "柴⁴",
        Optioncai5: "柴⁵",
        Optioncai6: "柴⁶",
        Optioncai7: "柴⁷",

        Setd2: "SourceCharacter给了DestinationCharacter一只笨蛋的Luzi玩偶.",
        Sets4: "SourceCharacter给了DestinationCharacter一只笨蛋的Luzi玩偶.",
        Setc3: "SourceCharacter给了DestinationCharacter一只超厉害超威严bc第一的Cyäegha大人的眼线!",
        Setc4: "SourceCharacter给了DestinationCharacter一只超色气的PumpkinPie样子的玩偶.",
        Setx1: "SourceCharacter给了DestinationCharacter一只城堡真正的主人, 伟大! 优雅! 的吸血鬼始祖岚岚大人样子的玩偶.",
        Setxppjb1: "SourceCharacter给了DestinationCharacter一只每天都在逛该踹门摸头, QQ乃乃好看到咩噗美少女依伊可.",
        Setxppjb7: "SourceCharacter给了DestinationCharacter一只上得厅堂下得厨房能文能武优雅高贵从不白给超绝美少女依!",
        Setxppjb11: "天空一声巨响！依依玩偶闪亮登场！缓缓落在了DestinationCharacter怀里.",
        Setf1: "SourceCharacter给了DestinationCharacter一只会吸血的Axa玩偶.",
        Setf6: "SourceCharacter给了DestinationCharacter一只热气腾腾的埃菲尔徳玩偶.",
    },
};

// 下面是根据上面的内容，生成描述的代码
// 也就是说，不用手动写描述文字啦，只用写上面的内容就行

/**
 * @typedef {Translation.Entry | string} TypeNameEntry
 */

/**
 * @typedef {object} FullAndShort
 * @property {TypeNameEntry} Full
 * @property {TypeNameEntry} Short
 */

/**
 * @param {TypeNameEntry | FullAndShort} obj
 * @returns {obj is TypeNameEntry}
 */
function isTypeNameEntry(obj) {
    return typeof obj === "string" || !("Full" in obj && "Short" in obj);
}

/**
 *
 * @param {TypeNameEntry} obj
 * @param {ServerChatRoomLanguage} lang
 */
function resolveTypeName(obj, lang) {
    if (typeof obj === "string") return obj;
    return obj[lang] || obj.CN || obj.EN || "";
}

/**
 * @param { TypeNameEntry | FullAndShort} obj
 * @param {ServerChatRoomLanguage} lang
 */
function takeFullName(obj, lang) {
    return isTypeNameEntry(obj) ? resolveTypeName(obj, lang) : resolveTypeName(obj.Full, lang);
}

/**
 * @param { TypeNameEntry | FullAndShort} obj
 * @param {ServerChatRoomLanguage} lang
 */
function takeShortName(obj, lang) {
    return isTypeNameEntry(obj) ? resolveTypeName(obj, lang) : resolveTypeName(obj.Short, lang);
}

// 图层不允许调色
asset.Layer.forEach((layer) => {
    layer.AllowColorize = false;
});

const enabledModulesKey = new Set(asset.Layer.map((layer) => Object.keys(layer.AllowTypes)[0]));

const optionCount = asset.Layer.reduce((pv, cv) => {
    const Key = Object.keys(cv.AllowTypes)[0];
    pv[Key] = Math.max(pv[Key] || 0, cv.AllowTypes[Key]);
    return pv;
}, /** @type { Record<string, Number> } */ ({}));

// 生成模块定义
/** @type {ModularItemModuleConfig []} */
const modules = Object.entries(typeNameNext)
    .filter(([key]) => enabledModulesKey.has(key))
    .map(([Key, typeName]) => {
        const Name = takeShortName(typeName, "CN");
        return {
            Name,
            DrawImages: true,
            Key,
            Options: Array.from({ length: optionCount[Key] + 1 }, () => ({})),
        };
    });

/** @type { Record<keyof typeof typeNameNext, Record<number,string>> } */
const typedLayerNames = /** @type {AssetLayerDefinition[]}*/ (asset.Layer).reduce((pv, cv) => {
    const [k] = Object.entries(cv.AllowTypes)[0];
    pv[k] ??= {};
    pv[k][cv.AllowTypes[k]] = cv.Name;
    return pv;
}, /** @type { Record<keyof typeof typeNameNext, Record<number,string>> } */ ({}));

modules.forEach((m) => {
    m.DrawData = {
        elementData: m.Options.map((opt, idx) => {
            const src = typedLayerNames[m.Key][idx];
            if (!src) return { imagePath: PathTools.emptyImage };
            return {
                imagePath: `Assets/Female3DCG/ItemMisc/玩偶_Luzi_${src}.png`,
            };
        }),
    };
});

/** @type {ExtendedItemScriptHookCallbacks.Click<ModularItemData>} */
function click(data, originalFunction) {
    const property = DialogFocusItem?.Property;
    if (!property || data.currentModule === "Base") return originalFunction();
    for (const k in property.TypeRecord) {
        property.TypeRecord[k] = 0;
    }
    originalFunction();
}

/** @type {ModularItemConfig} */
const extended = {
    Archetype: ExtendedArchetype.MODULAR,
    ChangeWhenLocked: false,
    Modules: modules,
    DrawImages: false,
    DrawData: Tools.makeButtonGroup(modules.length),
    ScriptHooks: {
        Click: click,
    },
};

const layerNames = /** @type {AssetLayerDefinition[]}*/ (asset.Layer).reduce((pv, cv) => {
    const [k, v] = Object.entries(cv.AllowTypes)[0];
    pv[`${takeShortName(typeNameNext[k], "CN")}${v}`] = cv.Name;
    return pv;
}, /** @type { Record<string,string> } */ ({}));

const cnDialog = DialogTools.dialogGenerator(
    modules,
    {
        selectBase: "选择玩偶房间",
        module: ({ Key }) => ({
            Select: `选择${takeFullName(typeNameNext[Key], "CN")}`,
            Module: `${takeShortName(typeNameNext[Key], "CN")}`,
        }),
        option: (_, optionIndex, { Name }) => {
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
        selectBase: "Select Plushies Room",
        module: ({ Key }) => ({
            Select: `Select ${takeFullName(typeNameNext[Key], "EN")}`,
            Module: `${takeShortName(typeNameNext[Key], "EN")}`,
        }),
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
        selectBase: "Выбрать комнату с куклами",
        module: ({ Key }) => ({
            Select: `Выбрать ${takeFullName(typeNameNext[Key], "EN")}`,
            Module: `${takeShortName(typeNameNext[Key], "EN")}`,
        }),
        option: (_, optionIndex, { Name }) => {
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
const assetStrings = {
    CN: cnDialog,
    EN: enDialog,
    RU: ruDialog,
};

export default function () {
    AssetManager.addAssetWithConfig(["ItemMisc", "ItemHandheld"], asset, {
        extended,
        translation,
        layerNames,
        assetStrings,
    });
}

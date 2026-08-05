import { AssetManager } from "@local/AssetManager";
import { PathTools } from "@sugarch/bc-mod-utility";
import { DialogTools, Tools } from "@mod-utils/Tools";
import { luziSuffixFixups } from "@local/lib/fixups";
import { Access } from "@local/lib/type";

/** @type {AssetPoseMapping} */
const specialMapping = {
    Yoked: "TapedHands",
    OverTheHead: "TapedHands",
    BackBoxTie: "TapedHands",
    BackElbowTouch: "TapedHands",
    BackCuffs: "TapedHands",
    Hogtied: "TapedHands",
    AllFours: "TapedHands",
    TapedHands: "TapedHands",
};

/**
 * @typedef {Object} PlushieRoomConfig
 * @property {string} abbr 房间缩写（用作 module Key）
 * @property {Translation.Entry | string} [name] 房间名称（同时作为短名称和全名称）
 * @property {Translation.Entry | string} [shortName] 短名称，不设置则使用 name
 * @property {Translation.Entry | string} [fullName] 全名称，不设置则使用 name
 */

/**
 * @typedef {Object} PlushieItemConfig
 * @property {string} name 显示名称（菜单里显示的名字）
 * @property {string} roomAbbr 当前所在房间缩写
 * @property {string[]} [oldRoomAbbr] 玩偶曾经所在的房间缩写，用于保持 AllowTypes 占位兼容（不注册到菜单）
 * @property {boolean} [removed] 已移除的玩偶，保留 AllowTypes 占位但不出现在菜单中
 * @property {string} [fileName] 文件名，默认为 name。如果与 name 不同，则 asset 路径用 fileName，菜单仍显示 name
 * @property {AssetPoseMapping} [poseMapping] 物品姿势映射，不设置则使用默认映射
 * @property {Translation.Entry | string} [customSetMessage] 自定义设置消息，覆盖自动生成的消息。为 string 时视为 CN，为 Translation.Entry 时按语言设置
 */

/**
 * 房间定义
 * @type {PlushieRoomConfig[]}
 */
const plushieRooms = [
    {
        abbr: "d",
        shortName: { CN: "玩具店", EN: "Night at Saotome" },
        fullName: { CN: "早乙女的玩具店", EN: "Night at Saotome" },
    },
    { abbr: "s", name: "狼窝" },
    { abbr: "z", name: { CN: "芷窝", EN: "Mie" } },
    { abbr: "c", name: "Catnest" },
    { abbr: "f", name: { CN: "猫州猫庭府", EN: "Nekopara" } },
    { abbr: "y", name: { CN: "小夜家", EN: "Home of Saya" } },
    { abbr: "hz", name: { CN: "盒子的小黑屋", EN: "xiaoheiwu" } },
    { abbr: "x", name: { CN: "吸血鬼城堡", EN: "Vampire Castle" } },
    { abbr: "lihua", name: { CN: "笠花和An'an的家", EN: "Kasaki's room" } },
    { abbr: "yb", name: "鸢堡" },
    { abbr: "EILRSW", name: "EILRSW" },
    { abbr: "yytc", name: { CN: "伊友", EN: "Friends of Yi" } },
    { abbr: "xppjb", name: { CN: "香喷喷酒吧", EN: "xiangpenpen" } },
    { abbr: "ffe", shortName: "FFE", fullName: "Foxys Fun Experience" },
    { abbr: "lilian", name: { CN: "Lilian的大杂烩", EN: "Lilian Home" } },
    { abbr: "lkls", name: { CN: "莉柯莉絲家與她的朋友", EN: "Licolis" } },
    { abbr: "ce", name: "Celestial Enchants" },
    { abbr: "ds", name: "Den of Sin" },
    { abbr: "ll", name: "Latex Lab" },
    { abbr: "hb", name: "月见里的海边" },
    { abbr: "cai", name: "柴坊" },
    { abbr: "nest", name: "Nest" },
    { abbr: "pen", name: "1563" },
    { abbr: "yyw", name: "鸭鸭窝" },
    { abbr: "gggg", name: "Gugugaga" },
    { abbr: "yyx", name: "羊羊星" },
    { abbr: "hhdmj", name: "胡话的梦境" },
    { abbr: "qqcy", name: "青青草原~" },
    { abbr: "wd", name: "玩偶店" },
    { abbr: "fdj", name: "岚の家" },
    { abbr: "qt", name: "Ayako的Qt大家族" },
    { abbr: "yes", name: "Yes" },
    { abbr: "xjl", name: "小角落" },
    { abbr: "yjxw", name: "妖精小屋" },
    { abbr: "xts", name: "血天使的住所" },
    { abbr: "beacon", name: "Beacon" },
    { abbr: "tzw", name: "兔子窝" },
    { abbr: "smtgt", name: "水果罐头" },
    { abbr: "ylzs", name: "幽灵之森" },
    { abbr: "ricky", name: "Rickyの家" },
    { abbr: "data", name: "Data's room" },
    { abbr: "qchome", name: "倾城家" },
    { abbr: "hati", name: "hati家" },
    { abbr: "qq", name: "七七家" },
    { abbr: "gcz", name: "观察者之庭" },
    { abbr: "qr", name: "Quiet Room" },
    { abbr: "dou", name: "豆子家" },
    { abbr: "l", name: { CN: "(路过的玩偶)", EN: "(Wanderers)" } },
];

/**
 * 玩偶物品定义
 * 编辑要点：
 * 1. 如果玩偶的显示名称和文件名不同，在 `fileName` 中指定文件名。
 * 2. 添加玩偶尽量在对应房间的区域尾部添加，以保持房间内玩偶的顺序一致。
 * 2. 不要删除和挪动任何一行！如果要把一个玩偶移动到其他房间，需要在对应的 `roomAbbr` 中修改房间缩写。
 * 3. 如果把一个玩偶挪出了任何房间，把原来的 `roomAbbr` 加入它的 `oldRoomAbbr` 中！
 * 4. 如果要移除一个玩偶，不要删除它！设置 `removed` 为 `true`。
 * 5. 实在没办法删除了挪走了其实问题也不大，就是别人已经制作的玩偶可能会乱套（例如 l:21 被替换成了另一个玩偶，制作物品就乱了）
 *
 * @type {PlushieItemConfig[]}
 */
const plushieItems = [
    // 玩具店
    { name: "Saki", roomAbbr: "d" },
    { name: "Luzi", roomAbbr: "d", customSetMessage: "SourceCharacter给了DestinationCharacter一只笨蛋的Luzi玩偶." },
    { name: "若若", roomAbbr: "d" },
    { name: "Lamia", roomAbbr: "d" },

    // 狼窝
    { name: "Xin", roomAbbr: "s" },
    { name: "吉娜", roomAbbr: "s" },
    { name: "Ada", roomAbbr: "s" },
    { name: "Luzi2", roomAbbr: "s", customSetMessage: "SourceCharacter给了DestinationCharacter一只笨蛋的Luzi玩偶." },
    { name: "xin2", roomAbbr: "s", poseMapping: specialMapping },

    // 芷窝
    { name: "芷童", roomAbbr: "z", poseMapping: specialMapping },
    { name: "Gin", roomAbbr: "z" },
    { name: "Echo", roomAbbr: "z" },
    { name: "ᐛ", roomAbbr: "z" },
    { name: "ᐖ", roomAbbr: "z" },
    { name: "芙缇娅", roomAbbr: "z" },
    { name: "芷小童", roomAbbr: "z" },
    { name: "临", roomAbbr: "z" },
    { name: "小安", roomAbbr: "z" },
    { name: "Suki", roomAbbr: "z" },
    { name: "haru", roomAbbr: "z" },
    { name: "兔叽", roomAbbr: "z" },
    { name: "Lux", roomAbbr: "z" },

    // Catnest
    { name: "XinLian", roomAbbr: "c" },
    { name: "Zheiyun", roomAbbr: "c" },
    {
        name: "Cyäegha",
        roomAbbr: "c",
        customSetMessage: "SourceCharacter给了DestinationCharacter一只超厉害超威严bc第一的Cyäegha大人的眼线!",
    },
    {
        name: "PumpkinPie",
        roomAbbr: "c",
        customSetMessage: "SourceCharacter给了DestinationCharacter一只超色气的PumpkinPie样子的玩偶.",
    },
    { name: "Caius", roomAbbr: "c" },
    { name: "Neko", roomAbbr: "c" },
    { name: "居x", roomAbbr: "c" },
    { name: "vaner", roomAbbr: "c" },

    // 猫州猫庭府玩偶
    { name: "Axa", roomAbbr: "f", customSetMessage: "SourceCharacter给了DestinationCharacter一只会吸血的Axa玩偶." },
    { name: "Shirayuki", roomAbbr: "f" },
    { name: "Nail", roomAbbr: "f" },
    { name: "Nekonya蓝", roomAbbr: "f" },
    { name: "小果", roomAbbr: "f" },
    {
        name: "埃菲尔徳",
        roomAbbr: "f",
        customSetMessage: "SourceCharacter给了DestinationCharacter一只热气腾腾的埃菲尔徳玩偶.",
    },
    { name: "小寒", roomAbbr: "f" },
    { name: "沐猫", roomAbbr: "f" },

    // 小夜家玩偶
    { name: "向归夜", roomAbbr: "y" },
    { name: "圣光光", roomAbbr: "y" },
    { name: "娜娜", roomAbbr: "y" },
    { name: "彤酱", roomAbbr: "y" },
    { name: "璃心", roomAbbr: "y" },
    { name: "雫", roomAbbr: "y" },
    { name: "小狼", roomAbbr: "y" },
    { name: "小果", roomAbbr: "y" },
    { name: "时光光", roomAbbr: "y" },
    { name: "xxxx", roomAbbr: "y" },
    { name: "果子狸", roomAbbr: "y" },
    { name: "雪瑗", roomAbbr: "y" },
    { name: "xiu狸子", roomAbbr: "y" },
    { name: "布菈", roomAbbr: "y" },
    { name: "菲露娅", roomAbbr: "y" },
    { name: "绫", roomAbbr: "y" },

    // 盒子的小黑屋
    { name: "葡萄果汁盒", roomAbbr: "hz" },
    { name: "时雨Tokiame", roomAbbr: "hz" },
    { name: "殇梦溪", roomAbbr: "hz" },
    { name: "Neko", roomAbbr: "hz", fileName: "Neko2" },
    { name: "mizuki池", roomAbbr: "hz" },
    { name: "莉娅", roomAbbr: "hz" },
    { name: "艾尔", roomAbbr: "hz" },
    { name: "小火火", roomAbbr: "hz" },
    { name: "梦语诗", roomAbbr: "hz" },
    { name: "巧巧", roomAbbr: "hz" },
    { name: "巧巧2", roomAbbr: "hz" },

    // 吸血鬼城堡
    {
        name: "岚岚",
        roomAbbr: "x",
        poseMapping: specialMapping,
        customSetMessage:
            "SourceCharacter给了DestinationCharacter一只城堡真正的主人, 伟大! 优雅! 的吸血鬼始祖岚岚大人样子的玩偶.",
    },
    { name: "欧佩娜", roomAbbr: "x" },
    { name: "艾欧娜", roomAbbr: "x" },
    { name: "柚子", roomAbbr: "x" },
    { name: "梨子", roomAbbr: "x" },
    { name: "Lyndis琳", roomAbbr: "x" },
    { name: "黛烟", roomAbbr: "x" },
    { name: "Liriel", roomAbbr: "x" },
    { name: "瑟莉亚", roomAbbr: "x" },

    // 笠花和An'an的家
    { name: "笠花", roomAbbr: "lihua" },
    { name: "An'an", roomAbbr: "lihua", fileName: "Anan" },
    { name: "雨笠银花", roomAbbr: "lihua" },
    { name: "dudu", roomAbbr: "lihua" },
    { name: "卜卜", roomAbbr: "lihua" },
    { name: "秋巧", roomAbbr: "lihua" },

    // 鸢堡
    { name: "鸢", roomAbbr: "yb" },
    { name: "梓析", roomAbbr: "yb" },
    { name: "梓䒩", roomAbbr: "yb" },
    { name: "梓姌", roomAbbr: "yb" },
    { name: "梓璇", roomAbbr: "yb" },
    { name: "梓爱", roomAbbr: "yb" },
    { name: "呐呐梓", roomAbbr: "yb" },
    { name: "梓咪", roomAbbr: "yb" },
    { name: "馅饼梓", roomAbbr: "yb" },
    { name: "梓棂", roomAbbr: "yb" },
    { name: "ZforShort", roomAbbr: "yb" },
    { name: "小a", roomAbbr: "yb" },
    { name: "透透子", roomAbbr: "yb" },
    { name: "luobo", roomAbbr: "yb" },
    { name: "岚宝", roomAbbr: "yb" },

    // EILRSW
    { name: "Pasimia", roomAbbr: "EILRSW" },
    { name: "Alasade", roomAbbr: "EILRSW" },
    { name: "Lyudmila", roomAbbr: "EILRSW" },
    { name: "Emeia", roomAbbr: "EILRSW" },
    { name: "希雅", roomAbbr: "EILRSW" },
    { name: "酥酥", roomAbbr: "EILRSW" },
    { name: "茗子", roomAbbr: "EILRSW" },
    { name: "Kemera", roomAbbr: "EILRSW" },
    { name: "viimi", roomAbbr: "EILRSW" },

    // 伊友玩偶
    { name: "伊斯特", roomAbbr: "yytc" },
    { name: "Pekora-Kino", roomAbbr: "yytc" },
    { name: "幽灵", roomAbbr: "yytc" },
    { name: "希尔薇娅", roomAbbr: "yytc" },
    { name: "小沫", roomAbbr: "yytc" },
    { name: "Sive", roomAbbr: "yytc" },
    { name: "40", roomAbbr: "yytc" },
    { name: "焦糖", roomAbbr: "yytc" },
    { name: "早紀", roomAbbr: "yytc" },
    { name: "rin", roomAbbr: "yytc" },
    { name: "w", roomAbbr: "yytc" },
    { name: "OwQ", roomAbbr: "yytc" },
    { name: "绛翎", roomAbbr: "yytc" },
    { name: "玖儿", roomAbbr: "yytc" },
    { name: "白澜諪", roomAbbr: "yytc" },

    // 香喷喷酒吧
    {
        name: "依伊可",
        roomAbbr: "xppjb",
        customSetMessage:
            "SourceCharacter给了DestinationCharacter一只每天都在逛该踹门摸头, QQ乃乃好看到咩噗美少女依伊可.",
    },
    { name: "yumi", roomAbbr: "xppjb" },
    { name: "白墨鴝", roomAbbr: "xppjb" },
    { name: "忧绪", roomAbbr: "xppjb" },
    { name: "五十提", roomAbbr: "xppjb" },
    { name: "狸nux", roomAbbr: "xppjb" },
    {
        name: "依",
        roomAbbr: "xppjb",
        customSetMessage:
            "SourceCharacter给了DestinationCharacter一只上得厅堂下得厨房能文能武优雅高贵从不白给超绝美少女依!",
    },
    { name: "珥九", roomAbbr: "xppjb" },
    { name: "暴狸龙", roomAbbr: "xppjb" },
    { name: "Fu狸", roomAbbr: "xppjb" },
    {
        name: "依依",
        roomAbbr: "xppjb",
        customSetMessage: "天空一声巨响! 依依玩偶闪亮登场! 缓缓落在了DestinationCharacter怀里.",
    },
    { name: "wallyilma2", roomAbbr: "xppjb" },
    { name: "Shadow γ", roomAbbr: "xppjb", fileName: "Shadow" },

    // 失乐园 sly (已移除)
    // { name: "Reisigure", roomAbbr: "sly", removed: true },
    // { name: "Atlantis", roomAbbr: "sly", removed: true },
    // { name: "澈羽枫灵", roomAbbr: "sly", removed: true, poseMapping: specialMapping },
    // { name: "ReiSigureA", roomAbbr: "sly", removed: true },
    // { name: "ReiSigureAE", roomAbbr: "sly", removed: true },
    // { name: "ReiSigureEX", roomAbbr: "sly", removed: true },

    // Lilian的大杂烩
    { name: "Lilian", roomAbbr: "lilian" },
    { name: "幽", roomAbbr: "lilian", poseMapping: specialMapping },
    { name: "墨璃", roomAbbr: "lilian" },
    { name: "Linnn", roomAbbr: "lilian" },
    { name: "天使Linnn", roomAbbr: "lilian" },
    { name: "兔战Linnn", roomAbbr: "lilian" },
    { name: "Nagi", roomAbbr: "lilian" },

    // 莉柯莉絲家與她的朋友
    { name: "莉柯莉絲1", roomAbbr: "lkls" },
    { name: "莉柯莉絲2", roomAbbr: "lkls" },
    { name: "六月", roomAbbr: "lkls" },
    { name: "晓璃", roomAbbr: "lkls" },
    { name: "約爾", roomAbbr: "lkls" },
    { name: "mai", roomAbbr: "lkls" },
    { name: "kiseki", roomAbbr: "lkls" },
    { name: "madoka", roomAbbr: "lkls" },
    { name: "mamotta", roomAbbr: "lkls" },
    { name: "sunny", roomAbbr: "lkls" },
    { name: "marina", roomAbbr: "lkls" },
    { name: "橙汁", roomAbbr: "lkls" },
    { name: "Cynthiaa", roomAbbr: "lkls" },
    { name: "MIZU", roomAbbr: "lkls" },
    { name: "暖海", roomAbbr: "lkls" },
    { name: "Lucy", roomAbbr: "lkls" },
    { name: "小竹", roomAbbr: "lkls" },
    { name: "小羽", roomAbbr: "lkls" },
    { name: "紉唯", roomAbbr: "lkls" },
    { name: "Hime", roomAbbr: "lkls" },
    { name: "PENGPENG", roomAbbr: "lkls" },
    { name: "櫻奈", roomAbbr: "lkls" },
    { name: "贝斯蒂", roomAbbr: "lkls" },
    { name: "euna", roomAbbr: "lkls" },
    { name: "艾梅莉", roomAbbr: "lkls" },
    { name: "TINA", roomAbbr: "lkls" },
    { name: "Haruka", roomAbbr: "lkls" },
    { name: "Ayman", roomAbbr: "lkls" },
    { name: "歪歪", roomAbbr: "lkls" },
    { name: "凌雨", roomAbbr: "lkls" },
    { name: "小风", roomAbbr: "lkls" },

    // Celestial Enchants
    { name: "Celiko", roomAbbr: "ce" },
    { name: "Lavender", roomAbbr: "ce" },
    { name: "Siscuit", roomAbbr: "ce" },
    { name: "Sabie", roomAbbr: "ce" },

    // Den of Sin
    { name: "Sin", roomAbbr: "ds" },
    { name: "Cassandra Lee", roomAbbr: "ds" },
    { name: "Gangriel", roomAbbr: "ds" },
    { name: "Roslin", roomAbbr: "ds" },
    { name: "Rika", roomAbbr: "ds" },

    // Latex Lab
    { name: "XDress", roomAbbr: "ll" },
    { name: "Khloe", roomAbbr: "ll" },
    { name: "Aeri", roomAbbr: "ll" },
    { name: "Lillian", roomAbbr: "ll" },
    { name: "Minerva", roomAbbr: "ll" },
    { name: "delta", roomAbbr: "ll" },
    { name: "Nabi", roomAbbr: "ll" },

    // 月见里的海边
    { name: "蝶灵忧凪", roomAbbr: "hb" },
    { name: "蛇灵忧凪", roomAbbr: "hb" },
    { name: "忧咲", roomAbbr: "hb" },
    { name: "红熙", roomAbbr: "hb" },

    // 自恋柴的衣橱
    { name: "柴", roomAbbr: "cai", fileName: "柴柴1" },
    { name: "柴²", roomAbbr: "cai", fileName: "柴柴2" },
    { name: "柴³", roomAbbr: "cai", fileName: "柴柴3" },
    { name: "柴⁴", roomAbbr: "cai", fileName: "柴柴4" },
    { name: "柴⁵", roomAbbr: "cai", fileName: "柴柴5" },
    { name: "柴⁶", roomAbbr: "cai", fileName: "柴柴6" },
    { name: "柴⁷", roomAbbr: "cai", fileName: "柴柴7" },

    // nest
    { name: "Dango", roomAbbr: "nest" },
    { name: "狼狼虫", roomAbbr: "nest" },
    { name: "喵头嘤", roomAbbr: "nest" },
    { name: "喵头嘤2", roomAbbr: "nest" },
    { name: "lunara", roomAbbr: "nest" },
    { name: "Kitty", roomAbbr: "nest" },
    { name: "柴柴", roomAbbr: "nest" },
    { name: "辛西婭2", roomAbbr: "nest" },
    { name: "優米", roomAbbr: "nest" },
    { name: "Lana", roomAbbr: "nest" },
    { name: "枳", roomAbbr: "nest" },
    { name: "Arco", roomAbbr: "nest" },
    { name: "Rinko", roomAbbr: "nest" },
    {
        name: "姜海琳3",
        roomAbbr: "nest",
        customSetMessage:
            "SourceCharacter给了DestinationCharacter一只邪恶吸血猫, 优雅! 乖巧! 的吸血鬼岚岚眷属样子的玩偶.",
    },
    { name: "碧洛蒂丝", roomAbbr: "nest" },
    { name: "喵头嘤3", roomAbbr: "nest" },
    { name: "Elara", roomAbbr: "nest" },
    { name: "碧洛蒂丝2", roomAbbr: "nest" },
    { name: "荀", roomAbbr: "nest" },

    // Foxys Fun Experience
    { name: "Gab", roomAbbr: "ffe" },
    { name: "Seb", roomAbbr: "ffe" },
    { name: "Ryoko", roomAbbr: "ffe" },

    // 1563
    { name: "月月", roomAbbr: "pen" },
    { name: "晓雾", roomAbbr: "pen" },
    { name: "Penelope", roomAbbr: "pen" },
    { name: "Noel", roomAbbr: "pen" },
    { name: "叶子", roomAbbr: "pen" },

    // 鸭鸭窝
    { name: "Sunny2", roomAbbr: "yyw" },
    { name: "月诺诺", roomAbbr: "yyw" },

    // Gugugaga
    { name: "白木", roomAbbr: "gggg" },
    { name: "KocO", roomAbbr: "gggg" },
    { name: "N", roomAbbr: "gggg" },

    // 羊羊星
    { name: "UMI", roomAbbr: "yyx" },
    { name: "姜海琳", roomAbbr: "yyx" },
    { name: "姜海琳1", roomAbbr: "yyx" },
    { name: "姜海琳2", roomAbbr: "yyx" },
    { name: "辛西婭1", roomAbbr: "yyx" },
    { name: "辛西婭3", roomAbbr: "yyx" },
    { name: "UM", roomAbbr: "yyx" },
    {
        name: "乳胶犬鹤子",
        roomAbbr: "yyx",
        customSetMessage: "SourceCharacter给了DestinationCharacter一个可怜巴巴的乳胶犬鹤子.",
    },
    { name: "鹤子", roomAbbr: "yyx" },
    { name: "狄亚", roomAbbr: "yyx" },

    // 胡话的梦境
    { name: "腐化1", roomAbbr: "hhdmj" },
    { name: "腐化2", roomAbbr: "hhdmj" },
    { name: "北玄", roomAbbr: "hhdmj" },
    { name: "梓筠", roomAbbr: "hhdmj" },
    { name: "可可", roomAbbr: "hhdmj" },
    { name: "梦梦", roomAbbr: "hhdmj" },
    { name: "羽娅", roomAbbr: "hhdmj" },
    { name: "玖玖", roomAbbr: "hhdmj" },
    { name: "惟忆", roomAbbr: "hhdmj" },
    { name: "晴雪", roomAbbr: "hhdmj" },

    // 青青草原
    { name: "太上皇小灰灰", roomAbbr: "qqcy" },
    { name: "乖巧小灰灰", roomAbbr: "qqcy" },
    { name: "月~", roomAbbr: "qqcy" },
    { name: "梦~", roomAbbr: "qqcy" },
    { name: "狼~", roomAbbr: "qqcy" },
    { name: "鱼~", roomAbbr: "qqcy" },
    { name: "火龙果", roomAbbr: "qqcy" },
    { name: "狐狸~", roomAbbr: "qqcy" },
    { name: "莉柯姐姐~", roomAbbr: "qqcy" },
    { name: "小羽姐姐~", roomAbbr: "qqcy" },
    { name: "老大姐姐~", roomAbbr: "qqcy" },
    { name: "梦梦~", roomAbbr: "qqcy" },
    { name: "狼崽", roomAbbr: "qqcy" },
    { name: "乔", roomAbbr: "qqcy" },

    // 玩偶店
    { name: "希尔薇娅", roomAbbr: "wd" },
    { name: "希尔薇娅2", roomAbbr: "wd" },
    { name: "爱丽丝梦游仙境", roomAbbr: "wd" },
    { name: "安", roomAbbr: "wd" },
    { name: "麟", roomAbbr: "wd" },
    { name: "羽猫", roomAbbr: "wd" },
    { name: "小乔", roomAbbr: "wd" },
    { name: "凛", roomAbbr: "wd" },

    // 岚の家
    { name: "岚1", roomAbbr: "fdj" },
    { name: "岚3", roomAbbr: "fdj" },
    { name: "莉柯莉絲3", roomAbbr: "fdj" },
    { name: "小羽2", roomAbbr: "fdj" },
    { name: "小依", roomAbbr: "fdj" },
    { name: "UU", roomAbbr: "fdj" },
    { name: "小毛衣", roomAbbr: "fdj" },
    { name: "妍白", roomAbbr: "fdj" },
    { name: "兔兔", roomAbbr: "fdj" },
    { name: "布莱克", roomAbbr: "fdj" },
    { name: "茶茶", roomAbbr: "fdj" },
    { name: "小尤菲", roomAbbr: "fdj" },
    { name: "蛇蛇", roomAbbr: "fdj" },
    { name: "小away", roomAbbr: "fdj" },

    // 小角落好了！
    { name: "瑞饼", roomAbbr: "xjl" },
    { name: "诺瑞莉卡", roomAbbr: "xjl" },
    { name: "瑞饼饼", roomAbbr: "xjl" },
    { name: "魂饨儿", roomAbbr: "xjl" },

    // Ayako的Qt大家族
    { name: "Melody Qt", roomAbbr: "qt" },

    // Yes
    { name: "Yes", roomAbbr: "yes" },
    { name: "tiancai", roomAbbr: "yes" },
    { name: "haikou", roomAbbr: "yes" },
    { name: "银河", roomAbbr: "yes" },

    // 妖精小屋
    { name: "菲露亚", roomAbbr: "yjxw" },
    { name: "鹤舞", roomAbbr: "yjxw" },
    { name: "绿野幻梦", roomAbbr: "yjxw" },
    { name: "kelar", roomAbbr: "yjxw" },
    { name: "芝麻汤圆", roomAbbr: "yjxw" },
    { name: "暖雪", roomAbbr: "yjxw" },
    { name: "赛琳", roomAbbr: "yjxw" },
    { name: "云海", roomAbbr: "yjxw" },
    { name: "梦梦2", roomAbbr: "yjxw" },
    { name: "米莉", roomAbbr: "yjxw" },

    // 血天使的住所
    { name: "小粽子", roomAbbr: "xts" },
    { name: "血落音", roomAbbr: "xts" },
    { name: "墨羽", roomAbbr: "xts" },

    // beacon
    { name: "鈴音", roomAbbr: "beacon" },
    { name: "璐鹭", roomAbbr: "beacon" },
    { name: "望", roomAbbr: "beacon" },
    { name: "白月", roomAbbr: "beacon" },

    // 兔子窝
    { name: "友未", roomAbbr: "tzw" },
    { name: "牧雨", roomAbbr: "tzw" },
    { name: "雪月", roomAbbr: "tzw" },

    // 水果罐头
    { name: "小桃α", roomAbbr: "smtgt" },
    { name: "小桃β", roomAbbr: "smtgt" },
    { name: "大桃α", roomAbbr: "smtgt" },
    { name: "大桃β", roomAbbr: "smtgt" },
    { name: "小词", roomAbbr: "smtgt" },

    // 幽灵之森
    { name: "洛洛", roomAbbr: "ylzs" },

    // Rickyの家
    { name: "Ricky", roomAbbr: "ricky" },
    { name: "Enryu", roomAbbr: "ricky" },
    { name: "Medb", roomAbbr: "ricky" },
    { name: "DVA", roomAbbr: "ricky" },
    { name: "Sara", roomAbbr: "ricky" },

    // Data's room
    { name: "蒂塔-谨贺新春", roomAbbr: "data" },
    { name: "darkflow", roomAbbr: "data" },
    { name: "草莓", roomAbbr: "data" },
    { name: "Muse", roomAbbr: "data" },
    { name: "蒂塔", roomAbbr: "data" },
    { name: "落", roomAbbr: "data" },
    { name: "Sahrye", roomAbbr: "data" },
    { name: "蒂塔-花魁", roomAbbr: "data" },

    // 倾城家
    { name: "倾城", roomAbbr: "qchome" },
    { name: "凤翎", roomAbbr: "qchome" },
    { name: "Loren", roomAbbr: "qchome" },
    { name: "柚井", roomAbbr: "qchome" },
    { name: "梅莉娅", roomAbbr: "qchome" },
    { name: "羽和柚", roomAbbr: "qchome" },

    // hati家
    { name: "琵琵娅𝓟𝓲𝓹𝓲𝓪", roomAbbr: "hati" },
    { name: "卡茨娅𝓒𝓪𝓽𝔃𝓲𝓪", roomAbbr: "hati" },
    { name: "艾莉娅𝓐𝓮𝓵𝓲𝓪", roomAbbr: "hati" },
    { name: "𝓗𝓪𝓽𝓲", roomAbbr: "hati" },
    { name: "瑟茜𝓢𝓮𝓻𝓬𝓲𝓮", roomAbbr: "hati" },
    { name: "九不扶", roomAbbr: "hati" },

    // 七七家
    { name: "七分白衣", roomAbbr: "qq" },
    { name: "Hanna", roomAbbr: "qq" },
    { name: "樱", roomAbbr: "qq" },
    { name: "Penny", roomAbbr: "qq" },
    { name: "樱和七分白衣", roomAbbr: "qq" },
    { name: "蓝月", roomAbbr: "qq" },

    // 观察者之庭
    { name: "妄羽", roomAbbr: "gcz" },
    { name: "羽(水)", roomAbbr: "gcz" },
    { name: "柚(水)", roomAbbr: "gcz" },
    { name: "kit", roomAbbr: "gcz" },
    { name: "kit(小浣熊)", roomAbbr: "gcz" },
    { name: "kit(狐仙)", roomAbbr: "gcz" },

    // Quiet Room
    { name: "Yormi", roomAbbr: "qr" },
    { name: "Erica", fileName: "Erica_QR", roomAbbr: "qr" },
    { name: "Eva", fileName: "Eva_QR", roomAbbr: "qr" },
    { name: "Remie", roomAbbr: "qr" },
    { name: "Sara", fileName: "Sara_QR", roomAbbr: "qr" },
    { name: "Saskia", roomAbbr: "qr" },
    { name: "Shiru", roomAbbr: "qr" },
    { name: "Sianna", roomAbbr: "qr" },
    { name: "Vemb", roomAbbr: "qr" },
    { name: "Volka", roomAbbr: "qr" },
    { name: "Angel", roomAbbr: "qr" },

    // 豆子家
    { name: "豆豆", roomAbbr: "dou" },
    { name: "雪瑾", roomAbbr: "dou" },
    { name: "布兰绮", roomAbbr: "dou" },
    { name: "Larl", roomAbbr: "dou" },
    { name: "愛", roomAbbr: "dou" },
    { name: "饭团", roomAbbr: "dou" },

    // 路过的玩偶
    { name: "li", roomAbbr: "l" },
    { name: "YouXiang", roomAbbr: "l" },
    { name: "泠雨", roomAbbr: "l" },
    { name: "墨芸", roomAbbr: "l" },
    { name: "Poi", roomAbbr: "l", poseMapping: specialMapping },
    { name: "Pokemon", roomAbbr: "l" },
    { name: "Clara", roomAbbr: "l" },
    { name: "WallyIlma", roomAbbr: "l" },
    { name: "奈芙塔莉", roomAbbr: "l" },
    { name: "永翼", roomAbbr: "l" },
    { name: "Annie", roomAbbr: "l" },
    { name: "accoo", roomAbbr: "l" },
    { name: "疾风", roomAbbr: "l" },
    { name: "Eleanor", roomAbbr: "l" },
    { name: "小铃铛", roomAbbr: "l" },
    { name: "莉莉丝", roomAbbr: "l" },
    { name: "LaBi", roomAbbr: "l" },
    { name: "Shika", roomAbbr: "l" },
    { name: "铃奈", roomAbbr: "l" },
    { name: "小雨", roomAbbr: "l" },
    { name: "清酒梓", roomAbbr: "l" },
    { name: "忧绪bride", roomAbbr: "l" },
    { name: "曦芙bride", roomAbbr: "l" },
    { name: "小夏", roomAbbr: "l" },
    { name: "玩偶师", roomAbbr: "l" },
    { name: "触手姬", roomAbbr: "l" },
    { name: "雪琪", roomAbbr: "l" },
    { name: "溜溜猫", roomAbbr: "l" },
    { name: "芋圆", roomAbbr: "l" },
    { name: "月", roomAbbr: "l" },
    { name: "er", roomAbbr: "l" },
    { name: "Personas", roomAbbr: "l", poseMapping: specialMapping },
    { name: "Soph", roomAbbr: "l" },
    { name: "羽", roomAbbr: "l" },
    { name: "Milim", roomAbbr: "l" },
    { name: "云喵", roomAbbr: "l" },
    { name: "miaomiao", roomAbbr: "l" },
    { name: "Kiki", roomAbbr: "l" },
    { name: "YL", roomAbbr: "l" },
    { name: "殘楓", roomAbbr: "l" },
    { name: "幽玉", roomAbbr: "l" },
    { name: "小煜", roomAbbr: "l" },
    {
        name: "olga",
        roomAbbr: "l",
        customSetMessage: "SourceCharacter给了DestinationCharacter一只可爱的、毛绒绒的大尾巴巨乳巫女狐幽玉(共感)玩偶.",
    },
    { name: "薇薇", roomAbbr: "l" },
    { name: "CC1", roomAbbr: "l" },
    { name: "CC2", roomAbbr: "l" },
    { name: "花怜", roomAbbr: "l" },
    { name: "小思颖", roomAbbr: "l" },
    { name: "薇薇安", roomAbbr: "l" },
    { name: "朵朵", roomAbbr: "l" },
    { name: "柳晓", roomAbbr: "l" },
    { name: "妄羽", roomAbbr: "l" },
    { name: "羽和柚", roomAbbr: "l" },
    { name: "RuKa", roomAbbr: "l" },
    { name: "白月薇", roomAbbr: "l" },
    { name: "Kylie", roomAbbr: "l", fileName: "Kylie-Lilja" },
    { name: "Kiki", roomAbbr: "l", fileName: "Kiki-Lilja" },
];

// ========== 生成函数 ==========
// 下面是根据上面的内容，生成描述的代码
// 也就是说，不用手动写描述文字啦，只用写上面的内容就行

/**
 * 从 PlushieRoomConfig[] 生成 typeNameNext
 * @param {PlushieRoomConfig[]} rooms
 * @returns {Record<string, TypeNameEntry | FullAndShort>}
 */
function generateTypeNameNext(rooms) {
    /** @type {Record<string, TypeNameEntry | FullAndShort>} */
    const result = {};
    for (const room of rooms) {
        if (room.shortName != null || room.fullName != null) {
            result[room.abbr] = {
                Short: room.shortName ?? room.name,
                Full: room.fullName ?? room.name,
            };
        } else {
            result[room.abbr] = room.name;
        }
    }
    return result;
}

/**
 * 从 PlushieItemConfig[] 生成 asset.Layer
 * @param {PlushieItemConfig[]} items
 * @returns {AssetLayerDefinition[]}
 */
function generateAssetLayers(items) {
    /** @type {Record<string, number>} */
    const typeIndex = {};
    return items.map((item) => {
        const idx = (typeIndex[item.roomAbbr] = (typeIndex[item.roomAbbr] || 0) + 1);
        /** @type {AssetLayerDefinition} */
        const layer = {
            Name: item.fileName || item.name,
            AllowTypes: { [item.roomAbbr]: idx },
        };
        if (item.poseMapping) {
            layer.PoseMapping = item.poseMapping;
        }
        return layer;
    });
}

/**
 * 从 PlushieItemConfig[] 生成 predefDialog
 * @param {PlushieItemConfig[]} items
 * @returns {Translation.Dialog}
 */
function generatePredefDialog(items) {
    /** @type {Record<string, number>} */
    const typeIndex = {};
    /** @type {Record<string, string>} */
    const cn = {};
    /** @type {Record<string, string>} */
    const en = {};
    /** @type {Record<string, string>} */
    const ru = {};
    for (const item of items) {
        const idx = (typeIndex[item.roomAbbr] = (typeIndex[item.roomAbbr] || 0) + 1);
        // 如果显示名称和文件名不同，需要覆盖 Option 文本
        if (item.fileName != null && item.fileName !== item.name) {
            cn[`Option${item.roomAbbr}${idx}`] = item.name;
        }
        // 自定义设置消息
        if (item.customSetMessage) {
            if (typeof item.customSetMessage === "string") {
                cn[`Set${item.roomAbbr}${idx}`] = item.customSetMessage;
            } else {
                if (item.customSetMessage.CN) cn[`Set${item.roomAbbr}${idx}`] = item.customSetMessage.CN;
                if (item.customSetMessage.EN) en[`Set${item.roomAbbr}${idx}`] = item.customSetMessage.EN;
                if (item.customSetMessage.RU) ru[`Set${item.roomAbbr}${idx}`] = item.customSetMessage.RU;
            }
        }
    }
    /** @type {Translation.Dialog} */
    const result = { CN: cn };
    if (Object.keys(en).length) result.EN = en;
    if (Object.keys(ru).length) result.RU = ru;
    return result;
}

// 应用生成
const typeNameNext = generateTypeNameNext(plushieRooms);
const predefDialog = generatePredefDialog(plushieItems);
const translation = { CN: "玩偶", EN: "Plushies" };

/**
 * 核心物品定义
 * @type {CustomAssetDefinition}
 */
const asset = {
    Name: "玩偶",
    Random: false,
    Left: 125,
    Top: 225,
    ParentGroup: {},
    Priority: 50,
    PoseMapping: {},
    DynamicGroupName: "ItemMisc",
    AllowActivity: ["SqueezeItem"],
    ActivityAudio: ["Squeak"],
    Layer: generateAssetLayers(plushieItems),
};

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
    Access.set(pv, Key, Math.max(Access.getOr(pv, Key, 0), Access.getOr(cv.AllowTypes, Key, 0)));
    return pv;
}, /** @type { Record<string, Number> } */ ({}));

/**
 * 生成模块定义
 * @type {ModularItemModuleConfig []}
 */
const modules = Object.entries(typeNameNext)
    .filter(([key]) => enabledModulesKey.has(key))
    .map(([Key, typeName]) => {
        const Name = takeShortName(typeName, "CN");
        return {
            Name,
            DrawImages: true,
            Key,
            Options: Array.from({ length: Access.getOr(optionCount, Key, 0) + 1 }, () => ({})),
        };
    });

/** @type { Record<keyof typeof typeNameNext, Record<number,string>> } */
const typedLayerNames = /** @type {AssetLayerDefinition[]}*/ (asset.Layer).reduce((pv, cv) => {
    const [k] = Object.entries(cv.AllowTypes)[0];
    pv[k] ??= {};
    const idx = Access.getOr(cv.AllowTypes, k, 0);
    pv[k][idx] = cv.Name;
    return pv;
}, /** @type { Record<keyof typeof typeNameNext, Record<number,string>> } */ ({}));

/** 注册菜单模块 */
modules.forEach((m) => {
    m.DrawData = {
        elementData: m.Options.map((opt, idx) => {
            const src = typedLayerNames[m.Key][idx];
            if (!src) return { imagePath: PathTools.emptyImage };
            return {
                imagePath: `Assets/Female3DCG/ItemMisc/${asset.Name}_${src}.png`,
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
                return { Option: "Empty", Set: "SourceCharacter removes the plushie from DestinationCharacter hand." };
            return {
                Option: `${layerName}`,
                Set: `SourceCharacter gives DestinationCharacter a cute ${layerName} plushie.`,
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

    luziSuffixFixups(["ItemMisc", "ItemHandheld"], asset.Name);
}

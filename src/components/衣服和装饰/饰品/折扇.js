import { AssetManager } from "../../../assetForward";
import { DialogTools } from "@mod-utils/Tools";

/** @type { CustomAssetDefinition } */
const asset = {
    Name: "折扇_Luzi",
    Random: false,
    Top: 240,
    Left: 150,
    Priority: 55,
    Difficulty: -10,
    ParentGroup: {},
    DefaultColor: ["#FFFFFF", "#0C0809", "#2B1D11", "#2B1D11", "#2B1D11", "#848484"],
    AllowActivity: ["SpankItem", "RubItem"],
    ActivityAudio: ["SmackCrop"],
    Layer: [
        {
            Name: "折叠扇面",
            AllowTypes: { n: [0] },
        },
        {
            Name: "折叠扇面边缘",
            AllowTypes: { n: [0] },
        },
        {
            Name: "折叠扇骨",
            AllowTypes: { n: [0] },
        },
        {
            Name: "展开扇骨后",
            AllowTypes: { n: [1] },
        },
        {
            Name: "展开扇面",
            CopyLayerColor: "折叠扇面",
            AllowTypes: { n: [1] },
        },
        {
            Name: "展开扇面边缘",
            CopyLayerColor: "折叠扇面边缘",
            AllowTypes: { n: [1] },
        },
        {
            Name: "展开扇骨",
            AllowTypes: { n: [1] },
        },
        {
            Name: "展开扇面阴影",
            Priority: 56,
            AllowTypes: { n: [1] },
        },
        {
            Name: "梅",
            AllowColorize: false,
            AllowTypes: { n: [1], p: [1] },
        },
        {
            Name: "兰",
            AllowColorize: false,
            AllowTypes: { n: [1], p: [2] },
        },
        {
            Name: "竹",
            AllowColorize: false,
            AllowTypes: { n: [1], p: [3] },
        },
        {
            Name: "菊",
            AllowColorize: false,
            AllowTypes: { n: [1], p: [4] },
        },
        {
            Name: "山水",
            AllowColorize: false,
            AllowTypes: { n: [1], p: [5] },
        },
        {
            Name: "溪上扁舟隔月来",
            AllowColorize: false,
            AllowTypes: { n: [1], p: [6] },
        },
    ],
};

/** @type {AssetArchetypeConfig} */
const extended = {
    Archetype: ExtendedArchetype.MODULAR,
    Modules: [
        {
            Name: "展开",
            Key: "n",
            Options: [{}, {}],
        },
        {
            Name: "图案",
            Key: "p",
            Options: [{}, {}, {}, {}, {}, {}, {}],
        },
    ],
};

/** @type {Translation.Dialog} */
const dialog = DialogTools.replicateGroupedItemDialog(["ItemHandheld"], ["折扇_Luzi"], {
    CN: {
        SelectBase: "选择配置",
        Module展开: "展开扇子",
        Module图案: "图案",

        Select展开: "展开扇子",
        Optionn0: "关闭",
        Optionn1: "展开",
        Setn0: "SourceCharacter将TargetCharacter的折扇轻合，檀木扇骨收作蝶栖梅枝，绢面星斗复归砚底玄池。",
        Setn1: "SourceCharacter振腕展开TargetCharacter的折扇，玉竹扇骨化开半阙月光，素绢云纹漫卷三秋溪山。",

        Select图案: "选择图案",
        Optionp0: "无",
        Optionp1: "梅",
        Optionp2: "兰",
        Optionp3: "竹",
        Optionp4: "菊",
        Optionp5: "山水",
        Optionp6: "西溪舟行其一",
        Setp0: "SourceCharacter执扇在手，轻拂流云，将TargetCharacter扇面复归素白澄明之境。",
        Setp1: "SourceCharacter提笔落朱砂，为TargetCharacter描就扇上『疏影横枝』，暗香浮动月黄昏。",
        Setp2: "SourceCharacter运腕生幽芳，在TargetCharacter扇骨间勾勒『空谷猗兰』，九畹清风徐徐来。",
        Setp3: "SourceCharacter蘸墨写劲节，使TargetCharacter掌中折扇顿生『潇湘竹韵』，万叶秋声满庭轩。",
        Setp4: "SourceCharacter点金成傲霜，令TargetCharacter扇面铺展『东篱霜菊』，黄金甲胄抱香寒。",
        Setp5: "SourceCharacter破墨染氤氲，于TargetCharacter素纨上皴擦『千里江山』，青绿千载见沧溟。",
        Setp6: "SourceCharacter悬腕书诗魄，在TargetCharacter玉竹扇间挥就『溪上扁舟隔月来』，一竿撑碎水云光。",
    },
    EN: {
        SelectBase: "Select Configuration",
        Module展开: "Open Fan",
        Module图案: "Pattern",

        Select展开: "Open Fan",
        Optionn0: "Closed",
        Optionn1: "Opened",
        Setn0: "SourceCharacter furls DestinationCharacter sandalwood fan, Where moonlit covenant folds back into inkwell night.",
        Setn1: "SourceCharacter releases DestinationCharacter jade-bamboo fan, Unfolding solar flare across silk-cloud scroll of time.",

        Select图案: "Select Pattern",
        Optionp0: "None",
        Optionp1: "Plum",
        Optionp2: "Orchid",
        Optionp3: "Bamboo",
        Optionp4: "Chrysanthemum",
        Optionp5: "Landscape",
        Optionp6: "西溪舟行 part 1",

        Setp0: "With cloud-chasing strokes, SourceCharacter sweeps away worldly traces from DestinationCharacter fan, restoring its parchment to the pristine void.",
        Setp1: 'SourceCharacter etches "Plum Shadows Dance" upon DestinationCharacter silk canvas, floating fragrance under twilight moon.',
        Setp2: 'SourceCharacter weaves "Orchid Whispers" through DestinationCharacter bamboo slats, nine meadows\' breeze caught in ink-washed grace.',
        Setp3: 'SourceCharacter carves "Bamboo Sonata" into DestinationCharacter folding ribs, with each fold whispering autumn’s song through hollow jade.',
        Setp4: 'SourceCharacter gilds "Chrysanthemum Armor" across DestinationCharacter parchment, frost-kissed petals guarding winter\'s golden throne.',
        Setp5: 'Celestial strokes swirl "Misty Peaks Voyage" onto DestinationCharacter silk canvas, where ink-washed mountains breathe eternal jade.',
        Setp6: 'SourceCharacter inscribes "Moonlit Ripple Verse" along DestinationCharacter jade-bamboo ribs, where silvered oars cleave poetry from the stream.',
    },
});

const translations = {
    CN: "折扇",
    EN: "Folding fan",
    RU: "Складной веер",
    UA: "Розкладний вентилятор",
};

export default function () {
    AssetManager.addAsset("ItemHandheld", asset, extended, translations);
    AssetManager.addCustomDialog(dialog);
}

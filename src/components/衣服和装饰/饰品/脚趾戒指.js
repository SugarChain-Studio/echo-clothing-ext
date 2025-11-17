import { AssetManager } from "../../../assetForward";
import { luziFixups } from "../../../lib/fixups";

/** @type {CustomAssetDefinition} */
const asset = {
    Name: "脚趾戒指-Luzi",
    Random: false,
    Gender: "F",
    Top: 850,
    Left: 0,
    Extended: true,
    DefaultColor: [
        "#9B9897",
        "#9B9897",
        "#9B9897",
        "#9B9897",
        "#9B9897",
        "#9B9897",
        "#9B9897",
        "#9B9897",
        "#9B9897",
        "#9B9897",
    ],
    PoseMapping: {
        Kneel: "Hide",
        KneelingSpread: "Hide",
        LegsClosed: "LegsClosed",
        Spread: "Spread",
        Hogtied: "Hide",
        AllFours: "Hide",
    },
    ParentGroup: "BodyLower",
    Priority: 21,
    Layer: [
        { Name: "左1", ColorGroup: "左", AllowTypes: { L1: 1 } },
        { Name: "右1", ColorGroup: "右", AllowTypes: { R1: 1 } },
        { Name: "左2", ColorGroup: "左", AllowTypes: { L2: 1 } },
        { Name: "右2", ColorGroup: "右", AllowTypes: { R2: 1 } },
        { Name: "左3", ColorGroup: "左", AllowTypes: { L3: 1 } },
        { Name: "右3", ColorGroup: "右", AllowTypes: { R3: 1 } },
        { Name: "左4", ColorGroup: "左", AllowTypes: { L4: 1 } },
        { Name: "右4", ColorGroup: "右", AllowTypes: { R4: 1 } },
        { Name: "左5", ColorGroup: "左", AllowTypes: { L5: 1 } },
        { Name: "右5", ColorGroup: "右", AllowTypes: { R5: 1 } },
    ],
};

/** @type {ModularItemConfig} */
const extended = {
    Archetype: ExtendedArchetype.MODULAR,
    ChangeWhenLocked: false,
    Modules: [
        {
            Name: "右5",
            DrawImages: false,
            Key: "R5",
            Options: [{}, {}],
        },
        {
            Name: "右4",
            DrawImages: false,
            Key: "R4",
            Options: [{}, {}],
        },
        {
            Name: "右3",
            DrawImages: false,
            Key: "R3",
            Options: [{}, {}],
        },
        {
            Name: "右2",
            DrawImages: false,
            Key: "R2",
            Options: [{}, {}],
        },
        {
            Name: "右1",
            DrawImages: false,
            Key: "R1",
            Options: [{}, {}],
        },
        {
            Name: "左1",
            DrawImages: false,
            Key: "L1",
            Options: [{}, {}],
        },
        {
            Name: "左2",
            DrawImages: false,
            Key: "L2",
            Options: [{}, {}],
        },
        {
            Name: "左3",
            DrawImages: false,
            Key: "L3",
            Options: [{}, {}],
        },
        {
            Name: "左4",
            DrawImages: false,
            Key: "L4",
            Options: [{}, {}],
        },
        {
            Name: "左5",
            DrawImages: false,
            Key: "L5",
            Options: [{}, {}],
        },
    ],
    DrawData: {
        elementData: [
            .../** @type {{position:[number,number]}[]} */ (
                Array.from({ length: 5 }).map((_, idx) => ({
                    position: [1135 + 250 * (idx % 3), 450 + 75 * Math.floor(idx / 3)],
                }))
            ),
            .../** @type {{position:[number,number]}[]} */ (
                Array.from({ length: 5 }).map((_, idx) => ({
                    position: [1135 + 250 * (idx % 3), 450 + 75 * 3 + 75 * Math.floor(idx / 3)],
                }))
            ),
        ],
        itemsPerPage: 10,
    },
};

/** @type {Translation.Dialog} */
const assetStrings = {
    CN: {
        SelectBase: "选择脚趾戒指配置",
        Select左1: "设置左大拇指戒指",
        Module左1: "左大拇指戒指",
        OptionL10: "无",
        OptionL11: "有",
        Select右1: "设置右大拇指戒指",
        Module右1: "右大拇指戒指",
        OptionR10: "无",
        OptionR11: "有",

        Select左2: "设置左食指戒指",
        Module左2: "左食指戒指",
        OptionL20: "无",
        OptionL21: "有",
        Select右2: "设置右食指戒指",
        Module右2: "右食指戒指",
        OptionR20: "无",
        OptionR21: "有",

        Select左3: "设置左中指戒指",
        Module左3: "左中指戒指",
        OptionL30: "无",
        OptionL31: "有",
        Select右3: "设置右中指戒指",
        Module右3: "右中指戒指",
        OptionR30: "无",
        OptionR31: "有",

        Select左4: "设置左无名指戒指",
        Module左4: "左无名指戒指",
        OptionL40: "无",
        OptionL41: "有",
        Select右4: "设置右无名指戒指",
        Module右4: "右无名指戒指",
        OptionR40: "无",
        OptionR41: "有",

        Select左5: "设置左小指戒指",
        Module左5: "左小指戒指",
        OptionL50: "无",
        OptionL51: "有",
        Select右5: "设置右小指戒指",
        Module右5: "右小指戒指",
        OptionR50: "无",
        OptionR51: "有",
    },
    EN: {
        SelectBase: "Select toe ring",
        Select左1: "Set Left Big Toe Ring",
        Module左1: "Left Big Toe Ring",
        OptionL10: "None",
        OptionL11: "Present",
        Select右1: "Set Right Big Toe Ring",
        Module右1: "Right Big Toe Ring",
        OptionR10: "None",
        OptionR11: "Present",

        Select左2: "Set Left Second Toe Ring",
        Module左2: "Left Second Toe Ring",
        OptionL20: "None",
        OptionL21: "Present",
        Select右2: "Set Right Second Toe Ring",
        Module右2: "Right Second Toe Ring",
        OptionR20: "None",
        OptionR21: "Present",

        Select左3: "Set Left Middle Toe Ring",
        Module左3: "Left Middle Toe Ring",
        OptionL30: "None",
        OptionL31: "Present",
        Select右3: "Set Right Middle Toe Ring",
        Module右3: "Right Middle Toe Ring",
        OptionR30: "None",
        OptionR31: "Present",

        Select左4: "Set Left Fourth Toe Ring",
        Module左4: "Left Fourth Toe Ring",
        OptionL40: "None",
        OptionL41: "Present",
        Select右4: "Set Right Fourth Toe Ring",
        Module右4: "Right Fourth Toe Ring",
        OptionR40: "None",
        OptionR41: "Present",

        Select左5: "Set Left Little Toe Ring",
        Module左5: "Left Little Toe Ring",
        OptionL50: "None",
        OptionL51: "Present",
        Select右5: "Set Right Little Toe Ring",
        Module右5: "Right Little Toe Ring",
        OptionR50: "None",
        OptionR51: "Present",
    },
};

const translation = {
    CN: "脚趾戒指",
    EN: "Toe Ring",
    RU: "Кольцо на пальце ноги",
};

const layerNames = {
    EN: {
        左: "Left",
        右: "Right",
        ...Array.from({ length: 5 }).reduce((acc, _, idx) => {
            acc[`左${idx + 1}`] = `Left ${idx + 1}`;
            acc[`右${idx + 1}`] = `Right ${idx + 1}`;
            return acc;
        }, {}),
    },
};

export default function () {
    AssetManager.addAssetWithConfig("Shoes", asset, { translation, layerNames, extended, assetStrings });
    luziFixups("Shoes", asset.Name);
}

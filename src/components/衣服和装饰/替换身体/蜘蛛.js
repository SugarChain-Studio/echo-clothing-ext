import { AssetManager } from "../../../assetForward";

/** @type {CustomAssetDefinition} */
const asset = {
    Name: "蜘蛛_Luzi",
    Random: false,
    Gender: "F",
    Top: 0,
    Left: -155,
    Difficulty: 25,
    ParentGroup: {},
    Extended: true,
    DynamicGroupName: "动物身体_Luzi",
    Layer: [
        {
            Name: "A1_肚衔接",
            Priority: 16,
            AllowTypes: { typed: 1 },
        },
        {
            Name: "A2_肚",
            Priority: 6,
            AllowTypes: { typed: 1 },
        },
        {
            Name: "A5_爪",
            ColorGroup: "蛛形蜘蛛爪",
            Priority: 4,
            AllowTypes: { typed: 1 },
        },
        {
            Name: "A4_爪",
            ColorGroup: "蛛形蜘蛛爪",
            Priority: 5,
            AllowTypes: { typed: 1 },
        },
        {
            Name: "A3_爪",
            ColorGroup: "蛛形蜘蛛爪",
            Priority: 26,
            AllowTypes: { typed: 1 },
        },
        {
            Name: "遮罩",
            Priority: 26,
            HasImage: false,
            AllowColorize: false,
            AllowTypes: { typed: 1 },
            Alpha: [
                {
                    Group: [
                        "SuitLower",
                        "Garters",
                        "Bra",
                        "Socks",
                        "SocksRight",
                        "SocksLeft",
                        "AnkletRight",
                        "AnkletLeft",
                        "ItemFeet",
                        "ItemLegs",
                        "ItemTorso",
                        "ItemTorso2",
                        "ItemBoots",
                        "Liquid2_Luzi",
                        "身体痕迹_Luzi",
                        "BodyMarkings2_Luzi",
                        "Bra_笨笨蛋Luzi",
                        "Shoes",
                        "Shoes_笨笨蛋Luzi",
                        "ClothAccessory",
                        "ClothAccessory_笨笨蛋Luzi",
                    ],
                    Masks: [[100, 470, 300, 630]],
                    Pose: ["BaseLower", "LegsClosed", "Kneel", "KneelingSpread", "Spread", "LegsOpen"],
                },
            ],
        },

        {
            Name: "B3_爪",
            ColorGroup: "双足蜘蛛爪",
            Priority: 2,
            AllowTypes: { typed: 0 },
        },
        {
            Name: "B2_爪",
            ColorGroup: "双足蜘蛛爪",
            Priority: 2,
            AllowTypes: { typed: 0 },
        },
        {
            Name: "B1_爪",
            ColorGroup: "双足蜘蛛爪",
            Priority: 2,
            AllowTypes: { typed: 0 },
        },
    ],
};

const layerNames = {
    CN: {
        A1_肚衔接: "肚子连接(蛛形)",
        A2_肚: "肚子(蛛形)",
        蛛形蜘蛛爪: "蜘蛛爪(蛛形)",

        A5_爪: "后",
        A4_爪: "中",
        A3_爪: "前",

        双足蜘蛛爪: "双足蜘蛛爪",
        B3_爪: "后",
        B2_爪: "中",
        B1_爪: "前",
    },
    EN: {
        A1_肚衔接: "Belly Connection (Arachnid)",
        A2_肚: "Belly (Arachnid)",
        蛛形蜘蛛爪: "Claw (Arachnid)",
        A5_爪: "Back",
        A4_爪: "Middle",
        A3_爪: "Front",

        双足蜘蛛爪: "Claw (Biped)",
        B3_爪: "Back",
        B2_爪: "Middle",
        B1_爪: "Front",
    },
};

/** @type {TypedItemConfig} */
const extended = {
    Archetype: ExtendedArchetype.TYPED,
    DrawImages: false,
    Options: [
        { Name: "1" },
        {
            Name: "2",
            Property: {
                Hide: ["Pussy", "BodyLower"],
                OverrideHeight: {
                    Height: -200,
                    Priority: 21,
                    HeightRatioProportion: 0,
                },
            },
        },
    ],
};

/** @type {Translation.Dialog} */
const assetStrings = {
    CN: {
        Select: "设置",
        1: "双足站立",
        2: "蜘蛛下半身",
    },
    EN: {
        Select: "Select",
        1: "Biped",
        2: "Arachnid",
    },
    RU: {
        Select: "Выбрать",
        1: "Двуногий",
        2: "Арахнид",
    },
};

const translation = {
    CN: "蜘蛛",
    EN: "Spider",
    RU: "Паук",
};

export default function () {
    AssetManager.addAssetWithConfig(["动物身体_Luzi", "Wings"], asset, {
        extended,
        translation,
        layerNames,
        assetStrings,
    });
}

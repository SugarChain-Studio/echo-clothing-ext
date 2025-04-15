import { AssetManager } from "../../../assetForward";

/** @type {CustomAssetDefinition} */
const assetUpper = {
    Name: "乳胶衣_Luzi",
    Random: false,
    Gender: "F",
    Top: 0,
    Left: 0,
    Prerequisite: ["HasBreasts"],
    Expose: ["ItemNipples", "ItemBreast", "ItemNipplesPiercings"],
    DefaultColor: ["#232323", "#000000", "#FFFFFF", "#232323", "#000000", "#FFFFFF"],
    Layer: [
        {
            Name: "手套底色",
            Priority: 27,
            AllowTypes: { typed: 1 },
            PoseMapping: {
                TapedHands: "TapedHands",
                Yoked: "Yoked",
                OverTheHead: "OverTheHead",
                BackBoxTie: "Hide",
                BackElbowTouch: "Hide",
                BackCuffs: "BackCuffs",
                Hogtied: "Hide",
                AllFours: "Hide",
            },
        },
        {
            Name: "手套阴影",
            Priority: 27,
            AllowTypes: { typed: 1 },
            PoseMapping: {
                TapedHands: "TapedHands",
                Yoked: "Yoked",
                OverTheHead: "OverTheHead",
                BackBoxTie: "Hide",
                BackElbowTouch: "Hide",
                BackCuffs: "BackCuffs",
                Hogtied: "Hide",
                AllFours: "Hide",
            },
        },
        {
            Name: "手套高光",
            Priority: 27,
            AllowTypes: { typed: 1 },
            PoseMapping: {
                TapedHands: "TapedHands",
                Yoked: "Yoked",
                OverTheHead: "OverTheHead",
                BackBoxTie: "Hide",
                BackElbowTouch: "Hide",
                BackCuffs: "BackCuffs",
                Hogtied: "Hide",
                AllFours: "Hide",
            },
        },
        {
            Name: "上底色",
            Priority: 14,
            PoseMapping: {
                TapedHands: "TapedHands",
                Yoked: "Yoked",
                OverTheHead: "OverTheHead",
                BackBoxTie: "BackBoxTie",
                BackElbowTouch: "BackElbowTouch",
                BackCuffs: "BackCuffs",
                Hogtied: "Hogtied",
                AllFours: "Hide",
            },
        },
        {
            Name: "上阴影",
            Priority: 14,
            PoseMapping: {
                TapedHands: "TapedHands",
                Yoked: "Yoked",
                OverTheHead: "OverTheHead",
                BackBoxTie: "BackBoxTie",
                BackElbowTouch: "BackElbowTouch",
                BackCuffs: "BackCuffs",
                Hogtied: "Hogtied",
                AllFours: "Hide",
            },
        },
        {
            Name: "上高光",
            Priority: 14,
            PoseMapping: {
                TapedHands: "TapedHands",
                Yoked: "Yoked",
                OverTheHead: "OverTheHead",
                BackBoxTie: "BackBoxTie",
                BackElbowTouch: "BackElbowTouch",
                BackCuffs: "BackCuffs",
                Hogtied: "Hogtied",
                AllFours: "Hide",
            },
        },
    ],
};

/** @type {CustomAssetDefinition} */
const assetLower = {
    Name: "乳胶衣_Luzi",
    Random: false,
    Gender: "F",
    Top: 0,
    Left: 0,
    Prerequisite: ["HasVagina"],
    Attribute: ["SuitLower"],
    DefaultColor: ["#232323", "#000000", "#FFFFFF"],
    Layer: [
        {
            Name: "下底色",
            Priority: 14,
        },
        {
            Name: "下阴影",
            Priority: 14,
        },
        {
            Name: "下高光",
            Priority: 14,
        },
    ],
};

const translationUpper = {
    CN: "乳胶衣(上)",
    EN: "Latex Top",
    RU: "Латексный верх",
};

const layerNamesUpper = {
    EN: {
        手套底色: "Glove Base",
        手套阴影: "Glove Shadow",
        手套高光: "Glove Highlight",
        上底色: "Top Base",
        上阴影: "Top Shadow",
        上高光: "Top Highlight",
    },
};

const translationLower = {
    CN: "乳胶衣(下)",
    EN: "Latex Bottom",
    RU: "Латексный низ",
};

const layerNamesLower = {
    EN: {
        下底色: "Bottom Base",
        下阴影: "Bottom Shadow",
        下高光: "Bottom Highlight",
    },
};

/** @type {AssetArchetypeConfig} */
const extended = {
    Archetype: ExtendedArchetype.TYPED,
    DrawImages: false,
    Options: [
        {
            Name: "无",
        },
        {
            Name: "有",
        },
    ],
};

const assetDialogs = {
    CN: {
        Select: "选择是否有手套",
        无: "无",
        有: "有",
    },
    EN: {
        Select: "Select whether to have gloves",
        无: "No",
        有: "Yes",
    },
};

export default function () {
    AssetManager.addAssetWithConfig("Suit", assetUpper, {
        translation: translationUpper,
        layerNames: layerNamesUpper,
        extended,
        assetDialogs,
    });

    AssetManager.addAssetWithConfig("SuitLower", assetLower, {
        translation: translationLower,
        layerNames: layerNamesLower,
    });
}

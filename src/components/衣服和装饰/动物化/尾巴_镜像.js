import { AssetManager } from "../../../assetForward";

/** @type {AddAssetWithConfigParamsNoGroup[]} */
const assets = [
    [
        {
            Name: "穿戴式狗尾镜像_Luzi",
            Random: false,
            Top: -100,
            Left: 0,
        },
        {
            translation: { CN: "穿戴式狗尾(镜像)", EN: "Puppy Tail Strap (Mirror)", RU: "Носимый собачий хвост" },
        },
    ],
    [
        {
            Name: "白色穿戴式狼尾镜像_Luzi",
            Random: false,
            Top: -100,
            Left: 0,
        },
        {
            translation: {
                CN: "白色穿戴式狼尾(镜像)",
                EN: "Wolf White Tail Strap (Mirror)",
                RU: "Белый носимый волчий хвост",
            },
        },
    ],
    [
        {
            Name: "穿戴式浅色猫尾镜像_Luzi",
            Random: false,
            Top: 0,
            Left: 0,
        },
        {
            translation: {
                CN: "穿戴式浅色猫尾(镜像)",
                EN: "Light Kitten Tail Strap (Mirror)",
                RU: "Светлый носимый кошачий хвост",
            },
        },
    ],
    [
        {
            Name: "穿戴式软小狗尾镜像_Luzi",
            Random: false,
            Top: 0,
            Left: 0,
        },
        {
            translation: {
                CN: "穿戴式软小狗尾(镜像)",
                EN: "Puppy Fluffy Tail Strap (Mirror)",
                RU: "Мягкий носимый щенячий хвост",
            },
        },
    ],
    [
        {
            Name: "大型穿戴式狼尾镜像_Luzi",
            Random: false,
            Top: -100,
            Left: 0,
        },
        {
            translation: {
                CN: "大型穿戴式狼尾(镜像)",
                EN: "Wolf Large Tail Strap (Mirror)",
                RU: "Большой носимый волчий хвост",
            },
        },
    ],
    [
        {
            Name: "小型穿戴式狼尾镜像_Luzi",
            Random: false,
            Top: 0,
            Left: 0,
        },
        {
            translation: {
                CN: "小型穿戴式狼尾(镜像)",
                EN: "Wolf Small Tail Strap (Mirror)",
                RU: "Маленький носимый волчий хвост",
            },
        },
    ],
    [
        {
            Name: "小型穿戴式软猫尾镜像_Luzi",
            Random: false,
            Top: 0,
            Left: 0,
        },
        {
            translation: {
                CN: "小型穿戴式软猫尾(镜像)",
                EN: "Small Fluffy Kitten Tail Strap (Mirror)",
                RU: "Маленький мягкий носимый кошачий хвост",
            },
        },
    ],
    [
        {
            Name: "穿戴式浣熊尾镜像_Luzi",
            Random: false,
        },
        {
            translation: { CN: "穿戴式猫尾(镜像)", EN: "Raccoon2 Tail Strap (Mirror)", RU: "Носимый кошачий хвост" },
        },
    ],
    [
        {
            Name: "穿戴式猫尾镜像_Luzi",
            Random: false,
            Top: -100,
            Left: 0,
            Layer: [{ Name: "尾巴" }, { Name: "蝴蝶结" }, { Name: "铃铛" }],
        },
        {
            translation: { CN: "穿戴式猫尾(镜像)", EN: "Kitty Tail Strap (Mirror)", RU: "Носимый кошачий хвост" },
        },
    ],
];

/** @type { Record<string,string> } */
const icons = {
    "Assets/Female3DCG/TailStraps/Preview/穿戴式狗尾:镜像_Luzi.png":
        "Assets/Female3DCG/TailStraps/Preview/PuppyTailStrap.png",
    "Assets/Female3DCG/TailStraps/Preview/白色穿戴式狼尾:镜像_Luzi.png":
        "Assets/Female3DCG/TailStraps/Preview/WolfTailStrap3.png",
    "Assets/Female3DCG/TailStraps/Preview/穿戴式浅色猫尾:镜像_Luzi.png":
        "Assets/Female3DCG/TailStraps/Preview/KittenTailStrap1.png",
    "Assets/Female3DCG/TailStraps/Preview/穿戴式软小狗尾:镜像_Luzi.png":
        "Assets/Female3DCG/TailStraps/Preview/PuppyTailStrap1.png",
    "Assets/Female3DCG/TailStraps/Preview/大型穿戴式狼尾:镜像_Luzi.png":
        "Assets/Female3DCG/TailStraps/Preview/WolfTailStrap1.png",
    "Assets/Female3DCG/TailStraps/Preview/小型穿戴式狼尾:镜像_Luzi.png":
        "Assets/Female3DCG/TailStraps/Preview/WolfTailStrap2.png",
    "Assets/Female3DCG/TailStraps/Preview/小型穿戴式软猫尾:镜像_Luzi.png":
        "Assets/Female3DCG/TailStraps/Preview/KittenTailStrap2.png",
    "Assets/Female3DCG/TailStraps/Preview/穿戴式猫尾:镜像_Luzi.png":
        "Assets/Female3DCG/TailStraps/Preview/TailStrap.png",
};

export default function () {
    AssetManager.addAssetWithConfig("TailStraps", assets);
    AssetManager.addImageMapping(icons);
}

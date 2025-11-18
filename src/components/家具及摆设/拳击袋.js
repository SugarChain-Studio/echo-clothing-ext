import { AssetManager } from "../../assetForward";
import { luziFixups } from "../../lib/fixups";
import { FullMask } from "../功能调整/全身遮罩";

/** @type {CustomAssetDefinition} */
const asset = {
    Name: "拳击袋-Luzi",
    Random: false,
    Top: 0,
    Left: 0,
    AllowLock: true,
    Extended: true,
    EditOpacity: true,
    MinOpacity: 0,
    Opacity: 0,
    SetPose: ["BackElbowTouch", "Kneel"],
    Layer: [
        {
            Name: "前遮罩",
            AllowColorize: false,
            HasImage: false,
            AllowTypes: { typed: 0 },
            Alpha: [
                {
                    Masks: [
                        [0, -100, 500, 135], //上
                        [0, 717, 500, 120], //下
                        [0, 0, 130, 1000], //左
                        [370, 200, 135, 1000], //右
                    ],
                },
            ],
        },
        {
            Name: "前框遮罩",
            AllowColorize: false,
            HasImage: false,
            AllowTypes: { typed: 1 },
            Alpha: [
                {
                    Masks: [
                        [0, -100, 500, 135],
                        [0, 717, 500, 120],
                        [0, 0, 130, 1000],
                        [370, 200, 135, 1000],
                    ],
                },
            ],
        },
        { Name: "链条前", ColorGroup: "链条", Priority: 67, Top: -800 },
        { Name: "带子", Priority: 66 },
        { Name: "链条环", ColorGroup: "链条", Priority: 66 },
        { Name: "沙袋前", ColorGroup: "沙袋", Priority: 64, AllowTypes: { typed: 0 } },
        { Name: "沙袋后", ColorGroup: "沙袋", Priority: 1, MinOpacity: 1 },
        { Name: "链条后", ColorGroup: "链条", Priority: 0, Top: -800, MinOpacity: 1 },
        { Name: "沙袋前框", Priority: 65, AllowTypes: { typed: 1 } },
        { Name: "照片框", Priority: 65, AllowTypes: { typed: 1 } },
        { Name: "胶带", Priority: 65, AllowTypes: { typed: 1 } },
    ],
    OverrideHeight: {
        Height: -100,
        Priority: 41,
        HeightRatioProportion: 0,
    },
};

const layerNames = {
    CN: {
        链条前: "前",
        链条后: "后",
        链条环: "环",

        沙袋前: "前",
        沙袋后: "后",
        沙袋前框: "沙袋前框",
        照片框: "照片框",
        胶带: "胶带",

        链条: "链条",
        沙袋: "沙袋",
    },
    EN: {
        链条前: "Front",
        链条后: "Back",
        链条环: "Link",
        沙袋前: "Front",
        沙袋后: "Back",
        沙袋前框: "Sack Front Frame",
        照片框: "Photo Frame",
        胶带: "Tape",

        链条: "Chain",
        沙袋: "Sack",
    },
};

/** @type {TypedItemConfig} */
const extended = {
    Archetype: ExtendedArchetype.TYPED,
    DrawImages: false,
    Options: [{ Name: "无照片" }, { Name: "有照片" }],
    BaselineProperty: { Opacity: 1 },
    ScriptHooks: {
        Init: PropertyOpacityInit,
        Load: PropertyOpacityLoad,
        Draw: PropertyOpacityDraw,
        Exit: PropertyOpacityExit,
    },
    DrawData: { elementData: ExtendedXYClothes[2].map((tuple) => ({ position: [tuple[0], tuple[1] + 100] })) },
};

/** @type {Translation.Dialog} */
const assetStrings = {
    CN: {
        Select: "选择拳击袋配置",
        有照片: "贴上照片",
        无照片: "摘掉照片",
        Set有照片: "SourceCharacter给TargetCharacter贴上了照片",
        Set无照片: "SourceCharacter从TargetCharacter摘掉了照片",
    },
    EN: {
        Select: "Select Punching Bag Configuration",
        有照片: "Attach Photo",
        无照片: "Remove Photo",
        Set有照片: "SourceCharacter attaches a photo to TargetCharacter.",
        Set无照片: "SourceCharacter removes the photo from TargetCharacter.",
    },
    UA: {
        Select: "Виберіть конфігурацію боксерського мішка",
        有照片: "Прикріпити фотографію",
        无照片: "Зняти фотографію",
        Set有照片: "SourceCharacter прикріпили фотографію.",
        Set无照片: "SourceCharacter зняли фотографію.",
    },
    RU: {
        Select: "Выбор конфигурации боксерской груши",
        有照片: "Прикрепить фото",
        无照片: "Снять фото",
        Set有照片: "SourceCharacter прикрепил фото к DestinationCharacter.",
        Set无照片: "SourceCharacter снял фото с DestinationCharacter.",
    },
};

const translation = {
    CN: "拳击袋",
    EN: "Boxing Bag",
    UA: "Боксерський мішок",
};

export default function () {
    AssetManager.addAssetWithConfig("ItemDevices", asset, { translation, layerNames, extended, assetStrings });
    FullMask.push("ItemDevices", asset.Name, ["前遮罩", "前框遮罩"]);
    luziFixups("ItemDevices", asset.Name);
}

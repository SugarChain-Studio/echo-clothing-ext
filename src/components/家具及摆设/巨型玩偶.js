import { AssetManager } from "../../assetForward";
import { luziSuffixFixups } from "../../lib/fixups";
import { FullMask } from "../功能调整/全身遮罩";

/** @type {CustomAssetDefinition} */
const asset = {
    Name: "巨型玩偶",
    Random: false,
    Priority: 58,
    Difficulty: -2,
    Time: 15,
    RemoveTime: 10,
    Top: 0,
    AllowLock: true,
    Extended: true,
    EditOpacity: true,
    MinOpacity: 0,
    Opacity: 0,
    AllowActivePose: ["Kneel"],
    SetPose: ["Kneel"],
    Effect: [E.BlockWardrobe, E.Freeze],
    Layer: [
        {
            Name: "遮罩",
            HasImage: false,
            AllowColorize: false,
            Alpha: [
                {
                    Masks: [
                        [0, 0, 155, 750],
                        [350, 0, 150, 750],
                        [155, 0, 255, 65],
                        [155, 700, 255, 30],
                        AssetLowerOverflowAlpha,
                    ],
                },
            ],
        },
        { Name: "背景", Priority: 4, MinOpacity: 1 },
        { Name: "玩偶" },
        { Name: "围巾" },
    ],
};

const layerNames = {
    EN: {
        背景: "Back",
        玩偶: "Doll",
        围巾: "Scarf",
    },
};

/** @type {TypedItemConfig} */
const extended = {
    Archetype: ExtendedArchetype.TYPED,
    DrawImages: false,
    Options: [{ Name: "熊熊" }],
    BaselineProperty: { Opacity: 0.7 },
    ScriptHooks: {
        Init: PropertyOpacityInit,
        Load: PropertyOpacityLoad,
        Draw: PropertyOpacityDraw,
        Exit: PropertyOpacityExit,
    },
    DrawData: { elementData: ExtendedXYClothes[1].map((tuple) => ({ position: [tuple[0], tuple[1] + 100] })) },
};

/** @type {Translation.Dialog} */
const assetStrings = {
    CN: {
        熊熊: "熊熊",
        Select: "选择巨型玩偶配置",
    },
    EN: {
        熊熊: "Bear",
        Select: "Select Giant Doll Configuration",
    },
    RU: {
        熊熊: "Мишка",
        Select: "Выбор конфигурации большой игрушки",
    },
    UA: {
        熊熊: "Ведмедик",
        Select: "Виберіть конфігурацію великої іграшки",
    },
};

const translation = {
    CN: "巨型玩偶",
    EN: "Giant Stuffed Toy",
    UA: "Гіганська Іграшка",
};

export default function () {
    AssetManager.addAssetWithConfig("ItemDevices", asset, { translation, layerNames, extended, assetStrings });
    FullMask.push("ItemDevices", asset.Name, ["遮罩"]);
    luziSuffixFixups("ItemDevices", asset.Name);
}

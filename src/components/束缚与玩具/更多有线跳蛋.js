import { AssetManager } from "../../assetForward";
import { DialogTools } from "@mod-utils/Tools";

/** @type { CustomAssetDefinition } */
const asset = {
    Name: "更多有线跳蛋_Luzi",
    Random: false,
    Gender: "F",
    Top: 530,
    Left: 230,
    Difficulty: 3,
    Prerequisite: ["HasBreasts", "AccessVulva"],
    Priority: 14,
    PoseMapping: {
        AllFours: "Hide",
        Hogtied: "Hide",
        Kneel: "Kneel",
        KneelingSpread: "KneelingSpread",
        LegsClosed: "LegsClosed",
    },
    DefaultColor: ["Default", "Default", "Default", "Default", "Default", "#3B3B3B"],
    Layer: [
        {
            Name: "跳蛋1",
            ColorGroup: "跳蛋",
            AllowTypes: { n: [0, 1, 2, 3, 4] },
        },
        {
            Name: "跳蛋2",
            ColorGroup: "跳蛋",
            AllowTypes: { n: [1, 2, 3, 4] },
        },
        {
            Name: "跳蛋5",
            ColorGroup: "跳蛋",
            AllowTypes: { n: [4] },
        },
        {
            Name: "跳蛋3",
            ColorGroup: "跳蛋",
            AllowTypes: { n: [2, 3, 4] },
        },
        {
            Name: "跳蛋4",
            ColorGroup: "跳蛋",
            AllowTypes: { n: [3, 4] },
        },
        {
            Name: "绑带",
            ParentGroup: "BodyLower",
        },
    ],
};

/** @type {Translation.Dialog} */
const layerNames = {
    CN: {
        跳蛋: "跳蛋",
        跳蛋1: "跳蛋1",
        跳蛋2: "跳蛋2",
        跳蛋3: "跳蛋3",
        跳蛋4: "跳蛋4",
        跳蛋5: "跳蛋5",
        绑带: "绑带",
    },
    EN: {
        跳蛋: "Vibrators",
        跳蛋1: "Vibrator 1",
        跳蛋2: "Vibrator 2",
        跳蛋3: "Vibrator 3",
        跳蛋4: "Vibrator 4",
        跳蛋5: "Vibrator 5",
        绑带: "Strap",
    },
};

/** @type {AssetArchetypeConfig} */
const extended = {
    Archetype: ExtendedArchetype.MODULAR,
    Modules: [
        {
            Name: "跳蛋开关",
            DrawImages: false,
            Key: "o",
            Options: [
                {
                    Property: { Intensity: -1, Effect: ["Egged"] },
                },
                {
                    Property: { Intensity: 0, Effect: ["Egged", "Vibrating"] },
                },
                {
                    Property: { Intensity: 1, Effect: ["Egged", "Vibrating"] },
                },
                {
                    Property: { Intensity: 3, Effect: ["Egged", "Vibrating"] },
                },
                {
                    Property: { Intensity: 3, Effect: ["Egged", "Vibrating"] },
                },
            ],
        },
        {
            Name: "跳蛋数量",
            DrawImages: false,
            Key: "n",
            Options: [{}, {}, {}, {}, {}],
        },
    ],
};

/** @type {Translation.Dialog} */
const assetDialogs = {
    CN: {
        SelectBase: "选择配置",
        Select跳蛋开关: "跳蛋开关",
        Select跳蛋数量: "跳蛋数量",
        Module跳蛋开关: "跳蛋开关",
        Module跳蛋数量: "跳蛋数量",
        Optionn0: "1个",
        Optionn1: "2个",
        Optionn2: "3个",
        Optionn3: "4个",
        Optionn4: "5个",
        Optiono0: "关闭",
        Optiono1: "低",
        Optiono2: "中",
        Optiono3: "高",
        Optiono4: "最高",

        Seto0: "SourceCharacter拨动开关,将TargetCharacter的跳蛋设置为关闭.",
        Seto1: "SourceCharacter拨动开关,将TargetCharacter的跳蛋设置为低.",
        Seto2: "SourceCharacter拨动开关,将TargetCharacter的跳蛋设置为中.",
        Seto3: "SourceCharacter拨动开关,将TargetCharacter的跳蛋设置为高.",
        Seto4: "SourceCharacter拨动开关,将TargetCharacter的跳蛋设置为最高.",
        Setn0: "SourceCharacter将TargetCharacter阴部的跳蛋拉出,仅剩下1个.",
        Setn1: "SourceCharacter摆弄着有线跳蛋,现在TargetCharacter的阴道内有2个跳蛋.",
        Setn2: "SourceCharacter摆弄着有线跳蛋,现在TargetCharacter的阴道内有3个跳蛋.",
        Setn3: "SourceCharacter摆弄着有线跳蛋,现在TargetCharacter的阴道内有4个跳蛋.",
        Setn4: "SourceCharacter摆弄着有线跳蛋,现在TargetCharacter的阴道内有5个跳蛋.",
    },
    EN: {
        SelectBase: "Select Configuration",
        Select跳蛋开关: "Select Vibrator Switch",
        Select跳蛋数量: "Select Vibrator Quantity",
        Module跳蛋开关: "Select Vibrator Switch",
        Module跳蛋数量: "Select Vibrator Quantity",
        Optionn0: "1 Vibrator",
        Optionn1: "2 Vibrators",
        Optionn2: "3 Vibrators",
        Optionn3: "4 Vibrators",
        Optionn4: "5 Vibrators",
        Optiono0: "Off",
        Optiono1: "Low",
        Optiono2: "Medium",
        Optiono3: "High",
        Optiono4: "Maximum",

        Seto0: "SourceCharacter flicks the switch, setting DestinationCharacter vibrator egg to off.",
        Seto1: "SourceCharacter flicks the switch, setting DestinationCharacter vibrator egg to low.",
        Seto2: "SourceCharacter flicks the switch, setting DestinationCharacter vibrator egg to medium.",
        Seto3: "SourceCharacter flicks the switch, setting DestinationCharacter vibrator egg to high.",
        Seto4: "SourceCharacter flicks the switch, setting DestinationCharacter vibrator egg to maximum.",
        Setn0: "SourceCharacter pulls out the vibrator egg from DestinationCharacter genitalia, leaving only one remaining.",
        Setn1: "SourceCharacter fiddles with the wired vibrator egg, now there are two vibrator eggs inside DestinationCharacter vagina.",
        Setn2: "SourceCharacter fiddles with the wired vibrator egg, now there are three vibrator eggs inside DestinationCharacter vagina.",
        Setn3: "SourceCharacter fiddles with the wired vibrator egg, now there are four vibrator eggs inside DestinationCharacter vagina.",
        Setn4: "SourceCharacter fiddles with the wired vibrator egg, now there are five vibrator eggs inside DestinationCharacter vagina.",
    },
    UA: {
        SelectBase: "Виберіть конфігурацію",
        Select跳蛋开关: "Виберіть режим вібратора",
        Select跳蛋数量: "Виберіть кількість вібраторів",
        Module跳蛋开关: "Виберіть режим вібратора",
        Module跳蛋数量: "Виберіть кількість вібраторів",
        Optionn0: "1 Вібратор",
        Optionn1: "2 Вібратори",
        Optionn2: "3 Вібратори",
        Optionn3: "4 Вібратори",
        Optionn4: "5 Вібраторів",
        Optiono0: "Вимкнути",
        Optiono1: "Низька потужність",
        Optiono2: "Середня потужність",
        Optiono3: "Висока потужність",
        Optiono4: "Максимальна потужність",

        Seto0: "SourceCharacter вимикає вібратори TargetCharacter.",
        Seto1: "SourceCharacter вмикає вібратори TargetCharacter до низького рівня.",
        Seto2: "SourceCharacter вмикає вібратори DestinationCharacter до середнього рівня.",
        Seto3: "SourceCharacter вмикає вібратори DestinationCharacter до високого рівня.",
        Seto4: "SourceCharacter вмикає вібратори DestinationCharacter до максимального рівня.",
        Setn0: "SourceCharacter витягує передостанній вібратор з TargetCharacter геніталії, залишаючи останній.",
        Setn1: "SourceCharacter бавиться з вібраторами, залишаючи два вібратори всередині TargetCharacter.",
        Setn2: "SourceCharacter бавиться з вібраторами, залишаючи три вібратори всередині TargetCharacter.",
        Setn3: "SourceCharacter бавиться з вібраторами, залишаючи чотири вібратори всередині TargetCharacter.",
        Setn4: "SourceCharacter бавиться з вібраторами, залишаючи п'ять вібратори всередині TargetCharacter.",
    },
    RU: {
        SelectBase: "Выбор конфигурации",
        Select跳蛋开关: "Переключатель вибратора",
        Select跳蛋数量: "Количество вибраторов",
        Module跳蛋开关: "Переключатель вибратора",
        Module跳蛋数量: "Количество вибраторов",
        Optionn0: "1 шт.",
        Optionn1: "2 шт.",
        Optionn2: "3 шт.",
        Optionn3: "4 шт.",
        Optionn4: "5 шт.",
        Optiono0: "Выключено",
        Optiono1: "Низкий",
        Optiono2: "Средний",
        Optiono3: "Высокий",
        Optiono4: "Максимальный",

        Seto0: "SourceCharacter переключает выключатель, устанавливая вибратор TargetCharacter в выключенное состояние.",
        Seto1: "SourceCharacter переключает выключатель, устанавливая вибратор TargetCharacter на низкую интенсивность.",
        Seto2: "SourceCharacter переключает выключатель, устанавливая вибратор TargetCharacter на среднюю интенсивность.",
        Seto3: "SourceCharacter переключает выключатель, устанавливая вибратор TargetCharacter на высокую интенсивность.",
        Seto4: "SourceCharacter переключает выключатель, устанавливая вибратор TargetCharacter на максимальную интенсивность.",
        Setn0: "SourceCharacter вытаскивает вибратор из TargetCharacter, оставляя только 1 шт.",
        Setn1: "SourceCharacter играет с проводными вибраторами, теперь в вагине TargetCharacter находится 2 вибратора.",
        Setn2: "SourceCharacter играет с проводными вибраторами, теперь в вагине TargetCharacter находится 3 вибратора.",
        Setn3: "SourceCharacter играет с проводными вибраторами, теперь в вагине TargetCharacter находится 4 вибратора.",
        Setn4: "SourceCharacter играет с проводными вибраторами, теперь в вагине TargetCharacter находится 5 вибраторов.",
    },
};

const description = {
    CN: "更多有线跳蛋",
    EN: "More Wired Vibrators",
    RU: "Больше проводных вибраторов",
    UA: "Більше провідних вібраторів",
};

export default function () {
    AssetManager.addAssetWithConfig("ItemVulva", asset, {
        extended,
        description,
        layerNames,
        assetDialogs,
    });
}

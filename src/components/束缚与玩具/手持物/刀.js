import { ArmMaskTool } from "../../../lib";
import { AssetManager } from "../../../assetForward";

/** @type {CustomAssetDefinition} */
const asset = {
    Name: "刀",
    Random: false,
    Gender: "F",
    Top: -50,
    Left: -50,
    ParentGroup: {},
    Fetish: ["Sadism"],
    Layer: [
        { Name: "A5", Priority: 1, AllowTypes: { A: 0 } },
        { Name: "A4", Priority: 1, AllowTypes: { A: 0 } },
        { Name: "A3", Priority: 1, AllowTypes: { A: 0 } },
        { Name: "A2", Priority: 1, AllowTypes: { A: 0 } },
        { Name: "A1", Priority: 1, AllowTypes: { A: 0 } },

        { Name: "B5", Priority: 34, AllowTypes: { A: 1 } },
        { Name: "B4", Priority: 34, AllowTypes: { A: 1 } },
        { Name: "B3", Priority: 34, AllowTypes: { A: 1 } },
        { Name: "B2", Priority: 34, AllowTypes: { A: 1 } },
        { Name: "B1", Priority: 34, AllowTypes: { A: 1 } },

        { Name: "鞘1", Priority: 1 },
        { Name: "鞘2", Priority: 1 },
    ],
};

const layerNames = {
    CN: {
        A5: "刃",
        A4: "缘",
        A3: "镡",
        A2: "柄卷",
        A1: "头",

        鞘1: "鞘",
        鞘2: "鞘尻",
    },
    EN: {
        A5: "Yaiba",
        A4: "Fuchi",
        A3: "Tsuba",
        A2: "Tsukamaki",
        A1: "Kashira",

        鞘1: "Kiya",
        鞘2: "Kiyajiri",
    },
};

/** @type {AssetArchetypeConfig} */
const extended = {
    Archetype: ExtendedArchetype.MODULAR,
    Modules: [
        {
            Name: "刀",
            Key: "A",
            DrawImages: false,
            Options: [{}, { Property: { AllowActivity: ["RubItem", "SpankItem"] } }],
        },
    ],
};

const assetStrings = {
    CN: {
        SelectBase: "选择配置",
        Module刀: "设置",
        Select刀: "设置",
        OptionA0: "收起",
        OptionA1: "拔出",
        SetA0: "SourceCharacter收起了TargetCharacter的太刀。",
        SetA1: "SourceCharacter拔出了TargetCharacter的太刀。",
    },
    EN: {
        SelectBase: "Select Configuration",
        Module刀: "Settings",
        Select刀: "Settings",
        OptionA0: "Sheathe",
        OptionA1: "Draw",
        SetA0: "SourceCharacter sheathed DestinationCharacter tachi.",
        SetA1: "SourceCharacter drew DestinationCharacter tachi.",
    },
    RU: {
        SelectBase: "Выбор конфигурации",
        Module刀: "Настройки",
        Select刀: "Настройки",
        OptionA0: "Убрать",
        OptionA1: "Достать",
        SetA0: "SourceCharacter убрал нож у DestinationCharacter.",
        SetA1: "SourceCharacter достал нож у DestinationCharacter.",
    },
};

const translation = {
    CN: "太刀",
    EN: "Tachi",
    RU: "Тати",
};

export default function () {
    ArmMaskTool.createArmMaskForCloth("ItemHandheld", asset, "Right");
    AssetManager.addAssetWithConfig("ItemHandheld", asset, {
        layerNames,
        assetStrings,
        extended,
        translation,
    });
}

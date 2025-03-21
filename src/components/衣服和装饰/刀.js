import { AssetManager } from "../../assetForward";
import { DialogTools } from "@mod-utils/Tools";

/** @type {CustomAssetDefinition} */
const asset = {
    Name: "刀",
    Random: false,
    Gender: "F",
    Top: -50,
    Left: -50,
    ParentGroup: {},
    // DefaultColor: ["#FFFFF",],
    Layer: [
        { Name: "A5", Priority: 1, AllowTypes: { A: 0 } },
        { Name: "A4", Priority: 1, AllowTypes: { A: 0 } },
        { Name: "A3", Priority: 1, AllowTypes: { A: 0 } },
        { Name: "A2", Priority: 1, AllowTypes: { A: 0 } },
        { Name: "A1", Priority: 1, AllowTypes: { A: 0 } },

        { Name: "B5", Priority: 26, AllowTypes: { A: 1 } },
        { Name: "B4", Priority: 26, AllowTypes: { A: 1 } },
        { Name: "B3", Priority: 26, AllowTypes: { A: 1 } },
        { Name: "B2", Priority: 26, AllowTypes: { A: 1 } },
        { Name: "B1", Priority: 26, AllowTypes: { A: 1 } },

        { Name: "鞘1", Priority: 1 },
        { Name: "鞘2", Priority: 1 },
    ],
};

/** @type {AssetArchetypeConfig} */
const extended = {
    Archetype: ExtendedArchetype.MODULAR,
    Modules: [
        {
            Name: "刀",
            Key: "A",
            DrawImages: false,
            Options: [{}, {}],
        },
    ],
};

const dialog = DialogTools.replicateGroupedItemDialog(["ItemHandheld"], ["刀"], {
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
});

const translations = {
    CN: "太刀",
    EN: "Tachi",
    RU: "Тати",
};

export default function () {
    AssetManager.addAsset("ItemHandheld", asset, extended, translations);
    AssetManager.addCustomDialog(dialog);
}

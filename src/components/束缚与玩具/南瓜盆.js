import { AssetManager } from "../../assetForward";
import { DialogTools } from "@mod-utils/Tools";

/** @type {CustomAssetDefinition} */
const asset = {
    Name: "南瓜盆",
    Random: false,
    Top: 0,
    Left: 0,
    Gender: "F",
    Fetish: ["Sadism"],
    Priority: 48,
    ParentGroup: {},
    Layer: [
        {
            Name: "南瓜",
        },
        {
            Name: "糖果",
        },
        {
            Name: "眼睛",
        },
        {
            Name: "链子",
            AllowTypes: { typed: 1 },
        },
    ],
};

/** @type {AssetArchetypeConfig} */
const extended = {
    Archetype: ExtendedArchetype.TYPED,
    DrawImages: false,
    Options: [{ Name: "无" }, { Name: "链子" }],
};

/** @type {Translation.Dialog} */
const dialog = DialogTools.replicateGroupedItemDialog(["ItemMisc"], ["南瓜盆"], {
    CN: {
        Select: "设置",
        无: "无",
        链子: "链子",

        Set无: "SourceCharacter取下了DestinationCharacter南瓜盆上的链子.",
        Set链子: "SourceCharacter给DestinationCharacter南瓜盆连上了一条链子.",
    },
    EN: {
        Select: "Setting",
        无: "None",
        链子: "Chain",

        Set无: "SourceCharacter removes the chain from DestinationCharacter pumpkin pot.",
        Set链子: "SourceCharacter connects a link to DestinationCharacter pumpkin pot.",
    },
    RU: {
        Select: "Настройка",
        无: "Нет",
        链子: "Цепь",

        Set无: "SourceCharacter снимает цепь с тыквенного горшка DestinationCharacter.",
        Set链子: "SourceCharacter прикрепляет цепь к тыквенному горшку DestinationCharacter.",
    },
});

const translations = {
    CN: "南瓜盆",
    EN: "Pumpkin Pot",
    RU: "Тыквенный горшок",
};

export default function () {
    AssetManager.addAsset("ItemMisc", asset, extended, translations);
    AssetManager.addCustomDialog(dialog);
}

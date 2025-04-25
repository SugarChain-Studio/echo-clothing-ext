import { AssetManager } from "../../assetForward";

/** @type {CustomAssetDefinition} */
const asset = {
    Name: "斩标_Luzi",
    Random: false,
    Top: -430,
    Left: 0,
    Extended: true,
    Fetish: ["Sadism"],
    Layer: [
        {
            Name: "牌子",
            Priority: 1,
        },
        {
            Name: "笨蛋",
            Priority: 2,
            AllowTypes: { typed: [1] },
        },
    ],
};

const layerNames = {
    CN: {
        牌子: "斩标",
        笨蛋: "文字",
    },
    EN: {
        牌子: "Marking Panel",
        笨蛋: "Text",
    },
};

const extended = {
    Archetype: ExtendedArchetype.TYPED,
    DrawImages: false,
    Options: [{ Name: "无" }, { Name: "笨蛋" }],
};

/** @type {Translation.Dialog} */
const assetStrings = {
    CN: {
        Select: "选择斩标文字",
        无: "无",
        笨蛋: "笨蛋",

        Set无: "SourceCharacter擦掉了DestinationCharacter斩标上的字.",
        Set笨蛋: "SourceCharacter在DestinationCharacter斩标上写上了笨蛋.",
    },
    EN: {
        Select: "Select Aba Aba",
        无: "None",
        笨蛋: "笨蛋",

        Set无: "SourceCharacter erased the words on DestinationCharacter ChanBiao.",
        Set笨蛋: "SourceCharacter wrote 'BenDiao' on DestinationCharacter ChanBiao.",
    },
};

const translation = { CN: "斩标", EN: "Behead Marking" };

export default function () {
    AssetManager.addAssetWithConfig("ItemMisc", asset, { extended, translation, layerNames, assetStrings });
}

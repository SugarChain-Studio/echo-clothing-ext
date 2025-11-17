import { DialogTools, Tools } from "@mod-utils/Tools";
import { AssetManager } from "../../assetForward";
import { luziFixups } from "../../lib/fixups";

/** @type {CustomAssetDefinition} */
const asset = {
    Name: "斩标-Luzi",
    Random: false,
    Top: -120,
    Left: 200,
    Extended: true,
    Priority: 4,
    DefaultColor: ["#ADADAD", "#000000"],
    Layer: [{ Name: "牌子" }, { Name: "文字", AllowTypes: { typed: [1, 2, 3, 4] }, CreateLayerTypes: ["typed"] }],
};

const layerNames = {
    EN: {
        牌子: "Marking Panel",
        文字: "Text",
    },
};

const langMapping = { CN: "CN", TW: "CN" };

/** @type {ExtendedItemScriptHookCallbacks.BeforeDraw<TypedItemData, {}>} */
function beforeDraw(data, originalFunction, { LayerType, L }) {
    if (L === "文字") return { LayerType: `${LayerType}_${langMapping[TranslationLanguage] || "EN"}` };
}

/** @type {TypedItemConfig} */
const extended = {
    Archetype: ExtendedArchetype.TYPED,
    DrawImages: false,
    ChatTags: Tools.CommonChatTags(),
    Options: [{ Name: "无" }, { Name: "笨蛋" }, { Name: "母狗" }, { Name: "骚货" }, { Name: "肉便器" }],
    ScriptHooks: { BeforeDraw: beforeDraw },
};

/** @type {Translation.Dialog} */
const assetStrings = DialogTools.autoItemStrings(
    {
        CN: {
            Select: "选择斩标文字",
            无: "无",
            笨蛋: "笨蛋",
            母狗: "母狗",
            骚货: "骚货",
            肉便器: "肉便器",
        },
        EN: {
            Select: "Select Behead Marking Text",
            无: "None",
            笨蛋: "Fool",
            母狗: "Bitch",
            骚货: "Slut",
            肉便器: "Cum Dump",
        },
    },
    extended,
    {
        CN: (from, strings) =>
            from === "无"
                ? `SourceCharacter擦除了DestinationCharacterAssetName上的文字。`
                : `SourceCharacter在DestinationCharacterAssetName上写下了"${strings[from]}"`,
        EN: (from, strings) =>
            from === "无"
                ? `SourceCharacter erased the text on DestinationCharacter AssetName.`
                : `SourceCharacter wrote "${strings[from]}" on DestinationCharacter AssetName.`,
    }
);

const translation = { CN: "斩标", EN: "Behead Marking" };

export default function () {
    AssetManager.addAssetWithConfig("ItemMisc", asset, { extended, translation, layerNames, assetStrings });
    luziFixups("ItemMisc", asset.Name);
}

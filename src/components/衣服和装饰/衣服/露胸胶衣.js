import { AssetManager } from "../../../assetForward";
import { luziSuffixFixups } from "../../../lib/fixups";

/** @type {CustomAssetDefinition} */
const asset = {
    Name: "露胸胶衣",
    Random: false,
    Gender: "F",
    Top: 180,
    Left: 120,
    Expose: ["ItemNipples", "ItemNipplesPiercings", "ItemBreast"],
    DefaultColor: ["Default", "#000000", "Default", "#000000", "Default"],
    PoseMapping: { Hogtied: "Hogtied", AllFours: "Hide" },
    DynamicGroupName: "Cloth",
    Layer: [
        {
            Name: "衣服B2",
            Priority: 17,
            CopyLayerColor: "衣服A2",
            AllowTypes: { A: 1 },
        },
        {
            Name: "衣服B1",
            Priority: 16,
            CopyLayerColor: "衣服A1",
            AllowTypes: { A: 1 },
        },
        {
            Name: "衣服A2",
            Priority: 17,
            AllowTypes: { A: 0 },
        },
        {
            Name: "衣服A1",
            Priority: 16,
            AllowTypes: { A: 0 },
        },
        {
            Name: "皮带A2",
            Priority: 18,
            InheritPoseMappingFields: true,
            PoseMapping: { Hogtied: "Hide" },
        },
        {
            Name: "皮带A1",
            Priority: 17,
            InheritPoseMappingFields: true,
            PoseMapping: { Hogtied: "Hide" },
        },
        {
            Name: "扣子",
            Priority: 18,
            InheritPoseMappingFields: true,
            PoseMapping: { Hogtied: "Hide" },
        },
    ],
};

const layerNames = {
    CN: {
        衣服A2: "衣服底色",
        衣服A1: "衣服暗色调",
        皮带A2: "皮带底色",
        皮带A1: "皮带暗色调",
        扣子: "搭扣",
    },
    EN: {
        衣服A2: "Cloth Base Color",
        衣服A1: "Cloth Dark Tone",
        皮带A2: "Belt Base Color",
        皮带A1: "Belt Dark Tone",
        扣子: "Buckle",
    },
    RU: {
        衣服A2: "Цвет основы одежды",
        衣服A1: "Темный тон одежды",
        皮带A2: "Цвет основы пояса",
        皮带A1: "Темный тон пояса",
        扣子: "Застежка",
    },
};

/** @type {AssetArchetypeConfig} */
const extended = {
    Archetype: ExtendedArchetype.MODULAR,
    Modules: [
        {
            Name: "开裆",
            Key: "A",
            DrawImages: false,
            Options: [{}, {}],
        },
    ],
};

/** @type {CustomGroupName[]} */
const targetGroups = ["Cloth", "Suit", "Corset", "ItemTorso"];

const assetStrings = {
    CN: {
        SelectBase: "设置",
        Select开裆: "设置",
        Module开裆: "设置裆部",
        OptionA0: "封裆",
        OptionA1: "开裆",
        SetA0: "SourceCharacter将DestinationCharacterAssetName设置为封裆",
        SetA1: "SourceCharacter将DestinationCharacterAssetName设置为开裆",
    },
    EN: {
        SelectBase: "Settings",
        Select开裆: "Settings",
        Module开裆: "Set Crotch",
        OptionA0: "Closed Crotch",
        OptionA1: "Open Crotch",
        SetA0: "SourceCharacter sets DestinationCharacter AssetName to Closed Crotch",
        SetA1: "SourceCharacter sets DestinationCharacter AssetName to Open Crotch",
    },
    RU: {
        SelectBase: "Настройки",
        Select开裆: "Настройки",
        Module开裆: "Настройка промежности",
        OptionA0: "Закрытая промежность",
        OptionA1: "Открытая промежность",
    },
};

const translation = {
    CN: "露胸胶衣",
    EN: "Open-Chest Leotard",
    RU: "Открытый леотард",
};

export default function () {
    targetGroups.forEach((name) => {
        const nAsset = /** @type {CustomAssetDefinition} */ ({
            ...asset,
            ...(name === "ItemTorso" ? { Difficulty: 6, AllowLock: true, Time: 10 } : {}),
        });

        AssetManager.addAssetWithConfig(name, nAsset, {
            translation,
            layerNames,
            extended,
            assetStrings,
        });
    });

    luziSuffixFixups(targetGroups, asset.Name);
}

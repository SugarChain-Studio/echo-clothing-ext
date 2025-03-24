import { AssetManager } from "../../assetForward";
import { DialogTools } from "@mod-utils/Tools";

/** @type {CustomAssetDefinition} */
const asset = {
    Name: "露胸胶衣_Luzi",
    Random: false,
    Gender: "F",
    Top: 180,
    Left: 120,
    Expose: ["ItemNipples", "ItemNipplesPiercings", "ItemBreast"],
    DefaultColor: ["Default", "#000000", "Default", "#000000", "Default"],
    Layer: [
        {
            Name: "衣服B2",
            Priority: 15,
            PoseMapping: {
                Hogtied: "Hogtied",
                AllFours: "Hide",
            },
            CopyLayerColor: "衣服A2",
            AllowTypes: { A: 1 },
        },
        {
            Name: "衣服B1",
            Priority: 14,
            PoseMapping: {
                Hogtied: "Hogtied",
                AllFours: "Hide",
            },
            CopyLayerColor: "衣服A1",
            AllowTypes: { A: 1 },
        },
        {
            Name: "衣服A2",
            Priority: 15,
            PoseMapping: {
                Hogtied: "Hogtied",
                AllFours: "Hide",
            },
            AllowTypes: { A: 0 },
        },
        {
            Name: "衣服A1",
            Priority: 14,
            PoseMapping: {
                Hogtied: "Hogtied",
                AllFours: "Hide",
            },
            AllowTypes: { A: 0 },
        },
        {
            Name: "皮带A2",
            Priority: 17,
            PoseMapping: {
                Hogtied: "Hide",
                AllFours: "Hide",
            },
        },
        {
            Name: "皮带A1",
            Priority: 16,
            PoseMapping: {
                Hogtied: "Hide",
                AllFours: "Hide",
            },
        },
        {
            Name: "扣子",
            Priority: 18,
            PoseMapping: {
                Hogtied: "Hide",
                AllFours: "Hide",
            },
        },
    ],
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

const dialog = DialogTools.replicateGroupedItemDialog(targetGroups, ["露胸胶衣_Luzi"], {
    CN: {
        SelectBase: "设置",
        Select开裆: "设置",
        Module开裆: "设置裆部",
        OptionA0: "封裆",
        OptionA1: "开裆",
    },
    EN: {
        SelectBase: "Settings",
        Select开裆: "Settings",
        Module开裆: "Set Crotch",
        OptionA0: "Closed Crotch",
        OptionA1: "Open Crotch",
    },
    RU: {
        SelectBase: "Настройки",
        Select开裆: "Настройки",
        Module开裆: "Настройка промежности",
        OptionA0: "Закрытая промежность",
        OptionA1: "Открытая промежность",
    },
});

const translations = {
    CN: "露胸胶衣",
    EN: "Open-Chest Catsuit",
    RU: "Открытый кожаный костюм",
};

export default function () {
    targetGroups.forEach((name) => {
        const nAsset = /** @type {CustomAssetDefinition} */ ({
            ...asset,
            DynamicGroupName: "Cloth",
            ...(name === "ItemTorso" ? { Difficulty: 6, AllowLock: true, Time: 10 } : {}),
        });

        AssetManager.addAsset(name, nAsset, extended, translations);
    });
    AssetManager.addCustomDialog(dialog);
}

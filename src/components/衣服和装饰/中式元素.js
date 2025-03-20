import { AssetManager } from "../../assetForward";
import { DialogTools } from "@mod-utils/Tools";

/** @type {(Name:string, Priority:number) => CustomAssetDefinitionAppearance} */
const 茉莉花钿SharedAssetDefinition = (Name, Priority) => ({
    Name,
    Random: false,
    Top: 0,
    Left: 0,
    Priority,
    Layer: [
        { Name: "左茉莉花", AllowTypes: [{ typed: 0 }, { typed: 2 }] },
        { Name: "左线", AllowTypes: [{ typed: 0 }, { typed: 2 }] },
        { Name: "左莫桑石", AllowTypes: [{ typed: 0 }, { typed: 2 }] },
        { Name: "左流苏", AllowTypes: [{ typed: 0 }, { typed: 2 }] },
        { Name: "左金属片", AllowTypes: [{ typed: 0 }, { typed: 2 }] },

        { Name: "右茉莉花", AllowTypes: [{ typed: 1 }, { typed: 2 }] },
        { Name: "右线", AllowTypes: [{ typed: 1 }, { typed: 2 }] },
        { Name: "右莫桑石", AllowTypes: [{ typed: 1 }, { typed: 2 }] },
        { Name: "右流苏", AllowTypes: [{ typed: 1 }, { typed: 2 }] },
        { Name: "右金属片", AllowTypes: [{ typed: 1 }, { typed: 2 }] },
    ],
});

const 茉莉花钿1 = 茉莉花钿SharedAssetDefinition("茉莉花钿1", 55);
const 茉莉花钿2 = 茉莉花钿SharedAssetDefinition("茉莉花钿2", 40);

/** @type {(DynamicGroup?:CustomGroupName)=>CustomAssetDefinitionAppearance} */
const 假领子 = (DynamicGroupName) => ({
    Name: "假领子_Luzi",
    Random: false,
    Top: 0,
    Left: 0,
    MinOpacity: 0,
    EditOpacity: true,
    Priority: 18,
    ParentGroup: {},
    DynamicGroupName,
    Layer: [
        {
            Name: "衣服",
            PoseMapping: {
                Yoked: "Yoked",
                OverTheHead: "OverTheHead",
                AllFours: "Hide",
            },
        },
        {
            Name: "扣子",
            PoseMapping: {
                AllFours: "Hide",
            },
        },
    ],
});

/** @type {CustomGroupedAssetDefinitions} */
const assets = {
    Cloth: [假领子()],
    ClothAccessory: [假领子("Cloth")],
    HairAccessory1: [茉莉花钿1, 茉莉花钿2],
    HairAccessory3: [茉莉花钿1, 茉莉花钿2],
};

/** @type {TypedItemConfig} */
const 茉莉花钿SharedConfig = {
    Archetype: ExtendedArchetype.TYPED,
    DrawImages: false,
    Options: [{ Name: "左" }, { Name: "右" }, { Name: "两侧" }],
};

/** @type {ExtendedItemMainConfig} */
const extended = {
    HairAccessory1: {
        茉莉花钿1: 茉莉花钿SharedConfig,
        茉莉花钿2: 茉莉花钿SharedConfig,
    },
    HairAccessory3: {
        茉莉花钿1: 茉莉花钿SharedConfig,
        茉莉花钿2: 茉莉花钿SharedConfig,
    },
};

/** @type { Translation.GroupedEntries } */
const translations = {
    CN: {
        Cloth: {
            假领子_Luzi: "假领子",
        },
        ClothAccessory: {
            假领子_Luzi: "假领子",
        },
        HairAccessory1: {
            茉莉花钿1: "茉莉花钿 1",
            茉莉花钿2: "茉莉花钿 2",
        },
        HairAccessory3: {
            茉莉花钿1: "茉莉花钿 1",
            茉莉花钿2: "茉莉花钿 2",
        },
    },
    EN: {
        Cloth: {
            假领子_Luzi: "Fake Collar",
        },
        ClothAccessory: {
            假领子_Luzi: "Fake Collar",
        },
        HairAccessory1: {
            茉莉花钿1: "Jasmine Hairpin 1",
            茉莉花钿2: "Jasmine Hairpin 2",
        },
        HairAccessory3: {
            茉莉花钿1: "Jasmine Hairpin 1",
            茉莉花钿2: "Jasmine Hairpin 2",
        },
    },
    RU: {
        Cloth: {
            假领子_Luzi: "Поддельный воротник",
        },
        ClothAccessory: {
            假领子_Luzi: "Поддельный воротник",
        },
        HairAccessory1: {
            茉莉花钿1: "Жасминовая шпилька 1",
            茉莉花钿2: "Жасминовая шпилька 2",
        },
        HairAccessory3: {
            茉莉花钿1: "Жасминовая шпилька 1",
            茉莉花钿2: "Жасминовая шпилька 2",
        },
    },
};

const customDialog = DialogTools.replicateGroupedItemDialog(
    ["HairAccessory1", "HairAccessory3"],
    ["茉莉花钿1", "茉莉花钿2"],
    {
        CN: { Select: "选择花的位置", 左: "左", 右: "右", 两侧: "两侧" },
        EN: { Select: "Select flower position", 左: "Left", 右: "Right", 两侧: "Both" },
        RU: { Select: "Выберите положение цветка", 左: "Лево", 右: "Право", 两侧: "Оба" },
    }
);

export default function () {
    AssetManager.addGroupedAssets(assets, translations, extended);
    AssetManager.addCustomDialog(customDialog);
}

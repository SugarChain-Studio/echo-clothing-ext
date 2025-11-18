import { AssetManager } from "../../assetForward";
import { PoseMapTool } from "../../lib";
import { luziSuffixFixups } from "../../lib/fixups";

/** @type {(Name:string, config: Pick<CustomAssetDefinitionAppearance, 'Priority' | 'Top' | 'Left'> ) => CustomAssetDefinitionAppearance} */
const hairpinSharedDef = (Name, config) => ({
    Name,
    Random: false,
    ...config,
    Layer: [
        { Name: "左茉莉花", ColorGroup: "茉莉花", AllowTypes: [{ typed: 0 }, { typed: 2 }] },
        { Name: "左线", ColorGroup: "线", AllowTypes: [{ typed: 0 }, { typed: 2 }] },
        { Name: "左莫桑石", ColorGroup: "莫桑石", AllowTypes: [{ typed: 0 }, { typed: 2 }] },
        { Name: "左流苏", ColorGroup: "流苏", AllowTypes: [{ typed: 0 }, { typed: 2 }] },
        { Name: "左金属片", ColorGroup: "金属片", AllowTypes: [{ typed: 0 }, { typed: 2 }] },

        { Name: "右茉莉花", ColorGroup: "茉莉花", AllowTypes: [{ typed: 1 }, { typed: 2 }] },
        { Name: "右线", ColorGroup: "线", AllowTypes: [{ typed: 1 }, { typed: 2 }] },
        { Name: "右莫桑石", ColorGroup: "莫桑石", AllowTypes: [{ typed: 1 }, { typed: 2 }] },
        { Name: "右流苏", ColorGroup: "流苏", AllowTypes: [{ typed: 1 }, { typed: 2 }] },
        { Name: "右金属片", ColorGroup: "金属片", AllowTypes: [{ typed: 1 }, { typed: 2 }] },
    ],
});

/** @type {TypedItemConfig} */
const hairpinExtended = {
    Archetype: ExtendedArchetype.TYPED,
    DrawImages: false,
    Options: [{ Name: "左" }, { Name: "右" }, { Name: "两侧" }],
};

/** @type {Translation.String} */
const hairpinStrings = {
    CN: { Select: "选择花的位置", 左: "左", 右: "右", 两侧: "两侧" },
    EN: { Select: "Select flower position", 左: "Left", 右: "Right", 两侧: "Both" },
    RU: { Select: "Выберите положение цветка", 左: "Лево", 右: "Право", 两侧: "Оба" },
};

/** @type {AddAssetWithConfigParams[]} */
const assets = [
    [
        ["Cloth", "ClothAccessory"],
        {
            Name: "假领子",
            Random: false,
            Top: 0,
            Left: 0,
            MinOpacity: 0,
            EditOpacity: true,
            Priority: 18,
            ParentGroup: {},
            DynamicGroupName: "Cloth",
            PoseMapping: PoseMapTool.config(["Yoked", "OverTheHead"], ["AllFours"]),
            Layer: [{ Name: "衣服" }, { Name: "扣子", PoseMapping: PoseMapTool.config([], ["AllFours"]) }],
        },
        { translation: { CN: "假领子", EN: "Fake Collar" } },
    ],
    [
        ["HairAccessory1", "HairAccessory3"],
        hairpinSharedDef("茉莉花钿1", { Left: 160, Top: 80, Priority: 55 }),
        {
            translation: { CN: "茉莉花钿 1", EN: "Jasmine Hairpin 1" },
            extended: hairpinExtended,
            assetStrings: hairpinStrings,
        },
    ],
    [
        ["HairAccessory1", "HairAccessory3"],
        hairpinSharedDef("茉莉花钿2", { Left: 150, Top: 70, Priority: 40 }),
        {
            translation: { CN: "茉莉花钿 2", EN: "Jasmine Hairpin 2" },
            extended: hairpinExtended,
            assetStrings: hairpinStrings,
        },
    ],
];

export default function () {
    AssetManager.addAssetWithConfig(assets);
    for (const a of assets) {
        luziSuffixFixups(a[0], a[1].Name);
    }
}

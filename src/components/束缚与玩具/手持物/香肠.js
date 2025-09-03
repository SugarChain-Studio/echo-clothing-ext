import { AssetManager } from "../../../assetForward";
import { ArmMaskTool } from "../../../lib";

/** @type {CustomAssetDefinitionItem} */
const asset = {
    Name: "香肠",
    Random: false,
    Left: 160,
    Top: 300,
    Difficulty: -10,
    ParentGroup: {},
    Priority: 55,
    InheritPoseMappingFields: true,
    Layer: [{ Name: "B1" }, { Name: "A1", AllowTypes: { typed: 0 } }, { Name: "A2", AllowTypes: { typed: 1 } }],
};

const layerNames = {
    CN: {
        B1: "竹签",
        A1: "口味1",
        A2: "口味2",
    },
    EN: {
        B1: "Stick",
        A1: "Flavor 1",
        A2: "Flavor 2",
    },
};

const translation = {
    CN: "烤香肠",
    EN: "Grilled Sausage",
};

/** @type {TypedItemConfig} */
const extended = {
    Archetype: ExtendedArchetype.TYPED,
    Options: [{ Name: "1" }, { Name: "2" }],
};

const assetStrings = {
    CN: {
        Select: "选择烤香肠口味",
        1: "五香爆汁味",
        2: "烟熏蜜汁味",
        Set1: "SourceCharacter给了TargetCharacter一根五香爆汁味烤肠。",
        Set2: "SourceCharacter给了TargetCharacter一根烟熏蜜汁味烤肠。",
    },
    EN: {
        Select: "Select Grilled Sausage Flavor",
        1: "Five-Spice Juicy Flavor",
        2: "Smoky Honey Flavor",

        Set1: "SourceCharacter gave TargetCharacter a Five-Spice Juicy Flavor sausage.",
        Set2: "SourceCharacter gave TargetCharacter a Smoky Honey Flavor sausage.",
    },
};

export default function () {
    ArmMaskTool.createArmMaskForCloth("ItemHandheld", asset, "Right");
    AssetManager.addAssetWithConfig("ItemHandheld", asset, { translation, layerNames, extended, assetStrings });
}

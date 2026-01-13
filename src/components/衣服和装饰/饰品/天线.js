import { AssetManager } from "../../../../src/assetForward";

/** @type { CustomAssetDefinition } */
const asset = {
    Name: "天线",
    Random: false,
    Top: 0,
    Left: 0,
    ParentGroup: {},
    DefaultColor: ["#8F8F8F", "#000000", "#131313", "#5C0000", "#600000", "#8F8F8F", "#000000", "#131313", "#5C0000", "#600000"],
    Layer: [
        { Name: "A1", Priority: 55, AllowTypes: [{ typed: 0 }, { typed: 1 }, { typed: 4 }, { typed: 5 }] },
        { Name: "A2", Priority: 55, AllowTypes: [{ typed: 0 }, { typed: 1 }, { typed: 4 }, { typed: 5 }] },
        { Name: "A3", Priority: 55, AllowTypes: [{ typed: 0 }, { typed: 1 }, { typed: 4 }, { typed: 5 }] },
        { Name: "A4", Priority: 55, AllowTypes: [{ typed: 0 }, { typed: 1 }, { typed: 4 }, { typed: 5 }] },
        { Name: "A5", Priority: 55, AllowTypes: [{ typed: 1 }, { typed: 5 }] },

        { Name: "B1", Priority: 55, AllowTypes: [{ typed: 2 }, { typed: 3 }, { typed: 4 }, { typed: 5 }] },
        { Name: "B2", Priority: 55, AllowTypes: [{ typed: 2 }, { typed: 3 }, { typed: 4 }, { typed: 5 }] },
        { Name: "B3", Priority: 55, AllowTypes: [{ typed: 2 }, { typed: 3 }, { typed: 4 }, { typed: 5 }] },
        { Name: "B4", Priority: 55, AllowTypes: [{ typed: 2 }, { typed: 3 }, { typed: 4 }, { typed: 5 }] },
        { Name: "B5", Priority: 55, AllowTypes: [{ typed: 3 }, { typed: 5 }] },
    ],
};

const layerNames = {
    EN: {
        A1: "A1",
        A2: "A2",
        A3: "A3",
        A4: "A4",
        A5: "A5",
    },
};

/** @type {AssetArchetypeConfig} */
const extended = {
    Archetype: ExtendedArchetype.TYPED,
    DrawImages: false,
    Options: [
        { Name: "右" },
        { Name: "右发光" },
        { Name: "左" },
        { Name: "左发光" },
        { Name: "左右" },
        { Name: "左右发光" },
    ],
};

/** @type {Translation.Dialog} */
const assetStrings = {
    CN: {
        Select: "选择",
        右: "右",
        右发光: "右发光",
        左: "左",
        左发光: "左发光",
        左右: "左右",
        左右发光: "左右发光",

    },
    EN: {
        Select: "Select Pattern",
        右: "Right",
        右发光: "Right Glowing",
        左: "Left",
        左发光: "Left Glowing",
        左右: "Left Right",
        左右发光: "Left Right Glowing",
    },
};

const translation = {
    CN: "天线",
    EN: "Antenna",
};

export default function () {
    AssetManager.addAssetWithConfig("HairAccessory1", asset, { translation, layerNames, extended, assetStrings });
    AssetManager.addAssetWithConfig("HairAccessory3", asset, { translation, layerNames, extended, assetStrings });
}

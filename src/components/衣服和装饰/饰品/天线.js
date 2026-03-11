import { AssetManager } from "../../../../src/assetForward";
import { Typing } from "../../../lib";

/** @type { AddAssetWithConfigParams } */
const asset = [
    ["HairAccessory1", "HairAccessory3"],
    {
        Name: "天线",
        Random: false,
        Left: 170,
        Top: 10,
        ParentGroup: {},
        DefaultColor: [
            "#8F8F8F",
            "#000000",
            "#131313",
            "#5C0000",
            "#600000",
            "#8F8F8F",
            "#000000",
            "#131313",
            "#5C0000",
            "#600000",
        ],
        Priority: 55,
        Layer: [
            ...Typing.layerMap(
                [
                    { Name: "A1", ColorGroup: "主体" },
                    { Name: "A2", ColorGroup: "侧面" },
                    { Name: "A3", ColorGroup: "天线" },
                    { Name: "A4", ColorGroup: "灯" },
                ],
                (l) => ({ AllowTypes: [{ typed: 0 }, { typed: 1 }, { typed: 4 }, { typed: 5 }], ...l })
            ),
            { Name: "A5", AllowTypes: [{ typed: 1 }, { typed: 5 }], ColorGroup: "发光" },
            ...Typing.layerMap(
                [
                    { Name: "B1", ColorGroup: "主体" },
                    { Name: "B2", ColorGroup: "侧面" },
                    { Name: "B3", ColorGroup: "天线" },
                    { Name: "B4", ColorGroup: "灯" },
                ],
                (l) => ({ AllowTypes: [{ typed: 2 }, { typed: 3 }, { typed: 4 }, { typed: 5 }], ...l })
            ),
            { Name: "B5", AllowTypes: [{ typed: 3 }, { typed: 5 }], ColorGroup: "发光" },
        ],
    },
    {
        translation: { CN: "天线耳机", EN: "Antenna Headphone" },
        layerNames: {
            CN: {
                ...Typing.repeatEntries([["A1", "A2", "A3", "A4"], "右"]),
                ...Typing.repeatEntries([["B1", "B2", "B3", "B4"], "左"]),
            },
            EN: {
                ...Typing.repeatEntries([["A1", "A2", "A3", "A4"], "Right"]),
                ...Typing.repeatEntries([["B1", "B2", "B3", "B4"], "Left"]),
                主体: "Main",
                侧面: "Side",
                天线: "Antenna",
                灯: "Light",
            },
        },
        extended: {
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
        },
        assetStrings: {
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
        },
    },
];

export default function () {
    AssetManager.addAssetWithConfig(...asset);
}

/* eslint-disable no-unused-vars */

import { AssetManager } from "../../assetForward";

/** @type {CustomAssetDefinition} */
const asset = {
    Name: "A",
    Random: false,
    Gender: "F",
    Top: 0,
    Left: 0,
    ParentGroup: {},
    Hide: [],
    AllowActivePose: [],
    SetPose: [],
    PoseMapping: {
        Yoked: PoseType.DEFAULT,
    },
    DefaultColor: ["#FFFFF"],
    Layer: [
        { Name: "", Priority: 0 },
        {
            Name: "",
            Priority: 0,
            AllowTypes: { A: 0 },
            Alpha: [
                {
                    Group: [],
                    Masks: [[0, 0, 0, 0]],
                },
            ],
        },
    ],
};

/** @type {AssetArchetypeConfig} */
const extended = {
    Archetype: ExtendedArchetype.MODULAR,
    Modules: [
        {
            Name: "C",
            Key: "A",
            DrawImages: false,
            Options: [{}, {}],
        },
    ],
};

const descriptions = {
    CN: {
        ABSelectBase: "",
        ABSelectC: "",
        ABModuleC: "",
        ABOptionA0: "",
        ABOptionA1: "",
    },
    EN: {},
};

const translations = {
    CN: "",
    EN: "",
};

export default function () {
    // AssetManager.addAsset("B", asset, extended, translations);
    // AssetManager.addCustomDialog(descriptions);
}

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
        { Name: "Layer1", Priority: 0 },
        {
            Name: "Layer2",
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

const layerNames = {
    CN: {
        Layer1: "Layer 1",
        Layer2: "Layer 2",
    },
    EN: {},
};

const assetDialogs = {
    CN: {
        SelectBase: "",
        SelectC: "",
        ModuleC: "",
        OptionA0: "",
        OptionA1: "",
    },
    EN: {},
};

const description = {
    CN: "",
    EN: "",
};

export default function () {
    // AssetManager.addAssetWithConfig("Cloth", asset, {
    //     description,
    //     layerNames,
    //     extended,
    //     assetDialogs,
    // });
}

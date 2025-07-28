import { AssetManager } from "../../../assetForward";
import { Typing } from "../../../utils";

/** @type {CustomAssetDefinition} */
const asset = {
    Name: "连体衣_Luzi",
    Random: false,
    Top: 200,
    Left: 170,
    Priority: 14,
    DynamicGroupName: "Suit",
    Layer: [
        {
            Name: "1",
            PoseMapping: {
                AllFours: PoseType.HIDE,
                Hogtied: "Hogtied",
            },
        },
        {
            Name: "2",
            PoseMapping: {
                Hogtied: PoseType.HIDE,
                AllFours: PoseType.HIDE,
            },
        },
        {
            Name: "3",
            PoseMapping: {
                Hogtied: PoseType.HIDE,
                AllFours: PoseType.HIDE,
            },
        },
        {
            Name: "4",
            PoseMapping: {
                Hogtied: PoseType.HIDE,
                AllFours: PoseType.HIDE,
            },
        },
        {
            Name: "5",
            PoseMapping: {
                Hogtied: PoseType.HIDE,
                AllFours: PoseType.HIDE,
            },
        },
        {
            Name: "6",
            PoseMapping: {
                AllFours: PoseType.HIDE,
                Hogtied: "Hogtied",
            },
        },
    ],
};

/** @type {Translation.CustomRecord<string,string>} */
const layerNames = {
    CN: {
        1: "连体衣",
        2: "腰部内层",
        3: "腰部结构",
        4: "胸下内层",
        5: "胸下结构",
        6: "胸上结构",
    },
    EN: {
        1: "Suit",
        2: "Waist Inner Layer",
        3: "Waist Structure",
        4: "Under-Bra Inner Layer",
        5: "Under-Bra Structure",
        6: "Upper-Bra Structure",
    },
};

/** @type {Translation.Entry} */
const translation = {
    CN: "战斗服",
    EN: "Plugsuit",
};

export default function () {
    for (const group of Typing.groups(["Suit", "Cloth"])) {
        AssetManager.addAssetWithConfig(group, asset, { translation, layerNames });
    }
}

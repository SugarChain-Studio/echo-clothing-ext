import { AssetManager } from "../../assetForward";
import { DialogTools } from "@mod-utils/Tools";

/** @type {CustomAssetDefinition} */
const asset = {
    Name: "露胸胶衣_Luzi",
    Random: false,
    Gender: "F",
    Top: 0,
    Left: 0,
    ParentGroup: {},
    Priority: 10,
    DefaultColor: ["#FFFFFF"],
    Layer: [
        {
            Name: "扣子",
            PoseMapping: {
                TapedHands: PoseType.DEFAULT,
                Yoked: PoseType.DEFAULT,
                OverTheHead: PoseType.DEFAULT,
                BackBoxTie: PoseType.DEFAULT,
                BackElbowTouch: PoseType.DEFAULT,
                BackCuffs: PoseType.DEFAULT,
                Hogtied: "Hide",
                AllFours: "Hide",
            },
        },
        {
            Name: "皮带A1", PoseMapping: {
                TapedHands: PoseType.DEFAULT,
                Yoked: PoseType.DEFAULT,
                OverTheHead: PoseType.DEFAULT,
                BackBoxTie: PoseType.DEFAULT,
                BackElbowTouch: PoseType.DEFAULT,
                BackCuffs: PoseType.DEFAULT,
                Hogtied: "Hide",
                AllFours: "Hide",
            },
        },
        {
            Name: "皮带A2", PoseMapping: {
                TapedHands: PoseType.DEFAULT,
                Yoked: PoseType.DEFAULT,
                OverTheHead: PoseType.DEFAULT,
                BackBoxTie: PoseType.DEFAULT,
                BackElbowTouch: PoseType.DEFAULT,
                BackCuffs: PoseType.DEFAULT,
                Hogtied: "Hide",
                AllFours: "Hide",
            },
        },
        {
            Name: "衣服A1", PoseMapping: {
                TapedHands: PoseType.DEFAULT,
                Yoked: PoseType.DEFAULT,
                OverTheHead: PoseType.DEFAULT,
                BackBoxTie: PoseType.DEFAULT,
                BackElbowTouch: PoseType.DEFAULT,
                BackCuffs: PoseType.DEFAULT,
                Hogtied: "Hogtied",
                AllFours: "Hide",
            },
            AllowTypes: { A: 0 },
        },
        {
            Name: "衣服A2", PoseMapping: {
                TapedHands: PoseType.DEFAULT,
                Yoked: PoseType.DEFAULT,
                OverTheHead: PoseType.DEFAULT,
                BackBoxTie: PoseType.DEFAULT,
                BackElbowTouch: PoseType.DEFAULT,
                BackCuffs: PoseType.DEFAULT,
                Hogtied: "Hogtied",
                AllFours: "Hide",
            },
            AllowTypes: { A: 0 },
        },
        {
            Name: "衣服B1", PoseMapping: {
                TapedHands: PoseType.DEFAULT,
                Yoked: PoseType.DEFAULT,
                OverTheHead: PoseType.DEFAULT,
                BackBoxTie: PoseType.DEFAULT,
                BackElbowTouch: PoseType.DEFAULT,
                BackCuffs: PoseType.DEFAULT,
                Hogtied: "Hogtied",
                AllFours: "Hide",
            },
            AllowTypes: { A: 1 },
        },
        {
            Name: "衣服B2", PoseMapping: {
                TapedHands: PoseType.DEFAULT,
                Yoked: PoseType.DEFAULT,
                OverTheHead: PoseType.DEFAULT,
                BackBoxTie: PoseType.DEFAULT,
                BackElbowTouch: PoseType.DEFAULT,
                BackCuffs: PoseType.DEFAULT,
                Hogtied: "Hogtied",
                AllFours: "Hide",
            },
            AllowTypes: { A: 1 },
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

const dialog = DialogTools.replicateGroupedItemDialog(["Cloth"], ["露胸胶衣_Luzi"], {
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
    AssetManager.addAsset("Cloth", asset, extended, translations);
    AssetManager.addCustomDialog(dialog);
};
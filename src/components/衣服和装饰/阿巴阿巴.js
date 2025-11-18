import { AssetManager } from "../../assetForward";
import { luziFixups } from "../../lib/fixups";

/** @type {CustomAssetDefinition} */
const asset = {
    Name: "阿巴阿巴-Luzi",
    Random: false,
    Top: 0,
    Left: 0,
    Difficulty: -10,
    ParentGroup: {},
    Extended: true,
    Fetish: ["Sadism"],
    PoseMapping: {
        TapedHands: PoseType.DEFAULT,
        Yoked: "Hide",
        OverTheHead: "Hide",
        BackBoxTie: "Hide",
        BackElbowTouch: "Hide",
        BackCuffs: "Hide",
        AllFours: "Hide",
    },
    Layer: [
        {
            Name: "阿巴",
            Top: -110,
            Left: 0,
            AllowTypes: { typed: [1] },
        },
        {
            Name: "AK",
            Top: 0,
            Left: 0,
            AllowTypes: { typed: [2] },
        },
    ],
};

const layerNames = {
    CN: {
        阿巴: "阿巴阿巴",
        AK: "阿巴AK",
    },
    EN: {
        阿巴: "Aba Aba",
        AK: "Aba AK",
    },
};

const extended = {
    Archetype: ExtendedArchetype.TYPED,
    DrawImages: false,
    Options: [{ Name: "无" }, { Name: "阿巴阿巴" }, { Name: "阿巴AK" }],
};

/** @type {Translation.Dialog} */
const assetStrings = {
    CN: {
        Select: "选择阿巴阿巴配置",
        无: "无",
        阿巴阿巴: "阿巴阿巴",
        阿巴AK: "阿巴AK",

        Set无: "SourceCharacter移除了TargetCharacter的阿巴阿巴.",
        Set阿巴阿巴: "SourceCharacter给了TargetCharacter一个阿巴阿巴.",
        Set阿巴AK: "SourceCharacter给了TargetCharacter一个阿巴AK.",
    },
    EN: {
        Select: "Select Aba Aba",
        无: "None",
        阿巴阿巴: "Aba Aba",
        阿巴AK: "Aba AK",

        Set无: "SourceCharacter removed AbaAba from TargetCharacter.",
        Set阿巴阿巴: "SourceCharacter toggled AbaAba for TargetCharacter.",
        Set阿巴AK: "SourceCharacter toggled AbaAK for TargetCharacter.",
    },
};

const translation = { CN: "阿巴阿巴", EN: "Aba Aba" };

export default function () {
    AssetManager.addAssetWithConfig("ItemHandheld", asset, { extended, translation, layerNames, assetStrings });
    luziFixups("ItemHandheld", asset.Name);
}

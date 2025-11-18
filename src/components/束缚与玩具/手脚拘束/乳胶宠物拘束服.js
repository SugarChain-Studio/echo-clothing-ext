import { AssetManager } from "../../../assetForward";
import { luziSuffixFixups } from "../../../lib/fixups";

/** @type {AssetPoseMapping} */
const upper = { Kneel: "Kneel", KneelingSpread: "KneelingSpread", AllFours: "AllFours" };

/** @type {AssetPoseMapping} */
const lower = { Kneel: "Kneel", KneelingSpread: "KneelingSpread", AllFours: "Hide" };

/** @type {CustomAssetDefinition} */
const asset = {
    Name: "乳胶宠物拘束服",
    Random: false,
    Gender: "F",
    Top: 0,
    Left: 0,
    Difficulty: 12,
    SelfBondage: 8,
    Time: 40,
    RemoveTime: 30,
    AllowLock: true,
    AllowTighten: true,
    Fetish: ["Leather", "Pet"],
    Prerequisite: ["HasBreasts"],
    AllowActivePose: ["KneelingSpread", "BackElbowTouch", "AllFours"],
    SetPose: ["BackElbowTouch", "Kneel"],
    Effect: [E.Block, E.BlockWardrobe],
    Block: ["ItemHands", "ItemHandheld"],
    Layer: [
        { Name: "本体", PoseMapping: upper },
        { Name: "本体下", ParentGroup: "BodyLower", PoseMapping: lower, CopyLayerColor: "本体" },
        { Name: "束带", PoseMapping: upper },
        { Name: "束带下", ParentGroup: "BodyLower", PoseMapping: lower, CopyLayerColor: "束带" },
        { Name: "挂钩", PoseMapping: upper },
        { Name: "挂钩下", ParentGroup: "BodyLower", PoseMapping: lower, CopyLayerColor: "挂钩" },
        {
            Name: "锁",
            ParentGroup: {},
            PoseMapping: {},
            LockLayer: true,
        },
    ],
};

const translations = {
    CN: "乳胶宠物拘束服",
    EN: "Latex Pet Restraint Suit",
    RU: "Латексный комбинезон для ограничения питомца",
    UA: "Латексний комбінезон-обмежувач",
};

export default function () {
    AssetManager.addAsset("ItemArms", asset, undefined, translations);
    luziSuffixFixups(["ItemArms"], asset.Name);
}

import { AssetManager } from "../../assetForward";

/** @type { CustomAssetDefinition} */
const asset = {
    Name: "哥布哥布_Luzi",
    Random: false,
    Top: 580,
    Left: 250,
    Value: -1,
    Time: 15,
    Fetish: ["Metal"],
    Audio: "ChainLong",
    AllowLock: true,
    Effect: [E.Tethered, E.IsChained, E.MapImmobile],
    Prerequisite: ["Collared", "NotSuspended", "NotMounted"],
    ExpressionTrigger: [
        { Name: "Medium", Group: "Blush", Timer: 15 },
        { Name: "Soft", Group: "Eyebrows", Timer: 5 },
    ],
    FixedPosition: true,
    Layer: [
        {
            Name: "哥布林",
            AllowColorize: false,
            Priority: 55,
        },
        {
            Top: 0,
            Left: 0,
            Name: "链条",
            Priority: 55,
            PoseMapping: {
                AllFours: "AllFours",
                Hogtied: "Hogtied",
                Kneel: "Kneel",
                KneelingSpread: "Kneel",
                Suspension: PoseType.HIDE,
            },
        },
    ],
};

const layerNames = {
    EN: {
        哥布林: "Goblin",
        链条: "Chain",
    },
};

const translation = {
    CN: "哥布哥布",
    EN: "Goblin Statue",
};

export default function () {
    AssetManager.addAssetWithConfig("ItemNeckRestraints", asset, { translation, layerNames });
}

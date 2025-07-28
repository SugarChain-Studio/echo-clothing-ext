import { AssetManager } from "../../../assetForward";

/** @type {CustomAssetDefinition} */
const asset = {
    Name: "呆毛",
    Random: false,
    Top: 0,
    Left: 150,
    Priority: 54,
    Extended: true,
    ParentGroup: {},
    InheritColor: "HairFront",
    Layer: [
        { Name: "1", AllowTypes: { typed: 0 } },
        { Name: "1a", AllowTypes: { typed: 1 } },
        { Name: "2", AllowTypes: { typed: 2 } },
        { Name: "3", AllowTypes: { typed: 3 } },
        { Name: "4", AllowTypes: { typed: 4 } },
        { Name: "5", AllowTypes: { typed: 5 } },
        { Name: "6", AllowTypes: { typed: 6 } },
        { Name: "7", AllowTypes: { typed: 7 }, Left: 50 },
        { Name: "8", AllowTypes: { typed: 8 }, Left: 50, Priority: 51 },
        { Name: "9", AllowTypes: { typed: 9 }, Left: 50 },
        { Name: "10", AllowTypes: { typed: 10 }, Left: 50 },
    ],
};

/** @type {TypedItemConfig} */
const extended = {
    Archetype: ExtendedArchetype.TYPED,
    DrawImages: false,
    Options: [
        { Name: "1" },
        { Name: "1a" },
        { Name: "2" },
        { Name: "3" },
        { Name: "4" },
        { Name: "5" },
        { Name: "6" },
        { Name: "7" },
        { Name: "8" },
        { Name: "9" },
        { Name: "10" },
    ],
};

/** @type {Translation.Dialog} */
const assetStrings = {
    CN: {
        额外头发_Luzi呆毛Select: "设置",
        额外头发_Luzi呆毛1: "1",
        额外头发_Luzi呆毛1a: "1a",
        额外头发_Luzi呆毛2: "2",
        额外头发_Luzi呆毛3: "3",
        额外头发_Luzi呆毛4: "4",
        额外头发_Luzi呆毛5: "5",
        额外头发_Luzi呆毛6: "6",
        额外头发_Luzi呆毛7: "7",
        额外头发_Luzi呆毛8: "8",
        额外头发_Luzi呆毛9: "9",
        额外头发_Luzi呆毛10: "10",
    },
    EN: {
        额外头发_Luzi呆毛Select: "Select",
        额外头发_Luzi呆毛1: "1",
        额外头发_Luzi呆毛1a: "1a",
        额外头发_Luzi呆毛2: "2",
        额外头发_Luzi呆毛3: "3",
        额外头发_Luzi呆毛4: "4",
        额外头发_Luzi呆毛5: "5",
        额外头发_Luzi呆毛6: "6",
        额外头发_Luzi呆毛7: "7",
        额外头发_Luzi呆毛8: "8",
        额外头发_Luzi呆毛9: "9",
        额外头发_Luzi呆毛10: "10",
    },
    UA: {
        额外头发_Luzi呆毛Select: "Виберіть кількість знаків",
        额外头发_Luzi呆毛1: "1",
        额外头发_Luzi呆毛1a: "1a",
        额外头发_Luzi呆毛2: "2",
        额外头发_Luzi呆毛3: "3",
        额外头发_Luzi呆毛4: "4",
        额外头发_Luzi呆毛5: "5",
        额外头发_Luzi呆毛6: "6",
        额外头发_Luzi呆毛7: "7",
        额外头发_Luzi呆毛8: "8",
        额外头发_Luzi呆毛9: "9",
        额外头发_Luzi呆毛10: "10",
    },
};

const translation = {
    CN: "呆毛",
    EN: "Ahoge",
    RU: "Ахоге",
    UA: "Ахоге",
};

export default function () {
    AssetManager.addAssetWithConfig("额外头发_Luzi", asset, {
        translation,
        layerNames: {},
        extended,
        assetStrings,
    });
}

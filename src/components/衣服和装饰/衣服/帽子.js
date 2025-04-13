import { AssetManager } from "../../../assetForward";

/** @type { CustomGroupedAssetDefinitions }} */
const assets = {
    Hat: [
        {
            Name: "冕旒_Luzi",
            Random: false,
            Top: -18,
            Left: 0,
            Priority: 55,
            DefaultColor: ["##660606", "#000000", "#C18A34", "#CFAC68"],
            Layer: [
                { Name: "帽顶" },
                { Name: "帽身" },
                { Name: "纹样" },
                { Name: "帽帘" },
            ],
        },
        {
            Name: "狐狸面具",
            Random: false,
            Top: 0,
            Left: 0,
            Priority: 55,
            DefaultColor: ["Default", "#FFF260", "#3E5FBB", "#F83A3A"],
            Layer: [
                { Name: "底" },
                { Name: "眼白" },
                { Name: "瞳孔" },
                { Name: "涂色" },
            ],
        },
        {
            Name: "帽子2_Luzi",
            Random: false,
            Top: 0,
            Left: 0,
            Priority: 1,
            DefaultColor: ["Default", "#302D2D", "#302D2D", "#302D2D",],
            Layer: [
                { Name: "A1" },
                { Name: "A2" },
                { Name: "A3" },
                { Name: "A4" },
            ],
        },
    ],
};

/** @type { Translation.GroupedEntries } */
const translations = {
    CN: {
        Hat: {
            冕旒_Luzi: "冕旒",
            狐狸面具: "狐狸面具",
        },
    },
    EN: {
        Hat: {
            冕旒_Luzi: "Mian Liu",
            狐狸面具: "Fox Mask",
        },
    },
    RU: {
        Hat: {
            冕旒_Luzi: "Миан Лю",
            狐狸面具: "маска лисы",
        },
    },
};

export default function () {
    AssetManager.addGroupedAssets(assets, translations);
}

import { AssetManager } from "../../../assetForward";

/** @type { CustomGroupedAssetDefinitions }} */
const assets = {
    Hat: [
        {
            Name: "冕旒_Luzi",
            Random: false,
            Left: 0,
            Top: -18,
            Priority: 55,
            DefaultColor: ["#660606", "#000000", "#C18A34", "#CFAC68"],
            Layer: [{ Name: "帽顶" }, { Name: "帽身" }, { Name: "纹样" }, { Name: "帽帘" }],
        },
        {
            Name: "狐狸面具",
            Random: false,
            Left: 0,
            Top: 0,
            Priority: 55,
            DefaultColor: ["Default", "#FFF260", "#3E5FBB", "#F83A3A"],
            Layer: [{ Name: "底" }, { Name: "眼白" }, { Name: "瞳孔" }, { Name: "涂色" }],
        },
        {
            Name: "帽子2_Luzi",
            Random: false,
            Left: 160,
            Top: 20,
            Priority: 7,
            DefaultColor: ["#FFB1B1", "#FFB1B1", "#856757", "#5A4A41"],
            Layer: [{ Name: "A1" }, { Name: "A2" }, { Name: "A3" }, { Name: "A4" }],
        },
    ],
};

/** @type { Translation.GroupedEntries } */
const translations = {
    CN: {
        Hat: {
            冕旒_Luzi: "冕旒",
            狐狸面具: "狐狸面具",
            帽子2_Luzi: "邦尼特帽",
        },
    },
    EN: {
        Hat: {
            冕旒_Luzi: "Mian Liu",
            狐狸面具: "Fox Mask",
            帽子2_Luzi: "Bonnet Colonial Hat",
        },
    },
    RU: {
        Hat: {
            冕旒_Luzi: "Миан Лю",
            狐狸面具: "маска лисы",
        },
    },
};

const groupedLayerNames = {
    CN: {
        Hat: {
            冕旒_Luzi: {
                帽顶: "帽顶",
                帽身: "帽身",
                纹样: "纹样",
                帽帘: "帽帘",
            },
            狐狸面具: {
                底: "底",
                眼白: "眼白",
                瞳孔: "瞳孔",
                涂色: "涂色",
            },
            帽子2_Luzi: {
                A1: "左侧花",
                A2: "右侧花",
                A3: "帽边沿",
                A4: "内衬",
            },
        },
    },
    EN: {
        Hat: {
            冕旒_Luzi: {
                帽顶: "Hat Top",
                帽身: "Hat Body",
                纹样: "Pattern",
                帽帘: "Hat Curtain",
            },
            狐狸面具: {
                底: "Base",
                眼白: "White Eye",
                瞳孔: "Pupil",
                涂色: "Coloring",
            },
            帽子2_Luzi: {
                A1: "Left Flower",
                A2: "Right Flower",
                A3: "Hat Edge",
                A4: "Lining",
            },
        },
    },
};

export default function () {
    AssetManager.addGroupedAssetsWithConfig(assets, translations, groupedLayerNames);
}

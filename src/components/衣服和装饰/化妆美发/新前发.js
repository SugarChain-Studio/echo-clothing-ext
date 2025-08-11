import { AssetManager } from "../../../assetForward";

/** @type {Partial<CustomAssetDefinitionAppearance>} */
const 前发shared = {
    Random: false,
    Priority: 52,
    ParentGroup: {},
    Extended: false,
    InheritColor: "HairFront",
    Hide: ["HairFront"],
};

/** @type { CustomGroupedAssetDefinitions }} */
const assets = {
    新前发_Luzi: [
        { Name: "前发1", Left: 50, Top: 0, ...前发shared },
        { Name: "前发2", Left: 50, Top: 0, ...前发shared },
        { Name: "前发3", Left: 50, Top: 0, ...前发shared },
        { Name: "前发4", Left: 50, Top: 0, ...前发shared },
        { Name: "前发5", Left: 50, Top: 0, ...前发shared },
        { Name: "前发6", Left: 0, Top: 0, ...前发shared },
        { Name: "前发7", Left: 0, Top: 0, ...前发shared },
        {
            Name: "前发8",
            Left: 0,
            Top: 0,
            ...前发shared,
            Layer: [{ Name: "底" }, { Name: "高光" }],
        },
        { Name: "前发9", Left: 0, Top: 0, ...前发shared },
        { Name: "前发10", Left: 0, Top: 0, ...前发shared },
        {
            Name: "前发11",
            Left: 0,
            Top: 0,
            ...前发shared,
            Layer: [{ Name: "底" }, { Name: "高光" }],
        },
        {
            Name: "前发12",
            Left: 50,
            Top: 0,
            ...前发shared,
            Layer: [{ Name: "前" }, { Name: "后", Priority: 5 }],
        },
        { Name: "前发13", Left: 50, Top: 0, ...前发shared },
        { Name: "前发14", Left: 50, Top: 0, ...前发shared },
        { Name: "前发15", Left: 50, Top: 0, ...前发shared },
        { Name: "前发16", Left: 50, Top: 0, ...前发shared },
        { Name: "前发17", Left: 50, Top: 0, ...前发shared },
        { Name: "前发18", Left: 50, Top: 0, ...前发shared },
        { Name: "前发19", Left: 50, Top: 0, ...前发shared },
        { Name: "前发20", Left: 0, Top: 0, ...前发shared },
        { Name: "前发21", Left: 0, Top: 0, ...前发shared },
        { Name: "前发22", Left: 0, Top: 0, ...前发shared },
        { Name: "前发23", Left: 0, Top: 0, ...前发shared },
        { Name: "前发24", Left: 0, Top: 0, ...前发shared },
        {
            Name: "前发25",
            Left: 0,
            Top: 0,
            ...前发shared,
            Layer: [{ Name: "底" }, { Name: "高光" }],
        },
        {
            Name: "前发26",
            Left: 0,
            Top: 0,
            ...前发shared,
            Layer: [{ Name: "底" }, { Name: "高光" }],
        },
        {
            Name: "前发27",
            Left: 0,
            Top: 0,
            ...前发shared,
            Layer: [{ Name: "底" }, { Name: "高光" }],
        },
        { Name: "卷发1", Left: 0, Top: 0, ...前发shared },
        { Name: "卷发2", Left: 0, Top: 0, ...前发shared },
        { Name: "卷发3", Left: 0, Top: 0, ...前发shared },
        ...["前发28", "前发29", "前发30", "前发31", "前发32", "前发33_L", "前发33_R"].map((Name) => ({
            Name,
            Left: 150,
            Top: 60,
            ...前发shared,
        })),
    ],
};

const 前发数量 = 33;

/** @type { (func: (idx: number) => string) => Record<string,string> } */
const genTrans = (func) => Object.fromEntries(Array.from({ length: 前发数量 }, (_, i) => [`前发${i + 1}`, func(i)]));

/** @type { Translation.GroupedEntries } */
const translations = {
    CN: {
        新前发_Luzi: {
            ...genTrans((i) => `前发 ${i + 1}`),
            卷发1: "卷发 1",
            卷发2: "卷发 2",
            卷发3: "卷发 3",
            前发33_L: "前发 33A",
            前发33_R: "前发 33B",
        },
    },
    EN: {
        新前发_Luzi: {
            ...genTrans((i) => `Front Hair ${i + 1}`),
            卷发1: "Curly Hair 1",
            卷发2: "Curly Hair 2",
            卷发3: "Curly Hair 3",
            前发33_L: "Front Hair 33A",
            前发33_R: "Front Hair 33B",
        },
    },
};

export default function () {
    AssetManager.addGroupedAssets(assets, translations);
}

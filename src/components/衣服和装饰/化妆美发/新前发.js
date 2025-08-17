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

const 前发X50Y0 = { Left: 50, Top: 0, ...前发shared };

/**
 * 创建前发发型，注意使用这个方法创建的前发必须以 [50, 0] 作为左上角
 * @param {string} name 资源名称
 * @param {Partial<CustomAssetDefinitionAppearance>} [args] 额外补充其他资源参数
 * @returns {CustomAssetDefinitionAppearance}
 */
const makeFH = (name, args) => ({ Name: name, ...前发X50Y0, ...args });

/** @type { CustomGroupedAssetDefinitions }} */
const assets = {
    新前发_Luzi: [
        makeFH("前发1"),
        makeFH("前发2"),
        makeFH("前发3"),
        makeFH("前发4"),
        makeFH("前发5"),
        makeFH("前发6"),
        makeFH("前发7"),
        makeFH("前发8", { Layer: [{ Name: "底" }, { Name: "高光" }] }),
        makeFH("前发9"),
        makeFH("前发10"),
        makeFH("前发11", { Layer: [{ Name: "底" }, { Name: "高光" }] }),
        makeFH("前发12", { Layer: [{ Name: "前" }, { Name: "后", Priority: 5 }] }),
        makeFH("前发13"),
        makeFH("前发14"),
        makeFH("前发15"),
        makeFH("前发16"),
        makeFH("前发17"),
        makeFH("前发18"),
        makeFH("前发19"),
        makeFH("前发20"),
        makeFH("前发21"),
        makeFH("前发22"),
        makeFH("前发23"),
        makeFH("前发24"),
        makeFH("前发25", { Layer: [{ Name: "底" }, { Name: "高光" }] }),
        makeFH("前发26", { Layer: [{ Name: "底" }, { Name: "高光" }] }),
        makeFH("前发27", { Layer: [{ Name: "底" }, { Name: "高光" }] }),
        makeFH("卷发1"),
        makeFH("卷发2"),
        makeFH("卷发3"),
        makeFH("前发28"),
        makeFH("前发29"),
        makeFH("前发30"),
        makeFH("前发31"),
        makeFH("前发32"),
        makeFH("前发33_L"),
        makeFH("前发33_R"),
        makeFH("前发34A"),
        makeFH("前发34B"),
        makeFH("前发35"),
        makeFH("前发36"),
        makeFH("前发37A"),
        makeFH("前发37B"),
        makeFH("前发38"),
        makeFH("前发39"),
        makeFH("前发40"),
        makeFH("前发41"),
        makeFH("前发42"),
        makeFH("前发43"),
        makeFH("前发44"),
        makeFH("前发45"),
        makeFH("前发46", { Layer: [{ Name: "底" }, { Name: "高光" }] }),
        makeFH("前发47", { Layer: [{ Name: "底" }, { Name: "高光" }] }),
        makeFH("前发48", { Layer: [{ Name: "底" }, { Name: "高光" }] }),
        makeFH("前发49", { Layer: [{ Name: "底" }, { Name: "高光" }] }),
        makeFH("前发50", { Layer: [{ Name: "底" }, { Name: "高光" }] }),
        makeFH("前发51", { Layer: [{ Name: "底" }, { Name: "高光" }] }),
    ],
};

const 前发数量 = assets.新前发_Luzi.length;

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
            前发34A: "前发 34A",
            前发34B: "前发 34B",
            前发37A: "前发 37A",
            前发37B: "前发 37B",
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
            前发34A: "Front Hair 34A",
            前发34B: "Front Hair 34B",
            前发37A: "Front Hair 37A",
            前发37B: "Front Hair 37B",
        },
    },
};

export default function () {
    AssetManager.addGroupedAssets(assets, translations);
}

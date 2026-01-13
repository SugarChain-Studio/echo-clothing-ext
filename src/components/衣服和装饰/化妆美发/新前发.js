import { AssetManager } from "../../../assetForward";

/** @type {Partial<CustomAssetDefinitionAppearance>} */
const 前发shared = {
    Random: false,
    Priority: 52,
    ParentGroup: {},
    Extended: false,
    InheritColor: "HairFront",
};

const 前发X50Y0 = { Left: 50, Top: 0, ...前发shared };

/**
 * @param {string} name 资源名称
 * @param {Partial<CustomAssetDefinitionAppearance>} [defs] 额外补充其他资源参数
 * @param {Partial<Pick<AddAssetWithConfigParamsNoGroup[1], 'translation'| 'layerNames'>>} [option] 语言翻译
 * @returns {AddAssetWithConfigParamsNoGroup}
 */
const makeFH = (name, defs, option) => [
    { Name: name, ...前发X50Y0, ...defs },
    {
        translation:
            option?.translation ??
            (() => {
                const tail = name.match(/\d+$/)?.[0] ?? name;
                return {
                    CN: `前发 ${tail}`,
                    EN: `Front Hair ${tail}`,
                };
            })(),
        layerNames: option?.layerNames ?? {},
    },
];

/** @type {AddAssetWithConfigParamsNoGroup[]}} */
const assets = [
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
    makeFH("前发33_L", {}, { translation: { CN: "前发 33A", EN: "Front Hair 33A" } }),
    makeFH("前发33_R", {}, { translation: { CN: "前发 33B", EN: "Front Hair 33B" } }),
    makeFH("前发34A", {}, { translation: { CN: "前发 34A", EN: "Front Hair 34A" } }),
    makeFH("前发34B", {}, { translation: { CN: "前发 34B", EN: "Front Hair 34B" } }),
    makeFH("前发35"),
    makeFH("前发36"),
    makeFH("前发37A", {}, { translation: { CN: "前发 37A", EN: "Front Hair 37A" } }),
    makeFH("前发37B", {}, { translation: { CN: "前发 37B", EN: "Front Hair 37B" } }),
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
    makeFH("前发52", { Layer: [{ Name: "底" }, { Name: "渐变" }, { Name: "高光" }] }),
];

export default function () {
    AssetManager.addAssetWithConfig("新前发_Luzi", assets);
}

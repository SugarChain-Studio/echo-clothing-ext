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
    makeFH("前发1", { Layer: [{ Name: "底" }, { Name: "高光" }] }),
    makeFH("前发2", { Layer: [{ Name: "底" }, { Name: "高光" }] }),
    makeFH("前发3", { Layer: [{ Name: "底" }, { Name: "高光" }] }),
    makeFH("前发4", { Layer: [{ Name: "底" }, { Name: "高光" }] }),
    makeFH("前发5", { Layer: [{ Name: "底" }, { Name: "高光" }] }),
    makeFH("前发6", { Layer: [{ Name: "底" }, { Name: "高光" }] }),
    makeFH("前发7", { Layer: [{ Name: "底" }, { Name: "高光" }] }),
    makeFH("前发8", { Layer: [{ Name: "底" }, { Name: "高光" }] }),
    makeFH("前发9", { Layer: [{ Name: "底" }, { Name: "高光" }] }),
    makeFH("前发10", { Layer: [{ Name: "底" }, { Name: "高光" }] }),
    makeFH("前发11", { Layer: [{ Name: "底" }, { Name: "高光" }] }),
    makeFH("前发12", { Layer: [{ Name: "底" }, { Name: "高光" }, { Name: "后", Priority: 5 }] }),
    makeFH("前发13", { Layer: [{ Name: "底" }, { Name: "高光" }] }),
    makeFH("前发14", { Layer: [{ Name: "底" }, { Name: "高光" }] }),
    makeFH("前发15", { Layer: [{ Name: "底" }, { Name: "高光" }] }),
    makeFH("前发16", { Layer: [{ Name: "底" }, { Name: "高光" }] }),
    makeFH("前发17", { Layer: [{ Name: "底" }, { Name: "高光" }] }),
    makeFH("前发18", { Layer: [{ Name: "底" }, { Name: "高光" }] }),
    makeFH("前发19", { Layer: [{ Name: "底" }, { Name: "高光" }] }),
    makeFH("前发20", { Layer: [{ Name: "底" }, { Name: "高光" }] }),
    makeFH("前发21", { Layer: [{ Name: "底" }, { Name: "高光" }] }),
    makeFH("前发22", { Layer: [{ Name: "底" }, { Name: "高光" }] }),
    makeFH("前发23", { Layer: [{ Name: "底" }, { Name: "高光" }] }),
    makeFH("前发24", { Layer: [{ Name: "底" }, { Name: "高光" }] }),
    makeFH("前发25", { Layer: [{ Name: "底" }, { Name: "高光" }] }),
    makeFH("前发26", { Layer: [{ Name: "底" }, { Name: "高光" }] }),
    makeFH("前发27", { Layer: [{ Name: "底" }, { Name: "高光" }] }),
    makeFH("卷发1", { Layer: [{ Name: "底" }, { Name: "高光" }] }),
    makeFH("卷发2", { Layer: [{ Name: "底" }, { Name: "高光" }] }),
    makeFH("卷发3", { Layer: [{ Name: "底" }, { Name: "高光" }] }),
    makeFH("前发28", { Layer: [{ Name: "底" }, { Name: "高光" }] }),
    makeFH("前发29", { Layer: [{ Name: "底" }, { Name: "高光" }] }),
    makeFH("前发30", { Layer: [{ Name: "底" }, { Name: "高光" }] }),
    makeFH("前发31", { Layer: [{ Name: "底" }, { Name: "高光" }] }),
    makeFH("前发32", { Layer: [{ Name: "底" }, { Name: "高光" }] }),
    makeFH("前发33_L", { Layer: [{ Name: "底" }, { Name: "高光" }] }, { translation: { CN: "前发 33A", EN: "Front Hair 33A" } }),
    makeFH("前发33_R", { Layer: [{ Name: "底" }, { Name: "高光" }] }, { translation: { CN: "前发 33B", EN: "Front Hair 33B" } }),
    makeFH("前发34A", { Layer: [{ Name: "底" }, { Name: "高光" }] }, { translation: { CN: "前发 34A", EN: "Front Hair 34A" } }),
    makeFH("前发34B", { Layer: [{ Name: "底" }, { Name: "高光" }] }, { translation: { CN: "前发 34B", EN: "Front Hair 34B" } }),
    makeFH("前发35", { Layer: [{ Name: "底" }, { Name: "高光" }] }),
    makeFH("前发36", { Layer: [{ Name: "底" }, { Name: "高光" }] }),
    makeFH("前发37A", { Layer: [{ Name: "底" }, { Name: "高光" }] }, { translation: { CN: "前发 37A", EN: "Front Hair 37A" } }),
    makeFH("前发37B", { Layer: [{ Name: "底" }, { Name: "高光" }] }, { translation: { CN: "前发 37B", EN: "Front Hair 37B" } }),
    makeFH("前发38", { Layer: [{ Name: "底" }, { Name: "高光" }] }),
    makeFH("前发39", { Layer: [{ Name: "底" }, { Name: "高光" }] }),
    makeFH("前发40", { Layer: [{ Name: "底" }, { Name: "高光" }] }),
    makeFH("前发41", { Layer: [{ Name: "底" }, { Name: "高光" }] }),
    makeFH("前发42", { Layer: [{ Name: "底" }, { Name: "高光" }] }),
    makeFH("前发43", { Layer: [{ Name: "底" }, { Name: "高光" }] }),
    makeFH("前发44", { Layer: [{ Name: "底" }, { Name: "高光" }] }),
    makeFH("前发45", { Layer: [{ Name: "底" }, { Name: "高光" }] }),
    makeFH("前发46", { Layer: [{ Name: "底" }, { Name: "高光" }] }),
    makeFH("前发47", { Layer: [{ Name: "底" }, { Name: "高光" }] }),
    makeFH("前发48", { Layer: [{ Name: "底" }, { Name: "高光" }] }),
    makeFH("前发49", { Layer: [{ Name: "底" }, { Name: "高光" }] }),
    makeFH("前发50", { Layer: [{ Name: "底" }, { Name: "高光" }] }),
    makeFH("前发51", { Layer: [{ Name: "底" }, { Name: "高光" }] }),
    makeFH("前发52", { Layer: [{ Name: "底" }, { Name: "渐变" }, { Name: "高光" }] }),
    makeFH("前发53", { Layer: [{ Name: "底" }, { Name: "高光" }] }),
    makeFH("前发54", { Layer: [{ Name: "底" }, { Name: "高光" }] }),
    makeFH("前发55", { Layer: [{ Name: "底" }, { Name: "高光" }] }),
    makeFH("前发56", { Layer: [{ Name: "底" }, { Name: "高光" }] }),
    makeFH("前发57", { Layer: [{ Name: "底" }, { Name: "高光" }, { Name: "底2", Priority: 56  }] }),
    makeFH("前发58", { Layer: [{ Name: "底" }, { Name: "高光" }, { Name: "底2", Priority: 45 }] }),
    makeFH("前发59", { Layer: [{ Name: "底" }, { Name: "高光" }, { Name: "底2", Priority: 39 }, { Name: "底3", Priority: 52 }] }),

];

export default function () {
    AssetManager.addAssetWithConfig("新前发_Luzi", assets);
}

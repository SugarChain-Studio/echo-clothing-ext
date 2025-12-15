import { ImageMapTools } from "@mod-utils/Tools";
import { AssetManager } from "../../../assetForward";
import { AfterAssetOverrides, PoseMapTool, Typing } from "../../../lib";
import { HookManager } from "@sugarch/bc-mod-hook-manager";

/** @type {AddAssetWithConfigParams[]} */
const asset = [
    [
        "Suit",
        {
            Name: "马油袜",
            Random: false,
            Top: 0,
            Left: 0,
            DefaultColor: [
                "#111111",
                "#111111",
                "#251515",
                "#251515",
                "#251515",
                "#000000",
                "#111111",
                "#000000",
                "#000000",
                "#000000",
                "#000000",
                "#000000",
                "#000000",
                "#000000",
                "#000000",
                "#000000",
                "#000000",
                "#000000",
                "#000000",
                "#FFFFFF",
                "#FFFFFF",
                "#FFFFFF",
                "#FFFFFF",
                "#FFFFFF",
                "#FFFFFF",
                "#FFFFFF",
                "#FFFFFF",
                "#FFFFFF",
            ],
            Layer: [
                { Name: "Z1" }, // 身体色晕
                { Name: "A1" }, // 底色
                { Name: "A2", ColorGroup: "Shade1" }, // 身体曲线暗色
                { Name: "A3", ColorGroup: "Shade1" },
                { Name: "A4", ColorGroup: "Shade1" },
                { Name: "B1" }, // 边缘线
                { Name: "B2" }, // 边缘暗色
                { Name: "C1", ColorGroup: "BS" }, // 身体暗色细节
                { Name: "C2", ColorGroup: "BS" },
                { Name: "C3", ColorGroup: "BS" },
                { Name: "C4", ColorGroup: "BS" },
                { Name: "C5", ColorGroup: "BS" },
                { Name: "C6", ColorGroup: "BS" },
                { Name: "C7", ColorGroup: "BS" },
                { Name: "C8", ColorGroup: "BS" },
                { Name: "C9", ColorGroup: "BS" },
                { Name: "C10", ColorGroup: "BS" },
                { Name: "C11", ColorGroup: "BS" },
                { Name: "C12", ColorGroup: "BS" },
                { Name: "D1", ColorGroup: "HL" }, // 身体高光细节
                { Name: "D2", ColorGroup: "HL" },
                { Name: "D3", ColorGroup: "HL" },
                { Name: "D4", ColorGroup: "HL" },
                { Name: "D5", ColorGroup: "HL" },
                { Name: "D6", ColorGroup: "HL" },
                { Name: "D7", ColorGroup: "HL" },
                ...Typing.layerMap(
                    [
                        { Name: "E1", CopyLayerColor: "A1" },
                        { Name: "F1", CopyLayerColor: "B1" },
                        { Name: "F2", CopyLayerColor: "B2" },
                        { Name: "G1", ColorGroup: "HL" },
                        { Name: "G2", ColorGroup: "HL" },
                        { Name: "L", CopyLayerColor: "B1", AllowTypes: { h: [2, 3], m: [0, 2, 3] } },
                    ],
                    (l) => ({
                        Priority: 29,
                        CreateLayerTypes: ["h"],
                        AllowTypes: { h: [0, 2, 3], m: [0, 2, 3] },
                        PoseMapping: PoseMapTool.config(
                            ["Yoked", "OverTheHead", "BackCuffs"],
                            ["BackBoxTie", "BackElbowTouch", "AllFours", "Hogtied"]
                        ),
                        ...l,
                    })
                ),
                {
                    Name: "bmask",
                    AllowTypes: { b: 1 },
                    BlendingMode: "destination-out",
                    PoseMapping: PoseMapTool.hideFullBody(),
                    CreateLayerTypes: ["b"],
                    TextureMask: {},
                },
                {
                    Name: "bmL",
                    PoseMapping: PoseMapTool.hideFullBody(),
                    CreateLayerTypes: ["b"],
                    AllowTypes: { b: 1 },
                    CopyLayerColor: "B1",
                },
                {
                    Name: "gmask",
                    Top: 0,
                    Left: 0,
                    BlendingMode: "destination-in",
                    CreateLayerTypes: ["m"],
                    TextureMask: {},
                },
                {
                    Name: "mmL",
                    AllowTypes: { m: [1, 2] },
                    CopyLayerColor: "B1",
                    PoseMapping: PoseMapTool.hideFullBody(),
                },
                {
                    Name: "amL",
                    AllowTypes: { m: [2, 3] },
                    CopyLayerColor: "B1",
                    PoseMapping: PoseMapTool.config(
                        ["Yoked", "OverTheHead", "BackBoxTie", "BackCuffs"],
                        ["BackElbowTouch", "AllFours", "Hogtied"]
                    ),
                },
            ],
        },
        {
            translation: { CN: "油光全身袜", EN: "Glossy Bodystocking" },
            extended: {
                Archetype: "modular",
                DrawImages: false,
                Modules: [
                    { Name: "手指", Key: "h", Options: [{}, {}, {}, {}] },
                    { Name: "袖子", Key: "m", Options: [{}, {}, {}, {}] },
                    { Name: "胸口", Key: "b", Options: [{}, {}] },
                ],
            },
            layerNames: {
                CN: {
                    Z1: "身体色晕",
                    A1: "底色",
                    Shade1: "身体曲线暗色",
                    B1: "边缘线",
                    B2: "边缘暗色",
                    BS: "身体暗色细节",
                    HL: "身体高光细节",
                },
                EN: {
                    Z1: "Body Hue",
                    A1: "Base Color",
                    Shade1: "Body Curve Shade",
                    B1: "Edge Line",
                    B2: "Edge Shade",
                    BS: "Body Shade Details",
                    HL: "Body Highlight Details",
                },
            },
            assetStrings: {
                CN: {
                    SelectBase: "选择油光全身袜样式",

                    Module手指: "手样式",
                    Select手指: "选择手样式",
                    Optionh0: "完整手套",
                    Optionh1: "无手套",
                    Optionh2: "露指手套",
                    Optionh3: "挂中指手套",

                    Module袖子: "袖子样式",
                    Select袖子: "选择袖子样式",
                    Optionm0: "完整袖",
                    Optionm1: "无袖",
                    Optionm2: "分离袖",
                    Optionm3: "仅袖",

                    Module胸口: "胸口样式",
                    Select胸口: "选择胸口样式",
                    Optionb0: "包覆胸口",
                    Optionb1: "露出胸口",
                },
                EN: {
                    SelectBase: "Select Glossy Bodystocking Style",

                    Module手指: "Hand Style",
                    Select手指: "Select Hand Style",
                    Optionh0: "Full Gloves",
                    Optionh1: "No Gloves",
                    Optionh2: "Fingerless Gloves",
                    Optionh3: "Cutout Gloves",

                    Module袖子: "Sleeve Style",
                    Select袖子: "Select Sleeve Style",
                    Optionm0: "Full Sleeves",
                    Optionm1: "Sleeveless",
                    Optionm2: "Detached Sleeves",
                    Optionm3: "Sleeves Only",

                    Module胸口: "Chest Style",
                    Select胸口: "Select Chest Style",
                    Optionb0: "Covered Chest",
                    Optionb1: "Exposed Chest",
                },
            },
        },
    ],
    [
        "SuitLower",
        {
            Name: "马油袜下",
            Random: false,
            Top: 0,
            Left: 0,
            DefaultColor: [
                "#111111",
                "#111111",
                "#251515",
                "#251515",
                "#111111",
                "#111111",
                "#000000",
                "#000000",
                "#000000",
                "#000000",
                "#000000",
                "#000000",
                "#FFFFFF",
                "#FFFFFF",
                "#FFFFFF",
                "#FFFFFF",
            ],
            Layer: [
                { Name: "Z1" }, // 身体色晕
                { Name: "A1" }, // 底色
                { Name: "A2", ColorGroup: "Shade1" }, // 身体曲线暗色
                { Name: "A3", ColorGroup: "Shade1" },
                { Name: "B1" }, // 边缘线
                { Name: "B2" }, // 边缘暗色
                { Name: "C1", ColorGroup: "BS" }, // 身体暗色细节
                { Name: "C2", ColorGroup: "BS" },
                { Name: "C3", ColorGroup: "BS" },
                { Name: "C4", ColorGroup: "BS" },
                { Name: "C5", ColorGroup: "BS" },
                { Name: "C6", ColorGroup: "BS" },
                { Name: "D1", ColorGroup: "HL" }, // 身体高光细节
                { Name: "D2", ColorGroup: "HL" },
                { Name: "D3", ColorGroup: "HL" },
                { Name: "D4", ColorGroup: "HL" },
                {
                    Name: "tmask",
                    AllowTypes: { t: 1 },
                    BlendingMode: "destination-in",
                    CreateLayerTypes: ["t"],
                    TextureMask: { ApplyToAbove: true },
                },
                { Name: "tmL", CreateLayerTypes: ["t"], AllowTypes: { t: 1 }, CopyLayerColor: "B1" },
            ],
        },
        {
            translation: { CN: "油光全身袜", EN: "Glossy Bodystocking" },
            extended: {
                Archetype: "modular",
                DrawImages: false,
                Modules: [{ Name: "脚趾", Key: "t", Options: [{}, {}] }],
            },
            layerNames: {
                CN: {
                    Z1: "身体色晕",
                    A1: "底色",
                    Shade1: "身体曲线暗色",
                    B1: "边缘线",
                    B2: "边缘暗色",
                    BS: "身体暗色细节",
                    HL: "身体高光细节",
                },
                EN: {
                    Z1: "Body Hue",
                    A1: "Base Color",
                    Shade1: "Body Curve Shade",
                    B1: "Edge Line",
                    B2: "Edge Shade",
                    BS: "Body Shade Details",
                    HL: "Body Highlight Details",
                },
            },
            assetStrings: {
                CN: {
                    SelectBase: "选择油光全身袜样式",

                    Module脚趾: "脚趾样式",
                    Select脚趾: "选择脚趾样式",
                    Optiont0: "完整袜子",
                    Optiont1: "露趾袜子",
                },
                EN: {
                    SelectBase: "Select Glossy Bodystocking Style",

                    Module脚趾: "Toe Style",
                    Select脚趾: "Select Toe Style",
                    Optiont0: "Full Stockings",
                    Optiont1: "Open Toe Stockings",
                },
            },
        },
    ],
];

const armPMap = PoseMapTool.config(
    ["Yoked", "OverTheHead", "BackBoxTie", "BackCuffs"],
    ["BackElbowTouch", "AllFours", "Hogtied"]
);

const handPMap = PoseMapTool.config(
    ["Yoked", "OverTheHead", "BackCuffs"],
    ["BackBoxTie", "BackElbowTouch", "AllFours", "Hogtied"]
);

const maskURL = (file) => `luzi-canvas://glossy-bodystocking-mask/${file}`;

const preload = () => {
    for (const pose of ["", "Yoked", "OverTheHead", "BackBoxTie", "BackCuffs", "BackElbowTouch"]) {
        for (const parent of ["Small", "Normal", "Large", "XLarge"]) {
            const layerSource = (layer, P = pose) =>
                ImageMapTools.assetLayer(
                    "Suit",
                    `${asset[0][1].Name}_${parent}_${layer}`,
                    /** @type {AssetPoseName}*/ (P)
                );
            for (const type of [0, 1, 2, 3]) {
                const source = layerSource(`m${type}_gmask`);

                const vp = AssetManager.imageMapping.createVirtualPath(maskURL(source));
                vp.map(source);

                (async () => {
                    /** @type {string[]} */
                    const masks = [];
                    // 躯干遮罩
                    if (type === 1 || type === 2) {
                        masks.push(layerSource(`m1_mmask`, ""));
                    }
                    // 手臂遮罩
                    if (type === 2 || type === 3) {
                        if (armPMap[pose] !== "Hide") masks.push(layerSource(`a1_mmask`, pose));
                        if (handPMap[pose] !== "Hide") masks.push(layerSource(`a2_mmask`, pose));
                    }

                    const canvas = document.createElement("canvas");
                    canvas.width = 500;
                    canvas.height = 1000;
                    const ctx = canvas.getContext("2d");
                    ctx.clearRect(0, 0, 500, 1000);

                    if (type === 0) {
                        ctx.fillStyle = "black";
                        ctx.fillRect(0, 0, 500, 1000);
                    }

                    const getImage = async (mSource) =>
                        /** @type {Promise<HTMLImageElement>}*/ (
                            new Promise((resolve) => {
                                const img = DrawGetImage(mSource);
                                if (img.complete) resolve(img);
                                else img.addEventListener("load", () => resolve(img));
                            })
                        );

                    await Promise.all(masks.map(getImage)).then((imgs) => {
                        ctx.globalCompositeOperation = "source-over";
                        for (const img of imgs) {
                            ctx.drawImage(img, 0, 0);
                        }
                    });

                    canvas.toBlob((b) => {
                        vp.resolve(URL.createObjectURL(b));
                    });
                })();
            }
        }
    }
};

AfterAssetOverrides.register(() => HookManager.afterInit(() => preload()));

export default function () {
    AssetManager.addAssetWithConfig(asset);
}

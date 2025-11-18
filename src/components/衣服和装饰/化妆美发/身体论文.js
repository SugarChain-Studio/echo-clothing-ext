import { ImageMapTools } from "@mod-utils/Tools/imageMapTools";
import { AssetManager } from "../../../assetForward";
import { luziSuffixFixups } from "../../../lib/fixups";

/** @type { {X:number,Y:number, textAlign: CanvasTextAlign}[]} */
const Positions = [
    { X: -60, Y: -105, textAlign: "left" },
    { X: 0, Y: -105, textAlign: "center" },
    { X: 60, Y: -105, textAlign: "right" },
    { X: -55, Y: -50, textAlign: "left" },
    { X: 0, Y: -50, textAlign: "center" },
    { X: 55, Y: -50, textAlign: "right" },
    { X: -48, Y: 0, textAlign: "left" },
    { X: 0, Y: 0, textAlign: "center" },
    { X: 48, Y: 0, textAlign: "right" },
    { X: -60, Y: 50, textAlign: "left" },
    { X: 0, Y: 50, textAlign: "center" },
    { X: 60, Y: 50, textAlign: "right" },
    { X: -70, Y: 105, textAlign: "left" },
    { X: 0, Y: 105, textAlign: "center" },
    { X: 70, Y: 105, textAlign: "right" },
];

const Options = Array.from(Positions, (_, i) => i).map((i) => String.fromCharCode(97 + i));

/**
 * 用于在绘制角色后执行自定义绘制逻辑的钩子函数
 * @param {Object} data - 绘制所需的数据对象
 * @param {Function} originalFunction - 原始的绘制函数
 * @param {Object} modData - MOD特定的数据对象，包含各种绘制相关的属性和函数
 */
function afterDrawHook(data, originalFunction, { C, A, CA, X, Y, drawCanvas, drawCanvasBlink, AlphaMasks, L, Color }) {
    if (L !== "Text") return;

    // 设置临时画布
    const Height = 500;
    const Width = 500;
    const TempCanvas = AnimationGenerateTempCanvas(C, A, Width, Height);

    /** @type {DynamicDrawOptions} */
    const drawOptions = {
        fontSize: 10,
        fontFamily: data.font,
        color: Color,
        width: Width,
    };

    TextItem.Init(data, C, CA, false, false);

    const ctx = TempCanvas.getContext("2d");

    Positions.forEach((p, index) => {
        const center = { X: p.X + Width / 2, Y: p.Y + Height / 2 };
        const option = {
            ...drawOptions,
            textAlign: p.textAlign,
        };
        DynamicDrawText(CA.Property[`Text${index * 3 + 1}`] || "", ctx, center.X, center.Y - 10, option);
        DynamicDrawText(CA.Property[`Text${index * 3 + 2}`] || "", ctx, center.X, center.Y, option);
        DynamicDrawText(CA.Property[`Text${index * 3 + 3}`] || "", ctx, center.X, center.Y + 10, option);
    });

    drawCanvas(TempCanvas, X, Y, AlphaMasks);
    drawCanvasBlink(TempCanvas, X, Y, AlphaMasks);
}

/** @type {CustomAssetDefinition} */
const asset = {
    Name: "身体论文",
    Priority: 13,
    DynamicGroupName: "BodyMarkings",
    PoseMapping: {
        BackBoxTie: PoseType.DEFAULT,
        BackCuffs: PoseType.DEFAULT,
        BackElbowTouch: PoseType.DEFAULT,
        OverTheHead: PoseType.DEFAULT,
        TapedHands: PoseType.DEFAULT,
        Yoked: PoseType.DEFAULT,
        AllFours: PoseType.HIDE,
        Hogtied: PoseType.HIDE,
    },
    Extended: true,
    DynamicAfterDraw: true,
    DefaultColor: ["#000000"],
    Layer: [
        {
            Name: "Text",
            Left: 0,
            Top: 120,
            HasImage: false,
        },
    ],
};

const layerNames = {
    CN: {
        Text: "文本",
    },
    EN: {
        Text: "Text",
    },
};

/** @type {ModularItemConfig} */
const extended = {
    Archetype: ExtendedArchetype.MODULAR,
    ChatSetting: ModularItemChatSetting.PER_MODULE,
    DrawImages: false,
    Modules: Options.map((name, index) => ({
        Name: `Text${index}`,
        Key: name,
        Options: [
            {},
            {
                HasSubscreen: true,
                ArchetypeConfig: {
                    Archetype: ExtendedArchetype.TEXT,
                    MaxLength: {
                        [`Text${index * 3 + 1}`]: 20,
                        [`Text${index * 3 + 2}`]: 20,
                        [`Text${index * 3 + 3}`]: 20,
                    },
                    Font: "Ananda Black",
                    ScriptHooks: {
                        AfterDraw: afterDrawHook,
                    },
                },
            },
        ],
    })),

    DrawData: {
        elementData: Options.map((_, idx) => ({
            position: [1135 + 250 * (idx % 3), 450 + 75 * Math.floor(idx / 3)],
        })),
        itemsPerPage: 15,
    },
    BaselineProperty: /** @type {PropertiesNoArray.Item}*/ (
        Object.fromEntries(Options.map((_, index) => [`Text${index * 3 + 1}`, ""]))
    ),
};

/** @type {Translation.Dialog} */
const assetStrings = {
    CN: {
        SelectBase: "选择文本位置",
        ModuleText0: "右侧锁骨",
        ModuleText1: "中间锁骨",
        ModuleText2: "左侧锁骨",
        ModuleText3: "右胸口",
        ModuleText4: "中间胸口",
        ModuleText5: "左侧胸口",
        ModuleText6: "右侧肋",
        ModuleText7: "中间肋",
        ModuleText8: "左侧肋",
        ModuleText9: "右侧腰",
        ModuleText10: "中间腰",
        ModuleText11: "左侧腰",
        ModuleText12: "右侧髋",
        ModuleText13: "中间髋",
        ModuleText14: "左侧髋",
        ...Options.reduce((pv, name, index) => {
            pv[`SelectText${index}`] = "设置文本";
            pv[`Option${name}0`] = "无";
            pv[`Option${name}1`] = "有";
            return pv;
        }, {}),
    },
    EN: {
        SelectBase: "Select Text Position",
        ModuleText0: "Collarbone Right",
        ModuleText1: "Collarbone Center",
        ModuleText2: "Collarbone Left",
        ModuleText3: "Chest Right",
        ModuleText4: "Chest Center",
        ModuleText5: "Chest Left",
        ModuleText6: "Ribs Right",
        ModuleText7: "Ribs Center",
        ModuleText8: "Ribs Left",
        ModuleText9: "Waist Right",
        ModuleText10: "Waist Center",
        ModuleText11: "Waist Left",
        ModuleText12: "Hips Right",
        ModuleText13: "Hips Center",
        ModuleText14: "Hips Left",
        ...Options.reduce((pv, name, index) => {
            pv[`SelectText${index}`] = "Set Text";
            pv[`Option${name}0`] = "No";
            pv[`Option${name}1`] = "Yes";
            return pv;
        }, {}),
    },
};

const translation = {
    CN: "身体论文",
    EN: "Body Treatise",
    UA: "Трактат про тіло",
};

export default function () {
    AssetManager.addAssetWithConfig("BodyMarkings2_Luzi", asset, {
        layerNames,
        extended,
        translation,
        assetStrings,
    });
    AssetManager.addImageMapping({
        [ImageMapTools.assetPreview("BodyMarkings", "身体论文_Luzi")]: ImageMapTools.assetPreview(
            "BodyMarkings",
            "BodyWritings"
        ),
    });
    luziSuffixFixups(["BodyMarkings2_Luzi"], asset.Name);
}

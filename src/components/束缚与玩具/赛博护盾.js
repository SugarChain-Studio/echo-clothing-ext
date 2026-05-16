import { AssetManager } from "@local/AssetManager";
import { createAfterDrawProcess } from "@local/lib/draw";
import { PoseMapTool } from "@local/lib/generator";
import { ColorTools, Tools } from "@mod-utils/Tools";

/**
 * @typedef {Object} CyberShieldData
 * @property {string} [LightColor1]
 * @property {string} [LightColor2]
 * @property {number} [colorTimer]
 * @property {HTMLCanvasElement} [canvas]
 */

/** @type {ExtendedItemScriptHookCallbacks.ScriptDraw<ModularItemData, CyberShieldData>} */
function scriptDraw(mData, originalFunction, drawData) {
    const { C, Item, PersistentData } = drawData;
    const data = PersistentData();

    if (Item.Property?.TypeRecord?.f === 0) {
        Tools.drawUpdate(C, data);
    }
}

const afterDraw = createAfterDrawProcess("modular", /** @type {CyberShieldData} */ ({}))
    .onLayer("LightColor1", ({ PersistentData, Color }) => (PersistentData().LightColor1 = Color))
    .onLayer("LightColor2", ({ PersistentData, Color }) => (PersistentData().LightColor2 = Color))
    .onLayer(["Light", "Bloom"], (drawData) => {
        const { PersistentData, Property, C, A, X, Y, drawCanvas, drawCanvasBlink } = drawData;
        const data = PersistentData();
        const color1 = data.LightColor1;
        const color2 = data.LightColor2;

        if (!color1 || !color2) return;

        const color = () => {
            if (Property.TypeRecord?.f !== 0) {
                return color1;
            } else {
                const now = Date.now();
                data.colorTimer ??= now + Math.random() * 10000;
                const delta = (now - data.colorTimer) / 1000;
                const t = (Math.sin(delta) + 1) / 2;
                return ColorTools.interpolateColor(color1, color2, t);
            }
        };

        Tools.getAssetImageThen(drawData).then((img) => {
            // clip canvas [x:200, y:460, w:100, h:100]
            const canvasY = 460;
            const canvasX = 200;

            const canvas = (data.canvas ??= AnimationGenerateTempCanvas(C, A, 100, 100));
            const rx = X - canvasX;
            const ry = Y - CanvasUpperOverflow - canvasY;
            const ctx = canvas.getContext("2d");
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = color();
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            DrawImageEx(img, ctx, rx, ry, { BlendingMode: "destination-in" });

            drawCanvas(canvas, canvasX, canvasY + CanvasUpperOverflow);
            drawCanvasBlink(canvas, canvasX, canvasY + CanvasUpperOverflow);
        });
    });

/** @type {AddAssetWithConfigParamsNoGroup} */
const asset = [
    {
        Name: "赛博护盾",
        Random: false,
        Gender: "F",
        Fetish: ["Chastity"],
        Left: 230,
        Top: 508,
        Difficulty: 42,
        Time: 10,
        RemoveTime: 40,
        AllowLock: true,
        AllowTighten: false,
        DynamicGroupName: "ItemVulva",
        ParentGroup: {},
        DefaultColor: ["Default", "#AE3131", "#5CB5FF", "#FF5CFC"],
        Prerequisite: ["AccessCrotch", "HasVagina", "CanCoverVulva"],
        ExpressionTrigger: [{ Name: "Soft", Group: "Eyebrows", Timer: 10 }],
        Effect: [E.CanEdge, E.Chaste],
        Block: ["ItemVulvaPiercings"],
        Hide: ["Pussy"],
        DrawLocks: false,
        PoseMapping: PoseMapTool.hideFullBody(),
        Layer: [
            { Name: "Base" },
            { Name: "Lock", LockLayer: true },
            { Name: "BaseFilter", CopyLayerColor: "Base" },
            { Name: "LightColor1", HasImage: false },
            { Name: "LightColor2", HasImage: false },
            { Name: "Light", AllowColorize: false, HasImage: false },
            { Name: "Bloom", AllowColorize: false, HasImage: false },
        ],
    },
    {
        translation: {
            CN: "赛博护盾",
            EN: "Cyber Shield",
        },
        extended: {
            Archetype: ExtendedArchetype.MODULAR,
            ChangeWhenLocked: false,
            ChatTags: Tools.CommonChatTags(),
            DrawImages: false,
            Modules: [
                { Name: "流光", Key: "f", Options: [{}, {}] },
                {
                    Name: "护盾",
                    Key: "s",
                    Options: [{}, { Property: { Effect: [E.ButtChaste], Block: ["ItemButt"] } }],
                },
                {
                    Name: "Intensity",
                    Key: "i",
                    Options: [
                        { Property: { Intensity: -1, Effect: ["Egged"] } },
                        { Property: { Intensity: 0, Effect: ["Egged", "Vibrating"] } },
                        { Property: { Intensity: 1, Effect: ["Egged", "Vibrating"] } },
                        { Property: { Intensity: 2, Effect: ["Egged", "Vibrating"] } },
                        { Property: { Intensity: 3, Effect: ["Egged", "Vibrating"] } },
                    ],
                },
                {
                    Name: "Orgasm",
                    Key: "o",
                    Options: [
                        {},
                        { Property: { Effect: [E.DenialMode] } },
                        { Property: { Effect: [E.DenialMode, E.RuinOrgasms] } },
                    ],
                },
            ],
            ScriptHooks: { ...afterDraw.hooks(), ScriptDraw: scriptDraw },
        },
        layerNames: {
            CN: {
                Base: "底色",
                Lock: "锁",
                Light: "光效",
                Bloom: "泛光",
                LightColor1: "灯光颜色1",
                LightColor2: "灯光颜色2",
            },
        },
        assetStrings: {
            CN: {
                SelectBase: "配置赛博护盾",

                Module流光: "颜色流光",
                Select流光: "设置颜色流光效果",
                Optionf0: "启用",
                Optionf1: "禁用",
                Setf0: "SourceCharacter使DestinationCharacterAssetName有颜色流光效果",
                Setf1: "SourceCharacter使DestinationCharacterAssetName没有颜色流光效果",

                Module护盾: "遮挡屁股",
                Select护盾: "设置是否遮挡屁股",
                Options0: "不遮挡",
                Options1: "遮挡",
                SetOptions0: "SourceCharacter使DestinationCharacterAssetName不遮挡屁股",
                SetOptions1: "SourceCharacter使DestinationCharacterAssetName遮挡屁股",

                ModuleIntensity: "按摩强度",
                SelectIntensity: "设置多模式按摩强度",
                Optioni0: "无",
                Optioni1: "弱振动",
                Optioni2: "振动",
                Optioni3: "振动+吸吮",
                Optioni4: "智能最优",
                Seti0: "SourceCharacter关闭DestinationCharacterAssetName的按摩功能",
                Seti1: "SourceCharacter将DestinationCharacterAssetName的按摩功能设置为弱振动模式",
                Seti2: "SourceCharacter将DestinationCharacterAssetName的按摩功能设置为中等震动模式",
                Seti3: "SourceCharacter将DestinationCharacterAssetName的按摩功能设置为震动结合吸吮模式",
                Seti4: "SourceCharacter将DestinationCharacterAssetName的按摩功能设置为智能敏感度对应震动/吸吮模式",

                ModuleOrgasm: "禁欲模式",
                SelectOrgasm: "选择禁欲模式",
                Optiono0: "关闭",
                Optiono1: "寸止",
                Optiono2: "拒绝",
                Seto0: "SourceCharacter关闭了DestinationCharacterAssetName上的高潮防止系统。",
                Seto1: "SourceCharacter将DestinationCharacterAssetName上的高潮防止系统设置为寸止模式。",
                Seto2: "SourceCharacter将DestinationCharacterAssetName上的高潮防止系统设置为拒绝模式。",

                ModuleTemperBlock: "擅动管理",
                Optiont0: "关闭",
                Optiont1: "挣扎",
                Optiont2: "挣扎和动作",
                Sett0: "SourceCharacter关闭了DestinationCharacterAssetName上的电击惩罚",
                Sett1: "SourceCharacter设置DestinationCharacterAssetName会用电击惩罚保护区域的挣扎行为",
                Sett2: "SourceCharacter设置DestinationCharacterAssetName会用电击惩罚保护区域的挣扎行为和动作",
            },
            EN: {
                SelectBase: "Configure Cyber Shield",

                Module流光: "Color Flow",
                Select流光: "Set Color Flow Effect",
                Optionf0: "On",
                Optionf1: "Off",
                Setf0: "SourceCharacter makes DestinationCharacter AssetName have color flow effect",
                Setf1: "SourceCharacter makes DestinationCharacter AssetName have no color flow effect",

                Module护盾: "Butt Coverage",
                Select护盾: "Set whether to cover the butt",
                Options0: "No Cover",
                Options1: "Cover",
                SetOptions0: "SourceCharacter makes DestinationCharacter AssetName not cover the butt",
                SetOptions1: "SourceCharacter makes DestinationCharacter AssetName cover the butt",

                ModuleIntensity: "Massager Intensity",
                SelectIntensity: "Set Multi-Mode Massager Intensity",
                Optioni0: "Off",
                Optioni1: "Weak Vibrate",
                Optioni2: "Vibrate",
                Optioni3: "Vibrate + Sucking",
                Optioni4: "Smart Optimal",
                Seti0: "SourceCharacter turns off the massager function of DestinationCharacter AssetName",
                Seti1: "SourceCharacter sets the massager function of DestinationCharacter AssetName to weak vibrate mode",
                Seti2: "SourceCharacter sets the massager function of DestinationCharacter AssetName to vibrate mode",
                Seti3: "SourceCharacter sets the massager function of DestinationCharacter AssetName to vibrate combined with sucking mode",
                Seti4: "SourceCharacter sets the massager function of DestinationCharacter AssetName to smart sensitivity corresponding vibrate/sucking mode",

                SelectOrgasm: "Configure Orgasm Prevention Mode",
                ModuleOrgasm: "Orgasm Prevention",
                Optiono0: "Off",
                Optiono1: "Edge",
                Optiono2: "Deny",
                Setso0: "SourceCharacter deactivates the orgasm prevention system on DestinationCharacter AssetName.",
                Setso1: "SourceCharacter sets the orgasm prevention system on DestinationCharacter AssetName to edging mode.",
                Setso2: "SourceCharacter sets the orgasm prevention system on DestinationCharacter AssetName to denial mode.",

                SelectTemperBlock: "Select Tamper Management",
                Optiont0: "Off",
                Optiont1: "Struggle",
                Optiont2: "Struggle and Activity",
                Sett0: "SourceCharacter deactivates the shock punishment on DestinationCharacter AssetName",
                Sett1: "SourceCharacter sets DestinationCharacterAssetName to shock punishment for struggling in protected area",
                Sett2: "SourceCharacter sets DestinationCharacterAssetName to shock punishment for struggling and activity in protected area",
            },
        },
    },
];

export default function () {
    AssetManager.addAssetWithConfig("ItemVulva", [asset]);
}

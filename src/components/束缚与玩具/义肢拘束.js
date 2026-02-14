import { HookManager } from "@sugarch/bc-mod-hook-manager";
import { AssetManager } from "../../assetForward";
import { createItemDialogModular, PoseMapTool, Typing } from "../../lib";
import { Tools } from "@mod-utils/Tools";
import { monadic } from "@mod-utils/monadic";
import { resourceBaseURL } from "@mod-utils/rollupHelper";

/**
 * @typedef {Object} ProtheticRestraintArmProps
 * @property {boolean} [LuziAutoMasturbate] 是否启用自动自慰功能
 * @property {boolean} [LuziForbidStruggle] 是否禁止挣扎行为
 * @property {boolean} [LuziSelfInteract] 互动限制-私密区域t
 */

/**
 * @typedef { globalThis.ItemProperties & ProtheticRestraintArmProps } ExtendItemProperties
 */

/** @type {ItemProperties} */
const defaultProps = /** @type {ExtendItemProperties} */ ({
    LuziAutoMasturbate: false,
    LuziForbidStruggle: true,
});

/** @type { (item: Item) => ExtendItemProperties } */
const extProp = (item) => /** @type {ExtendItemProperties}*/ (item.Property);

const armItemDialog = createItemDialogModular([])
    .addCheckBoxes([
        {
            location: { x: 1200, y: 620 },
            show: ({ data }) => data.currentModule === "Base",
            text: ({ text }) => text("D_BlockInteraction"),
            requireLockPermission: true,
            checked: ({ item }) => Boolean(item.Property?.Effect?.includes(E.Block)),
            onclick: ({ item }) => {
                item.Property ??= {};
                item.Property.Effect ??= [];
                if (item.Property.Effect.includes(E.Block)) {
                    item.Property.Effect = item.Property.Effect.filter((e) => e !== E.Block);
                } else {
                    item.Property.Effect.push(E.Block);
                }
            },
            actionKey: ({ item }) => `A_BlockInteractionSet${item.Property?.Effect?.includes(E.Block) ? "T" : "F"}`,
        },
        {
            location: { x: 1200, y: 700 },
            show: ({ data }) => data.currentModule === "Base",
            text: ({ chara, text }) => text("D_ForbidStruggle").replace("CNAME", CharacterNickname(chara)),
            requireLockPermission: true,
            enable: ({ item }) => !item.Property?.Effect?.includes(E.Block),
            checked: ({ item }) => Boolean(extProp(item).LuziForbidStruggle),
            onclick: ({ item }) => {
                const property = extProp(item);
                property.LuziForbidStruggle = !property.LuziForbidStruggle;
            },
            actionKey: ({ item }) => `A_ForbidStruggleSet${extProp(item).LuziForbidStruggle ? "T" : "F"}`,
        },
        {
            location: { x: 1200, y: 780 },
            show: ({ data }) => data.currentModule === "Base",
            text: ({ text }) => text("D_AutoMasturbate"),
            requireLockPermission: true,
            enable: ({ item }) => !item.Property?.Effect?.includes(E.Block),
            checked: ({ item }) => Boolean(extProp(item).LuziAutoMasturbate),
            onclick: ({ item }) => {
                const property = extProp(item);
                property.LuziAutoMasturbate = !property.LuziAutoMasturbate;
            },
            actionKey: ({ item }) => `A_AutoMasturbateSet${extProp(item).LuziAutoMasturbate ? "T" : "F"}`,
        },
    ])
    .addTexts([
        {
            text: ({ data, item, text }) => {
                if (data.currentModule !== "Base") return undefined;
                const configR = item.Property?.TypeRecord?.r ?? 0;
                return text(`D_CurRMode`).replace("RMODE", text(`Optionr${configR}`));
            },
            location: { x: 1500, y: 550, w: 500 },
            align: "center",
        },
    ]);

/**
 * @typedef { Object } ProtheticRestraintArmData
 * @property { number } ArousalCheckTimer
 * @property { number } NextMasturbateTime
 */

/**
 * 随机自慰，但是不含阻挡时的对话
 * @param {Character} C 玩家自身
 */
function randomMastur(C) {
    if (!C.IsPlayer()) return;
    monadic("Activity", AssetGetActivity("Female3DCG", "MasturbateHand"))
        .filter(() => Player.CanInteract())
        .then((activity) => activity.Target.filter((x) => ActivityCanBeDone(Player, "MasturbateHand", x)))
        .filter((groups) => groups.length > 0)
        .then((groups) => groups[Math.floor(Math.random() * groups.length)])
        .then((g) => AssetGroupGet("Female3DCG", g))
        .then((group, { Activity }) => {
            DrawFlashScreen("#F347B4", 1500, 500);
            ActivityRun(Player, Player, group, { Activity, Group: group.Name }, true);
        });
}

/**
 * @param {Character} player
 * @param {ProtheticRestraintArmData} data
 * @param {Item} item
 */
function armUpdateRuns(player, data, item) {
    if (!player.IsPlayer()) return;

    const property = extProp(item);

    const now = CommonTime();
    if (!data.ArousalCheckTimer) data.ArousalCheckTimer = now;

    const delta = now - data.ArousalCheckTimer;
    data.ArousalCheckTimer += delta;

    // 随机自慰
    const nextTime = () =>
        now + (Math.random() * 10 + (15 * (100 - (Player.ArousalSettings?.Progress ?? 0))) / 100 + 10) * 1000;
    if (!data.NextMasturbateTime) data.NextMasturbateTime = nextTime();
    if (property.LuziAutoMasturbate && ServerPlayerIsInChatRoom()) {
        if (now > data.NextMasturbateTime) {
            data.NextMasturbateTime = nextTime();
            if (Player.CanInteract()) randomMastur(player);
        }
    } else {
        data.NextMasturbateTime = nextTime();
    }
}

/** @type {ExtendedItemScriptHookCallbacks.ScriptDraw<ModularItemData, ProtheticRestraintArmData>} */
function armScriptDraw(data, originalFunction, { C, Item, PersistentData }) {
    const Data = PersistentData();
    if (C.IsPlayer()) armUpdateRuns(C, Data, Item);
}

/**
 * @typedef { Object } ProtheticRestraintHeadData
 * @property { number } CurrentVState
 * @property { number } AnimationTimer
 * @property { number } CurrentY
 */

/** @type {ExtendedItemScriptHookCallbacks.ScriptDraw<ModularItemData, ProtheticRestraintHeadData>} */
function headScriptDraw(data, originalFunction, { C, Item, PersistentData }) {
    const pData = PersistentData();
    pData.CurrentVState ??= 0;

    pData.CurrentVState ??= 0;
    const expectVState = (Item.Property?.TypeRecord?.v ?? 0) === 0 ? 0 : 1;

    const now = CommonTime();
    pData.AnimationTimer ??= now;
    const delta = now - pData.AnimationTimer;
    pData.AnimationTimer = now;

    const expectY = expectVState * 40;
    pData.CurrentY ??= expectY;

    const speed = 300; // 每秒移动像素

    if (pData.CurrentVState !== expectVState) {
        const direction = expectY > pData.CurrentY ? 1 : -1;
        pData.CurrentY += direction * speed * (delta / 1000);
        if ((direction === 1 && pData.CurrentY > expectY) || (direction === -1 && pData.CurrentY < expectY)) {
            pData.CurrentY = expectY;
            pData.CurrentVState = expectVState;
            CharacterRefresh(C); // 最后一次更新，确保位置正确
        }
        Tools.drawUpdate(C, pData);
    }
}

/** @type {ExtendedItemScriptHookCallbacks.BeforeDraw<ModularItemData, ProtheticRestraintHeadData>} */
function headBeforeDraw(data, originalFunction, { L, Y, Property, PersistentData }) {
    const pData = PersistentData();
    if (L === "H1" || L === "H2" || L === "H3") {
        if (pData.CurrentY === undefined) pData.CurrentY = ((Property?.TypeRecord?.v ?? 0) === 0 ? 0 : 1) * 40;
        return { Y: Y + Math.round(pData.CurrentY) };
    }
    return {};
}

/** @type {AddAssetWithConfigParams[]} */
const assets = [
    [
        "ItemArms",
        {
            Name: "义肢拘束A",
            Random: false,
            Left: 60,
            Top: 0,
            IsRestraint: true,
            Time: 30,
            Difficulty: 60,
            AllowLock: true,
            DrawLocks: false,
            DynamicGroupName: "ItemArms",
            ParentGroup: "BodyUpper",
            Category: ["SciFi"],
            Effect: [E.UseRemote],
            PoseMapping: PoseMapTool.config(
                ["BackBoxTie", "BackElbowTouch", "OverTheHead", "Yoked"],
                ["AllFours", "Hogtied"]
            ),
            Hide: ["HandsLeft", "HandsRight"],
            AllowActivePose: ["BaseUpper", "Yoked", "OverTheHead", "BackBoxTie", "BackElbowTouch"],
            Layer: [
                ...Typing.layerMap(
                    [
                        { Name: "A1", ColorGroup: "Lining", Priority: 21 }, // 内衬-腰部1
                        { Name: "A2", ColorGroup: "Lining", Priority: 21 }, // 内衬-腰部2
                        { Name: "A3", ColorGroup: "Struct", Priority: 21 }, // 结构-髋部
                        { Name: "A4", ColorGroup: "Shell", Priority: 21 }, // 外壳-腰部

                        { Name: "B1", ColorGroup: "Lining", Priority: 15 }, // 内衬-束带2

                        { Name: "B2", ColorGroup: "Lining" }, // 内衬-束带1
                        { Name: "B3", ColorGroup: "Lining" }, // 内衬-肩部
                        { Name: "B4", ColorGroup: "Struct" }, // 结构-胸口

                        { Name: "C1", ColorGroup: "Struct", ParentGroup: {} }, // 结构-肩部
                        { Name: "C2", ColorGroup: "Shell", ParentGroup: {} }, // 外壳-肩部
                        { Name: "C3", ColorGroup: "Struct", ParentGroup: {}, Priority: 6 }, // 结构-肩部轴承
                    ],
                    (l) => ({ PoseMapping: {}, Priority: 17, ...l })
                ),

                ...Typing.layerMap(
                    [
                        { Name: "手1", ColorGroup: "Struct" }, // 结构-掌心
                        { Name: "手2", ColorGroup: "Metal" }, // 金属-手指
                        { Name: "手3", ColorGroup: "Shell" }, // 外壳-手背
                    ],
                    (l) => ({
                        ParentGroup: {},
                        Priority: 27,
                        ...PoseMapTool.layerConfig(true, [], ["BackBoxTie", "BackCuffs", "BackElbowTouch"]),
                        ...l,
                    })
                ),

                // 这是手臂
                ...Typing.layerMap(
                    [
                        { Name: "手臂1", ColorGroup: "Metal" }, // 金属-手臂主轴
                        { Name: "手臂2" }, // 电线
                        { Name: "手臂3", ColorGroup: "Struct" }, // 结构-手臂
                        { Name: "手臂4", ColorGroup: "Metal" }, // 金属-手臂轴承
                        { Name: "手臂5", ColorGroup: "Shell" }, // 外壳-手臂
                    ],
                    (l) => ({
                        ParentGroup: {},
                        Priority: 6,
                        ...PoseMapTool.layerConfig(true, [], ["BackElbowTouch"]),
                        ...l,
                    })
                ),

                // 前面的透明布料
                ...Typing.layerMap(
                    [
                        { Name: "塑料布1" }, // 塑料布-主体
                        { Name: "塑料布2" }, // 塑料布-亮色
                        { Name: "塑料布3" }, // 塑料布-暗色
                    ],
                    (l) => ({ Priority: 23, ColorGroup: "Plastic", PoseMapping: {}, AllowTypes: { s: 0 }, ...l })
                ),
            ],
        },
        {
            translation: { CN: "义肢拘束(手臂)", EN: "Prosthetic Restraint (Arms)" },
            layerNames: {
                CN: {
                    Lining: "内衬",
                    Struct: "结构",
                    Shell: "外壳",
                    Metal: "金属",
                    Wire: "电线",
                    Plastic: "塑料布",

                    A1: "腰部1",
                    A2: "腰部2",
                    A3: "髋部",
                    A4: "腰部",

                    B1: "束带2内衬",

                    B2: "束带1",
                    B3: "肩部",
                    B4: "胸口",

                    C1: "肩部",
                    C2: "肩部",
                    C3: "肩部轴承",

                    手1: "掌心",
                    手2: "手指",
                    手3: "手背",

                    手臂1: "手臂主轴",
                    手臂2: "电线",
                    手臂3: "手臂",
                    手臂4: "手臂轴承",
                    手臂5: "手臂",

                    塑料布1: "主体",
                    塑料布2: "亮色",
                    塑料布3: "暗色",
                },
                EN: {
                    Lining: "Lining",
                    Struct: "Struct",
                    Shell: "Shell",
                    Metal: "Metal",
                    Wire: "Wire",
                    Plastic: "Plastic",

                    A1: "Waist 1",
                    A2: "Waist 2",
                    A3: "Hip",
                    A4: "Waist",

                    B1: "Strap 2 Lining",

                    B2: "Strap 1",
                    B3: "Shoulder",
                    B4: "Chest",

                    C1: "Shoulder",
                    C2: "Shoulder",
                    C3: "Shoulder Bearing",

                    手1: "Palm",
                    手2: "Fingers",
                    手3: "Back of Hand",

                    手臂1: "Arm Main Shaft",
                    手臂2: "Wires",
                    手臂3: "Arm",
                    手臂4: "Arm Bearing",
                    手臂5: "Arm",

                    塑料布1: "Main",
                    塑料布2: "Light",
                    塑料布3: "Dark",
                },
            },
            extended: {
                Archetype: "modular",
                ChatTags: Tools.CommonChatTags(),
                DrawImages: false,
                ScriptHooks: { ...armItemDialog.createHooks(), ScriptDraw: armScriptDraw },
                ChangeWhenLocked: false,
                Modules: [
                    {
                        Name: "RMode",
                        Key: "r",
                        DrawImages: true,
                        Options: [
                            {},
                            { Property: { SetPose: ["BaseUpper"] } },
                            { Property: { SetPose: ["Yoked"] } },
                            { Property: { SetPose: ["OverTheHead"] } },
                            { Property: { SetPose: ["BackBoxTie"] } },
                            { Property: { SetPose: ["BackElbowTouch"] } },
                        ],
                    },
                    {
                        Name: "Style",
                        Key: "s",
                        DrawImages: false,
                        Options: [{}, {}],
                    },
                ],
            },
            assetStrings: {
                CN: {
                    D_CurRMode: "姿势模式: RMODE",

                    D_BlockInteraction: "如同手臂拘束阻止所有互动",
                    A_BlockInteractionSetT:
                        "SourceCharacter将DestinationCharacterAssetName设置为手臂拘束，阻止所有互动。",
                    A_BlockInteractionSetF:
                        "SourceCharacter将DestinationCharacterAssetName的手臂拘束效果移除，允许互动。",

                    D_ForbidStruggle: "禁止 CNAME 的挣扎行为",
                    A_ForbidStruggleSetT:
                        "SourceCharacter配置DestinationCharacterAssetName，使TargetCharacter无法进行挣扎。",
                    A_ForbidStruggleSetF: "SourceCharacter关闭了DestinationCharacterAssetName上的禁止挣扎设置。",

                    D_AutoMasturbate: "自动自慰",
                    A_AutoMasturbateSetT: "SourceCharacter启动DestinationCharacterAssetName的自动自慰模式。",
                    A_AutoMasturbateSetF: "SourceCharacter关闭DestinationCharacterAssetName的自动自慰功能。",

                    SelectBase: "配置义肢拘束(手臂)",

                    ModuleRMode: "姿势模式",
                    SelectRMode: "选择义肢拘束的姿势模式",
                    Optionr0: "自由控制",
                    Optionr1: "限制姿势1",
                    Optionr2: "限制姿势2",
                    Optionr3: "限制姿势3",
                    Optionr4: "限制姿势4",
                    Optionr5: "限制姿势5",

                    Setr0: "SourceCharacter配置DestinationCharacterAssetName，使得TargetCharacter可以通过脑机接口控制姿势。",
                    Setr1: "SourceCharacter将DestinationCharacterAssetName的姿势限制为BaseUpper。",
                    Setr2: "SourceCharacter将DestinationCharacterAssetName的姿势限制为Yoked。",
                    Setr3: "SourceCharacter将DestinationCharacterAssetName的姿势限制为OverTheHead。",
                    Setr4: "SourceCharacter将DestinationCharacterAssetName的姿势限制为BackBoxTie。",
                    Setr5: "SourceCharacter将DestinationCharacterAssetName的姿势限制为BackElbowTouch。",

                    ModuleStyle: "搭配风格",
                    SelectStyle: "选择义肢拘束的搭配风格",
                    Options0: "默认",
                    Options1: "隐藏塑料布",

                    Sets0: "SourceCharacter配置DestinationCharacterAssetName为默认搭配。",
                    Sets1: "SourceCharacter配置DestinationCharacterAssetName为隐藏塑料布样式。",
                },
                EN: {
                    D_CurRMode: "Pose Mode: RMODE",

                    D_BlockInteraction: "Block all interaction as Arm Restraint",
                    A_BlockInteractionSetT:
                        "SourceCharacter sets DestinationCharacter AssetName as Arm Restraint, blocking all interaction.",
                    A_BlockInteractionSetF:
                        "SourceCharacter removes Arm Restraint effect from DestinationCharacter AssetName, allowing interaction.",

                    D_ForbidStruggle: "Prevent CNAME from struggling",
                    A_ForbidStruggleSetT:
                        "SourceCharacter configures DestinationCharacter AssetName to prevent TargetCharacter from struggling.",
                    A_ForbidStruggleSetF:
                        "SourceCharacter disables the struggle prevention on DestinationCharacter AssetName.",

                    D_AutoMasturbate: "Auto masturbation",
                    A_AutoMasturbateSetT:
                        "SourceCharacter configures DestinationCharacter AssetName to enable auto masturbation mode.",
                    A_AutoMasturbateSetF:
                        "SourceCharacter disables auto masturbation on DestinationCharacter AssetName.",

                    SelectBase: "Configure Prosthetic Restraint (Arms)",

                    ModuleRMode: "Pose Mode",
                    SelectRMode: "Select Pose Mode",
                    Optionr0: "Free Control",
                    Optionr1: "Restrict Pose 1",
                    Optionr2: "Restrict Pose 2",
                    Optionr3: "Restrict Pose 3",
                    Optionr4: "Restrict Pose 4",
                    Optionr5: "Restrict Pose 5",

                    Setr0: "SourceCharacter configures DestinationCharacter AssetName, allowing TargetCharacter to control poses through the brain-machine interface.",
                    Setr1: "SourceCharacter restricts the pose of DestinationCharacter AssetName to BaseUpper.",
                    Setr2: "SourceCharacter restricts the pose of DestinationCharacter AssetName to Yoked.",
                    Setr3: "SourceCharacter restricts the pose of DestinationCharacter AssetName to OverTheHead.",
                    Setr4: "SourceCharacter restricts the pose of DestinationCharacter AssetName to BackBoxTie.",
                    Setr5: "SourceCharacter restricts the pose of DestinationCharacter AssetName to BackElbowTouch.",

                    ModuleStyle: "Style",
                    SelectStyle: "Select Prosthetic Restraint Style",
                    Options0: "Default",
                    Options1: "Hide Plastic",

                    Sets0: "SourceCharacter configures DestinationCharacter AssetName to default style.",
                    Sets1: "SourceCharacter configures DestinationCharacter AssetName to hide plastic style.",
                },
            },
        },
    ],
    [
        "ItemLegs",
        {
            Name: "义肢拘束L",
            Random: false,
            AllowLock: true,
            DrawLocks: false,
            ...Tools.topLeftBuilder({ Left: 0, Top: 460 }, ["KneelingSpread", { Left: 60 }]),
            IsRestraint: true,
            Category: ["SciFi"],
            Effect: [E.UseRemote],
            Time: 30,
            Difficulty: 60,
            ParentGroup: "BodyLower",
            PoseMapping: PoseMapTool.config(
                ["Kneel", "KneelingSpread", "LegsClosed", "Spread"],
                ["AllFours", "Hogtied"]
            ),
            Block: ["ItemFeet", "ItemBoots"],
            Priority: 20,
            Layer: [
                {
                    Name: "遮罩下",
                    BlendingMode: "destination-out",
                    ParentGroup: {},
                    TextureMask: {
                        Groups: [
                            "BodyLower",
                            "ItemTorso",
                            "Liquid2_Luzi",
                            "Socks",
                            "SocksLeft",
                            "SocksRight",
                            "SuitLower",
                            "SuitLower_笨笨蛋Luzi",
                            "BodyMarkings",
                            "BodyMarkings2_Luzi",
                            "身体痕迹_Luzi",
                        ],
                    },
                },
                ...Typing.layerMap(
                    [
                        { Name: "D1" }, // 电线
                        { Name: "D2", ColorGroup: "Metal" }, // 金属-脚
                        { Name: "D3", ColorGroup: "Structure" }, // 结构-小腿
                        { Name: "D4", ColorGroup: "Metal" }, // 金属-小腿主轴
                        { Name: "D5", ColorGroup: "Shell" }, // 外壳-小腿
                    ],
                    (l) => ({
                        ...PoseMapTool.layerConfig(true, [], ["Kneel", "KneelingSpread"]),
                        ...l,
                    })
                ),

                { Name: "E1", ColorGroup: "Lining" }, // 内衬-束带1
                { Name: "E2", ColorGroup: "Lining" }, // 内衬-束带2
                { Name: "E3", ColorGroup: "Lining" }, // 内衬-束带3
                { Name: "E4", ColorGroup: "Metal" }, // 金属-膝盖
                { Name: "E5", ColorGroup: "Structure" }, // 结构-大腿
                { Name: "E6", ColorGroup: "Shell" }, // 外壳-大腿
                { Name: "E7", ColorGroup: "Lining" }, // 内衬-束带4
            ],
        },
        {
            translation: { CN: "义肢拘束(腿部)", EN: "Prosthetic Restraint (Legs)" },
            layerNames: {
                CN: {
                    Lining: "内衬",
                    Metal: "金属",
                    Structure: "结构",
                    Shell: "外壳",
                    Wire: "电线",

                    D1: "电线",
                    D2: "脚",
                    D3: "小腿",
                    D4: "小腿主轴",
                    D5: "小腿",

                    E1: "束带1",
                    E2: "束带2",
                    E3: "束带3",
                    E4: "膝盖",
                    E5: "大腿",
                    E6: "大腿",
                    E7: "束带4",
                },
                EN: {
                    Lining: "Lining",
                    Metal: "Metal",
                    Structure: "Structure",
                    Shell: "Shell",
                    Wire: "Wire",

                    D1: "Wires",
                    D2: "Foot",
                    D3: "Calf",
                    D4: "Calf Main Shaft",
                    D5: "Calf",

                    E1: "Strap 1",
                    E2: "Strap 2",
                    E3: "Strap 3",
                    E4: "Knee",
                    E5: "Thigh",
                    E6: "Thigh",
                    E7: "Strap 4",
                },
            },
            extended: {
                Archetype: "modular",
                ChatTags: Tools.CommonChatTags(),
                DrawImages: false,
                ScriptHooks: {},
                BaselineProperty: defaultProps,
                AllowEffect: [E.Block],
                Modules: [
                    {
                        Name: "RMode",
                        Key: "r",
                        DrawImages: true,
                        Options: [
                            {},
                            { Property: { SetPose: ["BaseLower"] } },
                            { Property: { SetPose: ["Kneel"] } },
                            { Property: { SetPose: ["KneelingSpread"] } },
                            { Property: { SetPose: ["LegsClosed"] } },
                            { Property: { SetPose: ["Spread"] } },
                        ],
                    },
                    {
                        Name: "Move",
                        Key: "m",
                        DrawImages: false,
                        Options: [
                            { Property: { Effect: [E.Slow] } },
                            { Property: { Effect: [E.Freeze, E.MapImmobile] } },
                            { Property: { Effect: [E.Slow, E.Leash] } },
                        ],
                    },
                ],
            },
            assetStrings: {
                CN: {
                    SelectBase: "配置义肢拘束(腿部)",

                    ModuleRMode: "拘束模式",
                    SelectRMode: "选择拘束模式",
                    Optionr0: "自由控制",
                    Optionr1: "限制姿势1",
                    Optionr2: "限制姿势2",
                    Optionr3: "限制姿势3",
                    Optionr4: "限制姿势4",
                    Optionr5: "限制姿势5",

                    Setr0: "SourceCharacter配置DestinationCharacterAssetName，使得TargetCharcter可以通过脑机接口控制姿势。",
                    Setr1: "SourceCharacter将DestinationCharacterAssetName的姿势限制为BaseLower。",
                    Setr2: "SourceCharacter将DestinationCharacterAssetName的姿势限制为Kneel。",
                    Setr3: "SourceCharacter将DestinationCharacterAssetName的姿势限制为KneelingSpread。",
                    Setr4: "SourceCharacter将DestinationCharacterAssetName的姿势限制为LegsClosed。",
                    Setr5: "SourceCharacter将DestinationCharacterAssetName的姿势限制为Spread。",

                    ModuleMove: "移动限制",
                    SelectMove: "选择移动限制",
                    Optionm0: "自由移动",
                    Optionm1: "禁止移动",
                    Optionm2: "跟随模式",

                    Setm0: "SourceCharacter配置DestinationCharacterAssetName，使得TargetCharcter可以自由控制AssetName移动。",
                    Setm1: "SourceCharacter使DestinationCharacterAssetName保持停留在原地。",
                    Setm2: "SourceCharacter启动了DestinationCharacterAssetName的跟随模式。",
                },
                EN: {
                    SelectBase: "Configure Prosthetic Restraint (Legs)",

                    ModuleRMode: "Restraint Mode",
                    SelectRMode: "Select Restraint Mode",
                    Optionr0: "Free Control",
                    Optionr1: "Restrict Pose 1",
                    Optionr2: "Restrict Pose 2",
                    Optionr3: "Restrict Pose 3",
                    Optionr4: "Restrict Pose 4",
                    Optionr5: "Restrict Pose 5",

                    Setr0: "SourceCharacter configures DestinationCharacter AssetName, allowing TargetCharcter to control poses through the brain-machine interface.",
                    Setr1: "SourceCharacter restricts the pose of DestinationCharacter AssetName to BaseLower.",
                    Setr2: "SourceCharacter restricts the pose of DestinationCharacter AssetName to Kneel.",
                    Setr3: "SourceCharacter restricts the pose of DestinationCharacter AssetName to KneelingSpread.",
                    Setr4: "SourceCharacter restricts the pose of DestinationCharacter AssetName to LegsClosed.",
                    Setr5: "SourceCharacter restricts the pose of DestinationCharacter AssetName to Spread.",

                    ModuleMove: "Movement Restriction",
                    SelectMove: "Select Movement Restriction",
                    Optionm0: "Free Movement",
                    Optionm1: "Freeze",
                    Optionm2: "Follow",

                    Setm0: "SourceCharacter configures DestinationCharacter AssetName, allowing TargetCharcter to freely control movement.",
                    Setm1: "SourceCharacter configures DestinationCharacter AssetName to stay in place.",
                    Setm2: "SourceCharacter activates follow mode on DestinationCharacter AssetName.",
                },
            },
        },
    ],
    [
        "ItemHood",
        {
            Name: "义肢拘束H",
            Random: false,
            Left: 160,
            Top: 60,
            IsRestraint: true,
            Time: 30,
            Difficulty: 60,
            AllowLock: true,
            DrawLocks: false,
            DynamicGroupName: "ItemHood",
            Category: ["SciFi"],
            Effect: [E.UseRemote],
            Priority: 55,
            PoseMapping: {},
            ParentGroup: {},
            Block: ["ItemHead"],
            Layer: [
                // 下巴那块黑边
                { Name: "G4", Priority: 8, AllowTypes: { g: 1 }, ColorGroup: "Gag" },

                // 开口器那块黑边
                { Name: "G5", Priority: 12, AllowTypes: { g: 1 }, ColorGroup: "Gag" },

                // 舌头和牙齿
                { Name: "舌头", Priority: 12, AllowTypes: { g: 1 }, AllowColorize: false },
                { Name: "牙齿", Priority: 12, AllowTypes: { g: 1 }, AllowColorize: false },

                // 1线 2头部结构 3外壳
                { Name: "G1" },
                { Name: "G2" },
                { Name: "G3", ColorGroup: "Shell" },

                { Name: "H1", ColorGroup: "Shell" },
                { Name: "H2" },
                { Name: "H3" },
            ],
        },
        {
            translation: { CN: "义肢拘束(头部)", EN: "Prosthetic Restraint (Head)" },
            extended: {
                Archetype: "modular",
                DrawImages: false,
                ChatTags: Tools.CommonChatTags(),
                Modules: [
                    {
                        Name: "Visor",
                        Key: "v",
                        Options: [
                            {},
                            { Property: { Effect: [E.BlindHeavy, E.BlockWardrobe] } },
                            {
                                Property: {
                                    Effect: [E.BlindTotal, E.BlockWardrobe, E.VRAvatars],
                                    CustomBlindBackground: "SynthWave",
                                },
                            },
                        ],
                    },
                    {
                        Name: "Gag",
                        Key: "g",
                        Options: [
                            {},
                            {
                                Prerequisite: ["AccessMouth"],
                                Property: {
                                    Block: ["ItemMouth", "ItemMouth2", "ItemMouth3"],
                                    Effect: [E.GagHeavy, E.BlockMouth],
                                },
                            },
                        ],
                    },
                ],
                ScriptHooks: { ScriptDraw: headScriptDraw, BeforeDraw: headBeforeDraw },
            },
            layerNames: {
                CN: {
                    Gag: "口塞",
                    Shell: "外壳",

                    G4: "下巴",
                    G5: "开口器",

                    G1: "线缆",
                    G2: "结构",
                    G3: "头部",

                    H1: "显示器",
                    H2: "屏幕",
                    H3: "灯",
                },
                EN: {
                    Gag: "Gag",
                    Shell: "Shell",

                    G4: "Chin",
                    G5: "Mouthpiece",

                    G1: "Wires",
                    G2: "Structure",
                    G3: "Head",

                    H1: "Visor",
                    H2: "Screen",
                    H3: "Lights",
                },
            },
            assetStrings: {
                CN: {
                    SelectBase: "配置义肢拘束(头部)",

                    ModuleVisor: "显示器",
                    SelectVisor: "配置头戴显示器",
                    Optionv0: "抬起",
                    Optionv1: "放下",
                    Optionv2: "VR模式",

                    Setv0: "SourceCharacter配置DestinationCharacterAssetName抬起头戴显示器。",
                    Setv1: "SourceCharacter配置DestinationCharacterAssetName放下头戴显示器。",
                    Setv2: "SourceCharacter配置DestinationCharacterAssetName进入VR模式。",

                    ModuleGag: "口塞",
                    SelectGag: "配置口塞",
                    Optiong0: "无",
                    Optiong1: "束舌口塞",

                    Setg0: "SourceCharacter配置DestinationCharacterAssetName移除束舌口塞。",
                    Setg1: "SourceCharacter配置DestinationCharacterAssetName添加束舌口塞。",
                },
                EN: {
                    SelectBase: "Configure Prosthetic Restraint (Head)",

                    ModuleVisor: "Visor",
                    SelectVisor: "Configure Visor",
                    Optionv0: "Up",
                    Optionv1: "Down",

                    Setv0: "SourceCharacter configures DestinationCharacter AssetName to raise the visor.",
                    Setv1: "SourceCharacter configures DestinationCharacter AssetName to lower the visor.",

                    ModuleGag: "Gag",
                    SelectGag: "Configure Gag",
                    Optiong0: "None",
                    Optiong1: "Tongue Restriction Gag",

                    Setg0: "SourceCharacter configures DestinationCharacter AssetName to remove the tongue restriction gag.",
                    Setg1: "SourceCharacter configures DestinationCharacter AssetName to add the tongue restriction gag.",
                },
            },
        },
    ],
];

HookManager.hookFunction("CommonDrawResolveAssetPose", 0, (args, next) => {
    const ret = next(args);

    const [C, Layer] = args;

    /** @type {Set<CustomGroupName>} */
    const upperBodyParts = new Set(
        /** @type {CustomGroupName[]}*/ ([
            "ArmsLeft",
            "ArmsRight",
            "BodyUpper",
            "BodyMarkings",
            "BodyMarkings2_Luzi",
            "Suit",
            "Suit_笨笨蛋Luzi",
        ])
    );

    if (upperBodyParts.has(Layer.Asset.Group.Name)) {
        const tItem = C.Appearance.find((app) => app.Asset.Group.Name === "ItemArms" && app.Asset.Name === "义肢拘束A");
        if (tItem) {
            return "BackElbowTouch";
        }
    }

    return ret;
});

HookManager.hookFunction("DialogMenuButtonBuild", 0, (args, next) => {
    next(args);
    const [C] = args;

    const basicBlockButtons = new Set(
        /** @type {DialogMenuButton[]} */ ([
            "Remove",
            "Struggle",
            "Unlock",
            "Remote",
            "RemoteDisable",
            "TightenLoosen",
            "Lock",
            "LockMenu",
        ])
    );

    const rulesBlockButtons = new Set(
        /** @type {DialogMenuButton[]} */ (["Remove", "Struggle", "Unlock", "TightenLoosen"])
    );

    const runFilter = (buttons, target) => {
        const idx = DialogMenuButton.findIndex((b) => buttons.has(b));
        if (idx > 0) {
            DialogMenuButton[idx] = /** @type {any} */ (target);
            DialogMenuButton = DialogMenuButton.filter((b) => !buttons.has(b));
        }
    };

    if (C.IsPlayer()) {
        monadic("group", C.FocusGroup)
            .then("armItem", () =>
                C.Appearance.find((i) => i.Asset.Name === "义肢拘束A" && i.Asset.Group.Name === "ItemArms")
            )
            .then((_, { group }) => InventoryGet(C, group.Name))
            .then((item, { armItem }) => {
                if (item.Asset.Name.includes("义肢拘束")) {
                    runFilter(basicBlockButtons, "Luzi_ProResBlock");
                } else if (extProp(armItem).LuziForbidStruggle) {
                    runFilter(rulesBlockButtons, "Luzi_ProResStruggle");
                }
            });
    }
});

/** @type {Translation.String} */
const interfaceStrings = {
    CN: {
        DialogMenuLuzi_ProResBlock: "义肢拘束阻止与此物品交互",
        DialogMenuLuzi_ProResStruggle: "义肢拘束阻止挣脱",
    },
    EN: {
        DialogMenuLuzi_ProResBlock: "Prosthetic Restraint blocks interaction with this item",
        DialogMenuLuzi_ProResStruggle: "Prosthetic Restraint prevents struggling",
    },
};

HookManager.hookFunction("InterfaceTextGet", 0, (args, next) => {
    const [key] = args;
    const langEntry = interfaceStrings[TranslationLanguage] || interfaceStrings["EN"] || interfaceStrings["CN"];
    if (langEntry && langEntry[key]) return langEntry[key];

    return next(args);
});

function injectItemClickStatus() {
    const target = /** @type {Object<string, DialogMenu<string, DialogInventoryItem>["GetClickStatus"]>} */ (
        DialogMenuMapping.items.clickStatusCallbacks
    );
    /** @type {DialogMenu<string, DialogInventoryItem>["GetClickStatus"]} */
    const callback = (C, _, cur) => {
        const tItem = C.Appearance.find((app) => app.Asset.Group.Name === "ItemArms" && app.Asset.Name === "义肢拘束A");
        const forbidStruggle = tItem && extProp(tItem).LuziForbidStruggle;
        if (C.IsPlayer() && tItem) {
            const langEntry = interfaceStrings[TranslationLanguage] || interfaceStrings["EN"] || interfaceStrings["CN"];
            if (cur && cur.Asset.Name.includes("义肢拘束")) {
                return langEntry.DialogMenuLuzi_ProResBlock;
            } else if (forbidStruggle) {
                return langEntry.DialogMenuLuzi_ProResStruggle;
            }
        }
        return null;
    };
    const key = "Luzi_ProResBlockClickCheck";
    if (!target[key]) target[key] = callback;
}

export default function () {
    AssetManager.addImageMapping({
        "Icons/Luzi_ProResBlock.png": `${resourceBaseURL}/Icons/Luzi_ProRes.png`,
        "Icons/Luzi_ProResStruggle.png": `${resourceBaseURL}/Icons/Luzi_ProRes.png`,
    });
    injectItemClickStatus();
    AssetManager.addAssetWithConfig(assets);
}

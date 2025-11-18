import { AssetManager } from "../../assetForward";
import { luziFixups } from "../../lib/fixups";

/** @type { AddAssetWithConfigParams []} */
const assets = [
    [
        "ItemHood",
        {
            Name: "毛毯头部-Luzi",
            Random: false,
            Block: [],
            Top: 0,
            Left: 0,
            Hide: ["HairBack"],
            Layer: [
                { Name: "上", Priority: 52 },
                { Name: "下", Priority: 1 },
            ],
        },
        { translation: { CN: "毛毯头部", EN: "Head Blanket", UA: "Обв'язка з ковдри", RU: "Покрывало на голову" } },
    ],
    [
        "ItemTorso",
        {
            Name: "胶带全身-Luzi",
            Gender: "F",
            Random: false,
            Top: 0,
            Left: 0,
            Difficulty: 10,
            SelfBondage: 6,
            Time: 30,
            RemoveTime: 40,
            AllowTighten: true,
            Audio: "DuctTapeRollShort",
            SetPose: ["BackElbowTouch", "LegsClosed"],
            Effect: [E.Block, E.BlockWardrobe, E.Slow],
            Prerequisite: ["HasBreasts"],
            Layer: [
                {
                    Name: "上",
                    Priority: 24,
                    ParentGroup: "BodyUpper",
                    PoseMapping: { BackElbowTouch: PoseType.DEFAULT },
                },
                { Name: "下", Priority: 24, ParentGroup: "BodyLower", PoseMapping: { LegsClosed: PoseType.DEFAULT } },
            ],
        },
        { translation: { CN: "胶带全身", EN: "Tape Full Body", UA: "Скотч на все тіло", RU: "Лента на всё тело" } },
    ],
    [
        "ItemTorso",
        {
            Name: "睡袋改-Luzi",
            Gender: "F",
            Random: false,
            Top: 0,
            Left: 0,
            Difficulty: 10,
            SelfBondage: 6,
            Time: 30,
            RemoveTime: 40,
            AllowLock: true,
            AllowTighten: true,
            DrawLocks: false,
            SetPose: ["BackElbowTouch", "LegsClosed"],
            Effect: [E.Block, E.BlockWardrobe, E.Slow],
            Prerequisite: ["HasBreasts"],
            SelfUnlock: false,
            Layer: [
                {
                    Name: "上",
                    Priority: 35,
                    ParentGroup: "BodyUpper",
                    PoseMapping: { BackElbowTouch: PoseType.DEFAULT },
                },
                { Name: "下", Priority: 0, ParentGroup: "BodyLower", PoseMapping: { LegsClosed: PoseType.DEFAULT } },
            ],
        },
        {
            translation: {
                CN: "睡袋改",
                EN: "Modified Sleeping Bag",
                UA: "Модифікований спальний мішок",
                RU: "Изменённый спальный мешок",
            },
        },
    ],
    [
        "ItemTorso",
        {
            Name: "全包毛毯改-Luzi",
            Gender: "F",
            Random: false,
            Top: 0,
            Left: 0,
            Difficulty: 10,
            SelfBondage: 6,
            Time: 30,
            RemoveTime: 40,
            AllowTighten: true,
            SetPose: ["BackElbowTouch", "LegsClosed"],
            Effect: [E.Block, E.BlockWardrobe, E.Slow],
            Prerequisite: ["HasBreasts"],
            Layer: [
                {
                    Name: "上",
                    Priority: 24,
                    ParentGroup: "BodyUpper",
                    PoseMapping: { BackElbowTouch: PoseType.DEFAULT },
                },
                { Name: "下", Priority: 24, ParentGroup: "BodyLower", PoseMapping: { LegsClosed: PoseType.DEFAULT } },
            ],
        },
        {
            translation: {
                CN: "全包毛毯改",
                EN: "Fully Wrapped Blanket",
                UA: "Повністю обгорнення ковдрою",
                RU: "Полностью завёрнутое покрывало",
            },
        },
    ],
    [
        "ItemTorso",
        {
            Name: "全包毛毯-Luzi",
            Gender: "F",
            Random: false,
            Top: 0,
            Left: 0,
            Difficulty: 10,
            SelfBondage: 6,
            Time: 30,
            RemoveTime: 40,
            AllowTighten: true,
            SetPose: ["BackElbowTouch", "LegsClosed"],
            Effect: [E.Block, E.BlockWardrobe, E.Slow],
            Prerequisite: ["HasBreasts"],
            DefaultColor: ["Default", "#841E1E"],
            Layer: [
                {
                    Name: "上",
                    Priority: 24,
                    ParentGroup: "BodyUpper",
                    PoseMapping: { BackElbowTouch: PoseType.DEFAULT },
                },
                {
                    Name: "下",
                    Priority: 24,
                    ParentGroup: "BodyLower",
                    CopyLayerColor: "上",
                    PoseMapping: { LegsClosed: PoseType.DEFAULT },
                },
                {
                    Name: "后",
                    Priority: 1,
                    ParentGroup: "BodyLower",
                    CopyLayerColor: "上",
                    PoseMapping: { LegsClosed: PoseType.DEFAULT },
                },
                {
                    Name: "丝带上",
                    Priority: 24,
                    ParentGroup: "BodyUpper",
                    PoseMapping: { BackElbowTouch: PoseType.DEFAULT },
                },
                {
                    Name: "丝带下",
                    Priority: 24,
                    ParentGroup: "BodyLower",
                    CopyLayerColor: "丝带上",
                    PoseMapping: { LegsClosed: PoseType.DEFAULT },
                },
            ],
        },
        {
            translation: {
                CN: "全包毛毯",
                EN: "Fully Wrapped Blanket",
                UA: "Повністю обгорнення ковдрою",
                RU: "Полностью завёрнутое покрывало",
            },
        },
    ],
];

export default function () {
    AssetManager.addAssetWithConfig(assets);
    for (const a of assets) {
        luziFixups(a[0], a[1].Name);
    }
}

import { AssetManager } from "../../assetForward";
import { FullMask } from "../fullMask";

/** @type {CustomAssetDefinition} */
const asset = {
    Name: "独角兽玩偶_Luzi",
    Random: false,
    Priority: 58,
    Difficulty: -2,
    Time: 15,
    RemoveTime: 10,
    Top: -45,
    AllowLock: true,
    Extended: true,
    EditOpacity: true,
    MinOpacity: 0,
    Opacity: 0,
    SetPose: ["AllFours"],
    Effect: [E.BlockWardrobe, E.Freeze],
    Layer: [
        {
            Name: "身体遮罩",
            AllowColorize: false,
            HasImage: false,
            Alpha: [{ Masks: [[0, 388, 500, 200]] }],
        },
        {
            Name: "头部遮罩",
            AllowColorize: false,
            HasImage: false,
            AllowTypes: { typed: 0 },
            Alpha: [
                {
                    Masks: [
                        [0, -200, 500, 270], //上
                        [0, 0, 154, 400], //左
                        [350, 0, 200, 400], //右
                        [0, 160, 172, 75], //左中
                        [336, 170, 100, 65], //右中
                    ],
                },
            ],
        },
        { Name: "身体", ColorGroup: "前", AllowTypes: { typed: [0, 1] } },
        { Name: "背景", ColorGroup: "后", Priority: 4, MinOpacity: 1, AllowTypes: { typed: [0, 1] } },
        { Name: "脚", AllowTypes: { typed: [0, 1] } },
        { Name: "头背景", ColorGroup: "后", Priority: 4, MinOpacity: 1, AllowTypes: { typed: 0 } },
        { Name: "头发后", ColorGroup: "头发", AllowTypes: { typed: 0 } },
        { Name: "耳朵外", ColorGroup: "前", AllowTypes: { typed: 0 } },
        { Name: "耳朵内", AllowTypes: { typed: 0 } },
        { Name: "头", ColorGroup: "前", AllowTypes: { typed: 0 } },
        { Name: "头发前", ColorGroup: "头发", AllowTypes: { typed: 0 } },
        { Name: "眼白", AllowTypes: { typed: 0 } },
        { Name: "瞳孔", AllowTypes: { typed: 0 } },
        { Name: "眉毛", AllowTypes: { typed: 0 } },
        { Name: "睫毛", AllowTypes: { typed: 0 } },
        { Name: "角", AllowTypes: { typed: 0 } },
        { Name: "高光", AllowTypes: { typed: 0 } },
    ],
};

const layerNames = {
    CN: {
        前: "前",
        背景: "身体",
        头背景: "头",
        后: "后",
        头发前: "前",
        头发后: "后",
    },
    EN: {
        身体: "Body",
        背景: "Body",
        脚: "Feet",
        头背景: "Head",
        头发后: "Back",
        耳朵外: "Ear Outer",
        耳朵内: "Ear Inner",
        头: "Head",
        头发前: "Front",
        眼白: "Sclera",
        瞳孔: "Pupil",
        眉毛: "Eyebrow",
        睫毛: "Eyelash",
        角: "Horn",
        高光: "Highlight",

        头发: "Hair",
        前: "Front",
        后: "Back",
    },
};

/** @type {TypedItemConfig} */
const extended = {
    Archetype: ExtendedArchetype.TYPED,
    DrawImages: false,
    Options: [{ Name: "戴上头套" }, { Name: "摘掉头套" }],
    BaselineProperty: { Opacity: 0.7 },
    ScriptHooks: {
        Init: PropertyOpacityInit,
        Load: PropertyOpacityLoad,
        Draw: PropertyOpacityDraw,
        Exit: PropertyOpacityExit,
    },
    DrawData: { elementData: ExtendedXYClothes[2].map((tuple) => ({ position: [tuple[0], tuple[1] + 100] })) },
};

const assetStrings = {
    CN: {
        Select: "选择独角兽玩偶配置",
        戴上头套: "戴上头套",
        摘掉头套: "摘掉头套",
        Set戴上头套: "SourceCharacter为TargetCharacter戴上了头套",
        Set摘掉头套: "SourceCharacter为TargetCharacter摘掉了头套",
    },
    EN: {
        Select: "Select Unicorn Doll Configuration",
        戴上头套: "Put on Headgear",
        摘掉头套: "Remove Headgear",
        Set戴上头套: "SourceCharacter puts on the headgear for TargetCharacter.",
        Set摘掉头套: "SourceCharacter removes the headgear from TargetCharacter.",
    },
    RU: {
        Select: "Выберите конфигурацию игрушки единорога",
        戴上头套: "Надеть шлем",
        摘掉头套: "Снять шлем",
        Set戴上头套: "SourceCharacter надевает шлем на TargetCharacter.",
        Set摘掉头套: "SourceCharacter снимает шлем с TargetCharacter.",
    },
    UA: {
        Select: "Виберіть конфігурацію лальки",
        戴上头套: "Надіти шолом",
        摘掉头套: "Зняти шолом",
        Set戴上头套: "SourceCharacter надіває шолом на DestinationCharacter.",
        Set摘掉头套: "SourceCharacter знімає шолом з DestinationCharacter.",
    },
};

const translation = {
    CN: "独角兽玩偶",
    EN: "Unicorn Stuffed Toy",
    UA: "Лялька єдинорога",
    RU: "Кукла единорога",
};

export default function () {
    AssetManager.addAssetWithConfig("ItemDevices", asset, { translation, layerNames, extended, assetStrings });
    FullMask.push("ItemDevices", asset.Name, ["身体遮罩", "头部遮罩"]);
}

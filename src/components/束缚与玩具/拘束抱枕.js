import { AssetManager } from "../../assetForward";
import { DialogTools } from "@mod-utils/Tools";

/** @type {CustomAssetDefinition} */
const asset = {
    Name: "拘束抱枕",
    Random: false,
    Gender: "F",
    Top: 0,
    Left: 0,
    Difficulty: 1,
    Time: 3,
    RemoveTime: 1,
    AllowLock: true,
    AllowTighten: true,
    DrawLocks: false,
    Extended: true,
    Prerequisite: [],
    ParentGroup: {},
    PoseMapping: { BaseUpper: "BaseUpper" },
    Block: [],
    Layer: [
        {
            Name: "抱枕",
            Priority: 46,
        },
        {
            Name: "绑带",
            Priority: 46,
            AllowTypes: { s: 1 },
        },
    ],
};
/** @type {ModularItemConfig} */
const extended = {
    Archetype: ExtendedArchetype.MODULAR,
    ChangeWhenLocked: false,
    Modules: [
        {
            Name: "绑带",
            Key: "s",
            DrawImages: false,
            Options: [
                {},
                {
                    Property: {
                        Block: ["ItemHands", "ItemHandheld"],
                        Effect: [E.Block, E.BlockWardrobe],
                        SetPose: ["BaseUpper"],
                        Difficulty: 20,
                    },
                    Effect: [E.Block, E.BlockWardrobe],
                },
                {
                    Property: {
                        Block: ["ItemHands", "ItemHandheld"],
                        Effect: [E.Block, E.BlockWardrobe],
                        SetPose: ["BaseUpper"],
                        Difficulty: 20,
                    },
                },
            ],
        },
        {
            Name: "乳头",
            Key: "n",
            DrawImages: false,
            Options: [
                {
                    Property: { Intensity: -1, Effect: ["Egged"] },
                },
                {
                    Prerequisite: ["AccessBreast"],
                    Property: { Intensity: 0, Effect: ["Egged", "Vibrating"] },
                },
                {
                    Prerequisite: ["AccessBreast"],
                    Property: { Intensity: 1, Effect: ["Egged", "Vibrating"] },
                },
                {
                    Prerequisite: ["AccessBreast"],
                    Property: { Intensity: 2, Effect: ["Egged", "Vibrating"] },
                },
                {
                    Prerequisite: ["AccessBreast"],
                    Property: { Intensity: 3, Effect: ["Egged", "Vibrating"] },
                },
            ],
        },
        {
            Name: "阴蒂",
            Key: "c",
            DrawImages: false,
            Options: [
                {
                    Property: { Intensity: -1, Effect: ["Egged"] },
                },
                {
                    Prerequisite: ["AccessCrotch"],
                    Property: { Intensity: 0, Effect: ["Egged", "Vibrating"] },
                },
                {
                    Prerequisite: ["AccessCrotch"],
                    Property: { Intensity: 1, Effect: ["Egged", "Vibrating"] },
                },
                {
                    Prerequisite: ["AccessCrotch"],
                    Property: { Intensity: 2, Effect: ["Egged", "Vibrating"] },
                },
                {
                    Prerequisite: ["AccessCrotch"],
                    Property: { Intensity: 3, Effect: ["Egged", "Vibrating"] },
                },
            ],
        },
    ],
};

/** @type {Translation.Dialog} */
const dialogs = DialogTools.replicateGroupedItemDialog(["ItemArms"], ["拘束抱枕"], {
    CN: {
        SelectBase: "选择附加",
        Select绑带: "选择绑带状态",
        Module绑带: "绑带状态",
        Select乳头: "选择乳头玩具",
        Module乳头: "乳头跳蛋",
        Select阴蒂: "选择阴蒂玩具",
        Module阴蒂: "阴蒂跳蛋",
        Options0: "无",
        Options1: "手腕绑带",
        Options2: "隐形绑带",
        Optionn0: "无",
        Optionn1: "低",
        Optionn2: "中",
        Optionn3: "高",
        Optionn4: "最高",
        Optionc0: "无",
        Optionc1: "低",
        Optionc2: "中",
        Optionc3: "高",
        Optionc4: "最高",
        Sets0: "SourceCharacter取下了DestinationCharacter抱枕上的手腕绑带，让她的手能够自由活动",
        Sets1: "SourceCharacter绑上了DestinationCharacter抱枕上的手腕绑带，让她的手紧紧地绑在了抱枕上",
        Sets2:
            "SourceCharacter绑上了DestinationCharacter抱枕上的几乎无法察觉的透明绑带，让她的手不被人注意的情况下紧紧地绑在了抱枕上",

        Setn0: "SourceCharacter取下了DestinationCharacter抱枕上的乳头跳蛋",
        Setn1: "SourceCharacter将DestinationCharacter抱枕接上吮吸跳蛋吸住了她的乳头，并微微逗弄起她来",
        Setn2:
            "SourceCharacter将DestinationCharacter抱枕接上吮吸跳蛋吸住了她的乳头，并逐渐提升到中等的频率",
        Setn3:
            "SourceCharacter将DestinationCharacter抱枕接上吮吸跳蛋吸住了她的乳头，并猛烈地颤动起来！",
        Setn4:
            "SourceCharacter将DestinationCharacter抱枕接上吮吸跳蛋吸住了她的乳头，并突然以最大强度振动起来！",

        Setc0: "SourceCharacter取下了DestinationCharacter抱枕上的阴蒂跳蛋",
        Setc1: "SourceCharacter将DestinationCharacter抱枕接上吮吸跳蛋吸住了她的阴蒂，并微微逗弄起她来",
        Setc2:
            "SourceCharacter将DestinationCharacter抱枕接上吮吸跳蛋吸住了她的阴蒂，并逐渐提升到中等的频率",
        Setc3:
            "SourceCharacter将DestinationCharacter抱枕接上吮吸跳蛋吸住了她的阴蒂，并猛烈地颤动起来！",
        Setc4:
            "SourceCharacter将DestinationCharacter抱枕接上吮吸跳蛋吸住了她的阴蒂，并突然以最大强度振动起来！",
    },
    EN: {
        SelectBase: "Select Attachment",
        Select绑带: "Select Strap Status",
        Module绑带: "Strap Status",
        Select乳头: "Select Nipple Toy",
        Module乳头: "Nipple Vibrator",
        Select阴蒂: "Select Clitoris Toy",
        Module阴蒂: "Clitoris Vibrator",
        Options0: "None",
        Options1: "Wrist Strap",
        Options2: "Invisible straps",
        Optionn0: "None",
        Optionn1: "Low",
        Optionn2: "Medium",
        Optionn3: "High",
        Optionn4: "Highest",
        Optionc0: "None",
        Optionc1: "Low",
        Optionc2: "Medium",
        Optionc3: "High",
        Optionc4: "Highest",
        Sets0:
            "SourceCharacter removes the wrist straps from DestinationCharacter pillow, allowing her hands to move freely",
        Sets1:
            "SourceCharacter ties the wrist straps from DestinationCharacter pillow, tying her hands tightly to the pillow",
        Sets2:
            "SourceCharacter puts on the barely perceptible transparent straps of DestinationCharacter pillow, keeping her hands tightly bound to the pillow without being noticed",

        Setn0: "SourceCharacter removes the nipple vibrator from DestinationCharacter pillow",
        Setn1:
            "SourceCharacter connected DestinationCharacter pillow to the sucking vibrator and sucked her nipples, and teased her slightly",
        Setn2:
            "SourceCharacter connected DestinationCharacter pillow to the sucking vibrator and sucked her nipples, and gradually increased to a medium frequency",
        Setn3:
            "SourceCharacter connected DestinationCharacter pillow to the sucking vibrator and sucked her nipples, and vibrated violently!",
        Setn4:
            "SourceCharacter connected DestinationCharacter pillow to the sucking vibrator and sucked her nipples, and suddenly vibrated at the maximum intensity! ",

        Setc0: "SourceCharacter removed the clitoral vibrator from DestinationCharacter pillow",
        Setc1:
            "SourceCharacter connected DestinationCharacter pillow to the sucking vibrator and sucked her clitoris, and teased her slightly",
        Setc2:
            "SourceCharacter connected DestinationCharacter pillow to the sucking vibrator and sucked her clitoris, and gradually increased to a medium frequency",
        Setc3:
            "SourceCharacter connected DestinationCharacter pillow to the sucking vibrator and sucked her clitoris, and vibrated violently! ",
        Setc4:
            "SourceCharacter connected DestinationCharacter pillow to the sucking vibrator and sucked her clitoris, and suddenly vibrated at the maximum intensity! ",
    },
    RU: {
        SelectBase: "Select Attachment",
        Select绑带: "Select Strap Status",
        Module绑带: "Strap Status",
        Select乳头: "Select Nipple Toy",
        Module乳头: "Nipple Vibrator",
        Select阴蒂: "Select Clitoris Toy",
        Module阴蒂: "Clitoris Vibrator",
        Options0: "None",
        Options1: "Wrist Strap",
        Options2: "Invisible straps",
        Optionn0: "None",
        Optionn1: "Low",
        Optionn2: "Medium",
        Optionn3: "High",
        Optionn4: "Highest",
        Optionc0: "None",
        Optionc1: "Low",
        Optionc2: "Medium",
        Optionc3: "High",
        Optionc4: "Highest",
        Sets0:
            "SourceCharacter removes the wrist straps from DestinationCharacter pillow, allowing her hands to move freely",
        Sets1:
            "SourceCharacter ties the wrist straps from DestinationCharacter pillow, tying her hands tightly to the pillow",
        Sets2:
            "SourceCharacter puts on the barely perceptible transparent straps of DestinationCharacter pillow, keeping her hands tightly bound to the pillow without being noticed",

        Setn0: "SourceCharacter removes the nipple vibrator from DestinationCharacter pillow",
        Setn1:
            "SourceCharacter connected DestinationCharacter pillow to the sucking vibrator and sucked her nipples, and teased her slightly",
        Setn2:
            "SourceCharacter connected DestinationCharacter pillow to the sucking vibrator and sucked her nipples, and gradually increased to a medium frequency",
        Setn3:
            "SourceCharacter connected DestinationCharacter pillow to the sucking vibrator and sucked her nipples, and vibrated violently!",
        Setn4:
            "SourceCharacter connected DestinationCharacter pillow to the sucking vibrator and sucked her nipples, and suddenly vibrated at the maximum intensity! ",

        Setc0: "SourceCharacter removed the clitoral vibrator from DestinationCharacter pillow",
        Setc1:
            "SourceCharacter connected DestinationCharacter pillow to the sucking vibrator and sucked her clitoris, and teased her slightly",
        Setc2:
            "SourceCharacter connected DestinationCharacter pillow to the sucking vibrator and sucked her clitoris, and gradually increased to a medium frequency",
        Setc3:
            "SourceCharacter connected DestinationCharacter pillow to the sucking vibrator and sucked her clitoris, and vibrated violently! ",
        Setc4:
            "SourceCharacter connected DestinationCharacter pillow to the sucking vibrator and sucked her clitoris, and suddenly vibrated at the maximum intensity! ",
    },
    UA: {
        SelectBase: "Select Attachment",
        Select绑带: "Select Strap Status",
        Module绑带: "Strap Status",
        Select乳头: "Select Nipple Toy",
        Module乳头: "Nipple Vibrator",
        Select阴蒂: "Select Clitoris Toy",
        Module阴蒂: "Clitoris Vibrator",
        Options0: "None",
        Options1: "Wrist Strap",
        Options2: "Invisible straps",
        Optionn0: "None",
        Optionn1: "Low",
        Optionn2: "Medium",
        Optionn3: "High",
        Optionn4: "Highest",
        Optionc0: "None",
        Optionc1: "Low",
        Optionc2: "Medium",
        Optionc3: "High",
        Optionc4: "Highest",
        Sets0:
            "SourceCharacter removes the wrist straps from DestinationCharacter pillow, allowing her hands to move freely",
        Sets1:
            "SourceCharacter ties the wrist straps from DestinationCharacter pillow, tying her hands tightly to the pillow",
        Sets2:
            "SourceCharacter puts on the barely perceptible transparent straps of DestinationCharacter pillow, keeping her hands tightly bound to the pillow without being noticed",

        Setn0: "SourceCharacter removes the nipple vibrator from DestinationCharacter pillow",
        Setn1:
            "SourceCharacter connected DestinationCharacter pillow to the sucking vibrator and sucked her nipples, and teased her slightly",
        Setn2:
            "SourceCharacter connected DestinationCharacter pillow to the sucking vibrator and sucked her nipples, and gradually increased to a medium frequency",
        Setn3:
            "SourceCharacter connected DestinationCharacter pillow to the sucking vibrator and sucked her nipples, and vibrated violently!",
        Setn4:
            "SourceCharacter connected DestinationCharacter pillow to the sucking vibrator and sucked her nipples, and suddenly vibrated at the maximum intensity! ",

        Setc0: "SourceCharacter removed the clitoral vibrator from DestinationCharacter pillow",
        Setc1:
            "SourceCharacter connected DestinationCharacter pillow to the sucking vibrator and sucked her clitoris, and teased her slightly",
        Setc2:
            "SourceCharacter connected DestinationCharacter pillow to the sucking vibrator and sucked her clitoris, and gradually increased to a medium frequency",
        Setc3:
            "SourceCharacter connected DestinationCharacter pillow to the sucking vibrator and sucked her clitoris, and vibrated violently! ",
        Setc4:
            "SourceCharacter connected DestinationCharacter pillow to the sucking vibrator and sucked her clitoris, and suddenly vibrated at the maximum intensity! ",
    },
});

const translations = {
    CN: "拘束抱枕",
    EN: "Restraint Pillow",
    RU: "удерживающая подушка",
    UA: "утримувальна подушка",
};

export default function () {
    AssetManager.addAsset("ItemArms", asset, extended, translations);
    AssetManager.addCustomDialog(dialogs);
}

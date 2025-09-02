/**
 * 物品互动对话的按钮
 * @template {ExtendedItemData<any>} DataType
 * @typedef {Object} ButtonProperty
 * @property {Rect} location 按钮位置
 * @property {(data: DataType, item:Item, chara:Character) => boolean} [show] 按钮是否显示，留空则默认为显示
 * @property {(item:Item, chara:Character) => boolean} [enable] 按钮是否可用，留空则默认为可用（显示的按钮才可用）
 * @property {string} key 按钮文本键值
 * @property {(item:Item, chara:Character) => string | undefined} [hover] 按钮悬停时显示的文本，如果未定义则不显示
 * @property {(item:Item, chara:Character) => void} [onclick] 按钮点击时的回调，必须显示的可用按钮才会触发，留空则不触发
 * @property {true} [update] 按钮点击触发后是否要更新物品，留空则不更新
 * @property {string} [actionKey] 按钮点击触发后要发送的动作文本键值，留空则不发送
 * @property {boolean} [leaveDialog] 按钮点击触发后，是否关闭Dialog，默认为true
 * @property {((dict:DictionaryBuilder, item:Item)=>DictionaryBuilder)} [actionProcess] 按钮点击触发后要发送的动作文本的额外处理步骤
 */

/**
 * 物品互动对话的属性文本
 * @template {ExtendedItemData<any>} DataType
 * @typedef {Object} ParameterProperty
 * @property {number} Y 属性文本的Y坐标
 * @property {(data: DataType, item:Item, chara:Character) => boolean} [show] 文本是否显示，留空则默认为显示
 * @property {string} key 属性文本键值
 * @property {(item:Item, chara:Character) => string} value 属性文本的值
 */

import { DialogTools } from "@mod-utils/Tools";

/**
 * @typedef {(dialogKey: (id: string) => string, id: string, location: { x: number, y: number }, hover?: string) => void} DrawButtonFunction
 */

/** @type {DrawButtonFunction} */
const drawButton = (dialogKey, id, location, hover) => {
    const rect = /** @type {RectTuple} */ (Object.values(location));
    DrawButton(...rect, AssetTextGet(dialogKey(id)), "White", null, hover && AssetTextGet(dialogKey(hover)), false);
};
/** @type {DrawButtonFunction} */
const drawButtonDisable = (dialogKey, id, location, hover) => {
    const rect = /** @type {RectTuple} */ (Object.values(location));
    DrawButton(...rect, AssetTextGet(dialogKey(id)), "Gray", null, hover && AssetTextGet(dialogKey(hover)), true);
};

/**
 * @param {Rect} rect
 * @returns {boolean}
 */
export function RMouseIn(rect) {
    return MouseIn(rect.x, rect.y, rect.w, rect.h);
}

/**
 * @template {ExtendedItemData<any>} DataType
 */
class DialogButtons {
    constructor() {
        this._buttons = /** @type {ButtonProperty<DataType>[]} */ ([]);
        this._params = /** @type {ParameterProperty<DataType>[]} */ ([]);
    }

    /** @type {ExtendedItemScriptHookCallbacks.Draw<DataType>} */
    draw(data, _) {
        if (!DialogFocusItem || !CurrentCharacter) return;

        const dialogKey = DialogTools.dialogKey(DialogFocusItem);

        const oldAlign = MainCanvas.textAlign;
        MainCanvas.textAlign = "center";
        for (const button of this._buttons) {
            if (button.show && !button.show(data, DialogFocusItem, CurrentCharacter)) continue;

            const hover = button.hover?.(DialogFocusItem, CurrentCharacter);

            if (!button.enable || button.enable(DialogFocusItem, CurrentCharacter)) {
                drawButton(dialogKey, button.key, button.location, hover);
            } else {
                drawButtonDisable(dialogKey, button.key, button.location, hover);
            }
        }

        const LeftPartX = 1470;
        const RightPartX = 1530;
        for (const param of this._params) {
            if (!param.show(data, DialogFocusItem, CurrentCharacter)) continue;

            MainCanvas.textAlign = "right";
            DrawTextFit(AssetTextGet(dialogKey(param.key)), LeftPartX, param.Y, 300, "White", "Gray");

            MainCanvas.textAlign = "left";
            const text = param.value(DialogFocusItem, CurrentCharacter);
            DrawTextFit(text, RightPartX, param.Y, 300, "White", "Gray");
        }

        MainCanvas.textAlign = oldAlign;
    }

    /** @param {ButtonProperty<DataType>[]} buttons */
    buttons(buttons) {
        this._buttons.push(...buttons);
        return this;
    }

    /** @param {ParameterProperty<DataType>[]} params */
    params(params) {
        this._params.push(...params);
        return this;
    }

    /** @type {ExtendedItemScriptHookCallbacks.Click<DataType>} */
    click(data, _) {
        if (!DialogFocusItem || !CurrentCharacter) return;

        const update = () => {
            CharacterRefresh(CurrentCharacter);
            ChatRoomCharacterItemUpdate(CurrentCharacter, DialogFocusItem.Asset.Group.Name);
        };
        const dialogKey = DialogTools.dialogKey(DialogFocusItem);

        const clicked = this._buttons.find(
            (btn) =>
                btn.onclick &&
                RMouseIn(btn.location) &&
                (!btn.show || btn.show(data, DialogFocusItem, CurrentCharacter)) &&
                (!btn.enable || btn.enable(DialogFocusItem, CurrentCharacter))
        );

        if (!clicked) return;

        clicked.onclick(DialogFocusItem, CurrentCharacter);
        if (clicked.update) update();
        if (clicked.actionKey) {
            const builder = new DictionaryBuilder()
                .sourceCharacter(Player)
                .targetCharacter(CharacterGetCurrent())
                .destinationCharacterName(CharacterGetCurrent())
                .asset(DialogFocusItem.Asset, "AssetName", DialogFocusItem.Craft && DialogFocusItem.Craft.Name);
            const Dictionary = (
                typeof clicked.actionProcess === "function" ? clicked.actionProcess(builder, DialogFocusItem) : builder
            ).build();
            ChatRoomPublishCustomAction(dialogKey(clicked.actionKey), clicked.leaveDialog !== false, Dictionary);
        } else if (clicked.leaveDialog !== false) {
            DialogLeave();
        }
    }
}

/**
 * @overload
 * @param {"modular"} mode
 * @param {ButtonProperty<ModularItemData>[]} buttons
 * @param {ParameterProperty<ModularItemData>[]} params
 * @returns {DialogButtons<ModularItemData>}
 */
/**
 * @overload
 * @param {"typed"} mode
 * @param {ButtonProperty<TypedItemData>[]} buttons
 * @param {ParameterProperty<TypedItemData>[]} params
 * @returns {DialogButtons<TypedItemData>}
 */
/**
 * @overload
 * @param {"noarch"} mode
 * @param {ButtonProperty<NoArchItemData>[]} buttons
 * @param {ParameterProperty<NoArchItemData>[]} params
 * @returns {DialogButtons<NoArchItemData>}
 */
/**
 * @template {ExtendedItemData<any>} DataType
 * @param {"modular" | "typed" | "noarch"} _
 * @param {ButtonProperty<DataType>[]} buttons
 * @param {ParameterProperty<DataType>[]} params
 * @returns {DialogButtons<DataType>}
 */
export function createItemDialog(_, buttons, params) {
    return new DialogButtons().buttons(buttons).params(params);
}

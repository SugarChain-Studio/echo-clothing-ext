import { DialogTools } from "@mod-utils/Tools";

/** @type {(dialogKey:(id:string)=>string) => (id:string) => string} */
const createText = (dialogKey) => (id) => AssetTextGet(dialogKey(id));

/** @type {ItemDialog.DrawButtonFunction} */
const drawButton = (text, id, location, hover) => {
    const rect = /** @type {RectTuple} */ (Object.values(location));
    DrawButton(...rect, text(id), "White", null, hover && text(hover), false);
};
/** @type {ItemDialog.DrawButtonFunction} */
const drawButtonDisable = (text, id, location, hover) => {
    const rect = /** @type {RectTuple} */ (Object.values(location));
    DrawButton(...rect, text(id), "Gray", null, hover && text(hover), true);
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
    /**
     * @typedef {(data:DataType, item: Item, character: Character) => void} CallbackType
     */

    /**
     * @typedef {(original: ()=>void, data:DataType, item: Item, character: Character) => void} CallbackWithOriginalType
     */

    constructor() {
        /** @private */
        this._buttons = /** @type {ItemDialog.ButtonConfig<DataType>[]} */ ([]);
        /** @private */
        this._params = /** @type {ItemDialog.ParameterConfig<DataType>[]} */ ([]);
        /** @private */
        this._texts = /** @type {ItemDialog.TextConfig<DataType>[]} */ ([]);
        /** @private */
        this._checkboxes = /** @type {ItemDialog.CheckBoxConfig<DataType>[]} */ ([]);

        /** @private */
        this._ondraw = /** @type {CallbackType | undefined} */ (undefined);
        /** @private */
        this._onload = /** @type {CallbackType | undefined} */ (undefined);
        /** @private */
        this._onexit = /** @type {CallbackType | undefined} */ (undefined);

        /** @private */
        this._overrideClickExit = /** @type {CallbackWithOriginalType | undefined} */ (undefined);
    }

    /** @param {ItemDialog.ButtonConfig<DataType>[]} buttons */
    addButtons(buttons) {
        this._buttons.push(...buttons);
        return this;
    }

    /** @param {ItemDialog.ParameterConfig<DataType>[]} params */
    addParams(params) {
        this._params.push(...params);
        return this;
    }

    /** @param {ItemDialog.TextConfig<DataType>[]} texts */
    addTexts(texts) {
        this._texts.push(...texts);
        return this;
    }

    /** @param {ItemDialog.CheckBoxConfig<DataType>[]} checkboxes */
    addCheckBoxes(checkboxes) {
        this._checkboxes.push(...checkboxes);
        return this;
    }

    /**
     * @param {CallbackType} draw
     */
    onDraw(draw) {
        this._ondraw = draw;
    }

    /**
     * @private
     * @param {DataType} data
     */
    _draw(data) {
        const chara = CharacterGetCurrent();
        const item = DialogFocusItem;
        if (!item || !chara) return;

        const text = createText(DialogTools.dialogKey(item));

        const ctx = { data, item, chara };
        const ctxText = { data, item, chara, text };

        const oldAlign = MainCanvas.textAlign;
        MainCanvas.textAlign = "center";
        for (const button of this._buttons) {
            if (button.show && !button.show(ctx)) continue;

            const hover = button.hover?.(ctx);

            if (!button.enable || button.enable(ctx)) {
                drawButton(text, button.key, button.location, hover);
            } else {
                drawButtonDisable(text, button.key, button.location, hover);
            }
        }

        const LeftPartX = 1470;
        const RightPartX = 1530;
        for (const param of this._params) {
            if (!param.show(ctx)) continue;

            MainCanvas.textAlign = "right";
            DrawTextFit(text(param.key), LeftPartX, param.Y, 300, "White", "Gray");

            MainCanvas.textAlign = "left";
            const valueText = param.value(ctxText);
            DrawTextFit(valueText, RightPartX, param.Y, 300, "White", "Gray");
        }

        for (const param of this._texts) {
            const textValue = param.text(ctxText);
            if (!textValue) continue;

            const oldAlign = MainCanvas.textAlign;
            MainCanvas.textAlign = param.align ?? "center";
            const { x, y, w } = param.location;
            DrawTextFit(textValue, x, y, w, "White", param.backColor);
            MainCanvas.textAlign = oldAlign;
        }

        const oldBaseline = MainCanvas.textBaseline;
        MainCanvas.textBaseline = "middle";
        MainCanvas.textAlign = "left";
        for (const box of this._checkboxes) {
            if (box.show && !box.show(ctx)) continue;
            const enable = !box.enable || box.enable(ctx);
            const { x, y } = box.location;
            const { w, h } = /**@type {Partial<Rect>} */ (box.location);
            const checked = box.checked(ctx);
            const textValue = box.text(ctxText);

            const X = x + (w ?? 64) + 5;
            const Y = y + (h ?? 64) / 2;

            DrawCheckbox(x, y, w ?? 64, h ?? 64, "", checked, !enable);
            if (box.textWidth) DrawTextFit(textValue, X, Y, box.textWidth, "White", "Gray");
            else DrawText(textValue, X, Y, "White", "Gray");
        }
        MainCanvas.textBaseline = oldBaseline;
        MainCanvas.textAlign = oldAlign;

        this._ondraw?.(data, item, chara);
    }

    /**
     * @private
     * @param {DataType} data
     * @param {()=>void} original
     */
    _click(data, original) {
        const chara = CharacterGetCurrent();
        const item = DialogFocusItem;
        if (!item || !chara) return;

        if (this._overrideClickExit && MouseIn(1885, 25, 90, 90)) {
            this._overrideClickExit(original, data, item, chara);
        } else {
            original();
        }

        const ctx = { data, item, chara };

        /** @type {(arg0:ItemDialog.ButtonConfig<DataType>["update"])=>void} */
        const update = (arg0) => {
            CharacterRefresh(chara);
            if (arg0 === true) ChatRoomCharacterItemUpdate(chara, item.Asset.Group.Name);
            else if (arg0 === "full") ChatRoomCharacterUpdate(chara);
            else if (typeof arg0 === "string") ChatRoomCharacterItemUpdate(chara, /** @type {AssetGroupName} */ (arg0));
        };
        const dialogKey = DialogTools.dialogKey(item);

        /** @type {ItemDialog.InteractableConfig<DataType>} */
        const clicked = (() => {
            const btn = this._buttons.find(
                (btn) =>
                    btn.onclick &&
                    RMouseIn(btn.location) &&
                    (!btn.show || btn.show(ctx)) &&
                    (!btn.enable || btn.enable(ctx))
            );
            if (btn) {
                btn.onclick(ctx);
                return btn;
            }

            const box = this._checkboxes.find(
                (box) =>
                    box.onclick &&
                    RMouseIn({ w: 64, h: 64, ...box.location }) &&
                    (!box.show || box.show(ctx)) &&
                    (!box.enable || box.enable(ctx))
            );
            if (box) {
                box.onclick(ctx);
                return box;
            }
        })();

        if (clicked) {
            if (clicked.update) update(clicked.update);
            else if (clicked.update === undefined) {
                if (item.Asset.Group.Category === "Item") update(true);
                else CharacterRefresh(chara, false);
            }
            if (clicked.actionKey) {
                const key = typeof clicked.actionKey === "function" ? clicked.actionKey(ctx) : clicked.actionKey;
                const builder = new DictionaryBuilder()
                    .sourceCharacter(Player)
                    .targetCharacter(chara)
                    .destinationCharacterName(chara)
                    .asset(item.Asset, "AssetName", item.Craft && item.Craft.Name);
                const Dictionary = (
                    typeof clicked.actionProcess === "function" ? clicked.actionProcess(builder, item) : builder
                ).build();
                ChatRoomPublishCustomAction(dialogKey(key), !!clicked.leaveDialog, Dictionary);
            } else if (!!clicked.leaveDialog) {
                DialogLeave();
            }
        }
    }

    /**
     * @private
     * @param {DataType} data
     */
    _load(data) {
        const C = CharacterGetCurrent();
        const Item = DialogFocusItem;
        if (!Item || !C) return;
        this._onload?.(data, Item, C);
    }

    /**
     * @private
     * @param {DataType} data
     */
    _exit(data) {
        const C = CharacterGetCurrent();
        const Item = DialogFocusItem;
        if (!Item || !C) return;
        this._onexit?.(data, Item, C);
    }

    /**
     * @param {CallbackType} load
     */
    onLoad(load) {
        this._onload = load;
        return this;
    }

    /**
     * @param {CallbackType} exit
     */
    onExit(exit) {
        this._onexit = exit;
        return this;
    }

    /**
     * @param {CallbackWithOriginalType} clickExit
     */
    overrideClickExit(clickExit) {
        this._overrideClickExit = clickExit;
        return this;
    }

    /**
     * @param {("Load" | "Exit" |"Draw"|"Click")[]} [keys] 要启用的hook名称，默认为["Click", "Draw"]
     * @param {ExtendedItemCapsScriptHooksStruct<DataType, any>} [base] 基础hook
     * @return {ExtendedItemCapsScriptHooksStruct<DataType, any>}
     */
    createHooks(keys = ["Click", "Draw"], base = {}) {
        const hooks = { ...base };
        const originThen = (func) => (data, originalFunction) => {
            originalFunction?.();
            func(data);
        };
        for (const key of keys) {
            hooks[key] = (() => {
                switch (key) {
                    case "Load":
                        return originThen((data) => this._load(data));
                    case "Exit":
                        return originThen((data) => this._exit(data));
                    case "Click":
                        return (data, original) => this._click(data, original);
                    case "Draw":
                        return originThen((data) => this._draw(data));
                    default:
                        return () => {};
                }
            })();
        }
        return hooks;
    }
}

/**
 * Factory that creates a DialogButtons instance for a generic DataType.
 * @template {ExtendedItemData<any>} DataType
 * @param {ItemDialog.ButtonConfig<DataType>[]} [buttons]
 * @param {ItemDialog.ParameterConfig<DataType>[]} [params]
 * @returns {DialogButtons<DataType>}
 */
function createItemDialog(buttons, params) {
    const ret = /** @type {DialogButtons<DataType>}*/ (new DialogButtons());
    if (buttons) ret.addButtons(buttons);
    if (params) ret.addParams(params);
    return ret;
}

/**
 * Loose-typed wrapper for modular dialogs. Accepts any button/param shapes and
 * returns a DialogButtons instance typed for ModularItemData.
 * @param {ItemDialog.ButtonConfig<ModularItemData>[]} [buttons]
 * @param {ItemDialog.ParameterConfig<ModularItemData>[]} [params]
 * @returns {DialogButtons<ModularItemData>}
 */
export function createItemDialogModular(buttons, params) {
    return /** @type {DialogButtons<ModularItemData>} */ (createItemDialog(buttons, params));
}

/**
 * Loose-typed wrapper for typed dialogs.
 * @param {ItemDialog.ButtonConfig<TypedItemData>[]} [buttons]
 * @param {ItemDialog.ParameterConfig<TypedItemData>[]} [params]
 * @returns {DialogButtons<TypedItemData>}
 */
export function createItemDialogTyped(buttons, params) {
    return /** @type {DialogButtons<TypedItemData>} */ (createItemDialog(buttons, params));
}

/**
 * Loose-typed wrapper for noarch dialogs.
 * @param {ItemDialog.ButtonConfig<NoArchItemData>[]} [buttons]
 * @param {ItemDialog.ParameterConfig<NoArchItemData>[]} [params]
 * @returns {DialogButtons<NoArchItemData>}
 */
export function createItemDialogNoArch(buttons, params) {
    return /** @type {DialogButtons<NoArchItemData>} */ (createItemDialog(buttons, params));
}

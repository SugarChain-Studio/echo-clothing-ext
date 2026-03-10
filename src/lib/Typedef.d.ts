declare namespace ItemDialog {
    type DrawButtonFunction = (
        dialogKey: (id: string) => string,
        id: string,
        location: { x: number; y: number },
        hover?: string
    ) => void;

    interface DialogDrawContext<DataType extends ExtendedItemData<any>> {
        data: DataType;
        item: Item;
        chara: Character;
    }

    interface DialogDrawContextWithText<DataType extends ExtendedItemData<any>> extends DialogDrawContext<DataType> {
        text: (id: string) => string;
    }

    /** 可交互元素的配置 */
    interface InteractableConfig<DataType extends ExtendedItemData<any>> {
        /** 点击触发后是否要更新物品，物品默认会更新物品所在栏，其他默认不更新 */
        update?: boolean | "full" | AssetGroupItemName;
        /** 点击触发后要发送的动作文本键值，留空则不发送 */
        actionKey?: string | ((ctx: DialogDrawContext<DataType>) => string);
        /** 点击触发后，是否关闭Dialog，默认为false */
        leaveDialog?: boolean;
        /** 点击触发后要发送的动作文本的额外处理步骤 */
        actionProcess?: (dict: DictionaryBuilder, item: Item) => DictionaryBuilder;
    }

    /** 物品互动对话的按钮 */
    interface ButtonConfig<DataType extends ExtendedItemData<any>> extends InteractableConfig<DataType> {
        /** 按钮位置 */
        location: Rect;
        /** 按钮是否显示，留空则默认为显示 */
        show?: (ctx: DialogDrawContext<DataType>) => boolean;
        /** 按钮是否可用，留空则默认为可用（显示的按钮才可用） */
        enable?: (ctx: DialogDrawContext<DataType>) => boolean;
        /** 按钮文本键值 */
        key: string;
        /** 按钮悬停时显示的文本，如果未定义则不显示 */
        hover?: (ctx: DialogDrawContext<DataType>) => string | undefined;
        /** 按钮点击时的回调，必须显示的可用按钮才会触发，留空则不触发 */
        onclick?: (ctx: DialogDrawContext<DataType>) => void;
        /** 按钮是否需要解锁权限才可用，此处理如同一个额外的 enable 条件 */
        requireLockPermission?: boolean;
    }

    /** 物品互动对话的属性文本 */
    interface ParameterConfig<DataType extends ExtendedItemData<any>> {
        /** 属性文本的Y坐标 */
        Y: number;
        /** 文本是否显示，留空则默认为显示 */
        show?: (ctx: DialogDrawContext<DataType>) => boolean;
        /** 属性文本的键值 */
        key: string;
        /** 属性文本的属性值 */
        value: (ctx: DialogDrawContextWithText<DataType>) => string;
    }

    /** 物品互动对话的普通文本 */
    interface TextConfig<DataType extends ExtendedItemData<any>> {
        /** 文本的位置和最大宽度 */
        location: { x: number; y: number; w: number };
        /** 文本的对齐方式，默认为center */
        align?: "left" | "center" | "right";
        /** 文本的背景颜色 */
        backColor?: string;
        /** 普通文本的值，返回undefined则不显示 */
        text: (ctx: DialogDrawContextWithText<DataType>) => string | undefined;
    }

    /** 物品互动对话的复选框 */
    interface CheckBoxConfig<DataType extends ExtendedItemData<any>> extends InteractableConfig<DataType> {
        /** 复选框是否显示，默认显示 */
        show?: (ctx: DialogDrawContext<DataType>) => boolean;
        /** 复选框是否可用，默认可用 */
        enable?: (ctx: DialogDrawContext<DataType>) => boolean;
        /** 复选框的文本 */
        text: (ctx: DialogDrawContextWithText<DataType>) => string;
        /** 复选框文本限宽，默认不限制 */
        textWidth?: number;
        /** 复选框的位置和大小，默认宽高 64x64 */
        location: { x: number; y: number } | Rect;
        /** 复选框是否选中 */
        checked: (ctx: DialogDrawContext<DataType>) => boolean;
        /** 复选框状态改变时的回调 */
        onclick: (ctx: DialogDrawContext<DataType>) => void;
        /** 复选框悬停时显示的文本，如果未定义则不显示 */
        hover?: (ctx: DialogDrawContext<DataType>) => string | undefined;
        /** 复选框是否需要解锁权限才可用，此处理如同一个额外的 enable 条件 */
        requireLockPermission?: boolean;
    }

    /** 滑动条配置 */
    interface SliderConfig<DataType extends ExtendedItemData<any>> extends InteractableConfig<DataType> {
        /** 滑动条是否显示，默认显示 */
        show?: (ctx: DialogDrawContext<DataType>) => boolean;
        /** 滑动条是否可用，默认可用 */
        enable?: (ctx: DialogDrawContext<DataType>) => boolean;
        /** 滑动条的位置和长度，默认宽度 400 高度 40 */
        location?: { x: number; y: number; w: number };
        /** 滑动条的配置 */
        readonly config?: {
            /** 滑动条的最大值，默认为100 */
            max?: number;
            /** 滑动条的最小值，默认为0 */
            min?: number;
            /** 滑动条的步长，默认为1 */
            step?: number;
        };
        /** 滑动条当前的值，默认为0 */
        value: (ctx: DialogDrawContext<DataType>) => number;
        /** 滑动条数值改变时的回调 */
        onChange: (ctx: DialogDrawContext<DataType>, value: number) => void;
        /** 滑动条悬停时显示的文本，如果未定义则不显示 */
        hover?: (ctx: DialogDrawContext<DataType>) => string | undefined;

        /** 滑动条左侧标签，如果未定义则不显示 */
        leftLabel?: (ctx: DialogDrawContextWithText<DataType>, curValue: number) => string | undefined;
        /** 滑动条右侧标签，如果未定义则不显示 */
        rightLabel?: (ctx: DialogDrawContextWithText<DataType>, curValue: number) => string | undefined;

        /** 滑动条是否需要解锁权限才可用，此处理如同一个额外的 enable 条件 */
        requireLockPermission?: boolean;
    }

    /** 回调类型 */
    type Callback<DataType extends ExtendedItemData<any>> = (data: DataType, item: Item, character: Character) => void;
    /** 带原始函数的回调类型 */
    type CallbackWithOriginal<DataType extends ExtendedItemData<any>> = (
        original: () => void,
        data: DataType,
        item: Item,
        character: Character
    ) => void;
    /** 变化事件回调类型 */
    type OnChange<DataType extends ExtendedItemData<any>> = (
        before: ItemProperties,
        after: ItemProperties,
        ctx: DialogDrawContext<DataType>
    ) => void;

    interface Options<DataType extends ExtendedItemData<any>> {
        buttons?: ButtonConfig<DataType>[];
        params?: ParameterConfig<DataType>[];
        texts?: TextConfig<DataType>[];
        checkboxes?: CheckBoxConfig<DataType>[];
        sliders?: SliderConfig<DataType>[];
        ondraw?: Callback<DataType>;
        onload?: Callback<DataType>;
        onexit?: Callback<DataType>;
        overrideClickExit?: CallbackWithOriginal<DataType>;
        onchanges?: OnChange<DataType>;
    }
}

declare namespace ContainerProperty {
    interface ContainerData extends Omit<Item, "Asset"> {
        IAsset?: string;
        IGroup?: AssetGroupItemName;
    }
}

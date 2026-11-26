/** @type {(() => void)[]} */
const rlist = [];

/**
 * @param {string} property
 * @param {(this_: PropertyDataEntry<keyof ItemProperties>, prop: any, defaults: any) => ItemProperty.ValidationOutput<any>} validate
 * @param {any} [metaData]
 */
const put = (property, validate, metaData) => {
    const p = /** @type {keyof ItemProperties} */ (property);
    return () => {
        /** @type {any}*/ (PropertyData)[p] = new PropertyDataEntry(p, metaData, {
            validate(prop, itemData, defaults) {
                return validate(this, prop, defaults);
            },
        });
    };
};

/**
 * @param {string} property
 */
const putAny = (property) => put(property, (this_, prop) => ({ status: "ok", value: prop }));

/**
 * @param {() => void} registration
 */
const register = (registration) => {
    if (globalThis["PropertyData"]) {
        registration();
    } else {
        rlist.push(registration);
    }
};

/**
 * Register a property without restricting its value.
 * @param {string} property
 */
export function registerCustomProperty(property) {
    register(putAny(property));
}

/**
 * Register a boolean property.
 * @param {string} property
 */
export function registerBooleanProperty(property) {
    register(put(property, (this_, prop, defaults) => this_.validateBoolean(prop, defaults)));
}

/**
 * Register a number property.
 * @param {string} property
 */
export function registerNumberProperty(property) {
    register(put(property, (this_, prop, defaults) => this_.validateNumber(prop, defaults)));
}

/**
 * Register a property whose value must be one of the supplied numbers or strings.
 * @param {string} property
 * @param {readonly (number|string)[]} values
 */
export function registerEnumProperty(property, values) {
    const valueSet = new Set(values);
    register(put(property, (this_, prop, defaults) => this_.validateAsSetMember(prop, defaults), { valueSet }));
}

/**
 * Register a numeric property constrained to an inclusive range.
 * @param {string} property
 * @param {number} min
 * @param {number} max
 */
export function registerNumberRangeProperty(property, min, max) {
    register(put(property, (this_, prop, defaults) => this_.validateNumber(prop, defaults), { min, max }));
}

/**
 * Register a string property.
 * @param {string} property
 */
export function registerStringProperty(property) {
    register(put(property, (this_, prop, defaults) => this_.validateString(prop, defaults)));
}

(async () => {
    while (true) {
        if (globalThis["PropertyData"]) {
            while (rlist.length > 0) {
                const fn = rlist.shift();
                fn();
            }
            break;
        }
        await new Promise((resolve) => setTimeout(resolve, 100));
    }
})();

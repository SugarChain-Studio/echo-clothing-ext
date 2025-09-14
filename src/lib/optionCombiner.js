/**
 * @template {string} Name
 */
export class TypedOptionCombiner {
    /**
     * @param {Name[]} names
     */
    constructor(names) {
        this._options = Object.fromEntries(
            names.map((name) => /** @type {[Name, TypedItemOptionConfig]} */ ([name, { Name: name }]))
        );
    }

    /**
     * @param {Name[]} options
     * @param {Omit<TypedItemOptionConfig,"Name">} extraConfig
     * @return {TypedOptionCombiner<Name>}
     */
    combine(options, extraConfig) {
        for (const option of options) {
            const nProperty = { ...this._options[option]?.Property, ...extraConfig.Property };
            this._options[option] = { ...this._options[option], ...extraConfig, Property: nProperty };
        }
        return this;
    }

    get Options() {
        return this._options;
    }
}

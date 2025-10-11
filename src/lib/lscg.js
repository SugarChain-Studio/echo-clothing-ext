class InjectModule {
    static get() {
        return window["LSCG"]?.getModule("InjectorModule");
    }

    /**
     * @param  {[multiplier: number, forceCum?: boolean, flash?: boolean]} args
     */
    AddHorny(...args) {
        const module = InjectModule.get();
        if (!module) return;
        if (!module.settings.enableHorny) return;
        module.AddHorny(...args);
    }

    /**
     * @param  {[multiplier: number, minigame?: boolean]} args
     */
    AddMindControl(...args) {
        const module = InjectModule.get();
        if (!module) return;
        if (!module.settings.enableMindControl) return;
        module.AddMindControl(...args);
    }
}

class _LSCGAPI {
    /** @readonly */
    injectModule = new InjectModule();
    /** @readonly */
    breathInterval = 2000;

    random(max) {
        return Math.floor(Math.random() * max);
    }
}

export const LSCG = new _LSCGAPI();

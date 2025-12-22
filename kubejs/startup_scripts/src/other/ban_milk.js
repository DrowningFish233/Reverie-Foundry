const protectedEffects = [
    "kubejs:bleed",
    "kubejs:custom_effect",
    "kubejs:custom_damage_effect"

];

NativeEvents.onEvent($MobEffectEvent$Remove, event => {
    try {
        global.handleEffectRemoval(event);
    } catch (e) {
        console.error(`[ERROR] 效果移除处理失败: ${e}`);
    }
});

global.handleEffectRemoval = event => {
    if (!event || !event.entity || !event.effectInstance || !event.effectInstance.effect) {
        return;
    }

    const { entity, effectInstance, cure } = event;

    if (!entity.isPlayer()) return;

    if (!cure || cure == null) return;

    const effectId = effectInstance.effect.getRegisteredName();

    if (protectedEffects.includes(effectId)) {
        if (cure.toString().includes("milk")) {
            event.setCanceled(true);
        }
    }
};

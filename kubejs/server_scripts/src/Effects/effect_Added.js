// priority: 0
NativeEvents.onEvent($MobEffectEvent$Added, event => {
    const effectInstance = event.getEffectInstance();
    const entity = event.getEntity()

    const effectId = convertEffectId(effectInstance.getDescriptionId());
    const isPlayer = entity.getType() == "minecraft:player";

    handleEffectAdded(effectId, entity, isPlayer);
})

// 效果施加处理
function handleEffectAdded(effectId, entity, isPlayer) {
    switch (effectId) {
        case "kubejs:soul_fire":
            if (isPlayer) {
                if (entity.hasEffect('kubejs:fire')) {
                    let Effect = entity.getEffect("kubejs:fire");
                    let Damage = Effect.getAmplifier() + 1
                    let Time = Effect.getDuration()
                    entity.attack($DamageSource('lava'), Damage)
                    entity.removeEffect('kubejs:fire')
                    entity.potionEffects.add("kubejs:soul_fire", Time, Damage - 1);
                }
            } else {
                if (entity.hasEffect('kubejs:fire')) {
                    let Effect = entity.getEffect("kubejs:fire");
                    let Damage = Effect.getAmplifier() + 1
                    let Time = Effect.getDuration()
                    entity.attack($DamageSource('lava'), Damage)
                    entity.removeEffect('kubejs:fire')
                    entity.potionEffects.add("kubejs:soul_fire", Time, Damage - 1);
                }
            }
            break;

        default:
            if (isPlayer) {
                return
            } return
    }
}


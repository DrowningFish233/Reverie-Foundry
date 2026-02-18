// priority: 0

let isMergingEffect = false;

/**
 * 合并药水效果的通用函数
 * @param {Internal.Entity} entity - 目标实体
 * @param {Internal.MobEffectEvent} event - 事件对象
 * @param {Internal.MobEffectInstance} newEffect - 新效果实例
 * @param {string} effectId - 要合并的效果ID
 */
function mergePotionEffect(entity, event, newEffect, effectId) {
    if (entity.hasEffect(effectId) && !isMergingEffect) {
        const existingEffect = entity.getEffect(effectId);

        const existingAmplifier = existingEffect.getAmplifier();
        const existingDuration = existingEffect.getDuration();

        const newAmplifier = newEffect.getAmplifier();
        const newDuration = newEffect.getDuration();

        const existingLevel = existingAmplifier + 1;
        const newLevel = newAmplifier + 1;
        const mergedLevel = existingLevel + newLevel;

        const mergedDuration = existingDuration + newDuration;

        entity.removeEffect(effectId);

        isMergingEffect = true;
        try {
            entity.potionEffects.add(effectId, mergedDuration, mergedLevel - 1);
        } finally {
            isMergingEffect = false;
        }
    }
}

NativeEvents.onEvent($MobEffectEvent$Added, event => {
    if (isMergingEffect) return;

    const effectInstance = event.getEffectInstance();
    const entity = event.getEntity()

    const effectId = convertEffectId(effectInstance.getDescriptionId());
    const isPlayer = entity.getType() == "minecraft:player";

    handleEffectAdded(effectId, entity, isPlayer, event, effectInstance);
})

// 效果施加处理
function handleEffectAdded(effectId, entity, isPlayer, event, effectInstance) {
    switch (effectId) {
        case "kubejs:soul_fire":
            if (entity.hasEffect('kubejs:fire') && !isMergingEffect) {
                isMergingEffect = true;
                try {
                    const fireEffect = entity.getEffect("kubejs:fire");
                    const damage = fireEffect.getAmplifier() + 1;
                    const time = fireEffect.getDuration();

                    attackEntity(entity, 'lava', damage, true);
                    entity.removeEffect('kubejs:fire');
                    entity.potionEffects.add("kubejs:soul_fire", time, damage - 1);
                } finally {
                    isMergingEffect = false;
                }
            }
            break;
        case "kubejs:bleed":
            mergePotionEffect(entity, event, effectInstance, 'kubejs:bleed');
            break;
        case "kubejs:paralysis":
            mergePotionEffect(entity, event, effectInstance, 'kubejs:paralysis');
            break;
        case "kubejs:pest_infesting":
            mergePotionEffect(entity, event, effectInstance, 'kubejs:pest_infesting');
            break;
        case "kubejs:pest_defense":
            mergePotionEffect(entity, event, effectInstance, 'kubejs:pest_defense');
            break;
        default:
            return;
    }
}
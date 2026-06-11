// priority: 0
// 药水效果自然消失事件
NativeEvents.onEvent($MobEffectEvent$Expired, event => {

    const effectInstance = event.getEffectInstance();
    const entity = event.entity;

    const effectId = convertEffectId(effectInstance.getDescriptionId());
    const isPlayer = entity.getType() == "minecraft:player";
    handleEffectExpired(effectId, entity, isPlayer, effectInstance);
});

function convertEffectId(descriptionId) {
    if (descriptionId.startsWith("effect.")) {
        let converted = descriptionId.substring(7);
        converted = converted.replace('.', ':');
        return converted;
    }
    return descriptionId;
}

// 效果消失处理
function handleEffectExpired(effectId, entity, isPlayer, effectInstance) {
    const Amplifier = effectInstance.getAmplifier();
    switch (effectId) {
        case "kubejs:fire":
            attackEntity(entity, 'lava', Amplifier, true);
            break;
        case "kubejs:tooth_of_hunger":
            if (isPlayer) {
                let FoodLevel = entity.getFoodLevel();
                let Saturation = entity.getSaturation();
                entity.setFoodLevel(Math.max(FoodLevel - Amplifier, 0));
                entity.setSaturation(Math.max(Saturation - Amplifier, 0));
                if (FoodLevel < 2) {
                    attackEntity(entity, 'generic', Amplifier, true);
                }
            } else {
                attackEntity(entity, 'generic', Amplifier, true);
            }
            break;

        default:
            return;
    }
}

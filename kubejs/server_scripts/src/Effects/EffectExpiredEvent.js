// priority: 0
// 药水效果自然消失事件
NativeEvents.onEvent($MobEffectEvent$Expired, event => {
    const effectInstance = event.getEffectInstance();
    const entity = event.entity;

    const effectId = convertEffectId(effectInstance.getDescriptionId());
    const isPlayer = entity.getType() == "minecraft:player";

    handleEffectExpired(effectId, entity, isPlayer);
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
function handleEffectExpired(effectId, entity, isPlayer) {
    switch (effectId) {
        case "kubejs:bleed":
            if (isPlayer) {
                let Amplifier = entity.getEffect("kubejs:bleed").getAmplifier()
                attackEntity(entity, 'out_of_world', Amplifier, true)
            } else {
                let Amplifier = entity.getEffect("kubejs:bleed").getAmplifier()
                attackEntity(entity, 'out_of_world', Amplifier, true)
            }
            break;

        case "kubejs:fire":
            if (isPlayer) {
                let Amplifier = entity.getEffect("kubejs:fire").getAmplifier()
                attackEntity(entity, 'lava', Amplifier, true)
            } else {
                let Amplifier = entity.getEffect("kubejs:fire").getAmplifier()
                attackEntity(entity, 'lava', Amplifier, true)
            }
            break;

        case "kubejs:tooth_of_hunger":
            if (isPlayer) {
                let Amplifier = entity.getEffect("kubejs:tooth_of_hunger").getAmplifier()
                let FoodLevel = entity.getFoodLevel()
                let Saturation = entity.getSaturation()
                entity.setFoodLevel(Math.max(FoodLevel - Amplifier, 0));
                entity.setSaturation(Math.max(Saturation - Amplifier, 0))
                if (FoodLevel < 2) {
                    attackEntity(entity, 'generic', Amplifier, true)

                }
            } else {
                let Amplifier = entity.getEffect("kubejs:tooth_of_hunger").getAmplifier()
                attackEntity(entity, 'generic', Amplifier, true)
            }
            break;

        default:
            if (isPlayer) {
                return
            } else {
                return
            }
    }
}


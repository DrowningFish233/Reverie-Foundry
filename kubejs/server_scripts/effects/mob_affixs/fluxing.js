/**
 * 对燃起来的怪物增伤效果
 */
function fluxing(event) {
    let entity = event.getEntity();
    if (entity.hasEffect("kubejs:fluxing")) {
        if (entity.isOnFire() || entity.isInLava()) {
            let enchantmentLevel = entity.getEffect("kubejs:fluxing").getAmplifier() + 1;
            let armorReductionPercentage = enchantmentLevel * 20;
            new_damage(event, STAGE.ADDITIVE, (1 + armorReductionPercentage / 100));
        }
    }
}
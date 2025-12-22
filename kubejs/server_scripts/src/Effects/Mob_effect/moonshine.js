/**
 * 减免3%的伤害/级
 */
function moonshine_effect(event) {
    let entity = event.getEntity();
    if (entity.hasEffect("kubejs:moonshine")) {
        const protectEffect = entity.getEffect("kubejs:moonshine");
        const level = protectEffect.getAmplifier() + 1;
        const damageMultiplier = 1.0 - (level * 0.03);
        new_damage(event, STAGE.MULTIPLY, damageMultiplier);
    }
    return;
}
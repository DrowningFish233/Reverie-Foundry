/**
 * 恐惧效果
 */
function fear_effect(event) {
    let entity = event.entity;
    let damageSource = event.source;

    if (!entity.hasEffect("kubejs:fear")) return;

    let fearEffect = entity.getEffect("kubejs:fear");
    let effectLevel = fearEffect.getAmplifier() + 1;

    let additionalDamage = 0.25 * effectLevel;

    if (damageSource.type === "fall") {
        new_damage(event, STAGE.ADDITIVE, 1 + additionalDamage);
    }

    if (!entity.onGround) {
        new_damage(event, STAGE.ADDITIVE, 1 + additionalDamage);
    }
}
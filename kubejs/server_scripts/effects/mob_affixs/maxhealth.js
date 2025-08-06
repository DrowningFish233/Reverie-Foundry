/**
 * 满血给额外增伤效果
 */
function maxhealth(event) {
    const { source, entity } = event;
    const attacker = source.player || source.actual;

    if (!attacker || !attacker.player || !entity.living || !attacker.hasEffect("kubejs:strip")) {
        return;
    }
    const entity_maxhealth = entity.getMaxHealth()
    if (entity.health === entity_maxhealth) {
        const lifeDrainEffect = attacker.getEffect("kubejs:strip");
        if (lifeDrainEffect) {
            const effectLevel = lifeDrainEffect.amplifier + 1;
            const extraDamage = effectLevel + 5;
            entity.attack($DamageSource("generic"), extraDamage);

        }
    }
}
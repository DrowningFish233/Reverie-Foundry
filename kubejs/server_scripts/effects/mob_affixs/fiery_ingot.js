/**
 * 炽铁锭
 */
function fiery_ingot(event) {
    const { source, entity } = event;
    const attacker = source.player || source.actual;

    if (!attacker || !attacker.player || !entity.living || !attacker.hasEffect("kubejs:fiery_ingot")) {
        return;
    }

    let attackEffect = entity.getEffect("kubejs:fiery_ingot");
    let attackLevel = attackEffect ? attackEffect.getAmplifier() : 0;
    let attackDamageMultiplier = (attackLevel * 0.15) + 1;
    entity.setRemainingFireTicks(20 * 3);
    if ((entity.isOnFire() || entity.isInLava())) {
        new_damage(event, STAGE.ADDITIVE, attackDamageMultiplier);

    }

    if ((attacker.isOnFire() || attacker.isInLava())) {
        let fireDamage = originalDamage / 3;
        entity.attack($DamageSource("fireball"), fireDamage);
    }
}
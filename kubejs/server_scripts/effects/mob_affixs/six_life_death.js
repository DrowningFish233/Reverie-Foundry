/**
 * 六生死昭
 */
function six_life_death(event) {
    const { source, entity } = event;
    const attacker = source.player || source.actual;
    if (!attacker || !attacker.player || !entity.living || !attacker.hasEffect("kubejs:six_life_death_set")) {
        return;
    }

    let existingEffect = entity.getEffect("kubejs:six_life_death");

    if (!existingEffect) {
        entity.potionEffects.add("kubejs:six_life_death", 2000, 0);
        return;
    }
    let currentHurtLevel = existingEffect.getAmplifier();
    let newHurtLevel = currentHurtLevel + 1;
    entity.potionEffects.add("kubejs:six_life_death", 2000, newHurtLevel);

    if (newHurtLevel >= 36) {
        let attackerCurrentHealth = attacker.getHealth();
        let healthCost = attackerCurrentHealth * 0.05;

        attacker.setHealth(attackerCurrentHealth - healthCost);

        let additionalDamage = healthCost * 5;
        entity.attack($DamageSource("out_of_world"), additionalDamage);

    }
}
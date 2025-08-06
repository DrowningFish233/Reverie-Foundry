/**
 * 玛瑙 滴血玉髓效果
 */
function bloodjade_set(event) {
    const { source, entity } = event;
    const attacker = source.player || source.actual;
    if (!attacker || !attacker.isLiving || !attacker.hasEffect("kubejs:bloodjade_set")) {
        return;
    }

    if (!entity.hasEffect("kubejs:bloodjade")) {
        entity.potionEffects.add("kubejs:bloodjade", 600, 0); // 持续30秒
        return;
    }

    const effect = entity.getEffect("kubejs:bloodjade");
    let hitCount = effect.amplifier + 1;

    if (hitCount < 5) {
        entity.removeEffect("kubejs:bloodjade");
        entity.potionEffects.add("kubejs:bloodjade", 600, hitCount);
        return;
    }

    const healthCost = attacker.health * 0.5;
    const playerMaxHealth = attacker.getMaxHealth()

    attacker.attack(healthCost);
    entity.attack(playerMaxHealth);
    entity.removeEffect("kubejs:bloodjade");
}


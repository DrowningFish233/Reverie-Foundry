/**
 * 愤！怒！
 */
function life_drain(event) {
    const { source, entity } = event;
    const attacker = source.player || source.actual;
    if (!attacker || !attacker.player || !entity.living || !attacker.hasEffect("kubejs:life_drain")) {
        return;
    }
    let existingEffect = attacker.getEffect("kubejs:life_drain");
    let currentAttackCount = existingEffect ? existingEffect.getAmplifier() : 0;
    let newAttackCount = currentAttackCount + 1;
    if (newAttackCount >= 5) {
        attacker.removeEffect("kubejs:life_drain");
        new_damage(event, STAGE.ADDITIVE, 3);
    } else {
        attacker.potionEffects.add("kubejs:life_drain", 100, newAttackCount);
    }
}

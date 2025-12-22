/**
 * 伤害强化效果处理-每级+10%伤害
 */
function damage_amplification(event) {
    const { source, entity } = event;
    const attacker = source.player || source.actual;

    if (!attacker || !attacker.isPlayer() || !attacker.hasEffect("kubejs:damage_amplification")) {
        return;
    }

    const ampEffect = attacker.getEffect("kubejs:damage_amplification");
    const ampLevel = ampEffect.getAmplifier();
    const damageMultiplier = 1 + (ampLevel * 0.1);

    new_damage(event, STAGE.ADDITIVE, damageMultiplier);
}
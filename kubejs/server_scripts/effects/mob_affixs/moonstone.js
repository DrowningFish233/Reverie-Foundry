/**
 * 月亮石
 */
function moonstone(event) {
    const { source, entity } = event;
    const attacker = source.player || source.actual;

    if (!attacker || !attacker.player || !entity.living || !attacker.hasEffect("kubejs:moonstone")) {
        return;
    }

    let getEffect = attacker.getEffect("kubejs:moonstone");
    let effectLevel = getEffect.getAmplifier();
    let time = event.level.getDayTime() % 24000;
    let extraMagicDamage = effectLevel * 2 + 2;
    // 白天
    if (time <= 12000) {
        new_damage(event, STAGE.ADDITIVE, 1 - (effectLevel * 0.1));
    }
    // 夜晚
    else {
        entity.attack($DamageSource("magic"), extraMagicDamage);
    }
}
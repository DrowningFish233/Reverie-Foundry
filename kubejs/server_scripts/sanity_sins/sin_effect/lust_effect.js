//色欲效果
function lust_effect(event) {
    const { source, entity: target } = event;
    const attacker = source.player || source.actual;
    if (!attacker || !attacker.isPlayer() || !attacker.hasEffect("kubejs:lust")) {
        return;
    }
    const isBloodTarget = target.hasEffect("kubejs:bleed");
    const effectType = isBloodTarget ? "kubejs:blood_rose" : "kubejs:rose";
    const threshold = isBloodTarget ? 10 : 5;

    const currentEffect = target.getEffect(effectType);
    const currentLevel = currentEffect ? currentEffect.getAmplifier() : -1;
    const newLevel = currentLevel + 1;
    const duration = 100;

    target.potionEffects.add(effectType, duration, newLevel);

    if (newLevel >= threshold) {
        target.removeEffect(effectType);

        const currentDamageAmp = attacker.getEffect("kubejs:damage_amplification");
        const currentAmpLevel = currentDamageAmp ? currentDamageAmp.getAmplifier() : 0;

        const rewardLevel = isBloodTarget ? 3 : 1;
        const totalAmpLevel = Math.min(currentAmpLevel + rewardLevel, 10);

        attacker.potionEffects.add("kubejs:damage_amplification", 20 * 6, totalAmpLevel);

        if (isBloodTarget) {
            const bloodEffect = target.getEffect("kubejs:bleed");
            const bloodDamage = bloodEffect ? bloodEffect.getAmplifier() + 1 : 1;
            target.attack($DamageSource("out_of_world"), bloodDamage);
        }
    }
}
function combustion_boost(event) {
    const { source, entity } = event;
    const attacker = source.player || source.actual;

    if (!attacker || !attacker.isLiving() || !fu_hasTraitAnywhere(attacker, "kubejs:combustion_boost")) {
        return;
    }

    if (entity.isOnFire()) {
        let traitLevel = fu_getHighestTraitLevelAnywhere(attacker, "kubejs:combustion_boost")
        let Amplifier = traitLevel * 20
        let RemainingFireTicks = entity.getRemainingFireTicks()
        if (RemainingFireTicks > 800) return;

        entity.setRemainingFireTicks(RemainingFireTicks + Amplifier)
    }

    if (entity.hasEffect("kubejs:fire")) {
        let fireEffect = entity.getEffect("kubejs:fire")
        let fireAmplifier = fireEffect.getAmplifier() + 1
        let Duration = fireEffect.getDuration()
        entity.potionEffects.add("kubejs:fire", Duration, fireAmplifier);

    }
    if (entity.hasEffect("kubejs:soul_fire")) {
        let Effect = entity.getEffect("kubejs:soul_fire")
        let Amplifier = Effect.getAmplifier() + 1
        let Duration = Effect.getDuration()
        entity.potionEffects.add("kubejs:soul_fire", Duration, Amplifier);
    }
}
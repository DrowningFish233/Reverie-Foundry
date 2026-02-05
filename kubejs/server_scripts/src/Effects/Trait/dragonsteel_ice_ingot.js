function dragonsteel_ice_ingot(event) {
    const { source, entity } = event;
    const attacker = source.player || source.actual;

    if (!attacker || !attacker.isPlayer() || !entity.isLiving() || !fu_hasTraitAnywhere(attacker, "kubejs:dragonsteel_ice_ingot")) {
        return;
    }

    const attackEffect = entity.getEffect("kubejs:dragonsteel_ice_ingot_attack");
    const attackLevel = attackEffect ? attackEffect.getAmplifier() : 0;
    const newHurtLevel = attackLevel + 1;

    const bleedEffect = entity.getEffect("kubejs:bleed");
    const bleedLevel = bleedEffect ? bleedEffect.getAmplifier() : 0;

    if (attackLevel >= 9) {
        entity.removeEffect("kubejs:dragonsteel_ice_ingot_attack");
        entity.potionEffects.add("kubejs:dragonsteel_ice_ingot_ice", 20 * 3, 0);
    } else {
        entity.potionEffects.add("kubejs:dragonsteel_ice_ingot_attack", 200, newHurtLevel);
    }

    entity.potionEffects.add("kubejs:bleed", 20 * 5, 0);

    if (entity.hasEffect("kubejs:dragonsteel_ice_ingot_ice")) {
        entity.removeEffect("kubejs:dragonsteel_ice_ingot_ice");
        attackEntity(entity, 'freeze', 20, true)
    }

    if (bleedLevel >= 9) {
        entity.removeEffect("kubejs:bleed");
        entity.potionEffects.add("kubejs:bleed", 20 * 8, bleedLevel - 8);
        attacker.potionEffects.add("kubejs:absorption", 20 * 10, 0)
        attacker.setAbsorptionAmount(20)
    }
}
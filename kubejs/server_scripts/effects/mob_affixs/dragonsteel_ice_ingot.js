/**
 * 龙霜钢锭
 */
function dragonsteel_ice_ingot(event) {
    const { source, entity } = event;
    const attacker = source.player || source.actual;

    if (!attacker || !attacker.player || !entity.living || !attacker.hasEffect("kubejs:dragonsteel_ice_ingot")) {
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

    entity.potionEffects.add("kubejs:bleed", 20 * 10, newHurtLevel);

    if (entity.hasEffect("kubejs:dragonsteel_ice_ingot_ice")) {
        entity.removeEffect("kubejs:dragonsteel_ice_ingot_ice");
        entity.attack($DamageSource("freeze"), 20);
    }
    if (bleedLevel >= 9) {
        entity.removeEffect("kubejs:bleed");
        entity.potionEffects.add("kubejs:bleed", 20 * 8, bleedLevel - 8);
        attacker.potionEffects.add("kubejs:absorption", 20 * 10, 0)
        attacker.setAbsorptionAmount(20)
    }
}
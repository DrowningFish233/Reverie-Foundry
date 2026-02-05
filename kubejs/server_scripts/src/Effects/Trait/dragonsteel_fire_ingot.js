/**
 * 龙炎钢锭
 */
function dragonsteel_fire_ingot(event) {
    const { source, entity } = event;
    const attacker = source.player || source.actual;

    if (!attacker || !attacker.isPlayer() || !entity.isLiving() || !fu_hasTraitAnywhere(attacker, "kubejs:dragonsteel_fire_ingot")) {
        return;
    }

    const armorBreakEffect = entity.getEffect("kubejs:dragonsteel_armor_break");
    const armorBreakLevel = armorBreakEffect ? armorBreakEffect.getAmplifier() + 1 : 1;
    const bleedEffect = entity.getEffect("kubejs:bleed");
    const bleedLevel = bleedEffect ? bleedEffect.getAmplifier() : 0;

    entity.potionEffects.add("kubejs:dragonsteel_armor_break", 20 * 30, armorBreakLevel);

    entity.potionEffects.add("kubejs:bleed", 20 * 5, 0);

    let currentArmor = entity.getArmorValue()

    if (currentArmor <= 0 && !entity.hasEffect("kubejs:dragonsteel_ignite")) {
        entity.setRemainingFireTicks(20 * 60)
    }

    if (currentArmor <= 0 && (entity.isOnFire() || entity.isInLava())) {
        attackEntity(entity, 'magic', 20, true)
        entity.setRemainingFireTicks(0)

    }

    if (bleedLevel >= 9) {
        entity.removeEffect("kubejs:bleed");
        entity.potionEffects.add("kubejs:bleed", 20 * 8, bleedLevel - 8);
        attacker.potionEffects.add("kubejs:absorption", 20 * 10, 0)
        attacker.setAbsorptionAmount(20);
    }
}
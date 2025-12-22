/**
 * 12耐久倍数加伤效果
 */
function topaz(event) {
    const { source, entity } = event;
    const attacker = source.player || source.actual;

    if (!attacker?.player || !entity.isLiving() || !fu_hasTraitAnywhere(attacker, "kubejs:topaz")) {
        return;
    }

    const mainHandItem = attacker.getMainHandItem();
    if (mainHandItem.isEmpty()) return;

    const maxDurability = mainHandItem.getMaxDamage();
    const currentDurability = mainHandItem.getDamageValue();
    const remainingDurability = maxDurability - currentDurability;
    if (remainingDurability > 0 && remainingDurability % 12 == 0) {
        const traitLevel = fu_getHighestTraitLevelAnywhere(attacker, "kubejs:topaz");
        const bonusDamage = 10 * traitLevel;
        new_damage(event, STAGE.FLAT, bonusDamage);
    }
}
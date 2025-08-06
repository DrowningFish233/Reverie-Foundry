/**
 * 锈蚀合金低耐久加伤
 */
function corroded(event) {
    const { source, entity } = event;
    const attacker = source.player || source.actual;

    if (!attacker || !attacker.isLiving || !attacker.hasEffect("kubejs:corroded")) {
        return;
    }
    let mainHandItem = attacker.getMainHandItem();
    if (!mainHandItem || mainHandItem.isEmpty()) return;

    let components = mainHandItem.components;
    if (!components) {
        return;
    }

    const maxDurability = mainHandItem.getMaxDamage();
    const currentDurability = mainHandItem.getDamageValue();
    const remainingDurability = maxDurability - currentDurability;
    const durabilityPercentage = (remainingDurability / maxDurability) * 100;

    const damageMultiplier = 1;
    if (durabilityPercentage < 20) {
        damageMultiplier = 2;
    } else if (durabilityPercentage < 50) {
        damageMultiplier = 1.4;
    }
    new_damage(event, STAGE.ADDITIVE, damageMultiplier);
}
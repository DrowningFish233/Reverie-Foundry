/**
 * 亚历山大变石
 * [红绿]
 * 在耐久度高于66%时，攻击力x1.5
 * 在耐久度低于33%时，攻击力x0.5
 */
function alexandrite(event) {
    const { source, entity } = event;
    const attacker = source.player || source.actual;

    if (!attacker || !attacker.isLiving || !attacker.hasEffect("kubejs:alexandrite")) {
        return;
    }

    const mainHandItem = attacker.getMainHandItem();
    if (mainHandItem.isEmpty()) return;

    const components = mainHandItem.components;
    if (!components) {
        return;
    }

    const maxDurability = mainHandItem.getMaxDamage();
    const currentDurability = mainHandItem.getDamageValue();
    const remainingDurability = maxDurability - currentDurability;
    const durabilityPercentage = (remainingDurability / maxDurability) * 100;

    if (durabilityPercentage > 66) {
        new_damage(event, STAGE.ADDITIVE, 1.5);
    } else if (durabilityPercentage < 33) {
        new_damage(event, STAGE.ADDITIVE, 0.5);
    }
}
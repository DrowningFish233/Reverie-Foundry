/**
 * 武器安装了硫酸瓶时，攻击消耗5%耐久度，但不会损坏
 */

EntityEvents.afterHurt(event => {
    const { source, entity } = event;
    const attacker = source.player || source.actual;

    if (!attacker || !attacker.isLiving()) {
        return;
    }
    if (!attacker.isPlayer()) return;

    if (!socketIsEnabled(attacker, "kubejs:broken_sulfuric_vial")) return;

    let weapon = attacker.getMainHandItem();
    if (weapon.isEmpty()) return;

    if (!weapon.isDamageableItem()) return;

    let maxDamage = weapon.getMaxDamage();
    let damageToSubtract = Math.max(1, Math.floor(maxDamage * 0.05));

    let newDamage = weapon.getDamageValue() + damageToSubtract;

    if (newDamage >= maxDamage) {
        fu_repairDurability(weapon, -(maxDamage - 1 - weapon.getDamageValue()), attacker, "mainhand");
    } else {
        fu_repairDurability(weapon, -damageToSubtract, attacker, "mainhand");
    }
});
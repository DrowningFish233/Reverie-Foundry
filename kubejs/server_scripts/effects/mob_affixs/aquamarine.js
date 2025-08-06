/**
 * 海蓝宝石
 * 
 * 随机额外消耗1-10点耐久使本次伤害倍率提高0.1
 */
function aquamarine(event) {
    const { source, entity } = event;
    const attacker = source.player || source.actual;

    if (!attacker || !attacker.isLiving || !attacker.hasEffect("kubejs:aquamarine")) {
        return;
    }

    const weapon = attacker.getMainHandItem();
    if (!weapon.isDamageableItem()) return;

    const durabilityCost = 1 + random.nextInt(10);
    weapon.setDamageValue(weapon.getDamageValue() + durabilityCost);
    new_damage(event, STAGE.ADDITIVE, 1 + (0.1 * durabilityCost));
    if (weapon.getDamageValue() >= weapon.getMaxDamage()) {
        weapon.shrink(1);
    }
}
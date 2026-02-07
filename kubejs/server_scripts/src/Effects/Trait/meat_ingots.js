/**
 * 武器每 <6-词缀等级> 秒消耗 <词条等级的平方> 耐久度并治疗玩家
 */
function meat_ingots(event, tick) {
    if (tick % 20 !== 0) return;

    const player = event.player;
    if (!player || !player.isLiving()) return;

    if (!fu_hasTraitMainHand(player, "kubejs:meat_ingots")) return;

    const traitLevel = fu_getTraitLevelMainHand(player, "kubejs:meat_ingots");
    if (traitLevel <= 0) return;
    const intervalSeconds = Math.max(1, 6 - traitLevel);
    const intervalTicks = intervalSeconds * 20;

    const triggerInterval = intervalTicks / 20;
    if (Math.floor(tick / 20) % triggerInterval !== 0) return;

    const mainHandItem = player.getMainHandItem();
    if (mainHandItem.isEmpty()) return;

    const maxDurability = mainHandItem.getMaxDamage();
    const currentDurability = mainHandItem.getDamageValue();
    const durabilityCost = traitLevel * traitLevel;

    if (currentDurability + durabilityCost >= maxDurability) {
        return;
    }

    mainHandItem.setDamageValue(currentDurability + durabilityCost);
    player.heal(traitLevel);
}

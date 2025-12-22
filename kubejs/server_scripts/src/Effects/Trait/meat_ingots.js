/**
 * 武器每 <6-词缀等级> 秒消耗 <词条等级的平方> 耐久度并治疗玩家
 */
function meat_ingots(event, tick) {
    const player = event.player;
    if (!player.isLiving()) return;

    if (tick % 20 === 0) {
        if (!fu_hasTraitAnywhere(player, "kubejs:meat_ingots")) return;

        const traitLevel = fu_getHighestTraitLevelAnywhere(player, "kubejs:meat_ingots");
        const intervalTicks = Math.max(20, (6 - traitLevel) * 20);

        if (tick % intervalTicks === 0) {
            const mainHandItem = player.getMainHandItem();
            if (mainHandItem.isEmpty()) return;

            const maxDurability = mainHandItem.getMaxDamage();
            const currentDurability = mainHandItem.getDamageValue();
            const durabilityCost = traitLevel * traitLevel;

            if (currentDurability + durabilityCost < maxDurability) {
                mainHandItem.setDamageValue(currentDurability + durabilityCost);
                player.heal(traitLevel);
            }
        }
    }
}
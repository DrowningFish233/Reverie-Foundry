//天体合金
function celeslar_ingot(event, player) {
    if (!fu_hasTraitAnywhere(player, "kubejs:celeslar_ingot")) return
    const trait_level = fu_getHighestTraitLevelAnywhere(player, "kubejs:celeslar_ingot")
    // 获取附近所有实体
    const nearbyEntities = player.level.getEntities(
        player,  // 排除玩家自己
        player.getBoundingBox().inflate(trait_level * 2)
    );

    const livingEntities = nearbyEntities.filter(entity =>
        entity.isLiving() && entity.isLiving()
    );

    const count = livingEntities.length;

    if (count > 0) {
        const maxAmplifier = trait_level * 3;
        const amplifier = Math.min(count - 1, maxAmplifier);
        player.potionEffects.add("kubejs:damage_amplification", 6 * 20, amplifier);
    } return;
}
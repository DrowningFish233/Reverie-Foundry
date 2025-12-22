function calamatium_ingot_effect(event) {
    const player = event.player;
    if (!player || !player.isLiving() || !fu_hasTraitAnywhere(player, "kubejs:calamatium_ingot")) return;

    const radius = 5;
    const effectDuration = 10 * 20;

    const burningEntities = player.level.getEntities(
        player,
        player.getBoundingBox().inflate(radius)
    ).filter(entity =>
        entity.isLiving() &&
        entity.isOnFire() &&
        entity !== player
    );

    const burningCount = burningEntities.length;
    if (burningCount > 0) {
        let traitLevel = fu_getHighestTraitLevelAnywhere(player, "kubejs:calamatium_ingot");
        let effectLevel = traitLevel + burningCount;

        player.potionEffects.add(
            'minecraft:health_boost',
            effectDuration,
            effectLevel - 1,
            false,
            false
        );
    }
}
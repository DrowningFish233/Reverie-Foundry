// 每5秒检测并更新贪婪效果
PlayerEvents.tick(event => {
    const player = event.player;
    if (!player || player.type !== "minecraft:player" || player.tickCount % 200 !== 0) {
        return;
    }

    const isGREED = player.persistentData.getInt(sins.GREED) || 0;
    if (isGREED > 0) {
        const currentEffect = player.getEffect("kubejs:greed");
        const shouldUpgrade = !currentEffect || currentEffect.getAmplifier() < 2;

        if (shouldUpgrade) {
            const newLevel = currentEffect ? currentEffect.getAmplifier() + 1 : 0;
            player.potionEffects.add(
                "kubejs:greed",
                20 * 60,
                newLevel,
                false,
                false
            );
        }
    } else {
        if (player.getEffect("kubejs:greed")) {
            player.removeEffect("kubejs:greed");
        }
    }
});
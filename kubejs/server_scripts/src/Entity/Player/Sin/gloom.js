// 每5秒检测并更新贪婪效果
PlayerEvents.tick(event => {
    const player = event.player;
    if (!player || player.getType() !== "minecraft:player" || player.tickCount % 200 !== 0) {
        return;
    }

    const isGLOOM = player.persistentData.getInt(sins.GLOOM) || 0;
    if (isGLOOM > 0) {
        const currentEffect = player.getEffect("kubejs:gloom");
        const shouldUpgrade = !currentEffect || currentEffect.getAmplifier() < 2;

        if (shouldUpgrade) {
            const newLevel = currentEffect ? currentEffect.getAmplifier() + 1 : 0;
            player.potionEffects.add(
                "kubejs:gloom",
                20 * 60,
                newLevel,
                false,
                false
            );
        }
    } else {
        if (player.getEffect("kubejs:gloom")) {
            player.removeEffect("kubejs:gloom");
        }
    }
});

function gloom_hurt(event) {
    const player = event.entity;
    if (!player || player.getType() !== "minecraft:player") return;
    const gloomEffect = player.getEffect("kubejs:gloom");
    if (!gloomEffect) return;
    const currentLevel = gloomEffect.getAmplifier();
    const newLevel = currentLevel - 1;
    const remainingTime = gloomEffect.getDuration();
    player.removeEffect("kubejs:gloom");
    if (newLevel >= 0) {
        player.potionEffects.add("kubejs:gloom", remainingTime, newLevel, false, false);
    }
}
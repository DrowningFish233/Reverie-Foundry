function GREED_hurt(event) {
    const player = event.entity;
    if (!player || player.type !== "minecraft:player") return;
    const greedEffect = player.getEffect("kubejs:greed");
    if (!greedEffect) return;
    const currentLevel = greedEffect.getAmplifier();
    const newLevel = currentLevel - 1;
    const remainingTime = greedEffect.getDuration();
    player.removeEffect("kubejs:greed");
    if (newLevel >= 0) {
        player.potionEffects.add("kubejs:greed", remainingTime, newLevel, false, true);
    }
}
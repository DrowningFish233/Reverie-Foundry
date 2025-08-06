function sloth(event) {
    const damage = event.getDamage();
    const player = event.entity;
    if (player.getType() !== "minecraft:player") {
        return;
    }
    if (!player.hasEffect("kubejs:sloth")) {
        return;
    }
    const effect = player.getEffect("kubejs:sloth");
    const level = effect.getAmplifier();
    const threshold = 10 + (level * 5);
    let allTheDamage = player.persistentData.getInt(sloth_cumulative_damage) || 0;
    allTheDamage += damage;
    if (allTheDamage >= threshold) {
        player.potionEffects.add('minecraft:resistance', 20 * 5, level, false, false);
        player.potionEffects.add('kubejs:morning_moodiness', 2000, 0);
        allTheDamage = 0;
    }
    player.persistentData.putInt(sloth_cumulative_damage, allTheDamage);
}
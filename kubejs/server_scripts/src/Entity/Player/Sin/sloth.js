// priority: 10
// 每刻更新罪孽状态事件
PlayerEvents.tick(event => {
    let player = event.player;
    if (!player) return;
    if (player.tickCount % 20 != 0) return;
    let isSLOTH = player.persistentData.getInt(sins.SLOTH) || 0;
    if (isSLOTH > 0) {
        player.potionEffects.add("kubejs:sloth", 80, 0, false, false);
    }
});

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
        player.potionEffects.add('kubejs:morning_moodiness', 2000, 0, false, false);
        allTheDamage = 0;
    }
    player.persistentData.putInt(sloth_cumulative_damage, allTheDamage);
}

function sloth_2(event) {
    let entity = event.getEntity();
    let value = 0.35;
    if (entity.hasEffect("kubejs:sloth_2")) {
        new_damage(event, STAGE.MULTIPLY, value);
    } return
}

function sloth_morning_moodiness(event) {
    const { source, entity } = event;
    let attacker = source.player || source.entity;

    if (!attacker || !attacker.player || !entity.isLiving() || !attacker.hasEffect("kubejs:morning_moodiness")) {
        return;
    }

    attacker.removeEffect("kubejs:morning_moodiness");
    attacker.potionEffects.add("minecraft:blindness", 200, 2, false, true);
    attacker.potionEffects.add("minecraft:darkness", 200, 2, false, true);
    attacker.potionEffects.add("minecraft:unluck", 200, 2, false, true);
    attacker.potionEffects.add("minecraft:slowness", 200, 2, false, true);
    attacker.potionEffects.add("minecraft:resistance", 180, 3, false, true);
    attacker.potionEffects.add("kubejs:morning_moodiness_2", 180, 0, false, false);

}
/**
 * 攻击速度提高[词条等级-0.5]点，但使用者每次攻击有[词条等级x10%]概率受到5点魔法伤害
 */

function achroous_ingot(event) {
    const { source, entity } = event;
    const attacker = source.player || source.actual;

    if (!attacker || !attacker.isLiving || !attacker.hasEffect("kubejs:achroous_ingot")) {
        return;
    }
    const effect = attacker.getEffect("kubejs:achroous_ingot");
    const level = effect.getAmplifier() + 1;
    const damageChance = level * 0.1;

    if (random.nextFloat() < damageChance) {
        attacker.attack($DamageSource("magic"), 5);
    }
}


/**
 * 使周围5格的生物每5秒受到持续3秒的反胃1虚弱1的debuff
 */
function achroous_ingot_tick(event, player) {
    if (!player || !player.living || !player.hasEffect("kubejs:achroous_ingot")) return;

    const achroous_ingot_radius = 5; // 效果半径5格
    const world = player.level;

    const nearbyEntities = world.getEntities(
        player, // 排除玩家自己
        player.getBoundingBox().inflate(achroous_ingot_radius) // 扩展边界框
    ).filter(entity =>
        entity.living && // 是活体
        entity !== player // 不是玩家自己
    );

    // 添加debuff效果
    for (let entity of nearbyEntities) {
        entity.potionEffects.add("minecraft:nausea", 20 * 3, 0); // 反胃3秒
        entity.potionEffects.add("minecraft:weakness", 20 * 3, 0); // 虚弱3秒
    }
}
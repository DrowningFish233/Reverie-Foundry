/**
 * 爆裂黎明效果
 */
function boom_effects(event) {
    const { source, entity } = event;
    const attacker = source.player || source.actual;

    // 条件检查
    if (!entity.living || !attacker || !attacker.player || !attacker.hasEffect("kubejs:boom_effects") || event.damage <= 0) {
        return;
    }

    // 伤害加成
    new_damage(event, STAGE.ADDITIVE, 1.25);

    // 爆炸效果参数
    const boom_radius = 1.5;  // 效果半径1.5格
    const boomdamage = event.damage;
    const boom_attack = boomdamage / 2;

    const nearbyEntities = entity.level.getEntities(
        null,  // 不排除任何实体
        entity.getBoundingBox().inflate(boom_radius)
    );

    // 对附近实体造成爆炸伤害
    for (let nearbyEntity of nearbyEntities) {
        if (nearbyEntity.living && nearbyEntity !== entity) {
            nearbyEntity.attack($DamageSource("explosion"), boom_attack);
        }
    }
}
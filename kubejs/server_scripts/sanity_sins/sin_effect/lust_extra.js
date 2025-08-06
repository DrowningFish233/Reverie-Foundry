/**
 * 色欲额外伤害
 */
function lust_extra_damage(event) {
    const { source, entity: target } = event;
    const attacker = source.player || source.actual;

    // 条件检查
    if (!attacker || !attacker.isPlayer() || !attacker.hasEffect("kubejs:lust")) {
        return;
    }

    // 确定加成倍率
    let extraMultiplier = 0;
    if (target.hasEffect("kubejs:blood_rose")) {
        extraMultiplier = 0.2; // 染血玫瑰20%加成
    }
    else if (target.hasEffect("kubejs:rose")) {
        extraMultiplier = 0.1; // 普通玫瑰10%加成
    }

    if (extraMultiplier > 0) {
        new_damage(event, STAGE.ADDITIVE, extraMultiplier);
    }
}
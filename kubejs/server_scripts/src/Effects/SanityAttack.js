/**
 * 理智攻击倍率控制
 * @param {$BeforeLivingEntityHurtKubeEvent_} event 
 */
function sanityAttack(event) {
    const { source, entity } = event;
    const attacker = source.player;

    if (!attacker || !attacker.isLiving()) return;

    const pData = attacker.persistentData;
    const sanity = pData.getInt("sanity") || 0;

    // 获取倍率
    const multiplier = getDamageMultiplier(attacker, pData, sanity);

    // 应用伤害
    new_damage(event, STAGE.MULTIPLY, Math.round(multiplier * 100) / 100);
}

/**
 * 获取伤害倍率(越往上优先级越高)
 */
function getDamageMultiplier(attacker, pData, sanity) {
    // 起床气效果
    if (attacker.hasEffect("kubejs:morning_moodiness")) {
        return Math.random() < 0.5 ? 1.0 : 1 + Math.random() * 9;
    }

    // 七宗罪效果
    if (pData.getInt(sins.WRATH) > 0)
        return 1.2 + Math.random() * 0.3;

    if (pData.getInt(sins.SLOTH) > 0)
        return 0.8 + Math.random() * 0.2;

    // 理智值效果
    if (sanity >= 30)
        return 0.9 + Math.random() * 0.3;

    if (sanity <= -30)
        return 0.8 + Math.random() * 0.2;

    // 默认
    return 0.9 + Math.random() * 0.2;
}
/**
 * 理智攻击倍率控制
 */
function sanityattack(event) {
    const { source, entity } = event;
    const attacker = source.player

    if (!attacker || !attacker.isLiving) {
        return;
    }

    // 获取理智值
    const pData = attacker.persistentData;
    const sanity = pData.getInt("sanity") || 0;

    // 定义效果（使用全局random）
    const damageAdjuster = {
        morningMoodiness: () => Math.random() < 0.5 ? 1.0 : 1 + Math.random() * 9,
        wrath: () => 1.2 + Math.random() * 0.8,
        sloth: () => Math.max(0.1, Math.random() * 0.5), // 最低0.1倍
        highSanity: () => 0.9 + Math.random() * 0.3,
        lowSanity: () => 0.8 + Math.random() * 0.2,
        default: () => 0.9 + Math.random() * 0.2
    };

    // 选择效果
    let multiplier;
    if (attacker.hasEffect("kubejs:morning_moodiness")) {
        multiplier = damageAdjuster.morningMoodiness();
    }
    else if (pData.getInt(sins.WRATH) > 0) {
        multiplier = damageAdjuster.wrath();
    }
    else if (pData.getInt(sins.SLOTH) > 0) {
        multiplier = damageAdjuster.sloth();
    }
    else if (sanity >= 35) {
        multiplier = damageAdjuster.highSanity();
    }
    else if (sanity <= -35) {
        multiplier = damageAdjuster.lowSanity();
    }
    else {
        multiplier = damageAdjuster.default();
    }

    const finalMultiplier = Math.round(multiplier * 100) / 100;
    new_damage(event, STAGE.MULTIPLY, finalMultiplier);

}


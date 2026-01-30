/**
 * 麻痹效果
 * @param {Object} event - 伤害事件对象
 */
function paralysis_combined_effect(event) {
    paralysis_damage_effect(event);
    paralysis_transfer_effect(event);
}

/**
 * 麻痹效果 - 伤害处理部分
 * @param {Object} event - 伤害事件对象
 */
function paralysis_damage_effect(event) {
    const { source, entity } = event;
    const attacker = source.player;

    if (!attacker || !attacker.isLiving() || !attacker.hasEffect("kubejs:paralysis")) {
        return;
    }

    const damageData = getDamageData(event);
    const originalDamage = damageData[0];

    damageData[0] = 1;
    damageData[1] = 0;
    damageData[2] = 0;
    damageData[3] = 1;

    event.setDamage(1);
}


/**
 * 麻痹效果 - 效果转移逻辑
 * @param {Object} event - 伤害事件对象
 */
function paralysis_transfer_effect(event) {
    const { source, entity } = event;
    const attacker = source.player;

    if (!attacker || !attacker.isLiving() || !attacker.hasEffect("kubejs:paralysis")) {
        return;
    }

    const effect = attacker.getEffect("kubejs:paralysis");
    const amplifier = effect.getAmplifier() - 1;
    const duration = effect.getDuration();

    attacker.removeEffect("kubejs:paralysis");

    if (amplifier > 0) {
        attacker.potionEffects.add("kubejs:paralysis", duration, amplifier);
    }
}
/**
 * 饥渴之牙
 * 消耗饥饿增伤 + 攻击概率啃自己/敌人，饱食度越低啃敌人的概率越高
 */
function tooth_of_hunger_remastered(event) {
    const { source, entity, level } = event;
    const attacker = source.player || source.actual;

    // 检查条件
    if (!attacker || !attacker.isPlayer() || !entity.living) {
        return;
    }
    if (!fu_hasTraitMainHand(attacker, "kubejs:tooth_of_hunger")) return;

    const amplifier = fu_getTraitLevelMainHand(attacker, "kubejs:tooth_of_hunger");
    const foodLevel = attacker.getFoodLevel();
    const saturation = attacker.getSaturation();
    const maxFoodLevel = 20;

    // 饱食度比例 
    const hungerRatio = foodLevel / maxFoodLevel;

    // 啃咬伤害
    const biteDamage = amplifier * 5;

    // 消耗饥饿
    const hungerCost = amplifier + 1;
    const newFoodLevel = Math.max(foodLevel - hungerCost, 0);
    const newSaturation = Math.max(saturation - hungerCost, 0);

    // 设置新的饱食度
    attacker.setFoodLevel(newFoodLevel);
    attacker.setSaturation(newSaturation);
    new_damage(event, STAGE.ADDITIVE, 1.3);

    // 饱食度越低，啃敌人的概率越高，啃自己的概率越低
    const biteEnemyChance = 1 - hungerRatio;
    const biteSelfChance = hungerRatio * 0.3;

    const random = Math.random();
    const healHunger = amplifier + 1; // 恢复的饱食度


    if (random < biteEnemyChance) {
        // 恢复饱食度
        const currentFood = attacker.getFoodLevel();
        attacker.setFoodLevel(Math.min(currentFood + healHunger, maxFoodLevel));

    } else if (random < biteEnemyChance + biteSelfChance) {
        // 啃自己(并恢复饱食度)
        attacker.attack($DamageSource("generic"), Math.max(biteDamage / 2, 1));

        // 恢复饱食度
        const currentFood = attacker.getFoodLevel();
        attacker.setFoodLevel(Math.min(currentFood + healHunger, maxFoodLevel));
    }

    // 如果饱食度极低，有额外概率触发自伤(并恢复饱食度)
    if (foodLevel <= 3 && Math.random() < 0.4) {
        attacker.attack($DamageSource("generic"), 1);
        // 恢复饱食度
        const currentFood = attacker.getFoodLevel();
        attacker.setFoodLevel(Math.min(currentFood + healHunger, maxFoodLevel));
    }
}
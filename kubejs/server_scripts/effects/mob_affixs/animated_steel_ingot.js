/** 
 * 如果有锋利附魔则锋利伤害翻倍
 * 
 * 攻击有[词条等级x10]概率恢复3点耐久值
 */
function animated_steel_ingot(event) {
    const { source, entity } = event;
    const attacker = source.player || source.actual;

    if (!attacker || !attacker.isLiving || !attacker.hasEffect("kubejs:animated_steel_ingot")) {
        return;
    }

    // 获取词条等级
    const effect = attacker.getEffect("kubejs:animated_steel_ingot");
    const effectLevel = effect ? effect.getAmplifier() + 1 : 1;
    const repairChance = effectLevel * 10;

    // 获取主手武器
    const weapon = attacker.getMainHandItem();
    if (!weapon.isDamageableItem()) return;


    const sharpnessLevel = weapon.getEnchantmentLevel("minecraft:sharpness");
    if (sharpnessLevel > 0) {
        //每级增加 (0.5 * level + 0.5) 点额外伤害
        const extraDamage = 0.5 * sharpnessLevel + 0.5;
        entity.attack($DamageSource("generic"), extraDamage);
    }
    if (random.nextInt(100) < repairChance) {
        const repairedAmount = 1 + random.nextInt(3); // 随机1-3点
        const newDamage = Math.max(0, weapon.getDamageValue() - repairedAmount);
        weapon.setDamageValue(newDamage);
    }
}

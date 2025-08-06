/**
 * 幸运暴击
 */
function generic_luck(event) {
    const { source, entity } = event;
    // 仅处理玩家攻击
    const attacker = source.player;
    if (!attacker || !entity.living || !attacker.hasEffect("kubejs:luck")) return;

    const luckEffect = attacker.getEffect('kubejs:luck');
    const n = luckEffect ? luckEffect.amplifier + 1 : 0;
    if (n <= 0) return;
    // 获取当前幸运值属性
    const luck = attacker.getAttribute('minecraft:generic.luck')?.value ?? 0;
    // 1d10n幸运检定
    const diceRoll = 1 + random.nextInt(10); // 1-10随机数
    if (diceRoll <= n) { // 检定通过
        // 伤害计算：(20n - 幸运值)% 额外伤害
        const bonusPercent = (20 * n - luck);
        const minBonus = 5; // 保底5%加成
        const effectiveBonus = Math.max(minBonus, bonusPercent);
        // 应用伤害
        const bonusDamage = (effectiveBonus / 100);
        new_damage(event, STAGE.FLAT, bonusDamage);

    }
}

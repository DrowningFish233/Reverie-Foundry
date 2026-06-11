/** 
 * 同天寿：
 * 受到攻击后，计算本次攻击造成的血量损失百分比，并将同等百分比伤害返还给攻击者
 * 只会计算本次血量损失
 * 对Boss生物有最大伤害限制（不超过其生命上限的2%）
 * dream_spell_power 属性会影响伤害强度
 */
function eternal_life(event) {
    const { source, entity } = event;
    const actual = source.actual;

    // 检查是否拥有同天寿效果
    if (!entity.hasEffect("kubejs:eternal_life")) return;
    if (!actual) return;

    let dream_spell_power = entity.getAttribute('kubejs:dream_spell_power')?.value ?? 1;

    let damageTaken = event.getDamage();
    let entity_maxHealth = entity.getMaxHealth();

    let damagePercent = damageTaken / entity_maxHealth;

    if (damagePercent <= 0) return;

    let powerMultiplier = 1 + (dream_spell_power - 1) * 0.5;
    let retaliationDamage = actual.getMaxHealth() * damagePercent * powerMultiplier;

    if (BOSS_LIST.includes(actual.getType().toString())) {
        let maxBossDamage = actual.getMaxHealth() * 0.02;
        retaliationDamage = Math.min(retaliationDamage, maxBossDamage);
    }

    attackEntity(actual, 'generic', retaliationDamage, true)

}

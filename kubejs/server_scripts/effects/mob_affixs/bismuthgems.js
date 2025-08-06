/**
 * 攻击护甲值低于[词条等级x2]的目标时，额外造成10点伤害
 */
function bismuthgems(event) {
    const { source, entity } = event;
    const attacker = source.player || source.actual;

    if (!attacker || !attacker.player || !entity.living || !attacker.hasEffect("kubejs:bismuthgems")) {
        return;
    }
    // 获取当前实体护甲值
    let Effect = attacker.getEffect("kubejs:bismuthgems");
    let Level = Effect.getAmplifier() + 1;
    let NewLevel = Level * 2
    let currentArmor = entity.getArmorValue()
    if (currentArmor < NewLevel) {
        entity.attack($DamageSource("generic"), 10);
    }
}
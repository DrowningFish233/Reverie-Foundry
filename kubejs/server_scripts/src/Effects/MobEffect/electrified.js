/**
 * 目标: 增加雷霆伤害（基于感电层数，每层 +2% 伤害，最多 150%）
 * 同时支持 lightning 和 lightning_magic 类型伤害
 */
function lightning_electrified(event) {
    const entity = event.entity;
    const damageType = event.source.getType();

    // 只处理闪电类型的伤害
    if (damageType !== 'lightning' && damageType !== 'lightning_magic') return;

    if (entity.hasEffect("kubejs:electrified")) {
        const electrifiedEffect = entity.getEffect("kubejs:electrified");
        const currentLevel = electrifiedEffect.getAmplifier();

        const damageBonus = currentLevel * 0.02;
        const cappedBonus = Math.min(damageBonus, 1.5);
        //忘传基础值了
        new_damage(event, STAGE.ADDITIVE, 1 + cappedBonus);
    }
}

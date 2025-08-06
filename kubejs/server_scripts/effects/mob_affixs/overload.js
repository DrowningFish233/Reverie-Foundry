/**
 * [超负荷推进]
 *携带的Buff和Debuff种类总数超过8个时，攻击任意实体触发该词条
 *免疫正常击退
 *提高100x词条等级%移动速度
 *触发该词条时扣减50%当前生命值
 */

function overload(event) {
    const { source, entity } = event;
    const attacker = source.player || source.actual;

    if (!attacker || !attacker.isLiving || !attacker.hasEffect("kubejs:overload")) {
        return;
    }
    const overloadEffect = attacker.getEffect("kubejs:overload");
    const overloadLevel = overloadEffect.getAmplifier();
    const activeEffects = attacker.getActiveEffects();
    const effectCount = activeEffects.size();
    if (effectCount > 8) {
        attacker.potionEffects.add("kubejs:overload_buff_1", 20 * 8, 0);
        attacker.potionEffects.add("kubejs:overload_buff_2", 20 * 8, overloadLevel);
        attacker.potionEffects.add("kubejs:overload_debuff_1", 20 * 8, 0);
    }
}

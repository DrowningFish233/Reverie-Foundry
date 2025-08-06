/**
 * 内蕴之力 - 百分比伤害加成
 * 每5级+1%伤害，上限900级
 */
function intrinsic(event) {
    const { source, entity } = event;
    const attacker = source.player;
    if (!attacker || !attacker.player || !entity.living || !attacker.hasEffect("kubejs:intrinsic")) {
        return;
    }
    const exp_level = Math.min(attacker.xpLevel, 900); // 等级上限900级
    const bonusAttack = Math.floor(exp_level / 5); // 每5级+1%
    if (bonusAttack > 0) {
        new_damage(event, STAGE.ADDITIVE, bonusAttack); // 百分比加成
    }
}
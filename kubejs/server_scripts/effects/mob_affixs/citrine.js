/**
 * 黄水晶灌注效果
 * 每5级经验值+1伤害，等级上限900级（最高180伤害）
 */
function citrine(event) {
    const { source, entity } = event;
    const attacker = source.player || source.actual;
    if (!attacker || !attacker.player || !entity.living || !attacker.hasEffect("kubejs:citrine")) {
        return;
    }
    const playerXpLevel = Math.min(attacker.xpLevel, 900); // 等级上限900级
    const attackBonus = Math.floor(playerXpLevel / 5); // 每5级+1伤害（最高180）
    if (attackBonus > 0) {
        new_damage(event, STAGE.FLAT, attackBonus);
    }
}
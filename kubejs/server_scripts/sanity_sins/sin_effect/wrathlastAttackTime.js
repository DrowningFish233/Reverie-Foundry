//暴怒攻击处理逻辑
function wrathlastAttackTime(event) {
    const { source, entity } = event;
    const attacker = source.player || source.entity;

    if (!attacker || !attacker.player || !entity.living || attacker.hasEffect("kubejs:wrath")) {
        return;
    }
    attacker.persistentData.putInt("idleTimer", 0);
}

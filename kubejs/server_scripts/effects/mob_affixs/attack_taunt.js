/**
 *  攻击力下降30%，但是攻击有概率对被攻击对象施加嘲讽效果
 */
function attack_taunt(event) {
    const { source, entity } = event;
    const attacker = source.player || source.actual;

    if (!attacker || !attacker.isLiving || !attacker.hasEffect("kubejs:attack_taunt")) {
        return;
    }
    new_damage(event, STAGE.MULTIPLY, 0.7);
    if (random.nextFloat() < 0.3) {
        entity.potionEffects.add("kubejs:taunt", 200, 0);
    }
}
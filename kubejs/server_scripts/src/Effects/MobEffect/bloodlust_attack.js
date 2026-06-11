/**
 * 处理血欲效果
 */
function bloodlust_attack(event) {
    const { source, entity } = event;
    const attacker = source.player || source.actual;

    if (!attacker || !attacker.isLiving() || !attacker.hasEffect("kubejs:bloodlust_attack")) {
        return;
    }

    const bloodlustEffect = attacker.getEffect("kubejs:bloodlust_attack");
    const currentStacks = bloodlustEffect.getAmplifier() + 1;

    // 根据当前攻击次数触发不同效果
    switch (currentStacks) {
        case 1: // 施加血欲效果
            entity.potionEffects.add("kubejs:bloodlust", 20 * 16, 0);

            break;

        case 2: // 无效果
            break;

        case 3: // 基于流血层数增加伤害
            const bleedEffect = entity.getEffect("kubejs:bleed");
            if (bleedEffect) {
                const bleedLevel = bleedEffect.getAmplifier() + 1;
                const damageBonus = Math.floor(bleedLevel / 5) * 0.05;
                new_damage(event, STAGE.MULTIPLY, damageBonus);
            }
            break;
    }

    if (currentStacks < 3) {
        attacker.removeEffect("kubejs:bloodlust_attack");
        attacker.potionEffects.add("kubejs:bloodlust_attack", 20 * 16, currentStacks);
    } else {
        attacker.removeEffect("kubejs:bloodlust_attack");
    }
}

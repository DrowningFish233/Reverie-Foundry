/**
 * 烟气X：被击中时所受伤害+5*X%。若“烟气”层数不低于9则所有骰子威力+1，至多拥有10层“烟气”且药水效果结束时层数-1
 * @param {$BeforeLivingEntityHurtKubeEvent_} event 
 * @returns 
 */
function Smoldering_hurt(event) {
    const { source, entity } = event;
    const attacker = source.actual;
    // 检查条件
    if (!entity.isLiving() || !entity.hasEffect("kubejs:smoldering")) return;

    let smolderingEffect = entity.getEffect("kubejs:smoldering")

    const stacks = smolderingEffect.getAmplifier() + 1;

    // 伤害加成
    const damageMultiplier = 1 + (stacks * 0.05);

    new_damage(event, STAGE.ADDITIVE, damageMultiplier)


}

/**
 * 烟气X：被击中时所受伤害+5*X%。若“烟气”层数不低于9则所有骰子威力+1，至多拥有10层“烟气”且药水效果结束时层数-1
 * @param {$BeforeLivingEntityHurtKubeEvent_} event 
 * @returns 
 */
function Smoldering_attack(event) {
    const { source, entity } = event;
    const attacker = source.player || source.actual;

    if (!attacker || !attacker.isPlayer() || !attacker.hasEffect("kubejs:smoldering")) {
        return;
    }

    let smolderingEffect = attacker.getEffect("kubejs:smoldering")

    const stacks = smolderingEffect.getAmplifier() + 1;

    // 伤害加成
    const damageMultiplier = 1 + (stacks * 0.05);

    new_damage(event, STAGE.ADDITIVE, damageMultiplier)

}

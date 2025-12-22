/**
 * 我即黑暗
 * @param {$BeforeLivingEntityHurtKubeEvent_} event 
 * @returns 
 */
function I_am_darkness(event) {

    const { source, entity } = event;
    const attacker = source.player || source.actual;

    if (!attacker || !attacker.isLiving() || !fu_hasTraitAnywhere(attacker, "kubejs:void_ingot")) {
        return;
    }

    let Trait_Level = fu_getHighestTraitLevelAnywhere(attacker, "kubejs:void_ingot")
    let level = attacker.level
    let pos = attacker.blockPosition()
    let entity_level = entity.level
    let entity_pos = entity.blockPosition()

    //获取最大亮度
    let lightLevel = level.getMaxLocalRawBrightness(pos)
    let entity_lightLevel = entity_level.getMaxLocalRawBrightness(entity_pos)

    if (lightLevel < entity_lightLevel) {

        let lightDifference = entity_lightLevel - lightLevel

        // 额外伤害最高150%
        let extraDamage = Trait_Level * lightDifference * 0.1
        extraDamage = Math.min(extraDamage, 1.5)

        let damageMultiplier = 1.0 + extraDamage
        new_damage(event, STAGE.ADDITIVE, damageMultiplier)
    }
}
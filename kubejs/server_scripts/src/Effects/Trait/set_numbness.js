/**
 * 过度充能，攻击命中后：目标获得 1.5秒「电流溢出」，自身获得 3秒速度I
 */
/**
 * @param {$BeforeLivingEntityHurtKubeEvent_} event 
 * @returns 
 */
function set_numbness_effects(event) {
    const { source, entity } = event;
    const attacker = source.player || source.actual;
    if (!attacker || !attacker.isPlayer() || !entity.living || !fu_hasTraitAnywhere(attacker, "kubejs:set_numbness")) {
        return;
    }
    entity.potionEffects.add("kubejs:numbness", 30, 0);
    attacker.potionEffects.add("minecraft:speed", 60, 0);
}

/**
 * 电流溢出
 */
function numbness_effects(event) {
    const { source, entity } = event;
    const attacker = source.player || source.actual;
    if (!entity.living || !attacker || !attacker.isPlayer() || !fu_hasTraitAnywhere(attacker, "kubejs:set_numbness")) {
        return;
    }
    entity.potionEffects.add("kubejs:numbness", 20 * 5, 0);
    if (entity.hasEffect("kubejs:numbness")) {
        new_damage(event, STAGE.ADDITIVE, 1.1);
    }
} 
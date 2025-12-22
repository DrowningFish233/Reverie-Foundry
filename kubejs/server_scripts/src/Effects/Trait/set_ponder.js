/**
 * 陷入思考
 */
/**
 * @param {$BeforeLivingEntityHurtKubeEvent_} event 
 * @returns 
 */
function set_ponder(event) {
    const { source, entity } = event;
    const attacker = source.player || source.actual;

    if (!attacker || !attacker.isLiving() || !fu_hasTraitAnywhere(attacker, "kubejs:set_ponder")) {
        return;
    }

    let traitLevel = fu_getHighestTraitLevelAnywhere(attacker, "kubejs:set_ponder");

    entity.potionEffects.add("kubejs:ponder", 500, traitLevel * 100);
}
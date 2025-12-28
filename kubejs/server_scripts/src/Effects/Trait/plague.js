/**
 * Bugfix
 * 怎么那么多bug
 * 苦露西
 */
/**
 * @param {$BeforeLivingEntityHurtKubeEvent_} event 
 * @returns 
 */
function plague_effects(event) {
    const { source, entity } = event;
    const attacker = source.player
    if (!attacker || !attacker.isPlayer() || !entity.living || !fu_hasTraitAnywhere(attacker, "kubejs:plague")) {
        return;
    }
    const trait_level = fu_getHighestTraitLevelAnywhere(attacker, "kubejs:plague")
    entity.potionEffects.add("kubejs:plague", 30, trait_level - 1);
}
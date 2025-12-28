/**
 * Bugfix
 * 怎么那么多bug
 * 苦露西
 */
/**
 * @param {$BeforeLivingEntityHurtKubeEvent_} event 
 * @returns 
 */
function boron_ingot_effects(event) {
    const { source, entity } = event;
    const attacker = source.player
    if (!attacker || !attacker.isPlayer() || !entity.living || !fu_hasTraitAnywhere(attacker, "kubejs:boron_ingot")) {
        return;
    }
    const trait_level = fu_getHighestTraitLevelAnywhere(attacker, "kubejs:boron_ingot")
    entity.potionEffects.add("kubejs:boron_ingot", 30, 0);
}
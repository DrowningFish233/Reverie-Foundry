/**
 * Bugfix
 * 怎么那么多bug
 * 苦露西
 */
/**
 * @param {$BeforeLivingEntityHurtKubeEvent_} event 
 * @returns 
 */
function radiance_effects(event) {
    const { source, entity } = event;
    const attacker = source.player
    if (!attacker || !attacker.isPlayer() || !entity.living || !fu_hasTraitAnywhere(attacker, "kubejs:radiance")) {
        return;
    }
    const trait_level = fu_getHighestTraitLevelAnywhere(attacker, "kubejs:radiance")
    entity.potionEffects.add("kubejs:radiance", trait_level * 20, trait_level - 1);
}
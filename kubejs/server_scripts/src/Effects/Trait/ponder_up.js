/**
 * Bugfix
 * 怎么那么多bug
 * 苦露西
 */
/**
 * @param {$BeforeLivingEntityHurtKubeEvent_} event 
 * @returns 
 */
function ponder_up_effects(event) {
    const { source, entity } = event;
    const attacker = source.player
    if (!attacker || !attacker.isPlayer() || !entity.isLiving() || !fu_hasTraitAnywhere(attacker, "kubejs:ponder_up")) {
        return;
    }
    const trait_level = fu_getHighestTraitLevelAnywhere(attacker, "kubejs:ponder_up")
    entity.potionEffects.add("kubejs:ponder_up", 60, trait_level);
}
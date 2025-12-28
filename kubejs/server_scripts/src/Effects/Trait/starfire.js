/**
 * 星火
 */
/**
 * @param {$BeforeLivingEntityHurtKubeEvent_} event 
 * @returns 
 */
function starfire(event) {
    const { source, entity } = event;
    const attacker = source.player || source.actual;
    if (!attacker || !attacker.isPlayer() || !entity.isLiving() || !fu_hasTraitAnywhere(attacker, "kubejs:starfire")) {
        return;
    }
    entity.potionEffects.add("eternal_starlight:starfire", 40, 0);
}
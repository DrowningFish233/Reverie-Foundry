/**
 * 射出的弓箭会掉下坠星
 */
function Comet_Trait(event) {
    const { source, entity } = event;
    const attacker = source.player || source.actual;
    if (event.source.getType() !== 'arrow') return;

    if (!attacker || !attacker.isLiving() || !fu_hasTraitAnywhere(attacker, "kubejs:comet_trait")) {
        return;
    }
    spawnComet(attacker, entity)
}

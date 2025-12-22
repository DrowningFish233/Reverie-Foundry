/**
 * @param {$BeforeLivingEntityHurtKubeEvent_} event 
 * @returns 
 */
function monkey(event) {
    const { source, entity } = event;
    const attacker = source.player || source.actual;

    if (!attacker || !attacker.isLiving() || !fu_hasTraitAnywhere(attacker, "kubejs:monkey")) {
        return;
    }
    if (!attacker.onClimbable()) return
    const newdamage = event.damage / 2
    entity.invulnerableTime = 0
    entity.attack($DamageSource("arrow"), newdamage);
}
/**
 * 农夫的儿子
 */
/**
 * @param {$BeforeLivingEntityHurtKubeEvent_} event 
 * @returns 
 */
function farmersdelight(event) {
    const { source, entity } = event;
    const attacker = source.player || source.actual;

    if (!attacker || !attacker.isPlayer() || !entity.isLiving() || !fu_hasTraitAnywhere(attacker, "kubejs:farmersdelight")) {
        return;
    }

    const currentHealth = entity.getHealth();
    const damage = event.getDamage();

    if (currentHealth <= damage) {
        event.cancel();
        entity.setHealth(1);
    }
}
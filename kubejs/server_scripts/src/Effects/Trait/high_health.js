/**
 * @param {$BeforeLivingEntityHurtKubeEvent_} event 
 * @returns 
 */
function high_health(event) {
    const { source, entity } = event;
    const attacker = source.player;
    if (!attacker || !entity.isLiving()) return;
    if (!fu_hasTraitAnywhere(attacker, 'kubejs:high_health')) return

    const traitLevel = fu_getHighestTraitLevelAnywhere(attacker, "kubejs:high_health");
    const minHealthPercent = 1.0 - (traitLevel * 0.10);
    const minHealthValue = entity_MaxHealth * minHealthPercent;

    if (entity_Health < minHealthValue) {
        const damageMultiplier = traitLevel * 0.10;

        new_damage(event, STAGE.MULTIPLY, 1 + damageMultiplier);

    }
}
/**
 * 威士忌
 * @param {$BeforeLivingEntityHurtKubeEvent_} event 
 * @returns 
 */
function vodka_effect(event) {
    const { source, entity } = event;
    const attacker = source.player || source.actual;

    if (!attacker || !attacker.isPlayer() || !attacker.hasEffect("kubejs:vodka")) {
        return;
    }

    new_damage(event, STAGE.ADDITIVE, 1.06);
}

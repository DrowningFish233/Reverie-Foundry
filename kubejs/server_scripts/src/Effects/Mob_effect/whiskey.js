/**
 * 威士忌
 */
function whiskey_effect(event) {
    const { source, entity } = event;
    const attacker = source.player || source.actual;

    if (!attacker || !attacker.isPlayer() || !attacker.hasEffect("kubejs:whiskey")) {
        return;
    }

    new_damage(event, STAGE.ADDITIVE, 0.04);
}
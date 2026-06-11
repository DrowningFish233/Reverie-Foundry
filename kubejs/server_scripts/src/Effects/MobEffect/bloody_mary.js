/**
 * 血腥玛丽
 */
function bloody_mary_effect(event) {
    const { source, entity } = event;
    const attacker = source.player || source.actual;

    if (!attacker || !attacker.isPlayer() || !attacker.hasEffect("kubejs:bloody_mary")) {
        return;
    }

    new_damage(event, STAGE.ADDITIVE, 0.1);
}

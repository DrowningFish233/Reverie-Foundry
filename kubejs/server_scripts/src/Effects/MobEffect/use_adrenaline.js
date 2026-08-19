
function use_adrenaline_effect(event) {
    const { source, entity } = event;
    const attacker = source.player || source.actual;

    if (!attacker || !attacker.isPlayer() || !attacker.hasEffect("kubejs:use_adrenaline")) {
        return;
    }

    new_damage(event, STAGE.MULTIPLY, 2.0);
}

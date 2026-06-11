//古典酒
function old_fashioned_effect(event) {
    const { source, entity } = event;
    const attacker = source.player
    if (!attacker || !attacker.isLiving() || !attacker.hasEffect("kubejs:old_fashioned")) {
        return;
    }
    new_damage(event, STAGE.MULTIPLY, 0.5);
    return;
}

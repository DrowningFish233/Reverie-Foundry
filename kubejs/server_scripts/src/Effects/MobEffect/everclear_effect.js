/**
 * 谷酒
 */
function everclear_effect(event) {
    const { source, entity } = event;
    const attacker = source.player || source.actual;

    if (!attacker || !attacker.isPlayer() || !attacker.hasEffect("kubejs:everclear")) {
        return;
    }

    new_damage(event, STAGE.ADDITIVE, 1.25);
}

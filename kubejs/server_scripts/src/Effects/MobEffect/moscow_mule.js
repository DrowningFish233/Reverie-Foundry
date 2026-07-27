/**
 * 莫斯科骡子
 */
function moscow_mule_effect(event) {
    const { source, entity } = event;
    const attacker = source.player || source.actual;

    if (!attacker || !attacker.isPlayer() || !attacker.hasEffect("kubejs:moscow_mule")) {
        return;
    }

    new_damage(event, STAGE.ADDITIVE, 1.09);
}

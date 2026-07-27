/**
 * 紫色阴霾
 */
function purple_haze_effect(event) {
    const { source, entity } = event;
    const attacker = source.player || source.actual;

    if (!attacker || !attacker.isPlayer() || !attacker.hasEffect("kubejs:purple_haze")) {
        return;
    }

    new_damage(event, STAGE.ADDITIVE, 1.08);
}

/**
 * 紫色阴霾-受击
 * 新版使用属性值作为替代
function purple_haze_attack_effect(event) {
    const { source, entity } = event;
    const actual = source.actual;
    if (!entity.hasEffect("kubejs:purple_haze")) return;
    entity.potionEffects.add('kubejs:purple_haze_attack', 15, 0);
    if (!entity.hasEffect("kubejs:purple_haze_attack")) return;
    event.cancel();
}
*/

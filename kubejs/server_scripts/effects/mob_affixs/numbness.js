/**
 * 芝士普通的增伤效果
 */
function numbness_effects(event) {
    const { source, entity } = event;
    const attacker = source.player || source.actual;
    if (!entity.living || !attacker || !attacker.player || !attacker.hasEffect("kubejs:set_numbness")) {
        return;
    }
    entity.potionEffects.add("kubejs:numbness", 20 * 5, 0);
    if (entity.hasEffect("kubejs:numbness")) {
        new_damage(event, STAGE.ADDITIVE, 1.1);
    }
} 
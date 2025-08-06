/**
 * 恶念白镴锭
 */
function malignant_pewter_ingot(event) {
    const { source, entity } = event;
    const attacker = source.player || source.actual;
    if (!attacker || !attacker.player || !entity.living || !attacker.hasEffect("kubejs:malignant_pewter_ingot")) {
        return;
    }
    entity.potionEffects.add("malum:silenced", 30, 0);
}
/**
 * 过度充能，挂buff效果，挂什么忘了
 */
function set_numbness_effects(event) {
    const { source, entity } = event;
    const attacker = source.player || source.actual;
    if (!attacker || !attacker.player || !entity.living || !attacker.hasEffect("kubejs:set_numbness")) {
        return;
    }
    entity.potionEffects.add("kubejs:numbness", 30, 0);
    attacker.potionEffects.add("minecraft:speed", 60, 0);
}
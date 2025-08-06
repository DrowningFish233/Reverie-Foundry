function wrath_effect(event) {
    const { source, entity } = event;
    let attacker = source.player || source.entity;
    if (!entity.living || !attacker || !attacker.player || event.damage <= 0) {
        return;
    }
    if (entity.hasEffect("kubejs:wrath_damage") && attacker.hasEffect("kubejs:wrath")) {
        const currentDamage = event.damage;
        new_damage(event, STAGE.FLAT, currentDamage * 3.0);
        entity.removeEffect("kubejs:wrath_damage")
        entity.removeEffect("minecraft:glowing")
    }
}
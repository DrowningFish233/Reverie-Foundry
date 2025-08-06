function sloth_morning_moodiness(event) {
    const { source, entity } = event;
    let attacker = source.player || source.entity;

    if (!attacker || !attacker.player || !entity.living || !attacker.hasEffect("kubejs:morning_moodiness")) {
        return;
    }

    attacker.removeEffect("kubejs:morning_moodiness");
    attacker.potionEffects.add("minecraft:blindness", 200, 2);
    attacker.potionEffects.add("minecraft:darkness", 200, 2);
    attacker.potionEffects.add("minecraft:unluck", 200, 2);
    attacker.potionEffects.add("minecraft:slowness", 200, 2);
    attacker.potionEffects.add("minecraft:resistance", 180, 3);
    attacker.potionEffects.add("kubejs:morning_moodiness_2", 180, 0);

}
function gluttony(event) {
    const { source, entity } = event;
    let attacker = source.player || source.entity;

    if (!attacker || !attacker.player || !entity.living || !attacker.hasEffect("kubejs:gluttony")) {
        return;
    }

    let existingEffect = attacker.getEffect("kubejs:gluttony");
    let level = existingEffect ? existingEffect.getAmplifier() + 1 : 0;

    new_damage(event, STAGE.MULTIPLY, (level * 0.5));

}
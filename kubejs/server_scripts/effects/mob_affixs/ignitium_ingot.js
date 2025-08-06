function ignitium_ingot(event) {
    const { source, entity } = event;
    const attacker = source.player || source.actual;

    if (!attacker || !attacker.isLiving || !attacker.hasEffect("kubejs:ignitium_ingot")) {
        return;
    }

    let Effect = entity.getEffect("kubejs:ignitium_ingot");
    let Level = Effect.getAmplifier();

    entity.potionEffects.add("cataclysm:blazing_brand", Level * 20, Level);
}
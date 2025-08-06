

function ancient_metal_ingot(event) {
    const { source, entity } = event;
    const attacker = source.player || source.actual;

    if (!attacker || !attacker.isLiving || !attacker.hasEffect("kubejs:ancient_metal_ingot")) {
        return;
    }

    const pData = attacker.persistentData;
    const sanity = pData.getInt("sanity") || 0;

    const probability = Math.abs(sanity);

    const randomChance = Math.random() * 100;

    if (randomChance > probability) return;


    let Effect = entity.getEffect("kubejs:ancient_metal_ingot");
    let Level = Effect.getAmplifier() + 1;

    entity.potionEffects.add("kubejs:taunt_2", Level * 40, Level);
}
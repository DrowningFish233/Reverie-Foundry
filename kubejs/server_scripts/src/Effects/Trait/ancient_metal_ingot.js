
/**
 * @param {$BeforeLivingEntityHurtKubeEvent_} event 
 * @returns 
 */
function ancient_metal_ingot(event) {
    const { source, entity } = event;
    const attacker = source.player || source.actual;

    if (!attacker || !attacker.isLiving() || !fu_hasTraitAnywhere(attacker, "kubejs:ancient_metal_ingot")) {
        return;
    }

    const pData = attacker.persistentData;
    const sanity = pData.getInt("sanity") || 0;

    const probability = Math.abs(sanity);

    const randomChance = Math.random() * 100;

    if (randomChance > probability) return;

    let traitLevel = fu_getHighestTraitLevelAnywhere(attacker, "kubejs:ancient_metal_ingot");

    entity.potionEffects.add("kubejs:taunt_2", traitLevel * 40, traitLevel);
}
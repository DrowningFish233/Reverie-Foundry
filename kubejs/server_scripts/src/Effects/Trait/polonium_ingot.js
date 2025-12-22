/**
 * @param {$BeforeLivingEntityHurtKubeEvent_} event 
 * @returns 
 */
function polonium_ingot(event) {
    const { source, entity } = event;
    const attacker = source.player;

    if (!attacker || !attacker.isPlayer() || !entity.isLiving() || !fu_hasTraitAnywhere(attacker, "kubejs:polonium_ingot")) {
        return;
    }
    const traitLevel = fu_getHighestTraitLevelAnywhere(attacker, "kubejs:polonium_ingot");

    const requiredEffects = [
        "minecraft:poison",
        "kubejs:alcohol_poisoning",
        "kubejs:plague",
        "kubejs:radiance"
    ];

    if (requiredEffects.some(effectId => entity.hasEffect(effectId))) {
        entity.potionEffects.add("kubejs:elemental_mix", traitLevel * 20, traitLevel - 1);
    }
}
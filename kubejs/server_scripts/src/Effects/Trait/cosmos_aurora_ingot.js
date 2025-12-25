/**
 * 极光合金
 */
/**
 * @param {$BeforeLivingEntityHurtKubeEvent_} event 
 * @returns 
 */
function cosmos_aurora_ingot(event, player) {
    if (!fu_hasTraitAnywhere(player, "kubejs:cosmos_aurora_ingot")) return;
    let traitLevel = fu_getHighestTraitLevelAnywhere(player, "kubejs:cosmos_aurora_ingot");

    if (player.getLevel().isThundering()) {
        player.potionEffects.add("kubejs:spell_power_increase", 50, traitLevel - 1);

    } else if (player.getLevel().isRaining()) {
        player.potionEffects.add("kubejs:spell_power_increase", 50, traitLevel - 1);
    }
} 
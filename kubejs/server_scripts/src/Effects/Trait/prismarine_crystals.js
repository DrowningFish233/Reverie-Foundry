/**
 * @param {$SimplePlayerKubeEvent_} event 
 * @returns 
 */
function prismarine_crystals(event, player) {
    if (!fu_hasTraitAnywhere(player, "kubejs:prismarine_crystals")) return
    let lavaLike = "minecraft:water"
    if ([player.getBlock(), player.block.getUp()].some(b => b.id == lavaLike)) {
        player.potionEffects.add("kubejs:prismarine_crystals_1", 20 * 3, 0);
    } return
}

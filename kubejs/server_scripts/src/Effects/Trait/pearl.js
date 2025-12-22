/**
 * 珍珠霉运效果
 */
function pearl(event) {
    const player = event.entity;
    if (!player?.player || !fu_hasTraitAnywhere(player, "kubejs:pearl")) return;

    const traitLevel = fu_getHighestTraitLevelAnywhere(player, "kubejs:pearl");
    player.removeEffect("kubejs:pearl");
    player.potionEffects.add("minecraft:unluck", 1200, traitLevel - 1);
}
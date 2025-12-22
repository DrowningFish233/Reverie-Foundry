//咒魂锭
function cursium_ingot(event, player) {

    if (!player || !fu_hasTraitAnywhere(player, "kubejs:cursium_ingot")) return;

    let traitLevel = fu_getHighestTraitLevelAnywhere(player, "kubejs:cursium_ingot");

    player.potionEffects.add("cataclysm:ghost_form", traitLevel * 30, 0);
}
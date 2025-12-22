//星光亲和
function eternal_starlight(event, player) {
    if (!fu_hasTraitAnywhere(player, 'kubejs:eternal_starlight')) return;
    const traitLevel = fu_getHighestTraitLevelAnywhere(player, "kubejs:eternal_starlight");
    if (event.getLevel().getDimension() == "eternal_starlight:starlight") {
        player.potionEffects.add("kubejs:eternal_starlight_attack", 120, traitLevel - 1);
    } else {
        player.potionEffects.add("kubejs:eternal_starlight_speed", 120, traitLevel - 1);
    }
}
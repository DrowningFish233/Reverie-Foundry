
function kubejs_emerald(event, player) {
    if (!fu_hasTraitAnywhere(player, "kubejs:emerald")) return;

    const weapon = player.getMainHandItem();
    if (!weapon.isDamageableItem()) return;

    const traitLevel = fu_getHighestTraitLevelAnywhere(player, "kubejs:emerald");
    const effectLevel = Math.floor(traitLevel / 2);
    player.potionEffects.add("minecraft:hero_of_the_village", 60, effectLevel);

    const newDamage = weapon.getDamageValue() + 4;
    if (newDamage >= weapon.getMaxDamage()) {
        weapon.shrink(1);
    } else {
        weapon.setDamageValue(newDamage);
    }
}
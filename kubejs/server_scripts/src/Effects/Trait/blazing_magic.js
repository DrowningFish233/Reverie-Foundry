/**
 * 灼热魔力效果
 */
function blazing_magic(event) {
    const player = event.player;
    if (!player || !fu_hasTraitAnywhere(player, "kubejs:blazing_magic_set")) return;

    const traitLevel = fu_getHighestTraitLevelAnywhere(player, "kubejs:blazing_magic_set");
    const chance = traitLevel * 0.2;

    if (Math.random() < chance) {
        if (player.hasEffect("kubejs:blazing_magic")) {
            const existingEffect = player.getEffect("kubejs:blazing_magic");
            let newAmplifier = 0;
            newAmplifier = Math.min(existingEffect.getAmplifier() + 1, 9);
            if (newAmplifier <= 9) {
                player.potionEffects.add("kubejs:blazing_magic", 20 * 8, newAmplifier);
            }
        } else {
            player.potionEffects.add("kubejs:blazing_magic", 20 * 8, 0);
        }
    }
}
/**
 * 铁木锭
 */
function irons_spellbooks_root(event) {
    const player = event.player;
    const pData = player.persistentData;

    if (fu_hasTraitAnywhere(player, "kubejs:ironwood_ingot")) {
        let currentSanity = pData.getInt(sanity);
        updateplayersanity(player, currentSanity - 15)
        const currentHealth = player.health;
        const maxHealth = player.maxHealth;
        const damageAmount = maxHealth * 0.4;

        if (currentSanity <= -45) {
            const remainingHealth = currentHealth - damageAmount;

            if (remainingHealth <= 0) {
                attackEntity(player, 'out_of_world', damageAmount, true)
                return;
            }
            else {
                let traitLevel = fu_getHighestTraitLevelAnywhere(player, "kubejs:ironwood_ingot");
                attackEntity(player, 'out_of_world', damageAmount, true)
                overLimitSpellCast($ResourceLocation('irons_spellbooks', 'root'), traitLevel - 1, player, false);
            }
        }
        else {
            player.potionEffects.add("kubejs:disillusionment", 20 * 2, 0);
            let traitLevel = fu_getHighestTraitLevelAnywhere(player, "kubejs:ironwood_ingot");
            overLimitSpellCast($ResourceLocation('irons_spellbooks', 'root'), traitLevel - 1, player, false);
        }
    }
}
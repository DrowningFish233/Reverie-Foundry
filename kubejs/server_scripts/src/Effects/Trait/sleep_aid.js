// priority: 0
NativeEvents.onEvent($PlayerWakeUpEvent, event => {
    let player = event.entity;
    if (player instanceof $ServerPlayer && !event.updateLevel()) {
        const pData = player.persistentData;
        const sanity = pData.getInt("sanity");
        updateplayersanity(player, sanity + 10)
        if (fu_hasTraitAnywhere(player, "kubejs:sleep_aid")) {
            let trait_level = fu_getHighestTraitLevelAnywhere(player, "kubejs:sleep_aid")
            player.potionEffects.add('kubejs:protect', 20 * 90, trait_level - 1, false, true)
        }
    }
})

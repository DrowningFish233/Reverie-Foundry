const curiosEffects = new Map([
    ['kubejs:blue_star', (player, event) => {
        player.potionEffects.add("minecraft:speed", 20 * 5, 1);
    }],
    ['kubejs:mana_regeneration_band', (player, event) => {
        player.heal(0.2)
    }],
    ['kubejs:totem_of_undying', (player, event) => {
        player.potionEffects.add("minecraft:health_boost", 20 * 5, 4);
        player.potionEffects.add("minecraft:regeneration", 20 * 5, 0);
    }],
    ['kubejs:papyrus_scarab', (player, event) => {
        player.potionEffects.add("kubejs:minion_capacity", 20 * 6, 0)
    }],
    ['kubejs:red_skull', (player, event) => {
        let currentHealth = player.getHealth();
        let maxHealth = player.getMaxHealth();
        let healthPercentage = currentHealth / maxHealth;
        if (healthPercentage <= 0.5) {
            player.potionEffects.add("minecraft:strength", 20 * 3, 2);
        }
    }],
    ['kubejs:melting_eyeball', (player, event) => {
        player.potionEffects.add("kubejs:protect", 20 * 3, 0);
    }],
    ['kubejs:heart_of_darkness', (player, event) => {
        const { x, y, z } = player;
        player.potionEffects.add('kubejs:heart_of_darkness', 20 * 3, 0);
        if (player.hasEffect('kubejs:heart_of_darkness')) {
            if (!player.hasEffect('kubejs:use_adrenaline')) {
                if (!player.hasEffect('kubejs:no_adrenaline')) {
                    const currentAdrenaline = player.persistentData.getInt("adrenaline");
                    if (currentAdrenaline < 100) {
                        player.persistentData.putInt("adrenaline", currentAdrenaline + 1);
                        if (currentAdrenaline + 1 === 100) {
                            let playerName = getplayerName(player.toString());
                            player.setStatusMessage(
                                Text.translate('message.adrenaline.charged', [
                                    Text.of(playerName).color('yellow')
                                ]).color('yellow')
                            );
                            event.level[$playersound]
                                (null, player.x, player.y, player.z, "kubejs:full_adrenaline", "players", 1.0, 1.0)
                        }
                    }
                }
            }
        } else {
            player.persistentData.putInt("adrenaline", 0);
        }
    }]
]);


const playerCache = new WeakMap();

PlayerEvents.tick(event => {
    const player = event.player;
    if (!player) return;

    if (player.tickCount % 20 !== 0) return;

    let cachedEquipped = playerCache.get(player);
    const nowEquipped = new Set();

    for (let [curioId] of curiosEffects) {
        if (curiosHelper.findFirstCurio(player, curioId).isPresent()) {
            nowEquipped.add(curioId);

            if (!cachedEquipped || !cachedEquipped.has(curioId)) {
                curiosEffects.get(curioId)(player, event);
            }
        }
    }
    playerCache.set(player, nowEquipped);
});

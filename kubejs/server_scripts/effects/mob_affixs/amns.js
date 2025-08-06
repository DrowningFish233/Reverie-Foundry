PlayerEvents.chat((event) => {
    const { player, message } = event;
    if (player.hasEffect("kubejs:amns") && message.toLowerCase() === "amns") {
        const potionEffects = [
            "minecraft:speed",
            "minecraft:haste",
            "minecraft:strength",
            "minecraft:jump_boost",
            "minecraft:night_vision",
            "minecraft:invisibility",
            "minecraft:water_breathing",
            "minecraft:fire_resistance",
            "minecraft:absorption",
            "minecraft:slowness",
            "minecraft:weakness",
            "minecraft:nausea",
            "minecraft:mining_fatigue",
            "minecraft:blindness",
            "minecraft:wither",
            "minecraft:poison",
            "minecraft:darkness"
        ];

        const randomEffect = potionEffects[random.nextInt(potionEffects.length)];

        player.potionEffects.add(randomEffect, 30 * 20, 1, false, true);
    }
});
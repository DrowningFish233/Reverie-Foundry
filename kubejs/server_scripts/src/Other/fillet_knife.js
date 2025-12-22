ItemEvents.firstRightClicked(event => {
    const { player, item } = event;

    if (!player.getMainHandItem()) return;
    if (player.getCooldowns().isOnCooldown(player.getMainHandItem())) return;


    const filletKnives = [
        { id: 'aquaculture:wooden_fillet_knife', min: 1, max: 1 },
        { id: 'aquaculture:stone_fillet_knife', min: 1, max: 2 },
        { id: 'aquaculture:iron_fillet_knife', min: 1, max: 3 },
        { id: 'aquaculture:gold_fillet_knife', min: 2, max: 3 },
        { id: 'aquaculture:diamond_fillet_knife', min: 2, max: 4 },
        { id: 'aquaculture:neptunium_fillet_knife', min: 3, max: 5 }
    ];

    const itemId = item.getId();
    const knifeConfig = filletKnives.find(knife => knife.id === itemId);

    if (!knifeConfig) return;

    const maxHealth = player.getMaxHealth()
    const damageAmount = maxHealth * 0.2;
    event.player.swing()
    player.attack($DamageSource("out_of_world"), damageAmount);
    const randomAmount = Math.floor(Math.random() * (knifeConfig.max - knifeConfig.min + 1)) + knifeConfig.min;
    player.give(Item.of('kubejs:raw_manflesh', randomAmount));

    event.level[$playersound]
        (null, player.x, player.y, player.z, "minecraft:entity.villager.hurt", "players", 1.0, 1.0)

    player.potionEffects.add('minecraft:blindness', 60, 0);
    player.potionEffects.add('minecraft:nausea', 100, 0);
    if (player.hasEffect("kubejs:bleed")) {
        let bEffect = player.getEffect("kubejs:bleed");
        let cLevel = bEffect.getAmplifier() + 1;
        let sanity = player.persistentData.getInt("sanity") || 0
        updateplayersanity(player, sanity - 5);
        player.potionEffects.add('kubejs:bleed', 400, cLevel);
    } else {
        player.potionEffects.add('kubejs:bleed', 400, 0);
    }
    player.addItemCooldown(event.item, 600);
});
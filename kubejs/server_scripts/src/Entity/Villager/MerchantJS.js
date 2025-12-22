// server_scripts
ItemEvents.entityInteracted(event => {
    if (event.getTarget().type === "enderscape:driftlet") {
        event.player.swing()
        // 完整地创建一行交易内容。
        let offer0 = MerchantJSUtils.createMerchantOffer({
            buy: Item.of("enderscape:rubble_chitin").toNBT(),
            buyB: Item.of('enderscape:nebulite').toNBT(),
            sell: Item.of('minecraft:dragon_breath').toNBT(),
            uses: 0,
            maxUses: 50,
            xp: 5,
            priceMultiplier: 0,
            demand: 0
        });
        // 完整地创建一行交易内容。
        let offer1 = MerchantJSUtils.createMerchantOffer({
            buy: Item.of('minecraft:ender_eye', 16).toNBT(),
            buyB: Item.of('minecraft:end_crystal', 4).toNBT(),
            sell: Item.of("minecraft:dragon_head").toNBT(),
            uses: 0,
            maxUses: 50,
            xp: 5,
            priceMultiplier: 0,
            demand: 0
        });

        let offer2 = MerchantJSUtils.createMerchantOffer({
            buy: Item.of('enderscape:chorus_cake_roll', 2).toNBT(),
            sell: Item.of('enderscape:flanger_berry', 12).toNBT(),
            uses: 0,
            maxUses: 50,
            xp: 5,
            priceMultiplier: 0,
            demand: 0
        });

        let offer3 = MerchantJSUtils.createMerchantOffer({
            buy: Item.of('enderscape:chorus_cake_roll', 2).toNBT(),
            sell: Item.of('enderscape:flanger_berry', 12).toNBT(),
            uses: 0,
            maxUses: 50,
            xp: 5,
            priceMultiplier: 0,
            demand: 0
        });

        let offer4 = MerchantJSUtils.createMerchantOffer({
            buy: Item.of('minecraft:phantom_membrane', 6).toNBT(),
            buyB: Item.of('enderscape:nebulite', 2).toNBT(),
            sell: Item.of('minecraft:elytra').toNBT(),
            uses: 0,
            maxUses: 50,
            xp: 5,
            priceMultiplier: 0,
            demand: 0
        });
        // 打开自定义交易，需传入玩家、界面标题和交易列表。
        MerchantJSUtils.openMerchant(
            event.player,
            Component.translatable("entity.enderscape.driftlet"),
            [offer0, offer1, offer2, offer3, offer4]
        );
    }
});


// server_scripts
ItemEvents.entityInteracted(event => {
    if (event.getTarget().type === "endermanoverhaul:flower_fields_enderman") {
        event.player.swing()
        // 完整地创建一行交易内容。
        let offer0 = MerchantJSUtils.createMerchantOffer({
            buy: Item.of("minecraft:pink_petals", 8).toNBT(),
            buyB: Item.of("minecraft:leather_boots").toNBT(),
            sell: Item.of("terra_curio:flower_boots").toNBT(),
            uses: 0,
            maxUses: 50,
            xp: 5,
            priceMultiplier: 0,
            demand: 0
        });

        let offer1 = MerchantJSUtils.createMerchantOffer({
            buy: Item.of('bosses_of_mass_destruction:soul_star', 8).toNBT(),
            buyB: Item.of('eternal_starlight:red_velvetumoss_flower').toNBT(),
            sell: Item.of('bosses_of_mass_destruction:brimstone_nectar').toNBT(),
            uses: 0,
            maxUses: 50,
            xp: 5,
            priceMultiplier: 0,
            demand: 0
        });
        MerchantJSUtils.openMerchant(
            event.player,
            Component.translatable("entity.endermanoverhaul.flower_fields_enderman"),
            [offer0, offer1]
        );
    }
});

// 蘑菇末影人交易
ItemEvents.entityInteracted(event => {
    if (event.getTarget().type === "endermanoverhaul:mushroom_fields_enderman") {
        event.player.swing()
        // 完整地创建一行交易内容。
        let offer0 = MerchantJSUtils.createMerchantOffer({
            buy: Item.of("minecraft:brown_mushroom", 8).toNBT(),
            buyB: Item.of("minecraft:red_mushroom", 4).toNBT(),
            sell: Item.of("minecraft:mushroom_stew", 8).toNBT(),
            uses: 0,
            maxUses: 50,
            xp: 5,
            priceMultiplier: 0,
            demand: 0
        });

        let offer1 = MerchantJSUtils.createMerchantOffer({
            buy: Item.of("kubejs:terraulite_ingot", 4).toNBT(),
            buyB: Item.of("eternal_starlight:glowing_mushroom", 2).toNBT(),
            sell: Item.of("alshanex_familiars:strange_mushroom").toNBT(),
            uses: 0,
            maxUses: 50,
            xp: 5,
            priceMultiplier: 0,
            demand: 0
        });

        let offer2 = MerchantJSUtils.createMerchantOffer({
            buy: Item.of("minecraft:red_mushroom", 16).toNBT(),
            sell: Item.of('minecraft:ender_pearl', 4).toNBT(),
            uses: 0,
            maxUses: 50,
            xp: 5,
            priceMultiplier: 0,
            demand: 0
        });


        let offer3 = MerchantJSUtils.createMerchantOffer({
            buy: Item.of("minecraft:crimson_fungus", 2).toNBT(),
            sell: Item.of('minecraft:crimson_stem').toNBT(),
            uses: 0,
            maxUses: 50,
            xp: 5,
            priceMultiplier: 0,
            demand: 0
        });

        let offer4 = MerchantJSUtils.createMerchantOffer({
            buy: Item.of("minecraft:warped_fungus", 2).toNBT(),
            sell: Item.of('minecraft:warped_stem').toNBT(),
            uses: 0,
            maxUses: 50,
            xp: 5,
            priceMultiplier: 0,
            demand: 0
        });


        let offer5 = MerchantJSUtils.createMerchantOffer({
            buy: Item.of("minecraft:warped_fungus", 32).toNBT(),
            buyB: Item.of("minecraft:crimson_fungus", 32).toNBT(),
            sell: Item.of('eternal_starlight:fungus_amulet').toNBT(),
            uses: 0,
            maxUses: 50,
            xp: 5,
            priceMultiplier: 0,
            demand: 0
        });
        // 打开自定义交易，需传入玩家、界面标题和交易列表。
        MerchantJSUtils.openMerchant(
            event.player,
            Component.translatable("entity.endermanoverhaul.mushroom_fields_enderman"),
            [offer0, offer2, offer3, offer4, offer5, offer1],
        );
    }
});

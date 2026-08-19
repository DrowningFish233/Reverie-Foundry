StartupEvents.registry("item", event => {
    event.create('exploding_chocolate_bar')
        .food(food => {
            food.nutrition(6)
                .saturation(0.35)
        })
        .texture('kubejs:item/food/exploding_chocolate_bar')
    event.create('bluestar')
        .food(food => {
            food.nutrition(8)
                .saturation(0.2)
                .effect('kubejs:blue_star', 1200, 2, 0.9)
        })
        .tag('kubejs:bluestar')
        .texture('kubejs:item/food/blue_star')
    event.create('bad_apple')
        .food(food => {
            food.nutrition(10)
                .saturation(1)
                .eatSeconds(5)
                .effect("fruitsdelight:sweetening", 1200, 2, 0.9)
                .effect("minecraft:nausea", 200, 0, 0.75)
        })
        .component($ConfluenceMagicLib.MOD_RARITY, $ModRarity.MASTER)
        .texture('kubejs:item/food/bad_apple')
        .glow(true)
    event.create('raw_manflesh')
        .food(food => {
            food.nutrition(6)
                .saturation(0.2)
                .eatSeconds(1.5)
                .effect('minecraft:hunger', 60, 0, 0.2)
        })
        .tag('kubejs:foods/manflesh')
        .tag('kubejs:foods/manflesh/raw_manflesh')
        .texture('kubejs:item/food/raw_manflesh')
    event.create('cooked_manflesh')
        .food(food => {
            food.nutrition(8)
                .saturation(0.4)
                .eatSeconds(1.3)
                .effect('minecraft:hunger', 80, 0, 0.4)
                .alwaysEdible()
        })
        .tag('kubejs:foods/manflesh')
        .tag('kubejs:foods/manflesh/cooked_manflesh')
        .texture('kubejs:item/food/cooked_manflesh')
    event.create('miracle_fruit')
        .food(food => {
            food.nutrition(8)
                .saturation(0.4)
                .eatSeconds(1.3)
                .effect('minecraft:resistance', 20 * 2, 4, 0.1)
                .effect('minecraft:haste', 20 * 10, 3, 0.5)
                .effect('minecraft:health_boost', 20 * 10, 2, 0.5)
                .effect('minecraft:regeneration', 20 * 3, 4, 0.5)
                .alwaysEdible()
        })
        .texture('kubejs:item/food/miracle_fruit')
    event.create('emergency_sanity_elixir_a')
        .food(food => {
            food.nutrition(2)
                .saturation(0.5)
                .eaten(ctx => {
                    ctx.player.give("minecraft:glass_bottle")
                })
                .alwaysEdible()
                .effect('kubejs:is_addiction', 20 * 30, 0, 0.85)
        })
        .maxStackSize(16)
        .texture('kubejs:item/food/emergency_sanity_elixir_a')
        .useAnimation("drink");
    event.create('emergency_sanity_elixir_b').food(food => {
        food.nutrition(2)
            .saturation(0.5)
            .eaten(ctx => {
                ctx.player.give("minecraft:glass_bottle")
            })
            .alwaysEdible()
            .effect('kubejs:is_addiction', 20 * 60, 1, 0.85)
    })
        .maxStackSize(16)
        .texture('kubejs:item/food/emergency_sanity_elixir_b')
        .useAnimation("drink");
    event.create('emergency_sanity_elixir_y').food(food => {
        food.nutrition(3)
            .saturation(0.5)
            .eaten(ctx => {
                ctx.player.give("minecraft:glass_bottle")
            })
            .effect('kubejs:is_addiction', 20 * 90, 2, 0.85)
            .alwaysEdible()
    })
        .maxStackSize(16)
        .texture('kubejs:item/food/emergency_sanity_elixir_y')
        .useAnimation("drink");
    event.create('foul_flesh').food(food => {
        food.nutrition(10)
            .saturation(0.5)
            .alwaysEdible()
    })
        .maxStackSize(32)
        .texture('kubejs:item/food/foul_flesh')
    //alcohol ============================================= alcohol
    event.create('bloody_mary').food(food => {
        food.nutrition(2)
            .eaten(ctx => {
                ctx.player.give("minecraft:glass_bottle")
            })
            .effect('kubejs:bloody_mary', 1200 * 8, 0, 1)
            .eatSeconds(1)
            .alwaysEdible()
    })
        .maxStackSize(16)
        .texture('kubejs:item/alcohol/bloody_mary')
        .useAnimation("drink")
        .component($ConfluenceMagicLib.MOD_RARITY, $ModRarity.MASTER)


    event.create('caribbean_rum').food(food => {
        food
            .eaten(ctx => {
                ctx.player.give("minecraft:glass_bottle")
            })
            .effect('kubejs:caribbean_rum', 1200 * 8, 0, 1)
            .eatSeconds(1)
            .alwaysEdible()
    })
        .maxStackSize(16)
        .texture('kubejs:item/alcohol/caribbean_rum')
        .useAnimation("drink")
        .component($ConfluenceMagicLib.MOD_RARITY, $ModRarity.MASTER)

    event.create('cinnamon_roll').food(food => {
        food
            .eaten(ctx => {
                ctx.player.give("minecraft:glass_bottle")
            })
            .effect('kubejs:cinnamon_roll', 1200 * 8, 0, 1)
            .eatSeconds(1)
            .alwaysEdible()
    })
        .maxStackSize(16)
        .texture('kubejs:item/alcohol/cinnamon_roll')
        .useAnimation("drink")
        .component($ConfluenceMagicLib.MOD_RARITY, $ModRarity.MASTER)
    event.create('everclear').food(food => {
        food
            .eaten(ctx => {
                ctx.player.give("minecraft:glass_bottle")
            })
            .effect('kubejs:everclear', 1200 * 8, 0, 1)
            .eatSeconds(1)
            .alwaysEdible()

    })
        .component($ConfluenceMagicLib.MOD_RARITY, $ModRarity.MASTER)
        .maxStackSize(16)
        .texture('kubejs:item/alcohol/everclear')
        .useAnimation("drink");
    event.create('evergreen_gin').food(food => {
        food
            .eaten(ctx => {
                ctx.player.give("minecraft:glass_bottle")
            })
            .effect('kubejs:evergreen_gin', 1200 * 8, 0, 1)
            .eatSeconds(1)
            .alwaysEdible()
    })
        .maxStackSize(16)
        .texture('kubejs:item/alcohol/evergreen_gin')
        .useAnimation("drink")
        .component($ConfluenceMagicLib.MOD_RARITY, $ModRarity.MASTER)
    event.create('fireball').food(food => {
        food
            .eaten(ctx => {
                ctx.player.give("minecraft:glass_bottle")
            })
            .effect('kubejs:fireball', 1200 * 8, 0, 1)
            .eatSeconds(1)
            .alwaysEdible()
    })
        .maxStackSize(16)
        .texture('kubejs:item/alcohol/fireball')
        .useAnimation("drink")
        .component($ConfluenceMagicLib.MOD_RARITY, $ModRarity.MASTER)
    event.create('grape_beer').food(food => {
        food
            .eaten(ctx => {
                ctx.player.give("minecraft:glass_bottle")
            })
            .effect('kubejs:grape_beer', 20 * 15, 0, 1)
            .eatSeconds(1)
            .alwaysEdible()
    })
        .maxStackSize(16)
        .texture('kubejs:item/alcohol/grape_beer')
        .useAnimation("drink")
        .component($ConfluenceMagicLib.MOD_RARITY, $ModRarity.MASTER)
    event.create('iceball').food(food => {
        food
            .eaten(ctx => {
                ctx.player.give("minecraft:glass_bottle")
            })
            .effect('kubejs:iceball', 1200 * 8, 0, 1)
            .eatSeconds(1)
            .alwaysEdible()
    })
        .maxStackSize(16)
        .texture('kubejs:item/alcohol/iceball')
        .useAnimation("drink")
        .component($ConfluenceMagicLib.MOD_RARITY, $ModRarity.MASTER)
    event.create('lightingball').food(food => {
        food
            .eaten(ctx => {
                ctx.player.give("minecraft:glass_bottle")
            })
            .effect('kubejs:lightingball', 1200 * 8, 0, 1)
            .eatSeconds(1)
            .alwaysEdible()
    })
        .maxStackSize(16)
        .texture('kubejs:item/alcohol/lightingball')
        .useAnimation("drink")
        .component($ConfluenceMagicLib.MOD_RARITY, $ModRarity.MASTER)
    event.create('margarita').food(food => {
        food
            .eaten(ctx => {
                ctx.player.give("minecraft:glass_bottle")
            })
            .effect('kubejs:margarita', 1200 * 8, 0, 1)
            .eatSeconds(1)
            .alwaysEdible()
    })
        .maxStackSize(16)
        .texture('kubejs:item/alcohol/margarita')
        .useAnimation("drink")
        .component($ConfluenceMagicLib.MOD_RARITY, $ModRarity.MASTER)
    event.create('moonshine').food(food => {
        food
            .eaten(ctx => {
                ctx.player.give("minecraft:glass_bottle")
            })
            .effect('kubejs:moonshine', 1200 * 8, 0, 1)
            .eatSeconds(1)
            .alwaysEdible()
    })
        .maxStackSize(16)
        .texture('kubejs:item/alcohol/moonshine')
        .useAnimation("drink")
        .component($ConfluenceMagicLib.MOD_RARITY, $ModRarity.MASTER)
    event.create('moscow_mule').food(food => {
        food
            .eaten(ctx => {
                ctx.player.give("minecraft:glass_bottle")
            })
            .effect('kubejs:moscow_mule', 1200 * 8, 0, 1)
            .eatSeconds(1)
            .alwaysEdible()
    })
        .maxStackSize(16)
        .texture('kubejs:item/alcohol/moscow_mule')
        .useAnimation("drink")
        .component($ConfluenceMagicLib.MOD_RARITY, $ModRarity.MASTER)
    event.create('old_fashioned').food(food => {
        food
            .eaten(ctx => {
                ctx.player.give("minecraft:glass_bottle")
            })
            .effect('kubejs:old_fashioned', 1200 * 6, 0, 1)
            .eatSeconds(1)
            .alwaysEdible()
    })
        .maxStackSize(16)
        .texture('kubejs:item/alcohol/old_fashioned')
        .useAnimation("drink")
        .component($ConfluenceMagicLib.MOD_RARITY, $ModRarity.MASTER)
    event.create('purple_haze').food(food => {
        food
            .eaten(ctx => {
                ctx.player.give("minecraft:glass_bottle")
            })
            .effect('kubejs:purple_haze', 1200 * 15, 0, 1)
            .eatSeconds(1)
            .alwaysEdible()
    })
        .maxStackSize(16)
        .texture('kubejs:item/alcohol/purple_haze')
        .useAnimation("drink")
        .component($ConfluenceMagicLib.MOD_RARITY, $ModRarity.MASTER)
    event.create('red_wine').food(food => {
        food
            .eaten(ctx => {
                ctx.player.give("minecraft:glass_bottle")
            })
            .effect('kubejs:red_wine', 20 * 15, 0, 1)
            .eatSeconds(1)
            .alwaysEdible()
    })
        .maxStackSize(16)
        .texture('kubejs:item/alcohol/red_wine')
        .useAnimation("drink")
        .component($ConfluenceMagicLib.MOD_RARITY, $ModRarity.MASTER)
    event.create('rum').food(food => {
        food
            .eaten(ctx => {
                ctx.player.give("minecraft:glass_bottle")
            })
            .effect('kubejs:rum', 1200 * 8, 0, 1)
            .eatSeconds(1)
            .alwaysEdible()
    })
        .maxStackSize(16)
        .texture('kubejs:item/alcohol/rum')
        .useAnimation("drink")
        .component($ConfluenceMagicLib.MOD_RARITY, $ModRarity.MASTER)
    event.create('screwdriver').food(food => {
        food
            .eaten(ctx => {
                ctx.player.give("minecraft:glass_bottle")
            })
            .effect('kubejs:screwdriver', 1200 * 8, 0, 1)
            .eatSeconds(1)
            .alwaysEdible()
    })
        .maxStackSize(16)
        .texture('kubejs:item/alcohol/screwdriver')
        .useAnimation("drink")
        .component($ConfluenceMagicLib.MOD_RARITY, $ModRarity.MASTER)
    event.create('star_beam_rye').food(food => {
        food
            .eaten(ctx => {
                ctx.player.give("minecraft:glass_bottle")
            })
            .effect('kubejs:star_beam_rye', 1200 * 8, 0, 1)
            .eatSeconds(1)
            .alwaysEdible()
    })
        .maxStackSize(16)
        .texture('kubejs:item/alcohol/star_beam_rye')
        .useAnimation("drink")
        .component($ConfluenceMagicLib.MOD_RARITY, $ModRarity.MASTER)
    event.create('tequila').food(food => {
        food
            .eaten(ctx => {
                ctx.player.give("minecraft:glass_bottle")
            })
            .effect('kubejs:tequila', 1200 * 8, 0, 1)
            .eatSeconds(1)
            .alwaysEdible()
    })
        .maxStackSize(16)
        .texture('kubejs:item/alcohol/tequila')
        .useAnimation("drink")
        .component($ConfluenceMagicLib.MOD_RARITY, $ModRarity.MASTER)
    event.create('tequila_sunrise').food(food => {
        food
            .eaten(ctx => {
                ctx.player.give("minecraft:glass_bottle")
            })
            .effect('kubejs:tequila_sunrise', 1200 * 8, 0, 1)
            .eatSeconds(1)
            .alwaysEdible()
    })
        .maxStackSize(16)
        .texture('kubejs:item/alcohol/tequila_sunrise')
        .useAnimation("drink")
        .component($ConfluenceMagicLib.MOD_RARITY, $ModRarity.MASTER)
    event.create('vodka').food(food => {
        food
            .eaten(ctx => {
                ctx.player.give("minecraft:glass_bottle")
            })
            .effect('kubejs:vodka', 1200 * 8, 0, 1)
            .eatSeconds(1)
            .alwaysEdible()
    })
        .maxStackSize(16)
        .texture('kubejs:item/alcohol/vodka')
        .useAnimation("drink")
        .component($ConfluenceMagicLib.MOD_RARITY, $ModRarity.MASTER)
    event.create('whiskey').food(food => {
        food
            .eaten(ctx => {
                ctx.player.give("minecraft:glass_bottle")
            })
            .effect('kubejs:whiskey', 1200 * 8, 0, 1)
            .eatSeconds(1)
            .alwaysEdible()
    })
        .maxStackSize(16)
        .texture('kubejs:item/alcohol/whiskey')
        .useAnimation("drink")
        .component($ConfluenceMagicLib.MOD_RARITY, $ModRarity.MASTER)
    event.create('white_wine').food(food => {
        food
            .eaten(ctx => {
                ctx.player.give("minecraft:glass_bottle")
            })
            .effect('kubejs:white_wine', 1200 * 8, 0, 1)
            .eatSeconds(1)
            .alwaysEdible()
    })
        .maxStackSize(16)
        .texture('kubejs:item/alcohol/white_wine')
        .useAnimation("drink")
        .component($ConfluenceMagicLib.MOD_RARITY, $ModRarity.MASTER)
    //potion
    event.create('omega_healing_potion').food(food => {
        food
            .eaten(ctx => {
                ctx.player.give("minecraft:glass_bottle")
            })
            .eatSeconds(1)
            .alwaysEdible()
    })
        .maxStackSize(16)
        .texture('kubejs:item/potion/omega_healing_potion')
        .useAnimation("drink")
        .component($ConfluenceMagicLib.MOD_RARITY, $ModRarity.MASTER)
    event.create('supreme_healing_potion').food(food => {
        food
            .eaten(ctx => {
                ctx.player.give("minecraft:glass_bottle")
            })
            .eatSeconds(1)
            .alwaysEdible()
    })
        .maxStackSize(16)
        .texture('kubejs:item/potion/supreme_healing_potion')
        .useAnimation("drink")
        .component($ConfluenceMagicLib.MOD_RARITY, $ModRarity.MASTER)
    event.create('supreme_mana_potion').food(food => {
        food
            .eaten(ctx => {
                ctx.player.give("minecraft:glass_bottle")
            })
            .eatSeconds(1)
            .alwaysEdible()
    })
        .maxStackSize(16)
        .texture('kubejs:item/potion/supreme_mana_potion')
        .useAnimation("drink")
        .component($ConfluenceMagicLib.MOD_RARITY, $ModRarity.MASTER)
    event.create('hangover_tea').food(food => {
        food.eaten(ctx => {
            ctx.player.give("minecraft:glass_bottle")
        })
            .eatSeconds(1)
            .alwaysEdible()
    })
        .maxStackSize(16)
        .texture('kubejs:item/potion/hangover_tea')
        .useAnimation("drink")
        .component($ConfluenceMagicLib.MOD_RARITY, $ModRarity.MASTER)

    event.create('golden_apple')
        .food(food => {
            food.nutrition(4)
                .saturation(1.5)
                .eatSeconds(1.6)
                .effect("minecraft:absorption", 150, 3, 1)
                .effect("minecraft:regeneration", 150, 4, 1)
                .effect("minecraft:fire_resistance", 6000, 0, 1)
                .effect("minecraft:resistance", 6000, 0, 1)
                .alwaysEdible()
        })
        .component($ConfluenceMagicLib.MOD_RARITY, $ModRarity.EPIC)
        .texture('kubejs:item/food/golden_apple')
        .glow(true)
})

ServerEvents.recipes(event => {
    //唉，自己写的mod还得自己remove掉配方重写，怎么汇逝
    [
        'reveriefoundry:heavy_helmet_blueprint',
        'reveriefoundry:heavy_helmet_template',
        'reveriefoundry:heavy_chestplate_blueprint',
        'reveriefoundry:heavy_chestplate_template',
        'reveriefoundry:heavy_leggings_blueprint',
        'reveriefoundry:heavy_leggings_template',
        'reveriefoundry:heavy_boots_blueprint',
        'reveriefoundry:heavy_boots_template',
        'reveriefoundry:robe_helmet_blueprint',
        'reveriefoundry:robe_helmet_template',
        'reveriefoundry:robe_chestplate_blueprint',
        'reveriefoundry:robe_chestplate_template',
        'reveriefoundry:robe_leggings_blueprint',
        'reveriefoundry:robe_leggings_template',
        'reveriefoundry:robe_boots_blueprint',
        'reveriefoundry:robe_boots_template'
    ].forEach(item => event.remove({ output: item }))


    let singleItems = [
        'iceandfire:ambrosia',
        'productivemetalworks:plate_cast',
        'silentgear:super_mixer',
        'silentgear:crude_mixer',
        'minecraft:lodestone',
        'irons_spellbooks:iron_spell_book',
        'irons_spellbooks:copper_spell_book',
        'irons_spellbooks:ice_spell_book',
        'irons_spellbooks:cursed_doll_spell_book',
        'irons_spellbooks:netherite_spell_book',
        'irons_spellbooks:gold_spell_book',
        'irons_spellbooks:diamond_spell_book',
        'irons_spellbooks:dragonskin_spell_book',
        'irons_spellbooks:druidic_spell_book',
        'irons_spellbooks:inscription_table',
        'apothic_enchanting:occult_ender_lead',
        'endrem:exotic_eye',
        'silentgear:metal_press',
        'darkdoppelganger:shadow_orb',
        'terra_curio:mechanical_glove',
        'terra_curio:sniper_scope',
        'silentgems:garnet_teleporter',
        'hazennstuff:scroll_sheath',
        'productivemetalworks:gear_cast'
    ]

    singleItems.forEach(item => event.remove({ output: item }))

    event.remove({ output: '#alltheores:ore_hammers' })
    event.remove({ input: '#alltheores:ore_hammers' })
    event.remove({ id: 'hazennstuff:crafting/materials/deus_essence_from_nether_star' })
    event.remove({ mod: 'productivelib' })
    event.smelting('kubejs:cooked_manflesh', 'kubejs:raw_manflesh').xp(0.1).cookingTime(20 * 8)
    event.smoking('kubejs:cooked_manflesh', 'kubejs:raw_manflesh').xp(0.1).cookingTime(20 * 8)
    event.campfireCooking('kubejs:cooked_manflesh', 'kubejs:raw_manflesh').xp(0.1).cookingTime(20 * 8)
    event.smelting('kubejs:xeproda_ingot', 'eternal_starlight:flowglaze').xp(0.1).cookingTime(20 * 10)
    event.blasting('kubejs:xeproda_ingot', 'eternal_starlight:flowglaze').xp(0.1).cookingTime(20 * 6)
    event.replaceInput(
        { input: 'create:dough' },
        'create:dough',
        '#c:dough'
    )
    event.replaceInput(
        { input: 'farmersdelight:wheat_dough' },
        'farmersdelight:wheat_dough',
        '#c:dough'
    )

    event.replaceInput(
        { input: 'silentgear:bort' },
        'silentgear:bort',
        '#kubejs:bort'
    )

    event.replaceInput(
        { input: 'terra_curio:avenger_emblem' },
        'terra_curio:avenger_emblem',
        'kubejs:avenger_emblem'
    )

    event.replaceInput(
        { input: 'terra_curio:destroyer_emblem' },
        'terra_curio:destroyer_emblem',
        'kubejs:destroyer_emblem'
    )

    event.replaceInput(
        { input: 'terra_curio:sorcerer_emblem' },
        'terra_curio:sorcerer_emblem',
        'kubejs:sorcerer_emblem'
    )


})
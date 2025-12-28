ServerEvents.recipes(event => {
    event.remove({ output: '#alltheores:ore_hammers' })
    event.remove({ output: 'minecraft:lodestone' })
    event.remove({ output: 'irons_spellbooks:iron_spell_book' })
    event.remove({ output: 'irons_spellbooks:copper_spell_book' })
    event.remove({ output: 'irons_spellbooks:ice_spell_book' })
    event.remove({ output: 'irons_spellbooks:cursed_doll_spell_book' })
    event.remove({ output: 'irons_spellbooks:netherite_spell_book' })
    event.remove({ output: 'irons_spellbooks:gold_spell_book' })
    event.remove({ output: 'irons_spellbooks:diamond_spell_book' })
    event.remove({ output: 'irons_spellbooks:dragonskin_spell_book' })
    event.remove({ output: 'irons_spellbooks:druidic_spell_book' })
    event.remove({ output: 'irons_spellbooks:inscription_table' })
    event.remove({ output: 'endrem:exotic_eye' })
    event.remove({ input: '#alltheores:ore_hammers' })
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

})
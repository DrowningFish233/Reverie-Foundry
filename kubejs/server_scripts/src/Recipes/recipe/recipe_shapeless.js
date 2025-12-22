ServerEvents.recipes(event => {
    event.shapeless(
        Item.of('kubejs:magic_fluorite', 1),
        [
            'hazennstuff:deus_essence',
            'alltheores:fluorite'
        ]
    )
    event.shapeless(
        Item.of('kubejs:atalphaite', 1),
        [
            'eternal_starlight:starcore',
            '#iceandfire:dragon_bloods'
        ]
    )
    event.shapeless(
        Item.of('kubejs:amber', 1),
        [
            'malum:revealed_runewood_log',
            'minecraft:bone_meal'
        ]
    )
    event.shapeless(
        Item.of('minecraft:soul_sand', 2),
        [
            '2x #minecraft:sand',
            'iceandfire:ectoplasm'
        ]
    )
    event.shapeless(
        Item.of('minecraft:soul_soil', 2),
        [
            '2x #minecraft:dirt',
            'iceandfire:ectoplasm'
        ]
    )
    event.shapeless(
        Item.of('kubejs:raw_netherite_ingot', 1),
        [
            '2x minecraft:netherite_scrap',
            '4x minecraft:gold_ingot'
        ]
    )
    event.shapeless(
        Item.of('irons_restrictions:fragment', 1),
        [
            '4x irons_spellbooks:arcane_essence',
            'iceandfire:manuscript'
        ]
    )

})

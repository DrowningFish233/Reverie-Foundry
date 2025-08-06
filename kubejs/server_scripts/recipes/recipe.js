ServerEvents.recipes(event => {
    event.shapeless(
        Item.of('kubejs:magic_fluorite', 1),
        [
            'hazennstuff:deus_essence',
            'alltheores:fluorite'
        ]
    )
    event.shapeless(
        Item.of('silentgear:bronze_ingot', 1),
        [
            'alltheores:bronze_ingot',
            'alltheores:fluorite_dust'
        ]
    )
    event.shapeless(
        Item.of('alltheores:bronze_ingot', 1),
        [
            'silentgear:bronze_ingot',
            'alltheores:fluorite_dust'
        ]
    )
    event.remove({ mod: 'productivelib' })
    event.shapeless(
        Item.of('hazennstuff:deus_essence', 1),
        [
            'twilightforest:quest_ram_trophy',
        ]
    )
    event.shapeless(
        Item.of('hazennstuff:deus_essence', 1),
        [
            'twilightforest:alpha_yeti_trophy'
        ]
    )
    event.shapeless(
        Item.of('hazennstuff:deus_essence', 3),
        [
            'twilightforest:ur_ghast_trophy'
        ]
    )
    event.shapeless(
        Item.of('hazennstuff:deus_essence', 1),
        [
            'twilightforest:knight_phantom_trophy'
        ]
    )
    event.shapeless(
        Item.of('hazennstuff:deus_essence', 2),
        [
            'twilightforest:hydra_trophy'
        ]
    )
    event.shapeless(
        Item.of('hazennstuff:deus_essence', 1),
        [
            'twilightforest:minoshroom_trophy'
        ]
    )
    event.shapeless(
        Item.of('hazennstuff:deus_essence', 2),
        [
            'twilightforest:lich_trophy'
        ]
    )
    event.shapeless(
        Item.of('hazennstuff:deus_essence', 1),
        [
            'twilightforest:naga_trophy'
        ]
    )
    event.shapeless(
        Item.of('hazennstuff:deus_essence', 2),
        [
            'twilightforest:snow_queen_trophy'
        ]
    )
})

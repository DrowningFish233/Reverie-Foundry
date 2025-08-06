ServerEvents.recipes(event => {
    event.remove({ output: '#alltheores:ore_hammers' })
    event.remove({ output: 'minecraft:lodestone' })
    event.shaped(
        Item.of('minecraft:lodestone', 1),
        [
            'CCC',
            'CAC',
            'CCC'
        ],
        {
            A: 'irons_spellbooks:wayward_compass',
            C: 'minecraft:chiseled_stone_bricks'
        }
    )
    event.remove({ input: '#alltheores:ore_hammers' })
    event.shaped(
        Item.of('irons_spellbooks:speed_boots', 1),
        [
            'CBC',
            'BAB',
            'CBC'
        ],
        {
            A: 'terra_curio:hermes_boots',
            B: 'irons_spellbooks:mithril_ingot',
            C: 'irons_spellbooks:magic_cloth'
        }
    )
    event.shaped(
        Item.of('unionlib:golden_ring', 1),
        [
            'AAA',
            'A A',
            'AAA'
        ],
        {
            A: 'alltheores:electrum_nugget'
        }
    )
    event.shaped(
        Item.of('irons_spellbooks:lurker_ring', 1),
        [
            ' A ',
            ' B ',
            '   '
        ],
        {
            A: 'minecraft:dragon_breath',
            B: 'unionlib:golden_ring'
        }
    )
    event.shaped(
        Item.of('irons_spellbooks:lurker_ring', 1),
        [
            'AAA',
            'ABA',
            'AAA'
        ],
        {
            A: 'minecraft:fermented_spider_eye',
            B: 'unionlib:golden_ring'
        }
    )
    event.shaped(
        Item.of('irons_spellbooks:autoloader_crossbow', 1),
        [
            'ACA',
            'ABA',
            'AAA'
        ],
        {
            A: 'irons_spellbooks:arcane_essence',
            B: 'minecraft:crossbow',
            C: 'irons_spellbooks:mithril_scrap'
        }
    )
    event.shaped(
        Item.of('irons_spellbooks:mithril_weave', 1),
        [
            'AAA',
            'ABA',
            'AAA'
        ],
        {
            A: 'irons_spellbooks:magic_cloth',
            B: 'irons_spellbooks:mithril_ingot'
        }
    )
    event.shaped(
        Item.of('irons_spellbooks:misery', 1),
        [
            ' D ',
            ' C ',
            'ABA'
        ],
        {
            A: 'minecraft:wither_rose',
            B: 'minecraft:golden_sword',
            C: 'irons_spellbooks:mithril_scrap',
            D: 'minecraft:wither_skeleton_skull'
        }
    )
    event.shaped(
        Item.of('irons_spellbooks:claymore', 1),
        [
            'DAD',
            'DAD',
            'ABA'
        ],
        {
            A: 'irons_spellbooks:mithril_scrap',
            B: 'minecraft:netherite_sword',
            D: 'irons_spellbooks:arcane_essence'
        }
    )
    event.shaped(
        Item.of('kubejs:meat_ingots', 1),
        [
            'AAA',
            'BBB',
            'AAA'
        ],
        {
            A: 'kubejs:meat',
            B: 'biomesoplenty:flesh'
        }
    )
    event.shaped(
        Item.of('kubejs:meat', 1),
        [
            'AAA',
            'AAA',
            'AAA'
        ],
        {
            A: '#c:meat/raw'
        }
    )
    event.shaped(
        Item.of('kubejs:rhexis_ingot', 1),
        [
            'AAA',
            'BAB',
            'AAA'
        ],
        {
            A: 'kubejs:meat_ingots',
            B: 'silentgear:crimson_steel_ingot',
        }
    )
    event.shaped(
        Item.of('minecraft:suspicious_gravel', 1),
        [
            'AAA',
            'ABA',
            'AAA'
        ],
        {
            A: 'minecraft:gravel',
            B: 'alltheores:fluorite_dust'
        }
    )
    event.shaped(
        Item.of('minecraft:suspicious_sand', 1),
        [
            'AAA',
            'ABA',
            'AAA'
        ],
        {
            A: 'minecraft:sand',
            B: 'alltheores:fluorite_dust'
        }
    )
    event.shaped(
        Item.of('kubejs:soul', 1),
        [
            ' A ',
            'CBC',
            ' A '
        ],
        {
            A: 'malum:refined_soulstone',
            B: 'irons_spellbooks:blank_rune',
            C: 'malum:stripped_soulwood_log'
        }
    )
    event.shaped(
        Item.of('kubejs:the_error', 1),
        [
            'AAA',
            'BBB',
            'CCC'
        ],
        {
            A: 'biomesoplenty:null_end_stone',
            B: 'biomesoplenty:null_block',
            C: 'biomesoplenty:unmapped_end_stone'
        }
    ),
        event.shaped(
            Item.of('refinedstorage:creative_controller', 1),
            [
                'EBE',
                'CAC',
                'CDC'
            ],
            {
                A: 'refinedstorage:controller',
                B: 'cataclysm:mech_eye',
                C: 'silentgear:nether_star_fragment',
                D: 'kubejs:acril_ingot',
                E: 'cataclysm:witherite_ingot'
            }
        )

    event.smelting('kubejs:cooked_manflesh', 'kubejs:raw_manflesh').xp(0.1).cookingTime(20 * 10)
    event.smoking('kubejs:cooked_manflesh', 'kubejs:raw_manflesh').xp(0.1).cookingTime(20 * 10)
    event.campfireCooking('kubejs:cooked_manflesh', 'kubejs:raw_manflesh').xp(0.1).cookingTime(20 * 10)
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
    event.recipes.kubejs.shapeless(
        '5x iceandfire:ectoplasm',
        [
            'kubejs:naga_soul_scale',
            'kubejs:soul'
        ]
    ).keepIngredient('kubejs:soul')


})

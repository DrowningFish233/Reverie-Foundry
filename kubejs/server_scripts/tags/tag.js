ServerEvents.tags('item', event => {
    event.add('quad:fuel/hanging_sign', 'kubejs:coal_dust')
    event.add('quad:immune/fire', 'kubejs:raw_netherite_ingot')
    event.add('quad:immune/fire', 'kubejs:scrap_clump')
    event.add('quad:immune/fire', 'kubejs:netherite_wire')
    event.add('quad:immune/fire', 'kubejs:netherite_plate')
    event.add('quad:immune/fire', 'kubejs:netherite_rod')
    event.add('kubejs:dream_focus', 'kubejs:magic_fluorite')
    event.remove('c:ingots/silver', 'silentgems:silver_ingot')
    event.remove('c:ingots/brass', 'alltheores:brass_ingot')

    event.remove('c:nuggets/brass', 'alltheores:brass_nugget')
    event.remove('c:nuggets', 'alltheores:brass_nugget')

    event.add('malum:scythe', 'silentgear:sickle')
    event.add('malum:soul_shatter_capable_weapons', 'silentgear:sickle')

    event.add('malum:enchantable/animated', 'silentgear:sickle')
    event.add('malum:enchantable/haunted', 'silentgear:sickle')
    event.add('malum:magic_capbale_weapon', 'silentgear:sickle')
    event.add('malum:enchantable/ascension', 'silentgear:sickle')
    event.add('malum:enchantable/durability', 'silentgear:sickle')
    event.add('malum:enchantable/rebound', 'silentgear:sickle')
    event.add('malum:soulhunters_treasure', 'silentgear:sickle')
    event.add('c:gems/aquamarine', 'kubejs:aquamarine')
    event.add('c:gems/tanzanite', 'kubejs:tanzanite')
    event.add('c:gems/rose_quartz', 'create:rose_quartz')
    event.add('c:gems/pearl', 'kubejs:pearl')
    event.add('c:gems/opal', 'kubejs:opal')
    event.add('c:gems/ruby', 'kubejs:ruby')
    event.add('c:gems/topaz', 'kubejs:topaz')
    event.add('c:gems/peridot', 'kubejs:peridot')

    event.add('c:plates', 'kubejs:netherite_plate')
    event.add('c:plates/netherite', 'kubejs:netherite_plate')

    event.add('c:dusts', 'kubejs:netherite_dust')
    event.add('c:dusts/netherite', 'kubejs:netherite_dust')

    event.add('c:rods', 'kubejs:netherite_rod')
    event.add('c:rods/netherite', 'kubejs:netherite_rod')

    event.add('minecraft:axes', 'kubejs:crowbar')
    event.add('minecraft:pickaxes', 'kubejs:crowbar')
    event.add('gobber2:tools', 'kubejs:crowbar')
    event.add('gobber2:axes', 'kubejs:crowbar')
    event.add('gobber2:pickaxes', 'kubejs:crowbar')


})
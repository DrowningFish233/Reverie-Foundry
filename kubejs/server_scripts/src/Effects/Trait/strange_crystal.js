/**
 * 击碎灵魂
 */
EntityEvents.afterHurt(event => {
    let actual = event.source.actual
    if (!actual) return
    if (!event.entity.isLiving() || !actual.isLiving() || !actual.isPlayer()) return
    if (!fu_hasTraitAnywhere(event.source.actual, "kubejs:strange_crystal")) return

    const BLACKLIST = [
        "cataclysm:ignis",
        "cataclysm:the_leviathan",
        "cataclysm:ancient_remnant",
        "cataclysm:maledictus",
        "cataclysm:scylla",
        "cataclysm:the_harbinger",
        "cataclysm:ender_guardian",
        "cataclysm:netherite_monstrosity",
        "minecraft:wither",
        "minecraft:ender_dragon",
        "bosses_of_mass_destruction:gauntlet",
        "bosses_of_mass_destruction:lich",
        "bosses_of_mass_destruction:obsidilith",
        "bosses_of_mass_destruction:void_blossom",
        "irons_spellbooks:fire_boss",
        "terra_entity:dungeon_guardian",
        "terra_entity:skeletron",
        "terra_entity:king_slime",
        "terra_entity:eye_of_cthulhu",
        "terra_entity:brain_of_cthulhu",
        "terra_entity:queen_bee",
        "irons_spellbooks:dead_king",
        "darkdoppelganger:dark_doppelganger",
        "powerful_dummy:test_dummy",
        "powerful_dummy:test_dummy_water",
        "powerful_dummy:test_dummy_arthropod",
        "powerful_dummy:test_dummy_illager",
        "powerful_dummy:test_dummy_undead",
    ]

    const entityId = event.entity.getType()
    if (BLACKLIST.includes(entityId.toString())) {
        return
    }

    let COOLDOWN_KEY = "strange_crystal_COOLDOWN_KEY"
    if ($CooldownManager.hasCooldown(event.source.actual, COOLDOWN_KEY)) return

    const trait_level = fu_getHighestTraitLevelAnywhere(event.source.actual, "kubejs:strange_crystal")
    const dropChance = trait_level * 0.1

    if (Math.random() < dropChance) {
        fu_dropSpirits(event.entity, event.source.actual)
        $CooldownManager.setCooldown(event.source.actual, COOLDOWN_KEY, 60)
    }
})
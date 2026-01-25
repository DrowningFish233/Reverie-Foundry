// priority: 100
/**
 * 矿石阶段限制配置
 */
/**
 * 矿石阶段限制配置
 */
ReverieFoundry
    .setDebug(false)
    .registerStage(
        new OreStageSystem("first_kill_dead_king")
            .requireKill("irons_spellbooks:dead_king", 1)
            .hideOre('gobber2:gobber2_globette', 'minecraft:cobbled_deepslate')
            .hideOre('hazennstuff:raw_zenalite', 'minecraft:cobblestone')
            .hideOre('hazennstuff:runestone_fragments', 'minecraft:cobblestone')
            .hideOre('hazennstuff:chlorophyte_chunk', 'minecraft:cobblestone')
            .hideOre('hazennstuff:dreadstone', 'minecraft:cobbled_deepslate')
            .hideOre('hazennstuff:solar_core', 'minecraft:netherrack')
    )
    .registerStage(
        new OreStageSystem("terra_entity:skeletron")
            .requireKill("terra_entity:skeletron", 1)
            .hideOre('gobber2:gobber2_globette_nether', 'minecraft:netherrack')
    )
    .registerStage(
        new OreStageSystem("first_kill_fire_boss")
            .requireKill("irons_spellbooks:fire_boss", 1)
            .hideOre('gobber2:gobber2_globette_end', 'minecraft:end_stone')
    );

/**
 * 自动生成寂静装备材料
 */
/** 材料配置对象 */
/** ↓提供补全用代码，不可删除 */
/** @type {Object.<string, {id: string, config: (mat: GenerateSilentGearMaterial) => void}>} */
const MaterialConfigs = {
    rope: {
        id: "kubejs:rope",
        config: (mat) => {
            mat.setCategories(["other"])
                .setIngredientItem("farmersdelight:rope")
                .setDisplayColor("#FF5e3819")
                .addBindingPart({
                    durability: 32.0,
                },
                    [
                        mat.createTrait("kubejs:monkey", 1),
                    ]
                )
                .addCordPart({
                    durability: 32.0,
                },
                    [
                        mat.createTrait("kubejs:monkey", 1),
                    ]
                )
                .addMainPart({
                    durability: 32.0,
                    harvest_tier: mat.setHarvestTier("wood", "1", "silentgear:incorrect_for_wood_tools")
                },
                    [
                        mat.createTrait("kubejs:monkey", 1),
                    ]
                );
        }
    }
    /*
    //简单的示例
    zinc_ingot: {
        id: "kubejs:zinc_ingot",
        config: (mat) => {
            mat.setCategories(["metal", "intermediate"])
                .setIngredientItem("kubejs:zinc_ingot")
                .setDisplayColor("#bed9d0")
                .setName("material.silentgear.kubejs:zinc_ingot")
                .addMainPart({
                    armor: 8.0,
                    armor_toughness: 10,
                    "armor/boots": 1.0,
                    "armor/chestplate": 3.0,
                    "armor/helmet": 1.0,
                    "armor/leggings": 3.0,
                    armor_durability: 8.0,
                    attack_damage: 1.0,
                    attack_speed: 0.0,
                    "attack_speed/axe": -0.1,
                    "attack_speed/hoe": 0.0,
                    charging_value: 1.5,
                    draw_speed: 0.0,
                    durability: 162.0,
                    enchantment_value: 20.0,
                    harvest_speed: 3.0,
                    harvest_tier: mat.setHarvestTier("stone/石", "1", "silentgear:incorrect_for_stone_tools"),
                    magic_armor: 6.0,
                    magic_damage: 3.0,
                    ranged_damage: 0.0,
                    rarity: 140.0
                },
                    [
                        mat.createTrait("kubejs:dropped_experience", 2),
                        mat.createTrait("silentgear:malleable", 1),
                        mat.createTrait("silentgear:soft", 2)
                    ]
                );
        }
    }
    */
};




/**
 * 生成寂静装备特性
 */
/** 特性对象 */
/** ↓提供补全用代码，不可删除 */
/** @type {Object.<string, {id: string, config: (trait: GenerateSilentGearTrait) => void}>} */
const TraitConfigs = {
    /*
    gobber: {
        id: "kubejs:gobber",
        config: (trait) => {
            trait.setMaxLevel(1)
                .addConditions([
                    trait.createOrCondition([
                        trait.createGearTypeCondition("silentgear:armor"),
                        trait.createGearTypeCondition("silentgear:tool"),
                        trait.createGearTypeCondition("silentgear:curio")
                    ])
                ])
                .addAttribute([
                    trait.createAttributeValue(
                        "minecraft:player.entity_interaction_range",
                        "add_value",
                        [1.0]
                    ),
                    trait.createAttributeValue(
                        "minecraft:player.block_interaction_range",
                        "add_value",
                        [1.0]
                    )
                ])
        }
    },
*/
    high_health: {
        id: "kubejs:high_health",
        config: (trait) => {
            trait.setMaxLevel(5)
                .addConditions([
                    trait.createOrCondition([
                        trait.createGearTypeCondition("silentgear:armor"),
                        trait.createGearTypeCondition("silentgear:tool"),
                        trait.createGearTypeCondition("silentgear:curio")
                    ])
                ])
            /*
            .addAttribute([
                trait.createAttributeValue(
                    "irons_spellbooks:lightning_spell_power",
                    "add_multiplied_base",
                    [0.1]
                )
            ])
            */
        }
    }
}
/*
plague: {
    id: "kubejs:dragonskill",
    config: (trait) => {
        trait.setMaxLevel(3)
            .addConditions([
                trait.createOrCondition([
                    trait.createGearTypeCondition("silentgear:armor"),
                    trait.createGearTypeCondition("silentgear:tool"),
                    trait.createGearTypeCondition("silentgear:curio")
                ])
            ])
            .addExtraDamage(
                "kubejs:dragons",
                "tagged",
                10
            )
    }
}
*/

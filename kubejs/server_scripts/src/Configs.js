// priority: 100
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
        new OreStageSystem("first_kill_skeletron")
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
/** ↓提供补全用代码，不可删除 */
/** @type {Object.<string, {id: string, config: (mat: GenerateSilentGearMaterial) => void}>} */
const MaterialConfigs = {
    enabled: true, // 设为false可禁用生成
    auto_ingot: {
        id: "kubejs:dreadsteel_ingot",
        config: (mat) => {
            mat.setCategories(["metal", "intermediate"])
                .setIngredientItem("hazennstuff:dreadsteel_ingot")
                .setDisplayColor("#911111")
                .setName("material.silentgear.kubejs:dreadsteel_ingot")
                .addMain((/** @type {PartBuilder} */part) => {
                    part.armor(28.0)
                        .armorToughness(8)
                        .armorHelmet(5.0)
                        .armorChestplate(10.0)
                        .armorLeggings(8.0)
                        .armorBoots(5.0)
                        .armorDurability(100.0)
                        .attackDamage(10.0)
                        .attackSpeed(2.3)
                        .chargingValue(1.2)
                        .drawSpeed(0.0)
                        .durability(800.0)
                        .rangedDamage(0.0)
                        .projectileAccuracy(0)
                        .projectileSpeed(0)
                        .enchantmentValue(7.0)
                        .harvestSpeed(4.0)
                        .harvestTier("diamond/钻石", "3", "silentgear:incorrect_for_diamond_tools")
                        .spellPower(0.0)
                        .spellResist(0.1)
                        .manaRegen(0.0)
                        .healingReceived(0.15)
                        .rarity(120.0)
                        .geasLimit(1)
                        .addTrait("kubejs:dreadsteel_ingot", 2)
                        .addTrait("kubejs:strip", 2)
                })
        }
    }
};



/**
 * 生成寂静装备特性
 */
/** 特性对象 */
/** ↓提供补全用代码，不可删除 */
/** @type {Object.<string, {id: string, config: (trait: GenerateSilentGearTrait) => void}>} */
const TraitConfigs = {
    enabled: true, // 设为false可禁用生成
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
    auto_trait: {
        id: "kubejs:dreadsteel_ingot",
        config: (trait) => {
            trait.setMaxLevel(3)
                .addConditions([])
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

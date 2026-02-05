// priority: 100
/**
 * 自动生成寂静装备材料
 */
/** ↓提供补全用代码，不可删除 */
/** @type {Object.<string, {id: string, config: (mat: GenerateSilentGearMaterial) => void}>} */
const MaterialConfigs = {
    enabled: true, // 设为false可禁用生成
    auto_ingot: {
        id: "kubejs:hallowed_ingot",
        config: (mat) => {
            mat.setCategories(["medium", "metal"])
                .setIngredientItem("hazennstuff:hallowed_ingot")
                .setDisplayColor("#f5c730")
                .setName("material.silentgear.kubejs:hallowed_ingot")
                .addMain((/** @type {PartBuilder} */part) => {
                    part.armor(28.0)
                        .armorHelmet(5.0)
                        .armorChestplate(10.0)
                        .armorLeggings(8.0)
                        .armorBoots(5.0)
                        .armorToughness(8)
                        .armorDurability(75.0)
                        .attackDamage(8)
                        .attackSpeed(1.1)
                        .magicArmor(10)
                        .spellResist(0.1)
                        .durability(0.0)
                        .enchantmentValue(20.0)
                        .healingReceived(0.05)
                        .rarity(110.0)
                        .addTrait("kubejs:hallowed_ingot", 1)
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

    auto_trait: {
        id: "kubejs:hallowed_ingot",
        config: (trait) => {
            trait.setMaxLevel(1)
                .addConditions([])
        }
    }
}
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

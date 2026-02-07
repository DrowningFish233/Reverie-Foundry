// priority: 100
/**
 * 自动生成寂静装备材料
 */
/** ↓提供补全用代码，不可删除 */
/** @type {Object.<string, {id: string, config: (mat: GenerateSilentGearMaterial) => void}>} */
const MaterialConfigs = {
    enabled: true, // 设为false可禁用生成
    auto_ingot: {
        id: "kubejs:shivering_gel",
        config: (mat) => {
            mat.setCategories(["organic", "other"])
                .setIngredientItem("eternal_starlight:shivering_gel")
                .setDisplayColor("#2e2470")
                .setName("material.silentgear.kubejs:shivering_gel")
                .addCoating((/** @type {PartBuilder} */part) => {
                    part.durabilityWithOperation("MULTIPLY_BASE", 0.2)
                        .magicArmorWithOperation("MULTIPLY_BASE", -0.05)
                        .spellResistWithOperation("MULTIPLY_BASE", -0.05)
                        .rarityWithOperation("ADD", 12)
                        .addTrait("kubejs:shivering_gel", 1)
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
        id: "kubejs:shivering_gel",
        config: (trait) => {
            trait.setMaxLevel(1)
                .addConditions([])
                .addCancelEffects([
                    "kubejs:tremor"
                ])

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

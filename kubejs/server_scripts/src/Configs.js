// priority: 100
/**
 * 自动生成寂静装备材料
 */
/** ↓提供补全用代码，不可删除 */
/** @type {Object.<string, {id: string, config: (mat: GenerateSilentGearMaterial) => void}>} */
const MaterialConfigs = {
    enabled: true, // 设为false可禁用生成
    auto_ingot1: {
        id: "kubejs:strange_crystal",
        config: (mat) => {
            mat.setCategories(["fabric", "endgame"])
                .setIngredientItem("malum:strange_crystal")
                .setDisplayColor("#f8ace2")
                .setName("material.silentgear.kubejs:strange_crystal")
                .addSetting((/** @type {PartBuilder} */part) => {
                    part.armorWithOperation("ADD", 1)
                        .rarityWithOperation("ADD", 30)
                        .addTrait("kubejs:strange_crystal", 3)
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
        id: "kubejs:strange_crystal",
        config: (trait) => {
            trait.setMaxLevel(5)
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

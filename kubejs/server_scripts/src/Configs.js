// priority: 100
/**
 * 自动生成寂静装备材料
 */
/** ↓提供补全用代码，不可删除 */
/** @type {Object.<string, {id: string, config: (mat: GenerateSilentGearMaterial) => void}>} */
const MaterialConfigs = {
    enabled: true, // 设为false可禁用生成
    auto_ingot: {
        id: "kubejs:tooth_of_hunger",
        config: (mat) => {
            mat.setCategories(["advanced", "organic"])
                .setIngredientItem("eternal_starlight:tooth_of_hunger")
                .setDisplayColor("#38292d")
                .setName("material.silentgear.kubejs:tooth_of_hunger")
                .addTip((/** @type {PartBuilder} */part) => {
                    part
                        .addTrait("kubejs:tooth_of_hunger", 1)
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
        id: "kubejs:lightning_dragon_blood",
        config: (trait) => {
            trait.setMaxLevel(3)
                .addConditions([])
        }
    },
    auto_trait2: {
        id: "kubejs:ice_dragon_blood",
        config: (trait) => {
            trait.setMaxLevel(3)
                .addConditions([])
        }
    },
    auto_trait3: {
        id: "kubejs:fire_dragon_blood",
        config: (trait) => {
            trait.setMaxLevel(3)
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

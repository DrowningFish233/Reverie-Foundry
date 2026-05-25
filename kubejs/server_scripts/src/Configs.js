// priority: 100
/**
 * 自动生成寂静装备材料
 */
/** ↓提供补全用代码，不可删除 */
/** @type {Object.<string, {id: string, config: (mat: GenerateSilentGearMaterial) => void}>} */
const MaterialConfigs = {
    enabled: true, // 设为false可禁用生成
    auto_ingot: {
        id: "kubejs:perennial_ingot",
        config: (mat) => {
            mat.setCategories(["advanced", "organic", "metal"])
                .setIngredientItem("kubejs:perennial_ingot")
                .setDisplayColor("#2d8f38")
                .setName("material.silentgear.kubejs:perennial_ingot")
                .addMain((/** @type {PartBuilder} */part) => {
                    part
                        .armor(25)
                        .armorHelmet(5)
                        .armorChestplate(8)
                        .armorLeggings(7)
                        .armorBoots(5)
                        .armorDurability(15)
                        .attackDamage(5)
                        .attackSpeed(1)
                        .durability(100)
                        .addTrait("kubejs:unchecked_growth", 1)
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
        id: "kubejs:unchecked_growth",
        config: (trait) => {
            trait.setMaxLevel(1)
            trait.addAttribute([
                trait.createAttributeValue(
                    "minecraft:generic.max_health",
                    "add_multiplied_total",
                    [0.5]
                ),
                trait.createAttributeValue(
                    "minecraft:generic.movement_speed",
                    "add_multiplied_total",
                    [-0.25]
                ),
                trait.createAttributeValue(
                    "terra_curio:player.aggro",
                    "add_value",
                    [600]
                )
            ])
        }
    }
}


/** @type {Object.<string, {id: string, config: (gateway: GenerateGateways) => void}>} */
const GatewayConfigs = {
    enabled: true,
    blaze_gateway: {
        id: "kubejs",
        config: function (gateway) {
            gateway.setSize("small")
                .setColor("#0098BA")
                .addWave(function (/** @type {WaveBuilder} */ wave) {
                    wave.maxWaveTime(400)
                        .setupTime(100)
                        .addEntity('iceandfire:dread_thrall', 4)
                        .addReward(function (reward) {
                            reward.item('iceandfire:dread_shard', 4)
                        })
                })
                .addWave(function (/** @type {WaveBuilder} */ wave) {
                    wave.maxWaveTime(800)
                        .setupTime(140)
                        .addEntity("iceandfire:dread_ghoul", 4)
                        .addEntity('iceandfire:dread_beast', 4)
                        .addReward(function (reward) {
                            reward.item('iceandfire:dread_shard', 12)
                        })
                })
                .addWave(function (/** @type {WaveBuilder} */ wave) {
                    wave.maxWaveTime(1600)
                        .setupTime(160)
                        .addEntity('iceandfire:dread_scuttler', 6)
                        .addEntity('iceandfire:dread_knight', 6)
                        .addReward(function (reward) {
                            reward.item('iceandfire:dread_shard', 12)
                        })
                })
                .addWave(function (/** @type {WaveBuilder} */ wave) {
                    wave.maxWaveTime(3200)
                        .setupTime(200)
                        .addEntity('iceandfire:dread_knight', 4)
                        .addEntity("iceandfire:dread_horse", 4)
                        .addEntity("iceandfire:dread_lich", 3)
                        .addReward(function (/** @type {RewardBuilder} */reward) {
                            reward.item('kubejs:soul_of_night', 8)
                        })
                })
                .addReward(function (/** @type {RewardBuilder} */reward) {
                    reward.itemList([
                        ['kubejs:soul_of_night', 16],
                        ['kubejs:biomass_liquid', 4]
                    ])
                })
                .addReward(function (/** @type {RewardBuilder} */ reward) {
                    reward.lootTable('kubejs:chests/easy', 3, 'rf.rewards.gateways.loot_table.easy')
                })
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


// priority: 100
/**
 * 自动生成寂静装备材料
 */
/** ↓提供补全用代码，不可删除 */
/** @type {Object.<string, {id: string, config: (mat: GenerateSilentGearMaterial) => void}>} */
const MaterialConfigs = {
    enabled: true, // 设为false可禁用生成
    auto_ingot12: {
        id: 'kubejs:ancient_remnant_bone',
        config: (mat) => {
            mat.setCategories(["bone", "advanced"])
                .setIngredientItem('kubejs:ancient_remnant_bone')
                .setDisplayColor("#f1dcd5")
                .setName("material.silentgear.kubejs:ancient_remnant_bone")

                // 握把
                .addRod((/** @type {PartBuilder} */part) => {
                    part
                        .attackDamageWithOperation("ADD", 5)
                        .attackDamageWithOperation("MULTIPLY_BASE", 0.15)
                        .magicDamageWithOperation("ADD", 3)
                        .magicDamageWithOperation("MULTIPLY_BASE", 0.15)
                        .durabilityWithOperation("ADD", 200)
                        .durabilityWithOperation("MULTIPLY_BASE", -0.3)
                        .rangedDamageWithOperation("MULTIPLY_BASE", 0.25)
                        .rarityWithOperation("ADD", 50)
                        .forgePositiveChanceWithOperation("ADD", 20)
                        .addTrait("kubejs:remnant_possession", 1)
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
    enabled: true,

    soul_conversion: {
        id: "kubejs:remnant_possession",
        config: (trait) => {
            trait.setMaxLevel(1);
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


ItemEvents.toolTierRegistry(event => {
    event.add('crowbar', tier => {
        tier.setUses(1145)
        tier.setSpeed(6)
        tier.setAttackDamageBonus(18)
        tier.setIncorrectBlocksForDropsTag('minecraft:incorrect_for_netherite_tool')
        tier.setEnchantmentValue(20)
        tier.setRepairIngredient('#c:ingots/crowbar')
    })
})

StartupEvents.registry('item', event => {
    event.create('crowbar', 'paxel')
        .tier('crowbar')
        .rarity("epic")
        .modifyTier(tier => {
            tier.speed = 24
            tier.setUses(1145)
        })
});

ItemEvents.modification(event => {
    event.modify('kubejs:crowbar', event => {
        event.setUnbreakable()
    })
})
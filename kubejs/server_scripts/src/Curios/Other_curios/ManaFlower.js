// 在服务端接收网络包并执行自动喝药
NetworkEvents.dataReceived('kubejs:mana_flower', event => {
    let player = event.player
    let spellId = event.data.spellId
    let spellLevel = event.data.spellLevel

    let spellIdStr = String(spellId).replace(/"/g, '').replace(/'/g, '')

    // 获取法术信息
    let spell = $SpellRegistry["getSpell(java.lang.String)"](spellIdStr)
    if (!spell) return

    let costmana = spell.getManaCost(spellLevel)
    let maxmana = player.getAttributeValue("irons_spellbooks:max_mana")
    let leftmana = getPlayerMagicData(player).getMana()

    // 在服务端检查法力是否足够
    if (costmana > leftmana && leftmana != 0) {
        if (searchSpecificItems(player)) {
            return
        }

        // 如果没有找到指定物品，再搜索普通药水
        for (let itemstack of player.getInventory().items) {
            if (itemstack.getItem() instanceof $PotionItem) {
                if (judgePotion(itemstack, player, maxmana)) {
                    return
                }
            }
        }
    }
})

// 优先搜索指定物品
function searchSpecificItems(player) {
    // 定义优先搜索的物品列表（按优先级排序）
    let priorityItems = [
        'kubejs:supreme_mana_potion',
        'kubejs:white_wine',
        'kubejs:margarita',
        'kubejs:grape_beer',
        'kubejs:star_beam_rye'
    ]

    // 搜索背包中的优先物品
    for (let itemId of priorityItems) {
        for (let itemstack of player.getInventory().items) {
            if (itemstack.getId() === itemId && itemstack.count > 0) {
                useSpecificItem(itemstack, player, itemId)
                return true
            }
        }
    }
    return false
}

function useSpecificItem(itemstack, player, itemId) {
    let magicData = getPlayerMagicData(player)

    switch (itemId) {
        case 'kubejs:supreme_mana_potion':
            // 恢复400法力
            itemstack.shrink(1)
            magicData.addMana(400)
            magicData.addMana(-1)
            player.give('minecraft:glass_bottle')
            break

        case 'kubejs:white_wine':
            // 恢复400法力
            if (!player.hasEffect("kubejs:white_wine")) {
                player.potionEffects.add('kubejs:white_wine', 1200 * 8, 0, 1)
                itemstack.shrink(1)
                magicData.addMana(400)
                magicData.addMana(-1)
                player.give('minecraft:glass_bottle')

            }
            break

        case 'kubejs:margarita':
            //恢复200法力并治疗20
            if (!player.hasEffect("kubejs:white_wine")) {
                player.potionEffects.add('kubejs:white_wine', 1200 * 8, 0, 1)
                itemstack.shrink(1)
                player.heal(20)
                magicData.addMana(200)
                magicData.addMana(-1)
                player.give('minecraft:glass_bottle')

            }
            break

        case 'kubejs:grape_beer':
            if (!player.hasEffect("kubejs:grape_beer")) {
                player.potionEffects.add('kubejs:grape_beer', 20 * 15, 0, 1)
                itemstack.shrink(1)
                player.heal(10)
                magicData.addMana(100)
                magicData.addMana(-1)
                player.give('minecraft:glass_bottle')

            }
            break

        case 'kubejs:star_beam_rye':
            // 恢复50法力
            if (!player.hasEffect("kubejs:star_beam_rye")) {
                player.potionEffects.add('kubejs:star_beam_rye', 1200 * 8, 0, 1)
                itemstack.shrink(1)
                magicData.addMana(50)
                magicData.addMana(-1)
                player.give('minecraft:glass_bottle')

            }
            break
    }
}

// 药水判断函数
function judgePotion(itemstack, player, maxmana) {
    let potionContents = itemstack.get($DataComponents.POTION_CONTENTS)

    if (!potionContents) {
        return false
    }

    if (potionContents.is($PotionRegistry.INSTANT_MANA_FOUR)) {
        costPotion(itemstack, player, 100, 0.2, maxmana)
        return true
    }
    if (potionContents.is($PotionRegistry.INSTANT_MANA_THREE)) {
        costPotion(itemstack, player, 75, 0.15, maxmana)
        return true
    }
    if (potionContents.is($PotionRegistry.INSTANT_MANA_TWO)) {
        costPotion(itemstack, player, 50, 0.1, maxmana)
        return true
    }
    if (potionContents.is($PotionRegistry.INSTANT_MANA_ONE)) {
        costPotion(itemstack, player, 25, 0.05, maxmana)
        return true
    }

    return false
}

// 药水消耗函数（用于普通药水）
function costPotion(itemstack, player, parameter1, parameter2, maxmana) {
    itemstack.shrink(1)
    player.addItem(new $ItemStack(Items.GLASS_BOTTLE))

    let magicData = getPlayerMagicData(player)
    let manaToAdd = parameter1 + maxmana * parameter2
    magicData.addMana(manaToAdd)
    player.give('minecraft:glass_bottle')

}
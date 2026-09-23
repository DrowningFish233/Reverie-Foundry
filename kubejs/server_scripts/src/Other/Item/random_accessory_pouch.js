ItemEvents.rightClicked('kubejs:random_accessory_pouch', event => {
    let player = event.player
    let hand = event.hand

    $RFUtils.giveRandomItemToPlayer(player, 'kubejs:level_1', 1, 1)

    if (!player.isCreative()) {
        if (hand == 'main_hand' && player.mainHandItem.id == 'kubejs:random_accessory_pouch') {
            player.mainHandItem.count--
        } else if (hand == 'off_hand' && player.offHandItem.id == 'kubejs:random_accessory_pouch') {
            player.offHandItem.count--
        }
    }
})

ItemEvents.rightClicked('kubejs:random_accessory_pouch_t2', event => {
    let player = event.player
    let hand = event.hand

    $RFUtils.giveRandomItemToPlayer(player, 'kubejs:level_2', 1, 1)

    if (!player.isCreative()) {
        if (hand == 'main_hand' && player.mainHandItem.id == 'kubejs:random_accessory_pouch_t2') {
            player.mainHandItem.count--
        } else if (hand == 'off_hand' && player.offHandItem.id == 'kubejs:random_accessory_pouch_t2') {
            player.offHandItem.count--
        }
    }
})

ItemEvents.rightClicked('kubejs:random_accessory_pouch_t3', event => {
    let player = event.player
    let hand = event.hand

    $RFUtils.giveRandomItemToPlayer(player, 'kubejs:level_3', 1, 1)

    if (!player.isCreative()) {
        if (hand == 'main_hand' && player.mainHandItem.id == 'kubejs:random_accessory_pouch_t3') {
            player.mainHandItem.count--
        } else if (hand == 'off_hand' && player.offHandItem.id == 'kubejs:random_accessory_pouch_t3') {
            player.offHandItem.count--
        }
    }
})

ItemEvents.rightClicked('kubejs:random_accessory_pouch_t4', event => {
    let player = event.player
    let hand = event.hand

    $RFUtils.giveRandomItemToPlayer(player, 'kubejs:level_4', 1, 1)

    if (!player.isCreative()) {
        if (hand == 'main_hand' && player.mainHandItem.id == 'kubejs:random_accessory_pouch_t4') {
            player.mainHandItem.count--
        } else if (hand == 'off_hand' && player.offHandItem.id == 'kubejs:random_accessory_pouch_t4') {
            player.offHandItem.count--
        }
    }
})
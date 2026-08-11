ItemEvents.rightClicked('kubejs:random_accessory_pouch', event => {
    let player = event.player
    let item = player.getMainHandItem()

    $RFUtils.giveRandomItemToPlayer(player, 'kubejs:level_1', 1, 1)

    if (!player.isCreative()) {
        item.count--
    }
})

ItemEvents.rightClicked('kubejs:random_accessory_pouch_t2', event => {
    let player = event.player
    let item = player.getMainHandItem()

    $RFUtils.giveRandomItemToPlayer(player, 'kubejs:level_2', 1, 1)

    if (!player.isCreative()) {
        item.count--
    }
})

ItemEvents.rightClicked('kubejs:random_accessory_pouch_t3', event => {
    let player = event.player
    let item = player.getMainHandItem()

    $RFUtils.giveRandomItemToPlayer(player, 'kubejs:level_3', 1, 1)

    if (!player.isCreative()) {
        item.count--
    }
})

ItemEvents.rightClicked('kubejs:random_accessory_pouch_t4', event => {
    let player = event.player
    let item = player.getMainHandItem()

    $RFUtils.giveRandomItemToPlayer(player, 'kubejs:level_4', 1, 1)

    if (!player.isCreative()) {
        item.count--
    }
})
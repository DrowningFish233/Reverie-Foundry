ItemEvents.rightClicked('kubejs:random_accessory_pouch', event => {
    let player = event.player
    let item = player.getMainHandItem()

    let level = Math.floor(Math.random() * 4) + 1
    let tagPath = `kubejs:level_${level}`

    $RFUtils.giveRandomItemToPlayer(player, tagPath, 1, 1)

    if (!player.isCreative()) {
        item.count--
    }
})
//传送至附近玩家
ItemEvents.firstRightClicked('kubejs:scroll_of_friendship', event => {
    let { player, level } = event
    let players = level.players
    if (player.isFake()) return

    let ohtherPlayers = players.filter(p => !p.equals(player))

    if (ohtherPlayers.length === 0) {
        player.tell(Text.translate('message.scroll_of_friendship.find').color('yellow'))

        let closestPlayer = null
        let closestDistance = Infinity
        for (let ohtherPlayer of ohtherPlayers) {
            let distance = player.distanceToEntity(ohtherPlayer)
            if (distance < closestDistance) {
                closestDistance = distance
                closestPlayer = ohtherPlayer
            }
        }
        if (closestPlayer) {
            event.player.swing()
            player.teleportTo(closestPlayer.x, closestPlayer.y, closestPlayer.z)
            player.tell(Text.translate('message.scroll_of_friendship.tp').color('green'))
            let item = player.getMainHandItem()
            if (item.id === 'kubejs:scroll_of_friendship') {
                item.count--
            }
            return
        }
    } else {
        player.tell(Text.translate('message.scroll_of_friendship.notfind').color('red'))
    }
})
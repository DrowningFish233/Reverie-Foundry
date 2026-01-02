//传送至附近玩家
ItemEvents.firstRightClicked('kubejs:scroll_of_friendship', event => {
    let { player, level } = event
    let players = level.players
    if (player.isFake()) return

    let otherPlayers = players.filter(p => !p.equals(player))

    if (otherPlayers.length > 0) {

        let closestPlayer = null
        let closestDistance = Infinity
        for (let otherPlayer of otherPlayers) {
            let distance = player.distanceToEntity(otherPlayer)
            if (distance < closestDistance) {
                closestDistance = distance
                closestPlayer = otherPlayer
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
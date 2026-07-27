ItemEvents.firstRightClicked('kubejs:dimensional_ripper', event => {
    if (event.player.level.isClientSide()) return

    let current = $EndGatewaySpawner.isEnabled()
    if (current) {
        event.player.tell(Component.of('§e永恒之门自然刷新已经开启了'))
        return
    }

    $EndGatewaySpawner.setEnabled(true)
    event.item.count--
    event.player.tell(Component.of('§a永恒之门自然刷新已开启'))
})

ItemEvents.firstRightClicked('kubejs:dimensional_stabilizer', event => {
    if (event.player.level.isClientSide()) return

    let current = $EndGatewaySpawner.isEnabled()
    if (!current) {
        event.player.tell(Component.of('§e永恒之门自然刷新已经关闭了'))
        return
    }

    $EndGatewaySpawner.setEnabled(false)
    event.item.count--
    event.player.tell(Component.of('§c永恒之门自然刷新已关闭'))
})


ItemEvents.firstRightClicked('kubejs:rift_probe', event => {
    $EndGatewaySpawner.forceSummon(event.player.getLevel())
    event.item.count--
})

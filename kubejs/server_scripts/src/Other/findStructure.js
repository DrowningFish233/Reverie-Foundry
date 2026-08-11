ItemEvents.firstRightClicked('kubejs:eye_of_weeping_well_located', event => {
    const { player, item, server } = event
    locateStructure(player, item, server, 'kubejs:eye_of_weeping_well_located', 'eye_of_weeping_well', 60)
})

ItemEvents.firstRightClicked('kubejs:eye_of_dragon_cave_located', event => {
    const { player, item, server } = event
    locateStructure(player, item, server, 'kubejs:eye_of_dragon_cave_located', 'eye_of_dragon_cave', 60)
})

ItemEvents.firstRightClicked('kubejs:eye_of_starlight_portal_located', event => {
    const { player, item, server } = event
    locateStructure(player, item, server, 'kubejs:eye_of_starlight_portal_located', 'starlight_portal', 60)
})

ItemEvents.firstRightClicked('kubejs:eye_of_ancient_city_located', event => {
    const { player, item, server } = event
    locateStructure(player, item, server, 'kubejs:eye_of_ancient_city_located', 'eye_of_ancient_city', 60)
})

ItemEvents.firstRightClicked('kubejs:eye_of_fortress_located', event => {
    const { player, item, server } = event
    locateStructure(player, item, server, 'kubejs:eye_of_fortress_located', 'eye_of_fortress', 60)
})

ItemEvents.firstRightClicked('kubejs:eye_of_ancient_battleground_located', event => {
    const { player, item, server } = event
    locateStructure(player, item, server, 'kubejs:eye_of_ancient_battleground_located', 'eye_of_ancient_battleground', 60)
})

ItemEvents.firstRightClicked('kubejs:eye_of_monument_located', event => {
    const { player, item, server } = event
    locateStructure(player, item, server, 'kubejs:eye_of_monument_located', 'eye_of_monument', 60)
})


function locateStructure(player, item, server, structureKey, messageKey, duration) {
    if (!server) return

    let serverLevel = server.getLevel(player.level.dimension)
    let playerPos = player.blockPosition()

    try {
        let structurePos = serverLevel.findNearestMapStructure(
            structureKey,
            playerPos,
            10000,
            false
        )

        if (structurePos) {
            player.tell(Text.translatable(`message.kubejs.${messageKey}.found`)
                .append(Text.of(` X:${structurePos.x}, Z:${structurePos.z}`).gold()))

            let eye = serverLevel.createEntity('minecraft:eye_of_ender')
            eye.setPos(player.x, player.y + 1, player.z)
            eye.signalTo(structurePos)
            serverLevel.addFreshEntity(eye)

            server.scheduleInTicks(duration, () => {
                eye.discard()
            })

            if (!player.isCreative()) {
                item.shrink(1)
            }
        } else {
            player.tell(Text.translatable(`message.kubejs.${messageKey}.not_found`).red())
        }
    } catch (e) {
        console.error(`查找结构 ${structureKey} 时出错:`, e)
        player.tell(Text.translatable(`message.kubejs.${messageKey}.failed`).red())
    }
}

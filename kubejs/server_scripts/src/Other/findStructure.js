ItemEvents.firstRightClicked('kubejs:eye_of_weeping_well_located', event => {
    const { player, item, hand, server } = event

    if (server) {
        let serverLevel = server.getLevel(player.level.dimension)
        let playerPos = player.blockPosition()

        try {

            let structurePos = serverLevel.findNearestMapStructure(
                'kubejs:eye_of_weeping_well_located',
                playerPos,
                10000,
                false
            )

            if (structurePos) {
                player.tell(Text.translatable('message.kubejs.eye_of_weeping_well.found')
                    .append(Text.of(` X:${structurePos.x}, Z:${structurePos.z}`).gold()))


                let eye = serverLevel.createEntity('minecraft:eye_of_ender')
                eye.setPos(player.x, player.y + 1, player.z)
                eye.signalTo(structurePos)
                serverLevel.addFreshEntity(eye)
                server.scheduleInTicks(60, () => {
                    eye.discard()
                })


                if (!player.isCreative()) {
                    item.shrink(1)
                }

            } else {
                player.tell(Text.translatable('message.kubejs.eye_of_weeping_well.not_found').red())
            }

        } catch (e) {
            console.error('查找结构时出错:', e)
            player.tell(Text.translatable('message.kubejs.eye_of_weeping_well.failed').red())
        }
    }
})


ItemEvents.firstRightClicked('kubejs:eye_of_dragon_cave_located', event => {
    const { player, item, hand, server } = event

    if (server) {
        let serverLevel = server.getLevel(player.level.dimension)
        let playerPos = player.blockPosition()

        try {

            let structurePos = serverLevel.findNearestMapStructure(
                'kubejs:eye_of_dragon_cave_located',
                playerPos,
                10000,
                false
            )

            if (structurePos) {
                player.tell(Text.translatable('message.kubejs.eye_of_dragon_cave.found')
                    .append(Text.of(` X:${structurePos.x}, Z:${structurePos.z}`).gold()))


                let eye = serverLevel.createEntity('minecraft:eye_of_ender')
                eye.setPos(player.x, player.y + 1, player.z)
                eye.signalTo(structurePos)
                serverLevel.addFreshEntity(eye)
                server.scheduleInTicks(60, () => {
                    eye.discard()
                })


                if (!player.isCreative()) {
                    item.shrink(1)
                }

            } else {
                player.tell(Text.translatable('message.kubejs.eye_of_dragon_cave.not_found').red())
            }

        } catch (e) {
            console.error('查找结构时出错:', e)
            player.tell(Text.translatable('message.kubejs.eye_of_dragon_cave.failed').red())
        }
    }
})


ItemEvents.firstRightClicked('kubejs:eye_of_starlight_portal_located', event => {
    const { player, item, hand, server } = event

    if (server) {
        let serverLevel = server.getLevel(player.level.dimension)
        let playerPos = player.blockPosition()

        try {

            let structurePos = serverLevel.findNearestMapStructure(
                'kubejs:eye_of_starlight_portal_located',
                playerPos,
                10000,
                false
            )

            if (structurePos) {
                player.tell(Text.translatable('message.kubejs.starlight_portal.found')
                    .append(Text.of(` X:${structurePos.x}, Z:${structurePos.z}`).gold()))


                let eye = serverLevel.createEntity('minecraft:eye_of_ender')
                eye.setPos(player.x, player.y + 1, player.z)
                eye.signalTo(structurePos)
                serverLevel.addFreshEntity(eye)
                server.scheduleInTicks(60, () => {
                    eye.discard()
                })


                if (!player.isCreative()) {
                    item.shrink(1)
                }

            } else {
                player.tell(Text.translatable('message.kubejs.starlight_portal.not_found').red())
            }

        } catch (e) {
            console.error('查找结构时出错:', e)
            player.tell(Text.translatable('message.kubejs.starlight_portal.failed').red())
        }
    }
})

ItemEvents.firstRightClicked('kubejs:eye_of_ancient_city_located', event => {
    const { player, item, hand, server } = event

    if (server) {
        let serverLevel = server.getLevel(player.level.dimension)
        let playerPos = player.blockPosition()

        try {

            let structurePos = serverLevel.findNearestMapStructure(
                'kubejs:eye_of_ancient_city_located',
                playerPos,
                10000,
                false
            )

            if (structurePos) {
                player.tell(Text.translatable('message.kubejs.eye_of_ancient_city.found')
                    .append(Text.of(` X:${structurePos.x}, Z:${structurePos.z}`).gold()))


                let eye = serverLevel.createEntity('minecraft:eye_of_ender')
                eye.setPos(player.x, player.y + 1, player.z)
                eye.signalTo(structurePos)
                serverLevel.addFreshEntity(eye)
                server.scheduleInTicks(60, () => {
                    eye.discard()
                })


                if (!player.isCreative()) {
                    item.shrink(1)
                }

            } else {
                player.tell(Text.translatable('message.kubejs.eye_of_ancient_city.not_found').red())
            }

        } catch (e) {
            console.error('查找结构时出错:', e)
            player.tell(Text.translatable('message.kubejs.eye_of_ancient_city.failed').red())
        }
    }
})


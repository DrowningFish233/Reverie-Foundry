//wist实现
ServerEvents.basicCommand("wits", event => {
    if (!(event.getEntity().isPlayer())) return
    let player = event.getPlayer()
    let level = event.getLevel()
    let result = Text.translate("message.wits.desc").color(0xd77a61);
    level.structureManager().startsForStructure($ChunkPos(player.blockPosition()), () => true).stream().forEach(ss => {
        if (ss.getBoundingBox().isInside(player.blockPosition())) {
            result.append(Text.of("\n - ")
                .append(Registry.of("worldgen/structure").getKey(ss.getStructure()).location())
                .color(0xd8b4a0))
        }
    })
    if (result.getSiblings().size() > 0) {
        player.tell(result)
    } else {
        player.tell(Text.translate("message.wits.notfind.desc").color(0xd77a61))
    }
})

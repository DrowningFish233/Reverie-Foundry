//禁止放置方块
BlockEvents.placed(event => {
    const { player } = event;
    if (!player) return
    if (!player.hasEffect("kubejs:no_block")) return
    event.cancel();
});

//禁止挖掘方块
BlockEvents.broken(event => {
    const { player } = event;
    if (!player) return
    if (!player.hasEffect("kubejs:no_block")) return
    event.cancel()
})

//禁止右键方块
BlockEvents.rightClicked(event => {
    const { player } = event;
    if (!player) return
    if (!player.hasEffect("kubejs:no_rightclicked")) return
    event.cancel()
})

ItemEvents.firstRightClicked('kubejs:holosphere', event => {
    const player = event.player;
    if (!player) return;

    player.sendData("openScreenUI", {
        uuid: player.getUuid(),
        name: player.getName().getString()
    });
})

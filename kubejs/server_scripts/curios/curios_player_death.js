//玩家死亡饰品变换事件
EntityEvents.death(event => {
    let player = event.player;
    if (!player) return;

    const api = new $CuriosApi();
    let killentityCurios = api.getCuriosHelper().getEquippedCurios(player);
    killentityCurios.ifPresent(curios => {
        for (let slot = 0; slot < curios.getSlots(); slot++) {
            let item = curios.getStackInSlot(slot);
            if (curios_player_death[item.id]) {
                curios_player_death[item.id](event, curios, slot, item);
            }
        }
    });
});

const curios_player_death = {
    'kubejs:none_curios': function (event, curios, slot, item) {
        if (!kubejs_player.some(ctx => ctx == event.entity.type)) {
            return;
        }
        curios.setStackInSlot(slot, Item.of('minecraft:air'));
    }
};


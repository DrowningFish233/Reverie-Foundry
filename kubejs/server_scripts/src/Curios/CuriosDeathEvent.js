//击杀饰品变换事件
EntityEvents.death(event => {
    let player = event.source.player;
    if (!player) return;

    const api = new $CuriosApi();
    let killentityCurios = api.getCuriosHelper().getEquippedCurios(player);
    killentityCurios.ifPresent(curios => {
        for (let slot = 0; slot < curios.getSlots(); slot++) {
            let item = curios.getStackInSlot(slot);
            if (curios_death_event[item.id]) {
                curios_death_event[item.id](event, curios, slot, item, player);
            }
        }
    });
});

const curios_death_event = {
    'kubejs:baptism_of_violet': function (event, curios, slot, item) {
        if (!FINAL_BOSS == event.entity.getType()) {
            return;
        }
        curios.setStackInSlot(slot, Item.of('kubejs:paradise_lost'));
    },

    'kubejs:magnet_flower': function (event, curios, slot, item, player) {
        getPlayerMagicData(player).addMana(10)
        getPlayerMagicData(player).addMana(-1)
    }
};


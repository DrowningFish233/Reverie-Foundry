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
                curios_death_event[item.id](event, curios, slot, item);
            }
        }
    });
});

const curios_death_event = {
    'kubejs:bleed_curios': function (event, curios, slot, item) {
        if (!entity_curios_Boss.some(ctx => ctx == event.entity.type)) {
            return;
        }
        curios.setStackInSlot(slot, Item.of('kubejs:none_curios'));
    }
};


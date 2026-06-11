/**
 * 震颤胶质
 */
/**
 * @param {$BeforeLivingEntityHurtKubeEvent_} event 
 * @returns 
 */
function shivering_gel_tick(event, player) {
    if (!player || !player.isLiving() || !fu_hasTraitAnywhere(player, "kubejs:shivering_gel")) return;

    const radius = 5;
    const world = player.level;

    const nearbyEntities = world.getEntities(
        player,
        player.getBoundingBox().inflate(radius)
    ).filter(entity =>
        entity.living &&
        entity !== player
    );

    for (let entity of nearbyEntities) {
        if (entity.hasEffect("kubejs:tremor")) {
            let effect = entity.getEffect("kubejs:tremor");
            let amplifier = effect.getAmplifier();

            if (amplifier >= 10 && amplifier < 20) {
                entity.potionEffects.add("minecraft:slowness", 20, 0);
            } else if (amplifier >= 20) {
                entity.potionEffects.add("minecraft:slowness", 20, 0);
                entity.potionEffects.add("kubejs:paralysis", 20, 0);
            }
        } else {
            entity.potionEffects.add("kubejs:tremor", 80, 0);
        }
    }
}

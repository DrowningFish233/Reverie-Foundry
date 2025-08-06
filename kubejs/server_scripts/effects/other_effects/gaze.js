//凝视
function gaze(event, player) {
    if (!player || !player.hasEffect("kubejs:gaze")) return;
    const entities = player.rayTrace().entity
    if (entities) {
        entities.potionEffects.add("kubejs:eye", 20 * 5, 0);
    }

}

/**
 * 减伤效果
 */
function disillusionment(event) {
    let entity = event.getEntity();
    let value = 0.2;

    if (!entity.isPlayer()) {
        if (entity.hasEffect("kubejs:disillusionment") && !entity.hasEffect("ban_disillusionment")) {
            new_damage(event, STAGE.MULTIPLY, value);
        }
    }
    return;
}
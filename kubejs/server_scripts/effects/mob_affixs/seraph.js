/**
 * 不燃起来就减伤效果
 */
function seraph(event) {
    let entity = event.getEntity();
    let value = 0.2;
    if (entity.hasEffect("kubejs:seraph")) {
        if (!(entity.isOnFire() || entity.isInLava())) {
            new_damage(event, STAGE.MULTIPLY, value);
        }
    } return
}

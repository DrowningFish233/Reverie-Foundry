function sloth_2(event) {
    let entity = event.getEntity();
    let value = 0.5;
    if (entity.hasEffect("kubejs:sloth_2")) {
        new_damage(event, STAGE.MULTIPLY, value);
    } return
}

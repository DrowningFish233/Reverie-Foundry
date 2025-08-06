// priority: 10
ItemEvents.foodEaten(event => {
    let player = event.player;
    if (!player) return;
    let isGLUTTONY = player.persistentData.getInt(sins.GLUTTONY) || 0;
    if (isGLUTTONY > 0) {
        gluttony_effect["GLUTTONY"](event, player);
    }
});

const gluttony_effect = {
    'GLUTTONY': function (event, player) {
        let GLUTTONYProperties = event.item.getFoodProperties(null)
        let nutrition = GLUTTONYProperties.nutrition() || 0
        let GLUTTONY_nutrition = player.persistentData.getDouble("GLUTTONY_nutrition");
        GLUTTONY_nutrition += nutrition
        player.persistentData.putDouble("GLUTTONY_nutrition", GLUTTONY_nutrition);
    },
};

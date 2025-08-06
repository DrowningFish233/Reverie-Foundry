function cursium_ingot(event, player) {

    if (!player || !player.hasEffect("kubejs:cursium_ingot")) return;

    let Effect = player.getEffect("kubejs:cursium_ingot");
    let Level = Effect.getAmplifier() + 1;

    player.potionEffects.add("cataclysm:ghost_form", Level * 30, 0);
}
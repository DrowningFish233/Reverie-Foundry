// priority: 10
// 每刻更新罪孽状态事件
PlayerEvents.tick(event => {
    let player = event.player;
    if (!player) return;
    if (player.tickCount % 20 != 0) return;
    let PData = player.persistentData
    let isGLUTTONY = PData.getInt(sins.GLUTTONY) || 0;
    if (isGLUTTONY > 0) {
        let GLUTTONY_nutrition = PData.getDouble("GLUTTONY_nutrition") || 0.0;
        GLUTTONY_nutrition = Math.max(-20, GLUTTONY_nutrition - 1);
        let gluttony_strength = Math.max(0, GLUTTONY_nutrition - 50);
        PData.putDouble("gluttony_strength", gluttony_strength);
        let gluttony_strength_1 = gluttony_strength / 2
        if (GLUTTONY_nutrition > 40) {
            player.potionEffects.add("kubejs:gluttony", 40, gluttony_strength_1, false, false);
            player.potionEffects.add("minecraft:regeneration", 40, 1, false, false);
            player.potionEffects.add("irons_spellbooks:gluttony", 80, 4, false, false);
        } else if (GLUTTONY_nutrition > 30) {
            player.potionEffects.add("minecraft:regeneration", 40, 1, false, false);
            player.potionEffects.add("irons_spellbooks:gluttony", 80, 3, false, false);
        } else if (GLUTTONY_nutrition > 20) {
            player.potionEffects.add("minecraft:regeneration", 40, 0, false, false);
            player.potionEffects.add("irons_spellbooks:gluttony", 80, 2, false, false);
        } else if (GLUTTONY_nutrition > 10) {
            player.potionEffects.add("irons_spellbooks:gluttony", 40, 1, false, false);
        } else if (GLUTTONY_nutrition > 0) {
            player.potionEffects.add("irons_spellbooks:gluttony", 40, 0, false, false);
        } else if (GLUTTONY_nutrition > -10) {
            player.potionEffects.add("minecraft:weakness", 40, 2, false, false);
        } else if (GLUTTONY_nutrition >= -20) {
            player.potionEffects.add("minecraft:weakness", 40, 255, false, false);
        }
        PData.putDouble("GLUTTONY_nutrition", GLUTTONY_nutrition);
    }
});
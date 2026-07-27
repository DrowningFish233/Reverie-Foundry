// priority: 10
// 暴食特质
FoodEatenevents.register("gluttony", function (event, player, magicData) {
    let isGLUTTONY = player.persistentData.getInt(sins.GLUTTONY) || 0;
    if (isGLUTTONY <= 0) return;

    // 检查是否装备了暴食之戒
    let hasRingOfGluttony = getCuriosItem(player, 'kubejs:ring_of_gluttony') !== null;

    let foodProperties = event.item.getFoodProperties(player);
    if (!foodProperties) return;

    let nutrition = foodProperties.nutrition() || 0;
    let saturation = foodProperties.saturation() || 0;
    let currentHealth = player.getHealth();
    let maxHealth = player.getMaxHealth();
    let missingHealth = maxHealth - currentHealth;

    if (currentHealth < maxHealth) {
        let healAmount = hasRingOfGluttony ? nutrition * 2 : nutrition * 1;
        healAmount = Math.min(missingHealth, healAmount);
        player.heal(healAmount);
    }
    else {
        let duration = hasRingOfGluttony ? 600 : 300;
        $RFUtils.applyRandomBuff(player, duration, 1);
    }

    // 范围分享
    if (hasRingOfGluttony) {
        let nearbyPlayers = player.level.getPlayers();
        for (let nearbyPlayer of nearbyPlayers) {
            if (nearbyPlayer !== player && player.distanceToEntity(nearbyPlayer) <= 5) {
                let newFoodLevel = nearbyPlayer.getFoodLevel() + nutrition;
                nearbyPlayer.setFoodLevel(Math.min(20, newFoodLevel));

                let newSaturation = nearbyPlayer.getSaturationLevel() + saturation;
                nearbyPlayer.setSaturationLevel(Math.min(20, newSaturation));
            }
        }
    }
});

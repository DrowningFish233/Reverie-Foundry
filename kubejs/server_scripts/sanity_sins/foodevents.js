// priority: 10
ItemEvents.foodEaten(event => {
    let player = event.player;
    if (!player) return;
    foodEatenevents["food"](event, player);
    foodEatenevents["bluestar"](event, player);
    foodEatenevents["raw_manflesh"](event, player);
    foodEatenevents["cooked_manflesh"](event, player);
});

const foodEatenevents = {
    'food': function (event, player) {
        if (!event.item.hasTag('c:foods')) {
            return;
        }
        GLUTTONY_Cooldown(event, player);

        let pData = player.persistentData;
        let currentFood = player.getFoodLevel();

        if (currentFood === 20) {
            let currentSanity = pData.getInt("sanity") || 0;
            let newSanity = currentSanity + 1;

            const maxSanity = pData.getInt("Maxsanity") || 45;
            newSanity = Math.min(newSanity, maxSanity);
            updateplayersanity(player, newSanity);
        }
    },
    'bluestar': function (event, player) {
        if (!event.item.hasTag('kubejs:bluestar')) {
            return;
        }
        const currentSanity = player.persistentData.getInt("sanity");
        const sanityIncrease = 0;
        let newSanity = currentSanity + sanityIncrease;
        const maxSanity = player.persistentData.getInt("Maxsanity") || 45;
        newSanity = Math.min(newSanity, maxSanity);
        updateplayersanity(player, newSanity);
        if (newSanity == -45) {
            event.player.addItemCooldown(event.item, 20 * 180);
            event.player.potionEffects.add(
                'kubejs:blue_star',
                60 * 20,
                0
            );
        }
        GLUTTONY_Cooldown(event, player)
    },
    'raw_manflesh': function (event, player) {
        if (!event.item.hasTag('kubejs:foods/manflesh/raw_manflesh')) {
            return;
        }
        const currentSanity = player.persistentData.getInt("sanity");
        const wendigo = player.persistentData.getInt("wendigo");
        const sanityReduction = 1;
        let newSanity;

        if (wendigo > 0) {
            //启用温迪戈
            newSanity = currentSanity + sanityReduction;
            updateplayersanity(player, newSanity);
        } else {
            //未启用温迪戈
            newSanity = currentSanity - sanityReduction;
            updateplayersanity(player, newSanity);
            if (random.nextFloat() < 0.2) {
                player.potionEffects.add('minecraft:nausea', 20 * 5, 0);
                player.potionEffects.add('kubejs:vomit', 1, 0);
            }
        }

        if (newSanity == -45) {
            activateRandomSin(player);
        }
        GLUTTONY_Cooldown(event, player)
    },
    'cooked_manflesh': function (event, player) {
        if (!event.item.hasTag('kubejs:foods/manflesh/cooked_manflesh')) {
            return;
        }
        const currentSanity = player.persistentData.getInt("sanity");
        const wendigo = player.persistentData.getInt("wendigo");
        const sanityReduction = 2;
        let newSanity; // 在外部声明变量

        if (wendigo > 0) {
            //启用温迪戈
            newSanity = currentSanity + sanityReduction;
            updateplayersanity(player, newSanity);
        } else {
            //未启用温迪戈
            newSanity = currentSanity - sanityReduction;
            updateplayersanity(player, newSanity);
            if (random.nextFloat() < 0.4) {
                player.potionEffects.add('minecraft:nausea', 20 * 5, 0);
                player.potionEffects.add('kubejs:vomit', 30, 1);
            }
        }

        if (newSanity == -45) {
            activateRandomSin(player);
        }
        GLUTTONY_Cooldown(event, player)
    },
    'manflesh': function (event, player) {
        if (!event.item.hasTag('kubejs:foods/manflesh')) {
            return;
        }
        const currentSanity = player.persistentData.getInt("sanity");
        const wendigo = player.persistentData.getInt("wendigo");
        const sanityReduction = 2;
        let newSanity; // 在外部声明变量

        if (wendigo > 0) {
            //启用温迪戈
            newSanity = currentSanity + sanityReduction;
            updateplayersanity(player, newSanity);
        } else {
            //未启用温迪戈
            newSanity = currentSanity - sanityReduction;
            updateplayersanity(player, newSanity);
            if (random.nextFloat() < 0.4) {
                player.potionEffects.add('minecraft:nausea', 20 * 5, 0);
                player.potionEffects.add('kubejs:vomit', 30, 1);
            }
        }

        if (newSanity == -45) {
            activateRandomSin(player);
        }
        GLUTTONY_Cooldown(event, player)
    },
};

function GLUTTONY_Cooldown(event, player) {
    const isGLUTTONY = player.persistentData.getInt(sins.GLUTTONY) || 0;
    if (isGLUTTONY > 0) {
        event.player.addItemCooldown(event.item, 20 * 300);
    }
}
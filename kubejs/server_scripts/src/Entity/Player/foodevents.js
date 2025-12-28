// priority: 10
ItemEvents.foodEaten(event => {
    let player = event.player;
    if (!player) return;
    let magicData = getPlayerMagicData(player);
    // 自动处理所有已注册的食物事件
    for (let [key, handler] of Object.entries(FoodEatenevents)) {
        handler(event, player, magicData);
    }


});

/**
 * 理智通用效果处理
 */
const SanityHelper = {
    // 获取当前理智值
    getSanity: (player) => player.persistentData.getInt("sanity") || 0,

    // 获取最大理智值
    getMaxSanity: (player) => player.persistentData.getInt("Maxsanity") || 45,

    //理智值更新
    updateSanity: (player, delta) => {
        const current = SanityHelper.getSanity(player);
        return updateplayersanity(player, current + delta);
    },

    // 检查是否触发特殊效果（-45理智）
    checkSanityThreshold: (player, newSanity) => {
        if (newSanity === -45) {
            activateRandomSin(player);
            return true;
        }
        return false;
    }
};

/**
 * 温迪戈食用事件处理
 */
const WendigoHelper = {
    // 检查温迪戈状态
    isActive: (player) => player.persistentData.getInt("wendigo") > 0,

    // 处理食用人肉逻辑
    handleManFlesh: (player, sanityChange, nauseaChance, nauseaTime, vomitLevel) => {
        const isWendigo = WendigoHelper.isActive(player);
        const actualChange = isWendigo ? Math.abs(sanityChange) : -Math.abs(sanityChange);

        const newSanity = SanityHelper.updateSanity(player, actualChange);

        if (!isWendigo && Math.random() < nauseaChance) {
            player.potionEffects.add('minecraft:nausea', 20 * nauseaTime, 0);
            player.potionEffects.add('kubejs:vomit', 30, vomitLevel);
        }

        SanityHelper.checkSanityThreshold(player, newSanity);
        return newSanity;
    }
};

/**
 * 暴食食用效果处理
 */
const CooldownHelper = {
    // 暴食冷却
    gluttonyCooldown: (event, player) => {
        const isGLUTTONY = player.persistentData.getInt(sins.GLUTTONY) || 0;
        if (isGLUTTONY > 0) {
            event.player.addItemCooldown(event.item, 20 * 300);
        }
    },

    // 通用冷却
    applyCooldown: (event, seconds) => {
        event.player.addItemCooldown(event.item, 20 * seconds);
    }
};

/**
 * 食物事件处理逻辑
 */
const FoodEatenevents = {};

// 自动注册
FoodEatenevents.register = function (name, handler) {
    this[name] = handler;
};

// 移除食物处理器
FoodEatenevents.unregister = function (name) {
    delete this[name];
};

FoodEatenevents.register("food", function (event, player, magicData) {
    if (!event.item.hasTag('c:foods')) return;

    CooldownHelper.gluttonyCooldown(event, player);

    if (player.getFoodLevel() === 20) {
        const newSanity = SanityHelper.updateSanity(player, 2);
        SanityHelper.checkSanityThreshold(player, newSanity);
    }
});

FoodEatenevents.register("raw_manflesh", function (event, player, magicData) {
    if (!event.item.hasTag('kubejs:foods/manflesh/raw_manflesh')) return;

    WendigoHelper.handleManFlesh(player, 1, 0.2, 5, 0);
    CooldownHelper.gluttonyCooldown(event, player);
});

FoodEatenevents.register("cooked_manflesh", function (event, player, magicData) {
    if (!event.item.hasTag('kubejs:foods/manflesh/cooked_manflesh')) return;

    WendigoHelper.handleManFlesh(player, 2, 0.4, 5, 1);
    CooldownHelper.gluttonyCooldown(event, player);
});

FoodEatenevents.register("manflesh", function (event, player, magicData) {
    if (!event.item.hasTag('kubejs:foods/manflesh')) return;

    WendigoHelper.handleManFlesh(player, 2, 0.4, 5, 1);
    CooldownHelper.gluttonyCooldown(event, player);
});

FoodEatenevents.register("emergency_sanity_elixir_a", function (event, player, magicData) {
    if (!event.item.hasTag('kubejs:foods/emergency_sanity_elixir_a')) return;
    const pData = player.persistentData;
    let addiction_up = pData.getInt('addiction') ?? 0;
    pData.putInt('addiction', addiction_up + 1);
    SanityHelper.updateSanity(player, 10);
});

FoodEatenevents.register("emergency_sanity_elixir_b", function (event, player, magicData) {
    if (!event.item.hasTag('kubejs:foods/emergency_sanity_elixir_b')) return;
    const pData = player.persistentData;
    let addiction_up = pData.getInt('addiction') ?? 0;
    pData.putInt('addiction', addiction_up + 2);
    SanityHelper.updateSanity(player, 25);
});

FoodEatenevents.register("emergency_sanity_elixir_y", function (event, player, magicData) {
    if (!event.item.hasTag('kubejs:foods/emergency_sanity_elixir_y')) return;
    const pData = player.persistentData;
    let addiction_up = pData.getInt('addiction') ?? 0;
    pData.putInt('addiction', addiction_up + 4);
    SanityHelper.updateSanity(player, 45);
});

FoodEatenevents.register("foul_flesh", function (event, player, magicData) {
    if (!(event.item.getId() == "kubejs:foul_flesh")) return;
    SanityHelper.updateSanity(player, -15);
});

FoodEatenevents.register("grape_beer", function (event, player, magicData) {
    if (!(event.item.getId() == "kubejs:grape_beer")) return;
    if (!player.hasEffect("kubejs:grape_beer")) {
        player.heal(10)
        magicData.addMana(100)
        magicData.addMana(-1)
    }
});

FoodEatenevents.register("red_wine", function (event, player, magicData) {
    if (!(event.item.getId() == "kubejs:red_wine")) return;
    if (!player.hasEffect("kubejs:red_wine")) {
        player.heal(20)
    }
});

FoodEatenevents.register("white_wine", function (event, player, magicData) {
    if (!(event.item.getId() == "kubejs:white_wine")) return;
    if (!player.hasEffect("kubejs:white_wine")) {
        magicData.addMana(400)
        magicData.addMana(-1)
    }
});

FoodEatenevents.register("supreme_mana_potion", function (event, player, magicData) {
    if (!(event.item.getId() == "kubejs:supreme_mana_potion")) return;
    magicData.addMana(400)
    magicData.addMana(-1)
});

FoodEatenevents.register("supreme_healing_potion", function (event, player, magicData) {
    if (!(event.item.getId() == "kubejs:supreme_healing_potion")) return;
    let heal_Health = player.getMaxHealth() / 3
    player.heal(30 + heal_Health)
});

FoodEatenevents.register("omega_healing_potion", function (event, player, magicData) {
    if (!(event.item.getId() == "kubejs:omega_healing_potion")) return;
    let heal_Health = player.getMaxHealth() / 2
    player.heal(40 + heal_Health)
});

FoodEatenevents.register("margarita", function (event, player, magicData) {
    if (!(event.item.getId() == "kubejs:margarita")) return;
    if (!player.hasEffect("kubejs:white_wine")) {
        player.heal(20)
        magicData.addMana(200)
        magicData.addMana(-1)
    }
});

FoodEatenevents.register("star_beam_rye", function (event, player, magicData) {
    if (!(event.item.getId() == "kubejs:star_beam_rye")) return;
    if (!player.hasEffect("kubejs:star_beam_rye")) {
        magicData.addMana(50)
        magicData.addMana(-1)
    }
});

FoodEatenevents.register("hangover_tea", function (event, player, magicData) {
    if (!(event.item.getId() == "kubejs:hangover_tea")) return;

    let activeEffects = alcoholEffects.filter(effectId =>
        player.hasEffect(effectId)
    );

    if (activeEffects.length > 0) {
        let randomIndex = Math.floor(Math.random() * activeEffects.length);
        let effectToRemove = activeEffects[randomIndex];
        player.removeEffect(effectToRemove);
    }
});


FoodEatenevents.register("miracle_fruit", function (event, player, magicData) {
    if (!(event.item.getId() == "kubejs:miracle_fruit")) return;
    // 其他正面效果
    event.server.runCommandSilent(`stigma remove ${player.username}`);
    SanityHelper.updateSanity(player, 25);
    player.heal(15);
    player.potionEffects.add('minecraft:regeneration', 20 * 30, 1);
    player.potionEffects.add('minecraft:absorption', 20 * 120, 1);
});


FoodEatenevents.register("exploding_chocolate_bar", function (event, player, magicData) {
    if (!(event.item.getId() == "kubejs:exploding_chocolate_bar")) return;
    // 其他正面效果
    player.heal(6);
    if (Math.random() < 0.25) {
        player.level.createExplosion(player.x, player.y + 0.5, player.z)
            .explosionMode("none")
            .causesFire(false)
            .strength(1)
            .explode();
    }
});
// 实体清理配置
const CLEANUP_CONFIG = {
    enabled: false,     // 是否启用自动清理
    interval: 12000,    // 清理间隔(ticks)
    radius: 96,         // 清理半径(方块)
    debug: false,       // 调试模式
    enableWhitelist: false, // 是否启用白名单功能
    notifyPlayers: true,    // 是否通知玩家清理结果
    notifyMessage: "message.cleanup.notify",

    // 保留规则_支持通配符(*)
    whitelist: [
        "minecraft:player",
        "minecraft:villager",
        "guardvillagers:guard",
        "minecraft:iron_golem",
        "minecraft:item_frame",
        "minecraft:armor_stand",
        "minecraft:painting",
        "bosses_of_mass_destruction:*",     //祸乱鬼魅
        "iceandfire:*",     //冰火传说
        "create:*",         //机械动力
        "cataclysm:*",      //灾变
        "endrem:*"          //末地创世
    ],
    // 新增黑名单（若白名单禁用,则只清理黑名单内内容）
    blacklist: [
        "aquaculture:spectral_water_arrow",
        "aquaculture:water_arrow",
        "cataclysm:phantom_arrow",
        "iceandfire:amphithere_arrow",
        "iceandfire:hydra_arrow",
        "iceandfire:sea_serpent_arrow",
        "iceandfire:stymphalian_arrow",
        "iceandfire:dragon_arrow",
        "irons_spellbooks:small_magic_arrow",
        "irons_spellbooks:poison_arrow",
        "silentgear:arrow",
        "minecraft:arrow",
        "minecraft:item",
        "minecraft:spectral_arrow",
        "minecraft:experience_orb",
        "minecraft:area_effect_cloud",
        "minecraft:firework_rocket"
    ],
    keepNamed: true   // 保留有名称的实体
};

// 判断字符串是否匹配通配符模式
function matchesWildcard(pattern, str) {
    const regex = new RegExp('^' + pattern.replace(/\*/g, '.*') + '$');
    return regex.test(str);
}

// 判断是否保留实体
function shouldKeepEntity(entity) {
    const type = entity.type.toString();

    // 永远保留玩家实体 (修复了配置不当能把玩家清理掉的问题)
    if (type === "minecraft:player") {
        return true;
    }

    // 黑名单检查（强制清理）
    for (let pattern of CLEANUP_CONFIG.blacklist) {
        if (matchesWildcard(pattern, type)) {
            if (CLEANUP_CONFIG.debug) {
                console.log(`[黑名单] 强制清理实体: ${type}`);
            }
            return false; // 明确不保留
        }
    }

    // 如果白名单功能启用，则检查白名单
    if (CLEANUP_CONFIG.enableWhitelist) {
        let inWhitelist = false;
        // 白名单检查(支持通配符)
        for (let pattern of CLEANUP_CONFIG.whitelist) {
            if (matchesWildcard(pattern, type)) {
                inWhitelist = true;
                break;
            }
        }
        // 如果不在白名单中，则不保留
        if (!inWhitelist) {
            return false;
        }
    }

    // 保留有名称的实体
    if (CLEANUP_CONFIG.keepNamed && entity.getCustomName()) {
        return true;
    }

    // 如果白名单禁用且不在黑名单中，则保留实体
    return !CLEANUP_CONFIG.enableWhitelist;
}

function executeEntityCleanup(world, centerPos) {
    const entities = [];
    const radius = CLEANUP_CONFIG.radius;
    const centerX = centerPos.x;
    const centerY = centerPos.y;
    const centerZ = centerPos.z;

    // 直接遍历世界实体
    for (let entity of world.getEntities()) {
        if (Math.abs(entity.x - centerX) > radius) continue;
        if (Math.abs(entity.y - centerY) > radius) continue;
        if (Math.abs(entity.z - centerZ) > radius) continue;

        entities.push(entity);
    }

    let cleanedCount = 0;
    for (let entity of entities) {
        if (shouldKeepEntity(entity)) continue;
        entity.discard();
        cleanedCount++;
        if (CLEANUP_CONFIG.debug) console.log(`[清理] 已移除实体: ${entity.type}`);
    }

    return cleanedCount;
}
// 定时执行清理
ServerEvents.tick(event => {
    // 如果自动清理被禁用，则直接返回
    if (!CLEANUP_CONFIG.enabled) return;

    if (event.server.getTickCount() % CLEANUP_CONFIG.interval !== 0) return;

    const worlds = [
        'minecraft:overworld',
        'minecraft:the_nether',
        'minecraft:the_end',
        "iceandfire:dread_land"
    ];

    // 记录总清理数量
    let totalCleaned = 0;

    // 在每个世界以玩家为中心执行清理
    worlds.forEach(worldName => {
        const world = event.server.getLevel(worldName);
        if (!world) return;

        const players = world.getPlayers();
        for (let player of players) {
            const cleaned = executeEntityCleanup(world, player.blockPosition());
            totalCleaned += cleaned;
            /*
            // 向玩家发送个人清理通知
            if (CLEANUP_CONFIG.notifyPlayers && cleaned > 0) {
                player.tell(CLEANUP_CONFIG.notifyMessage.replace("{count}", cleaned));
            }
            */
        }
    });

    // 发送全局清理通知（如果至少清理了一个实体）
    if (CLEANUP_CONFIG.notifyPlayers && totalCleaned > 0) {
        event.server.scheduleInTicks(1, (callback) => {
            event.server.runCommandSilent(
                `tellraw @a ["",{"text":"[自动清理] ","color":"green"},{"text":"已清理 ${totalCleaned} 个实体","color":"white"}]`
            );
        });
    }
});
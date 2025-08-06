const HEALTH_MODIFIER_ID = 'death_based_health';
const DEATH_COUNT_KEY = 'player_deaths';
const SYSTEM_ENABLED_KEY = 'death_system_enabled';

// 全局系统状态
const systemEnabledByDefault = false;

// 更新玩家生命值
function updateHealth(player) {
    const pData = player.persistentData;

    // 如果系统被禁用，恢复原始生命值
    if (!isSystemEnabledForPlayer(player)) {
        const attribute = player.getAttribute('minecraft:generic.max_health');
        const modifiers = attribute.getModifiers();
        for (let modifier of modifiers) {
            if (modifier.id.toString() === HEALTH_MODIFIER_ID) {
                attribute.removeModifier(modifier);
                break;
            }
        }
        player.setHealth(Math.min(player.getHealth(), attribute.getBaseValue()));
        return;
    }

    if (!pData.contains(DEATH_COUNT_KEY)) {
        pData.putInt(DEATH_COUNT_KEY, 0);
    }

    const deaths = pData.getInt(DEATH_COUNT_KEY);
    const maxHealth = Math.max(2, 20 - (deaths * 2));

    const attribute = player.getAttribute('minecraft:generic.max_health');

    const modifiers = attribute.getModifiers();
    for (let modifier of modifiers) {
        if (modifier.id.toString() === HEALTH_MODIFIER_ID) {
            attribute.removeModifier(modifier);
            break;
        }
    }

    const baseHealth = attribute.getBaseValue();
    const difference = maxHealth - baseHealth;

    if (difference !== 0) {
        player.modifyAttribute(
            'minecraft:generic.max_health',
            HEALTH_MODIFIER_ID,
            difference,
            'add_value'
        );
    }

    player.setHealth(Math.min(player.getHealth(), maxHealth));
}

// 检查系统是否对特定玩家启用
function isSystemEnabledForPlayer(player) {
    const pData = player.persistentData;
    if (!pData.contains(SYSTEM_ENABLED_KEY)) {
        return systemEnabledByDefault;
    }
    return pData.getBoolean(SYSTEM_ENABLED_KEY);
}

// 设置系统对特定玩家的启用状态
function setSystemEnabledForPlayer(player, enabled) {
    player.persistentData.putBoolean(SYSTEM_ENABLED_KEY, enabled);
    updateHealth(player);
}

// 玩家死亡时处理
EntityEvents.death(event => {
    const player = event.entity;
    if (!player.isPlayer()) return;
    if (!isSystemEnabledForPlayer(player)) return;

    const pData = player.persistentData;

    let deaths = 0;
    if (pData.contains(DEATH_COUNT_KEY)) {
        deaths = pData.getInt(DEATH_COUNT_KEY);
    }
    pData.putInt(DEATH_COUNT_KEY, deaths + 1);

    player.server.scheduleInTicks(10, () => {
        updateHealth(player);
        player.tell(`§c你能感觉到灵魂正在消散，身体越发虚弱... 已遗失碎片: ${deaths + 1}`);
    });
});

// 食用恢复
ItemEvents.foodEaten(event => {
    if (!event.player) return;

    const player = event.player;
    if (!isSystemEnabledForPlayer(player)) return;

    const pData = player.persistentData;

    if (['minecraft:golden_apple', 'minecraft:enchanted_golden_apple'].includes(event.item.id)) {
        let deaths = 0;
        if (pData.contains(DEATH_COUNT_KEY)) {
            deaths = pData.getInt(DEATH_COUNT_KEY);
        }

        if (deaths > 0) {
            pData.putInt(DEATH_COUNT_KEY, deaths - 1);
            updateHealth(player);
            player.tell(`§a灵魂的创伤开始愈合，虚弱感正在消退...剩余缺失：${deaths - 1}`);
        }
    }
});

// 玩家登录/重生时同步
PlayerEvents.loggedIn(event => updateHealth(event.player));
PlayerEvents.respawned(event => updateHealth(event.player));

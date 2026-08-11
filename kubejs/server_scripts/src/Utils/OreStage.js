//priority: 999
/**
 * 矿石阶段系统配置
 * @param {string} stageName - 阶段名称
 */
function OreStageSystem(stageName) {
    this.type = "reverie_foundry:stage";
    this.stageName = stageName;
    this.hiddenOres = [];
    this.stageIndex = -1;
}

OreStageSystem.prototype = {
    /**
     * 添加需要隐藏的矿石
     * @param {string} originalOre - 原始矿石ID
     * @param {string} replacement - 替换为的物品ID
     */
    hideOre: function (originalOre, replacement) {
        this.hiddenOres.push({
            original: originalOre,
            replacement: replacement
        });
        return this;
    },

    /**
     * 设置阶段索引
     * @param {number} index - 阶段索引
     */
    setStageIndex: function (index) {
        this.stageIndex = index;
        return this;
    }
};

// 主系统管理器
var ReverieFoundry = {
    stages: [],
    debugMode: true,

    /**
     * 注册阶段
     * @param {OreStageSystem} stage - 阶段配置
     */
    registerStage: function (stage) {
        stage.setStageIndex(this.stages.length);
        this.stages.push(stage);

        if (this.debugMode) {
            console.log("[Reverie Foundry] 注册阶段: " + stage.stageName + " (索引: " + stage.stageIndex + ")");
        }
        return this;
    },

    /**
     * 启用调试模式
     * @param {boolean} enabled - 是否启用调试模式
     */
    setDebug: function (enabled) {
        this.debugMode = enabled;
        if (enabled) {
            console.log("[Reverie Foundry] 调试模式: " + enabled);
        }
        return this;
    },

    /**
     * 检查玩家是否已解锁阶段
     * @param {string} stageName - 阶段名称
     * @param {Internal.Player} player - 玩家对象
     */
    playerHasStage: function (stageName, player) {
        if (!player) return false;
        return AStages.playerHasStage(stageName, player);
    },

    /**
     * 检查某个矿石是否需要被隐藏
     * @param {string} oreId - 矿石ID
     * @param {Internal.Player} player - 玩家对象
     */
    checkOreShouldBeHidden: function (oreId, player) {
        if (!player) return null;

        for (var stageIndex = 0; stageIndex < this.stages.length; stageIndex++) {
            var stage = this.stages[stageIndex];
            if (!stage) continue;

            if (this.playerHasStage(stage.stageName, player)) {
                continue;
            }

            for (var j = 0; j < stage.hiddenOres.length; j++) {
                var oreConfig = stage.hiddenOres[j];
                if (oreId === oreConfig.original) {
                    if (this.debugMode) {
                        console.log("[Reverie Foundry] 发现需要为玩家 " + player.getName().getString() + " 隐藏的矿石: " + oreId + " (阶段" + stage.stageName + "未解锁)");
                    }
                    return oreConfig;
                }
            }
        }
        return null;
    }
};

ServerEvents.loaded(event => {
    if (ReverieFoundry.debugMode) {
        console.log("[Reverie Foundry] 已注册阶段数量: " + ReverieFoundry.stages.length);
    }
});



EntityEvents.spawned('minecraft:item', event => {
    let itemEntity = event.getEntity();
    let itemStack = itemEntity.getItem();
    let itemId = itemStack.id;

    let isHiddenOre = false;
    let defaultReplacement = null;

    for (var stageIndex = 0; stageIndex < ReverieFoundry.stages.length; stageIndex++) {
        var stage = ReverieFoundry.stages[stageIndex];
        if (!stage) continue;

        for (var j = 0; j < stage.hiddenOres.length; j++) {
            var oreConfig = stage.hiddenOres[j];
            if (itemId === oreConfig.original) {
                isHiddenOre = true;
                defaultReplacement = oreConfig.replacement;
                break;
            }
        }
        if (isHiddenOre) break;
    }

    if (!isHiddenOre) return;

    let players = itemEntity.level.getPlayers();

    if (players.isEmpty()) {
        let oldStack = itemEntity.getItem();
        let newItem = Item.of(defaultReplacement, oldStack.count);
        itemEntity.setItem(newItem);

        if (ReverieFoundry.debugMode) {
            console.log("[Reverie Foundry] 默认替换矿石（无玩家）: " + itemId + " -> " + defaultReplacement);
        }
        return;
    }

    let closestPlayer = null;
    let closestDistance = Infinity;

    players.forEach(function (player) {
        let distance = player.distanceToSqr(itemEntity);
        if (distance < closestDistance) {
            closestDistance = distance;
            closestPlayer = player;
        }
    });

    if (!closestPlayer) {
        let oldStack = itemEntity.getItem();
        let newItem = Item.of(defaultReplacement, oldStack.count);
        itemEntity.setItem(newItem);
        return;
    }

    let oreConfig = ReverieFoundry.checkOreShouldBeHidden(itemId, closestPlayer);

    if (oreConfig) {
        let oldStack = itemEntity.getItem();
        let newItem = Item.of(oreConfig.replacement, oldStack.count);
        itemEntity.setItem(newItem);

        if (ReverieFoundry.debugMode) {
            console.log("[Reverie Foundry] 为最近的玩家 " + closestPlayer.getName().getString() + " 隐藏矿石: " + oreConfig.original + " -> " + oreConfig.replacement + " (距离: " + Math.sqrt(closestDistance).toFixed(1) + "格)");
        }
    } else {
        if (ReverieFoundry.debugMode) {
            console.log("[Reverie Foundry] 最近的玩家 " + closestPlayer.getName().getString() + " 已解锁，保持矿石原样: " + itemId);
        }
    }
});
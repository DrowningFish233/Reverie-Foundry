// priority: 999
/**
 * 矿石阶段系统配置
 * @param {string} stageName - 阶段名称
 */
function OreStageSystem(stageName) {
    this.type = "reverie_foundry:stage";
    this.stageName = stageName;
    this.requiredKills = [];
    this.hiddenOres = [];
    this.stageIndex = -1;
}

OreStageSystem.prototype = {
    /**
     * 添加需要杀死的生物
     * @param {string} entityId - 实体ID
     * @param {number} count - 需要杀死的数量
     */
    requireKill: function (entityId, count) {
        this.requiredKills.push({
            entity: entityId,
            count: count
        });
        return this;
    },

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
     * 检查玩家是否已解锁阶段 (使用AStages)
     * @param {string} stageName - 阶段名称
     * @param {Internal.Player} player - 玩家对象
     */
    playerHasStage: function (stageName, player) {
        if (!player) return false;
        return AStages.playerHasStage(stageName, player);
    },

    /**
     * 为玩家添加阶段 (使用AStages)
     * @param {string} stageName - 阶段名称
     * @param {Internal.Player} player - 玩家对象
     */
    addPlayerStage: function (stageName, player) {
        if (!player) return false;

        if (!this.playerHasStage(stageName, player)) {
            AStages.addStageToPlayer(stageName, player);
            if (this.debugMode) {
                console.log("[Reverie Foundry] 为玩家 " + player.getName().getString() + " 添加阶段: " + stageName);
            }
            return true;
        }
        return false;
    },

    /**
     * 移除玩家阶段 (使用AStages)
     * @param {string} stageName - 阶段名称
     * @param {Internal.Player} player - 玩家对象
     */
    removePlayerStage: function (stageName, player) {
        if (!player) return false;

        if (this.playerHasStage(stageName, player)) {
            AStages.removeStageFromPlayer(stageName, player);
            if (this.debugMode) {
                console.log("[Reverie Foundry] 为玩家 " + player.getName().getString() + " 移除阶段: " + stageName);
            }
            return true;
        }
        return false;
    },

    /**
     * 移除玩家所有阶段 (使用AStages)
     * @param {Internal.Player} player - 玩家对象
     */
    removeAllPlayerStages: function (player) {
        if (!player) return;

        AStages.removeAllStagesFromPlayer(player);
        if (this.debugMode) {
            console.log("[Reverie Foundry] 移除玩家 " + player.getName().getString() + " 的所有阶段");
        }
    },

    /**
     * 检查玩家是否拥有至少一个阶段 (使用AStages)
     * @param {Array<string>} stages - 阶段名称列表
     * @param {Internal.Player} player - 玩家对象
     */
    playerHasAtLeastOneStage: function (stages, player) {
        if (!player || !stages || stages.length === 0) return false;
        return AStages.playerHasAtLeastOneStage(stages, player);
    },

    /**
     * 检查玩家是否拥有所有阶段 (使用AStages)
     * @param {Array<string>} stages - 阶段名称列表
     * @param {Internal.Player} player - 玩家对象
     */
    playerHasAllStages: function (stages, player) {
        if (!player || !stages || stages.length === 0) return false;
        return AStages.playerHasAllStages(stages, player);
    },

    /**
     * 获取玩家所有阶段 (使用AStages)
     * @param {Internal.Player} player - 玩家对象
     */
    getPlayerStages: function (player) {
        if (!player) return [];
        return AStages.getStagesFromPlayer(player);
    },

    /**
     * 检查玩家是否已解锁某个阶段索引
     * @param {number} stageIndex - 阶段索引
     * @param {Internal.Player} player - 玩家对象
     */
    isStageUnlocked: function (stageIndex, player) {
        if (!player || stageIndex < 0 || stageIndex >= this.stages.length) return false;
        return this.playerHasStage(this.stages[stageIndex].stageName, player);
    },

    /**
     * 获取玩家当前最高解锁阶段
     * @param {Internal.Player} player - 玩家对象
     */
    getHighestUnlockedStage: function (player) {
        if (!player) return -1;

        for (var i = this.stages.length - 1; i >= 0; i--) {
            if (this.playerHasStage(this.stages[i].stageName, player)) {
                return i;
            }
        }
        return -1;
    },

    /**
     * 获取玩家当前阶段名称
     * @param {Internal.Player} player - 玩家对象
     */
    getCurrentStageName: function (player) {
        var highestStage = this.getHighestUnlockedStage(player);
        if (highestStage >= 0 && highestStage < this.stages.length) {
            return this.stages[highestStage].stageName;
        }
        return "无";
    },

    /**
     * 检查玩家进度并更新阶段
     * @param {Internal.Player} player - 玩家对象
     * @param {Object} killData - 击杀数据（从玩家持久数据获取）
     */
    updatePlayerProgress: function (player, killData) {
        if (!player) return;

        var highestStage = this.getHighestUnlockedStage(player);
        if (this.debugMode) {
            console.log("[Reverie Foundry] 检查玩家 " + player.getName().getString() + " 进度，当前最高阶段: " + highestStage);
        }

        // 从最高阶段+1开始检查
        for (var i = highestStage + 1; i < this.stages.length; i++) {
            var stage = this.stages[i];
            if (!stage) continue;

            // 检查是否满足所有击杀要求
            var allRequirementsMet = true;
            for (var j = 0; j < stage.requiredKills.length; j++) {
                var killReq = stage.requiredKills[j];
                var currentKills = killData[killReq.entity] || 0;

                if (this.debugMode) {
                    console.log("[Reverie Foundry] 检查阶段" + i + ": 需要" + killReq.entity + " x " + killReq.count + ", 当前: " + currentKills);
                }

                if (currentKills < killReq.count) {
                    allRequirementsMet = false;
                    break;
                }
            }

            if (allRequirementsMet) {
                // 解锁阶段
                this.addPlayerStage(stage.stageName, player);

                if (this.debugMode) {
                    console.log("[Reverie Foundry] 玩家 " + player.getName().getString() + " 解锁新阶段: " + stage.stageName);
                }
            } else {
                // 如果这个阶段未完成，后面的阶段也不会解锁
                if (this.debugMode) {
                    console.log("[Reverie Foundry] 阶段" + i + "未完成，停止检查后续阶段");
                }
                break;
            }
        }
    },

    /**
     * 获取玩家的击杀数据
     * @param {Internal.Player} player - 玩家对象
     */
    getPlayerKillData: function (player) {
        if (!player) return {};

        var persistentData = player.persistentData;
        if (!persistentData.contains("reverie_foundry_kills")) {
            persistentData.putCompound("reverie_foundry_kills", {});
        }
        return persistentData.getCompound("reverie_foundry_kills");
    },

    /**
     * 保存玩家的击杀数据
     * @param {Internal.Player} player - 玩家对象
     * @param {Object} killData - 击杀数据
     */
    savePlayerKillData: function (player, killData) {
        if (!player) return;

        var persistentData = player.persistentData;
        persistentData.putCompound("reverie_foundry_kills", killData);
    },

    /**
     * 增加玩家击杀计数
     * @param {Internal.Player} player - 玩家对象
     * @param {string} entityId - 实体ID
     */
    addPlayerKill: function (player, entityId) {
        if (!player) return;

        var killData = this.getPlayerKillData(player);
        var currentCount = killData[entityId] || 0;
        killData[entityId] = currentCount + 1;

        if (this.debugMode) {
            console.log("[Reverie Foundry] 玩家 " + player.getName().getString() + " 击杀: " + entityId + ", 当前: " + (currentCount + 1));
        }

        this.savePlayerKillData(player, killData);

        // 检查并更新玩家进度
        this.updatePlayerProgress(player, killData);
    },

    /**
     * 检查某个矿石是否需要被隐藏（基于玩家）
     * @param {string} oreId - 矿石ID
     * @param {Internal.Player} player - 玩家对象
     */
    checkOreShouldBeHidden: function (oreId, player) {
        if (!player) return null;

        // 检查所有阶段
        for (var stageIndex = 0; stageIndex < this.stages.length; stageIndex++) {
            var stage = this.stages[stageIndex];
            if (!stage) continue;

            // 如果玩家已经解锁这个阶段，那么这个阶段的矿石就不应该被隐藏
            if (this.isStageUnlocked(stageIndex, player)) {
                if (this.debugMode) {
                    console.log("[Reverie Foundry] 玩家 " + player.getName().getString() + " 已解锁阶段" + stageIndex + "，跳过矿石隐藏检查");
                }
                continue;
            }

            // 阶段未解锁，检查是否需要隐藏矿石
            for (var j = 0; j < stage.hiddenOres.length; j++) {
                var oreConfig = stage.hiddenOres[j];
                if (oreId === oreConfig.original) {
                    if (this.debugMode) {
                        console.log("[Reverie Foundry] 发现需要为玩家 " + player.getName().getString() + " 隐藏的矿石: " + oreId + " (阶段" + stageIndex + "未解锁)");
                    }
                    return oreConfig;
                }
            }
        }
        return null;
    },

    /**
     * 获取玩家的阶段信息
     * @param {Internal.Player} player - 玩家对象
     */
    getPlayerStageInfo: function (player) {
        if (!player) return null;

        var killData = this.getPlayerKillData(player);
        var stages = [];

        for (var i = 0; i < this.stages.length; i++) {
            var stage = this.stages[i];
            var isUnlocked = this.isStageUnlocked(i, player);

            var killRequirements = [];
            for (var j = 0; j < stage.requiredKills.length; j++) {
                var killReq = stage.requiredKills[j];
                killRequirements.push({
                    entity: killReq.entity,
                    requiredCount: killReq.count,
                    currentCount: killData[killReq.entity] || 0,
                    completed: (killData[killReq.entity] || 0) >= killReq.count
                });
            }

            stages.push({
                index: i,
                name: stage.stageName,
                unlocked: isUnlocked,
                killRequirements: killRequirements
            });
        }

        return {
            player: player.getName().getString(),
            currentStage: this.getCurrentStageName(player),
            highestStage: this.getHighestUnlockedStage(player),
            allStages: this.getPlayerStages(player),
            stages: stages
        };
    },

    /**
     * 重置玩家的数据
     * @param {Internal.Player} player - 玩家对象
     */
    resetPlayerData: function (player) {
        if (!player) return;

        // 清除所有阶段
        this.removeAllPlayerStages(player);

        // 清除击杀数据
        var persistentData = player.persistentData;
        persistentData.putCompound("reverie_foundry_kills", {});

        if (this.debugMode) {
            console.log("[Reverie Foundry] 已重置玩家 " + player.getName().getString() + " 的数据");
        }
    },

    /**
     * 为所有在线玩家检查进度
     */
    checkAllOnlinePlayers: function () {
        var server = Utils.getServer();
        if (!server) return;

        var players = server.getPlayers();
        players.forEach(function (player) {
            var killData = this.getPlayerKillData(player);
            this.updatePlayerProgress(player, killData);
        }.bind(this));
    }
};
ServerEvents.loaded(event => {
    if (ReverieFoundry.debugMode) {
        console.log("[Reverie Foundry] 已注册阶段数量: " + ReverieFoundry.stages.length);
    }
});

EntityEvents.death(event => {
    let entity = event.getEntity();
    let source = event.getSource();
    let player = source.getPlayer();

    if (!player) return;

    let entityId = entity.getType();

    ReverieFoundry.addPlayerKill(player, entityId);
});

EntityEvents.spawned('minecraft:item', event => {
    let itemEntity = event.getEntity();
    let itemStack = itemEntity.getItem();
    let itemId = itemStack.id;

    // 尝试获取附近的玩家
    let nearbyPlayers = itemEntity.level.getPlayers();
    if (nearbyPlayers.isEmpty()) return;

    // 使用最近的玩家来判断阶段
    let closestPlayer = null;
    let closestDistance = 16;

    nearbyPlayers.forEach(function (player) {
        let distance = player.distanceToSqr(itemEntity);
        if (distance < closestDistance) {
            closestDistance = distance;
            closestPlayer = player;
        }
    });

    if (!closestPlayer) return;

    let oreConfig = ReverieFoundry.checkOreShouldBeHidden(itemId, closestPlayer);

    if (oreConfig) {
        let oldStack = itemEntity.getItem();
        let newItem = Item.of(oreConfig.replacement, oldStack.count);
        itemEntity.setItem(newItem);

        if (ReverieFoundry.debugMode) {
            console.log("[Reverie Foundry] 为玩家 " + closestPlayer.getName().getString() + " 隐藏矿石: " + oreConfig.original + " -> " + oreConfig.replacement);
        }
    } else if (ReverieFoundry.debugMode) {
        console.log("[Reverie Foundry] 矿石 " + itemId + " 不需要为玩家 " + closestPlayer.getName().getString() + " 隐藏");
    }
});


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
            count: count,
            achieved: false  // 是否已完成该击杀条件
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
    server: null,
    data: null,
    debugMode: true,

    // 持久化数据的key
    DATA_KEY: "reverie_foundry_data",

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
     * 设置服务器实例（必须在初始化前调用）
     * @param {Internal.Server} server - 服务器实例
     */
    setServer: function (server) {
        this.server = server;
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
     * 获取持久化数据字符串
     */
    getPersistentDataString: function () {
        if (!this.server) {
            console.error("[Reverie Foundry] 错误：未设置服务器实例");
            return null;
        }

        return this.server.persistentData.contains(this.DATA_KEY)
            ? this.server.persistentData.getString(this.DATA_KEY)
            : null;
    },

    /**
     * 保存数据到持久化存储
     */
    savePersistentData: function () {
        if (!this.server) {
            console.error("[Reverie Foundry] 错误：未设置服务器实例");
            return this;
        }

        // 将数据转换为JSON字符串存储
        var jsonString = JSON.stringify(this.data);
        this.server.persistentData.putString(this.DATA_KEY, jsonString);
        // 注意：KubeJS的persistentData会在putString后自动保存，不需要手动调用save()

        if (this.debugMode) {
            console.log("[Reverie Foundry] 数据已保存到持久化存储");
        }
        return this;
    },

    /**
     * 验证阶段配置是否有效
     * @param {number} stageIndex - 阶段索引
     * @returns {boolean} 是否有效
     */
    validateStageConfig: function (stageIndex) {
        // 检查阶段索引是否有效
        if (stageIndex < 0 || stageIndex >= this.stages.length) {
            if (this.debugMode) {
                console.log("[Reverie Foundry] 验证失败: 无效的阶段索引 " + stageIndex);
            }
            return false;
        }

        var stage = this.stages[stageIndex];
        if (!stage) {
            if (this.debugMode) {
                console.log("[Reverie Foundry] 验证失败: 阶段 " + stageIndex + " 不存在");
            }
            return false;
        }

        // 检查阶段名称是否匹配
        var configStage = null;
        for (var i = 0; i < this.data.stageProgress.length; i++) {
            if (this.data.stageProgress[i].stageIndex === stageIndex) {
                configStage = this.data.stageProgress[i];
                break;
            }
        }

        if (!configStage) {
            if (this.debugMode) {
                console.log("[Reverie Foundry] 验证失败: 配置中找不到阶段 " + stageIndex);
            }
            return false;
        }

        if (configStage.stageName !== stage.stageName) {
            if (this.debugMode) {
                console.log("[Reverie Foundry] 验证失败: 阶段名称不匹配 - 代码: " + stage.stageName + ", 配置: " + configStage.stageName);
            }
            return false;
        }

        // 检查击杀要求数量是否匹配
        if (configStage.killRequirements.length !== stage.requiredKills.length) {
            if (this.debugMode) {
                console.log("[Reverie Foundry] 验证失败: 击杀要求数量不匹配 - 代码: " + stage.requiredKills.length + ", 配置: " + configStage.killRequirements.length);
            }
            return false;
        }

        // 检查每个击杀要求是否匹配
        for (var j = 0; j < stage.requiredKills.length; j++) {
            var codeKillReq = stage.requiredKills[j];
            var configKillReq = configStage.killRequirements[j];

            if (!configKillReq) {
                if (this.debugMode) {
                    console.log("[Reverie Foundry] 验证失败: 配置中缺少击杀要求 " + j);
                }
                return false;
            }

            if (configKillReq.entity !== codeKillReq.entity) {
                if (this.debugMode) {
                    console.log("[Reverie Foundry] 验证失败: 实体不匹配 - 代码: " + codeKillReq.entity + ", 配置: " + configKillReq.entity);
                }
                return false;
            }

            if (configKillReq.requiredCount !== codeKillReq.count) {
                if (this.debugMode) {
                    console.log("[Reverie Foundry] 验证失败: 所需数量不匹配 - 代码: " + codeKillReq.count + ", 配置: " + configKillReq.requiredCount);
                }
                return false;
            }
        }

        return true;
    },

    /**
     * 清理无效的阶段配置
     */
    cleanupInvalidConfig: function () {
        if (!this.data || !this.data.stageProgress) {
            return this;
        }

        var validStages = [];
        var validUnlockedStages = [];
        var changed = false;

        // 清理阶段进度
        for (var i = 0; i < this.data.stageProgress.length; i++) {
            var stageProgress = this.data.stageProgress[i];
            var stageIndex = stageProgress.stageIndex;

            if (this.validateStageConfig(stageIndex)) {
                validStages.push(stageProgress);

                // 如果这个阶段在解锁列表中则保留
                if (this.data.unlockedStages.includes(stageIndex)) {
                    validUnlockedStages.push(stageIndex);
                }
            } else {
                changed = true;
                if (this.debugMode) {
                    console.log("[Reverie Foundry] 清理无效的阶段配置: " + stageIndex + " (" + stageProgress.stageName + ")");
                }
            }
        }

        // 清理全局击杀计数，只保留有效实体的计数
        var validGlobalKills = {};
        for (var entityId in this.data.globalKills) {
            if (this.data.globalKills.hasOwnProperty(entityId)) {
                // 检查这个实体是否在任何有效阶段中需要
                var entityNeeded = false;
                for (var i = 0; i < this.stages.length; i++) {
                    var stage = this.stages[i];
                    for (var j = 0; j < stage.requiredKills.length; j++) {
                        if (stage.requiredKills[j].entity === entityId) {
                            entityNeeded = true;
                            break;
                        }
                    }
                    if (entityNeeded) break;
                }

                if (entityNeeded) {
                    validGlobalKills[entityId] = this.data.globalKills[entityId];
                } else {
                    changed = true;
                    if (this.debugMode) {
                        console.log("[Reverie Foundry] 清理无效的全局击杀计数: " + entityId);
                    }
                }
            }
        }

        // 清理解锁阶段，只保留有效的
        var cleanedUnlockedStages = [];
        for (var i = 0; i < this.data.unlockedStages.length; i++) {
            var stageIndex = this.data.unlockedStages[i];
            if (stageIndex >= 0 && stageIndex < this.stages.length) {
                cleanedUnlockedStages.push(stageIndex);
            } else {
                changed = true;
                if (this.debugMode) {
                    console.log("[Reverie Foundry] 清理无效的解锁阶段索引: " + stageIndex);
                }
            }
        }

        if (changed) {
            this.data.stageProgress = validStages;
            this.data.globalKills = validGlobalKills;
            this.data.unlockedStages = cleanedUnlockedStages;

            if (this.debugMode) {
                console.log("[Reverie Foundry] 已清理无效配置数据");
            }
        }

        return this;
    },

    /**
     * 修复配置数据结构
     */
    repairConfigStructure: function () {
        if (!this.data) {
            return this;
        }

        var changed = false;

        // 确保必要字段存在
        if (!this.data.version) {
            this.data.version = "1.0.0";
            changed = true;
        }

        if (!this.data.stageProgress) {
            this.data.stageProgress = [];
            changed = true;
        }

        if (!this.data.globalKills) {
            this.data.globalKills = {};
            changed = true;
        }

        if (!this.data.unlockedStages) {
            this.data.unlockedStages = [];
            changed = true;
        }

        // 修复阶段进度数组
        if (!Array.isArray(this.data.stageProgress)) {
            this.data.stageProgress = [];
            changed = true;
        }

        // 修复全局击杀对象
        if (typeof this.data.globalKills !== 'object' || this.data.globalKills === null) {
            this.data.globalKills = {};
            changed = true;
        }

        // 修复解锁阶段数组
        if (!Array.isArray(this.data.unlockedStages)) {
            this.data.unlockedStages = [];
            changed = true;
        }

        var validUnlockedStages = [];
        for (var i = 0; i < this.data.unlockedStages.length; i++) {
            var stageIndex = this.data.unlockedStages[i];
            if (typeof stageIndex === 'number' && stageIndex >= 0 && stageIndex < this.stages.length) {
                validUnlockedStages.push(stageIndex);
            } else {
                changed = true;
            }
        }
        this.data.unlockedStages = validUnlockedStages;

        if (changed && this.debugMode) {
            console.log("[Reverie Foundry] 已修复配置数据结构");
        }

        return this;
    },

    /**
     * 创建默认配置
     */
    createDefaultConfig: function () {
        this.data = {
            version: "1.0.0",
            stageProgress: [],
            globalKills: {},
            unlockedStages: [],
            lastUpdated: Date.now()
        };

        // 为每个注册的阶段创建进度记录
        for (var i = 0; i < this.stages.length; i++) {
            var stage = this.stages[i];
            var stageProgress = {
                stageIndex: i,
                stageName: stage.stageName,
                killRequirements: [],
                completed: false
            };

            for (var j = 0; j < stage.requiredKills.length; j++) {
                var killReq = stage.requiredKills[j];
                stageProgress.killRequirements.push({
                    entity: killReq.entity,
                    requiredCount: killReq.count,
                    currentCount: 0,
                    completed: false
                });
            }

            this.data.stageProgress.push(stageProgress);
        }

        if (this.debugMode) {
            console.log("[Reverie Foundry] 已创建默认配置");
        }

        return this;
    },

    /**
     * 加载持久化数据并进行安全验证
     */
    loadConfig: function () {
        if (!this.server) {
            console.error("[Reverie Foundry] 错误：未设置服务器实例");
            return this;
        }

        try {
            // 尝试从持久化数据加载
            var dataString = this.getPersistentDataString();

            if (dataString && dataString.trim() !== '') {
                // 解析数据
                this.data = JSON.parse(dataString);
                // 修复数据结构
                this.repairConfigStructure();
                // 清理无效配置
                this.cleanupInvalidConfig();

                if (this.debugMode) {
                    console.log("[Reverie Foundry] 已从持久化数据加载");
                    console.log("[Reverie Foundry] 已解锁阶段: " + this.data.unlockedStages.join(", "));
                    console.log("[Reverie Foundry] 全局击杀: ", this.data.globalKills);
                }
            } else {
                // 没有数据或数据为空，创建默认配置
                if (this.debugMode) {
                    console.log("[Reverie Foundry] 持久化数据不存在或为空，创建默认配置");
                }
                this.createDefaultConfig();
                this.savePersistentData();
            }
        } catch (e) {
            console.error("[Reverie Foundry] 加载持久化数据失败: " + e.message);
            console.log("[Reverie Foundry] 将创建默认配置");

            // 创建默认配置
            this.createDefaultConfig();
            this.savePersistentData();
        }

        return this;
    },

    /**
     * 获取当前最高解锁阶段
     */
    getHighestUnlockedStage: function () {
        if (!this.data) this.loadConfig();

        if (this.data.unlockedStages.length === 0) {
            return -1;
        }

        // 获取最大的解锁阶段索引
        var maxStage = -1;
        for (var i = 0; i < this.data.unlockedStages.length; i++) {
            if (this.data.unlockedStages[i] > maxStage) {
                maxStage = this.data.unlockedStages[i];
            }
        }
        return maxStage;
    },

    /**
     * 检查阶段是否已解锁
     * @param {number} stageIndex - 阶段索引
     */
    isStageUnlocked: function (stageIndex) {
        if (!this.data) this.loadConfig();
        return this.data.unlockedStages.includes(stageIndex);
    },

    /**
     * 获取阶段进度
     * @param {number} stageIndex - 阶段索引
     */
    getStageProgress: function (stageIndex) {
        if (!this.data) this.loadConfig();

        // 查找或创建阶段进度
        for (var i = 0; i < this.data.stageProgress.length; i++) {
            if (this.data.stageProgress[i].stageIndex === stageIndex) {
                return this.data.stageProgress[i];
            }
        }

        // 如果不存在，创建新的进度记录
        var stage = this.stages[stageIndex];
        if (!stage) return null;

        var stageProgress = {
            stageIndex: stageIndex,
            stageName: stage.stageName,
            killRequirements: [],
            completed: false
        };

        // 初始化击杀要求
        for (var j = 0; j < stage.requiredKills.length; j++) {
            var killReq = stage.requiredKills[j];
            var currentKills = this.data.globalKills[killReq.entity] || 0;

            stageProgress.killRequirements.push({
                entity: killReq.entity,
                requiredCount: killReq.count,
                currentCount: currentKills,
                completed: currentKills >= killReq.count
            });
        }

        this.data.stageProgress.push(stageProgress);
        return stageProgress;
    },

    /**
     * 检查某个矿石是否需要被隐藏
     * @param {string} oreId - 矿石ID
     */
    checkOreShouldBeHidden: function (oreId) {
        // 检查所有阶段
        for (var stageIndex = 0; stageIndex < this.stages.length; stageIndex++) {
            var stage = this.stages[stageIndex];
            if (!stage) continue;

            // 如果阶段已经解锁，那么这个阶段的矿石就不应该被隐藏
            if (this.isStageUnlocked(stageIndex)) {
                if (this.debugMode) {
                    console.log("[Reverie Foundry] 阶段" + stageIndex + "已解锁，跳过矿石隐藏检查");
                }
                continue;
            }

            // 阶段未解锁，检查是否需要隐藏矿石
            for (var j = 0; j < stage.hiddenOres.length; j++) {
                var oreConfig = stage.hiddenOres[j];
                if (oreId === oreConfig.original) {
                    if (this.debugMode) {
                        console.log("[Reverie Foundry] 发现需要隐藏的矿石: " + oreId + " (阶段" + stageIndex + "未解锁)");
                    }
                    return oreConfig;
                }
            }
        }
        return null;
    },

    /**
     * 更新阶段进度
     */
    updateStageProgress: function () {
        if (!this.data) this.loadConfig();

        var changed = false;
        var highestStage = this.getHighestUnlockedStage();

        if (this.debugMode) {
            console.log("[Reverie Foundry] 开始更新阶段进度，最高解锁阶段: " + highestStage);
        }

        // 从最高阶段+1开始检查
        for (var i = highestStage + 1; i < this.stages.length; i++) {
            var stage = this.stages[i];
            if (!stage) continue;

            var stageProgress = this.getStageProgress(i);

            // 首先同步当前计数
            this.syncStageProgressCounts(stageProgress);

            if (stageProgress.completed) {
                // 如果已经完成但未标记为解锁，解锁它
                if (!this.data.unlockedStages.includes(i)) {
                    this.data.unlockedStages.push(i);
                    changed = true;
                    this.onStageUnlocked(i);
                }
                continue;
            }

            // 检查是否满足所有击杀要求
            var allRequirementsMet = true;
            for (var j = 0; j < stage.requiredKills.length; j++) {
                var killReq = stage.requiredKills[j];
                var currentKills = this.data.globalKills[killReq.entity] || 0;

                if (this.debugMode) {
                    console.log("[Reverie Foundry] 检查阶段" + i + ": 需要" + killReq.entity + " x " + killReq.count + ", 当前: " + currentKills);
                }

                if (currentKills < killReq.count) {
                    allRequirementsMet = false;
                    break;
                }
            }

            if (allRequirementsMet) {
                // 标记阶段为完成
                stageProgress.completed = true;

                // 同步更新击杀要求的completed状态
                for (var k = 0; k < stageProgress.killRequirements.length; k++) {
                    var killRequirement = stageProgress.killRequirements[k];
                    var currentKills = this.data.globalKills[killRequirement.entity] || 0;
                    killRequirement.currentCount = currentKills;
                    killRequirement.completed = (currentKills >= killRequirement.requiredCount);
                }

                // 解锁阶段
                this.data.unlockedStages.push(i);
                changed = true;
                this.onStageUnlocked(i);

                if (this.debugMode) {
                    console.log("[Reverie Foundry] 解锁新阶段: " + stage.stageName);
                }
            } else {
                // 如果这个阶段未完成，后面的阶段也不会解锁
                if (this.debugMode) {
                    console.log("[Reverie Foundry] 阶段" + i + "未完成，停止检查后续阶段");
                }
                break;
            }
        }

        if (changed) {
            this.savePersistentData();
        }
        return this;
    },

    /**
     * 同步阶段进度中的击杀计数
     * @param {Object} stageProgress - 阶段进度对象
     */
    syncStageProgressCounts: function (stageProgress) {
        if (!stageProgress || !stageProgress.killRequirements) return;

        for (var i = 0; i < stageProgress.killRequirements.length; i++) {
            var killRequirement = stageProgress.killRequirements[i];
            var currentKills = this.data.globalKills[killRequirement.entity] || 0;

            // 更新当前计数
            killRequirement.currentCount = currentKills;

            // 重新计算completed状态
            killRequirement.completed = (currentKills >= killRequirement.requiredCount);
        }

        // 重新计算整个阶段是否完成
        var allCompleted = true;
        for (var i = 0; i < stageProgress.killRequirements.length; i++) {
            if (!stageProgress.killRequirements[i].completed) {
                allCompleted = false;
                break;
            }
        }
        stageProgress.completed = allCompleted;
    },

    /**
     * 阶段解锁回调
     * @param {number} stageIndex - 阶段索引
     */
    onStageUnlocked: function (stageIndex) {
        var stage = this.stages[stageIndex];
        if (this.debugMode) {
            console.log("  [Reverie Foundry] 解锁新阶段: " + stage.stageName);
        }
        return this;
    },

    /**
     * 增加击杀计数（仅在必要时）
     * @param {string} entityId - 实体ID
     */
    addKill: function (entityId) {
        if (!this.data) this.loadConfig();

        // 检查是否有未完成的阶段需要这个实体
        var highestStage = this.getHighestUnlockedStage();
        var needsTracking = false;

        // 检查从最高阶段+1开始的所有阶段
        for (var i = highestStage + 1; i < this.stages.length; i++) {
            var stage = this.stages[i];
            if (!stage) continue;

            // 检查这个阶段是否需要这个实体
            for (var j = 0; j < stage.requiredKills.length; j++) {
                if (stage.requiredKills[j].entity === entityId) {
                    needsTracking = true;
                    break;
                }
            }

            if (needsTracking) break;
        }

        if (!needsTracking) {
            // 没有未完成的阶段需要这个实体，跳过计数
            if (this.debugMode) {
                console.log("[Reverie Foundry] 跳过 " + entityId + " 击杀计数（所有相关阶段已完成）");
            }
            return this;
        }

        // 获取当前计数
        var currentCount = this.data.globalKills[entityId] || 0;

        if (this.debugMode) {
            console.log("[Reverie Foundry] 增加击杀前: " + entityId + " = " + currentCount);
        }

        // 更新计数
        var newCount = currentCount + 1;
        this.data.globalKills[entityId] = newCount;

        // 同步所有阶段进度中的计数
        for (var i = 0; i < this.data.stageProgress.length; i++) {
            this.syncStageProgressCounts(this.data.stageProgress[i]);
        }

        // 保存配置
        this.savePersistentData();

        // 更新阶段进度
        this.updateStageProgress();

        if (this.debugMode) {
            console.log("[Reverie Foundry] 击杀: " + entityId + ", 当前: " + newCount);
        }
        return this;
    },

    /**
     * 获取当前阶段名称
     */
    getCurrentStageName: function () {
        var highestStage = this.getHighestUnlockedStage();
        if (highestStage >= 0 && highestStage < this.stages.length) {
            return this.stages[highestStage].stageName;
        }
        return "无";
    },

    /**
     * 获取阶段信息
     * @param {number} stageIndex - 阶段索引
     */
    getStageInfo: function (stageIndex) {
        if (stageIndex < 0 || stageIndex >= this.stages.length) {
            return null;
        }

        var stage = this.stages[stageIndex];
        var progress = this.getStageProgress(stageIndex);
        var isUnlocked = this.isStageUnlocked(stageIndex);

        return {
            index: stageIndex,
            name: stage.stageName,
            unlocked: isUnlocked,
            progress: progress
        };
    },

    /**
     * 重置所有数据
     */
    reset: function () {
        this.data = {
            version: "1.0.0",
            stageProgress: [],
            globalKills: {},
            unlockedStages: [],
            lastUpdated: Date.now()
        };
        this.savePersistentData();

        if (this.debugMode) {
            console.log("[Reverie Foundry] 所有数据已重置");
        }
        return this;
    },

    /**
     * 初始化系统
     * @param {Internal.Server} server - 服务器实例
     */
    initialize: function (server) {
        if (server) {
            this.setServer(server);
        }

        if (!this.server) {
            console.error("[Reverie Foundry] 错误：无法初始化，缺少服务器实例");
            return this;
        }

        this.loadConfig();

        for (var i = 0; i < this.stages.length; i++) {
            this.getStageProgress(i);
        }
        this.savePersistentData();

        if (this.debugMode) {
            console.log("[Reverie Foundry] 矿石阶段系统已初始化");
            console.log("[Reverie Foundry] 已注册阶段数量: " + this.stages.length);
            console.log("[Reverie Foundry] 当前最高阶段: " + this.getCurrentStageName());
        }
        return this;
    }
};

// 事件处理器
ServerEvents.loaded(function (event) {
    if (ReverieFoundry.debugMode) {
        console.log("[Reverie Foundry] 服务器已加载，正在初始化系统...");
    }
    ReverieFoundry.setServer(event.server).initialize();
});

EntityEvents.death(event => {
    let entity = event.getEntity();
    let entityId = entity.getType();
    let server = event.getServer();

    if (!ReverieFoundry.server) {
        ReverieFoundry.setServer(server);
    }

    // 增加击杀计数
    ReverieFoundry.addKill(entityId);
});

EntityEvents.spawned('minecraft:item', event => {
    let itemEntity = event.getEntity();
    let itemStack = itemEntity.getItem();
    let itemId = itemStack.id;
    let server = event.getServer();

    if (!ReverieFoundry.server) {
        ReverieFoundry.setServer(server);
    }

    let oreConfig = ReverieFoundry.checkOreShouldBeHidden(itemId);

    if (oreConfig) {
        let oldStack = itemEntity.getItem();
        let newItem = Item.of(oreConfig.replacement, oldStack.count);
        itemEntity.setItem(newItem);

        if (ReverieFoundry.debugMode) {
            console.log("[Reverie Foundry] 隐藏矿石（未达到阶段）: " + oreConfig.original + " -> " + oreConfig.replacement);
        }
    } else if (ReverieFoundry.debugMode) {
        // 不需要隐藏
        console.log("[Reverie Foundry] 矿石 " + itemId + " 不需要隐藏（已达到阶段或不是目标矿石）");
    }
});
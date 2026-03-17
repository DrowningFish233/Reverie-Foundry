/**
 * 永恒之门生成器
 * @param {string} gatewayId 传送门ID
 * @param {Object} event 事件对象
 * @param {boolean} boolean 是否立即构建
 * @param {Function} handler 配置处理器
 */
function GenerateGateways(gatewayId, event, boolean, handler) {
    if (!(this instanceof GenerateGateways)) {
        return new GenerateGateways(gatewayId, event, boolean, handler)
    }

    this.gatewayId = gatewayId
    this.event = event
    this.boolean = boolean
    this.handler = handler
    this.namespace = 'kubejs'
    this.id = gatewayId

    if (gatewayId.includes(':')) {
        var parts = gatewayId.split(':')
        this.namespace = parts[0]
        this.id = parts[1]
    }

    // 基础配置
    this.config = {
        type: "gateways:normal",
        size: "small",
        color: "#FFFFFF",
        waves: [],
        rewards: []
    }

    /**
     * 设置传送门类型
     * @param {string} type 类型 (normal, boss, etc.)
     * @returns {GenerateGateways}
     */
    this.setType = function (type) {
        this.config.type = type
        return this
    }

    /**
     * 设置传送门大小
     * @param {"small"|"medium"|"large"} size 大小
     * @returns {GenerateGateways}
     */
    this.setSize = function (size) {
        this.config.size = size
        return this
    }

    /**
     * 设置传送门颜色
     * @param {string} color 十六进制颜色值
     * @returns {GenerateGateways}
     */
    this.setColor = function (color) {
        this.config.color = color
        return this
    }

    /**
     * 添加一波敌人
     * @param {Function} waveConfig 波次配置函数
     * @returns {GenerateGateways}
     */
    this.addWave = function (waveConfig) {
        var waveBuilder = new WaveBuilder()
        if (typeof waveConfig === 'function') {
            waveConfig(waveBuilder)
        }
        this.config.waves.push(waveBuilder.getWave())
        return this
    }

    /**
     * 添加最终奖励
     * @param {Function} rewardConfig 奖励配置函数
     * @returns {GenerateGateways}
     */
    this.addReward = function (rewardConfig) {
        var rewardBuilder = new RewardBuilder()
        if (typeof rewardConfig === 'function') {
            rewardConfig(rewardBuilder)
        }
        this.config.rewards.push(rewardBuilder.getReward())
        return this
    }

    /**
     * 构建并生成传送门文件
     */
    this.build = function () {
        if (!this.boolean) return

        var filePath = `kubejs/debug/Gateways/${this.id}.json`
        JsonIO.write(filePath, this.config)

        console.log(`[Reverie Foundry] 传送门已生成到: ${filePath}`)
    }

    if (this.boolean && this.handler) {
        this.handler(this)
    }

    return this
}

/**
 * 波次构建器
 * @constructor
 */
function WaveBuilder() {
    this.wave = {
        max_wave_time: 600,
        setup_time: 100,
        entities: [],
        modifiers: [],
        rewards: []
    }

    /**
     * 设置最大波次时间
     * @param {number} ticks 时间（tick）
     * @returns {WaveBuilder}
     */
    this.maxWaveTime = function (ticks) {
        this.wave.max_wave_time = ticks
        return this
    }

    /**
     * 设置准备时间
     * @param {number} ticks 时间（tick）
     * @returns {WaveBuilder}
     */
    this.setupTime = function (ticks) {
        this.wave.setup_time = ticks
        return this
    }

    /**
     * 添加实体
     * @param {string} entityId 实体ID
     * @param {number} count 数量
     * @param {Object} options 其他选项
     * @returns {WaveBuilder}
     */
    this.addEntity = function (entityId, count, options) {
        var entity = {
            type: "gateways:standard",
            count: count || 1,
            entity: entityId
        }

        if (options) {
            if (options.nbt) entity.nbt = options.nbt
            if (options.type) entity.type = options.type
        }

        this.wave.entities.push(entity)
        return this
    }

    /**
     * 添加属性修改器
     * @param {string} attribute 属性名
     * @param {string} operation 操作类型
     * @param {number} value 数值
     * @returns {WaveBuilder}
     */
    this.addAttributeModifier = function (attribute, operation, value) {
        this.wave.modifiers.push({
            type: "gateways:attribute",
            attribute: attribute,
            operation: operation,
            value: value
        })
        return this
    }

    /**
     * 添加效果修改器
     * @param {string} effect 效果ID
     * @param {number} amplifier 等级
     * @returns {WaveBuilder}
     */
    this.addEffectModifier = function (effect, amplifier) {
        this.wave.modifiers.push({
            type: "gateways:effect",
            effect: effect,
            amplifier: amplifier || 0
        })
        return this
    }

    /**
     * 添加装备修改器
     * @param {Object} equipment 装备配置
     * @returns {WaveBuilder}
     */
    this.addEquipmentModifier = function (equipment) {
        this.wave.modifiers.push({
            type: "gateways:equipment",
            equipment: equipment
        })
        return this
    }

    /**
     * 添加波次奖励
     * @param {Function} rewardConfig 奖励配置函数
     * @returns {WaveBuilder}
     */
    this.addReward = function (rewardConfig) {
        var rewardBuilder = new RewardBuilder()
        if (typeof rewardConfig === 'function') {
            rewardConfig(rewardBuilder)
        }
        this.wave.rewards.push(rewardBuilder.getReward())
        return this
    }

    /**
     * 获取波次配置
     * @returns {Object}
     */
    this.getWave = function () {
        if (this.wave.modifiers.length === 0) {
            delete this.wave.modifiers
        }
        return this.wave
    }
}

/**
 * 奖励构建器
 * @constructor
 */
function RewardBuilder() {
    this.reward = {}

    /**
     * 设置实体战利品奖励
     * @param {string} entity 实体ID
     * @param {number} rolls 抽取次数
     * @returns {RewardBuilder}
     */
    this.entityLoot = function (entity, rolls) {
        this.reward = {
            type: "gateways:entity_loot",
            entity: entity,
            rolls: rolls || 1
        }
        return this
    }

    /**
     * 设置经验奖励
     * @param {number} experience 经验值
     * @param {number} orbSize 经验球大小
     * @returns {RewardBuilder}
     */
    this.experience = function (experience, orbSize) {
        this.reward = {
            type: "gateways:experience",
            experience: experience,
            orb_size: orbSize || 10
        }
        return this
    }

    /**
     * 设置物品奖励
     * @param {string} item 物品ID
     * @param {number} count 数量
     * @returns {RewardBuilder}
     */
    this.item = function (item, count) {
        this.reward = {
            type: "gateways:item",
            item: item,
            count: count || 1
        }
        return this
    }

    /**
     * 设置战利品表奖励
     * @param {string} lootTable 战利品表
     * @param {number} rolls 抽取次数
     * @returns {RewardBuilder}
     */
    this.lootTable = function (lootTable, rolls) {
        this.reward = {
            type: "gateways:loot_table",
            loot_table: lootTable,
            rolls: rolls || 1
        }
        return this
    }

    /**
     * 获取奖励配置
     * @returns {Object}
     */
    this.getReward = function () {
        return this.reward
    }
}

/** 用于生成传送门 */
ItemEvents.firstRightClicked('kubejs:fish', event => {
    if (!event.player.creative && !event.player.op) {
        event.player.tell('§c你需要创造模式或OP权限才能使用此功能');
        return;
    }

    // 检查是否启用生成
    if (!GatewayConfigs || !GatewayConfigs.enabled) {
        event.player.tell('§c传送门生成功能已禁用！请在Configs.js中设置对应enabled为true');
        console.log('[Reverie Foundry] 传送门生成功能已禁用');
        return;
    }

    event.player.swing()

    // 遍历所有传送门配置并生成
    Object.entries(GatewayConfigs).forEach(([key, config]) => {
        if (key === 'enabled') return;

        if (config && config.id && config.config) {
            GenerateGateways(
                config.id,
                event,
                true,
                config.config
            ).build()
        }
    });

    const folderPath = `kubejs/debug/Gateways/`;

    const message = Text.translate("message.gateways.down")
        .append("\n")
        .append(Text.translate("message.clickopenfile")
            .clickOpenFile(folderPath)
        );

    event.player.tell(message);
    console.log("[Reverie Foundry] 所有传送门已生成完成！");
    console.log(`[Reverie Foundry] 文件已生成至：${folderPath}`);
});
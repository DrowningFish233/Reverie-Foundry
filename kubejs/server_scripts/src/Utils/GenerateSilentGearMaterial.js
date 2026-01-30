/**
 * 寂静装备材料生成器
 * @param {string} materialId 材料ID
 * @param {Object} event 事件对象
 * @param {boolean} boolean 是否立即构建
 * @param {Function} handler 配置处理器
 */
function GenerateSilentGearMaterial(materialId, event, boolean, handler) {
    if (!(this instanceof GenerateSilentGearMaterial)) {
        return new GenerateSilentGearMaterial(materialId, event, boolean, handler)
    }

    this.materialId = materialId
    this.event = event
    this.boolean = boolean
    this.handler = handler
    this.namespace = 'kubejs'
    this.id = materialId

    if (materialId.includes(':')) {
        var parts = materialId.split(':')
        this.namespace = parts[0]
        this.id = parts[1]
    }

    // 基础配置
    this.config = {
        type: "silentgear:simple",
        parent: "silentgear:empty",
        crafting: {
            can_salvage: true,
            categories: ["metal", "intermediate"],
            gear_type_blacklist: [],
            ingredient: { tag: `c:ingots/${this.id}` },
            part_substitutes: {}
        },
        display: {
            color: "#FFFFFFFF",
            main_texture_type: "HIGH_CONTRAST",
            name: { translate: `material.${this.namespace}.${this.id}` },
            name_prefix: ""
        },
        properties: {}
    }


    /**
     * 设置是否可回收
     * @param {boolean} bool 是否可回收
     * @returns {GenerateSilentGearMaterial}
     */
    this.setCanSalvage = function (bool) {
        this.config.crafting.can_salvage = bool
        return this
    }

    /**
     * 设置材料分类
     * @param {string[]} categories 分类数组
     * @returns {GenerateSilentGearMaterial}
     */
    this.setCategories = function (categories) {
        this.config.crafting.categories = categories
        return this
    }

    /**
     * 设置装备类型黑名单
     * @param {string[]} blacklist 黑名单数组
     * @returns {GenerateSilentGearMaterial}
     */
    this.setGearTypeBlacklist = function (blacklist) {
        this.config.crafting.gear_type_blacklist = blacklist
        return this
    }

    /**
     * 设置材料原料
     * @param {string|Object} ingredient 原料
     * @returns {GenerateSilentGearMaterial}
     */
    this.setIngredient = function (ingredient) {
        if (ingredient.startsWith('#')) {
            this.config.crafting.ingredient = { tag: ingredient.slice(1) }
        } else if (typeof ingredient === 'object') {
            this.config.crafting.ingredient = ingredient
        } else {
            this.config.crafting.ingredient = { item: ingredient }
        }
        return this
    }

    /**
     * 设置材料原料（标签）
     * @param {string} tag 标签
     * @returns {GenerateSilentGearMaterial}
     */
    this.setIngredientTag = function (tag) {
        this.config.crafting.ingredient = { tag: tag }
        return this
    }

    /**
     * 设置材料原料（物品）
     * @param {string} item 物品ID
     * @returns {GenerateSilentGearMaterial}
     */
    this.setIngredientItem = function (item) {
        this.config.crafting.ingredient = { item: item }
        return this
    }

    /**
     * 添加部件替代品
     * @param {string} partType 部件类型
     * @param {string|Object} substitute 替代品
     * @returns {GenerateSilentGearMaterial}
     */
    this.addPartSubstitute = function (partType, substitute) {
        if (typeof substitute === 'string') {
            if (substitute.startsWith('#')) {
                this.config.crafting.part_substitutes[partType] = { tag: substitute.slice(1) }
            } else {
                this.config.crafting.part_substitutes[partType] = { item: substitute }
            }
        } else {
            this.config.crafting.part_substitutes[partType] = substitute
        }
        return this
    }

    /**
     * 设置显示颜色
     * @param {string} color 颜色值
     * @returns {GenerateSilentGearMaterial}
     */
    this.setDisplayColor = function (color) {
        this.config.display.color = color
        return this
    }

    /**
     * 设置纹理类型
     * @param {"HIGH_CONTRAST"|"LOW_CONTRAST"} textureType 纹理类型
     * @returns {GenerateSilentGearMaterial}
     */
    this.setTextureType = function (textureType) {
        this.config.display.main_texture_type = textureType
        return this
    }

    /**
     * 设置显示名称
     * @param {string} name 名称
     * @returns {GenerateSilentGearMaterial}
     */
    this.setName = function (name) {
        this.config.display.name = { translate: name }
        return this
    }

    /**
     * 设置名称前缀
     * @param {string} prefix 前缀
     * @returns {GenerateSilentGearMaterial}
     */
    this.setNamePrefix = function (prefix) {
        this.config.display.name_prefix = prefix
        return this
    }


    /**
     * 添加主要部件属性
     * @param {Function} configFunc 配置函数
     * @returns {GenerateSilentGearMaterial}
     */
    this.addMain = function (configFunc) {
        this._addPart('silentgear:main', configFunc)
        return this
    }

    /**
     * 添加手柄部件属性
     * @param {Function} configFunc 配置函数
     * @returns {GenerateSilentGearMaterial}
     */
    this.addRod = function (configFunc) {
        this._addPart('silentgear:rod', configFunc)
        return this
    }

    /**
     * 添加尖端部件属性
     * @param {Function} configFunc 配置函数
     * @returns {GenerateSilentGearMaterial}
     */
    this.addTip = function (configFunc) {
        this._addPart('silentgear:tip', configFunc)
        return this
    }

    /**
     * 添加涂层部件属性
     * @param {Function} configFunc 配置函数
     * @returns {GenerateSilentGearMaterial}
     */
    this.addCoating = function (configFunc) {
        this._addPart('silentgear:coating', configFunc)
        return this
    }

    /**
     * 添加握柄部件属性
     * @param {Function} configFunc 配置函数
     * @returns {GenerateSilentGearMaterial}
     */
    this.addGrip = function (configFunc) {
        this._addPart('silentgear:grip', configFunc)
        return this
    }

    /**
     * 添加线部件属性
     * @param {Function} configFunc 配置函数
     * @returns {GenerateSilentGearMaterial}
     */
    this.addCord = function (configFunc) {
        this._addPart('silentgear:cord', configFunc)
        return this
    }

    /**
     * 添加内衬部件属性
     * @param {Function} configFunc 配置函数
     * @returns {GenerateSilentGearMaterial}
     */
    this.addLining = function (configFunc) {
        this._addPart('silentgear:lining', configFunc)
        return this
    }

    /**
     * 添加绑定结部件属性
     * @param {Function} configFunc 配置函数
     * @returns {GenerateSilentGearMaterial}
     */
    this.addBinding = function (configFunc) {
        this._addPart('silentgear:binding', configFunc)
        return this
    }

    /**
     * 添加宝石基座部件属性
     * @param {Function} configFunc 配置函数
     * @returns {GenerateSilentGearMaterial}
     */
    this.addSetting = function (configFunc) {
        this._addPart('silentgear:setting', configFunc)
        return this
    }

    /**
     * 添加部件属性的核心方法
     * @private
     */
    this._addPart = function (partType, configFunc) {
        // 创建部件属性构建器
        var partBuilder = new PartBuilder(partType)

        // 执行配置函数
        if (typeof configFunc === 'function') {
            configFunc(partBuilder)
        }

        // 获取构建的属性
        var partProperties = partBuilder.getProperties()

        // 添加到配置中
        if (Object.keys(partProperties).length > 0) {
            this.config.properties[partType] = partProperties
        }

        return this
    }

    /**
     * 构建并生成材料文件
     */
    this.build = function () {
        if (!this.boolean) return

        if (!this.config.crafting.part_substitutes) {
            this.config.crafting.part_substitutes = {}
        }

        if (Object.keys(this.config.properties).length === 0) {
            delete this.config.properties
        }

        var filePath = `kubejs/data/kubejs/silentgear_materials/auto/${this.id}.json`
        JsonIO.write(filePath, this.config)

        console.log(`[Reverie Foundry] 材料已生成到: ${filePath}`)
    }

    if (this.boolean && this.handler) {
        this.handler(this)
    }

    return this
}

/**
 * 部件属性构建器
 * @constructor
 * @param {string} partType
 */
function PartBuilder(partType) {
    this.stats = {}
    this.traits = []
    this.partType = partType

    /**
     * 设置护甲值
     * @param {number} value
     * @returns {PartBuilder}
     */
    this.armor = function (value) {
        this.stats.armor = value
        return this
    }

    /**
     * 设置头盔护甲值
     * @param {number} value
     * @returns {PartBuilder}
     */
    this.armorHelmet = function (value) {
        this.stats['armor/helmet'] = value
        return this
    }

    /**
     * 设置胸甲护甲值
     * @param {number} value
     * @returns {PartBuilder}
     */
    this.armorChestplate = function (value) {
        this.stats['armor/chestplate'] = value
        return this
    }

    /**
     * 设置护腿护甲值
     * @param {number} value
     * @returns {PartBuilder}
     */
    this.armorLeggings = function (value) {
        this.stats['armor/leggings'] = value
        return this
    }

    /**
     * 设置靴子护甲值
     * @param {number} value
     * @returns {PartBuilder}
     */
    this.armorBoots = function (value) {
        this.stats['armor/boots'] = value
        return this
    }

    /**
     * 设置护甲韧性
     * @param {number} value
     * @returns {PartBuilder}
     */
    this.armorToughness = function (value) {
        this.stats.armor_toughness = value
        return this
    }

    /**
     * 设置护甲耐久
     * @param {number} value
     * @returns {PartBuilder}
     */
    this.armorDurability = function (value) {
        this.stats.armor_durability = value
        return this
    }

    /**
     * 设置攻击伤害
     * @param {number} value
     * @returns {PartBuilder}
     */
    this.attackDamage = function (value) {
        this.stats.attack_damage = value
        return this
    }

    /**
     * 设置攻击速度
     * @param {number} value
     * @returns {PartBuilder}
     */
    this.attackSpeed = function (value) {
        this.stats.attack_speed = value
        return this
    }

    /**
     * 设置斧头攻击速度
     * @param {number} value
     * @returns {PartBuilder}
     */
    this.attackSpeedAxe = function (value) {
        this.stats['attack_speed/axe'] = value
        return this
    }

    /**
     * 设置锄头攻击速度
     * @param {number} value
     * @returns {PartBuilder}
     */
    this.attackSpeedHoe = function (value) {
        this.stats['attack_speed/hoe'] = value
        return this
    }

    /**
     * 设置充能值
     * @param {number} value
     * @returns {PartBuilder}
     */
    this.chargingValue = function (value) {
        this.stats.charging_value = value
        return this
    }

    /**
     * 设置拉弓速度
     * @param {number} value
     * @returns {PartBuilder}
     */
    this.drawSpeed = function (value) {
        this.stats.draw_speed = value
        return this
    }

    /**
     * 设置耐久度
     * @param {number} value
     * @returns {PartBuilder}
     */
    this.durability = function (value) {
        this.stats.durability = value
        return this
    }

    /**
     * 设置附魔能力
     * @param {number} value
     * @returns {PartBuilder}
     */
    this.enchantmentValue = function (value) {
        this.stats.enchantment_value = value
        return this
    }

    /**
     * 设置挖掘速度
     * @param {number} value
     * @returns {PartBuilder}
     */
    this.harvestSpeed = function (value) {
        this.stats.harvest_speed = value
        return this
    }

    /**
     * 设置挖掘等级
     * @param {string} tierName 等级名称
     * @param {string} levelHint 等级提示
     * @param {string} incorrectBlocks 可挖掘的方块
     * @returns {PartBuilder}
     */
    this.harvestTier = function (tierName, levelHint, incorrectBlocks) {
        this.stats.harvest_tier = {
            name: tierName,
            level_hint: levelHint,
            incorrect_blocks_for_tool: incorrectBlocks
        }
        return this
    }

    /**
     * 设置魔法护甲
     * @param {number} value
     * @returns {PartBuilder}
     */
    this.magicArmor = function (value) {
        this.stats.magic_armor = value
        return this
    }

    /**
     * 设置魔法伤害
     * @param {number} value
     * @returns {PartBuilder}
     */
    this.magicDamage = function (value) {
        this.stats.magic_damage = value
        return this
    }

    /**
     * 设置投射物精度
     * @param {number} value
     * @returns {PartBuilder}
     */
    this.projectileAccuracy = function (value) {
        this.stats.projectile_accuracy = value
        return this
    }

    /**
     * 设置投射物速度
     * @param {number} value
     * @returns {PartBuilder}
     */
    this.projectileSpeed = function (value) {
        this.stats.projectile_speed = value
        return this
    }

    /**
     * 设置远程伤害
     * @param {number} value
     * @returns {PartBuilder}
     */
    this.rangedDamage = function (value) {
        this.stats.ranged_damage = value
        return this
    }

    /**
     * 设置稀有度
     * @param {number} value
     * @returns {PartBuilder}
     */
    this.rarity = function (value) {
        this.stats.rarity = value
        return this
    }

    /**
     * 设置修复值
     * @param {number} value
     * @returns {PartBuilder}
     */
    this.repairValue = function (value) {
        this.stats.repair_value = value
        return this
    }

    /**
     * 设置法术强度
     * @param {number} value
     * @returns {PartBuilder}
     */
    this.spellPower = function (value) {
        this.stats.spell_power = value
        return this
    }

    /**
     * 设置法术抗性
     * @param {number} value
     * @returns {PartBuilder}
     */
    this.spellResist = function (value) {
        this.stats.spell_resist = value
        return this
    }

    /**
     * 设置魔力恢复
     * @param {number} value
     * @returns {PartBuilder}
     */
    this.manaRegen = function (value) {
        this.stats.mana_regen = value
        return this
    }

    /**
     * 设置誓令上限 仅整数
     * @param {number} value
     * @returns {PartBuilder}
     */
    this.geasLimit = function (value) {
        this.stats.geas_limit = value
        return this
    }

    /**
     * 设置回血倍率
     * @param {number} value
     * @returns {PartBuilder}
     */
    this.healingReceived = function (value) {
        this.stats.healing_received = value
        return this
    }

    /**
     * 添加特性
     * @param {string} name 特性名称
     * @param {number} level 特性等级
     * @returns {PartBuilder}
     */
    this.addTrait = function (name, level) {
        this.traits.push({
            name: name,
            level: level || 1,
            conditions: []
        })
        return this
    }

    /**
     * 获取构建的属性
     * @returns {Object}
     */
    this.getProperties = function () {
        var properties = {}

        // 复制所有stats
        Object.keys(this.stats).forEach(function (key) {
            properties[key] = this.stats[key]
        }.bind(this))

        // 如果有特性，添加到properties中
        if (this.traits.length > 0) {
            properties.traits = this.traits.map(function (trait) {
                return {
                    conditions: trait.conditions,
                    level: trait.level,
                    trait: trait.name
                }
            })
        }

        return properties
    }
}

/** 用于生成寂静装备材料 */
ItemEvents.firstRightClicked('kubejs:drowning_fish', event => {
    if (!event.player.creative && !event.player.op) {
        event.player.tell('§c你需要创造模式或OP权限才能使用此功能');
        return;
    }

    // 检查是否启用生成
    if (!MaterialConfigs.enabled) {
        event.player.tell('§c材料生成功能已禁用！请在Configs.js中设置对应enabled为true');
        console.log('[Reverie Foundry] 材料生成功能已禁用');
        return;
    }

    event.player.swing()

    // 遍历所有材料配置并生成
    Object.entries(MaterialConfigs).forEach(([key, config]) => {
        if (key === 'enabled') return;

        if (config && config.id && config.config) {
            GenerateSilentGearMaterial(
                config.id,
                event,
                true,
                config.config
            ).build()
        }
    });

    const folderPath = `kubejs/data/kubejs/silentgear_materials/auto/`;

    const message = Text.translate("message.silentgear_materials.down")
        .append("\n")
        .append(Text.translate("message.clickopenfile")
            .clickOpenFile(folderPath)
        );

    event.player.tell(message);
    console.log("[Reverie Foundry] 所有材料已生成完成！");
    console.log(`[Reverie Foundry] 文件已生成至：${folderPath}`);
});
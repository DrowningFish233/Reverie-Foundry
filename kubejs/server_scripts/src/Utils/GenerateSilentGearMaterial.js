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
     * 
     * 可用分类对照表：
     * - bone: 骨
     * - stone: 砖
     * - other: 其他
     * - soul: 灵魂
     * - fabric: 布料
     * - medium: 中级+
     * - ballistic_plate: 防护插板
     * - metal_fiber: 金属纤维
     * - advanced: 高级
     * - any: 任意
     * - basic: 基础
     * - cloth: 布料
     * - dust: 粉尘
     * - endgame: 终极
     * - fiber: 纤维
     * - gem: 宝石
     * - intangible: 未定义
     * - intermediate: 中级
     * - metal: 金属
     * - organic: 有机
     * - rock: 岩石
     * - sheet: 板
     * - slime: 史莱姆
     * - wood: 木材
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
     * 添加内衬（插板）部件属性
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
     * 设置数值型属性（直接设置数值）
     * @param {string} key 属性键
     * @param {number} value 数值
     * @returns {PartBuilder}
     */
    this._setNumberStat = function (key, value) {
        this.stats[key] = value
        return this
    }

    /**
     * 设置运算型属性（带operation字段）
     * @param {string} key 属性键
     * @param {Object} config 配置对象
     * @param {"ADD"|"MULTIPLY_BASE"|"MULTIPLY_TOTAL"} config.operation 运算类型
     * @param {number} config.value 数值
     * @returns {PartBuilder}
     */
    this._setOperationStat = function (key, config) {
        this.stats[key] = {
            operation: config.operation,
            value: config.value
        }
        return this
    }

    /**
     * 设置护甲值
     * @param {number} value
     * @returns {PartBuilder}
     */
    this.armor = function (value) {
        return this._setNumberStat('armor', value)
    }

    /**
     * 设置运算型护甲值
     * @param {"ADD"|"MULTIPLY_BASE"|"MULTIPLY_TOTAL"} operation 运算类型
     * @param {number} value 数值
     * @returns {PartBuilder}
     */
    this.armorWithOperation = function (operation, value) {
        return this._setOperationStat('armor', { operation: operation, value: value })
    }

    /**
     * 设置头盔护甲值
     * @param {number} value
     * @returns {PartBuilder}
     */
    this.armorHelmet = function (value) {
        return this._setNumberStat('armor/helmet', value)
    }

    /**
     * 设置运算型头盔护甲值
     * @param {"ADD"|"MULTIPLY_BASE"|"MULTIPLY_TOTAL"} operation 运算类型
     * @param {number} value 数值
     * @returns {PartBuilder}
     */
    this.armorHelmetWithOperation = function (operation, value) {
        return this._setOperationStat('armor/helmet', { operation: operation, value: value })
    }

    /**
     * 设置胸甲护甲值
     * @param {number} value
     * @returns {PartBuilder}
     */
    this.armorChestplate = function (value) {
        return this._setNumberStat('armor/chestplate', value)
    }

    /**
     * 设置运算型胸甲护甲值
     * @param {"ADD"|"MULTIPLY_BASE"|"MULTIPLY_TOTAL"} operation 运算类型
     * @param {number} value 数值
     * @returns {PartBuilder}
     */
    this.armorChestplateWithOperation = function (operation, value) {
        return this._setOperationStat('armor/chestplate', { operation: operation, value: value })
    }

    /**
     * 设置护腿护甲值
     * @param {number} value
     * @returns {PartBuilder}
     */
    this.armorLeggings = function (value) {
        return this._setNumberStat('armor/leggings', value)
    }

    /**
     * 设置运算型护腿护甲值
     * @param {"ADD"|"MULTIPLY_BASE"|"MULTIPLY_TOTAL"} operation 运算类型
     * @param {number} value 数值
     * @returns {PartBuilder}
     */
    this.armorLeggingsWithOperation = function (operation, value) {
        return this._setOperationStat('armor/leggings', { operation: operation, value: value })
    }

    /**
     * 设置靴子护甲值
     * @param {number} value
     * @returns {PartBuilder}
     */
    this.armorBoots = function (value) {
        return this._setNumberStat('armor/boots', value)
    }

    /**
     * 设置运算型靴子护甲值
     * @param {"ADD"|"MULTIPLY_BASE"|"MULTIPLY_TOTAL"} operation 运算类型
     * @param {number} value 数值
     * @returns {PartBuilder}
     */
    this.armorBootsWithOperation = function (operation, value) {
        return this._setOperationStat('armor/boots', { operation: operation, value: value })
    }

    /**
     * 设置护甲韧性
     * @param {number} value
     * @returns {PartBuilder}
     */
    this.armorToughness = function (value) {
        return this._setNumberStat('armor_toughness', value)
    }

    /**
     * 设置运算型护甲韧性
     * @param {"ADD"|"MULTIPLY_BASE"|"MULTIPLY_TOTAL"} operation 运算类型
     * @param {number} value 数值
     * @returns {PartBuilder}
     */
    this.armorToughnessWithOperation = function (operation, value) {
        return this._setOperationStat('armor_toughness', { operation: operation, value: value })
    }

    /**
     * 设置护甲耐久
     * @param {number} value
     * @returns {PartBuilder}
     */
    this.armorDurability = function (value) {
        return this._setNumberStat('armor_durability', value)
    }

    /**
     * 设置运算型护甲耐久
     * @param {"ADD"|"MULTIPLY_BASE"|"MULTIPLY_TOTAL"} operation 运算类型
     * @param {number} value 数值
     * @returns {PartBuilder}
     */
    this.armorDurabilityWithOperation = function (operation, value) {
        return this._setOperationStat('armor_durability', { operation: operation, value: value })
    }

    /**
     * 设置攻击伤害
     * @param {number} value
     * @returns {PartBuilder}
     */
    this.attackDamage = function (value) {
        return this._setNumberStat('attack_damage', value)
    }

    /**
     * 设置运算型攻击伤害
     * @param {"ADD"|"MULTIPLY_BASE"|"MULTIPLY_TOTAL"} operation 运算类型
     * @param {number} value 数值
     * @returns {PartBuilder}
     */
    this.attackDamageWithOperation = function (operation, value) {
        return this._setOperationStat('attack_damage', { operation: operation, value: value })
    }

    /**
     * 设置攻击速度
     * @param {number} value
     * @returns {PartBuilder}
     */
    this.attackSpeed = function (value) {
        return this._setNumberStat('attack_speed', value)
    }

    /**
     * 设置运算型攻击速度
     * @param {"ADD"|"MULTIPLY_BASE"|"MULTIPLY_TOTAL"} operation 运算类型
     * @param {number} value 数值
     * @returns {PartBuilder}
     */
    this.attackSpeedWithOperation = function (operation, value) {
        return this._setOperationStat('attack_speed', { operation: operation, value: value })
    }

    /**
     * 设置斧头攻击速度
     * @param {number} value
     * @returns {PartBuilder}
     */
    this.attackSpeedAxe = function (value) {
        return this._setNumberStat('attack_speed/axe', value)
    }

    /**
     * 设置运算型斧头攻击速度
     * @param {"ADD"|"MULTIPLY_BASE"|"MULTIPLY_TOTAL"} operation 运算类型
     * @param {number} value 数值
     * @returns {PartBuilder}
     */
    this.attackSpeedAxeWithOperation = function (operation, value) {
        return this._setOperationStat('attack_speed/axe', { operation: operation, value: value })
    }

    /**
     * 设置锄头攻击速度
     * @param {number} value
     * @returns {PartBuilder}
     */
    this.attackSpeedHoe = function (value) {
        return this._setNumberStat('attack_speed/hoe', value)
    }

    /**
     * 设置运算型锄头攻击速度
     * @param {"ADD"|"MULTIPLY_BASE"|"MULTIPLY_TOTAL"} operation 运算类型
     * @param {number} value 数值
     * @returns {PartBuilder}
     */
    this.attackSpeedHoeWithOperation = function (operation, value) {
        return this._setOperationStat('attack_speed/hoe', { operation: operation, value: value })
    }

    /**
     * 设置充能值
     * @param {number} value
     * @returns {PartBuilder}
     */
    this.chargingValue = function (value) {
        return this._setNumberStat('charging_value', value)
    }

    /**
     * 设置运算型充能值
     * @param {"ADD"|"MULTIPLY_BASE"|"MULTIPLY_TOTAL"} operation 运算类型
     * @param {number} value 数值
     * @returns {PartBuilder}
     */
    this.chargingValueWithOperation = function (operation, value) {
        return this._setOperationStat('charging_value', { operation: operation, value: value })
    }

    /**
     * 设置拉弓速度
     * @param {number} value
     * @returns {PartBuilder}
     */
    this.drawSpeed = function (value) {
        return this._setNumberStat('draw_speed', value)
    }

    /**
     * 设置运算型拉弓速度
     * @param {"ADD"|"MULTIPLY_BASE"|"MULTIPLY_TOTAL"} operation 运算类型
     * @param {number} value 数值
     * @returns {PartBuilder}
     */
    this.drawSpeedWithOperation = function (operation, value) {
        return this._setOperationStat('draw_speed', { operation: operation, value: value })
    }

    /**
     * 设置耐久度
     * @param {number} value
     * @returns {PartBuilder}
     */
    this.durability = function (value) {
        return this._setNumberStat('durability', value)
    }

    /**
     * 设置运算型耐久度
     * @param {"ADD"|"MULTIPLY_BASE"|"MULTIPLY_TOTAL"} operation 运算类型
     * @param {number} value 数值
     * @returns {PartBuilder}
     */
    this.durabilityWithOperation = function (operation, value) {
        return this._setOperationStat('durability', { operation: operation, value: value })
    }

    /**
     * 设置附魔能力
     * @param {number} value
     * @returns {PartBuilder}
     */
    this.enchantmentValue = function (value) {
        return this._setNumberStat('enchantment_value', value)
    }

    /**
     * 设置运算型附魔能力
     * @param {"ADD"|"MULTIPLY_BASE"|"MULTIPLY_TOTAL"} operation 运算类型
     * @param {number} value 数值
     * @returns {PartBuilder}
     */
    this.enchantmentValueWithOperation = function (operation, value) {
        return this._setOperationStat('enchantment_value', { operation: operation, value: value })
    }

    /**
     * 设置击退抗性
     * @param {number} value
     * @returns {PartBuilder}
     */
    this.knockback_resistance = function (value) {
        return this._setNumberStat('knockback_resistance', value)
    }

    /**
     * 设置运算型击退抗性
     * @param {"ADD"|"MULTIPLY_BASE"|"MULTIPLY_TOTAL"} operation 运算类型
     * @param {number} value 数值
     * @returns {PartBuilder}
     */
    this.knockback_resistanceWithOperation = function (operation, value) {
        return this._setOperationStat('knockback_resistance', { operation: operation, value: value })
    }

    /**
     * 设置挖掘速度
     * @param {number} value
     * @returns {PartBuilder}
     */
    this.harvestSpeed = function (value) {
        return this._setNumberStat('harvest_speed', value)
    }

    /**
     * 设置运算型挖掘速度
     * @param {"ADD"|"MULTIPLY_BASE"|"MULTIPLY_TOTAL"} operation 运算类型
     * @param {number} value 数值
     * @returns {PartBuilder}
     */
    this.harvestSpeedWithOperation = function (operation, value) {
        return this._setOperationStat('harvest_speed', { operation: operation, value: value })
    }

    /**
     * 设置挖掘等级（简化版）
     * @param {number|string} tier 等级：0=木, 1=石, 2=铁, 3=钻石, 4=下界合金, 5=ATM, 6=振金, 7=难得素
     * @returns {PartBuilder}
     */
    this.harvestTier = function (tier) {
        var tierStr = String(tier);

        var tierMap = {
            '0': { name: 'wood/木', hint: '0', incorrect: 'minecraft:incorrect_for_wood_tools' },
            '1': { name: 'stone/石', hint: '1', incorrect: 'silentgear:incorrect_for_stone_tools' },
            '2': { name: 'iron/铁', hint: '2', incorrect: 'silentgear:incorrect_for_iron_tools' },
            '3': { name: 'diamond/钻石', hint: '3', incorrect: 'silentgear:incorrect_for_diamond_tools' },
            '4': { name: 'netherite/下界合金', hint: '4', incorrect: 'minecraft:incorrect_for_netherite_tool' },
            '5': { name: 'allthemodium/ATM', hint: '5', incorrect: 'silentgear:incorrect_for_allthemodium_tools' },
            '6': { name: 'vibranium/振金', hint: '6', incorrect: 'silentgear:incorrect_for_vibranium_tools' },
            '7': { name: 'unobtainium/难得素', hint: '7', incorrect: 'silentgear:incorrect_for_unobtainium_tools' }
        };

        var mapping = tierMap[tierStr];
        if (!mapping) {
            console.warn('[Reverie Foundry] 未知的挖掘等级: ' + tier + '，使用默认等级0（木）');
            mapping = tierMap['0'];
        }

        this.stats.harvest_tier = {
            name: mapping.name,
            level_hint: mapping.hint,
            incorrect_blocks_for_tool: mapping.incorrect
        };
        return this;
    }

    /**
     * 设置魔法护甲
     * @param {number} value
     * @returns {PartBuilder}
     */
    this.magicArmor = function (value) {
        return this._setNumberStat('magic_armor', value)
    }

    /**
     * 设置运算型魔法护甲
     * @param {"ADD"|"MULTIPLY_BASE"|"MULTIPLY_TOTAL"} operation 运算类型
     * @param {number} value 数值
     * @returns {PartBuilder}
     */
    this.magicArmorWithOperation = function (operation, value) {
        return this._setOperationStat('magic_armor', { operation: operation, value: value })
    }

    /**
     * 设置魔法伤害
     * @param {number} value
     * @returns {PartBuilder}
     */
    this.magicDamage = function (value) {
        return this._setNumberStat('magic_damage', value)
    }

    /**
     * 设置运算型魔法伤害
     * @param {"ADD"|"MULTIPLY_BASE"|"MULTIPLY_TOTAL"} operation 运算类型
     * @param {number} value 数值
     * @returns {PartBuilder}
     */
    this.magicDamageWithOperation = function (operation, value) {
        return this._setOperationStat('magic_damage', { operation: operation, value: value })
    }

    /**
     * 设置投射物精度
     * @param {number} value
     * @returns {PartBuilder}
     */
    this.projectileAccuracy = function (value) {
        return this._setNumberStat('projectile_accuracy', value)
    }

    /**
     * 设置运算型投射物精度
     * @param {"ADD"|"MULTIPLY_BASE"|"MULTIPLY_TOTAL"} operation 运算类型
     * @param {number} value 数值
     * @returns {PartBuilder}
     */
    this.projectileAccuracyWithOperation = function (operation, value) {
        return this._setOperationStat('projectile_accuracy', { operation: operation, value: value })
    }

    /**
     * 设置投射物速度
     * @param {number} value
     * @returns {PartBuilder}
     */
    this.projectileSpeed = function (value) {
        return this._setNumberStat('projectile_speed', value)
    }

    /**
     * 设置运算型投射物速度
     * @param {"ADD"|"MULTIPLY_BASE"|"MULTIPLY_TOTAL"} operation 运算类型
     * @param {number} value 数值
     * @returns {PartBuilder}
     */
    this.projectileSpeedWithOperation = function (operation, value) {
        return this._setOperationStat('projectile_speed', { operation: operation, value: value })
    }

    /**
     * 设置远程伤害
     * @param {number} value
     * @returns {PartBuilder}
     */
    this.rangedDamage = function (value) {
        return this._setNumberStat('ranged_damage', value)
    }

    /**
     * 设置运算型远程伤害
     * @param {"ADD"|"MULTIPLY_BASE"|"MULTIPLY_TOTAL"} operation 运算类型
     * @param {number} value 数值
     * @returns {PartBuilder}
     */
    this.rangedDamageWithOperation = function (operation, value) {
        return this._setOperationStat('ranged_damage', { operation: operation, value: value })
    }

    /**
     * 设置稀有度
     * @param {number} value
     * @returns {PartBuilder}
     */
    this.rarity = function (value) {
        return this._setNumberStat('rarity', value)
    }

    /**
     * 设置运算型稀有度
     * @param {"ADD"|"MULTIPLY_BASE"|"MULTIPLY_TOTAL"} operation 运算类型
     * @param {number} value 数值
     * @returns {PartBuilder}
     */
    this.rarityWithOperation = function (operation, value) {
        return this._setOperationStat('rarity', { operation: operation, value: value })
    }

    /**
     * 设置修复值
     * @param {number} value
     * @returns {PartBuilder}
     */
    this.repairValue = function (value) {
        return this._setNumberStat('repair_value', value)
    }

    /**
     * 设置运算型修复值
     * @param {"ADD"|"MULTIPLY_BASE"|"MULTIPLY_TOTAL"} operation 运算类型
     * @param {number} value 数值
     * @returns {PartBuilder}
     */
    this.repairValueWithOperation = function (operation, value) {
        return this._setOperationStat('repair_value', { operation: operation, value: value })
    }

    /**
     * 设置修复效率
     * @param {number} value
     * @returns {PartBuilder}
     */
    this.repairEfficiency = function (value) {
        return this._setNumberStat('repair_efficiency', value)
    }

    /**
     * 设置运算型修复效率
     * @param {"ADD"|"MULTIPLY_BASE"|"MULTIPLY_TOTAL"} operation 运算类型
     * @param {number} value 数值
     * @returns {PartBuilder}
     */
    this.repairEfficiencyWithOperation = function (operation, value) {
        return this._setOperationStat('repair_efficiency', { operation: operation, value: value })
    }

    /**
     * 设置法术强度
     * @param {number} value
     * @returns {PartBuilder}
     */
    this.spellPower = function (value) {
        return this._setNumberStat('spell_power', value)
    }

    /**
     * 设置运算型法术强度
     * @param {"ADD"|"MULTIPLY_BASE"|"MULTIPLY_TOTAL"} operation 运算类型
     * @param {number} value 数值
     * @returns {PartBuilder}
     */
    this.spellPowerWithOperation = function (operation, value) {
        return this._setOperationStat('spell_power', { operation: operation, value: value })
    }

    /**
     * 设置法术抗性
     * @param {number} value
     * @returns {PartBuilder}
     */
    this.spellResist = function (value) {
        return this._setNumberStat('spell_resist', value)
    }

    /**
     * 设置运算型法术抗性
     * @param {"ADD"|"MULTIPLY_BASE"|"MULTIPLY_TOTAL"} operation 运算类型
     * @param {number} value 数值
     * @returns {PartBuilder}
     */
    this.spellResistWithOperation = function (operation, value) {
        return this._setOperationStat('spell_resist', { operation: operation, value: value })
    }

    /**
     * 设置法术槽位上限
     * @param {number} value
     * @returns {PartBuilder}
     */
    this.spellSlots = function (value) {
        return this._setNumberStat('spell_slots', value)
    }

    /**
     * 设置运算型法术槽位上限
     * @param {"ADD"|"MULTIPLY_BASE"|"MULTIPLY_TOTAL"} operation 运算类型
     * @param {number} value 数值
     * @returns {PartBuilder}
     */
    this.spellSlotsWithOperation = function (operation, value) {
        return this._setOperationStat('spell_slots', { operation: operation, value: value })
    }

    /**
     * 设置最大魔力值
     * @param {number} value
     * @returns {PartBuilder}
     */
    this.maxMana = function (value) {
        return this._setNumberStat('max_mana', value)
    }

    /**
     * 设置运算型最大魔力值
     * @param {"ADD"|"MULTIPLY_BASE"|"MULTIPLY_TOTAL"} operation 运算类型
     * @param {number} value 数值
     * @returns {PartBuilder}
     */
    this.maxManaWithOperation = function (operation, value) {
        return this._setOperationStat('max_mana', { operation: operation, value: value })
    }

    /**
     * 设置魔力恢复
     * @param {number} value
     * @returns {PartBuilder}
     */
    this.manaRegen = function (value) {
        return this._setNumberStat('mana_regen', value)
    }

    /**
     * 设置运算型魔力恢复
     * @param {"ADD"|"MULTIPLY_BASE"|"MULTIPLY_TOTAL"} operation 运算类型
     * @param {number} value 数值
     * @returns {PartBuilder}
     */
    this.manaRegenWithOperation = function (operation, value) {
        return this._setOperationStat('mana_regen', { operation: operation, value: value })
    }

    /**
     * 设置誓令上限 
     * @param {number} value
     * @returns {PartBuilder}
     */
    this.geasLimit = function (value) {
        return this._setNumberStat('geas_limit', value)
    }

    /**
     * 设置运算型誓令上限
     * @param {"ADD"|"MULTIPLY_BASE"|"MULTIPLY_TOTAL"} operation 运算类型
     * @param {number} value 数值
     * @returns {PartBuilder}
     */
    this.geasLimitWithOperation = function (operation, value) {
        return this._setOperationStat('geas_limit', { operation: operation, value: value })
    }

    /**
     * 设置回血倍率
     * @param {number} value
     * @returns {PartBuilder}
     */
    this.healingReceived = function (value) {
        return this._setNumberStat('healing_received', value)
    }

    /**
     * 设置运算型回血倍率
     * @param {"ADD"|"MULTIPLY_BASE"|"MULTIPLY_TOTAL"} operation 运算类型
     * @param {number} value 数值
     * @returns {PartBuilder}
     */
    this.healingReceivedWithOperation = function (operation, value) {
        return this._setOperationStat('healing_received', { operation: operation, value: value })
    }

    /**
     * 设置嵌孔槽
     * @param {number} value
     * @returns {PartBuilder}
     */
    this.socketSlots = function (value) {
        return this._setNumberStat('socket_slots', value)
    }

    /**
     * 设置运算型嵌孔槽
     * @param {"ADD"|"MULTIPLY_BASE"|"MULTIPLY_TOTAL"} operation 运算类型
     * @param {number} value 数值
     * @returns {PartBuilder}
     */
    this.socketSlotsWithOperation = function (operation, value) {
        return this._setOperationStat('socket_slots', { operation: operation, value: value })
    }

    /**
     * 设置精锻概率修正
     * @param {number} value
     * @returns {PartBuilder}
     */
    this.forgePositiveChance = function (value) {
        return this._setNumberStat('forge_positive_chance', value)
    }

    /**
     * 设置运算型精锻概率修正
     * @param {"ADD"|"MULTIPLY_BASE"|"MULTIPLY_TOTAL"} operation 运算类型
     * @param {number} value 数值
     * @returns {PartBuilder}
     */
    this.forgePositiveChanceWithOperation = function (operation, value) {
        return this._setOperationStat('forge_positive_chance', { operation: operation, value: value })
    }

    /**
     * 设置精锻强度修正
     * @param {number} value
     * @returns {PartBuilder}
     */
    this.forgePower = function (value) {
        return this._setNumberStat('forge_power', value)
    }

    /**
     * 设置运算型精锻强度修正
     * @param {"ADD"|"MULTIPLY_BASE"|"MULTIPLY_TOTAL"} operation 运算类型
     * @param {number} value 数值
     * @returns {PartBuilder}
     */
    this.forgePowerWithOperation = function (operation, value) {
        return this._setOperationStat('forge_power', { operation: operation, value: value })
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

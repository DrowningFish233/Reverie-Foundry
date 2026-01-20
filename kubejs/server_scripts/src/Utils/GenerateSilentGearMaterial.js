/**
 * 寂静装备材料生成器
 * @param {string} materialId 材料ID
 * @param {Object} event 事件对象
 * @param {boolean} boolean 是否立即构建 (后续还是加一个build比较好)
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
       * 添加主要部件属性 (main)
       * @param {Object} stats - 属性对象，包含：
       *   - additive: boolean - 是否为附加属性
       *   - armor: number - 护甲值
       * 
       *   - armor/helmet: number - 头盔护甲值
       *   - armor/chestplate: number - 胸甲护甲值
       *   - armor/leggings: number - 护腿护甲值
       *   - armor/boots: number - 靴子护甲值
       *   - armor_durability: number - 护甲耐久
       *   - armor_toughness: number - 护甲韧性
       * 
       *   - attack_damage: number - 攻击伤害
       *   - attack_speed: number - 攻击速度
       *   - attack_speed/axe: number - 斧头攻击速度
       *   - attack_speed/hoe: number - 锄头攻击速度
       *   - charging_value: number - 充能值
       *   - draw_speed: number - 拉弓速度
       *   - durability: number - 耐久度
       *   - enchantment_value: number - 附魔能力
       *   - harvest_speed: number - 挖掘速度
       *   - harvest_tier: Object - 挖掘等级 {name, level_hint, incorrect_blocks_for_tool}
       *   - magic_armor: number - 魔法护甲
       *   - magic_damage: number - 魔法伤害
       *   - projectile_accuracy: number - 投射物精度
       *   - projectile_speed: number - 投射物速度
       *   - ranged_damage: number - 远程伤害
       *   - rarity: number - 稀有度
       *   - repair_value: number - 修复值
       * @param {Array} traits - 特性数组
       * @returns {GenerateSilentGearMaterial} 返回自身用于链式调用
       */
    this.addMainPart = function (stats, traits) {
        this.config.properties['silentgear:main'] = this._buildPartProperties(stats, traits)
        return this
    }

    /**
     * 添加手柄部件属性
     * @param {Object} stats 属性对象
     * @param {Array} traits 特性数组
     * @returns {GenerateSilentGearMaterial}
     */
    this.addRodPart = function (stats, traits) {
        this.config.properties['silentgear:rod'] = this._buildPartProperties(stats, traits)
        return this
    }

    /**
     * 添加尖端部件属性
     * @param {Object} stats 属性对象
     * @param {Array} traits 特性数组
     * @returns {GenerateSilentGearMaterial}
     */
    this.addTipPart = function (stats, traits) {
        this.config.properties['silentgear:tip'] = this._buildPartProperties(stats, traits)
        return this
    }

    /**
     * 添加涂层部件属性
     * @param {Object} stats 属性对象
     * @param {Array} traits 特性数组
     * @returns {GenerateSilentGearMaterial}
     */
    this.addCoatingPart = function (stats, traits) {
        this.config.properties['silentgear:coating'] = this._buildPartProperties(stats, traits)
        return this
    }

    /**
     * 添加握柄部件属性
     * @param {Object} stats 属性对象
     * @param {Array} traits 特性数组
     * @returns {GenerateSilentGearMaterial}
     */
    this.addGripPart = function (stats, traits) {
        this.config.properties['silentgear:grip'] = this._buildPartProperties(stats, traits)
        return this
    }

    /**
     * 添加线部件属性
     * @param {Object} stats 属性对象
     * @param {Array} traits 特性数组
     * @returns {GenerateSilentGearMaterial}
     */
    this.addCordPart = function (stats, traits) {
        this.config.properties['silentgear:cord'] = this._buildPartProperties(stats, traits)
        return this
    }

    /**
     * 添加衬里部件属性
     * @param {Object} stats 属性对象
     * @param {Array} traits 特性数组
     * @returns {GenerateSilentGearMaterial}
     */
    this.addLiningPart = function (stats, traits) {
        this.config.properties['silentgear:lining'] = this._buildPartProperties(stats, traits)
        return this
    }

    /**
     * 添加绑定结部件属性
     * @param {Object} stats 属性对象
     * @param {Array} traits 特性数组
     * @returns {GenerateSilentGearMaterial}
     */
    this.addBindingPart = function (stats, traits) {
        this.config.properties['silentgear:binding'] = this._buildPartProperties(stats, traits)
        return this
    }

    /**
     * 添加镶嵌部件属性
     * @param {Object} stats 属性对象
     * @param {Array} traits 特性数组
     * @returns {GenerateSilentGearMaterial}
     */
    this.addSettingPart = function (stats, traits) {
        this.config.properties['silentgear:setting'] = this._buildPartProperties(stats, traits)
        return this
    }

    // 构建部件属性
    this._buildPartProperties = function (stats, traits) {
        var properties = {}

        if (stats) {
            Object.keys(stats).forEach(function (key) {
                // 特殊处理 harvest_tier，如果它存在则直接使用
                if (key === 'harvest_tier' && stats[key] && typeof stats[key] === 'object') {
                    properties.harvest_tier = stats[key]
                } else {
                    properties[key] = stats[key]
                }
            })
        }

        if (traits && traits.length > 0) {
            properties.traits = traits.map(function (trait) {
                return {
                    conditions: trait.conditions || [],
                    level: trait.level || 1,
                    trait: trait.name
                }
            })
        }

        return Object.keys(properties).length > 0 ? properties : {}
    }

    /**
     * 创建挖掘等级配置
     * @param {string} tierName 等级名称
     * @param {string} levelHint 等级提示
     * @param {string} incorrectBlocks 不可挖掘的方块
     * @returns {Object}
     */
    this.setHarvestTier = function (tierName, levelHint, incorrectBlocks) {
        return {
            name: tierName,
            level_hint: levelHint,
            incorrect_blocks_for_tool: incorrectBlocks
        }
    }

    /**
     * 创建特性
     * @param {string} name 特性名称
     * @param {number} level 特性等级
     * @param {Array} conditions 触发条件
     * @returns {Object}
     */
    this.createTrait = function (name, level, conditions) {
        return {
            name: name,
            level: level || 1,
            conditions: conditions || []
        }
    }

    /**
     * 创建触发条件
     * @param {string} type 条件类型
     * @param {Object} data 条件数据
     * @returns {Object}
     */
    this.createCondition = function (type, data) {
        var condition = { type: type }
        Object.keys(data).forEach(function (key) {
            condition[key] = data[key]
        })
        return condition
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


/** 材料配置对象 */
/** ↓提供补全用代码，不可删除 */
/** @type {Object.<string, {id: string, config: (mat: GenerateSilentGearMaterial) => void}>} */
const MaterialConfigs = {
    rope: {
        id: "kubejs:rope",
        config: (mat) => {
            mat.setCategories(["other"])
                .setIngredientItem("farmersdelight:rope")
                .setDisplayColor("#FF5e3819")
                .addBindingPart({
                    durability: 32.0,
                },
                    [
                        mat.createTrait("kubejs:monkey", 1),
                    ]
                )
                .addCordPart({
                    durability: 32.0,
                },
                    [
                        mat.createTrait("kubejs:monkey", 1),
                    ]
                )
                .addMainPart({
                    durability: 32.0,
                    harvest_tier: mat.setHarvestTier("wood", "1", "silentgear:incorrect_for_wood_tools")
                },
                    [
                        mat.createTrait("kubejs:monkey", 1),
                    ]
                );
        }
    }
    /*
    //简单的示例
    zinc_ingot: {
        id: "kubejs:zinc_ingot",
        config: (mat) => {
            mat.setCategories(["metal", "intermediate"])
                .setIngredientItem("kubejs:zinc_ingot")
                .setDisplayColor("#bed9d0")
                .setName("material.silentgear.kubejs:zinc_ingot")
                .addMainPart({
                    armor: 8.0,
                    armor_toughness: 10,
                    "armor/boots": 1.0,
                    "armor/chestplate": 3.0,
                    "armor/helmet": 1.0,
                    "armor/leggings": 3.0,
                    armor_durability: 8.0,
                    attack_damage: 1.0,
                    attack_speed: 0.0,
                    "attack_speed/axe": -0.1,
                    "attack_speed/hoe": 0.0,
                    charging_value: 1.5,
                    draw_speed: 0.0,
                    durability: 162.0,
                    enchantment_value: 20.0,
                    harvest_speed: 3.0,
                    harvest_tier: mat.setHarvestTier("stone/石", "1", "silentgear:incorrect_for_stone_tools"),
                    magic_armor: 6.0,
                    magic_damage: 3.0,
                    ranged_damage: 0.0,
                    rarity: 140.0
                },
                    [
                        mat.createTrait("kubejs:dropped_experience", 2),
                        mat.createTrait("silentgear:malleable", 1),
                        mat.createTrait("silentgear:soft", 2)
                    ]
                );
        }
    }
    */
};


/** 用于生成寂静装备材料 */
ItemEvents.firstRightClicked('kubejs:drowning_fish', event => {
    if (!event.player.creative && !event.player.op) {
        event.player.tell('§c你需要创造模式或OP权限才能使用此功能');
        return;
    }
    event.player.swing()
    // 遍历所有材料配置并生成
    Object.values(MaterialConfigs).forEach(materialConfig => {
        GenerateSilentGearMaterial(
            materialConfig.id,
            event,
            true,
            materialConfig.config
        ).build()
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
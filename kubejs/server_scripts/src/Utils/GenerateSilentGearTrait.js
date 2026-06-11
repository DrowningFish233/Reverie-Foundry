/**
 * 寂静装备特性生成器
 * @param {string} traitId 特性ID
 * @param {Object} event KubeJS事件对象
 * @param {boolean} boolean 是否立即构建 (后续还是加一个build比较好)
 * @param {Function} handler 处理器
 */
function GenerateSilentGearTrait(traitId, event, boolean, handler) {
    if (!(this instanceof GenerateSilentGearTrait)) {
        return new GenerateSilentGearTrait(traitId, event, boolean, handler)
    }

    this.traitId = traitId
    this.event = event
    this.boolean = boolean
    this.handler = handler
    this.namespace = 'kubejs'
    this.id = traitId

    if (traitId.includes(':')) {
        var parts = traitId.split(':')
        this.namespace = parts[0]
        this.id = parts[1]
    }

    // 基础
    this.config = {
        conditions: [],
        description: {
            translate: `trait.${this.namespace}.${this.id}.desc`
        },
        effects: [],
        max_level: 1, // 默认等级
        name: {
            translate: `trait.${this.namespace}.${this.id}`
        }
    }

    /**
     * 设置最大等级
     * @param {number} maxLevel 最大等级
     * @returns {GenerateSilentGearTrait}
     */
    this.setMaxLevel = function (maxLevel) {
        this.config.max_level = maxLevel
        return this
    }

    /**
     * 添加条件
     * @param {Object|Array} conditions 条件
     * @returns {GenerateSilentGearTrait}
     */
    this.addConditions = function (conditions) {
        if (Array.isArray(conditions)) {
            this.config.conditions = this.config.conditions.concat(conditions)
        } else {
            this.config.conditions.push(conditions)
        }
        return this
    }

    /**
    * 创建 OR 条件
    * @param {Array} values 条件值数组
    * @returns {Object}
    */
    this.createOrCondition = function (values) {
        return {
            type: "silentgear:or",
            values: values
        }
    }

    /**
     * 创建装备类型条件
     * @param {string} gearType 装备类型
     * @returns {Object}
     */
    this.createGearTypeCondition = function (gearType) {
        return {
            type: "silentgear:gear_type",
            gear_type: gearType
        }
    }

    /**
     * 添加免疫效果
     * @param {string[]} clearedEffects 要清除的效果ID数组
     * @returns {GenerateSilentGearTrait}
     */
    this.addCancelEffects = function (clearedEffects) {
        this.config.effects.push({
            type: "silentgear:cancel_effects",
            cleared_effects: clearedEffects
        })
        return this
    }

    /**
     * 添加命中效果（自动根据条件中的装备类型生成包裹） // 慎用...暂时废弃
     * @param {Object} effectsByLevel 按等级的效果
     * @returns {GenerateSilentGearTrait}
     */
    this.addTargetEffect = function (effectsByLevel) {
        // 从条件中提取装备类型
        var gearTypes = [];

        // 遍历所有条件，找出装备类型条件
        this.config.conditions.forEach(condition => {
            if (condition.type === "silentgear:gear_type") {
                gearTypes.push(condition.gear_type);
            } else if (condition.type === "silentgear:or") {
                condition.values.forEach(value => {
                    if (value.type === "silentgear:gear_type") {
                        gearTypes.push(value.gear_type);
                    }
                });
            }
        });

        // 如果没有找到装备类型条件，使用默认
        if (gearTypes.length === 0) {
            this.config.effects.push({
                type: "silentgear:target_effect",
                effects_by_level: effectsByLevel
            });
            return this;
        }

        // 为每个装备类型创建包裹
        var wrappedEffects = {};
        gearTypes.forEach(gearType => {
            wrappedEffects[gearType] = effectsByLevel;
        });

        this.config.effects.push({
            type: "silentgear:target_effect",
            effects_by_level: wrappedEffects
        });
        return this;
    }

    /**
     * 创建药水效果 // 慎用...暂时废弃
     * @param {string} id 效果ID
     * @param {number} duration 持续时间
     * @param {string[]} cures 治疗方式
     * @param {boolean} showIcon 是否显示图标
     * @returns {Object}
     */
    this.createPotionEffect = function (id, duration, cures, showIcon) {
        return {
            id: id,
            duration: duration,
            "neoforge:cures": cures,
            show_icon: showIcon
        }
    }

    /**
 * 添加穿戴效果（支持按装备类型）
 * @param {Object} effectsConfig 效果对象
 * @param {Array} effectsConfig.armor 装甲效果
 * @param {Array} effectsConfig.tool 工具效果  
 * @param {Array} effectsConfig.curio 饰品效果
 * @returns {GenerateSilentGearTrait}
 */
    this.addWielderEffectsByGearType = function (effectsConfig) {
        var potionEffects = {};

        if (effectsConfig.armor) {
            potionEffects["silentgear:armor"] = effectsConfig.armor;
        }
        if (effectsConfig.tool) {
            potionEffects["silentgear:tool"] = effectsConfig.tool;
        }
        if (effectsConfig.curio) {
            potionEffects["silentgear:curio"] = effectsConfig.curio;
        }

        this.config.effects.push({
            type: "silentgear:wielder_effect",
            potion_effects: potionEffects
        });
        return this;
    }

    /**
     * 创建全套装效果
     * @param {string} effect 效果ID
     * @param {number} duration 持续时间
     * @param {number} level 效果等级
     * @returns {Object}
     */
    this.createFullSetEffect = function (effect, duration, level) {
        return {
            type: "full_set_only",
            duration: duration,
            effect: effect,
            levels: [level]
        };
    }

    /**
     * 创建按特性等级效果
     * @param {string} effect 效果ID
     * @param {number} duration 持续时间
     * @param {number[]} levels 各等级对应的效果等级
     * @returns {Object}
     */
    this.createTraitLevelEffect = function (effect, duration, levels) {
        return {
            type: "trait_level",
            duration: duration,
            effect: effect,
            levels: levels
        };
    }

    /**
     * 添加协同作用乘数
     * @param {number} multiplier 乘数值
     * @returns {GenerateSilentGearTrait}
     */
    this.addSynergyMultiplier = function (multiplier) {
        this.config.effects.push({
            type: "silentgear:synergy_multiplier",
            multiplier: multiplier
        })
        return this
    }

    /**
     * 添加方块填充效果
     * @param {Object} fillProperties 填充属性
     * @param {Object} sound 声音
     * @param {Object} target 目标方块
     * @param {Object} useProperties 使用属性
     * @returns {GenerateSilentGearTrait}
     */
    this.addBlockFiller = function (fillProperties, sound, target, useProperties) {
        this.config.effects.push({
            type: "silentgear:block_filler",
            fill_properties: fillProperties,
            sound: sound,
            target: target,
            use_properties: useProperties
        })
        return this
    }

    /**
     * 创建方块填充属性
     * @param {string} block 方块ID
     * @param {number} rangeX X范围
     * @param {number} rangeY Y范围
     * @param {number} rangeZ Z范围
     * @param {boolean} facingPlaneOnly 是否仅面向平面
     * @param {boolean} replaceBlockEntities 是否替换方块实体
     * @returns {Object}
     */
    this.createFillProperties = function (block, rangeX, rangeY, rangeZ, facingPlaneOnly, replaceBlockEntities) {
        return {
            block: block,
            range_x: rangeX,
            range_y: rangeY,
            range_z: rangeZ,
            facing_plane_only: facingPlaneOnly,
            replace_block_entities: replaceBlockEntities
        }
    }

    /**
     * 创建使用属性
     * @param {number} damagePerBlock 每方块伤害
     * @param {string} sneakMode 潜行模式
     * @returns {Object}
     */
    this.createUseProperties = function (damagePerBlock, sneakMode) {
        return {
            damage_per_block: damagePerBlock,
            sneak_mode: sneakMode
        }
    }

    /**
     * 添加方块挖掘速度
     * @param {string} blockTag 方块标签
     * @param {number} speedModifier 速度修饰符
     * @returns {GenerateSilentGearTrait}
     */
    this.addBlockMiningSpeed = function (blockTag, speedModifier) {
        this.config.effects.push({
            type: "silentgear:block_mining_speed",
            block_tag: blockTag,
            speed_modifier: speedModifier
        })
        return this
    }

    /**
     * 添加物品磁铁效果
     * @param {Object} affectedItems 受影响的物品
     * @param {number} effectRange 效果范围
     * @param {number} pullStrength 拉取强度
     * @returns {GenerateSilentGearTrait}
     */
    this.addItemMagnet = function (affectedItems, effectRange, pullStrength) {
        this.config.effects.push({
            type: "silentgear:item_magnet",
            affected_items: affectedItems,
            effect_range: effectRange,
            pull_strength: pullStrength
        })
        return this
    }

    /**
     * 添加额外掉落
     * @param {number} baseChance 基础几率
     * @param {number} bonusMultiplier 奖励乘数
     * @param {Object} ingredient 原料
     * @returns {GenerateSilentGearTrait}
     */
    this.addBonusDrops = function (baseChance, bonusMultiplier, ingredient) {
        this.config.effects.push({
            type: "silentgear:bonus_drops",
            base_chance: baseChance,
            bonus_multiplier: bonusMultiplier,
            ingredient: ingredient
        })
        return this
    }

    /**
     * 添加伤害减免
     * @param {string} damageTypeTag 伤害类型标签
     * @param {number} negatedDamageScale 减免伤害比例
     * @returns {GenerateSilentGearTrait}
     */
    this.addNegateDamage = function (damageTypeTag, negatedDamageScale) {
        this.config.effects.push({
            type: "silentgear:negate_damage",
            damage_type_tag: damageTypeTag,
            negated_damage_scale: negatedDamageScale
        })
        return this
    }

    /**
     * 添加自我修复
     * @param {number} activationChance 激活几率
     * @param {number} repairAmount 修复数量
     * @returns {GenerateSilentGearTrait}
     */
    this.addSelfRepair = function (activationChance, repairAmount) {
        this.config.effects.push({
            type: "silentgear:self_repair",
            activation_chance: activationChance,
            repair_amount: repairAmount
        })
        return this
    }

    /**
     * 添加属性修饰符效果
     * @param {Object} propertyModifiers 属性修饰符
     * @returns {GenerateSilentGearTrait}
     */
    this.addNumberPropertyModifier = function (propertyModifiers) {
        this.config.effects.push({
            type: "silentgear:number_property_modifier",
            property_modifiers: propertyModifiers
        })
        return this
    }

    /**
     * 添加额外伤害效果
     * @param {string} affectedEntitiesTag 受影响实体标签
     * @param {string} affectedType 影响类型
     * @param {number} bonusDamagePerLevel 每级额外伤害
     * @returns {GenerateSilentGearTrait}
     */
    this.addExtraDamage = function (affectedEntitiesTag, affectedType, bonusDamagePerLevel) {
        this.config.effects.push({
            type: "silentgear:extra_damage",
            affected_entities_tag: affectedEntitiesTag,
            affected_type: affectedType,
            bonus_damage_per_level: bonusDamagePerLevel
        })
        return this
    }

    /**
     * 添加防火效果
     * @returns {GenerateSilentGearTrait}
     */
    this.addFireproof = function () {
        this.config.effects.push({
            type: "silentgear:fireproof"
        })
        return this
    }

    /**
     * 添加耐久度效果
     * @param {number} activationChance 激活几率
     * @param {number} effectScale 效果规模
     * @returns {GenerateSilentGearTrait}
     */
    this.addDurability = function (activationChance, effectScale) {
        this.config.effects.push({
            type: "silentgear:durability",
            activation_chance: activationChance,
            effect_scale: effectScale
        })
        return this
    }

    /**
     * 添加方块放置效果
     * @param {string} block 方块ID
     * @param {number} cooldown 冷却时间
     * @param {number} damageOnUse 使用时伤害
     * @param {Object} sound 声音
     * @returns {GenerateSilentGearTrait}
     */
    this.addBlockPlacer = function (block, cooldown, damageOnUse, sound) {
        this.config.effects.push({
            type: "silentgear:block_placer",
            block: { Name: block },
            cooldown: cooldown,
            damage_on_use: damageOnUse,
            sound: sound
        })
        return this
    }

    /**
     * 添加属性效果
     * @param {Object|Array} attributeModifiers 属性修饰符
     * @param {string} slotType 槽位类型
     * @returns {GenerateSilentGearTrait}
     */
    this.addAttribute = function (attributeModifiers, slotType) {
        // 处理默认参数
        if (slotType === undefined) {
            slotType = "all/any";
        }

        var modifiersArray = [];

        // 处理单个对象
        if (typeof attributeModifiers === 'object' && !Array.isArray(attributeModifiers)) {
            modifiersArray = [attributeModifiers];
        }
        // 处理数组
        else if (Array.isArray(attributeModifiers)) {
            modifiersArray = attributeModifiers;
        }

        var attributeModifiersObj = {};
        attributeModifiersObj[slotType] = modifiersArray;

        this.config.effects.push({
            type: "silentgear:attribute",
            attribute_modifiers: attributeModifiersObj
        });
        return this;
    }
    /**
     * 添加穿戴效果
     * @param {Object} potionEffects 药水效果
     * @returns {GenerateSilentGearTrait}
     */
    this.addWielderEffect = function (potionEffects) {
        this.config.effects.push({
            type: "silentgear:wielder_effect",
            potion_effects: potionEffects
        })
        return this
    }

    /**
     * 创建属性修饰符
     * @param {string} property 属性名
     * @param {number} baseMultiplier 基础乘数
     * @param {boolean} multiplyDamageRatio 是否乘以伤害比例
     * @param {boolean} multiplyOriginalValue 是否乘以原始值
     * @returns {Object}
     */
    this.createPropertyModifier = function (property, baseMultiplier, multiplyDamageRatio, multiplyOriginalValue) {
        var result = {}
        result[property] = {
            base_multiplier: baseMultiplier,
            multiply_damage_ratio: multiplyDamageRatio,
            multiply_original_value: multiplyOriginalValue
        }
        return result
    }

    /**
     * 创建声音
     * @param {string} sound 声音ID
     * @param {number} volume 音量
     * @param {number} pitch 音调
     * @param {number} pitchDeviation 音调偏差
     * @returns {Object}
     */
    this.createSound = function (sound, volume, pitch, pitchDeviation) {
        return {
            sound: sound,
            volume: volume,
            pitch: pitch,
            pitch_deviation: pitchDeviation
        }
    }


    /**
     * 创建属性值
     * @param {string} attribute 属性ID
     * @param {string} operation 操作类型 - 可用值: "add_value", "add_multiplied_base", "add_multiplied_total"
     * @param {number[]} values 值数组，对应每个等级的值
     * @returns {Object}
     */
    this.createAttributeValue = function (attribute, operation, values) {
        return {
            attribute: attribute,
            operation: operation,
            values: values
        }
    }
    /**
     * 构建并生成特性文件
     */
    this.build = function () {
        if (!this.boolean) return

        var filePath = `kubejs/data/kubejs/silentgear_traits/auto/${this.id}.json`
        JsonIO.write(filePath, this.config)

        console.log(`[Reverie Foundry] 特性已生成到: ${filePath}`)
    }

    // 如果立即构建，调用处理器
    if (this.boolean && this.handler) {
        this.handler(this)
        this.build()
    }

    return this
}


/** 用于生成寂静装备特性 */
ItemEvents.firstLeftClicked('kubejs:drowning_fish', event => {
    if (!event.player.creative && !event.player.op) {
        event.player.tell('§c你需要创造模式或OP权限才能使用此功能');
        return;
    }

    // 检查是否启用生成
    if (!TraitConfigs.enabled) {
        event.player.tell('§c特性生成功能已禁用！请在Configs.js中设置enabled为true');
        console.log('[Reverie Foundry] 特性生成功能已禁用');
        return;
    }

    event.player.swing()

    // 遍历所有特性并生成
    Object.entries(TraitConfigs).forEach(([key, config]) => {
        if (key === 'enabled') return;

        if (config && config.id && config.config) {
            GenerateSilentGearTrait(
                config.id,
                event,
                true,
                config.config
            ).build()
        }
    });

    const folderPath = `kubejs/data/kubejs/silentgear_traits/auto/`;

    const message = Text.translate("message.silentgear_traits.down")
        .append("\n")
        .append(Text.translate("message.clickopenfile")
            .clickOpenFile(folderPath)
        );

    event.player.tell(message);
    console.log("[Reverie Foundry] 所有特性已生成完成！");
    console.log(`[Reverie Foundry] 文件已生成至：${folderPath}`);
});

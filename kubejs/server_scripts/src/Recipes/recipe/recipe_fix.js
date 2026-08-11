// 这些物品的配方不会被统一化替换
const recipeBlacklist = [
    'terra_curio:copper_watch',
    'terra_curio:tin_watch',
    'terra_curio:silver_watch',
    'terra_curio:tungsten_watch',
    'terra_curio:gold_watch',
    'terra_curio:platinum_watch'
];

/**
 * 统一化配方
 */
function OreUnificationBuilder() {
    this.ores = [];
    this.settings = {
        removeNuggets: true,
        removeBlocks: true,
        addShapeless: true,
        addBlockRecipe: true,
        addBlockCasting: false
    };
    this.tag = '';
    this.event = null;
    // 自定义粒和块ID映射
    this.customNuggets = {};
    this.customBlocks = {};
    // 跳过处理的金属列表
    this.skipNuggets = [];  // 跳过粒合成的金属
    this.skipBlocks = [];   // 跳过块合成的金属
    this.skipAll = [];      // 完全跳过处理的金属
    this.castingRecipes = {};
}

OreUnificationBuilder.prototype = {
    /**
     * 设置是否添加块铸造配方
     * @param {boolean} add - 是否添加
     */
    setAddBlockCasting: function (add) {
        this.settings.addBlockCasting = add;
        return this;
    },

    /**
        * 为指定金属锭添加块铸造配方（使用流体ID）
        * @param {string} ingot - 金属锭ID
        * @param {string} fluidId - 流体ID（如："productivemetalworks:molten_gold"）
        * @param {number} amount - 流体量（默认为810）
        */
    addBlockCastingById: function (ingot, fluidId, amount) {
        this.castingRecipes[ingot] = {
            fluidId: fluidId,
            amount: amount
        };
        return this;
    },

    /**
     * 为指定金属锭添加块铸造配方（使用流体标签）
     * @param {string} ingot - 金属锭ID
     * @param {string} fluidTag - 流体标签（如："c:molten_gold"）
     * @param {number} amount - 流体量（默认为810）
     */
    addBlockCastingByTag: function (ingot, fluidTag, amount) {
        this.castingRecipes[ingot] = {
            fluidTag: fluidTag,
            amount: amount
        };
        return this;
    },



    /**
     * 添加一个金属锭到当前层级
     * @param {string} ingot - 金属锭ID
     */
    addIngot: function (ingot) {
        this.ores.push(ingot);
        return this;
    },

    /**
     * 批量添加多个金属锭
     * @param {string[]} ingots - 金属锭ID数组
     */
    addIngots: function (ingots) {
        for (let i = 0; i < ingots.length; i++) {
            this.ores.push(ingots[i]);
        }
        return this;
    },

    /**
     * 设置标签
     * @param {string} tag - KubeJS标签
     */
    setTag: function (tag) {
        this.tag = tag;
        return this;
    },

    /**
     * 设置是否移除粒合成
     * @param {boolean} remove - 是否移除
     */
    setRemoveNuggets: function (remove) {
        this.settings.removeNuggets = remove;
        return this;
    },

    /**
     * 设置是否移除块合成
     * @param {boolean} remove - 是否移除
     */
    setRemoveBlocks: function (remove) {
        this.settings.removeBlocks = remove;
        return this;
    },

    /**
     * 设置是否添加无合成表
     * @param {boolean} add - 是否添加
     */
    setAddShapeless: function (add) {
        this.settings.addShapeless = add;
        return this;
    },

    /**
     * 设置是否添加块合成
     * @param {boolean} add - 是否添加
     */
    setAddBlockRecipe: function (add) {
        this.settings.addBlockRecipe = add;
        return this;
    },

    /**
     * 为指定金属锭设置自定义粒ID
     * @param {string} ingot - 金属锭ID
     * @param {string} nugget - 粒ID
     */
    setNugget: function (ingot, nugget) {
        this.customNuggets[ingot] = nugget;
        return this;
    },

    /**
     * 为指定金属锭设置自定义块ID
     * @param {string} ingot - 金属锭ID
     * @param {string} block - 块ID
     */
    setBlock: function (ingot, block) {
        this.customBlocks[ingot] = block;
        return this;
    },

    /**
     * 批量设置自定义粒ID
     * @param {Object} nuggets - {ingot: nugget} 映射
     */
    setNuggets: function (nuggets) {
        for (const ingot in nuggets) {
            this.customNuggets[ingot] = nuggets[ingot];
        }
        return this;
    },

    /**
     * 批量设置自定义块ID
     * @param {Object} blocks - {ingot: block} 映射
     */
    setBlocks: function (blocks) {
        for (const ingot in blocks) {
            this.customBlocks[ingot] = blocks[ingot];
        }
        return this;
    },

    /**
     * 跳过指定金属的粒处理
     * @param {string} ingot - 金属锭ID
     */
    skipNugget: function (ingot) {
        this.skipNuggets.push(ingot);
        return this;
    },

    /**
     * 跳过指定金属的块处理
     * @param {string} ingot - 金属锭ID
     */
    skipBlock: function (ingot) {
        this.skipBlocks.push(ingot);
        return this;
    },

    /**
     * 跳过指定金属的所有处理（只做标签替换）
     * @param {string} ingot - 金属锭ID
     */
    skipAllProcessing: function (ingot) {
        this.skipAll.push(ingot);
        return this;
    },

    /**
     * 批量跳过粒处理
     * @param {string[]} ingots - 金属锭ID数组
     */
    skipNuggetsList: function (ingots) {
        for (let i = 0; i < ingots.length; i++) {
            this.skipNuggets.push(ingots[i]);
        }
        return this;
    },

    /**
     * 批量跳过块处理
     * @param {string[]} ingots - 金属锭ID数组
     */
    skipBlocksList: function (ingots) {
        for (let i = 0; i < ingots.length; i++) {
            this.skipBlocks.push(ingots[i]);
        }
        return this;
    },

    /**
     * 批量跳过所有处理
     * @param {string[]} ingots - 金属锭ID数组
     */
    skipAllProcessingList: function (ingots) {
        for (let i = 0; i < ingots.length; i++) {
            this.skipAll.push(ingots[i]);
        }
        return this;
    },

    /**
     * 内部方法：检查是否跳过某功能
     */
    _shouldSkip: function (ingot, functionName) {
        if (this.skipAll.includes(ingot)) {
            return true;  // 完全跳过
        }

        if (functionName === 'nugget' && this.skipNuggets.includes(ingot)) {
            return true;  // 跳过粒处理
        }

        if (functionName === 'block' && this.skipBlocks.includes(ingot)) {
            return true;  // 跳过块处理
        }

        return false;
    },

    /**
     * 内部方法：获取粒ID
     */
    _getNuggetId: function (ingot) {
        // 优先使用自定义粒ID
        if (this.customNuggets[ingot]) {
            return this.customNuggets[ingot];
        }
        // 否则生成默认粒ID
        const parts = ingot.split(':');
        const mod = parts[0];
        const item = parts[1];
        const baseItem = item.replace('_ingot', '');
        return `${mod}:${baseItem}_nugget`;
    },

    /**
     * 内部方法：获取块ID
     */
    _getBlockId: function (ingot) {
        // 优先使用自定义块ID
        if (this.customBlocks[ingot]) {
            return this.customBlocks[ingot];
        }
        // 否则生成默认块ID
        const parts = ingot.split(':');
        const mod = parts[0];
        const item = parts[1];
        const baseItem = item.replace('_ingot', '');
        return `${mod}:${baseItem}_block`;
    },

    /**
        * 内部方法：添加块铸造配方
        */
    _addBlockCastingRecipe: function (ingot) {
        if (!this.settings.addBlockCasting ||
            this._shouldSkip(ingot, 'block') ||
            !this.castingRecipes[ingot]) {
            return;
        }

        const blockId = this._getBlockId(ingot);
        const recipe = this.castingRecipes[ingot];

        // 构建流体配置
        const fluidConfig = {
            amount: recipe.amount
        };

        // 根据是否有fluidId或fluidTag设置流体
        if (recipe.fluidId) {
            fluidConfig.fluid = recipe.fluidId;
        } else if (recipe.fluidTag) {
            fluidConfig.tag = recipe.fluidTag;
        } else {
            console.log(`没有为 ${ingot} 设置流体ID或标签`);
            return;
        }

        // 添加块铸造配方
        this.event.custom({
            type: 'productivemetalworks:block_casting',
            cast: [],
            consume_cast: false,
            fluid: fluidConfig,
            result: {
                count: 1,
                id: blockId
            }
        });
    },
    /**
    * 内部方法：处理单个金属
    */
    _processSingleMetal: function (ingot) {
        // 检查是否完全跳过处理
        if (this._shouldSkip(ingot, 'all')) {
            // 只做标签替换
            this.event.replaceInput({ input: ingot }, ingot, this.tag);
            return;
        }

        // 处理粒相关
        if (!this._shouldSkip(ingot, 'nugget')) {
            const nuggetId = this._getNuggetId(ingot);

            // 移除原有粒合成（只移除工作台配方）
            if (this.settings.removeNuggets) {
                this.event.remove({
                    output: nuggetId,
                    type: 'minecraft:crafting'
                });
            }

            // 添加新粒合成：1个锭 → 9个粒
            if (this.settings.addShapeless) {
                this.event.shapeless(
                    Item.of(nuggetId, 9),
                    [ingot]  // 使用具体锭，不用标签
                );
            }
        }

        // 处理块相关
        if (!this._shouldSkip(ingot, 'block')) {
            const blockId = this._getBlockId(ingot);

            // 移除原有块合成（只移除工作台配方）
            if (this.settings.removeBlocks) {
                this.event.remove({
                    output: blockId,
                    type: 'minecraft:crafting'
                });
            }

            // 块分解为锭：1个块 → 9个锭
            if (this.settings.addShapeless) {
                this.event.shapeless(
                    Item.of(ingot, 9),
                    [blockId]
                );
            }

            // 锭合成块：9个锭 → 1个块
            if (this.settings.addBlockRecipe) {
                this.event.shaped(
                    Item.of(blockId),
                    ['III', 'III', 'III'],
                    { I: ingot }  // 使用具体锭，不用标签
                );
            }

            // 添加块铸造配方
            this._addBlockCastingRecipe(ingot);
        }

        // 替换其他配方中的输入（工具、装备等）
        // 排除产出粒和块的配方
        const nuggetId = this._getNuggetId(ingot);
        const blockId = this._getBlockId(ingot);
        const notFilters = [];

        if (!this._shouldSkip(ingot, 'nugget')) {
            notFilters.push({ output: nuggetId });
        }
        if (!this._shouldSkip(ingot, 'block')) {
            notFilters.push({ output: blockId });
        }

        if (notFilters.length > 0) {
            this.event.replaceInput(
                {
                    input: ingot,
                    not: notFilters
                },
                ingot,
                this.tag
            );
        } else {
            this.event.replaceInput(
                { input: ingot },
                ingot,
                this.tag
            );
        }
    },

    /**
     * 注册配方
     * @param {Object} event 
     */
    register: function (event) {
        this.event = event;

        const savedRecipes = {};
        for (let i = 0; i < this.skipAll.length; i++) {
            let item = this.skipAll[i];
            let recipes = event.findRecipes({ output: item });
            if (recipes && recipes.length > 0) {
                savedRecipes[item] = recipes.map(r => r.json);
            }
        }

        // 逐个处理每个金属（不再批量替换）
        for (let i = 0; i < this.ores.length; i++) {
            this._processSingleMetal(this.ores[i]);
        }

        // 恢复黑名单配方的原始配方
        for (let item in savedRecipes) {
            event.remove({ output: item });
            for (let recipeJson of savedRecipes[item]) {
                event.custom(recipeJson);
            }
        }

        return this;
    },
};



ServerEvents.tags('item', event => {
    event.add('kubejs:ingots/tier_0',
        'minecraft:copper_ingot',
        'alltheores:tin_ingot'
    )
    event.add('kubejs:ingots/tier_1',
        'alltheores:lead_ingot',
        'minecraft:iron_ingot'
    )

    event.add('kubejs:ingots/tier_2',
        'kubejs:tungsten_ingot',
        'iceandfire:silver_ingot'
    )
    event.add('kubejs:ingots/tier_3',
        'minecraft:gold_ingot',
        'alltheores:platinum_ingot'
    )

    event.add('kubejs:gem/tier_0',
        'iceandfire:sapphire_gem',
        'minecraft:emerald'
    )
    event.add('kubejs:gem/tier_1',
        'kubejs:ruby',
        'minecraft:diamond'
    )

    event.add('kubejs:gem/tier_2',
        'minecraft:amethyst_shard',
        'kubejs:topaz'
    )

    event.add('kubejs:gem/tier_3',
        'minecraft:redstone',
        'alltheores:cinnabar'
    )
});


ServerEvents.recipes(event => {
    new OreUnificationBuilder()
        .setTag('#kubejs:ingots/tier_1')
        .addIngots(['minecraft:iron_ingot', 'alltheores:lead_ingot'])
        .setAddBlockCasting(true)
        .setRemoveNuggets(true)
        .setRemoveBlocks(true)
        .setAddShapeless(true)
        .addBlockCastingByTag('minecraft:iron_ingot', 'c:molten_iron', 810)
        .addBlockCastingByTag('alltheores:lead_ingot', 'c:molten_lead', 810)
        .skipAllProcessingList(recipeBlacklist)
        .register(event);

    new OreUnificationBuilder()
        .setTag('#kubejs:ingots/tier_0')
        .addIngots(['minecraft:copper_ingot', 'alltheores:tin_ingot'])
        .setAddBlockCasting(true)
        .setRemoveNuggets(true)
        .setRemoveBlocks(true)
        .setAddShapeless(true)
        .addBlockCastingByTag('minecraft:copper_ingot', 'c:molten_copper', 810)
        .addBlockCastingByTag('alltheores:tin_ingot', 'c:molten_tin', 810)
        .setNugget('minecraft:copper_ingot', 'create:copper_nugget')
        .skipAllProcessingList(recipeBlacklist)
        .register(event);

    new OreUnificationBuilder()
        .setTag('#kubejs:ingots/tier_2')
        .addIngots(['kubejs:tungsten_ingot', 'iceandfire:silver_ingot'])
        .setAddBlockCasting(true)
        .setRemoveNuggets(true)
        .setRemoveBlocks(true)
        .setAddShapeless(true)
        .addBlockCastingByTag('iceandfire:silver_ingot', 'c:molten_silver', 810)
        .skipNugget('kubejs:tungsten_ingot')
        .skipBlock('kubejs:tungsten_ingot')
        .skipAllProcessingList(recipeBlacklist)
        .register(event);

    new OreUnificationBuilder()
        .setTag('#kubejs:ingots/tier_3')
        .addIngots(['minecraft:gold_ingot', 'alltheores:platinum_ingot'])
        .setAddBlockCasting(true)
        .setRemoveNuggets(true)
        .setRemoveBlocks(true)
        .setAddShapeless(true)
        .addBlockCastingByTag('minecraft:gold_ingot', 'c:molten_gold', 810)
        .addBlockCastingByTag('alltheores:platinum_ingot', 'c:molten_platinum', 810)
        .skipAllProcessingList(recipeBlacklist)
        .register(event);

    new OreUnificationBuilder()
        .setTag('#kubejs:gem/tier_0')
        .addIngots(['iceandfire:sapphire_gem', 'minecraft:emerald'])
        .setAddBlockCasting(true)
        .setRemoveNuggets(true)
        .setRemoveBlocks(true)
        .setAddShapeless(true)
        .skipNuggetsList(['iceandfire:sapphire_gem', 'minecraft:emerald'])
        .setBlock('iceandfire:sapphire_gem', 'iceandfire:sapphire_block')
        .addBlockCastingById('minecraft:emerald', 'productivemetalworks:molten_emerald', 810)
        .skipAllProcessingList(recipeBlacklist)
        .register(event);

    new OreUnificationBuilder()
        .setTag('#kubejs:gem/tier_1')
        .addIngots(['kubejs:ruby', 'minecraft:diamond'])
        .setAddBlockCasting(true)
        .setRemoveNuggets(true)
        .setRemoveBlocks(true)
        .setAddShapeless(true)
        .skipNuggetsList(['kubejs:ruby', 'minecraft:diamond'])
        .addBlockCastingById('minecraft:diamond', 'productivemetalworks:molten_diamond', 810)
        .setBlock('kubejs:ruby', 'alltheores:ruby_block')
        .skipAllProcessingList(recipeBlacklist)
        .register(event);

    new OreUnificationBuilder()
        .setTag('#kubejs:gem/tier_2')
        .addIngots(['minecraft:amethyst_shard', 'kubejs:topaz'])
        .setRemoveNuggets(true)
        .setRemoveBlocks(true)
        .setAddShapeless(true)
        .skipBlock('minecraft:amethyst_shard')
        .skipNuggetsList(['kubejs:topaz', 'minecraft:amethyst_shard'])
        .setBlock('kubejs:topaz', 'silentgems:topaz_block')
        .skipAllProcessingList(recipeBlacklist)
        .register(event);

    new OreUnificationBuilder()
        .setTag('#kubejs:gem/tier_3')
        .addIngots(['minecraft:redstone', 'alltheores:cinnabar'])
        .setAddBlockCasting(true)
        .setRemoveNuggets(true)
        .setRemoveBlocks(true)
        .setAddShapeless(true)
        .skipNuggetsList(['minecraft:redstone', 'alltheores:cinnabar'])
        .addBlockCastingById('minecraft:redstone', 'productivemetalworks:molten_redstone', 900)
        .skipAllProcessingList(recipeBlacklist)
        .register(event);
});
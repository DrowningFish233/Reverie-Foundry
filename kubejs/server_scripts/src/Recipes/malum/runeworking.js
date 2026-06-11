//符文工艺配方
/**
 * 符文工艺配方
 * @param {string|Object} input - 主输入物品
 * @param {string|Object} result - 输出物品
 */
function RuneworkingRecipeJSON(input, result) {
    this.type = "malum:runeworking";

    // 处理主输入
    if (typeof input === 'string') {
        const parts = input.split('x ');
        this.input = {
            item: parts[1] || parts[0],
            count: parseInt(parts[0]) || 1
        };
    } else {
        this.input = input;
    }

    // 处理输出
    if (typeof result === 'string') {
        this.result = {
            id: result,
            count: 1
        };
    } else {
        this.result = result;
    }

    // 初始化次要输入
    this.secondaryInput = {
        item: "",
        count: 1
    };

    this.soundType = "";
}

RuneworkingRecipeJSON.prototype = {
    /**
     * 设置输入数量
     * @param {number} count - 输入物品数量
     */
    setInputCount: function (count) {
        this.input.count = count;
        return this;
    },

    /**
     * 设置输出数量
     * @param {number} count - 输出物品数量
     */
    setOutputCount: function (count) {
        this.result.count = count;
        return this;
    },

    /**
     * 设置次要输入物品和数量
     * @param {string} item - 次要输入物品ID
     * @param {number} count - 次要输入物品数量
     */
    setSecondaryInput: function (item, count) {
        this.secondaryInput.item = item;
        this.secondaryInput.count = count || 1;
        return this;
    },

    /**
     * 设置声音类型
     * @param {string} soundType - 声音类型
     */
    setSoundType: function (soundType) {
        this.soundType = soundType;
        return this;
    }
};

ServerEvents.recipes(event => {
    function registerCustomRecipe(recipeModel) {
        event.custom(recipeModel);
    }

    registerCustomRecipe(
        new RuneworkingRecipeJSON("irons_spellbooks:arcane_essence", "kubejs:cobalt_ingot")
            .setInputCount(8)
            .setSecondaryInput("alltheores:nickel_ingot", 1)
            .setSoundType("malum:runic_workbench_shapes_tainted_rune")
    );

    registerCustomRecipe(
        new RuneworkingRecipeJSON("create:brass_ingot", "kubejs:acril_ingot")
            .setInputCount(1)
            .setSecondaryInput("irons_spellbooks:lightning_bottle", 1)
            .setSoundType("malum:runic_workbench_shapes_tainted_rune")
    );
})

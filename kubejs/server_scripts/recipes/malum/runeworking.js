//

/**
 * 配方构造函数
 * @param {Object} primaryInput - 主输入物品
 * @param {Object} result - 输出物品
 * @param {Object} spiritInput - 精魂输入
 */
function RuneworkingRecipe(primaryInput, result, spiritInput) {
    this.type = "malum:runeworking";
    this.primaryInput = {
        item: primaryInput.item,
        count: primaryInput.count || 1
    };
    this.result = {
        id: result.id,
        count: result.count || 1
    };
    this.secondaryInput = {
        type: spiritInput.type,
        count: spiritInput.count
    };
    this.conditions = [];
}

// 原型方法
RuneworkingRecipe.prototype = {
    /**
     * 设置配方分组
     * @param {string} group - 分组名称
     */
    setGroup: function (group) {
        this.group = group;
        return this;
    }
};

ServerEvents.recipes(event => {
    // 包装注册函数（自动处理条件字段）
    const register = recipe => {
        const json = JSON.parse(JSON.stringify(recipe));
        if (json.conditions && json.conditions.length === 0) delete json.conditions;
        event.custom(json);
    };
    // 所需精魂:'earthen', 'aqueous', 'aerial', 'eldritch', 'arcane', 'wicked', 'sacred', 'infernal'
    register(
        new RuneworkingRecipe(
            { item: "malum:tainted_rock", count: 4 }, // 输入
            { id: "minecraft:enchanted_golden_apple", count: 1 }, // 输出
            { type: "aqueous", count: 16 } // 精魂 (输入)
        )
    );

});
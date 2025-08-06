/**
 * 灵能转化配方构造函数
 * @param {string|Object} input - 输入物品（可传物品ID或带count的对象）
 * @param {string|Object} output - 输出物品（可传物品ID或带count的对象）
 */
function SpiritTransmutationRecipe(input, output) {
    this.type = "malum:spirit_transmutation";
    this.group = ""; // 默认无分组

    // 处理输入物品格式
    this.ingredient = typeof input === 'string' ?
        { item: input } :
        { item: input.item, count: input.count || 1 };

    // 处理输出物品格式
    this.output = typeof output === 'string' ?
        { id: output, count: 1 } :
        { id: output.id, count: output.count || 1 };
}

// 原型方法
SpiritTransmutationRecipe.prototype = {
    /**
     * 设置配方分组
     * @param {string} group - 分组名称（如"mud"）
     */
    setGroup: function (group) {
        this.group = group;
        return this;
    }
};


ServerEvents.recipes(event => {
    const register = recipe => {
        const json = JSON.parse(JSON.stringify(recipe));
        if (json.conditions && json.conditions.length === 0) delete json.conditions;
        event.custom(json);
    };

    register(
        new SpiritTransmutationRecipe(
            { item: "minecraft:sand", count: 2 }, // 2个沙子
            { id: "minecraft:white_wool", count: 1 }
        )
    );
});
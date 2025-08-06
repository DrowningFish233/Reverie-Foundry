//精魂修复
function SpiritRepairRecipe(inputs, repairMaterial, spirits) {
    this.type = "malum:spirit_repair";
    this.durabilityPercentage = 0.5; // 默认50%耐久修复
    this.inputs = inputs;
    this.repairMaterial = repairMaterial;
    this.spirits = spirits;
    this.itemIdRegex = "";
}

SpiritRepairRecipe.prototype = {
    //控制修复后物品的耐久恢复比例
    setDurability: function (percentage) {
        this.durabilityPercentage = percentage;
        return this;
    },
    //通过正则表达式匹配需要修复的物品ID
    setItemIdRegex: function (regex) {
        this.itemIdRegex = regex;
        return this;
    }
};



ServerEvents.recipes(event => {
    function registerCustomRecipe(recipeModel) {
        event.custom(recipeModel);
    }

    registerCustomRecipe(
        new SpiritRepairRecipe(
            ["minecraft:mace"],  // 修复物品
            { item: "minecraft:iron_ingot", count: 2 },  // 修复材料
            [ // 所需精魂:'earthen', 'aqueous', 'aerial', 'eldritch', 'arcane', 'wicked', 'sacred', 'infernal'
                { type: "earthen", count: 8 },
                { type: "infernal", count: 2 }
            ]
        )
            .setDurability(0.5)  // 修复50%耐久
    );
});
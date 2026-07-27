//精魂修复配方
/**
 * 精魂修复配方
 */
function SpiritRepairRecipeJSON() {
    this.type = "malum:spirit_repair";
    this.spirits = [];
    this.validItems = [];
}

SpiritRepairRecipeJSON.prototype = {
    /**
     * 设置修复材料
     * @param {string} item - 物品ID
     * @param {number} count - 数量
     */
    setRepairMaterial: function (item, count) {
        this.repairMaterial = { item: item, count: count || 1 };
        return this;
    },

    /**
     * 设置修复材料标签
     * @param {string} tag - 标签ID
     * @param {number} count - 数量
     */
    setRepairMaterialTag: function (tag, count) {
        this.repairMaterial = { tag: tag, count: count || 1 };
        return this;
    },

    /**
     * 设置耐久度百分比
     * @param {number} percentage - 耐久度百分比 (0-1)
     */
    setDurabilityPercentage: function (percentage) {
        this.durabilityPercentage = percentage;
        return this;
    },

    /**
     * 添加精魂
     * @param {string} type - 精魂类型
     * @param {number} count - 精魂数量
     */
    addSpirit: function (type, count) {
        this.spirits.push({ type: `malum:${type}`, count: count });
        return this;
    },

    /**
     * 添加有效物品
     * @param {string} itemId - 物品ID
     */
    addValidItem: function (itemId) {
        this.validItems.push(itemId);
        return this;
    }
};

ServerEvents.recipes(event => {
    function registerCustomRecipe(recipeModel) {
        event.custom(recipeModel);
    }
    // 精魂修复配方

    registerCustomRecipe(
        new SpiritRepairRecipeJSON()
            .setRepairMaterial('malum:living_flesh', 1)
            .addSpirit("wicked", 2)
            .addSpirit("sacred", 2)
            .addSpirit("arcane", 2)
            .addSpirit("eldritch", 2)
            .setDurabilityPercentage(0.3)
            .addValidItem('reveriefoundry:whip')
    );

    registerCustomRecipe(
        new SpiritRepairRecipeJSON()
            .setRepairMaterial('malum:living_flesh', 1)
            .addSpirit("wicked", 2)
            .addSpirit("sacred", 2)
            .addSpirit("arcane", 2)
            .addSpirit("eldritch", 2)
            .setDurabilityPercentage(0.3)
            .addValidItem('reveriefoundry:boomerang')
    );

    registerCustomRecipe(
        new SpiritRepairRecipeJSON()
            .setRepairMaterial('malum:living_flesh', 1)
            .addSpirit("wicked", 2)
            .addSpirit("sacred", 2)
            .addSpirit("arcane", 2)
            .addSpirit("eldritch", 2)
            .setDurabilityPercentage(0.3)
            .addValidItem('reveriefoundry:yoyos')
    );

    registerCustomRecipe(
        new SpiritRepairRecipeJSON()
            .setRepairMaterial('malum:living_flesh', 1)
            .addSpirit("wicked", 2)
            .addSpirit("sacred", 2)
            .addSpirit("arcane", 2)
            .addSpirit("eldritch", 2)
            .setDurabilityPercentage(0.3)
            .addValidItem('reveriefoundry:pump_charge_shotgun')
    );

    registerCustomRecipe(
        new SpiritRepairRecipeJSON()
            .setRepairMaterial('malum:living_flesh', 1)
            .addSpirit("wicked", 2)
            .addSpirit("sacred", 2)
            .addSpirit("arcane", 2)
            .addSpirit("eldritch", 2)
            .setDurabilityPercentage(0.3)
            .addValidItem('reveriefoundry:sundering_anchor')
    );

    registerCustomRecipe(
        new SpiritRepairRecipeJSON()
            .setRepairMaterial('malum:living_flesh', 1)
            .addSpirit("wicked", 2)
            .addSpirit("sacred", 2)
            .addSpirit("arcane", 2)
            .addSpirit("eldritch", 2)
            .setDurabilityPercentage(0.3)
            .addValidItem('reveriefoundry:sundering_anchor')
    );

    registerCustomRecipe(
        new SpiritRepairRecipeJSON()
            .setRepairMaterial('irons_spellbooks:arcane_essence', 8)
            .addSpirit("infernal", 2)
            .addSpirit("earthen", 2)
            .addSpirit("sacred", 2)
            .setDurabilityPercentage(0.3)
            .addValidItem('reveriefoundry:flamberge')
    );

    registerCustomRecipe(
        new SpiritRepairRecipeJSON()
            .setRepairMaterial('irons_spellbooks:arcane_essence', 8)
            .addSpirit("aqueous", 2)
            .addSpirit("earthen", 2)
            .addSpirit("sacred", 2)
            .setDurabilityPercentage(0.3)
            .addValidItem('reveriefoundry:furioso')
    );

    registerCustomRecipe(
        new SpiritRepairRecipeJSON()
            .setRepairMaterial('irons_spellbooks:arcane_essence', 8)
            .addSpirit("aqueous", 2)
            .addSpirit("earthen", 2)
            .addSpirit("sacred", 2)
            .setDurabilityPercentage(0.3)
            .addValidItem('reveriefoundry:cane')
    );

    registerCustomRecipe(
        new SpiritRepairRecipeJSON()
            .setRepairMaterial('irons_spellbooks:arcane_essence', 8)
            .addSpirit("aqueous", 2)
            .addSpirit("earthen", 2)
            .addSpirit("sacred", 2)
            .setDurabilityPercentage(0.3)
            .addValidItem('reveriefoundry:weight_of_worlds')
    );

    registerCustomRecipe(
        new SpiritRepairRecipeJSON()
            .setRepairMaterial('irons_spellbooks:arcane_essence', 8)
            .addSpirit("aqueous", 2)
            .addSpirit("earthen", 2)
            .addSpirit("sacred", 2)
            .setDurabilityPercentage(0.3)
            .addValidItem('reveriefoundry:unwinding_chaos_staff')
    );

    registerCustomRecipe(
        new SpiritRepairRecipeJSON()
            .setRepairMaterial('irons_spellbooks:arcane_essence', 8)
            .addSpirit("aqueous", 2)
            .addSpirit("earthen", 2)
            .addSpirit("sacred", 2)
            .setDurabilityPercentage(0.3)
            .addValidItem('reveriefoundry:hex_staff')
    );

    registerCustomRecipe(
        new SpiritRepairRecipeJSON()
            .setRepairMaterial('irons_spellbooks:arcane_essence', 8)
            .addSpirit("aqueous", 2)
            .addSpirit("earthen", 2)
            .addSpirit("sacred", 2)
            .setDurabilityPercentage(0.3)
            .addValidItem('reveriefoundry:tyrving')
    );

    registerCustomRecipe(
        new SpiritRepairRecipeJSON()
            .setRepairMaterial('irons_spellbooks:arcane_essence', 8)
            .addSpirit("aqueous", 2)
            .addSpirit("earthen", 2)
            .addSpirit("sacred", 2)
            .setDurabilityPercentage(0.3)
            .addValidItem('reveriefoundry:tidal_claws')
    );

    registerCustomRecipe(
        new SpiritRepairRecipeJSON()
            .setRepairMaterial('irons_spellbooks:arcane_essence', 8)
            .addSpirit("aqueous", 2)
            .addSpirit("earthen", 2)
            .addSpirit("sacred", 2)
            .setDurabilityPercentage(0.3)
            .addValidItem('reveriefoundry:greatsword')
    );

    registerCustomRecipe(
        new SpiritRepairRecipeJSON()
            .setRepairMaterial('irons_spellbooks:arcane_essence', 8)
            .addSpirit("aqueous", 2)
            .addSpirit("earthen", 2)
            .addSpirit("sacred", 2)
            .setDurabilityPercentage(0.3)
            .addValidItem('reveriefoundry:lightning_spike')
    );

    registerCustomRecipe(
        new SpiritRepairRecipeJSON()
            .setRepairMaterial('irons_spellbooks:arcane_essence', 8)
            .addSpirit("aqueous", 2)
            .addSpirit("earthen", 2)
            .addSpirit("sacred", 2)
            .setDurabilityPercentage(0.3)
            .addValidItem('reveriefoundry:tiansha_star_blade')
    );

    registerCustomRecipe(
        new SpiritRepairRecipeJSON()
            .setRepairMaterial('irons_spellbooks:arcane_essence', 8)
            .addSpirit("aqueous", 2)
            .addSpirit("earthen", 2)
            .addSpirit("sacred", 2)
            .setDurabilityPercentage(0.3)
            .addValidItem('reveriefoundry:wide_excavator')
    );

    registerCustomRecipe(
        new SpiritRepairRecipeJSON()
            .setRepairMaterial('irons_spellbooks:arcane_essence', 8)
            .addSpirit("aqueous", 2)
            .addSpirit("earthen", 2)
            .addSpirit("sacred", 2)
            .setDurabilityPercentage(0.3)
            .addValidItem('reveriefoundry:astrape')
    );

    registerCustomRecipe(
        new SpiritRepairRecipeJSON()
            .setRepairMaterial('irons_spellbooks:arcane_essence', 8)
            .addSpirit("aqueous", 2)
            .addSpirit("earthen", 2)
            .addSpirit("sacred", 2)
            .setDurabilityPercentage(0.3)
            .addValidItem('reveriefoundry:ceraunus')
    );

    registerCustomRecipe(
        new SpiritRepairRecipeJSON()
            .setRepairMaterial('irons_spellbooks:arcane_essence', 8)
            .addSpirit("aqueous", 2)
            .addSpirit("earthen", 2)
            .addSpirit("sacred", 2)
            .setDurabilityPercentage(0.3)
            .addValidItem('reveriefoundry:autoloader_crossbow')
    );

    registerCustomRecipe(
        new SpiritRepairRecipeJSON()
            .setRepairMaterial('irons_spellbooks:arcane_essence', 8)
            .addSpirit("aqueous", 2)
            .addSpirit("earthen", 2)
            .addSpirit("sacred", 2)
            .setDurabilityPercentage(0.3)
            .addValidItem('reveriefoundry:brontes')
    );

    registerCustomRecipe(
        new SpiritRepairRecipeJSON()
            .setRepairMaterial('irons_spellbooks:arcane_essence', 8)
            .addSpirit("aqueous", 2)
            .addSpirit("earthen", 2)
            .addSpirit("sacred", 2)
            .setDurabilityPercentage(0.3)
            .addValidItem('reveriefoundry:ancient_spear')
    );

    registerCustomRecipe(
        new SpiritRepairRecipeJSON()
            .setRepairMaterial('irons_spellbooks:arcane_essence', 8)
            .addSpirit("aqueous", 2)
            .addSpirit("earthen", 2)
            .addSpirit("sacred", 2)
            .setDurabilityPercentage(0.3)
            .addValidItem('reveriefoundry:incinerator')
    );

    registerCustomRecipe(
        new SpiritRepairRecipeJSON()
            .setRepairMaterial('irons_spellbooks:arcane_essence', 8)
            .addSpirit("aqueous", 2)
            .addSpirit("earthen", 2)
            .addSpirit("sacred", 2)
            .setDurabilityPercentage(0.3)
            .addValidItem('reveriefoundry:meat_shredder')
    );

    registerCustomRecipe(
        new SpiritRepairRecipeJSON()
            .setRepairMaterial('irons_spellbooks:arcane_essence', 8)
            .addSpirit("aqueous", 2)
            .addSpirit("earthen", 2)
            .addSpirit("sacred", 2)
            .setDurabilityPercentage(0.3)
            .addValidItem('reveriefoundry:annihilator')
    );

    registerCustomRecipe(
        new SpiritRepairRecipeJSON()
            .setRepairMaterial('irons_spellbooks:arcane_essence', 8)
            .addSpirit("aqueous", 2)
            .addSpirit("earthen", 2)
            .addSpirit("sacred", 2)
            .setDurabilityPercentage(0.3)
            .addValidItem('reveriefoundry:flame_bulwark')
    );

    registerCustomRecipe(
        new SpiritRepairRecipeJSON()
            .setRepairMaterial('irons_spellbooks:arcane_essence', 8)
            .addSpirit("aqueous", 2)
            .addSpirit("earthen", 2)
            .addSpirit("sacred", 2)
            .setDurabilityPercentage(0.3)
            .addValidItem('reveriefoundry:scythe')
    );

    registerCustomRecipe(
        new SpiritRepairRecipeJSON()
            .setRepairMaterial('irons_spellbooks:arcane_essence', 8)
            .addSpirit("aqueous", 2)
            .addSpirit("earthen", 2)
            .addSpirit("sacred", 2)
            .setDurabilityPercentage(0.3)
            .addValidItem('reveriefoundry:robe_boots')
    );

    registerCustomRecipe(
        new SpiritRepairRecipeJSON()
            .setRepairMaterial('irons_spellbooks:arcane_essence', 8)
            .addSpirit("aqueous", 2)
            .addSpirit("earthen", 2)
            .addSpirit("sacred", 2)
            .setDurabilityPercentage(0.3)
            .addValidItem('reveriefoundry:robe_leggings')
    );

    registerCustomRecipe(
        new SpiritRepairRecipeJSON()
            .setRepairMaterial('irons_spellbooks:arcane_essence', 8)
            .addSpirit("aqueous", 2)
            .addSpirit("earthen", 2)
            .addSpirit("sacred", 2)
            .setDurabilityPercentage(0.3)
            .addValidItem('reveriefoundry:robe_chestplate')
    );

    registerCustomRecipe(
        new SpiritRepairRecipeJSON()
            .setRepairMaterial('irons_spellbooks:arcane_essence', 8)
            .addSpirit("aqueous", 2)
            .addSpirit("earthen", 2)
            .addSpirit("sacred", 2)
            .setDurabilityPercentage(0.3)
            .addValidItem('reveriefoundry:robe_helmet')
    );

    registerCustomRecipe(
        new SpiritRepairRecipeJSON()
            .setRepairMaterial('irons_spellbooks:arcane_essence', 8)
            .addSpirit("aqueous", 2)
            .addSpirit("earthen", 2)
            .addSpirit("sacred", 2)
            .setDurabilityPercentage(0.3)
            .addValidItem('reveriefoundry:heavy_boots')
    );

    registerCustomRecipe(
        new SpiritRepairRecipeJSON()
            .setRepairMaterial('irons_spellbooks:arcane_essence', 8)
            .addSpirit("aqueous", 2)
            .addSpirit("earthen", 2)
            .addSpirit("sacred", 2)
            .setDurabilityPercentage(0.3)
            .addValidItem('reveriefoundry:heavy_leggings')
    );

    registerCustomRecipe(
        new SpiritRepairRecipeJSON()
            .setRepairMaterial('irons_spellbooks:arcane_essence', 8)
            .addSpirit("aqueous", 2)
            .addSpirit("earthen", 2)
            .addSpirit("sacred", 2)
            .setDurabilityPercentage(0.3)
            .addValidItem('reveriefoundry:heavy_chestplate')
    );

    registerCustomRecipe(
        new SpiritRepairRecipeJSON()
            .setRepairMaterial('irons_spellbooks:arcane_essence', 8)
            .addSpirit("aqueous", 2)
            .addSpirit("earthen", 2)
            .addSpirit("sacred", 2)
            .setDurabilityPercentage(0.3)
            .addValidItem('reveriefoundry:heavy_helmet')
    );

    registerCustomRecipe(
        new SpiritRepairRecipeJSON()
            .setRepairMaterial('irons_spellbooks:arcane_essence', 8)
            .addSpirit("aqueous", 2)
            .addSpirit("earthen", 2)
            .addSpirit("sacred", 2)
            .setDurabilityPercentage(0.3)
            .addValidItem('reveriefoundry:spellbook')
    );

    registerCustomRecipe(
        new SpiritRepairRecipeJSON()
            .setRepairMaterial('irons_spellbooks:arcane_essence', 8)
            .addSpirit("aqueous", 2)
            .addSpirit("earthen", 2)
            .addSpirit("sacred", 2)
            .setDurabilityPercentage(0.3)
            .addValidItem('reveriefoundry:staff')
    );

    registerCustomRecipe(
        new SpiritRepairRecipeJSON()
            .setRepairMaterial('irons_spellbooks:arcane_essence', 8)
            .addSpirit("aqueous", 2)
            .addSpirit("earthen", 2)
            .addSpirit("sacred", 2)
            .setDurabilityPercentage(0.3)
            .addValidItem('reveriefoundry:soul_spear')
    );

    registerCustomRecipe(
        new SpiritRepairRecipeJSON()
            .setRepairMaterial('irons_spellbooks:arcane_essence', 8)
            .addSpirit("aqueous", 2)
            .addSpirit("earthen", 2)
            .addSpirit("sacred", 2)
            .setDurabilityPercentage(0.3)
            .addValidItem('reveriefoundry:infernal_forge')
    );
    registerCustomRecipe(
        new SpiritRepairRecipeJSON()
            .setRepairMaterial('irons_spellbooks:arcane_essence', 8)
            .addSpirit("aqueous", 2)
            .addSpirit("earthen", 2)
            .addSpirit("sacred", 2)
            .setDurabilityPercentage(0.3)
            .addValidItem('silentgear:sword')
    );

    registerCustomRecipe(
        new SpiritRepairRecipeJSON()
            .setRepairMaterial('irons_spellbooks:arcane_essence', 8)
            .addSpirit("aqueous", 2)
            .addSpirit("earthen", 2)
            .addSpirit("sacred", 2)
            .setDurabilityPercentage(0.3)
            .addValidItem('silentgear:katana')
    );

    registerCustomRecipe(
        new SpiritRepairRecipeJSON()
            .setRepairMaterial('irons_spellbooks:arcane_essence', 8)
            .addSpirit("aqueous", 2)
            .addSpirit("earthen", 2)
            .addSpirit("sacred", 2)
            .setDurabilityPercentage(0.3)
            .addValidItem('silentgear:machete')
    );

    registerCustomRecipe(
        new SpiritRepairRecipeJSON()
            .setRepairMaterial('irons_spellbooks:arcane_essence', 8)
            .addSpirit("aqueous", 2)
            .addSpirit("earthen", 2)
            .addSpirit("sacred", 2)
            .setDurabilityPercentage(0.3)
            .addValidItem('silentgear:knife')
    );

    registerCustomRecipe(
        new SpiritRepairRecipeJSON()
            .setRepairMaterial('irons_spellbooks:arcane_essence', 8)
            .addSpirit("aqueous", 2)
            .addSpirit("earthen", 2)
            .addSpirit("sacred", 2)
            .setDurabilityPercentage(0.3)
            .addValidItem('silentgear:dagger')
    );

    registerCustomRecipe(
        new SpiritRepairRecipeJSON()
            .setRepairMaterial('irons_spellbooks:arcane_essence', 8)
            .addSpirit("aqueous", 2)
            .addSpirit("earthen", 2)
            .addSpirit("sacred", 2)
            .setDurabilityPercentage(0.3)
            .addValidItem('silentgear:spear')
    );

    registerCustomRecipe(
        new SpiritRepairRecipeJSON()
            .setRepairMaterial('irons_spellbooks:arcane_essence', 8)
            .addSpirit("aqueous", 2)
            .addSpirit("earthen", 2)
            .addSpirit("sacred", 2)
            .setDurabilityPercentage(0.3)
            .addValidItem('silentgear:trident')
    );

    registerCustomRecipe(
        new SpiritRepairRecipeJSON()
            .setRepairMaterial('irons_spellbooks:arcane_essence', 8)
            .addSpirit("aqueous", 2)
            .addSpirit("earthen", 2)
            .addSpirit("sacred", 2)
            .setDurabilityPercentage(0.3)
            .addValidItem('silentgear:mace')
    );

    registerCustomRecipe(
        new SpiritRepairRecipeJSON()
            .setRepairMaterial('irons_spellbooks:arcane_essence', 8)
            .addSpirit("aqueous", 2)
            .addSpirit("earthen", 2)
            .addSpirit("sacred", 2)
            .setDurabilityPercentage(0.3)
            .addValidItem('silentgear:shield')
    );

    registerCustomRecipe(
        new SpiritRepairRecipeJSON()
            .setRepairMaterial('irons_spellbooks:arcane_essence', 8)
            .addSpirit("aqueous", 2)
            .addSpirit("earthen", 2)
            .addSpirit("sacred", 2)
            .setDurabilityPercentage(0.3)
            .addValidItem('silentgear:bow')
    );

    registerCustomRecipe(
        new SpiritRepairRecipeJSON()
            .setRepairMaterial('irons_spellbooks:arcane_essence', 8)
            .addSpirit("aqueous", 2)
            .addSpirit("earthen", 2)
            .addSpirit("sacred", 2)
            .setDurabilityPercentage(0.3)
            .addValidItem('silentgear:crossbow')
    );

    registerCustomRecipe(
        new SpiritRepairRecipeJSON()
            .setRepairMaterial('irons_spellbooks:arcane_essence', 8)
            .addSpirit("aqueous", 2)
            .addSpirit("earthen", 2)
            .addSpirit("sacred", 2)
            .setDurabilityPercentage(0.3)
            .addValidItem('silentgear:slingshot')
    );

    registerCustomRecipe(
        new SpiritRepairRecipeJSON()
            .setRepairMaterial('irons_spellbooks:arcane_essence', 8)
            .addSpirit("aqueous", 2)
            .addSpirit("earthen", 2)
            .addSpirit("sacred", 2)
            .setDurabilityPercentage(0.3)
            .addValidItem('silentgear:pickaxe')
    );

    registerCustomRecipe(
        new SpiritRepairRecipeJSON()
            .setRepairMaterial('irons_spellbooks:arcane_essence', 8)
            .addSpirit("aqueous", 2)
            .addSpirit("earthen", 2)
            .addSpirit("sacred", 2)
            .setDurabilityPercentage(0.3)
            .addValidItem('silentgear:shovel')
    );

    registerCustomRecipe(
        new SpiritRepairRecipeJSON()
            .setRepairMaterial('irons_spellbooks:arcane_essence', 8)
            .addSpirit("aqueous", 2)
            .addSpirit("earthen", 2)
            .addSpirit("sacred", 2)
            .setDurabilityPercentage(0.3)
            .addValidItem('silentgear:axe')
    );

    registerCustomRecipe(
        new SpiritRepairRecipeJSON()
            .setRepairMaterial('irons_spellbooks:arcane_essence', 8)
            .addSpirit("aqueous", 2)
            .addSpirit("earthen", 2)
            .addSpirit("sacred", 2)
            .setDurabilityPercentage(0.3)
            .addValidItem('silentgear:paxel')
    );

    registerCustomRecipe(
        new SpiritRepairRecipeJSON()
            .setRepairMaterial('irons_spellbooks:arcane_essence', 8)
            .addSpirit("aqueous", 2)
            .addSpirit("earthen", 2)
            .addSpirit("sacred", 2)
            .setDurabilityPercentage(0.3)
            .addValidItem('silentgear:hammer')
    );

    registerCustomRecipe(
        new SpiritRepairRecipeJSON()
            .setRepairMaterial('irons_spellbooks:arcane_essence', 8)
            .addSpirit("aqueous", 2)
            .addSpirit("earthen", 2)
            .addSpirit("sacred", 2)
            .setDurabilityPercentage(0.3)
            .addValidItem('silentgear:excavator')
    );

    registerCustomRecipe(
        new SpiritRepairRecipeJSON()
            .setRepairMaterial('irons_spellbooks:arcane_essence', 8)
            .addSpirit("aqueous", 2)
            .addSpirit("earthen", 2)
            .addSpirit("sacred", 2)
            .setDurabilityPercentage(0.3)
            .addValidItem('silentgear:saw')
    );

    registerCustomRecipe(
        new SpiritRepairRecipeJSON()
            .setRepairMaterial('irons_spellbooks:arcane_essence', 8)
            .addSpirit("aqueous", 2)
            .addSpirit("earthen", 2)
            .addSpirit("sacred", 2)
            .setDurabilityPercentage(0.3)
            .addValidItem('silentgear:prospector_hammer')
    );

    registerCustomRecipe(
        new SpiritRepairRecipeJSON()
            .setRepairMaterial('irons_spellbooks:arcane_essence', 8)
            .addSpirit("aqueous", 2)
            .addSpirit("earthen", 2)
            .addSpirit("sacred", 2)
            .setDurabilityPercentage(0.3)
            .addValidItem('silentgear:mattock')
    );

    registerCustomRecipe(
        new SpiritRepairRecipeJSON()
            .setRepairMaterial('irons_spellbooks:arcane_essence', 8)
            .addSpirit("aqueous", 2)
            .addSpirit("earthen", 2)
            .addSpirit("sacred", 2)
            .setDurabilityPercentage(0.3)
            .addValidItem('silentgear:hoe')
    );

    registerCustomRecipe(
        new SpiritRepairRecipeJSON()
            .setRepairMaterial('irons_spellbooks:arcane_essence', 8)
            .addSpirit("aqueous", 2)
            .addSpirit("earthen", 2)
            .addSpirit("sacred", 2)
            .setDurabilityPercentage(0.3)
            .addValidItem('silentgear:sickle')
    );

    registerCustomRecipe(
        new SpiritRepairRecipeJSON()
            .setRepairMaterial('irons_spellbooks:arcane_essence', 8)
            .addSpirit("aqueous", 2)
            .addSpirit("earthen", 2)
            .addSpirit("sacred", 2)
            .setDurabilityPercentage(0.3)
            .addValidItem('silentgear:shears')
    );

    registerCustomRecipe(
        new SpiritRepairRecipeJSON()
            .setRepairMaterial('irons_spellbooks:arcane_essence', 8)
            .addSpirit("aqueous", 2)
            .addSpirit("earthen", 2)
            .addSpirit("sacred", 2)
            .setDurabilityPercentage(0.3)
            .addValidItem('silentgear:fishing_rod')
    );

    registerCustomRecipe(
        new SpiritRepairRecipeJSON()
            .setRepairMaterial('irons_spellbooks:arcane_essence', 8)
            .addSpirit("aqueous", 2)
            .addSpirit("earthen", 2)
            .addSpirit("sacred", 2)
            .setDurabilityPercentage(0.3)
            .addValidItem('silentgear:helmet')
    );

    registerCustomRecipe(
        new SpiritRepairRecipeJSON()
            .setRepairMaterial('irons_spellbooks:arcane_essence', 8)
            .addSpirit("aqueous", 2)
            .addSpirit("earthen", 2)
            .addSpirit("sacred", 2)
            .setDurabilityPercentage(0.3)
            .addValidItem('silentgear:leggings')
    );

    registerCustomRecipe(
        new SpiritRepairRecipeJSON()
            .setRepairMaterial('irons_spellbooks:arcane_essence', 8)
            .addSpirit("aqueous", 2)
            .addSpirit("earthen", 2)
            .addSpirit("sacred", 2)
            .setDurabilityPercentage(0.3)
            .addValidItem('silentgear:chestplate')
    );

    registerCustomRecipe(
        new SpiritRepairRecipeJSON()
            .setRepairMaterial('irons_spellbooks:arcane_essence', 8)
            .addSpirit("aqueous", 2)
            .addSpirit("earthen", 2)
            .addSpirit("sacred", 2)
            .setDurabilityPercentage(0.3)
            .addValidItem('silentgear:boots')
    );

    registerCustomRecipe(
        new SpiritRepairRecipeJSON()
            .setRepairMaterial('irons_spellbooks:arcane_essence', 8)
            .addSpirit("aqueous", 2)
            .addSpirit("earthen", 2)
            .addSpirit("sacred", 2)
            .setDurabilityPercentage(0.3)
            .addValidItem('silentgear:elytra')
    );
})

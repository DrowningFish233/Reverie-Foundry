//精魂灌注配方
/**
 * 精魂灌注配方
 * @param {string|Object} input - 主输入物品ID、标签或对象 {item: "id", count: number}
 * @param {string|Object} result - 输出物品ID或对象 {id: "item_id", count: number}
 * @param {Array} spirits - 消耗的精魂类型和数量
 * @param {Array} extraInputs - 额外输入材料列表
 */
function SpiritInfusionRecipeJSON(input, result, spirits, extraInputs) {
    this.type = "malum:spirit_infusion";

    // 处理输入
    if (typeof input === 'string') {
        if (input.startsWith('#')) {
            this.input = { tag: input.substring(1), count: 1 };
        } else {
            this.input = { item: input, count: 1 };
        }
    } else {
        this.input = input;
    }

    // 处理输出
    if (typeof result === 'string') {
        this.result = { id: result, count: 1 };
    } else {
        this.result = result;
    }

    this.spirits = spirits || [];
    this.extraInputs = extraInputs || [];
}

SpiritInfusionRecipeJSON.prototype = {
    /**
     * 添加额外输入材料
     * @param {string|Object} item - 物品ID、标签或带count的对象
     * @param {number} [count=1] - 物品数量（可选）
     */
    addExtraInput: function (item, count) {
        let entry;
        if (typeof item === 'string') {
            if (item.startsWith('#')) {
                entry = { tag: item.substring(1), count: count || 1 };
            } else {
                entry = { item: item, count: count || 1 };
            }
        } else {
            if (item.tag) {
                entry = { tag: item.tag, count: item.count || 1 };
            } else {
                entry = { item: item.item, count: item.count || 1 };
            }
        }
        this.extraInputs.push(entry);
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
    }
};

ServerEvents.recipes(event => {
    function registerCustomRecipe(recipeModel) {
        event.custom(recipeModel);
    }

    registerCustomRecipe(
        new SpiritInfusionRecipeJSON("kubejs:starfury", "hazennstuff:starfury")
            .addSpirit("aqueous", 3)
            .addSpirit("aerial", 3)
            .addSpirit("earthen", 3)
            .addSpirit("eldritch", 3)
            .addSpirit("arcane", 3)
            .addSpirit("wicked", 3)
            .addSpirit("sacred", 3)
            .addSpirit("infernal", 3)
            .addExtraInput("irons_spellbooks:arcane_essence", 16)
    );


    registerCustomRecipe(
        new SpiritInfusionRecipeJSON("minecraft:paper", "irons_spellbooks:iron_spell_book")
            .addSpirit("earthen", 2)
            .addExtraInput("minecraft:leather", 4)
            .addExtraInput("minecraft:chain", 3)
    );

    registerCustomRecipe(
        new SpiritInfusionRecipeJSON("minecraft:paper", "irons_spellbooks:copper_spell_book")
            .setInputCount(6)
            .addSpirit("sacred", 2)
            .addExtraInput("minecraft:string", 2)
            .addExtraInput("minecraft:copper_ingot", 2)
    );

    registerCustomRecipe(
        new SpiritInfusionRecipeJSON("irons_spellbooks:ruined_book", "irons_spellbooks:ice_spell_book")
            .addSpirit("eldritch", 6)
            .addSpirit("arcane", 6)
            .addSpirit("aqueous", 6)
            .addSpirit("wicked", 6)
            .addExtraInput("irons_spellbooks:mithril_scrap", 2)
            .addExtraInput("irons_spellbooks:ice_venom_vial", 3)
            .addExtraInput("irons_spellbooks:magic_cloth", 3)
    );

    registerCustomRecipe(
        new SpiritInfusionRecipeJSON("irons_spellbooks:ruined_book", "irons_spellbooks:cursed_doll_spell_book")
            .addSpirit("eldritch", 6)
            .addSpirit("arcane", 3)
            .addSpirit("aqueous", 3)
            .addSpirit("earthen", 3)
            .addSpirit("wicked", 6)
            .addExtraInput("irons_spellbooks:bloody_vellum", 4)
            .addExtraInput("irons_spellbooks:arcane_ingot", 2)
    );

    registerCustomRecipe(
        new SpiritInfusionRecipeJSON("irons_spellbooks:ruined_book", "irons_spellbooks:netherite_spell_book")
            .addSpirit("umbral", 32)
            .addExtraInput("irons_spellbooks:lightning_bottle", 1)
            .addExtraInput("irons_spellbooks:blood_vial", 2)
            .addExtraInput("irons_spellbooks:magic_cloth", 4)
            .addExtraInput("minecraft:netherite_ingot", 1)
    );

    registerCustomRecipe(
        new SpiritInfusionRecipeJSON("irons_spellbooks:rotten_spell_book", "irons_spellbooks:druidic_spell_book")
            .addSpirit("earthen", 4)
            .addSpirit("aqueous", 2)
            .addSpirit("sacred", 4)
            .addSpirit("aerial", 1)
            .addExtraInput("irons_spellbooks:magic_cloth", 2)
            .addExtraInput("minecraft:glow_ink_sac", 1)
            .addExtraInput("minecraft:amethyst_cluster", 1)
            .addExtraInput("minecraft:spore_blossom", 1)
    );

    registerCustomRecipe(
        new SpiritInfusionRecipeJSON("minecraft:enchanted_book", "irons_spellbooks:diamond_spell_book")
            .addSpirit("sacred", 2)
            .addSpirit("arcane", 2)
            .addSpirit("eldritch", 2)
            .addSpirit("infernal", 2)
            .addExtraInput("irons_spellbooks:magic_cloth", 2)
            .addExtraInput("irons_spellbooks:hogskin", 4)
            .addExtraInput("minecraft:diamond", 2)
    );

    registerCustomRecipe(
        new SpiritInfusionRecipeJSON("irons_spellbooks:ruined_book", "irons_spellbooks:dragonskin_spell_book")
            .addSpirit("aerial", 2)
            .addSpirit("eldritch", 2)
            .addSpirit("umbral", 2)
            .addExtraInput("irons_spellbooks:dragonskin", 6)
            .addExtraInput("#c:obsidians", 2)
    );

    registerCustomRecipe(
        new SpiritInfusionRecipeJSON("irons_spellbooks:hogskin", "irons_spellbooks:gold_spell_book")
            .setInputCount(2)
            .addSpirit("earthen", 2)
            .addSpirit("arcane", 2)
            .addSpirit("sacred", 2)
            .addExtraInput("irons_spellbooks:arcane_essence", 4)
            .addExtraInput("minecraft:gold_ingot", 3)
    );

    registerCustomRecipe(
        new SpiritInfusionRecipeJSON("irons_spellbooks:gold_spell_book", "irons_spellbooks:blaze_spell_book")
            .addSpirit("infernal", 4)
            .addSpirit("eldritch", 2)
            .addSpirit("arcane", 2)
            .addExtraInput("irons_spellbooks:cinder_essence", 4)
            .addExtraInput("minecraft:blaze_powder", 4)
    );

    registerCustomRecipe(
        new SpiritInfusionRecipeJSON("irons_spellbooks:iron_spell_book", "irons_spellbooks:rotten_spell_book")
            .addSpirit("aqueous", 2)
            .addSpirit("earthen", 2)
            .addSpirit("sacred", 2)
            .addSpirit("eldritch", 2)
            .addExtraInput("minecraft:iron_sword", 1)
            .addExtraInput("minecraft:poisonous_potato", 1)
            .addExtraInput("minecraft:rotten_flesh", 3)
            .addExtraInput("irons_spellbooks:common_ink", 1)
            .addExtraInput("irons_spellbooks:arcane_essence", 1)
    );

    registerCustomRecipe(
        new SpiritInfusionRecipeJSON("minecraft:enchanted_book", "irons_spellbooks:ruined_book")
            .addSpirit("eldritch", 2)
            .addSpirit("wicked", 2)
            .addSpirit("umbral", 2)
            .addExtraInput("minecraft:echo_shard", 3)
            .addExtraInput("irons_spellbooks:shriving_stone", 1)
    );

    registerCustomRecipe(
        new SpiritInfusionRecipeJSON("gobber2:gobber2_ring", "gobber2:gobber2_ring_attraction")
            .addSpirit("arcane", 3)
            .addExtraInput("kubejs:magnetite_ingot", 3)
            .addExtraInput("#c:ender_pearls", 2)
            .addExtraInput("minecraft:redstone", 2)
            .addExtraInput("minecraft:lapis_lazuli", 2)
    );
    event.remove({ output: 'gobber2:gobber2_ring_attraction' });

    registerCustomRecipe(
        new SpiritInfusionRecipeJSON("gobber2:gobber2_ring", "gobber2:gobber2_ring_ascent")
            .addSpirit("aerial", 12)
            .addSpirit("umbral", 2)
            .addSpirit("arcane", 4)
            .addSpirit("sacred", 4)
            .addExtraInput("minecraft:shulker_shell", 2)
            .addExtraInput("cataclysm:void_jaw", 4)
            .addExtraInput("#c:feathers", 2)
    );
    event.remove({ output: 'gobber2:gobber2_ring_ascent' });

    registerCustomRecipe(
        new SpiritInfusionRecipeJSON("gobber2:gobber2_ring_nether", "gobber2:gobber2_ring_curing")
            .addSpirit("infernal", 12)
            .addSpirit("umbral", 2)
            .addSpirit("sacred", 4)
            .addSpirit("arcane", 4)
            .addSpirit("aqueous", 4)
            .addSpirit("earthen", 4)
            .addExtraInput("terra_curio:ankh_charm", 1)
            .addExtraInput("minecraft:milk_bucket", 3)
            .addExtraInput("minecraft:nether_wart", 3)
            .addExtraInput("minecraft:fermented_spider_eye", 3)
    );
    event.remove({ output: 'gobber2:gobber2_ring_curing' });

    registerCustomRecipe(
        new SpiritInfusionRecipeJSON("gobber2:gobber2_ring_nether", "gobber2:gobber2_ring_vision")
            .addSpirit("arcane", 6)
            .addSpirit("umbral", 6)
            .addSpirit("sacred", 6)
            .addExtraInput("#kubejs:night_vision", 4)
            .addExtraInput("minecraft:nether_wart", 4)
    );
    event.remove({ output: 'gobber2:gobber2_ring_vision' });

    registerCustomRecipe(
        new SpiritInfusionRecipeJSON("gobber2:gobber2_ring_end", "gobber2:gobber2_ring_traveler")
            .addSpirit("sacred", 6)
            .addSpirit("umbral", 6)
            .addExtraInput("gobber2:gobber2_ring_blink", 1)
            .addExtraInput("gobber2:gobber2_ring_ascent", 1)
            .addExtraInput("gobber2:gobber2_ring_swiftness", 1)
            .addExtraInput("gobber2:gobber2_leggings_end", 1)
    );
    event.remove({ output: 'gobber2:gobber2_ring_traveler' });

    registerCustomRecipe(
        new SpiritInfusionRecipeJSON("gobber2:gobber2_ring_end", "gobber2:gobber2_ring_airwalking")
            .addSpirit("aerial", 6)
            .addSpirit("umbral", 3)
            .addExtraInput("minecraft:ghast_tear", 1)
            .addExtraInput("gobber2:gobber2_ring_ascent", 1)
            .addExtraInput("gobber2:gobber2_ring_swiftness", 1)
            .addExtraInput("gobber2:gobber2_leggings_end", 1)
    );
    event.remove({ output: 'gobber2:gobber2_ring_airwalking' });

    registerCustomRecipe(
        new SpiritInfusionRecipeJSON("malum:mnemonic_fragment", "kubejs:limpid_spirit")
            .addSpirit("earthen", 1)
            .addSpirit("aqueous", 1)
            .addSpirit("aerial", 1)
            .addSpirit("eldritch", 1)
            .addSpirit("arcane", 1)
            .addSpirit("wicked", 1)
            .addSpirit("sacred", 1)
            .addSpirit("infernal", 1)
            .addExtraInput("create:experience_nugget", 9)
    );

    registerCustomRecipe(
        new SpiritInfusionRecipeJSON("minecraft:wooden_shovel", "irons_spellbooks:graybeard_staff")
            .addSpirit("arcane", 1)
            .addExtraInput("minecraft:iron_ingot", 1)
            .addExtraInput("irons_spellbooks:arcane_essence", 2)
    );
    event.remove({ output: 'irons_spellbooks:graybeard_staff' });

    registerCustomRecipe(
        new SpiritInfusionRecipeJSON("irons_spellbooks:permafrost_shard", "irons_spellbooks:ice_staff")
            .addSpirit("arcane", 3)
            .addSpirit("sacred", 3)
            .addExtraInput("irons_spellbooks:frosted_helve", 1)
    );
    event.remove({ output: 'irons_spellbooks:ice_staff' });

    registerCustomRecipe(
        new SpiritInfusionRecipeJSON("minecraft:amethyst_shard", "irons_spellbooks:artificer_cane")
            .addSpirit("eldritch", 3)
            .addSpirit("infernal", 3)
            .addExtraInput("malum:hallowed_gold_ingot", 1)
            .addExtraInput("#malum:runewood_planks", 3)
    );
    event.remove({ output: 'irons_spellbooks:artificer_cane' });

    registerCustomRecipe(
        new SpiritInfusionRecipeJSON("irons_spellbooks:pyrium_ingot", "irons_spellbooks:pyrium_staff")
            .setInputCount(2)
            .addSpirit("eldritch", 3)
            .addSpirit("infernal", 3)
            .addSpirit("earthen", 3)
            .addSpirit("wicked", 3)
            .addExtraInput("irons_spellbooks:magic_cloth", 1)
            .addExtraInput("minecraft:netherite_ingot", 1)
    );
    event.remove({ output: 'irons_spellbooks:pyrium_staff' });

    registerCustomRecipe(
        new SpiritInfusionRecipeJSON("gobber2:gobber2_ring_end", "gobber2:gobber2_ring_stealth")
            .addSpirit("umbral", 6)
            .addSpirit("eldritch", 3)
            .addSpirit("arcane", 3)
            .addExtraInput("minecraft:fermented_spider_eye", 4)
            .addExtraInput("kubejs:unholy_essence", 8)
            .addExtraInput("enderscape:shadoline_ingot", 8)
    );
    event.remove({ output: 'gobber2:gobber2_ring_stealth' });

    registerCustomRecipe(
        new SpiritInfusionRecipeJSON("gobber2:gobber2_medallion", "gobber2:gobber2_medallion_hero")
            .addSpirit("umbral", 2)
            .addExtraInput("minecraft:emerald_block", 5)
            .addExtraInput("create:experience_block", 3)
            .addExtraInput("malum:block_of_brilliance", 3)
    );
    event.remove({ output: 'gobber2:gobber2_medallion_hero' });

    registerCustomRecipe(
        new SpiritInfusionRecipeJSON('malum:malignant_pewter_ingot', 'kubejs:lustful_haze_alloy')
            .addSpirit("umbral", 8)
            .addSpirit("wicked", 12)
            .addSpirit("aqueous", 16)
            .addExtraInput('malum:hex_ash', 32)
            .addExtraInput('irons_spellbooks:pyrium_ingot', 1)
            .addExtraInput('malum:imitation_flesh', 4)
            .addExtraInput('malum:warp_flux', 12)
            .addExtraInput('hazennstuff:starkissed_zenalite', 2)
    );
});
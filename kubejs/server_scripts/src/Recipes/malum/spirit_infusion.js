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

    registerCustomRecipe(
        new SpiritInfusionRecipeJSON('kubejs:meat_ingots', 'kubejs:rhexis_ingot')
            .addSpirit("sacred", 8)
            .addSpirit("arcane", 8)
            .addSpirit("aqueous", 8)
            .addExtraInput('malum:imitation_flesh', 4)
            .addExtraInput('malum:living_flesh', 8)
            .addExtraInput('kubejs:meat', 16)
            .addExtraInput('#minecraft:meat', 32)
    );

    registerCustomRecipe(
        new SpiritInfusionRecipeJSON('kubejs:rhexis_ingot', 'kubejs:vorant_ingot')
            .addSpirit("umbral", 2)
            .addExtraInput('kubejs:rhexis_ingot', 1)
            .addExtraInput('silentgear:crimson_steel_ingot', 2)
            .addExtraInput('ftboceanmobs:sludge_ball', 4)
            .addExtraInput('#minecraft:meat', 8)
    );

    registerCustomRecipe(
        new SpiritInfusionRecipeJSON('iceandfire:sapphire_gem', 'kubejs:sapphire')
            .addSpirit("umbral", 1)
            .addExtraInput('alltheores:fluorite_dust', 8)
            .addExtraInput('silentgear:diamond_shard', 4)
            .addExtraInput('malum:mnemonic_fragment', 8)
    );

    registerCustomRecipe(
        new SpiritInfusionRecipeJSON('kubejs:magic_fluorite', 'kubejs:chalyblux_ingot')
            .addSpirit("umbral", 1)
            .addExtraInput('#c:ingots', 2)
            .addExtraInput('kubejs:soul_of_light', 6)
            .addExtraInput('kubejs:soul_of_night', 6)
    );

    registerCustomRecipe(
        new SpiritInfusionRecipeJSON('#kubejs:perfusion', 'kubejs:luteous_ingot')
            .addSpirit("arcane", 16)
            .addSpirit("umbral", 1)
            .addExtraInput('kubejs:soul_of_light', 4)
            .addExtraInput('kubejs:soul_of_night', 4)
            .addExtraInput('malum:mnemonic_fragment', 6)
            .addExtraInput('malum:malignant_lead', 3)
            .addExtraInput('malum:null_slate', 4)
            .addExtraInput('malum:hex_ash', 16)
    );

    registerCustomRecipe(
        new SpiritInfusionRecipeJSON('alshanex_familiars:mysterious_orb', 'alshanex_familiars:bard_trinket')
            .addSpirit("arcane", 16)
            .addExtraInput('kubejs:soul_of_light', 4)
            .addExtraInput('minecraft:note_block', 2)
            .addExtraInput('alshanex_familiars:sound_rune', 4)
    );

    registerCustomRecipe(
        new SpiritInfusionRecipeJSON('alshanex_familiars:mysterious_orb', 'alshanex_familiars:bard_harp')
            .addSpirit("arcane", 16)
            .addExtraInput('kubejs:soul_of_light', 4)
            .addExtraInput('minecraft:stick', 8)
            .addExtraInput('minecraft:string', 6)
            .addExtraInput('alshanex_familiars:sound_rune', 2)
    );

    registerCustomRecipe(
        new SpiritInfusionRecipeJSON('#silentgems:glowroses', 'kubejs:bismuthgems')
            .addSpirit("infernal", 8)
            .addSpirit("aerial", 8)
            .addSpirit("earthen", 8)
            .addExtraInput('kubejs:necroplasm', 4)
            .addExtraInput('alltheores:fluorite', 12)
            .addExtraInput('#c:gems', 8)
            .addExtraInput('#silentgear:starlight_charger_catalysts', 4)
    );

    registerCustomRecipe(
        new SpiritInfusionRecipeJSON('#silentgems:glowroses', 'kubejs:ultranium_gem')
            .addSpirit("umbral", 6)
            .addExtraInput('kubejs:ashes_of_calamity', 2)
            .addExtraInput('kubejs:necroplasm', 6)
            .addExtraInput('malum:fused_consciousness', 1)
            .addExtraInput('malum:mnemonic_fragment', 4)
            .addExtraInput('malum:null_slate', 4)
            .addExtraInput('#c:gems', 6)
            .addExtraInput('#silentgear:starlight_charger_catalysts', 2)
    );

    registerCustomRecipe(
        new SpiritInfusionRecipeJSON('#c:ingots/uranium', 'kubejs:achroous_ingot')
            .addSpirit("sacred", 6)
            .addSpirit("earthen", 6)
            .addExtraInput('malum:warp_flux', 2)
            .addExtraInput('malum:hex_ash', 8)
            .addExtraInput('malum:refined_soulstone', 4)
    );

    registerCustomRecipe(
        new SpiritInfusionRecipeJSON('irons_spellbooks:mithril_ingot', 'kubejs:mythril_ingot')
            .addSpirit("wicked", 6)
            .addSpirit("infernal", 6)
            .addExtraInput('malum:warp_flux', 2)
            .addExtraInput('malum:hex_ash', 8)
            .addExtraInput('malum:refined_soulstone', 4)
    );
    //召唤仪式
    registerCustomRecipe(
        new SpiritInfusionRecipeJSON('kubejs:gold_crown', 'terra_entity:king_slime_spawn_egg')
            .addSpirit("earthen", 6)
            .addSpirit("arcane", 3)
            .addExtraInput('minecraft:slime_ball', 16)
            .addExtraInput('minecraft:honey_bottle', 1)
    );

    //召唤仪式
    registerCustomRecipe(
        new SpiritInfusionRecipeJSON('malum:imitation_flesh', 'terra_entity:cthulhu_eye_spawn_egg')
            .addSpirit("wicked", 6)
            .addSpirit("eldritch", 6)
            .addExtraInput('minecraft:slime_ball', 4)
            .addExtraInput('kubejs:meat', 6)
            .addExtraInput('iceandfire:ectoplasm', 3)
    );

    //召唤仪式
    registerCustomRecipe(
        new SpiritInfusionRecipeJSON('minecraft:skeleton_skull', 'terra_entity:skeletron_spawn_egg')
            .addSpirit("wicked", 6)
            .addSpirit("eldritch", 6)
            .addExtraInput('#c:bones', 12)
            .addExtraInput('#kubejs:evil_materials', 4)
            .addExtraInput('iceandfire:ectoplasm', 2)
            .addExtraInput('kubejs:necroplasm', 1)
    );

    //召唤仪式
    registerCustomRecipe(
        new SpiritInfusionRecipeJSON('kubejs:necroplasm', 'terra_entity:eater_of_world_spawn_egg')
            .addSpirit("wicked", 6)
            .addSpirit("eldritch", 6)
            .addExtraInput('alshanex_familiars:spider_fang', 4)
            .addExtraInput('kubejs:meat', 6)
    );

    //召唤仪式
    registerCustomRecipe(
        new SpiritInfusionRecipeJSON('kubejs:necroplasm', 'terra_entity:brain_of_cthulhu_spawn_egg')
            .addSpirit("wicked", 6)
            .addSpirit("eldritch", 6)
            .addExtraInput('#minecraft:meat', 4)
            .addExtraInput('kubejs:meat', 6)
    );

    //召唤仪式
    registerCustomRecipe(
        new SpiritInfusionRecipeJSON('kubejs:necroplasm', 'terra_entity:queen_bee_spawn_egg')
            .addSpirit("earthen", 6)
            .addSpirit("aerial", 6)
            .addExtraInput('minecraft:feather', 4)
            .addExtraInput('alshanex_familiars:spider_fang', 3)
    );


    //召唤仪式
    registerCustomRecipe(
        new SpiritInfusionRecipeJSON('kubejs:necroplasm', 'kubejs:summon_gauntlet')
            .addSpirit("infernal", 6)
            .addSpirit("eldritch", 6)
            .addExtraInput('minecraft:ancient_debris', 1)
            .addExtraInput('minecraft:ender_eye', 1)
            .addExtraInput('minecraft:netherrack', 16)
            .addExtraInput('minecraft:iron_ingot', 8)
    );

    //召唤仪式
    registerCustomRecipe(
        new SpiritInfusionRecipeJSON('kubejs:necroplasm', 'kubejs:summon_lich')
            .addSpirit("wicked", 6)
            .addSpirit("aerial", 6)
            .addExtraInput('bosses_of_mass_destruction:soul_star', 1)
            .addExtraInput('hazennstuff:permafrost_fragment', 4)
            .addExtraInput('#extradelight:chilling_items', 8)
            .addExtraInput('#c:bones', 8)
    );

    //召唤仪式
    registerCustomRecipe(
        new SpiritInfusionRecipeJSON('kubejs:necroplasm', 'kubejs:summon_obsidilith')
            .addSpirit("wicked", 6)
            .addSpirit("earthen", 6)
            .addExtraInput('minecraft:obsidian', 6)
            .addExtraInput('minecraft:end_stone', 12)
            .addExtraInput('minecraft:ender_eye', 8)
    );

    //召唤仪式
    registerCustomRecipe(
        new SpiritInfusionRecipeJSON('kubejs:necroplasm', 'kubejs:summon_void_blossom')
            .addSpirit("sacred", 6)
            .addSpirit("earthen", 6)
            .addExtraInput('#c:seeds', 3)
            .addExtraInput('create:tree_fertilizer', 5)
            .addExtraInput('irons_spellbooks:arcane_essence', 8)
    );

    //召唤仪式
    registerCustomRecipe(
        new SpiritInfusionRecipeJSON('kubejs:necroplasm', 'kubejs:summon_fire_boss')
            .addSpirit("arcane", 6)
            .addSpirit("infernal", 6)
            .addExtraInput('irons_spellbooks:cinder_essence', 4)
            .addExtraInput('irons_spellbooks:arcane_essence', 12)
    );

    //召唤仪式
    registerCustomRecipe(
        new SpiritInfusionRecipeJSON('kubejs:necroplasm', 'kubejs:summon_dead_king')
            .addSpirit("arcane", 6)
            .addSpirit("eldritch", 6)
            .addExtraInput('#c:bones', 8)
            .addExtraInput('irons_spellbooks:magic_cloth', 3)
            .addExtraInput('minecraft:skeleton_skull', 1)
    );

    //召唤仪式
    registerCustomRecipe(
        new SpiritInfusionRecipeJSON('minecraft:amethyst_block', 'kubejs:summon_dead_king')
            .addSpirit("arcane", 6)
            .addSpirit("eldritch", 6)
            .addExtraInput('#c:bones', 8)
            .addExtraInput('minecraft:amethyst_shard', 6)
            .addExtraInput('#kubejs:evil_materials', 2)
    );

    //召唤仪式
    registerCustomRecipe(
        new SpiritInfusionRecipeJSON('kubejs:necroplasm', 'kubejs:summon_ignis')
            .addSpirit("sacred", 6)
            .addSpirit("infernal", 6)
            .addExtraInput('minecraft:magma_block', 8)
            .addExtraInput('cataclysm:flame_eye', 1)
    );

    //召唤仪式
    registerCustomRecipe(
        new SpiritInfusionRecipeJSON('kubejs:necroplasm', 'kubejs:summon_ignis')
            .addSpirit("sacred", 6)
            .addSpirit("infernal", 6)
            .addExtraInput('minecraft:magma_block', 8)
            .addExtraInput('cataclysm:burning_ashes', 1)
            .addExtraInput('cataclysm:dying_ember', 4)
    );

    //召唤仪式
    registerCustomRecipe(
        new SpiritInfusionRecipeJSON('kubejs:necroplasm', 'kubejs:summon_the_leviathan')
            .addSpirit("eldritch", 6)
            .addSpirit("aqueous", 6)
            .addExtraInput('#kubejs:coral', 4)
            .addExtraInput('minecraft:nautilus_shell', 2)
            .addExtraInput('cataclysm:abyss_eye', 1)
    );

    //召唤仪式
    registerCustomRecipe(
        new SpiritInfusionRecipeJSON('kubejs:necroplasm', 'kubejs:summon_ancient_remnant')
            .addSpirit("earthen", 6)
            .addSpirit("sacred", 6)
            .addExtraInput('#c:sands', 4)
            .addExtraInput('minecraft:emerald', 2)
            .addExtraInput('cataclysm:desert_eye', 1)
            .addExtraInput('minecraft:gold_ingot', 2)
            .addExtraInput('minecraft:rotten_flesh', 2)
            .addExtraInput('#c:bones', 2)
    );

    //召唤仪式
    registerCustomRecipe(
        new SpiritInfusionRecipeJSON('kubejs:necroplasm', 'kubejs:summon_ancient_remnant')
            .addSpirit("earthen", 6)
            .addSpirit("sacred", 6)
            .addExtraInput('#c:sands', 16)
            .addExtraInput('minecraft:emerald', 4)
            .addExtraInput('cataclysm:ancient_metal_ingot', 2)
            .addExtraInput('minecraft:gold_ingot', 4)
            .addExtraInput('minecraft:rotten_flesh', 4)
            .addExtraInput('#c:bones', 4)
    );

    //召唤仪式
    registerCustomRecipe(
        new SpiritInfusionRecipeJSON('kubejs:necroplasm', 'kubejs:summon_maledictus')
            .addSpirit("earthen", 6)
            .addSpirit("sacred", 6)
            .addExtraInput('minecraft:emerald', 4)
            .addExtraInput('cataclysm:black_steel_ingot', 4)
            .addExtraInput('#c:bones', 4)
    );

    //召唤仪式
    registerCustomRecipe(
        new SpiritInfusionRecipeJSON('kubejs:necroplasm', 'kubejs:summon_maledictus')
            .addSpirit("arcane", 3)
            .addSpirit("aerial", 3)
            .addExtraInput('minecraft:emerald', 2)
            .addExtraInput('cataclysm:cursed_eye', 1)
            .addExtraInput('#c:bones', 2)
    );

    //召唤仪式
    registerCustomRecipe(
        new SpiritInfusionRecipeJSON('kubejs:necroplasm', 'kubejs:summon_scylla')
            .addSpirit("arcane", 6)
            .addSpirit("aerial", 6)
            .addExtraInput('cataclysm:lacrima', 2)
            .addExtraInput('minecraft:lightning_rod', 1)
            .addExtraInput('minecraft:prismarine_shard', 4)
    );

    //召唤仪式
    registerCustomRecipe(
        new SpiritInfusionRecipeJSON('kubejs:necroplasm', 'kubejs:summon_scylla')
            .addSpirit("arcane", 3)
            .addSpirit("aerial", 3)
            .addExtraInput('minecraft:lightning_rod', 1)
            .addExtraInput('cataclysm:storm_eye', 1)
            .addExtraInput('minecraft:prismarine_shard', 2)
    );

    //召唤仪式
    registerCustomRecipe(
        new SpiritInfusionRecipeJSON('kubejs:necroplasm', 'kubejs:summon_the_harbinger')
            .addSpirit("wicked", 4)
            .addSpirit("aerial", 8)
            .addExtraInput('cataclysm:mech_eye', 1)
            .addExtraInput('minecraft:redstone_block', 4)
            .addExtraInput('minecraft:iron_block', 4)
    );

    //召唤仪式
    registerCustomRecipe(
        new SpiritInfusionRecipeJSON('kubejs:necroplasm', 'kubejs:summon_the_harbinger')
            .addSpirit("wicked", 4)
            .addSpirit("aerial", 8)
            .addExtraInput('minecraft:redstone_block', 2)
            .addExtraInput('cataclysm:witherite_ingot', 1)
            .addExtraInput('minecraft:iron_block', 2)
    );

    //召唤仪式
    registerCustomRecipe(
        new SpiritInfusionRecipeJSON('kubejs:necroplasm', 'kubejs:summon_ender_guardian')
            .addSpirit("eldritch", 6)
            .addSpirit("arcane", 6)
            .addExtraInput('minecraft:end_stone', 16)
            .addExtraInput('minecraft:shulker_shell', 2)
            .addExtraInput('cataclysm:void_eye', 1)
    );

    //召唤仪式
    registerCustomRecipe(
        new SpiritInfusionRecipeJSON('kubejs:necroplasm', 'kubejs:summon_ender_guardian')
            .addSpirit("eldritch", 6)
            .addSpirit("arcane", 6)
            .addExtraInput('minecraft:shulker_shell', 2)
            .addExtraInput('cataclysm:void_core', 1)
            .addExtraInput('cataclysm:void_jaw', 4)
    );

    //召唤仪式
    registerCustomRecipe(
        new SpiritInfusionRecipeJSON('kubejs:necroplasm', 'kubejs:summon_netherite_monstrosity')
            .addSpirit("arcane", 6)
            .addSpirit("infernal", 6)
            .addExtraInput('cataclysm:monstrous_eye', 1)
            .addExtraInput('minecraft:gilded_blackstone', 6)
            .addExtraInput('minecraft:magma_cream', 4)
    );

    //召唤仪式
    registerCustomRecipe(
        new SpiritInfusionRecipeJSON('kubejs:necroplasm', 'kubejs:summon_netherite_monstrosity')
            .addSpirit("arcane", 3)
            .addSpirit("infernal", 3)
            .addExtraInput('cataclysm:lava_power_cell', 2)
            .addExtraInput('minecraft:gilded_blackstone', 3)
            .addExtraInput('minecraft:magma_cream', 2)
    );

    //召唤仪式-魔宠
    registerCustomRecipe(
        new SpiritInfusionRecipeJSON('alshanex_familiars:frostling_shard', 'kubejs:summon_frostling_pet')
            .addSpirit("arcane", 3)
            .addSpirit("aqueous", 3)
            .addExtraInput('irons_spellbooks:permafrost_shard', 1)
            .addExtraInput('irons_spellbooks:frozen_bone', 4)
            .addExtraInput('irons_spellbooks:arcane_essence', 8)
    );

    //召唤仪式-魔宠
    registerCustomRecipe(
        new SpiritInfusionRecipeJSON('alshanex_familiars:scorcher_shard', 'kubejs:summon_scorcher_pet')
            .addSpirit("sacred", 3)
            .addSpirit("infernal", 3)
            .addExtraInput('minecraft:blaze_rod', 3)
            .addExtraInput('eternal_starlight:starfire', 2)
            .addExtraInput('irons_spellbooks:arcane_essence', 8)
    );

    //召唤仪式-魔宠
    registerCustomRecipe(
        new SpiritInfusionRecipeJSON('alshanex_familiars:summoner_shard', 'kubejs:summon_summoner_pet')
            .addSpirit("arcane", 3)
            .addSpirit("sacred", 3)
            .addExtraInput('irons_spellbooks:evocation_rune', 1)
            .addExtraInput('minecraft:emerald', 6)
            .addExtraInput('irons_spellbooks:arcane_essence', 8)
    );

    //召唤仪式-魔宠
    registerCustomRecipe(
        new SpiritInfusionRecipeJSON('alshanex_familiars:archmage_shard', 'kubejs:summon_archmage_pet')
            .addSpirit("arcane", 8)
            .addExtraInput('malum:runic_sap', 2)
            .addExtraInput('malum:arcane_charcoal', 6)
            .addExtraInput('irons_spellbooks:arcane_essence', 16)
    );

    //召唤仪式-魔宠
    registerCustomRecipe(
        new SpiritInfusionRecipeJSON('alshanex_familiars:druid_shard', 'kubejs:summon_druid_pet')
            .addSpirit("aqueous", 3)
            .addSpirit("earthen", 3)
            .addExtraInput('irons_spellbooks:nature_rune', 2)
            .addExtraInput("#irons_spellbooks:nature_focus", 3)
            .addExtraInput('irons_spellbooks:arcane_essence', 8)
    );

    //召唤仪式-魔宠
    registerCustomRecipe(
        new SpiritInfusionRecipeJSON('alshanex_familiars:hunter_shard', 'kubejs:summon_hunter_pet')
            .addSpirit("arcane", 3)
            .addSpirit("earthen", 3)
            .addExtraInput('kubejs:meat', 4)
            .addExtraInput("#c:foods/cooked_meat", 3)
            .addExtraInput('irons_spellbooks:arcane_essence', 8)
    );

    //召唤仪式-魔宠
    registerCustomRecipe(
        new SpiritInfusionRecipeJSON('alshanex_familiars:lightning_mage_shard', 'kubejs:summon_mage_pet')
            .addSpirit("arcane", 3)
            .addSpirit("earthen", 3)
            .addExtraInput('createaddition:spool', 2)
            .addExtraInput('#irons_spellbooks:lightning_focus', 3)
            .addExtraInput('irons_spellbooks:arcane_essence', 8)
    );

    //召唤仪式-魔宠
    registerCustomRecipe(
        new SpiritInfusionRecipeJSON('alshanex_familiars:illusionist_shard', 'kubejs:summon_illusionist_pet')
            .addSpirit("arcane", 3)
            .addSpirit("eldritch", 3)
            .addExtraInput('illagerinvasion:unusual_dust', 4)
            .addExtraInput('illagerinvasion:illusionary_dust', 2)
            .addExtraInput('irons_spellbooks:arcane_essence', 8)
    );

    //召唤仪式-魔宠
    registerCustomRecipe(
        new SpiritInfusionRecipeJSON('alshanex_familiars:bard_shard', 'kubejs:summon_bard_pet')
            .addSpirit("arcane", 3)
            .addSpirit("eldritch", 3)
            .addExtraInput('minecraft:disc_fragment_5', 1)
            .addExtraInput('minecraft:note_block', 2)
            .addExtraInput('irons_spellbooks:arcane_essence', 8)
    );

    //召唤仪式-魔宠
    registerCustomRecipe(
        new SpiritInfusionRecipeJSON('alshanex_familiars:cleric_shard', 'kubejs:summon_cleric_pet')
            .addSpirit("sacred", 6)
            .addExtraInput('#irons_spellbooks:holy_focus', 4)
            .addExtraInput('irons_spellbooks:arcane_essence', 16)
    );

    //召唤仪式-魔宠
    registerCustomRecipe(
        new SpiritInfusionRecipeJSON('alshanex_familiars:bard_shard', 'kubejs:summon_bard_pet')
            .addSpirit("arcane", 3)
            .addSpirit("eldritch", 3)
            .addExtraInput('minecraft:disc_fragment_5', 1)
            .addExtraInput('minecraft:note_block', 2)
            .addExtraInput('irons_spellbooks:arcane_essence', 8)
    );

    //召唤仪式-魔宠
    registerCustomRecipe(
        new SpiritInfusionRecipeJSON('alshanex_familiars:necromancer_shard', 'kubejs:summon_necromancer_pet')
            .addSpirit("wicked", 6)
            .addExtraInput('irons_spellbooks:blood_vial', 4)
            .addExtraInput('minecraft:zombie_head', 1)
            .addExtraInput('irons_spellbooks:arcane_essence', 8)
    );

    //召唤仪式-魔宠
    registerCustomRecipe(
        new SpiritInfusionRecipeJSON('alshanex_familiars:plague_shard', 'kubejs:summon_plague_pet')
            .addSpirit("earthen", 6)
            .addExtraInput('alshanex_familiars:spider_fang', 4)
            .addExtraInput('alshanex_familiars:poison_vial', 1)
            .addExtraInput('irons_spellbooks:arcane_essence', 8)
    );

    //召唤仪式-魔宠
    registerCustomRecipe(
        new SpiritInfusionRecipeJSON('alshanex_familiars:dragon_warrior_shard', 'kubejs:summon_dragon_warrior_pet')
            .addSpirit("arcane", 6)
            .addExtraInput('minecraft:ender_pearl', 4)
            .addExtraInput('irons_spellbooks:ender_rune', 1)
            .addExtraInput('irons_spellbooks:arcane_essence', 8)
    );
    registerCustomRecipe(
        new SpiritInfusionRecipeJSON('#kubejs:ingots/fw_ingots', 'malum:cthonic_gold_fragment')
            .addSpirit("earthen", 1)
            .addExtraInput('malum:cthonic_gold_fragment', 1)
            .setOutputCount(2)
    );

    registerCustomRecipe(
        new SpiritInfusionRecipeJSON('#kubejs:runewood_sapling', 'malum:soulwood_sapling')
            .addSpirit("umbral", 1)
            .addExtraInput('iceandfire:ectoplasm', 4)
    );

    registerCustomRecipe(
        new SpiritInfusionRecipeJSON('eternal_starlight:raw_aethersent', 'kubejs:summon_starlight_golem')
            .addSpirit("arcane", 4)
            .addSpirit("earthen", 4)
            .addExtraInput('eternal_starlight:oxidized_golem_steel_ingot', 3)
            .addExtraInput('#c:ingots/silver', 4)
    );

    registerCustomRecipe(
        new SpiritInfusionRecipeJSON('eternal_starlight:raw_aethersent', 'kubejs:summon_lunar_monstrosity')
            .addSpirit("arcane", 4)
            .addSpirit("earthen", 4)
            .addExtraInput('#minecraft:flowers', 3)
            .addExtraInput('minecraft:soul_sand', 3)
    );

    registerCustomRecipe(
        new SpiritInfusionRecipeJSON('kubejs:ruinous_soul', 'darkdoppelganger:shadow_orb')
            .setInputCount(3)
            .addSpirit("umbral", 12)
            .addExtraInput('minecraft:dragon_breath', 4)
            .addExtraInput('minecraft:nether_star', 1)
            .addExtraInput('hazennstuff:deus_essence', 1)
    );

    registerCustomRecipe(
        new SpiritInfusionRecipeJSON('minecraft:netherite_scrap', 'kubejs:alexandrite')
            .addSpirit("earthen", 3)
            .addExtraInput('iceandfire:sapphire_gem', 2)
            .addExtraInput('minecraft:amethyst_shard', 2)
    );

    registerCustomRecipe(
        new SpiritInfusionRecipeJSON('kubejs:raw_netherite_ingot', 'allthemodium:allthemodium_ingot')
            .addSpirit("eldritch", 3)
            .addSpirit("infernal", 3)
            .addExtraInput('kubejs:necroplasm', 4)
            .addExtraInput('kubejs:soul_of_light', 4)
            .addExtraInput('kubejs:soul_of_night', 4)
            .addExtraInput('minecraft:netherite_scrap', 2)
    );

    registerCustomRecipe(
        new SpiritInfusionRecipeJSON('allthemodium:allthemodium_ingot', 'allthemodium:vibranium_ingot')
            .addSpirit("eldritch", 3)
            .addSpirit("infernal", 3)
            .addExtraInput('kubejs:ashes_of_calamity', 4)
            .addExtraInput('silentgems:chaos_essence', 3)
    );

    registerCustomRecipe(
        new SpiritInfusionRecipeJSON('allthemodium:vibranium_ingot', 'allthemodium:unobtainium_ingot')
            .addSpirit("eldritch", 3)
            .addSpirit("infernal", 3)
            .addExtraInput('kubejs:ruinous_soul', 4)
            .addExtraInput('alltheores:fluorite_block', 2)
    );

    registerCustomRecipe(
        new SpiritInfusionRecipeJSON('kubejs:rhexis_ingot', 'kubejs:starinium_ingot')
            .addSpirit("umbral", 2)
            .addExtraInput('kubejs:rhexis_ingot', 1)
            .addExtraInput('malum:imitation_flesh', 3)
            .addExtraInput('kubejs:foul_flesh', 4)
            .addExtraInput('#minecraft:meat', 32)
    );


});

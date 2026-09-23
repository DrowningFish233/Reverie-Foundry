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
        new SpiritInfusionRecipeJSON('hazennstuff:refined', 'hazennstuff:reinforced')
            .addSpirit("arcane", 16)
            .addSpirit("sacred", 16)
            .addExtraInput('kubejs:ashes_of_calamity', 4)
            .addExtraInput('hazennstuff:zenalite_ingot', 2)
            .addExtraInput('hazennstuff:pyrium_nugget', 1)
    );

    registerCustomRecipe(
        new SpiritInfusionRecipeJSON('hazennstuff:strengthened', 'hazennstuff:singularity')
            .addSpirit("arcane", 32)
            .addSpirit("sacred", 24)
            .addExtraInput('kubejs:ruinous_soul', 5)
            .addExtraInput('hazennstuff:divine_mold', 1)
            .addExtraInput('hazennstuff:deus_essence', 1)
    );

    registerCustomRecipe(
        new SpiritInfusionRecipeJSON('hazennstuff:abomination', 'hazennstuff:absolute')
            .addSpirit("arcane", 32)
            .addSpirit("sacred", 24)
            .addExtraInput('kubejs:ruinous_soul', 5)
            .addExtraInput('hazennstuff:divine_mold', 1)
            .addExtraInput('hazennstuff:deus_essence', 1)
    );

    registerCustomRecipe(
        new SpiritInfusionRecipeJSON('hazennstuff:reinforced', 'hazennstuff:radiance')
            .addSpirit("arcane", 32)
            .addSpirit("sacred", 24)
            .addExtraInput('kubejs:ruinous_soul', 5)
            .addExtraInput('hazennstuff:divine_mold', 1)
            .addExtraInput('hazennstuff:deus_essence', 1)
    );


    registerCustomRecipe(
        new SpiritInfusionRecipeJSON('hazennstuff:advanced', 'hazennstuff:abomination')
            .addSpirit("arcane", 32)
            .addSpirit("sacred", 24)
            .addExtraInput('kubejs:ashes_of_calamity', 4)
            .addExtraInput('hazennstuff:zenalite_ingot', 4)
            .addExtraInput('hazennstuff:dreadsteel_ingot', 2)
            .addExtraInput('hazennstuff:pyrium_nugget', 1)
    );

    registerCustomRecipe(
        new SpiritInfusionRecipeJSON('hazennstuff:sacred', 'hazennstuff:strengthened')
            .addSpirit("arcane", 32)
            .addSpirit("sacred", 24)
            .addExtraInput('kubejs:ashes_of_calamity', 4)
            .addExtraInput('hazennstuff:zenalite_ingot', 4)
            .addExtraInput('hazennstuff:hallowed_ingot', 2)
            .addExtraInput('hazennstuff:pyrium_nugget', 1)
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
        new SpiritInfusionRecipeJSON('malum:malignant_pewter_ingot', 'kubejs:lustful_haze_alloy')
            .addSpirit("umbral", 8)
            .addSpirit("wicked", 12)
            .addSpirit("aqueous", 16)
            .addExtraInput('malum:hex_ash', 32)
            .addExtraInput('irons_spellbooks:pyrium_ingot', 1)
            .addExtraInput('malum:imitation_flesh', 1)
            .addExtraInput('malum:warp_flux', 12)
            .addExtraInput('hazennstuff:starkissed_zenalite', 1)
    );

    registerCustomRecipe(
        new SpiritInfusionRecipeJSON('hazennstuff:hallowed_ingot', 'kubejs:xelkive_ingot')
            .addSpirit("umbral", 2)
            .addExtraInput('irons_spellbooks:pyrium_ingot', 1)
            .addExtraInput('irons_spellbooks:divine_pearl', 12)
            .addExtraInput('#c:glass_blocks', 6)
            .addExtraInput('kubejs:ashes_of_calamity', 4)
            .addExtraInput('irons_spellbooks:mithril_ingot', 8)
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
            .addExtraInput('malum:malignant_lead', 3)
            .addExtraInput('malum:null_slate', 4)
            .addExtraInput('malum:hex_ash', 16)
            .addExtraInput('kubejs:necroplasm', 1)
    );

    /*
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
    */

    registerCustomRecipe(
        new SpiritInfusionRecipeJSON('#silentgems:glowroses', 'kubejs:bismuthgems')
            .addSpirit("infernal", 8)
            .addSpirit("aerial", 8)
            .addSpirit("earthen", 8)
            .addExtraInput('kubejs:necroplasm', 4)
            .addExtraInput('kubejs:viculeam_ingot', 1)
            .addExtraInput('alltheores:fluorite', 12)
            .addExtraInput('#c:gems', 8)
            .addExtraInput('#silentgear:starlight_charger_catalysts', 4)
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
            .addSpirit('umbral', 1)
            .addExtraInput('minecraft:slime_block', 2)
            .addExtraInput('#kubejs:gem/tier_1', 1)
    );

    //召唤仪式
    registerCustomRecipe(
        new SpiritInfusionRecipeJSON('minecraft:ender_eye', 'terra_entity:cthulhu_eye_spawn_egg')
            .addSpirit('umbral', 1)
            .addExtraInput('kubejs:meat', 2)
            .addExtraInput('iceandfire:ectoplasm', 1)
    );

    //召唤仪式
    registerCustomRecipe(
        new SpiritInfusionRecipeJSON('minecraft:skeleton_skull', 'terra_entity:skeletron_spawn_egg')
            .addSpirit('umbral', 1)
            .addExtraInput('#c:bones', 12)
            .addExtraInput('#kubejs:evil_materials', 4)
            .addExtraInput('iceandfire:ectoplasm', 2)
            .addExtraInput('kubejs:necroplasm', 1)
    );

    //召唤仪式
    registerCustomRecipe(
        new SpiritInfusionRecipeJSON('kubejs:necroplasm', 'terra_entity:eater_of_world_spawn_egg')
            .addSpirit('umbral', 1)
            .addExtraInput('kubejs:soul_of_night', 2)
            .addExtraInput('minecraft:dirt', 2)
            .addExtraInput('kubejs:meat', 3)
    );

    //召唤仪式
    registerCustomRecipe(
        new SpiritInfusionRecipeJSON('kubejs:necroplasm', 'terra_entity:brain_of_cthulhu_spawn_egg')
            .addSpirit('umbral', 1)
            .addExtraInput('kubejs:soul_of_night', 2)
            .addExtraInput('kubejs:meat', 3)
    );

    //召唤仪式
    registerCustomRecipe(
        new SpiritInfusionRecipeJSON('kubejs:necroplasm', 'terra_entity:queen_bee_spawn_egg')
            .addSpirit('umbral', 1)
            .addExtraInput('kubejs:soul_of_night', 2)
            .addExtraInput('minecraft:jungle_log', 3)
    );


    //召唤仪式
    registerCustomRecipe(
        new SpiritInfusionRecipeJSON('kubejs:necroplasm', 'kubejs:summon_gauntlet')
            .addSpirit('umbral', 1)
            .addExtraInput('minecraft:ancient_debris', 1)
            .addExtraInput('minecraft:netherrack', 8)
            .addExtraInput('minecraft:iron_ingot', 4)
    );

    //召唤仪式
    registerCustomRecipe(
        new SpiritInfusionRecipeJSON('kubejs:necroplasm', 'kubejs:summon_lich')
            .addSpirit('umbral', 1)
            .addExtraInput('minecraft:skeleton_skull', 1)
            .addExtraInput('irons_spellbooks:arcane_essence', 4)
            .addExtraInput('#c:bones', 4)
    );

    //召唤仪式
    registerCustomRecipe(
        new SpiritInfusionRecipeJSON('kubejs:necroplasm', 'kubejs:summon_obsidilith')
            .addSpirit('umbral', 1)
            .addExtraInput('minecraft:obsidian', 4)
            .addExtraInput('minecraft:end_stone', 12)
            .addExtraInput('minecraft:ender_eye', 3)
    );

    //召唤仪式
    registerCustomRecipe(
        new SpiritInfusionRecipeJSON('kubejs:necroplasm', 'kubejs:summon_void_blossom')
            .addSpirit('umbral', 1)
            .addExtraInput('#c:seeds', 3)
            .addExtraInput('minecraft:bone_meal', 4)
            .addExtraInput('irons_spellbooks:arcane_essence', 8)
    );

    //召唤仪式
    registerCustomRecipe(
        new SpiritInfusionRecipeJSON('kubejs:necroplasm', 'kubejs:summon_fire_boss')
            .addSpirit('umbral', 1)
            .addExtraInput('irons_spellbooks:cinder_essence', 1)
            .addExtraInput('minecraft:book', 1)
            .addExtraInput('minecraft:nether_bricks', 4)
            .addExtraInput('irons_spellbooks:arcane_essence', 4)
    );

    //召唤仪式
    registerCustomRecipe(
        new SpiritInfusionRecipeJSON('kubejs:necroplasm', 'kubejs:summon_dead_king')
            .addSpirit('umbral', 1)
            .addExtraInput('#c:bones', 8)
            .addExtraInput('irons_spellbooks:magic_cloth', 1)
            .addExtraInput('minecraft:skeleton_skull', 1)
    );

    //召唤仪式
    registerCustomRecipe(
        new SpiritInfusionRecipeJSON('minecraft:amethyst_block', 'kubejs:summon_dead_king')
            .addSpirit('umbral', 1)
            .addExtraInput('#c:bones', 8)
            .addExtraInput('minecraft:amethyst_shard', 6)
            .addExtraInput('#kubejs:evil_materials', 2)
    );

    //召唤仪式
    registerCustomRecipe(
        new SpiritInfusionRecipeJSON('kubejs:necroplasm', 'kubejs:summon_ignis')
            .addSpirit('umbral', 1)
            .addExtraInput('minecraft:magma_block', 4)
            .addExtraInput('minecraft:nether_bricks', 1)
            .addExtraInput('#minecraft:swords', 1)
    );

    //召唤仪式
    registerCustomRecipe(
        new SpiritInfusionRecipeJSON('kubejs:necroplasm', 'kubejs:summon_the_leviathan')
            .addSpirit('umbral', 1)
            .addExtraInput('minecraft:water_bucket', 1)
            .addExtraInput('#c:foods/raw_fish', 4)
            .addExtraInput('minecraft:heart_of_the_sea', 1)
    );

    //召唤仪式
    registerCustomRecipe(
        new SpiritInfusionRecipeJSON('kubejs:necroplasm', 'kubejs:summon_ancient_remnant')
            .addSpirit("umbral", 1)
            .addExtraInput('#c:sands', 4)
            .addExtraInput('minecraft:gold_ingot', 2)
            .addExtraInput('minecraft:rotten_flesh', 2)
            .addExtraInput('#c:bones', 2)
    );

    //召唤仪式
    registerCustomRecipe(
        new SpiritInfusionRecipeJSON('kubejs:necroplasm', 'kubejs:summon_maledictus')
            .addSpirit("umbral", 1)
            .addExtraInput('minecraft:emerald', 4)
            .addExtraInput('iceandfire:ectoplasm', 4)
            .addExtraInput('#c:bones', 4)
    );

    //召唤仪式
    registerCustomRecipe(
        new SpiritInfusionRecipeJSON('kubejs:necroplasm', 'kubejs:summon_scylla')
            .addSpirit("umbral", 1)
            .addExtraInput('minecraft:water_bucket', 1)
            .addExtraInput('minecraft:lightning_rod', 1)
            .addExtraInput('minecraft:prismarine_shard', 4)
    );

    //召唤仪式
    registerCustomRecipe(
        new SpiritInfusionRecipeJSON('kubejs:necroplasm', 'kubejs:summon_the_harbinger')
            .addSpirit("umbral", 1)
            .addExtraInput('minecraft:redstone_block', 1)
            .addExtraInput('minecraft:ender_eye', 1)
            .addExtraInput('minecraft:iron_block', 1)
    );

    //召唤仪式
    registerCustomRecipe(
        new SpiritInfusionRecipeJSON('kubejs:necroplasm', 'kubejs:summon_ender_guardian')
            .addSpirit("umbral", 1)
            .addExtraInput('minecraft:end_stone', 16)
            .addExtraInput('minecraft:popped_chorus_fruit', 2)
            .addExtraInput('minecraft:chorus_flower', 2)
    );

    //召唤仪式
    registerCustomRecipe(
        new SpiritInfusionRecipeJSON('kubejs:necroplasm', 'kubejs:summon_netherite_monstrosity')
            .addSpirit("umbral", 1)
            .addExtraInput('minecraft:blackstone', 4)
            .addExtraInput('minecraft:gold_nugget', 4)
            .addExtraInput('minecraft:magma_cream', 4)
    );

    //召唤仪式-魔宠
    registerCustomRecipe(
        new SpiritInfusionRecipeJSON('alshanex_familiars:frostling_shard', 'kubejs:summon_frostling_pet')
            .addSpirit("arcane", 3)
            .addSpirit("aqueous", 3)
            .addExtraInput('minecraft:ice', 4)
            .addExtraInput('irons_spellbooks:arcane_essence', 8)
    );

    //召唤仪式-魔宠
    registerCustomRecipe(
        new SpiritInfusionRecipeJSON('alshanex_familiars:scorcher_shard', 'kubejs:summon_scorcher_pet')
            .addSpirit("sacred", 3)
            .addSpirit("infernal", 3)
            .addExtraInput('minecraft:blaze_rod', 3)
            .addExtraInput('minecraft:flint_and_steel', 1)
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
            .addSpirit("umbral", 1)
            .addExtraInput('minecraft:iron_block', 1)
            .addExtraInput('minecraft:carved_pumpkin', 1)
            .addExtraInput('#c:ingots/silver', 4)
    );

    registerCustomRecipe(
        new SpiritInfusionRecipeJSON('eternal_starlight:raw_aethersent', 'kubejs:summon_lunar_monstrosity')
            .addSpirit("umbral", 1)
            .addExtraInput('#minecraft:flowers', 3)
            .addExtraInput('minecraft:soul_sand', 3)
    );

    registerCustomRecipe(
        new SpiritInfusionRecipeJSON('kubejs:ruinous_soul', 'darkdoppelganger:shadow_orb')
            .setInputCount(3)
            .addSpirit("umbral", 6)
            .addExtraInput('minecraft:dragon_breath', 4)
            .addExtraInput('minecraft:nether_star', 1)
            .addExtraInput('hazennstuff:deus_essence', 1)
    );


    registerCustomRecipe(
        new SpiritInfusionRecipeJSON('kubejs:moonstone', 'kubejs:moonpools')
            .addSpirit("umbral", 2)
            .addExtraInput('#minecraft:flowers', 1)
            .addExtraInput('kubejs:necroplasm', 1)
    );

    registerCustomRecipe(
        new SpiritInfusionRecipeJSON('kubejs:viculeam_ingot', 'malum:malignant_pewter_ingot')
            .addSpirit("umbral", 1)
            .addSpirit("earthen", 16)
            .addSpirit("eldritch", 16)
            .addExtraInput('malum:malignant_lead', 1)
            .addExtraInput('malum:null_slate', 8)
            .addExtraInput('minecraft:netherite_scrap', 2)
    );

    registerCustomRecipe(
        new SpiritInfusionRecipeJSON('malum:soul_stained_steel_ingot', 'kubejs:lunium_nova_ingot')
            .addSpirit("earthen", 6)
            .addSpirit("eldritch", 6)
            .addExtraInput('kubejs:moonstone', 1)
            .addExtraInput('kubejs:necroplasm', 1)
            .addExtraInput('minecraft:netherite_scrap', 1)
    );

    registerCustomRecipe(
        new SpiritInfusionRecipeJSON('kubejs:viculeam_ingot', 'kubejs:unstable_luminescence_ingot')
            .addSpirit("earthen", 8)
            .addSpirit("eldritch", 8)
            .addExtraInput('netherexp:lightspores', 8)
            .addExtraInput('netherexp:nightspores', 8)
            .addExtraInput('kubejs:necroplasm', 1)
            .addExtraInput('minecraft:netherite_scrap', 1)
    );

    registerCustomRecipe(
        new SpiritInfusionRecipeJSON('kubejs:viculeam_ingot', 'kubejs:thlanium_ingot')
            .addSpirit("eldritch", 6)
            .addSpirit("infernal", 6)
            .addExtraInput('malum:iridescent_ether', 3)
            .addExtraInput('kubejs:necroplasm', 1)
            .addExtraInput('minecraft:netherite_scrap', 1)
    );

    registerCustomRecipe(
        new SpiritInfusionRecipeJSON('minecraft:gold_block', 'malum:block_of_hallowed_gold')
            .addSpirit("sacred", 16)
            .addSpirit("arcane", 8)
            .addExtraInput('minecraft:quartz', 32)
    );


    registerCustomRecipe(
        new SpiritInfusionRecipeJSON('minecraft:iron_block', 'malum:block_of_soul_stained_steel')
            .addSpirit("wicked", 16)
            .addSpirit("earthen", 8)
            .addSpirit("arcane", 8)
            .addExtraInput('malum:refined_soulstone', 32)
    );

});

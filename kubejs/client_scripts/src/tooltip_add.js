// 定义工具函数
const TooltipUtils = {
    // 颜色常量
    colors: {
        gray: "gray",
        blue: "blue",
        red: "red",
        yellow: "yellow",
        green: "green",
        darkRed: "dark_red",
        darkPurple: "dark_purple",
        gold: "gold",
        aqua: "aqua",
        pink: "pink_dye"
    },

    // 装备效果提示
    generateEquipmentEffects: function (slotKey, effects) {
        const lines = [Text.of(' ')];
        const slotText = Text.translate(slotKey); // 获取槽位本地化文本
        lines.push(
            Text.translate('tooltip.equipment_slot', slotText)
                .color(TooltipUtils.colors.gray)
        );

        effects.forEach(function (effect) {
            const color = effect.type === 'buff' ? TooltipUtils.colors.blue : TooltipUtils.colors.red;
            lines.push(Text.translate(effect.translationKey).color(color));
        });

        return lines;
    },

    // 生成提示
    simpleText: function (translationKey, color) {
        if (typeof color === 'undefined') color = "white";
        return Text.translate(translationKey).color(color);
    }
};

// 物品tooltip配置
const itemTooltips = {
    /*
    // 绝缘套装
    'kubejs:spell_resistance_helmet': {
        effects: TooltipUtils.generateEquipmentEffects('tooltip.slot.head', [
            { type: 'buff', translationKey: 'tooltip.spell_resistance.armor_6' },
            { type: 'buff', translationKey: 'tooltip.spell_resistance.attack_damage_10' },
            { type: 'buff', translationKey: 'tooltip.spell_resistance.spell_resistance_20' },
            { type: 'debuff', translationKey: 'tooltip.spell_resistance.mana_regen_25' },
            { type: 'debuff', translationKey: 'tooltip.spell_resistance.max_mana_25' },
            { type: 'debuff', translationKey: 'tooltip.spell_resistance.spell_power_25' }
        ])
    },
    'kubejs:spell_resistance_chestplate': {
        effects: TooltipUtils.generateEquipmentEffects('tooltip.slot.chest', [
            { type: 'buff', translationKey: 'tooltip.spell_resistance.armor_10' },
            { type: 'buff', translationKey: 'tooltip.spell_resistance.attack_damage_10' },
            { type: 'buff', translationKey: 'tooltip.spell_resistance.spell_resistance_20' },
            { type: 'debuff', translationKey: 'tooltip.spell_resistance.mana_regen_25' },
            { type: 'debuff', translationKey: 'tooltip.spell_resistance.max_mana_25' },
            { type: 'debuff', translationKey: 'tooltip.spell_resistance.spell_power_25' }
        ])
    },
    'kubejs:spell_resistance_leggings': {
        effects: TooltipUtils.generateEquipmentEffects('tooltip.slot.legs', [
            { type: 'buff', translationKey: 'tooltip.spell_resistance.armor_8' },
            { type: 'buff', translationKey: 'tooltip.spell_resistance.attack_damage_10' },
            { type: 'buff', translationKey: 'tooltip.spell_resistance.spell_resistance_20' },
            { type: 'debuff', translationKey: 'tooltip.spell_resistance.mana_regen_25' },
            { type: 'debuff', translationKey: 'tooltip.spell_resistance.max_mana_25' },
            { type: 'debuff', translationKey: 'tooltip.spell_resistance.spell_power_25' }
        ])
    },
    'kubejs:spell_resistance_boots': {
        effects: TooltipUtils.generateEquipmentEffects('tooltip.slot.feet', [
            { type: 'buff', translationKey: 'tooltip.spell_resistance.armor_5' },
            { type: 'buff', translationKey: 'tooltip.spell_resistance.attack_damage_10' },
            { type: 'buff', translationKey: 'tooltip.spell_resistance.spell_resistance_20' },
            { type: 'debuff', translationKey: 'tooltip.spell_resistance.mana_regen_25' },
            { type: 'debuff', translationKey: 'tooltip.spell_resistance.max_mana_25' },
            { type: 'debuff', translationKey: 'tooltip.spell_resistance.spell_power_25' }
        ])
    },

    // 射手套装
    'kubejs:azure_dawnbreaker_helmet': {
        effects: TooltipUtils.generateEquipmentEffects('tooltip.slot.head', [
            { type: 'buff', translationKey: 'tooltip.azure_dawnbreaker.armor_5' },
            { type: 'buff', translationKey: 'tooltip.azure_dawnbreaker.projectile_speed_25' },
            { type: 'buff', translationKey: 'tooltip.azure_dawnbreaker.projectile_damage_25' },
            { type: 'buff', translationKey: 'tooltip.azure_dawnbreaker.bow_speed_10' }
        ])
    },
    'kubejs:azure_dawnbreaker_chestplate': {
        effects: TooltipUtils.generateEquipmentEffects('tooltip.slot.chest', [
            { type: 'buff', translationKey: 'tooltip.azure_dawnbreaker.armor_6' },
            { type: 'buff', translationKey: 'tooltip.azure_dawnbreaker.projectile_speed_25' },
            { type: 'buff', translationKey: 'tooltip.azure_dawnbreaker.projectile_damage_25' },
            { type: 'buff', translationKey: 'tooltip.azure_dawnbreaker.bow_speed_10' }
        ])
    },
    'kubejs:azure_dawnbreaker_leggings': {
        effects: TooltipUtils.generateEquipmentEffects('tooltip.slot.legs', [
            { type: 'buff', translationKey: 'tooltip.azure_dawnbreaker.armor_6' },
            { type: 'buff', translationKey: 'tooltip.azure_dawnbreaker.projectile_speed_25' },
            { type: 'buff', translationKey: 'tooltip.azure_dawnbreaker.projectile_damage_25' },
            { type: 'buff', translationKey: 'tooltip.azure_dawnbreaker.bow_speed_10' }
        ])
    },
    'kubejs:azure_dawnbreaker_boots': {
        effects: TooltipUtils.generateEquipmentEffects('tooltip.slot.feet', [
            { type: 'buff', translationKey: 'tooltip.azure_dawnbreaker.armor_4' },
            { type: 'buff', translationKey: 'tooltip.azure_dawnbreaker.projectile_speed_25' },
            { type: 'buff', translationKey: 'tooltip.azure_dawnbreaker.projectile_damage_25' },
            { type: 'buff', translationKey: 'tooltip.azure_dawnbreaker.bow_speed_10' }
        ])
    },

*/
    'aquaculture:wooden_fillet_knife': {
        lines: [
            TooltipUtils.simpleText('tooltip.wooden_fillet_knife', 'aqua'),
            TooltipUtils.simpleText('tooltip.fillet_knife', 'red'),
        ]
    },
    'aquaculture:stone_fillet_knife': {
        lines: [
            TooltipUtils.simpleText('tooltip.stone_fillet_knife', 'aqua'),
            TooltipUtils.simpleText('tooltip.fillet_knife', 'red'),
        ]
    },
    'aquaculture:iron_fillet_knife': {
        lines: [
            TooltipUtils.simpleText('tooltip.iron_fillet_knife', 'aqua'),
            TooltipUtils.simpleText('tooltip.fillet_knife', 'red'),
        ]
    },
    'aquaculture:gold_fillet_knife': {
        lines: [
            TooltipUtils.simpleText('tooltip.gold_fillet_knife', 'aqua'),
            TooltipUtils.simpleText('tooltip.fillet_knife', 'red'),
        ]
    },
    'aquaculture:diamond_fillet_knife': {
        lines: [
            TooltipUtils.simpleText('tooltip.diamond_fillet_knife', 'aqua'),
            TooltipUtils.simpleText('tooltip.fillet_knife', 'red'),
        ]
    },
    'aquaculture:neptunium_fillet_knife': {
        lines: [
            TooltipUtils.simpleText('tooltip.neptunium_fillet_knife', 'aqua'),
            TooltipUtils.simpleText('tooltip.fillet_knife', 'red'),
        ]
    },
    'allthemodium:vibranium_ore': {
        lines: [
            TooltipUtils.simpleText('tooltip.ore.ban', 'red'),
        ]
    },
    'allthemodium:allthemodium_ore': {
        lines: [
            TooltipUtils.simpleText('tooltip.ore.ban', 'red'),
        ]
    },
    'allthemodium:allthemodium_slate_ore': {
        lines: [
            TooltipUtils.simpleText('tooltip.ore.ban', 'red'),
        ]
    },
    'allthemodium:unobtainium_ore': {
        lines: [
            TooltipUtils.simpleText('tooltip.ore.ban', 'red'),
        ]
    },
    'allthemodium:other_vibranium_ore': {
        lines: [
            TooltipUtils.simpleText('tooltip.ore.ban', 'red'),
        ]
    },
    // 其他物品
    'kubejs:sin': {
        lines: [
            TooltipUtils.simpleText('tooltip.sin.switch', 'pink_dye'),
            TooltipUtils.simpleText('tooltip.sin.sanity_reduce', 'pink_dye')
        ]
    },
    'kubejs:raw_netherite_ingot': {
        lines: [
            TooltipUtils.simpleText('tooltip.raw_netherite_ingot', 'yellow'),
        ]
    },
    'kubejs:scroll_of_friendship': {
        lines: [
            TooltipUtils.simpleText('tooltip.scroll_of_friendship', 'yellow'),
        ]
    },
    'powerful_dummy:dummy_stand': {
        lines: [
            TooltipUtils.simpleText('tooltip.dummy_stand', 'green'),
        ]
    },
    'kubejs:bluestar': {
        lines: [
            TooltipUtils.simpleText('tooltip.bluestar.quote', 'blue')
        ]
    },
    'kubejs:emergency_sanity_elixir_a': {
        lines: [
            TooltipUtils.simpleText('tooltip.emergency_sanity_elixir_a1', 'red'),
            TooltipUtils.simpleText('tooltip.emergency_sanity_elixir_a2', 'blue')
        ]
    },
    'kubejs:emergency_sanity_elixir_b': {
        lines: [
            TooltipUtils.simpleText('tooltip.emergency_sanity_elixir_b1', 'red'),
            TooltipUtils.simpleText('tooltip.emergency_sanity_elixir_b2', 'blue')

        ]
    },
    'kubejs:emergency_sanity_elixir_y': {
        lines: [
            TooltipUtils.simpleText('tooltip.emergency_sanity_elixir_y1', 'red'),
            TooltipUtils.simpleText('tooltip.emergency_sanity_elixir_y2', 'blue')
        ]
    },
    'kubejs:low_heart_of_darkness': {
        lines: [
            TooltipUtils.simpleText('tooltip.low_heart_of_darkness.desc', 'dark_red'),
        ]
    },
    'kubejs:crowbar': {
        lines: [
            TooltipUtils.simpleText('tooltip.crowbar.unbreakable', 'blue'),
            TooltipUtils.simpleText('tooltip.rf', 'pink_dye'),
        ]
    },
    'kubejs:narrator': {
        lines: [
            TooltipUtils.simpleText('tooltip.narrator.tooltip', 'blue'),
            TooltipUtils.simpleText('tooltip.narrator.tooltip.2', 'blue'),
            TooltipUtils.simpleText('tooltip.narrator.tooltip.3', 'blue'),
            TooltipUtils.simpleText('tooltip.null.tooltip', 'blue'),
            TooltipUtils.simpleText('tooltip.rf', 'pink_dye'),
        ]
    },
    'kubejs:starfury': {
        shiftInfo: {
            default: [
                Text.translate('tooltip.starfury.shift_default')
            ],
            shifted: [
                TooltipUtils.simpleText('tooltip.starfury.right_click', 'yellow')
            ]
        }
    },
    'enderscape:mirror': {
        shiftInfo: {
            default: [
                Text.translate('tooltip.mirror.base_distance').color(TooltipUtils.colors.gray),
                Text.translate('tooltip.mirror.shift_prompt')
            ],
            shifted: [
                Text.translate('tooltip.mirror.fuel_system_title').color(TooltipUtils.colors.blue),
                Text.translate('tooltip.mirror.fuel_system_desc').color(TooltipUtils.colors.gray),

                Text.translate('tooltip.mirror.distance_title').color(TooltipUtils.colors.blue),
                Text.translate('tooltip.mirror.base_cost').color(TooltipUtils.colors.gray),
                Text.translate('tooltip.mirror.additional_cost').color(TooltipUtils.colors.gray),
                Text.translate('tooltip.mirror.enchant_boost').color(TooltipUtils.colors.gray),
                Text.translate('tooltip.mirror.enchant_level_1').color(TooltipUtils.colors.green),
                Text.translate('tooltip.mirror.enchant_level_3').color(TooltipUtils.colors.green),

                Text.translate('tooltip.mirror.cross_dim_title').color(TooltipUtils.colors.darkPurple),
                Text.translate('tooltip.mirror.cross_dim_require').color(TooltipUtils.colors.pink),
                Text.translate('tooltip.mirror.cross_dim_cost').color(TooltipUtils.colors.red),

                Text.translate('tooltip.mirror.limitations_title').color(TooltipUtils.colors.red),
                Text.translate('tooltip.mirror.limit_1').color(TooltipUtils.colors.gray),
                Text.translate('tooltip.mirror.limit_2').color(TooltipUtils.colors.gray),
                Text.translate('tooltip.mirror.limit_3').color(TooltipUtils.colors.gray)
            ]
        }
    },
    'kubejs:exploding_chocolate_bar': {
        lines: [
            TooltipUtils.simpleText('tooltip.exploding_chocolate_bar.title', 'red'),
            TooltipUtils.simpleText('tooltip.exploding_chocolate_bar.title.2', 'yellow'),

        ]
    },
    'kubejs:dragon_upgrade_smithing_template': {
        lines: [
            TooltipUtils.simpleText('tooltip.dragon_upgrade.title', 'gray'),
            TooltipUtils.simpleText('', 'gray'),
            TooltipUtils.simpleText('tooltip.dragon_upgrade.applicable', 'gray'),
            TooltipUtils.simpleText('tooltip.dragon_upgrade.applicable_items', 'blue'),
            TooltipUtils.simpleText('tooltip.dragon_upgrade.required_materials', 'gray'),
            TooltipUtils.simpleText('tooltip.dragon_upgrade.required_items', 'blue'),
        ]
    },
    'betteremeralds:wallet': {
        lines: [
            TooltipUtils.simpleText('tooltip.wallet.title', 'green'),
        ]
    },
    'kubejs:hangover_tea': {
        lines: [
            TooltipUtils.simpleText('tooltip.hangover_tea.title', 'green'),
            TooltipUtils.simpleText('tooltip.hangover_tea.title.2', 'blue'),
        ]
    },
    'kubejs:drowning_fish': {
        lines: [
            TooltipUtils.simpleText('tooltip.drowning_fish.title', 'yellow'),
            TooltipUtils.simpleText('tooltip.drowning_fish.title.1', 'yellow'),
            TooltipUtils.simpleText('tooltip.drowning_fish.title.2', 'yellow'),
            TooltipUtils.simpleText('tooltip.drowning_fish.title.3', 'yellow'),
            TooltipUtils.simpleText('tooltip.drowning_fish.title.4', 'yellow'),
            TooltipUtils.simpleText('tooltip.drowning_fish.title.5', 'yellow'),
        ]
    },
    'kubejs:material_patchouli_generator': {
        lines: [
            TooltipUtils.simpleText('tooltip.material_patchouli_generator.title.1', 'yellow'),
            TooltipUtils.simpleText('tooltip.material_patchouli_generator.title.2', 'yellow'),
            TooltipUtils.simpleText('tooltip.material_patchouli_generator.title.3', 'yellow'),
        ]
    },
    'kubejs:trait_fish': {
        lines: [
            TooltipUtils.simpleText('tooltip.material_patchouli_generator.title.2', 'yellow'),
            TooltipUtils.simpleText('tooltip.material_patchouli_generator.title.3', 'yellow'),
        ]
    },
    'kubejs:lightingball': {
        lines: [
            TooltipUtils.simpleText('tooltip.alcohol.title', 'yellow'),
        ]
    },
    'kubejs:iceball': {
        lines: [
            TooltipUtils.simpleText('tooltip.alcohol.title', 'yellow'),
        ]
    },
    'kubejs:grape_beer': {
        lines: [
            TooltipUtils.simpleText('tooltip.alcohol.title', 'yellow'),
        ]
    },
    'kubejs:fireball': {
        lines: [
            TooltipUtils.simpleText('tooltip.alcohol.title', 'yellow'),
        ]
    },
    'kubejs:evergreen_gin': {
        lines: [
            TooltipUtils.simpleText('tooltip.alcohol.title', 'yellow'),
        ]
    },
    'kubejs:everclear': {
        lines: [
            TooltipUtils.simpleText('tooltip.alcohol.title', 'yellow'),
        ]
    },
    'kubejs:cinnamon_roll': {
        lines: [
            TooltipUtils.simpleText('tooltip.alcohol.title', 'yellow'),
        ]
    },
    'kubejs:caribbean_rum': {
        lines: [
            TooltipUtils.simpleText('tooltip.alcohol.title', 'yellow'),
        ]
    },
    'kubejs:bloody_mary': {
        lines: [
            TooltipUtils.simpleText('tooltip.alcohol.title', 'yellow'),
        ]
    },
    'kubejs:star_beam_rye': {
        lines: [
            TooltipUtils.simpleText('tooltip.alcohol.title', 'yellow'),
        ]
    },
    'kubejs:screwdriver': {
        lines: [
            TooltipUtils.simpleText('tooltip.alcohol.title', 'yellow'),
        ]
    },
    'kubejs:rum': {
        lines: [
            TooltipUtils.simpleText('tooltip.alcohol.title', 'yellow'),
        ]
    },
    'kubejs:red_wine': {
        lines: [
            TooltipUtils.simpleText('tooltip.alcohol.title', 'yellow'),
        ]
    },
    'kubejs:purple_haze': {
        lines: [
            TooltipUtils.simpleText('tooltip.alcohol.title', 'yellow'),
        ]
    },
    'kubejs:old_fashioned': {
        lines: [
            TooltipUtils.simpleText('tooltip.alcohol.title', 'yellow'),
        ]
    },
    'kubejs:moscow_mule': {
        lines: [
            TooltipUtils.simpleText('tooltip.alcohol.title', 'yellow'),
        ]
    },
    'kubejs:moonshine': {
        lines: [
            TooltipUtils.simpleText('tooltip.alcohol.title', 'yellow'),
        ]
    },
    'kubejs:margarita': {
        lines: [
            TooltipUtils.simpleText('tooltip.alcohol.title', 'yellow'),
        ]
    },
    'kubejs:white_wine': {
        lines: [
            TooltipUtils.simpleText('tooltip.alcohol.title', 'yellow'),
        ]
    },
    'kubejs:whiskey': {
        lines: [
            TooltipUtils.simpleText('tooltip.alcohol.title', 'yellow'),
        ]
    },
    'kubejs:vodka': {
        lines: [
            TooltipUtils.simpleText('tooltip.alcohol.title', 'yellow'),
        ]
    },
    'kubejs:tequila_sunrise': {
        lines: [
            TooltipUtils.simpleText('tooltip.alcohol.title', 'yellow'),
        ]
    },
    'kubejs:tequila': {
        lines: [
            TooltipUtils.simpleText('tooltip.alcohol.title', 'yellow'),
        ]
    },
    'enderscape:end_stone_rubble_shield': {
        lines: [
            TooltipUtils.simpleText('tooltip.end_stone_rubble_shield.title', 'yellow'),
        ]
    },
    'create:refined_radiance': {
        lines: [
            TooltipUtils.simpleText('tooltip.common.refined_radiance', 'blue'),
            TooltipUtils.simpleText('tooltip.common.refined_radiance.2', 'blue'),
        ]
    },
    'minecraft:brick': {
        lines: [
            TooltipUtils.simpleText('tooltip.common.brick', 'yellow'),
            TooltipUtils.simpleText('tooltip.common.brick.2', 'yellow'),
        ]
    }
};

// 通用提示
const commonTooltips = {
    'kubejs:eye_of_ancient_city_located': TooltipUtils.simpleText('tooltip.common.eye_of_ancient_city_located', 'yellow'),
    'kubejs:eye_of_weeping_well_located': TooltipUtils.simpleText('tooltip.common.eye_of_weeping_well_located', 'yellow'),
    'kubejs:eye_of_dragon_cave_located': TooltipUtils.simpleText('tooltip.common.eye_of_dragon_cave_located', 'yellow'),
    'kubejs:bad_apple': TooltipUtils.simpleText('tooltip.common.bad_apple', 'pink_dye'),
    'kubejs:randomweapon': TooltipUtils.simpleText('tooltip.common.randomweapon', 'yellow'),
    'kubejs:summon_gauntlet': TooltipUtils.simpleText('tooltip.common.boss_spawn_egg', 'yellow'),
    'kubejs:summon_lich': TooltipUtils.simpleText('tooltip.common.boss_spawn_egg', 'yellow'),
    'kubejs:summon_lunar_monstrosity': TooltipUtils.simpleText('tooltip.common.boss_spawn_egg', 'yellow'),
    'kubejs:summon_starlight_golem': TooltipUtils.simpleText('tooltip.common.boss_spawn_egg', 'yellow'),
    'kubejs:summon_obsidilith': TooltipUtils.simpleText('tooltip.common.boss_spawn_egg', 'yellow'),
    'kubejs:summon_void_blossom': TooltipUtils.simpleText('tooltip.common.boss_spawn_egg', 'yellow'),
    'kubejs:summon_fire_boss': TooltipUtils.simpleText('tooltip.common.boss_spawn_egg', 'yellow'),
    'kubejs:summon_dead_king': TooltipUtils.simpleText('tooltip.common.boss_spawn_egg', 'yellow'),
    'kubejs:summon_amethyst_crab': TooltipUtils.simpleText('tooltip.common.boss_spawn_egg', 'yellow'),
    'kubejs:summon_ignis': TooltipUtils.simpleText('tooltip.common.boss_spawn_egg', 'yellow'),
    'kubejs:summon_the_leviathan': TooltipUtils.simpleText('tooltip.common.boss_spawn_egg', 'yellow'),
    'kubejs:summon_ancient_remnant': TooltipUtils.simpleText('tooltip.common.boss_spawn_egg', 'yellow'),
    'kubejs:summon_maledictus': TooltipUtils.simpleText('tooltip.common.boss_spawn_egg', 'yellow'),
    'kubejs:summon_scylla': TooltipUtils.simpleText('tooltip.common.boss_spawn_egg', 'yellow'),
    'kubejs:summon_the_harbinger': TooltipUtils.simpleText('tooltip.common.boss_spawn_egg', 'yellow'),
    'kubejs:summon_ender_guardian': TooltipUtils.simpleText('tooltip.common.boss_spawn_egg', 'yellow'),
    'kubejs:summon_netherite_monstrosity': TooltipUtils.simpleText('tooltip.common.boss_spawn_egg', 'yellow'),
    'kubejs:summon_frostling_pet': TooltipUtils.simpleText('tooltip.common.boss_spawn_egg', 'yellow'),
    'kubejs:summon_dragon_warrior_pet': TooltipUtils.simpleText('tooltip.common.boss_spawn_egg', 'yellow'),
    'kubejs:summon_mage_pet': TooltipUtils.simpleText('tooltip.common.boss_spawn_egg', 'yellow'),
    'kubejs:summon_archmage_pet': TooltipUtils.simpleText('tooltip.common.boss_spawn_egg', 'yellow'),
    'kubejs:summon_summoner_pet': TooltipUtils.simpleText('tooltip.common.boss_spawn_egg', 'yellow'),
    'kubejs:summon_necromancer_pet': TooltipUtils.simpleText('tooltip.common.boss_spawn_egg', 'yellow'),
    'kubejs:summon_hunter_pet': TooltipUtils.simpleText('tooltip.common.boss_spawn_egg', 'yellow'),
    'kubejs:summon_druid_pet': TooltipUtils.simpleText('tooltip.common.boss_spawn_egg', 'yellow'),
    'kubejs:summon_illusionist_pet': TooltipUtils.simpleText('tooltip.common.boss_spawn_egg', 'yellow'),
    'kubejs:summon_scorcher_pet': TooltipUtils.simpleText('tooltip.common.boss_spawn_egg', 'yellow'),
    'kubejs:summon_cleric_pet': TooltipUtils.simpleText('tooltip.common.boss_spawn_egg', 'yellow'),
    'kubejs:summon_plague_pet': TooltipUtils.simpleText('tooltip.common.boss_spawn_egg', 'yellow'),
    'kubejs:summon_bard_pet': TooltipUtils.simpleText('tooltip.common.boss_spawn_egg', 'yellow'),
    'terra_entity:king_slime_spawn_egg': TooltipUtils.simpleText('tooltip.common.boss_spawn_egg', 'yellow'),
    'terra_entity:brain_of_cthulhu_spawn_egg': TooltipUtils.simpleText('tooltip.common.boss_spawn_egg', 'yellow'),
    'terra_entity:queen_bee_spawn_egg': TooltipUtils.simpleText('tooltip.common.boss_spawn_egg', 'yellow'),
    'terra_entity:eater_of_world_spawn_egg': TooltipUtils.simpleText('tooltip.common.boss_spawn_egg', 'yellow'),
    'terra_entity:cthulhu_eye_spawn_egg': TooltipUtils.simpleText('tooltip.common.boss_spawn_egg', 'yellow'),
    'terra_entity:skeletron_spawn_egg': TooltipUtils.simpleText('tooltip.common.boss_spawn_egg', 'yellow'),
    'alshanex_familiars:crystal_berry': TooltipUtils.simpleText('tooltip.common.crystal_berry', 'blue'),
    'create:shadow_steel': TooltipUtils.simpleText('tooltip.common.shadow_steel', 'blue'),
    'kubejs:soul_of_light': TooltipUtils.simpleText('tooltip.common.soul_of_light', 'pink_dye'),
    'kubejs:soul_of_night': TooltipUtils.simpleText('tooltip.common.soul_of_night', 'dark_purple'),
    'create:wrench': TooltipUtils.simpleText('tooltip.common.wrench_compatibility', 'blue'),
    'refinedstorage:wrench': TooltipUtils.simpleText('tooltip.common.wrench_compatibility', 'blue'),
    'irons_spellbooks:mithril_weave': TooltipUtils.simpleText('tooltip.common.mithril_weave', 'yellow'),
    'eccentrictome:tome': TooltipUtils.simpleText('tooltip.common.tome_usage', 'yellow'),
    'irons_spellbooks:misery': TooltipUtils.simpleText('tooltip.common.misery_quote', 'dark_purple'),
    'kubejs:meat': TooltipUtils.simpleText('tooltip.common.meat_source', 'green'),
    'kubejs:corruption': TooltipUtils.simpleText('tooltip.common.corruption_source', 'green'),
    'kubejs:draedon_heart': TooltipUtils.simpleText('tooltip.common.draedon_heart', 'green'),
    'kubejs:omega_healing_potion': TooltipUtils.simpleText('tooltip.omega_healing_potion.description', 'pink_dye'),
    'kubejs:supreme_healing_potion': TooltipUtils.simpleText('tooltip.supreme_healing_potion.description', 'pink_dye'),
    'kubejs:supreme_mana_potion': TooltipUtils.simpleText('tooltip.supreme_mana_potion.description', 'pink_dye'),
    'kubejs:foul_flesh': TooltipUtils.simpleText('tooltip.foul_flesh.description', 'dark_purple'),
    'kubejs:lava_bible': TooltipUtils.simpleText('tooltip.lava_bible.description', 'yellow'),

};

// 应用tooltip修改
ItemEvents.modifyTooltips(function (event) {
    // 处理配置列表中的物品
    Object.keys(itemTooltips).forEach(function (itemId) {
        const config = itemTooltips[itemId];

        if (config.effects) {
            event.modify(itemId, function (tooltip) {
                config.effects.forEach(function (line, index) {
                    tooltip.insert(index + 1, line);
                });
            });
        }
        else if (config.lines) {
            event.modify(itemId, function (tooltip) {
                config.lines.forEach(function (line, index) {
                    tooltip.insert(index + 1, line);
                });
            });
        }
        else if (config.shiftInfo) {
            event.modify(itemId, { shift: false }, function (tooltip) {
                config.shiftInfo.default.forEach(function (line, index) {
                    tooltip.insert(index + 1, line);
                });
            });

            event.modify(itemId, { shift: true }, function (tooltip) {
                config.shiftInfo.shifted.forEach(function (line, index) {
                    tooltip.insert(index + 1, line);
                });
            });
        }
    });

    // 处理通用提示
    Object.keys(commonTooltips).forEach(function (itemId) {
        event.add(itemId, commonTooltips[itemId]);
    });
});
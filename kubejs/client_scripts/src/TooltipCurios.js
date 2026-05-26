// 饰品Tooltip
const TrinketTooltips = {
    // 颜色定义
    colors: {
        shiftKey: "yellow",
        shiftText: "gold",
        description: "aqua",
        title: "light_purple",
        buff: "green",
        debuff: "red",
        special: "dark_aqua",
        bullet: "white"
    },

    // 生成基础Tooltip (不按Shift时显示)
    baseTooltip: function (descriptionKey) {
        return [
            Text.of("")
                .append(Text.translate("tooltip.trinket.press").color(this.colors.shiftText))
                .append(Text.translate("tooltip.trinket.shift_key").color(this.colors.shiftKey))
                .append(Text.translate("tooltip.trinket.view_abilities").color(this.colors.shiftText)),
            Text.translate("tooltip.trinket.description").color(this.colors.shiftText)
                .append(Text.translate(descriptionKey).color(this.colors.description))
        ];
    },

    // 生成完整Tooltip (按Shift时显示)
    fullTooltip: function (descriptionKey, effects) {
        const lines = this.baseTooltip(descriptionKey);
        lines.push(Text.translate("tooltip.trinket.abilities_title").color(this.colors.title));

        effects.forEach(effect => {
            const color = effect.type === 'buff' ? this.colors.buff :
                effect.type === 'debuff' ? this.colors.debuff : this.colors.special;
            lines.push(
                Text.of("• ").color(this.colors.bullet)
                    .append(Text.translate(effect.textKey).color(color))
            );
        });

        return lines;
    },

    // 注册饰品Tooltip
    register: function (event, items) {
        Object.entries(items).forEach(([itemId, data]) => {
            // 默认显示
            event.modify(itemId, { shift: false }, tooltip => {
                this.baseTooltip(data.descriptionKey).forEach((line, i) => {
                    tooltip.insert(i + 1, line);
                });
            });

            // Shift显示
            event.modify(itemId, { shift: true }, tooltip => {
                this.fullTooltip(data.descriptionKey, data.effects).forEach((line, i) => {
                    tooltip.insert(i + 1, line);
                });
            });
        });
    }
};

// 饰品配置
const trinkets = {
    // 新星之声
    'kubejs:blue_star': {
        descriptionKey: "tooltip.blue_star.description",
        effects: [
            { type: 'buff', textKey: "tooltip.blue_star.effect.1" },
            { type: 'special', textKey: "tooltip.blue_star.effect.2" }
        ]
    },
    'kubejs:heart_of_darkness': {
        descriptionKey: "tooltip.heart_of_darkness.description",
        effects: [
            { type: 'debuff', textKey: "tooltip.heart_of_darkness.effect.1" }
        ]
    },
    'kubejs:red_skull': {
        descriptionKey: "tooltip.red_skull.description",
        effects: [
            { type: 'buff', textKey: "tooltip.red_skull.effect" }
        ]
    },
    'kubejs:red_shoes': {
        descriptionKey: "tooltip.red_shoes.description",
        effects: [
            { type: 'special', textKey: "tooltip.red_shoes.effect.1" },
            { type: 'debuff', textKey: "tooltip.red_shoes.effect.2" },
            { type: 'buff', textKey: "tooltip.red_shoes.effect.3" }
        ]
    },
    'kubejs:totem_of_undying': {
        descriptionKey: "tooltip.totem_of_undying.description",
        effects: [
            { type: 'buff', textKey: "tooltip.totem_of_undying.effect.1" },
            { type: 'buff', textKey: "tooltip.totem_of_undying.effect.2" },
            { type: 'debuff', textKey: "tooltip.totem_of_undying.death_chance" }
        ]
    },
    'kubejs:sanity_curios': {
        descriptionKey: "tooltip.sanity_curios.never_sober",
        effects: [
            { type: 'buff', textKey: "tooltip.sanity_curios.check" }
        ]
    },
    'kubejs:fragment_of_the_universe': {
        descriptionKey: "tooltip.fragment_of_the_universe.description",
        effects: [
            { type: 'buff', textKey: "tooltip.fragment_of_the_universe.effect" },
            { type: 'debuff', textKey: "tooltip.fragment_of_the_universe.effect.2" }
        ]
    },
    'kubejs:fluid_sac': {
        descriptionKey: "tooltip.fluid_sac.description",
        effects: [
            { type: 'buff', textKey: "tooltip.fluid_sac.effect" },
        ]
    },
    'kubejs:mana_flower': {
        descriptionKey: "tooltip.mana_flower.description",
        effects: [
            { type: 'buff', textKey: "tooltip.mana_flower.effect" },
        ]
    },
    'kubejs:melting_eyeball': {
        descriptionKey: "tooltip.melting_eyeball.description",
        effects: [
            { type: 'buff', textKey: "tooltip.melting_eyeball.effect" },
            { type: 'buff', textKey: "tooltip.melting_eyeball.effect.1" },
            { type: 'buff', textKey: "tooltip.melting_eyeball.effect.2" },
            { type: 'buff', textKey: "tooltip.melting_eyeball.effect.3" },
            { type: 'buff', textKey: "tooltip.melting_eyeball.effect.4" },
        ]
    },
    'kubejs:mana_regeneration_band': {
        descriptionKey: "tooltip.mana_regeneration_band.description",
        effects: [
            { type: 'buff', textKey: "tooltip.mana_regeneration_band.effect" },
            { type: 'buff', textKey: "tooltip.mana_regeneration_band.effect.1" },
            { type: 'buff', textKey: "tooltip.mana_regeneration_band.effect.2" },
        ]
    },
    'kubejs:arcane_flower': {
        descriptionKey: "tooltip.arcane_flower.description",
        effects: [
            { type: 'buff', textKey: "tooltip.arcane_flower.effect" },
            { type: 'buff', textKey: "tooltip.arcane_flower.effect.1" },
            { type: 'buff', textKey: "tooltip.arcane_flower.effect.2" },
        ]
    },
    'kubejs:band_of_starpower': {
        descriptionKey: "tooltip.band_of_starpower.description",
        effects: [
            { type: 'buff', textKey: "tooltip.band_of_starpower.effect" },
        ]
    },
    'kubejs:magic_cuffs': {
        descriptionKey: "tooltip.magic_cuffs.description",
        effects: [
            { type: 'buff', textKey: "tooltip.magic_cuffs.effect" },
            { type: 'buff', textKey: "tooltip.magic_cuffs.effect.1" },
        ]
    },
    'kubejs:magnet_flower': {
        descriptionKey: "tooltip.magnet_flower.description",
        effects: [
            { type: 'buff', textKey: "tooltip.magnet_flower.effect" },
            { type: 'buff', textKey: "tooltip.magnet_flower.effect.1" },
            { type: 'buff', textKey: "tooltip.magnet_flower.effect.2" },
        ]
    },
    'kubejs:mana_cloak': {
        descriptionKey: "tooltip.mana_cloak.description",
        effects: [
            { type: 'buff', textKey: "tooltip.mana_cloak.effect" },
            { type: 'buff', textKey: "tooltip.mana_cloak.effect.2" },
            { type: 'special', textKey: "tooltip.mana_cloak.cooldown" },
        ]
    },

    'kubejs:mark_of_wrath': {
        descriptionKey: "tooltip.common.mark_of_wrath.description",
        effects: [
            { type: 'buff', textKey: "tooltip.common.mark_of_wrath.effect" },
            { type: 'buff', textKey: "tooltip.common.mark_of_wrath.effect.2" },
            { type: 'buff', textKey: "tooltip.common.mark_of_wrath.effect.3" },
        ]
    },

    'kubejs:chain_of_lust': {
        descriptionKey: "tooltip.common.chain_of_lust.description",
        effects: [
            { type: 'buff', textKey: "tooltip.common.chain_of_lust.effect" },
            { type: 'buff', textKey: "tooltip.common.chain_of_lust.effect.2" },
            { type: 'buff', textKey: "tooltip.common.chain_of_lust.effect.3" },
        ]
    },

    'kubejs:pendant_of_sloth': {
        descriptionKey: "tooltip.common.pendant_of_sloth.description",
        effects: [
            { type: 'buff', textKey: "tooltip.common.pendant_of_sloth.effect" },
            { type: 'buff', textKey: "tooltip.common.pendant_of_sloth.effect.2" },
            { type: 'buff', textKey: "tooltip.common.pendant_of_sloth.effect.3" },
        ]
    },

    'kubejs:ring_of_gluttony': {
        descriptionKey: "tooltip.common.ring_of_gluttony.description",
        effects: [
            { type: 'buff', textKey: "tooltip.common.ring_of_gluttony.effect" },
            { type: 'buff', textKey: "tooltip.common.ring_of_gluttony.effect.2" },
            { type: 'buff', textKey: "tooltip.common.ring_of_gluttony.effect.3" },
        ]
    },

    'kubejs:stone_of_melancholy': {
        descriptionKey: "tooltip.common.stone_of_melancholy.description",
        effects: [
            { type: 'buff', textKey: "tooltip.common.stone_of_melancholy.effect" },
            { type: 'buff', textKey: "tooltip.common.stone_of_melancholy.effect.2" },
            { type: 'buff', textKey: "tooltip.common.stone_of_melancholy.effect.3" },
        ]
    },

    'kubejs:crown_of_pride': {
        descriptionKey: "tooltip.common.crown_of_pride.description",
        effects: [
            { type: 'buff', textKey: "tooltip.common.crown_of_pride.effect" },
            { type: 'buff', textKey: "tooltip.common.crown_of_pride.effect.2" },
            { type: 'buff', textKey: "tooltip.common.crown_of_pride.effect.3" },
            { type: 'buff', textKey: "tooltip.common.crown_of_pride.effect.4" },
        ]
    },

    'kubejs:eye_of_envy': {
        descriptionKey: "tooltip.common.eye_of_envy.description",
        effects: [
            { type: 'buff', textKey: "tooltip.common.eye_of_envy.effect" },
            { type: 'buff', textKey: "tooltip.common.eye_of_envy.effect.2" },
            { type: 'buff', textKey: "tooltip.common.eye_of_envy.effect.3" },
        ]
    },
};

ItemEvents.modifyTooltips(event => {
    TrinketTooltips.register(event, trinkets);
});
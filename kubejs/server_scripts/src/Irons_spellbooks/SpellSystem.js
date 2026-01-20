//混沌传送
ISSEvents.spellOnCast(event => {
    if (event.spellId == "hazennstuff:chaotic_teleport") {
        const player = event.entity
        if (player.hasEffect("kubejs:chaotic_teleport")) {
            player.attack($DamageSource("kubejs:rod_of_discord"), player.getMaxHealth() / 6);
        }
        player.potionEffects.add("kubejs:chaotic_teleport", 20 * 30, 0);
    }
});


// 学派属性映射表
const SCHOOL_ATTRIBUTES = {
    "irons_spellbooks:fire": "irons_spellbooks:fire_spell_power",
    "irons_spellbooks:ice": "irons_spellbooks:ice_spell_power",
    "irons_spellbooks:lightning": "irons_spellbooks:lightning_spell_power",
    "irons_spellbooks:holy": "irons_spellbooks:holy_spell_power",
    "irons_spellbooks:ender": "irons_spellbooks:ender_spell_power",
    "irons_spellbooks:blood": "irons_spellbooks:blood_spell_power",
    "irons_spellbooks:evocation": "irons_spellbooks:evocation_spell_power",
    "irons_spellbooks:nature": "irons_spellbooks:nature_spell_power",
    "irons_spellbooks:eldritch": "irons_spellbooks:eldritch_spell_power",
    "cataclysm_spellbooks:abyssal": "cataclysm_spellbooks:abyssal_spell_power",
    "familiarslib:sound": "familiarslib:sound_spell_power",
    "kubejs:dream": "kubejs:dream_spell_power",
    "hazennstuff:radiance": "hazennstuff:radiance_spell_power",
    "hazennstuff:shadow": "hazennstuff:shadow_spell_power"
};


ISSEvents.spellOnCast(event => {
    applyCrossSchoolLevelBonus(event);
})

//法术事件总线
ISSEvents.spellPostCast(event => {
    const spell = event.getSpell();
    const school = spell.getSchoolType().getId();
    // 学派处理逻辑
    switch (school) {
        case "irons_spellbooks:fire":
            //炽焰法术流派
            blazing_magic(event);
            mana_quenching(event);
            break;
        case "hazennstuff:radiance":
            //光辉法术流派
            break;
        case "hazennstuff:shadow":
            //暗影法术流派
            break;
        case "cataclysm_spellbooks:abyssal":
            //深渊法术流派
            break;
        case "kubejs:dream":
            //幻梦法术流派
            break;
        case "irons_spellbooks:nature":
            //自然法术流派
            break;
        case "irons_spellbooks:evocation":
            //召唤法术流派
            break;
        case "irons_spellbooks:ender":
            //末影法术流派
            break;
        case "irons_spellbooks:ice":
            //冰霜法术流派
            break;
        case "familiarslib:sound":
            //旋律法术流派
            break;
        case "irons_spellbooks:holy":
            //神圣法术流派
            break;
        case "irons_spellbooks:blood":
            starinium_ingot(event);
            //猩红法术流派
            break;
        case "irons_spellbooks:lightning":
            //雷霆法术流派
            break;
        case "kubejs:dream":
            //幻梦法术流派
            break;
        case "irons_spellbooks:eldritch":
            //远古巫术
            break;
        case "irons_spellbooks:eldritch":
            //远古巫术
            break;
        default:
            // 未知学派处理
            break;
    }
});

// 监听法术施放事件
ISSEvents.spellOnCast(event => {
    if (!event.entity == "minecraft:player") return
    if (!fu_hasTraitAnywhere(event.entity, "kubejs:spell_level_up_2")) return
    event.setSpellLevel(event.originalSpellLevel + 2)  // 提高法术等级
    event.setManaCost(event.manaCost + 50)             // 增加法力消耗
})


ISSEvents.spellOnCast(event => {
    if (!event.entity == "minecraft:player") return;

    let manaCost = event.getManaCost();
    let originalCost = manaCost;

    // 魔力减免效果列表
    const manaReductions = [
        {
            id: "magnet_flower",
            condition: () => getCuriosItem(event.entity, "kubejs:magnet_flower"),
            reduction: 0.08
        },
        {
            id: "arcane_flower",
            condition: () => getCuriosItem(event.entity, "kubejs:arcane_flower"),
            reduction: 0.08
        },
        {
            id: "star_beam_rye",
            condition: () => event.entity.hasEffect("kubejs:star_beam_rye"),
            reduction: 0.1
        },
        {
            id: "cobalt_ingot",
            condition: () => fu_hasTraitAnywhere(event.entity, "kubejs:cobalt_ingot"),
            reduction: 0.14
        },
        {
            id: "lustful_haze_alloy",
            condition: () => fu_hasTraitAnywhere(event.entity, "kubejs:lustful_haze_alloy"),
            reduction: 0.5
        }
    ];

    let totalReduction = 0;
    manaReductions.forEach(reduction => {
        if (reduction.condition()) {
            totalReduction += reduction.reduction;
        }
    });

    // 应用
    totalReduction = Math.min(totalReduction, 0.95); // 最大减免
    if (totalReduction > 0) {
        manaCost = originalCost * (1 - totalReduction);
        // 转换为整数
        manaCost = Math.round(manaCost);
        event.setManaCost(manaCost);
    }
});
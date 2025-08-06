/**
 * @typedef {{arms: $Item[], bonus: [mobEffect: Special.MobEffect, amplifier: number?, showParticles: boolean?]}} $ArmorSetBonus_
 * @type {Object.<String, $ArmorSetBonus_>}
 */
const bonuses = {
    set1: {
        arms: ["minecraft:chainmail_helmet"],
        bonus: ["kubejs:chainmail_arrow_1", 0, false],
    },
    set2: {
        arms: ["minecraft:chainmail_chestplate"],
        bonus: ["kubejs:chainmail_arrow_2", 0, false],
    },
    set3: {
        arms: ["minecraft:chainmail_leggings"],
        bonus: ["kubejs:chainmail_arrow_3", 0, false],
    },
    set4: {
        arms: ["minecraft:chainmail_boots"],
        bonus: ["kubejs:chainmail_arrow_4", 0, false],
    }
};

function armor_set_bonus(/**@type {$ContextUtils$EntityEquipmentContext_}*/ context) {
    const { entity, previousStack, currentStack } = context;
    const { potionEffects, armorSlots } = entity;

    /** @type {Special.Item[]} */
    const now_set = armorSlots.toArray().map(i => i.id);
    /** @type {Special.Item[]} */
    const last_set = armorSlots.toArray().map((i) => (i.id === currentStack.id ? previousStack.id : i.id));

    Object.entries(bonuses).forEach((/**@type {[String, $ArmorSetBonus_]}*/[key, data]) => {
        let {
            arms,
            bonus: [mobEffect, amplifier, showParticles],
        } = data;

        // 移除旧的套装奖励
        if (!arms.every((item) => last_set.includes(item))) entity.removeEffect(mobEffect);

        // 添加新的套装奖励
        if (arms.every((item) => now_set.includes(item)))
            potionEffects.add(mobEffect, -1, amplifier ?? 0, true, showParticles ?? false);
    });
}

EntityJSEvents.modifyEntity((event) =>
    event.modify("minecraft:player", (modifyBuilder) => {
        modifyBuilder.onEquipItem((context) => armor_set_bonus(context));
    })
);


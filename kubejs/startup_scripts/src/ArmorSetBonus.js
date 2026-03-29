// priority: 0

/**
 * @typedef {{arms: $Item[], bonus: [mobEffect: Special.MobEffect, amplifier: number?, showParticles: boolean?][]}} $ArmorSetBonus_
 * @type {Object.<String, $ArmorSetBonus_>}
 */
const bonuses = {
    set1: {
        arms: [
            "minecraft:chainmail_helmet",
            "minecraft:chainmail_chestplate",
            "minecraft:chainmail_leggings",
            "minecraft:chainmail_boots"
        ],
        bonus: [
            ["kubejs:chainmail_arrow", 0, false]
        ],
    },
    set2: {
        arms: [
            "minecraft:leather_helmet",
            "minecraft:leather_chestplate",
            "minecraft:leather_leggings",
            "minecraft:leather_boots"
        ],
        bonus: [
            ["farmersdelight:nourishment", 0, false]
        ],
    },
};

function armor_set_bonus(/**@type {$ContextUtils$EntityEquipmentContext_}*/ context) {
    const { entity, previousStack, currentStack } = context;
    const { potionEffects, armorSlots } = entity;

    /** @type {Special.Item[]} */
    const currentArmor = armorSlots.toArray()
        .map(i => i?.id)
        .filter(id => id !== undefined);

    Object.entries(bonuses).forEach(([key, data]) => {
        let { arms, bonus } = data;

        const shouldHaveBonus = arms.every((item) => currentArmor.includes(item));

        bonus.forEach(([mobEffect, amplifier, showParticles]) => {
            const effectInstance = entity.getEffect(mobEffect);

            if (shouldHaveBonus) {
                // 如果应该有效果，检查是否是套装效果
                const isSetEffect = effectInstance &&
                    effectInstance.duration === -1 &&
                    effectInstance.amplifier === (amplifier ?? 0) &&
                    effectInstance.visible === (showParticles ?? false);

                if (!isSetEffect) {
                    // 移除现有效果（如果不是套装效果），然后添加套装效果
                    if (effectInstance) {
                        entity.removeEffect(mobEffect);
                    }
                    // 添加套装效果
                    potionEffects.add(mobEffect, -1, amplifier ?? 0, true, showParticles ?? false);
                }
            } else if (effectInstance) {
                // 检查效果是否来自套装
                const isSetEffect = effectInstance.duration === -1 &&
                    effectInstance.amplifier === (amplifier ?? 0) &&
                    effectInstance.visible === (showParticles ?? false);

                // 如果是套装效果，就移除
                if (isSetEffect) {
                    entity.removeEffect(mobEffect);
                }
            }
        });
    });
}

NativeEvents.onEvent($LivingEquipmentChangeEvent, event => {
    armor_set_bonus(event);
});
const blacklisted_mobs = [
    "powerful_dummy:test_dummy",
    "powerful_dummy:test_dummy_water",
    "powerful_dummy:test_dummy_arthropod",
    "powerful_dummy:test_dummy_illager",
    "powerful_dummy:test_dummy_undead"
]

function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}

function plunder_effect(event) {
    const { entity, damage, level } = event

    if (!entity.potionEffects.isActive("kubejs:plunder")) return;

    let lvl = entity.getEffect("kubejs:plunder")?.amplifier
    let base_chance = 0.1 * (lvl * 1.5)

    let currentHealth = entity.getHealth()
    let maxHealth = entity.getMaxHealth()

    let damageRatio = damage / currentHealth

    let damageInfluence = 0
    if (damageRatio >= 0.05) {
        damageInfluence = 1.0
    } else {
        damageInfluence = damageRatio / 0.05
    }

    let adjusted_base_chance = base_chance * damageInfluence

    let drop_chance = clamp(adjusted_base_chance * damage, 0.05, 1.0)

    let entityType = entity.getType()
    if (blacklisted_mobs.find(mob => mob.toString() === entityType)) {
        return;
    }

    // 检查是否有手持物品
    let mainHandItem = entity.getMainHandItem()
    let offHandItem = entity.getOffhandItem()
    let hasHandItems = mainHandItem && !mainHandItem.isEmpty() || offHandItem && !offHandItem.isEmpty()

    if (hasHandItems && Math.random() < drop_chance) {
        // 玩家处理逻辑
        if (entity.isPlayer()) {
            let itemStack = getCuriosItem(entity, 'cataclysm:sticky_gloves');
            if (itemStack !== null) return;
            // 优先掠夺主手，如果主手有物品
            if (mainHandItem && !mainHandItem.isEmpty()) {
                let item_to_drop = mainHandItem
                event.player.drop(Item.of(item_to_drop, item_to_drop.getCount()), false)
                entity.setItemSlot(0, "minecraft:air")
            }
            // 如果主手没有物品但副手有，掠夺副手
            else if (offHandItem && !offHandItem.isEmpty()) {
                let item_to_drop = offHandItem
                event.player.drop(Item.of(item_to_drop, item_to_drop.getCount()), false)
                entity.setItemSlot(1, "minecraft:air")
            }
        }
        else {
            // 优先掠夺主手，如果主手有物品
            if (mainHandItem && !mainHandItem.isEmpty()) {
                let item_to_drop = mainHandItem
                let item_entity = level.createEntity('item')
                item_entity.item = item_to_drop.copy()
                item_entity.setPosition(entity.x, entity.y, entity.z)
                item_entity.spawn()
                entity.setItemSlot(0, "minecraft:air")
            }
            // 如果主手没有物品但副手有，掠夺副手
            else if (offHandItem && !offHandItem.isEmpty()) {
                let item_to_drop = offHandItem
                let item_entity = level.createEntity('item')
                item_entity.item = item_to_drop.copy()
                item_entity.setPosition(entity.x, entity.y, entity.z)
                item_entity.spawn()
                entity.setItemSlot(1, "minecraft:air")
            }
        }
    }
}
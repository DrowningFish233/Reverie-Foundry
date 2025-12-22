const blacklisted_mobs = ["minecraft:player", "minecraft:creeper", "minecraft:enderman"] // 在这里添加你想要排除的实体

function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}

function plunder_effect(event) {
    const { entity, damage, level } = event

    if (!entity.potionEffects.isActive("kubejs:plunder")) return;

    let lvl = entity.getEffect("kubejs:plunder")?.amplifier
    let drop_chance = clamp(0.1 * (lvl * 1.5) * damage, 0.05, 1.0)

    // 检查实体是否在黑名单中
    let entityType = entity.getType()
    if (blacklisted_mobs.find(mob => mob.toString() === entityType)) {
        return; // 如果在黑名单中，直接返回
    }

    // 检查是否有手持物品
    let mainHandItem = entity.getMainHandItem()
    let offHandItem = entity.getOffhandItem()
    let hasHandItems = mainHandItem && !mainHandItem.isEmpty() || offHandItem && !offHandItem.isEmpty()

    if (hasHandItems && (Math.random() - 0.1) < drop_chance) {

        // 玩家处理逻辑
        if (entity.player) {
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
        // 其他实体处理逻辑
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
        return;
    }
    else {
        return;
    }
}
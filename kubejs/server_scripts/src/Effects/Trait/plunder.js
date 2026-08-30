const blacklisted_mobs = [
    "powerful_dummy:test_dummy",
    "powerful_dummy:test_dummy_water",
    "powerful_dummy:test_dummy_arthropod",
    "powerful_dummy:test_dummy_illager",
    "powerful_dummy:test_dummy_undead",
    "darkdoppelganger:dark_doppelganger",
    "gravestone:player_ghost"
]

function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}

function plunder_effect(event) {
    const { source, entity, damage, level } = event;

    const attacker = source.entity || source.player;
    if (!attacker || !attacker.isLiving()) return;

    if (!attacker.hasEffect("kubejs:plunder")) return;

    let effect = attacker.getEffect("kubejs:plunder");
    if (!effect) return;

    let lvl = effect.amplifier + 1;
    let base_chance = 0.1 * (lvl * 1.5);

    let target = entity;
    if (!target || !target.isLiving()) return;

    let currentHealth = target.getHealth();
    let maxHealth = target.getMaxHealth();

    let actualDamage = Math.min(damage, currentHealth);

    if (maxHealth <= 0) return;

    let damageRatio = actualDamage / maxHealth;
    let healthRatio = currentHealth / maxHealth;
    let damageInfluence = 0;

    if (damageRatio >= 0.03) {
        damageInfluence = 1.0;
    } else {
        damageInfluence = damageRatio / 0.03;
    }

    let adjusted_base_chance = base_chance * damageInfluence;


    let healthFactor = 1.0 + (1.0 - healthRatio) * 0.5;

    // 基础 × 伤害占比 × 残血加成
    let damageInfluenceFactor = 0.3 + damageRatio * 0.7;
    let drop_chance = clamp(adjusted_base_chance * damageInfluenceFactor * healthFactor, 0.03, 1.0);

    let targetType = target.getType().toString();
    if (blacklisted_mobs.includes(targetType)) {
        return;
    }

    let mainHandItem = target.getMainHandItem();
    let offHandItem = target.getOffhandItem();
    let hasHandItems = (mainHandItem && !mainHandItem.isEmpty()) || (offHandItem && !offHandItem.isEmpty());

    if (!hasHandItems) return;

    if (Math.random() >= drop_chance) return;

    if (target.isPlayer()) {
        let gloves = getCuriosItem(target, 'cataclysm:sticky_gloves');
        if (gloves !== null) return;
    }

    let item_to_drop = null;
    let slot_to_clear = -1;

    // 优先掠夺主手
    if (mainHandItem && !mainHandItem.isEmpty()) {
        item_to_drop = mainHandItem.copy();
        slot_to_clear = 0;
    }
    // 其次掠夺副手
    else if (offHandItem && !offHandItem.isEmpty()) {
        item_to_drop = offHandItem.copy();
        slot_to_clear = 1;
    }

    if (item_to_drop && slot_to_clear !== -1) {
        target.setItemSlot(slot_to_clear, "minecraft:air");

        if (target.isPlayer()) {
            // 玩家掉落
            target.drop(Item.of(item_to_drop, item_to_drop.getCount()), false);
        } else {
            // 生物掉落
            let item_entity = level.createEntity('item');
            if (item_entity) {
                item_entity.item = item_to_drop;
                item_entity.setPos(target.getX(), target.getY() + 0.5, target.getZ());
                item_entity.spawn();
            }
        }
    }
}

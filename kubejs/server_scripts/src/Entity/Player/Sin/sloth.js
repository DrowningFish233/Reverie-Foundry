// priority: 10
// 怠惰特质
RFTrait('kubejs:sloth', 999)
    // 每20tick施加怠惰效果
    .onTick(event => {
        const { entity } = event;
        if (!entity.isLiving() || !entity.isPlayer()) return;
        if (entity.tickCount % 20 !== 0) return;

        let isSLOTH = entity.persistentData.getInt(sins.SLOTH) || 0;
        if (isSLOTH > 0) {
            entity.potionEffects.add("kubejs:sloth", 80, 0, false, false);
        }
    })

    // 受伤时：造成范围伤害，CD1秒
    .beforeHurt(event => {
        const { entity } = event;
        if (!entity.isLiving() || !entity.isPlayer()) return;
        if (!entity.hasEffect("kubejs:sloth")) return;

        // 检查冷却
        const cooldownKey = "sloth_damage_cooldown";
        if ($CooldownManager.hasCooldown(entity, cooldownKey)) return;

        const armorValue = entity.getAttribute('minecraft:generic.armor')?.value ?? 0;
        const rangeDamage = armorValue * 0.75;

        if (rangeDamage > 0) {
            let nearbyEntities = entity.level.getEntities(
                entity,
                entity.getBoundingBox().inflate(2)
            ).filter(e =>
                e.isLiving() &&
                e.isAlive() &&
                e !== entity
            );

            nearbyEntities.forEach(target => {
                attackEntity(target, 'generic', rangeDamage, true);
            });
        }

        $CooldownManager.setCooldown(entity, cooldownKey, 20);
    })

    .beforeHurt(event => {
        const { entity } = event;
        if (!entity.isLiving() || !entity.isPlayer()) return;
        if (entity.hasEffect("kubejs:sloth_2")) {
            new_damage(event, STAGE.MULTIPLY, 0.35);
        }
    })
    .register();
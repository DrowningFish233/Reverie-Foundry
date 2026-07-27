// priority: 10
// 怠惰特质
RFTrait('kubejs:sloth', 999)
    // 每20tick施加怠惰效果
    .onTick(20, event => {
        let { entity } = event;
        if (!entity.isLiving() || !entity.isPlayer()) return;

        let isSLOTH = entity.persistentData.getInt(sins.SLOTH) || 0;
        if (isSLOTH > 0) {
            entity.potionEffects.add("kubejs:sloth", 80, 0, false, false);
        }
    })

    // 受伤时：造成范围伤害，CD1秒
    .beforeHurt(event => {
        let { entity } = event;
        if (!entity.isLiving() || !entity.isPlayer()) return;
        if (!entity.hasEffect("kubejs:sloth")) return;

        let hasPendantOfSloth = getCuriosItem(entity, 'kubejs:pendant_of_sloth') !== null;

        trySkill(entity, "sloth_damage", 20, () => {
            let armorValue = entity.getAttribute('minecraft:generic.armor')?.value ?? 0;
            let rangeDamage = hasPendantOfSloth ? armorValue * 0.75 : armorValue * 0.5;

            if (rangeDamage > 0) {
                let range = hasPendantOfSloth ? 2 : 1;
                let nearbyEntities = entity.level.getEntities(
                    entity,
                    entity.getBoundingBox().inflate(range)
                ).filter(e =>
                    e.isLiving() &&
                    e.isAlive() &&
                    e !== entity
                );

                nearbyEntities.forEach(target => {
                    attackEntity(target, 'generic', rangeDamage, true);
                });
            }
        })
    })

    .beforeHurt(event => {
        let { entity } = event;
        if (!entity.isLiving() || !entity.isPlayer()) return;
        if (entity.hasEffect("kubejs:sloth_2")) {
            let hasPendantOfSloth = getCuriosItem(entity, 'kubejs:pendant_of_sloth') !== null;
            let damageReduction = hasPendantOfSloth ? 0.15 : 0.35;
            new_damage(event, STAGE.MULTIPLY, damageReduction);
        }
    })
    .register();

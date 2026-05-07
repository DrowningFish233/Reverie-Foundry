// priority: 10
// 嫉妒特质
RFTrait('kubejs:envy', 999)
    .beforeHurt(event => {
        const { source, entity } = event;
        const attacker = source.player || source.actual;

        if (!attacker || !attacker.isLiving()) return;
        if (!attacker.hasEffect("kubejs:envy")) return;
        if (!entity || !entity.isLiving()) return;

        let isEnmityTarget = entity.hasEffect("kubejs:enmity");

        if (!isEnmityTarget) {
            new_damage(event, STAGE.MULTIPLY, 0.7);
            entity.potionEffects.add('kubejs:enmity', 200, 0);
        }

        if (isEnmityTarget) {
            let stealCooldownKey = "envy_steal_cooldown";
            if ($CooldownManager.hasCooldown(attacker, stealCooldownKey)) {
                return;
            }

            let buffs = $RFUtils.getActiveBuffIds(entity);

            for (let buffId of buffs) {
                let buffEffect = entity.getEffect(buffId);
                if (buffEffect) {
                    let amplifier = buffEffect.getAmplifier();
                    let duration = buffEffect.getDuration();

                    entity.removeEffect(buffId);
                    attacker.potionEffects.add(buffId, duration, amplifier);

                    let maxHealth = entity.getMaxHealth();
                    let stealAmount = maxHealth * 0.05;

                    attackEntity(entity, 'generic', stealAmount, true);

                    if (attacker.hasEffect('kubejs:temporary_hit_points')) {
                        addEffectLayers(attacker, 'kubejs:temporary_hit_points', 2);
                    } else {
                        attacker.potionEffects.add('kubejs:temporary_hit_points', 600, 1);
                    }

                    $CooldownManager.setCooldown(attacker, stealCooldownKey, 10);

                    break;
                }
            }
        }
    })

    .beforeHurt(event => {
        const { source, entity } = event;
        const attacker = source.player || source.actual;

        if (!entity.isLiving() || !entity.isPlayer()) return;
        if (!attacker || !attacker.isLiving()) return;

        let hasEnvy = attacker.hasEffect("kubejs:envy");
        if (!hasEnvy) return;

        let hasEnmity = entity.hasEffect("kubejs:enmity");

        if (!hasEnmity) {
            new_damage(event, STAGE.MULTIPLY, 0.7);
        }
    })

    .onTick(event => {
        const { entity } = event;
        if (!entity.isLiving() || !entity.isPlayer()) return;
        if (entity.tickCount % 20 !== 0) return;

        let isENVY = entity.persistentData.getInt(sins.ENVY) || 0;
        if (isENVY > 0) {
            entity.potionEffects.add("kubejs:envy", 80, 0, false, false);
        }
    })

    .register();
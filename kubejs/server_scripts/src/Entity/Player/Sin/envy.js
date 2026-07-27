// priority: 10
// 嫉妒特质
RFTrait('kubejs:envy', 999)
    .beforeHurt(event => {
        let { source, entity } = event;
        let attacker = source.player || source.actual;

        if (!attacker || !attacker.isLiving()) return;
        if (!attacker.hasEffect("kubejs:envy")) return;
        if (!entity || !entity.isLiving()) return;

        // 检查是否装备了嫉妒之眼
        let hasEyeOfEnvy = getCuriosItem(attacker, 'kubejs:eye_of_envy') !== null;

        let isEnmityTarget = entity.hasEffect("kubejs:enmity");

        if (!isEnmityTarget) {
            let damageMultiplier = hasEyeOfEnvy ? 0.7 : 0.5;
            new_damage(event, STAGE.MULTIPLY, damageMultiplier);
            entity.potionEffects.add('kubejs:enmity', 200, 0);
            return;
        }

        if (isEnmityTarget) {
            trySkill(attacker, "envy_steal", 10, () => {
                let buffs = $RFUtils.getActiveBuffIds(entity);

                for (let buffId of buffs) {
                    let buffEffect = entity.getEffect(buffId);
                    if (buffEffect) {
                        let amplifier = buffEffect.getAmplifier();
                        let duration = buffEffect.getDuration();

                        entity.removeEffect(buffId);
                        attacker.potionEffects.add(buffId, duration, amplifier);

                        if (hasEyeOfEnvy) {
                            let maxHealth = entity.getMaxHealth();
                            let stealAmount = maxHealth * 0.05;
                            attackEntity(entity, 'generic', stealAmount, true);

                            if (attacker.hasEffect('kubejs:temporary_hit_points')) {
                                addEffectLayers(attacker, 'kubejs:temporary_hit_points', 2);
                            } else {
                                attacker.potionEffects.add('kubejs:temporary_hit_points', 600, 1);
                            }
                        }
                        break;
                    }
                }
            })
        }
    })
    .beforeHurt(event => {
        let { source, entity } = event;
        let attacker = source.player || source.actual;

        if (!entity.isLiving() || !entity.isPlayer()) return;
        if (!attacker || !attacker.isLiving()) return;

        let hasEnvy = attacker.hasEffect("kubejs:envy");
        if (!hasEnvy) return;

        // 检查是否装备了嫉妒之眼
        let hasEyeOfEnvy = getCuriosItem(attacker, 'kubejs:eye_of_envy') !== null;
        let isEnmityTarget = entity.hasEffect("kubejs:enmity");

        if (!isEnmityTarget) {
            let damageMultiplier = hasEyeOfEnvy ? 0.7 : 0.5;
            new_damage(event, STAGE.MULTIPLY, damageMultiplier);
        }
    })

    .onTick(20, event => {
        let { entity } = event;
        if (!entity.isLiving() || !entity.isPlayer()) return;

        let isENVY = entity.persistentData.getInt(sins.ENVY) || 0;
        if (isENVY > 0) {
            entity.potionEffects.add("kubejs:envy", 80, 0, false, false);
        }
    })

    .register();

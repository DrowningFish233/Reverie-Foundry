// priority: 10
// 色欲特质
RFTrait('kubejs:lust', 999)
    .beforeHurt(event => {
        const { source, entity } = event;
        const attacker = source.player;

        if (!attacker || !attacker.isLiving()) return;
        if (!attacker.hasEffect("kubejs:lust")) return;
        if (!entity || !entity.isLiving()) return;

        attackEntity(attacker, 'generic', 1, true);

        const cooldownKey = "lust_rose_cooldown";
        if ($CooldownManager.hasCooldown(attacker, cooldownKey)) {
            return;
        }

        const hasChainOfLust = getCuriosItem(attacker, 'kubejs:chain_of_lust') !== null;

        let roseLayers = getEffectLayers(entity, 'kubejs:rose') || 0;

        if (entity.hasEffect('kubejs:rose')) {
            addEffectLayers(entity, 'kubejs:rose', 1);
        } else {
            entity.potionEffects.add('kubejs:rose', 300, 0);
        }
        roseLayers++;
        $CooldownManager.setCooldown(attacker, cooldownKey, 10);

        if (roseLayers >= 7) {
            entity.removeEffect('kubejs:rose');

            if (hasChainOfLust) {
                const healAmount = attacker.getMaxHealth() * 0.15;
                attacker.heal(healAmount);
            }

            const debuffLevel = hasChainOfLust ? 3 : 2;
            $RFUtils.applyRandomDebuff(entity, 200, debuffLevel);

            const debuffIds = $RFUtils.getActiveDebuffIds(entity);
            for (const debuffId of debuffIds) {
                if (entity.hasEffect(debuffId)) {
                    addEffectLayers(entity, debuffId, 1);
                }
            }
        }
    })

    // 受伤时：流血伤害免疫
    .beforeHurt(event => {
        const { source, entity } = event;

        if (!entity || !entity.hasEffect("kubejs:lust")) return;

        const hasChainOfLust = getCuriosItem(entity, 'kubejs:chain_of_lust') !== null;

        if (hasChainOfLust && source.getType() === 'bleed') {
            const newHealth = entity.getHealth() - event.damage;
            if (newHealth < 1) {
                event.damage = entity.getHealth() - 1;
            }
        }
    })

    .register();

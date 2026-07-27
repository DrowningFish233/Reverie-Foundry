// priority: 10
// 暴怒效果
RFTrait('kubejs:wrath', 999)
    .beforeHurt(event => {
        let { source, entity } = event;
        let attacker = source.actual;

        if (!entity.isLiving() || !entity.isPlayer()) return;
        if (!entity.hasEffect("kubejs:wrath")) return;
        if (!attacker || !attacker.isLiving()) return;

        attacker.potionEffects.add('kubejs:wrath_damage', 200, 0);
        attacker.potionEffects.add('minecraft:glowing', 200, 0);
    })

    .beforeHurt(event => {
        let { source, entity } = event;
        let attacker = source.player || source.actual;

        if (!attacker || !attacker.isLiving()) return;
        if (!attacker.hasEffect("kubejs:wrath")) return;

        attacker.persistentData.putInt("wrath_idle_timer", 0);

        if (entity.hasEffect('kubejs:wrath_damage')) {
            entity.removeEffect('kubejs:wrath_damage');
            entity.removeEffect('minecraft:glowing');

            let hasMarkOfWrath = getCuriosItem(attacker, 'kubejs:mark_of_wrath') !== null;

            if (hasMarkOfWrath) {
                new_damage(event, STAGE.MULTIPLY, 1.2);
                let currentLayers = getEffectLayers(attacker, 'kubejs:enhanced_tattoo');
                if (currentLayers < 5) {
                    if (attacker.hasEffect('kubejs:enhanced_tattoo')) {
                        addEffectLayers(attacker, 'kubejs:enhanced_tattoo', 1);
                    } else {
                        attacker.potionEffects.add('kubejs:enhanced_tattoo', 300, 0);
                    }
                }
            } else {
                new_damage(event, STAGE.MULTIPLY, 1.10);
            }
        }
    })

    .onTick(20, event => {
        let { entity } = event;
        if (!entity.isLiving() || !entity.isPlayer()) return;
        if (!entity.hasEffect("kubejs:wrath")) return;

        let idleTimer = entity.persistentData.getInt("wrath_idle_timer") || 0;
        idleTimer += 20;
        entity.persistentData.putInt("wrath_idle_timer", idleTimer);

        if (idleTimer >= 100) {
            let damage = entity.getMaxHealth() / 10;
            attackEntity(entity, 'kubejs:wrath', damage, true);
            entity.persistentData.putInt("wrath_idle_timer", 80);
        }
    })

    .register();

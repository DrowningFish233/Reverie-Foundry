
// priority: 100
/**
* 总效果类层
*/
function allthe_event(event) {
    paralysis_combined_effect(event);    //麻痹效果
    all_dynamic_damage(event)   //动态减伤!
    other_effect(event);    //其他药水效果处理
    depravityDamage(event);     //沉沦受伤机制
    sanityAttack(event);
    allthe_curios_hurt_event(event);    //饰品效果
    spell_type(event);  //法术效果处理
    death_time(event);  //濒死处理
    EntityFixMain(event);
}
/**
 * 其他药水效果处理
 */
function other_effect(event) {
    hurtEffect(event);
    use_adrenaline_effect(event);
    load_protection_attack(event);
    load_protection(event);
    elemental_mix(event);
    lightning_electrified(event);
    plunder_effect(event);
    old_fashioned_effect(event);
    moonshine_effect(event);
    moscow_mule_effect(event);
    bloody_mary_effect(event);
    everclear_effect(event);
    vodka_effect(event);
    purple_haze_effect(event);
    whiskey_effect(event);
    eternal_life(event);
    rune_of_deflection_effect(event);
    bloodlust_attack(event);
    handleBleed(event);
    melting_eyeball_ego_attack(event);
    damage_amplification(event);
    kubejs_arrow(event);
    chainmail_arrow(event);
    disillusionment(event);
    protect(event);
}


/**
 * 受伤事件修改逻辑
 */
EntityEvents.beforeHurt(allthe_event);


let traitCount = 0;

function printTraitStats() {
    console.log(`[Reverie Foundry-Trait] 词条注册统计`);
    console.log(`[Reverie Foundry-Trait] Trait事件注册总数: ${traitCount}`);
}
/**
 * @param {string} id - 特质ID
 * @param {number} [priority=0] - 优先级，数值越高越先执行
 * 并不是说写了这个就会自动注册对应词缀，还是需要生成的，这个是用于快捷方便的把实现逻辑注册进对应事件里的
 */
function RFTrait(id, priority) {
    if (priority === undefined) priority = 0;

    const handlers = {
        tick: [],
        beforeHurt: [],
        afterHurt: [],
        leftClick: [],
        rightClick: [],
        death: [],
        blockBroken: []
    };

    const self = {
        priority: priority,

        /**
         * Tick事件
         * @overload
         * @param {typeof RFTick} callback - 回调函数，默认60刻触发一次
         * @returns {typeof self}
         */
        /**
         * @overload
         * @param {number} interval - 触发间隔（刻）
         * @param {typeof RFTick} callback - 回调函数
         * @returns {typeof self}
         */
        /**
         * @param {number|typeof RFTick} interval
         * @param {typeof RFTick} [callback]
         */
        onTick(interval, callback) {
            if (callback === undefined) {
                callback = /** @type {typeof RFTick} */ (interval);
                interval = 60;
            }
            handlers.tick.push({
                callback: /** @type {typeof RFTick} */ (callback),
                interval: /** @type {number} */ (interval),
                counter: 0,
                priority: this.priority
            });
            return self;
        },

        /**
         * 受伤前事件
         * @param {typeof RFBeforeHurt} callback - 回调函数
         * @returns {typeof self}
         */
        beforeHurt(callback) {
            handlers.beforeHurt.push({
                callback: callback,
                priority: this.priority
            });
            return self;
        },

        /**
         * 受伤后事件
         * @param {typeof RFAfterHurt} callback - 回调函数
         * @returns {typeof self}
         */
        afterHurt(callback) {
            handlers.afterHurt.push({
                callback: callback,
                priority: this.priority
            });
            return self;
        },

        /**
         * 左键点击事件
         * @param {typeof RFLeftClick} callback - 回调函数
         * @returns {typeof self}
         */
        leftClick(callback) {
            handlers.leftClick.push({
                callback: callback,
                priority: this.priority
            });
            return self;
        },

        /**
         * 右键点击事件
         * @param {typeof RFRightClick} callback - 回调函数
         * @returns {typeof self}
         */
        rightClick(callback) {
            handlers.rightClick.push({
                callback: callback,
                priority: this.priority
            });
            return self;
        },

        /**
         * 死亡事件
         * @param {typeof RFDeath} callback - 回调函数
         * @returns {typeof self}
         */
        death(callback) {
            handlers.death.push({
                callback: callback,
                priority: this.priority
            });
            return self;
        },

        /**
          * 方块破坏事件
          * @param {typeof RFBlockBroken} callback - 回调函数
          * @returns {typeof self}
          */
        blockBroken(callback) {
            handlers.blockBroken.push({
                callback: callback,
                priority: this.priority
            });
            return self;
        },

        /**
         * 注册特质到事件
         * @returns {typeof self}
         */
        register() {
            // Tick事件
            if (handlers.tick.length) {
                var sortedTick = handlers.tick.slice().sort((a, b) => b.priority - a.priority);
                PlayerEvents.tick(event => {
                    sortedTick.forEach(h => {
                        h.counter++;
                        if (h.counter >= h.interval) {
                            h.counter = 0;
                            h.callback(event);
                        }
                    });
                });
            }

            // 受伤前事件
            if (handlers.beforeHurt.length) {
                var sortedBefore = handlers.beforeHurt.slice().sort((a, b) => b.priority - a.priority);
                EntityEvents.beforeHurt(event => {
                    sortedBefore.forEach(h => h.callback(event));
                });
            }

            // 受伤后事件
            if (handlers.afterHurt.length) {
                var sortedAfter = handlers.afterHurt.slice().sort((a, b) => b.priority - a.priority);
                EntityEvents.afterHurt(event => {
                    sortedAfter.forEach(h => h.callback(event));
                });
            }

            // 左键点击事件
            if (handlers.leftClick.length) {
                var sortedLeft = handlers.leftClick.slice().sort((a, b) => b.priority - a.priority);
                ItemEvents.firstLeftClicked(event => {
                    sortedLeft.forEach(h => h.callback(event));
                });
            }

            // 右键点击事件
            if (handlers.rightClick.length) {
                var sortedRight = handlers.rightClick.slice().sort((a, b) => b.priority - a.priority);
                ItemEvents.firstRightClicked(event => {
                    sortedRight.forEach(h => h.callback(event));
                });
            }

            // 死亡事件
            if (handlers.death.length) {
                var sortedDeath = handlers.death.slice().sort((a, b) => b.priority - a.priority);
                EntityEvents.death(event => {
                    sortedDeath.forEach(h => h.callback(event));
                });
            }

            // 方块破坏事件
            if (handlers.blockBroken.length) {
                var sortedBlockBroken = handlers.blockBroken.slice().sort((a, b) => b.priority - a.priority);
                BlockEvents.broken(event => {
                    sortedBlockBroken.forEach(h => h.callback(event));
                });
            }

            traitCount++;
            console.log(`[Reverie Foundry-Trait] 已注册: ${id} (优先级: ${this.priority})`);
            return self;
        }
    };

    return self;
}


//'kubejs:achroous_ingot' 我能一只手数到十
RFTrait('kubejs:achroous_ingot', 0)
    .beforeHurt(event => {
        const { source, entity } = event;
        const attacker = source.player || source.actual;

        if (!attacker || !attacker.isLiving()) return;
        if (!fu_hasTraitAnywhere(attacker, "kubejs:achroous_ingot")) return;

        const traitLevel = fu_getHighestTraitLevelAnywhere(attacker, "kubejs:achroous_ingot");
        const damageChance = traitLevel * 0.1;

        if (Math.random() < damageChance) {
            attackEntity(attacker, 'magic', 5, true)
        }
    })
    .onTick(20, event => {
        const player = event.player;
        if (!player || !player.isLiving()) return;
        if (!fu_hasTraitAnywhere(player, "kubejs:achroous_ingot")) return;
        const achroous_ingot_radius = 5;
        const world = player.level;

        const nearbyEntities = world.getEntities(
            player,
            player.getBoundingBox().inflate(achroous_ingot_radius)
        ).filter(entity =>
            entity.isLiving() &&
            entity !== player
        );
        for (let entity of nearbyEntities) {
            entity.potionEffects.add("minecraft:nausea", 20 * 3, 0);
            entity.potionEffects.add("minecraft:weakness", 20 * 3, 0);
        }

    })
    .register();


/*
//'kubejs:luminofish_ink_sac' 毒爆术
RFTrait('kubejs:luminofish_ink_sac', 0)
    .beforeHurt(event => {
        const { source, entity } = event;
        const attacker = source.player
        if (!attacker || !attacker.isLiving() || !fu_hasTraitAnywhere(attacker, "kubejs:luminofish_ink_sac")) {
            return;
        }
        if (!entity.hasEffect("minecraft:poison")) return
        const poisonEffect = entity.getEffect("minecraft:poison");
        if (!poisonEffect) return;

        const traitLevel = fu_getTraitLevel(attacker, "kubejs:luminofish_ink_sac") + 1;
        const poisonCost = traitLevel * 2;
        const currentAmplifier = entity.getAmplifier();
        const currentDuration = poisonEffect.getDuration();

        if (currentAmplifier + 1 < poisonCost) return;

        const baseDamage = poisonCost * 1.5;
        const levelBonus = traitLevel * 1.5;
        const totalDamage = baseDamage + levelBonus;

        attackEntity(entity, "minecraft:magic", totalDamage, true)

        if (currentAmplifier + 1 > poisonCost) {
            const newAmplifier = currentAmplifier - poisonCost;
            entity.removeEffect("minecraft:poison");
            entity.potionEffects.add("minecraft:poison", currentDuration, newAmplifier);
        } else {
            entity.removeEffect("minecraft:poison");
        }
    })
    .register();

*/

//'hazennstuff:hallowed_ingot' 神圣庇护
RFTrait('kubejs:hallowed_ingot', 0)
    .onTick(600, event => {
        const { entity } = event;
        if (!entity.isPlayer()) return;
        if (!fu_hasTraitAnywhere(entity, 'kubejs:hallowed_ingot')) return;
        entity.potionEffects.add("kubejs:hallowed_ingot", 1200, 0);
    })
    .beforeHurt(event => {
        const { entity } = event;
        if (!entity.isPlayer()) return;
        if (!entity.hasEffect("kubejs:hallowed_ingot")) return;
        entity.removeEffect("kubejs:hallowed_ingot");
        event.cancel()

    })
    .register();


//'kubejs:acril_ingot' 滋滋！
RFTrait('kubejs:acril_ingot', 0)
    .leftClick(event => {
        const player = event.player
        if (!fu_hasTraitAnywhere(player, "kubejs:acril_ingot")) return;

        trySkill(player, "acril_ingot", 200, () => {
            let magicData = getPlayerMagicData(player)
            let currentMana = magicData.getMana()

            if (currentMana >= 20) {
                let amplifier = fu_getHighestTraitLevelAnywhere(player, "kubejs:acril_ingot")
                overLimitSpellCast($ResourceLocation('irons_spellbooks', 'chain_lightning'), amplifier, player, false)
                magicData.addMana(-20)
            } else {
                player.tell("§c魔力不足！")
            }
        })
    })
    .register();


//''eternal_starlight:shadow_snail_shell' 龟缩
RFTrait('kubejs:shadow_snail_shell', 0)
    .beforeHurt(event => {
        const { source, entity } = event;
        const actual = source.actual;

        if (!fu_hasTraitAnywhere(entity, 'kubejs:shadow_snail_shell')) return;
        if (!entity.crouching || !actual) return

        new_damage(event, STAGE.MULTIPLY, 0.15)
    })
    .beforeHurt(event => {
        const { source, entity } = event;
        const attacker = source.player || source.actual;

        if (!attacker || !attacker.isLiving() || !attacker.crouching || !fu_hasTraitAnywhere(attacker, "kubejs:shadow_snail_shell")) {
            return;
        }
        new_damage(event, STAGE.MULTIPLY, 0.15)
    })
    .register();


//''hazennstuff:demonite_ingot' 世界吞噬者
RFTrait('kubejs:demonite_ingot', 0)
    .blockBroken(event => {
        const { player, block } = event;
        if (!player || !player.isPlayer()) return;
        const item = player.getMainHandItem();
        if (item.getId() === "minecraft:air") return;

        if (!fu_hasTraitMainHand(player, "kubejs:demonite_ingot")) return;

        const traitLevel = fu_getTraitLevelMainHand(player, "kubejs:demonite_ingot");

        const MAX_ENERGY = traitLevel * 10000;
        let currentEnergy = getDataValue(item, "demonite_ingot_blocks", 0);

        currentEnergy = Math.min(currentEnergy + 1, MAX_ENERGY);
        setDataValue(item, "demonite_ingot_blocks", currentEnergy);

        const triggerChance = 0.25 + (traitLevel * 0.05);
        if (Math.random() < triggerChance) {
            const needsFood = player.getFoodLevel() < 20;
            const needsSaturation = player.getSaturation() < 20;

            if (!needsFood && !needsSaturation) return;
            // 计算所需的能量消耗
            const requiredEnergy = Math.max(10, 100 - (traitLevel * 30));
            if (currentEnergy < requiredEnergy) return;

            const baseFood = 1 + traitLevel;
            const baseSaturation = 1 + traitLevel;

            if (Math.random() < 0.5) {
                const duration = 40 + (traitLevel * 40);
                const amplifier = Math.min(3, Math.floor(traitLevel - 1));
                player.potionEffects.add("minecraft:regeneration", duration, amplifier);

                currentEnergy -= requiredEnergy;
                setDataValue(item, "demonite_ingot_blocks", currentEnergy);
            } else {
                if (needsFood || needsSaturation) {
                    const currentFood = player.getFoodLevel();
                    const currentSaturation = player.getSaturation();
                    if (needsFood) {
                        const foodToAdd = Math.min(baseFood, 20 - currentFood);
                        player.setFoodLevel(currentFood + foodToAdd);

                        if (foodToAdd < baseFood && needsSaturation) {
                            const saturationLeft = baseFood - foodToAdd;
                            const saturationToAdd = Math.min(saturationLeft, 20 - currentSaturation);
                            player.setSaturation(currentSaturation + saturationToAdd);
                        }
                    } else if (needsSaturation) {
                        const saturationToAdd = Math.min(baseSaturation, 20 - currentSaturation);
                        player.setSaturation(currentSaturation + saturationToAdd);
                    }
                    currentEnergy -= requiredEnergy;
                    setDataValue(item, "demonite_ingot_blocks", currentEnergy);
                }
            }
        }
    })
    .beforeHurt(event => {
        const { source, entity, damage } = event;
        const attacker = source.actual;
        if (!entity.isLiving() || !entity.isPlayer() || !fu_hasTraitMainHand(entity, "kubejs:demonite_ingot")) return;

        const traitLevel = fu_getTraitLevelMainHand(entity, "kubejs:demonite_ingot");
        const MAX_ENERGY = traitLevel * 10000;
        const item = entity.getMainHandItem();
        let currentEnergy = getDataValue(item, "demonite_ingot_blocks", 0);

        if (currentEnergy <= 0) return;
        const damagePerEnergy = 0.01 * (1 + 0.2 * traitLevel);
        const maxAbsorbableDamage = currentEnergy * damagePerEnergy;

        const maxReductionPercent = traitLevel * 0.15;
        const maxAllowedDamage = damage * maxReductionPercent;
        const absorbedDamage = Math.min(damage, maxAbsorbableDamage, maxAllowedDamage);

        if (absorbedDamage > 0) {
            const energyRequired = Math.ceil(absorbedDamage / damagePerEnergy);
            let totalEnergyCost = energyRequired;
            currentEnergy = Math.max(0, currentEnergy - energyRequired);

            const damageReductionPercent = absorbedDamage / damage;
            const remainingDamagePercent = 1 - damageReductionPercent;
            new_damage(event, STAGE.MULTIPLY, remainingDamagePercent);

            entity.heal(traitLevel * 2);
            if (traitLevel >= 2) {
                const resistanceDuration = 60 + (traitLevel * 30);
                entity.potionEffects.add("resistance", resistanceDuration, 0);
            }
            if (traitLevel >= 3) {
                const absorptionCostPerPoint = 50;
                const absorptionAmount = traitLevel * 2 + 2;
                const absorptionEnergyCost = absorptionAmount * absorptionCostPerPoint;

                if (currentEnergy >= absorptionEnergyCost) {
                    const absorptionDuration = 100 + (traitLevel * 10);
                    const absorptionAmplifier = Math.min(2, Math.floor(traitLevel - 1));
                    entity.potionEffects.add("kubejs:absorption", absorptionDuration, absorptionAmplifier);

                    const currentAbsorption = entity.getAbsorptionAmount();
                    const newAbsorption = currentAbsorption + absorptionAmount;
                    entity.setAbsorptionAmount(newAbsorption);

                    currentEnergy = Math.max(0, currentEnergy - absorptionEnergyCost);
                    totalEnergyCost += absorptionEnergyCost;
                }
            }
            setDataValue(item, "demonite_ingot_blocks", currentEnergy);
        }
    })
    .register();


//''hazennstuff:dreadsteel_ingot' 恐惧之物
RFTrait('kubejs:dreadsteel_ingot', 0)
    .beforeHurt(event => {
        let entity = event.entity;
        let damageSource = event.source;

        if (!entity.hasEffect("kubejs:fear")) return;

        let fearEffect = entity.getEffect("kubejs:fear");
        let effectLevel = fearEffect.getAmplifier() + 1;

        let additionalDamage = 0.25 * effectLevel;

        if (damageSource.type === "fall") {
            new_damage(event, STAGE.ADDITIVE, 1 + additionalDamage);
        }

        if (!entity.onGround) {
            new_damage(event, STAGE.ADDITIVE, 1 + additionalDamage);
        }
    })
    .beforeHurt(event => {
        const { source, entity } = event;
        const attacker = source.player || source.actual;

        if (!attacker || !attacker.isLiving()) return;
        if (!fu_hasTraitAnywhere(attacker, "kubejs:dreadsteel_ingot")) return;
        let Trait_Level = fu_getHighestTraitLevelAnywhere(attacker, "kubejs:dreadsteel_ingot")
        entity.potionEffects.add("kubejs:fear", 20 * 10, Trait_Level);
    })
    .register();



//'kubejs:uranium_ingot' 辐辉 坏了我忘了是什么锭了
RFTrait('kubejs:plague', 0)
    .beforeHurt(event => {
        const { source, entity } = event;
        const attacker = source.player
        if (!attacker || !attacker.isPlayer() || !entity.isLiving() || !fu_hasTraitAnywhere(attacker, "kubejs:plague")) {
            return;
        }
        const trait_level = fu_getHighestTraitLevelAnywhere(attacker, "kubejs:plague")
        entity.potionEffects.add("kubejs:plague", 30, trait_level - 1);
    })
    .register();


//'kubejs:uranium_ingot' 辐照
RFTrait('kubejs:radiance', 0)
    .beforeHurt(event => {
        const { source, entity } = event;
        const attacker = source.player
        if (!attacker || !attacker.isPlayer() || !entity.isLiving() || !fu_hasTraitAnywhere(attacker, "kubejs:radiance")) {
            return;
        }
        const trait_level = fu_getHighestTraitLevelAnywhere(attacker, "kubejs:radiance")
        entity.potionEffects.add("kubejs:radiance", trait_level * 20, trait_level - 1);
    })
    .register();


//'iceandfire:amphithere_feather'
RFTrait('kubejs:ponder_up', 0)
    .beforeHurt(event => {
        const { source, entity } = event;
        const attacker = source.player
        if (!attacker || !attacker.isPlayer() || !entity.isLiving() || !fu_hasTraitAnywhere(attacker, "kubejs:ponder_up")) {
            return;
        }
        const trait_level = fu_getHighestTraitLevelAnywhere(attacker, "kubejs:ponder_up")
        entity.potionEffects.add("kubejs:ponder_up", 60, trait_level);
    })
    .register();

//'kubejs:boron_ingot' 
RFTrait('kubejs:boron_ingot', 0)
    .beforeHurt(event => {
        const { source, entity } = event;
        const attacker = source.player
        if (!attacker || !attacker.isPlayer() || !entity.isLiving() || !fu_hasTraitAnywhere(attacker, "kubejs:boron_ingot")) {
            return;
        }
        const trait_level = fu_getHighestTraitLevelAnywhere(attacker, "kubejs:boron_ingot")
        entity.potionEffects.add("kubejs:maximum_health_reduction", 200, 0);
    })
    .register();


RFTrait('kubejs:high_health', 0)
    .beforeHurt(event => {
        const { source, entity } = event;
        const attacker = source.player;
        if (!attacker || !entity.isLiving()) return;
        if (!fu_hasTraitAnywhere(attacker, 'kubejs:high_health')) return;

        const entity_maxhealth = entity.getMaxHealth();
        const entity_Health = entity.getHealth();
        const traitLevel = fu_getHighestTraitLevelAnywhere(attacker, "kubejs:high_health");
        const minHealthPercent = 1.0 - (traitLevel * 0.10);
        const minHealthValue = entity_maxhealth * minHealthPercent;

        if (entity_Health < minHealthValue) {
            const damageMultiplier = traitLevel * 0.10;
            new_damage(event, STAGE.MULTIPLY, 1 + damageMultiplier);
        }
    })
    .register();



// 'kubejs:vorant_ingot'
RFTrait('kubejs:vorant_ingot', 0)
    .beforeHurt(event => {
        const { source, entity } = event;
        const attacker = source.player;

        if (!attacker || !attacker.isPlayer()) return;

        const item = attacker.getMainHandItem()
        if (item.getId() == "minecraft:air") return;

        if (!fu_hasTraitMainHand(attacker, "kubejs:vorant_ingot")) return;
        const traitLevel = fu_getTraitLevelMainHand(attacker, "kubejs:vorant_ingot");

        let value_mobkill = getDataValue(item, "vorant_ingot_mobkill") || 0;
        let value_playerkill = getDataValue(item, "vorant_ingot_playerkill") || 0;

        if (value_mobkill > 0) {
            let flatDamage = value_mobkill * 0.1
            flatDamage = Math.min(flatDamage, traitLevel * 100)
            new_damage(event, STAGE.FLAT, flatDamage)
        }
        if (value_playerkill > 0) {
            let percentBonus = value_playerkill * 0.01
            percentBonus = Math.min(percentBonus, fu_hasTraitMainHand * 0.1)
            new_damage(event, STAGE.ADDITIVE, 1 + percentBonus)
        }
    })
    .death(event => {
        let player = event.source.player;
        let entity = event.entity
        if (!player || !entity.isLiving()) return;

        const item = player.getMainHandItem()
        if (item.getId() == "minecraft:air") return;

        if (!fu_hasTraitMainHand(player, "kubejs:vorant_ingot")) return;
        let traitLevel = fu_getTraitLevelMainHand(player, "kubejs:vorant_ingot");

        let MobKill = getDataValue(item, "vorant_ingot_mobkill") || 0
        let PlayerKill = getDataValue(item, "vorant_ingot_playerkill") || 0

        let entity_type = entity.getType()

        if (entity_type == "minecraft:player") {
            PlayerKill++
            player.heal(entity.getMaxHealth() / 10)
            setDataValue(item, "vorant_ingot_playerkill", PlayerKill)

        } else {
            MobKill++
            player.heal(2)
            setDataValue(item, "vorant_ingot_mobkill", MobKill)
        }
    })
    .death(event => {
        let player = event.player;
        if (!player) return;

        const item = player.getMainHandItem();
        if (item.getId() == "minecraft:air") return;

        if (!fu_hasTraitMainHand(player, "kubejs:vorant_ingot")) return;

        let current_mobkill = getDataValue(item, "vorant_ingot_mobkill") || 0
        let current_playerkill = getDataValue(item, "vorant_ingot_playerkill") || 0

        const mobkill_loss = Math.max(1, Math.floor(current_mobkill * 0.25));
        const playerkill_loss = Math.max(1, Math.floor(current_playerkill * 0.25));

        let new_mobkill = Math.max(0, current_mobkill - mobkill_loss);
        let new_playerkill = Math.max(0, current_playerkill - playerkill_loss);

        if (new_mobkill !== current_mobkill) {
            setDataValue(item, "vorant_ingot_mobkill", new_mobkill);

            if (mobkill_loss > 0) {
                player.tell(Text.of("§c你的武器失去了 " + mobkill_loss + " 个生物击杀计数！"));
            }
        }

        if (new_playerkill !== current_playerkill) {
            setDataValue(item, "vorant_ingot_playerkill", new_playerkill);

            if (playerkill_loss > 0) {
                player.tell(Text.of("§c你的武器失去了 " + playerkill_loss + " 个玩家击杀计数！"));
            }
        }
    })
    .register();



//'gobber2:gobber2_ingot'
RFTrait('kubejs:gobber', 0)

    .beforeHurt(event => {
        const { source, entity } = event;
        const attacker = source.player;
        if (!attacker || !entity.isLiving()) return;

        const hasGobber = fu_hasTraitAnywhere(attacker, 'kubejs:gobber');
        const hasGobberNether = fu_hasTraitAnywhere(attacker, 'kubejs:gobber_nether');
        const hasGobberEnd = fu_hasTraitAnywhere(attacker, 'kubejs:gobber_end');

        if (!hasGobber && !hasGobberNether && !hasGobberEnd) return;

        const totalTraits = fu_getUniqueTraitsCount(attacker);
        let damageBonus = 0;

        // 每有1个词条 +2% 伤害
        if (hasGobber) {
            damageBonus += totalTraits * 0.02;
        }

        // 词条总数为奇数时，每有1个词条 +2% 伤害
        if (hasGobberNether && totalTraits % 2 === 1) {
            damageBonus += totalTraits * 0.02;
        }

        // 词条总数为偶数时，每有1个词条 +2% 伤害
        if (hasGobberEnd && totalTraits % 2 === 0) {
            damageBonus += totalTraits * 0.02;
        }

        if (damageBonus > 0) {
            new_damage(event, STAGE.MULTIPLY, 1 + damageBonus);
        }
    })
    .beforeHurt(event => {
        const { entity, source } = event;

        if (!entity.isLiving() || !entity.isPlayer()) return;

        const hasGobber = fu_hasTraitAnywhere(entity, 'kubejs:gobber');
        const hasGobberNether = fu_hasTraitAnywhere(entity, 'kubejs:gobber_nether');
        const hasGobberEnd = fu_hasTraitAnywhere(entity, 'kubejs:gobber_end');

        if (!hasGobber && !hasGobberNether && !hasGobberEnd) return;

        let TraitsCount = fu_getUniqueTraitsCount(entity);
        let damageBonus = 0;
        const count = (hasGobber ? 1 : 0) + (hasGobberNether ? 1 : 0) + (hasGobberEnd ? 1 : 0);

        if (count === 1) {
            if (hasGobber) damageBonus = 0.10;
            else if (hasGobberNether) damageBonus = 0.20;
            else if (hasGobberEnd) damageBonus = 0.30;
        } else if (count === 2) {
            if (hasGobber && hasGobberNether) {
                damageBonus = 0.25;
                if (TraitsCount % 4 === 0) {
                    damageBonus = 0.375;
                }
            } else if (hasGobber && hasGobberEnd) {
                damageBonus = 0.35;
                if (TraitsCount % 3 === 0) {
                    damageBonus = 0.525;
                }
            } else if (hasGobberNether && hasGobberEnd) {
                damageBonus = 0.50;
                if (TraitsCount % 2 === 0) {
                    damageBonus = 0.75;
                }
            }
        } else if (count === 3) {
            damageBonus = 1.00;
        }
        if (damageBonus > 0) {
            new_damage(event, STAGE.MULTIPLY, 1 + damageBonus);
        }
    })
    .register();



// ???
RFTrait('kubejs:echo_ingot', 0)
    .beforeHurt(event => {
        const { source, entity } = event;
        const attacker = source.player
        if (!attacker || !attacker.isLiving()) return;
        if (!fu_hasTraitAnywhere(attacker, "kubejs:echo_ingot")) return;

        trySkill(attacker, "echo_ingot", 15 * 20, () => {
            let Trait_Level = fu_getHighestTraitLevelAnywhere(attacker, "kubejs:echo_ingot")

            $AddEffect(entity, "kubejs:bleed", Trait_Level, true)
            $AddEffect(entity, "kubejs:paralysis", Trait_Level - 1, false, 200)
            $AddEffect(entity, "minecraft:slowness", Trait_Level - 1, true)
        })
    })
    .register();



// 'farmersdelight:wheat_dough'
RFTrait('kubejs:wheat_dough', 0)
    .beforeHurt(event => {
        const { source, entity } = event;
        const attacker = source.player || source.actual;

        if (!attacker || !attacker.isPlayer() || !entity.isLiving() || !fu_hasTraitAnywhere(attacker, "kubejs:farmersdelight")) {
            return;
        }

        const currentHealth = entity.getHealth();
        const damage = event.getDamage();

        if (currentHealth <= damage) {
            event.cancel();
            entity.setHealth(1);
        }
    })
    .register();



// 'farmersdelight:wheat_dough'
RFTrait('kubejs:wheat_dough', 0)
    .beforeHurt(event => {
        const { source, entity } = event;
        const attacker = source.player || source.actual;

        if (!attacker || !attacker.isPlayer() || !entity.isLiving() || !fu_hasTraitAnywhere(attacker, "kubejs:farmersdelight")) {
            return;
        }

        const currentHealth = entity.getHealth();
        const damage = event.getDamage();

        if (currentHealth <= damage) {
            event.cancel();
            entity.setHealth(1);
        }
    })
    .register();


// 'irons_spellbooks:arcane_ingot'
RFTrait('kubejs:arcane_ingot', 0)
    .beforeHurt(event => {
        const { source, entity } = event;
        const attacker = source.player
        if (!attacker || !attacker.isLiving()) return;
        if (!fu_hasTraitAnywhere(attacker, "kubejs:arcane_ingot")) return;

        const traitLevel = fu_getHighestTraitLevelAnywhere(attacker, "kubejs:arcane_ingot");
        const magicData = attacker.getMagicData();
        const currentMana = magicData.getMana();

        const maxBonus = traitLevel * 0.2;

        let damageMultiplier = 1.0;

        if (currentMana < 50) {
            damageMultiplier = 0.8;
        } else {
            const manaAbove50 = currentMana - 50;
            const bonusFromMana = Math.floor(manaAbove50 / 10) * 0.01;

            const finalBonus = Math.min(bonusFromMana, maxBonus);
            damageMultiplier = 1.0 + finalBonus;
        }

        new_damage(event, STAGE.ADDITIVE, damageMultiplier);
    })
    .register();


// 'kubejs:polonium_ingot'
RFTrait('kubejs:polonium_ingot', 0)
    .beforeHurt(event => {
        const { source, entity } = event;
        const attacker = source.player;

        if (!attacker || !attacker.isPlayer() || !entity.isLiving() || !fu_hasTraitAnywhere(attacker, "kubejs:polonium_ingot")) {
            return;
        }
        const traitLevel = fu_getHighestTraitLevelAnywhere(attacker, "kubejs:polonium_ingot");

        const requiredEffects = [
            "minecraft:poison",
            "kubejs:alcohol_poisoning",
            "kubejs:plague",
            "kubejs:radiance"
        ];

        if (requiredEffects.some(effectId => entity.hasEffect(effectId))) {
            entity.potionEffects.add("kubejs:elemental_mix", traitLevel * 20, traitLevel - 1);
        }
    })
    .register();


// 'kubejs:void_ingot'
RFTrait('kubejs:void_ingot', 0)
    .beforeHurt(event => {
        const { source, entity } = event;
        const attacker = source.player || source.actual;

        if (!attacker || !attacker.isLiving() || !fu_hasTraitAnywhere(attacker, "kubejs:void_ingot")) {
            return;
        }
        let Trait_Level = fu_getHighestTraitLevelAnywhere(attacker, "kubejs:void_ingot")
        let level = attacker.level
        let pos = attacker.blockPosition()
        let entity_level = entity.level
        let entity_pos = entity.blockPosition()

        //获取最大亮度
        let lightLevel = level.getMaxLocalRawBrightness(pos)
        let entity_lightLevel = entity_level.getMaxLocalRawBrightness(entity_pos)

        if (lightLevel < entity_lightLevel) {

            let lightDifference = entity_lightLevel - lightLevel

            let extraDamage = Trait_Level * lightDifference * 0.1
            extraDamage = Math.min(extraDamage, 1.5)

            let damageMultiplier = 1.0 + extraDamage
            new_damage(event, STAGE.ADDITIVE, damageMultiplier)
        }

    })
    .register();


// 'kubejs:nlatstone_ingot'
RFTrait('kubejs:nlatstone_ingot', 0)
    .beforeHurt(event => {
        const { source, entity } = event;
        const attacker = source.player || source.actual;

        if (!attacker || !attacker.isLiving() || !fu_hasTraitAnywhere(attacker, "kubejs:nlatstone_ingot")) return;

        let Trait_Level = fu_getHighestTraitLevelAnywhere(attacker, "kubejs:nlatstone_ingot")
        let level = attacker.level
        let pos = attacker.blockPosition()
        let entity_level = entity.level
        let entity_pos = entity.blockPosition()

        //获取最大亮度
        let lightLevel = level.getMaxLocalRawBrightness(pos)
        let entity_lightLevel = entity_level.getMaxLocalRawBrightness(entity_pos)

        if (lightLevel > entity_lightLevel) {

            let lightDifference = lightLevel - entity_lightLevel
            let extraDamage = Trait_Level * lightDifference * 0.1
            extraDamage = Math.min(extraDamage, 1.5)

            let damageMultiplier = 1.0 + extraDamage
            new_damage(event, STAGE.ADDITIVE, damageMultiplier)
        }
    })
    .register();



// ??
RFTrait('kubejs:comet_trait', 0)
    .beforeHurt(event => {
        const { source, entity } = event;
        const attacker = source.player || source.actual;
        if (event.source.getType() !== 'arrow') return;

        if (!attacker || !attacker.isLiving() || !fu_hasTraitAnywhere(attacker, "kubejs:comet_trait")) {
            return;
        }
        spawnComet(attacker, entity)
    })
    .register();


// ??
RFTrait('kubejs:starfire', 0)
    .beforeHurt(event => {
        const { source, entity } = event;
        const attacker = source.player || source.actual;
        if (!attacker || !attacker.isPlayer() || !entity.isLiving() || !fu_hasTraitAnywhere(attacker, "kubejs:starfire")) {
            return;
        }
        entity.potionEffects.add("eternal_starlight:starfire", 40, 0);
    })
    .register();


// 瘴紫石
RFTrait('kubejs:malarite', 0)
    .beforeHurt(event => {
        const { source, entity } = event;
        const attacker = source.player || source.actual;
        if (!attacker || !attacker.isPlayer() || !entity.isLiving() || !fu_hasTraitAnywhere(attacker, "kubejs:malarite")) {
            return;
        }
        entity.potionEffects.add("minecraft:poison", 40, 0);
        let traitLevel = fu_getHighestTraitLevelAnywhere(attacker, "kubejs:malarite")
        if (entity.hasEffect("minecraft:poison")) {
            attacker.potionEffects.add("irons_spellbooks:spider_aspect", traitLevel * 2 * 20, traitLevel);
        }
    })
    .register();


// 月藤
RFTrait('kubejs:tenacious_vine', 0)
    .beforeHurt(event => {
        let player = event.player
        if (!player) return;
        if (player.hasEffect("kubejs:tenacious_vine") && player.isPlayer()) {
            trySkill(player, "tenacious_vine", 20, () => {
                let level = player.level
                let target = findTarget(player)
                if (target && !level.isClientSide()) {
                    if (level instanceof $ServerLevel) {
                        $ScreenShakeVfx.createInstance(
                            level.dimension,
                            player.position(),
                            30, 30, 0.15, 0.24, 4, 5
                        ).send(level)
                    }

                    let yRotRad = player.yRot * Math.PI / 180
                    let x = -Math.sin(yRotRad)
                    let z = Math.cos(yRotRad)

                    for (let i = 0; i < 6; i++) {
                        createThorn(
                            level,
                            player,
                            player.x + x * i * 1.5,
                            player.y,
                            player.z + z * i * 1.5,
                            $Mth.wrapDegrees(-player.yRot),
                            40,
                            i * 2,
                            1
                        )
                    }
                }
            })
        }
    })
    .register();


// 月藤
RFTrait('kubejs:combustion_boost', 0)
    .beforeHurt(event => {
        const { source, entity } = event;
        const attacker = source.player || source.actual;

        if (!attacker || !attacker.isLiving() || !fu_hasTraitAnywhere(attacker, "kubejs:combustion_boost")) {
            return;
        }

        if (entity.isOnFire()) {
            let traitLevel = fu_getHighestTraitLevelAnywhere(attacker, "kubejs:combustion_boost")
            let Amplifier = traitLevel * 20
            let RemainingFireTicks = entity.getRemainingFireTicks()
            if (RemainingFireTicks > 800) return;

            entity.setRemainingFireTicks(RemainingFireTicks + Amplifier)
        }

        if (entity.hasEffect("kubejs:fire")) {
            let fireEffect = entity.getEffect("kubejs:fire")
            let fireAmplifier = fireEffect.getAmplifier() + 1
            let Duration = fireEffect.getDuration()
            let strength = getBaseStrength(entity, "kubejs:fire")

            entity.removeEffect("kubejs:fire")
            entity.potionEffects.add("kubejs:fire", Duration, 0)
            setBaseStrengthAndSync(entity, "kubejs:fire", strength)
        }
        if (entity.hasEffect("kubejs:soul_fire")) {
            let Effect = entity.getEffect("kubejs:soul_fire")
            let Amplifier = Effect.getAmplifier() + 1
            let Duration = Effect.getDuration()
            let strength = getBaseStrength(entity, "kubejs:soul_fire")

            entity.removeEffect("kubejs:soul_fire")
            entity.potionEffects.add("kubejs:soul_fire", Duration, 0)
            setBaseStrengthAndSync(entity, "kubejs:soul_fire", strength)
        }
    })
    .register();

// 月藤
RFTrait('kubejs:aethersent_ingot', 0)
    .beforeHurt(event => {
        const { source, entity } = event;
        const attacker = source.actual;
        if (!attacker || !entity.isLiving() || !entity.isPlayer() || !fu_hasTraitAnywhere(entity, "kubejs:aethersent_ingot")) return;
        let level = entity.level
        let target = findTarget(entity);
        if (!target) {
            return;
        }
        const traitLevel = fu_getHighestTraitLevelAnywhere(entity, "kubejs:aethersent_ingot");
        $MeteorClass.createMeteorShower(
            level,
            entity,
            target,
            target.x,
            target.y,
            target.z,
            20 + traitLevel * 5,
            600
        );
        let meteors = level.getEntitiesOfClass($MeteorClass, target.getBoundingBox().inflate(80))
        meteors.forEach(meteor => {
            if (meteor.getOwner() == entity) {
                meteor.setSize(traitLevel)
            }
        })
    })
    .register();

// 月藤
RFTrait('kubejs:witherbone', 0)
    .beforeHurt(event => {
        const { source, entity } = event;
        const attacker = source.player;

        if (!attacker || !attacker.isLiving() || !fu_hasTraitAnywhere(attacker, "kubejs:witherbone")) {
            return;
        }

        if (entity.hasEffect("minecraft:wither")) {
            const effect = entity.getEffect("minecraft:wither");
            const level = effect.getAmplifier() + 1;

            let regenLevel = Math.floor(level / 2);
            let damageAmpLevel = Math.floor(level / 3);

            regenLevel = Math.min(regenLevel, 2);
            damageAmpLevel = Math.min(damageAmpLevel, 5);
            attacker.potionEffects.add("minecraft:regeneration", 200, regenLevel - 1);
            attacker.potionEffects.add("kubejs:damage_amplification", 200, damageAmpLevel - 1);
        }
    })
    .register();


// 虎标弹
RFTrait('kubejs:witherbone', 0)
    .onTick(400, event => {
        let player = event.player
        if (!player) return;
        const pData = player.persistentData;
        const witherHowitzerValue = pData.getInt("wither_howitzer") || 0;
        if (witherHowitzerValue < 8) {
            if (!fu_hasTraitAnywhere(player, "kubejs:wither_howitzer")) return
            pData.putInt("wither_howitzer", witherHowitzerValue + 1);

            if (typeof EmbersText !== 'undefined' && EmbersText.markup) {
                let chargeText = Text.translate('message.wither_howitzer.charge').getString();
                let fullMessage =
                    `<color color=gold>${chargeText}</color>` +
                    ` ` +
                    `<color color=yellow>${witherHowitzerValue + 1}/8</color>`;
                fullMessage = `<pulse frequency=1.5>${fullMessage}</pulse>`;

                let message = EmbersText.markup(20, fullMessage)
                    .anchor('BOTTOM_LEFT')
                    .scale(1.2)
                    .fadeInTicks(3)
                    .fadeOutTicks(5)
                    .shadow(true);

                EmbersText.send(player, message);
            } else {
                player.setStatusMessage(
                    Text.join(
                        Text.translate('message.wither_howitzer.charge').color('gold'),
                        " ",
                        Text.of(`${witherHowitzerValue + 1}/8`).color('yellow')
                    )
                );
            }
        }
    })
    .beforeHurt(event => {
        const { source, entity } = event;
        const attacker = source.player
        if (!attacker || !attacker.isLiving()) return;
        if (!fu_hasTraitAnywhere(attacker, "kubejs:wither_howitzer")) return;
        const pData = attacker.persistentData;
        const witherHowitzerValue = pData.getInt("wither_howitzer") || 0;
        if (witherHowitzerValue <= 0) return;

        new_damage(event, STAGE.MULTIPLY, 1.2);

        const dx = attacker.x - entity.x;
        const dz = attacker.z - entity.z;
        const distance = Math.sqrt(dx * dx + dz * dz);
        if (distance > 0) {
            const power = 3;
            entity.knockback(
                power,
                dx / distance,
                dz / distance
            );
        }
        pData.putInt("wither_howitzer", witherHowitzerValue - 1);
    })
    .register();


// 泪石 绝望骑士
RFTrait('kubejs:lacrima', 0)
    .onTick(43, event => {
        let player = event.player
        if (!player || !player.isPlayer() || !fu_hasTraitAnywhere(player, "kubejs:lacrima")) {
            return;
        }
        if (is_Magical_Girl(event, player)) return;
        let pData = player.persistentData
        let P_sanity = pData.getInt(sanity)
        if (P_sanity > 0) {
            player.potionEffects.add("kubejs:protection", 3 * 20, 1);
            player.potionEffects.add("kubejs:protect", 3 * 20, 0);
        }
        if (P_sanity < 0) {
            player.potionEffects.add("kubejs:despair", 3 * 20, 0);
            player.potionEffects.add("kubejs:hurt", 3 * 20, 0);
        }
    })
    .register();


// 句末无声 
RFTrait('kubejs:fiery_tears', 0)
    .onTick(43, event => {
        let player = event.player
        const tick = player.tickCount;
        if (!player || !player.isPlayer() || !fu_hasTraitAnywhere(player, "kubejs:fiery_tears")) {
            return;
        }
        if (is_Magical_Girl(event, player)) return;
        let pData = player.persistentData
        let P_sanity = pData.getInt(sanity)
        if (P_sanity > 0) {
            player.potionEffects.add("kubejs:protection", 3 * 20, 0);
            player.potionEffects.add("kubejs:fiery_tears_1", 3 * 20, 0);
            player.potionEffects.add("kubejs:protect", 3 * 20, 0);
        }
        if (P_sanity < 0) {
            player.potionEffects.add("kubejs:despair", 3 * 20, 0);
            player.potionEffects.add("kubejs:hurt", 3 * 20, 0);
        }
        if (tick % 160 === 0) {
            player.potionEffects.add("kubejs:fiery_tears_2", 120, 0);
        }
    })
    .beforeHurt(event => {
        const { source, entity } = event;
        const attacker = source.player || source.actual;

        if (!attacker || !attacker.isPlayer() || !entity.isLiving() || !attacker.hasEffect("kubejs:fiery_tears_2")) {
            return;
        }
        const traitLevel = fu_getHighestTraitLevelAnywhere(attacker, "kubejs:fiery_tears");
        entity.potionEffects.add("kubejs:fire", 30 * 20, 0);
        setBaseStrengthAndSync(entity, "kubejs:fire", traitLevel * 10);
    })
    .register();



// 秘银锭
RFTrait('kubejs:mithril_ingot', 0)
    .afterHurt(event => {
        let player = event.player;
        if (!player || !player.isLiving() || !fu_hasTraitAnywhere(player, "kubejs:mithril_ingot")) return;

        let damage = event.damage;
        let healAmount = damage / 2;
        let manaCost = healAmount * 10;
        let magicData = getPlayerMagicData(player);
        let currentMana = magicData.getMana();

        if (currentMana >= manaCost) {
            player.heal(healAmount);
            magicData.setMana(currentMana - manaCost);
        } else {
        }
    })
    .register();


// 腾炎锭
RFTrait('kubejs:ignitium_ingot', 0)
    .beforeHurt(event => {
        const { source, entity } = event;
        const attacker = source.player || source.actual;

        if (!attacker || !attacker.isLiving() || !fu_hasTraitAnywhere(attacker, "kubejs:ignitium_ingot")) {
            return;
        }
        let traitLevel = fu_getHighestTraitLevelAnywhere(attacker, "kubejs:ignitium_ingot");
        entity.potionEffects.add("cataclysm:blazing_brand", traitLevel * 20, traitLevel - 1);

    })
    .register();



// 远古金属锭
RFTrait('kubejs:ancient_metal_ingot', 0)
    .beforeHurt(event => {
        const { source, entity } = event;
        const attacker = source.player || source.actual;
        if (!attacker || !attacker.isLiving() || !fu_hasTraitAnywhere(attacker, "kubejs:ancient_metal_ingot")) {
            return;
        }
        const pData = attacker.persistentData;
        const sanity = pData.getInt("sanity") || 0;
        const probability = Math.abs(sanity);
        const randomChance = Math.random() * 100;
        if (randomChance > probability) return;

        let traitLevel = fu_getHighestTraitLevelAnywhere(attacker, "kubejs:ancient_metal_ingot");
        entity.potionEffects.add("kubejs:taunt_2", traitLevel * 40, traitLevel); ionEffects.add("cataclysm:blazing_brand", traitLevel * 20, traitLevel - 1);
    })
    .register();


// 绳里灵活的猴
RFTrait('kubejs:monkey', 0)
    .beforeHurt(event => {
        const { source, entity } = event;
        const attacker = source.player || source.actual;
        if (!attacker || !attacker.isLiving() || !fu_hasTraitAnywhere(attacker, "kubejs:monkey")) {
            return;
        }
        if (!attacker.onClimbable()) return
        const newdamage = event.damage / 2
        entity.invulnerableTime = 0
        attackEntity(entity, 'arrow', newdamage, true)
    })
    .register();


//回响碎片
RFTrait('kubejs:echo_shard', 0)
    .beforeHurt(event => {
        const { source, entity } = event;
        const attacker = source.player || source.actual;

        if (!attacker || !attacker.isLiving() || !fu_hasTraitAnywhere(attacker, "kubejs:echo_shard")) {
            return;
        }
        const traitLevel = fu_getHighestTraitLevelAnywhere(attacker, "kubejs:echo_shard");
        const other_damage = traitLevel * traitLevel
        new_damage(event, STAGE.FLAT, other_damage);
    })
    .register();


//陷入思考
RFTrait('kubejs:set_ponder', 0)
    .beforeHurt(event => {
        const { source, entity } = event;
        const attacker = source.player || source.actual;
        if (!attacker || !attacker.isLiving() || !fu_hasTraitAnywhere(attacker, "kubejs:set_ponder")) {
            return;
        }
        let traitLevel = fu_getHighestTraitLevelAnywhere(attacker, "kubejs:set_ponder");
        entity.potionEffects.add("kubejs:ponder", 500, traitLevel * 2);
    })
    .register();


//反向击退
RFTrait('kubejs:knockback', 0)
    .beforeHurt(event => {
        const { source, entity } = event;
        const attacker = source.player || source.actual;

        if (!attacker || !attacker.isLiving() || !fu_hasTraitAnywhere(attacker, "kubejs:knockback")) {
            return;
        }
        const traitLevel = fu_getHighestTraitLevelAnywhere(attacker, "kubejs:knockback");
        const dx = attacker.x - entity.x;
        const dz = attacker.z - entity.z;
        const distance = Math.sqrt(dx * dx + dz * dz);
        const power = 1.0 + (traitLevel * 0.5);
        const knockbackX = -(dx / distance) * power;
        const knockbackZ = -(dz / distance) * power;
        entity.knockback(power, knockbackX, knockbackZ);
    })
    .register();


//???
RFTrait('kubejs:bismuthgems', 0)
    .beforeHurt(event => {
        const { source, entity } = event;
        const attacker = source.player || source.actual;
        if (!attacker || !attacker.isPlayer() || !entity.isLiving() || !fu_hasTraitAnywhere(attacker, "kubejs:bismuthgems")) {
            return;
        }
        let traitLevel = fu_getHighestTraitLevelAnywhere(attacker, "kubejs:bismuthgems");
        let NewLevel = traitLevel * 4
        let currentArmor = entity.getArmorValue()
        if (currentArmor < NewLevel) {
            new_damage(event, STAGE.FLAT, 10)
        }
    })
    .register();


/**
 * [超负荷推进]
 *携带的Buff和Debuff种类总数超过8个时，攻击任意实体触发该词条
 *免疫正常击退
 *提高100x词条等级%移动速度
 *触发该词条时扣减50%当前生命值
 */
RFTrait('kubejs:overload', 0)
    .beforeHurt(event => {
        const { source, entity } = event;
        const attacker = source.player || source.actual;

        if (!attacker || !attacker.isLiving() || !fu_hasTraitAnywhere(attacker, "kubejs:overload")) {
            return;
        }
        const traitLevel = fu_getHighestTraitLevelAnywhere(attacker, "kubejs:overload");
        const activeEffects = attacker.getActiveEffects();
        const effectCount = activeEffects.size();
        if (effectCount > 8) {
            attacker.potionEffects.add("kubejs:overload_buff_1", 20 * 8, 0);
            attacker.potionEffects.add("kubejs:overload_buff_2", 20 * 8, traitLevel - 1);
            attacker.potionEffects.add("kubejs:overload_debuff_1", 20 * 8, 0);
        }
    })
    .register();



RFTrait('kubejs:animated_steel_ingot', 0)
    .beforeHurt(event => {
        const { source, entity } = event;
        const attacker = source.player || source.actual;
        if (!attacker || !attacker.isLiving() || !fu_hasTraitAnywhere(attacker, "kubejs:animated_steel_ingot")) {
            return;
        }
        const traitLevel = fu_getHighestTraitLevelAnywhere(attacker, "kubejs:animated_steel_ingot");
        const repairChance = traitLevel * 10;
        const weapon = attacker.getMainHandItem();
        if (!weapon.isDamageableItem()) return;

        const sharpnessLevel = weapon.getEnchantmentLevel("minecraft:sharpness");
        if (sharpnessLevel > 0) {
            const extraDamage = 0.5 * sharpnessLevel + 0.5;
            attackEntity(entity, 'generic', extraDamage, true)
        }

        if (Math.floor(Math.random() * 100) < repairChance) {
            const repairedAmount = 1 + Math.floor(Math.random() * 3);
            fu_repairDurability(weapon, repairedAmount, attacker, "mainhand");
        }
    })
    .register()


//怪物词缀：蚀智实现
//你是词条吗，我觉得我是
RFTrait('kubejs:sanity', 0)
    .beforeHurt(event => {
        const { source, player } = event;
        const actual = source.actual;

        if (!actual || !actual.isLiving() || !actual.hasEffect("kubejs:sanity")) {
            return;
        }
        if (!player.isPlayer()) return
        let player_sanity = player.persistentData.getInt("sanity") || 0;
        if (player_sanity < 0) {
            player.potionEffects.add("minecraft:slowness", 20 * 5, 1);
            const monsterDamage = event.damage;
            let newmonsterDamage = monsterDamage * 1.25
            new_damage(event, STAGE.ADDITIVE, newmonsterDamage)
        }
    })
    .register();



RFTrait('kubejs:genericluck', 0)
    .beforeHurt(event => {
        const { source, entity } = event;
        const attacker = source.player;
        if (!attacker || !entity.isLiving()) return;
        if (!fu_hasTraitAnywhere(attacker, 'kubejs:luck')) return
        const traitLevel = fu_getHighestTraitLevelAnywhere(attacker, "kubejs:luck");
        const luck = attacker.getAttribute('minecraft:generic.luck')?.value ?? 0;
        const diceRoll = 1 + Math.floor(Math.random() * 10);
        if (diceRoll <= traitLevel) {
            const bonusPercent = (20 * traitLevel + luck);
            const minBonus = 5;
            const effectiveBonus = Math.max(minBonus, bonusPercent);
            const bonusDamage = (effectiveBonus / 100);
            new_damage(event, STAGE.FLAT, bonusDamage);
            spawnParticles_witch(entity, attacker);
        }
    })
    .register();


RFTrait('kubejs:aquamarine', 0)
    .beforeHurt(event => {
        const { source, entity } = event;
        const attacker = source.player || source.actual;
        if (!attacker || !attacker.isLiving() || !fu_hasTraitAnywhere(attacker, "kubejs:aquamarine")) {
            return;
        }
        const weapon = attacker.getMainHandItem();
        if (!weapon.isDamageableItem()) return;

        const durabilityCost = 1 + Math.floor(Math.random() * 10);
        fu_repairDurability(weapon, -durabilityCost, attacker, "mainhand");
        new_damage(event, STAGE.ADDITIVE, 1 + (0.1 * durabilityCost));
    })
    .register();


RFTrait('kubejs:tanzanite', 0)
    .beforeHurt(event => {
        const { source, entity } = event;
        const attacker = source.player || source.actual;
        if (!attacker || !attacker.isLiving() || !fu_hasTraitAnywhere(attacker, "kubejs:tanzanite")) {
            return;
        }
        let traitLevel = fu_getHighestTraitLevelAnywhere(attacker, "kubejs:tanzanite");
        const debuffs = [
            "minecraft:slowness",
            "minecraft:weakness",
            "minecraft:mining_fatigue",
            "minecraft:nausea",
            "minecraft:blindness",
            "minecraft:wither",
            "minecraft:poison",
            "minecraft:darkness",
            "kubejs:bleed"
        ];
        const randomDebuff = debuffs[Math.floor(Math.random() * debuffs.length)];
        if (entity && entity.isLiving()) {
            entity.potionEffects.add(randomDebuff, traitLevel * 5 * 20, traitLevel - 1);
        }
    })
    .register();

/**
 * 饥渴之牙
 * 消耗饥饿增伤 + 攻击概率啃自己/敌人，饱食度越低啃敌人的概率越高
 */
RFTrait('kubejs:tooth_of_hunger', 0)
    .beforeHurt(event => {
        const { source, entity, level } = event;
        const attacker = source.player || source.actual;
        if (!attacker || !attacker.isPlayer() || !entity.living) {
            return;
        }
        if (!fu_hasTraitMainHand(attacker, "kubejs:tooth_of_hunger")) return;
        const amplifier = fu_getTraitLevelMainHand(attacker, "kubejs:tooth_of_hunger");
        const foodLevel = attacker.getFoodLevel();
        const saturation = attacker.getSaturation();
        const maxFoodLevel = 20;
        const hungerRatio = foodLevel / maxFoodLevel;
        const biteDamage = amplifier * 5;
        const hungerCost = amplifier + 1;
        const newFoodLevel = Math.max(foodLevel - hungerCost, 0);
        const newSaturation = Math.max(saturation - hungerCost, 0);
        attacker.setFoodLevel(newFoodLevel);
        attacker.setSaturation(newSaturation);
        new_damage(event, STAGE.ADDITIVE, 1.3);
        // 饱食度越低，啃敌人的概率越高，啃自己的概率越低
        const biteEnemyChance = 1 - hungerRatio;
        const biteSelfChance = hungerRatio * 0.3;
        const random = Math.random();
        const healHunger = amplifier + 1;
        if (random < biteEnemyChance) {
            const currentFood = attacker.getFoodLevel();
            attacker.setFoodLevel(Math.min(currentFood + healHunger, maxFoodLevel));

        } else if (random < biteEnemyChance + biteSelfChance) {
            attackEntity(attacker, 'generic', Math.max(biteDamage / 2, 1), true)
            const currentFood = attacker.getFoodLevel();
            attacker.setFoodLevel(Math.min(currentFood + healHunger, maxFoodLevel));
        }
        if (foodLevel <= 3 && Math.random() < 0.4) {
            attackEntity(attacker, 'generic', 2, true)
            const currentFood = attacker.getFoodLevel();
            attacker.setFoodLevel(Math.min(currentFood + healHunger, maxFoodLevel));
        }
    })
    .register();


//热泉石锭
RFTrait('kubejs:thermal_springstone_ingot', 0)
    .beforeHurt(event => {
        const { source, entity } = event;
        const attacker = source.player || source.actual;
        if (!attacker || !attacker.isPlayer() || !entity.isLiving() || !fu_hasTraitAnywhere(attacker, "kubejs:thermal_springstone_ingot")) {
            return;
        }
        let attackEffect = entity.getEffect("kubejs:thermal_springstone_ingot");
        let attackLevel = attackEffect ? attackEffect.getAmplifier() : 0;
        let attackDamageMultiplier = (attackLevel * 0.15) + 1;
        entity.setRemainingFireTicks(20 * 3);
        if ((entity.isOnFire() || entity.isInLava())) {
            new_damage(event, STAGE.ADDITIVE, attackDamageMultiplier);
        }
        if ((attacker.isOnFire() || attacker.isInLava())) {
            let fireDamage = originalDamage / 3;
            attackEntity(entity, 'fireball', fireDamage, true)
        }
    })
    .register();


//月亮石
RFTrait('kubejs:moonstone', 0)
    .beforeHurt(event => {
        const { source, entity } = event;
        const attacker = source.player || source.actual;
        if (!attacker || !attacker.isPlayer() || !entity.isLiving() || !fu_hasTraitAnywhere(attacker, "kubejs:moonstone")) {
            return;
        }
        let traitLevel = fu_getHighestTraitLevelAnywhere(attacker, "kubejs:moonstone");
        let time = event.level.getDayTime() % 24000;
        let extraMagicDamage = traitLevel * 2 + 2;
        if (time <= 12000) {
            new_damage(event, STAGE.ADDITIVE, 1 - (traitLevel * 0.1));
        }
        else {
            attackEntity(entity, 'magic', extraMagicDamage, true)
        }
    })
    .register();



//龙炎钢锭
RFTrait('kubejs:dragonsteel_fire_ingot', 0)
    .beforeHurt(event => {
        const { source, entity } = event;
        const attacker = source.player || source.actual;
        if (!attacker || !attacker.isPlayer() || !entity.isLiving() || !fu_hasTraitAnywhere(attacker, "kubejs:dragonsteel_fire_ingot")) {
            return;
        }
        const armorBreakEffect = entity.getEffect("kubejs:dragonsteel_armor_break");
        const armorBreakLevel = armorBreakEffect ? armorBreakEffect.getAmplifier() + 1 : 1;
        const bleedEffect = entity.getEffect("kubejs:bleed");
        const bleedLevel = bleedEffect ? bleedEffect.getAmplifier() : 0;
        entity.potionEffects.add("kubejs:dragonsteel_armor_break", 20 * 30, armorBreakLevel);
        entity.potionEffects.add("kubejs:bleed", 20 * 5, 0);
        let currentArmor = entity.getArmorValue()
        if (currentArmor <= 0 && !entity.hasEffect("kubejs:dragonsteel_ignite")) {
            entity.setRemainingFireTicks(20 * 60)
        }
        if (currentArmor <= 0 && (entity.isOnFire() || entity.isInLava())) {
            attackEntity(entity, 'magic', 20, true)
            entity.setRemainingFireTicks(0)
        }
        if (bleedLevel >= 9) {
            entity.removeEffect("kubejs:bleed");
            entity.potionEffects.add("kubejs:bleed", 20 * 8, bleedLevel - 8);
            attacker.potionEffects.add("kubejs:absorption", 20 * 10, 0)
            attacker.setAbsorptionAmount(20);
        }
    })
    .register();


//龙霆钢锭
RFTrait('kubejs:dragonsteel_lightning_ingot', 0)
    .beforeHurt(event => {
        const { source, entity } = event;
        const attacker = source.player || source.actual;
        if (!attacker || !attacker.isPlayer() || !entity.isLiving() || !fu_hasTraitAnywhere(attacker, "kubejs:dragonsteel_lightning_ingot")) {
            return;
        }
        const attackEffect = entity.getEffect("kubejs:dragonsteel_lightning_ingot_attack");
        const attackLevel = attackEffect ? attackEffect.getAmplifier() : 0;
        const newHurtLevel = attackLevel + 1;
        const bleedEffect = entity.getEffect("kubejs:bleed");
        const bleedLevel = bleedEffect ? bleedEffect.getAmplifier() : 0;
        if (newHurtLevel >= 3) {
            entity.removeEffect("kubejs:dragonsteel_lightning_ingot_attack");
            attackEntity(entity, 'magic', 20, true)
        } else {
            entity.potionEffects.add("kubejs:dragonsteel_lightning_ingot_attack", 20 * 5, newHurtLevel);
        }
        entity.potionEffects.add("kubejs:bleed", 20 * 5, 0);
        if (bleedLevel >= 9) {
            entity.removeEffect("kubejs:bleed");
            entity.potionEffects.add("kubejs:bleed", 20 * 8, bleedLevel - 8);
            attacker.potionEffects.add("kubejs:absorption", 20 * 10, 0);
            attacker.setAbsorptionAmount(20);
        }
        if (entity.hasEffect("kubejs:dragonsteel_lightning_ingot_attack")) {
            const fireRadius = 2;
            const nearbyEntities = entity.level.getEntities(
                entity,
                entity.getBoundingBox().inflate(fireRadius)
            );
            for (let fireTarget of nearbyEntities) {
                if (fireTarget.isLiving() && !fireTarget.hasEffect("kubejs:dragonsteel_lightning_ingot_attack")) {
                    fireTarget.potionEffects.add("kubejs:dragonsteel_lightning_ingot_attack", 20 * 5, 1);
                    attackEntity(fireTarget, 'magic', 10, true)

                }
            }
        }
    })
    .register();

//龙霆钢锭
RFTrait('kubejs:dragonsteel_lightning_ingot', 0)
    .beforeHurt(event => {
        const { source, entity } = event;
        const attacker = source.player || source.actual;
        if (!attacker || !attacker.isPlayer() || !entity.isLiving() || !fu_hasTraitAnywhere(attacker, "kubejs:dragonsteel_lightning_ingot")) {
            return;
        }
        const attackEffect = entity.getEffect("kubejs:dragonsteel_lightning_ingot_attack");
        const attackLevel = attackEffect ? attackEffect.getAmplifier() : 0;
        const newHurtLevel = attackLevel + 1;
        const bleedEffect = entity.getEffect("kubejs:bleed");
        const bleedLevel = bleedEffect ? bleedEffect.getAmplifier() : 0;
        if (newHurtLevel >= 3) {
            entity.removeEffect("kubejs:dragonsteel_lightning_ingot_attack");
            attackEntity(entity, 'magic', 20, true)
        } else {
            entity.potionEffects.add("kubejs:dragonsteel_lightning_ingot_attack", 20 * 5, newHurtLevel);
        }
        entity.potionEffects.add("kubejs:bleed", 20 * 5, 0);
        if (bleedLevel >= 9) {
            entity.removeEffect("kubejs:bleed");
            entity.potionEffects.add("kubejs:bleed", 20 * 8, bleedLevel - 8);
            attacker.potionEffects.add("kubejs:absorption", 20 * 10, 0);
            attacker.setAbsorptionAmount(20);
        }
        if (entity.hasEffect("kubejs:dragonsteel_lightning_ingot_attack")) {
            const fireRadius = 2;
            const nearbyEntities = entity.level.getEntities(
                entity,
                entity.getBoundingBox().inflate(fireRadius)
            );
            for (let fireTarget of nearbyEntities) {
                if (fireTarget.isLiving() && !fireTarget.hasEffect("kubejs:dragonsteel_lightning_ingot_attack")) {
                    fireTarget.potionEffects.add("kubejs:dragonsteel_lightning_ingot_attack", 20 * 5, 1);
                    attackEntity(fireTarget, 'magic', 10, true)

                }
            }
        }
    })
    .register();


//龙霜钢锭
RFTrait('kubejs:dragonsteel_ice_ingot', 0)
    .beforeHurt(event => {
        const { source, entity } = event;
        const attacker = source.player || source.actual;
        if (!attacker || !attacker.isPlayer() || !entity.isLiving() || !fu_hasTraitAnywhere(attacker, "kubejs:dragonsteel_ice_ingot")) {
            return;
        }
        const attackEffect = entity.getEffect("kubejs:dragonsteel_ice_ingot_attack");
        const attackLevel = attackEffect ? attackEffect.getAmplifier() : 0;
        const newHurtLevel = attackLevel + 1;
        const bleedEffect = entity.getEffect("kubejs:bleed");
        const bleedLevel = bleedEffect ? bleedEffect.getAmplifier() : 0;
        if (attackLevel >= 9) {
            entity.removeEffect("kubejs:dragonsteel_ice_ingot_attack");
            entity.potionEffects.add("kubejs:dragonsteel_ice_ingot_ice", 20 * 3, 0);
        } else {
            entity.potionEffects.add("kubejs:dragonsteel_ice_ingot_attack", 200, newHurtLevel);
        }
        entity.potionEffects.add("kubejs:bleed", 20 * 5, 0);
        if (entity.hasEffect("kubejs:dragonsteel_ice_ingot_ice")) {
            entity.removeEffect("kubejs:dragonsteel_ice_ingot_ice");
            attackEntity(entity, 'freeze', 20, true)
        }
        if (bleedLevel >= 9) {
            entity.removeEffect("kubejs:bleed");
            entity.potionEffects.add("kubejs:bleed", 20 * 8, bleedLevel - 8);
            attacker.potionEffects.add("kubejs:absorption", 20 * 10, 0)
            attacker.setAbsorptionAmount(20)
        }
    })
    .register();


//亚历山大变石
RFTrait('kubejs:alexandrite', 0)
    .beforeHurt(event => {
        const { source, entity } = event;
        const attacker = source.player || source.actual;
        if (!attacker || !attacker.isLiving() || !fu_hasTraitAnywhere(attacker, "kubejs:alexandrite")) return;
        const mainHandItem = attacker.getMainHandItem();
        if (mainHandItem.isEmpty()) return;
        const components = mainHandItem.components;
        if (!components) {
            return;
        }
        const maxDurability = mainHandItem.getMaxDamage();
        const currentDurability = mainHandItem.getDamageValue();
        const remainingDurability = maxDurability - currentDurability;
        const durabilityPercentage = (remainingDurability / maxDurability) * 100;
        if (durabilityPercentage > 66) {
            new_damage(event, STAGE.ADDITIVE, 1.2);
        } else if (durabilityPercentage < 33) {
            new_damage(event, STAGE.ADDITIVE, 0.8);
        }
    })
    .register();


//脑袋尖尖
RFTrait('kubejs:spinel', 0)
    .beforeHurt(event => {
        const { source, entity } = event;
        const attacker = source.player || source.entity;
        if (!attacker || !attacker.isPlayer() || !entity.isLiving() || !fu_hasTraitAnywhere(attacker, "kubejs:spinel")) {
            return;
        }
        if (Math.random() < 0.2) {
            event.cancel();
        }
    })
    .register();


//猛虎之血
RFTrait('kubejs:amber', 0)
    .beforeHurt(event => {
        const { entity } = event;
        if (!entity.isPlayer() || !fu_hasTraitAnywhere(entity, "kubejs:amber")) {
            return;
        }
        const traitLevel = fu_getHighestTraitLevelAnywhere(entity, "kubejs:amber");
        const triggerChance = traitLevel * 0.1;
        if (Math.random() < triggerChance) {
            entity.potionEffects.add("minecraft:strength", 100, 2);
            entity.potionEffects.add("minecraft:speed", 100, 2);
        }
    })
    .register();



//??
RFTrait('kubejs:pearl', 0)
    .beforeHurt(event => {
        const player = event.entity;
        if (!player.isPlayer() || !fu_hasTraitAnywhere(player, "kubejs:pearl")) return;
        const traitLevel = fu_getHighestTraitLevelAnywhere(player, "kubejs:pearl");
        player.removeEffect("kubejs:pearl");
        player.potionEffects.add("minecraft:unluck", 1200, traitLevel - 1);
    })
    .register();


//你是词条吗，我觉得我是
RFTrait('kubejs:naughty', 0)
    .beforeHurt(event => {
        const { source, entity } = event;
        const player = source.player;
        if (!player || !player.isPlayer() || !entity.isLiving()) {
            return;
        }
        const playerMaxHealth = player.getMaxHealth()
        const mainHandItem = player.getMainHandItem();
        if (mainHandItem.isEmpty()) return;
        const components = mainHandItem.components;
        if (!components) {
            return;
        }
        if (components.has("tiered:tiered_modifier")) {
            let tieredModifier = components.get("tiered:tiered_modifier");
            if (tieredModifier === "tiered:swords/kubejs_sword_0") {
                if (Math.random() < 0.00005) {
                    player.setHealth(playerMaxHealth)
                    const randomTaunt = [
                        'message.taunt.default',
                        'message.taunt.variant1',
                        'message.taunt.variant2',
                        'message.taunt.variant3'
                    ][Math.floor(Math.random() * 4)];
                    player.tell(Text.translate(randomTaunt));
                    event.cancel();
                }
            }
        }
    })
    .register();

//12倍耐久加伤
RFTrait('kubejs:topaz', 0)
    .beforeHurt(event => {
        const { source, entity } = event;
        const attacker = source.player || source.actual;
        if (!attacker?.player || !entity.isLiving() || !fu_hasTraitAnywhere(attacker, "kubejs:topaz")) {
            return;
        }
        const mainHandItem = attacker.getMainHandItem();
        if (mainHandItem.isEmpty()) return;
        const maxDurability = mainHandItem.getMaxDamage();
        const currentDurability = mainHandItem.getDamageValue();
        const remainingDurability = maxDurability - currentDurability;
        if (remainingDurability > 0 && remainingDurability % 12 == 0) {
            const traitLevel = fu_getHighestTraitLevelAnywhere(attacker, "kubejs:topaz");
            const bonusDamage = 10 * traitLevel;
            new_damage(event, STAGE.FLAT, bonusDamage);
        }
    })
    .register();



RFTrait('kubejs:bloodjade_set', 0)
    .beforeHurt(event => {
        const { source, entity } = event;
        const attacker = source.player || source.actual;
        if (!attacker || !attacker.isLiving() || !fu_hasTraitAnywhere(attacker, "kubejs:bloodjade_set")) {
            return;
        }
        if (!entity.hasEffect("kubejs:bloodjade")) {
            entity.potionEffects.add("kubejs:bloodjade", 600, 0);
            return;
        }
        const effect = entity.getEffect("kubejs:bloodjade");
        let hitCount = effect.amplifier + 1;
        if (hitCount < 5) {
            entity.removeEffect("kubejs:bloodjade");
            entity.potionEffects.add("kubejs:bloodjade", 600, hitCount);
            return;
        }
        const healthCost = attacker.health * 0.5;
        const playerMaxHealth = attacker.getMaxHealth()
        attacker.attack(healthCost);
        entity.attack(playerMaxHealth);
        entity.removeEffect("kubejs:bloodjade");
    })
    .register();


RFTrait('kubejs:iridescence', 0)
    .beforeHurt(event => {
        const { source, entity } = event;
        const attacker = source.player || source.actual;
        if (!attacker || !attacker.isPlayer() || !entity.isLiving() || !fu_hasTraitAnywhere(attacker, "kubejs:iridescence")) {
            return;
        }
        const traitLevel = fu_getHighestTraitLevelAnywhere(attacker, "kubejs:iridescence");
        const minDamage = traitLevel;
        const maxDamage = traitLevel + 6;
        const addedDamage = minDamage + Math.floor(Math.random() * (maxDamage - minDamage + 1));
        new_damage(event, STAGE.FLAT, addedDamage);
    })
    .register();


RFTrait('kubejs:multicolor', 0)
    .beforeHurt(event => {
        const { source, entity } = event;
        const attacker = source.player || source.actual;
        if (!attacker || !attacker.isPlayer() || !entity.isLiving() || !fu_hasTraitAnywhere(attacker, "kubejs:multicolor")) {
            return;
        }
        const debuffs = [
            'minecraft:weakness',
            'minecraft:slowness',
            'minecraft:wither',
            'kubejs:bleed'
        ];
        const randomDebuff = debuffs[Math.floor(Math.random() * debuffs.length)];
        const traitLevel = fu_getHighestTraitLevelAnywhere(attacker, "kubejs:multicolor");
        const durationTicks = (traitLevel + 4) * 20;
        entity.potionEffects.add(randomDebuff, durationTicks, traitLevel - 1);
    })
    .register();


RFTrait('kubejs:six_life_death', 0)
    .beforeHurt(event => {
        const { source, entity } = event;
        const attacker = source.player || source.actual;
        if (!attacker || !attacker.isPlayer() || !entity.isLiving() || !fu_hasTraitAnywhere(attacker, "kubejs:six_life_death_set")) {
            return;
        }
        let existingEffect = entity.getEffect("kubejs:six_life_death");
        if (!existingEffect) {
            entity.potionEffects.add("kubejs:six_life_death", 2000, 0);
            return;
        }
        let currentHurtLevel = existingEffect.getAmplifier();
        let newHurtLevel = currentHurtLevel + 1;
        entity.potionEffects.add("kubejs:six_life_death", 2000, newHurtLevel);
        if (newHurtLevel >= 36) {
            let attackerCurrentHealth = attacker.getHealth();
            let healthCost = attackerCurrentHealth * 0.05;
            attacker.setHealth(attackerCurrentHealth - healthCost);
            let additionalDamage = healthCost * 5;
            attackEntity(entity, 'out_of_world', additionalDamage, true)
        }
    })
    .register();


RFTrait('kubejs:corroded', 0)
    .beforeHurt(event => {
        const { source, entity } = event;
        const attacker = source.player || source.actual;
        if (!attacker || !attacker.isLiving()) return;
        let mainHandItem = attacker.getMainHandItem();
        if (!mainHandItem || mainHandItem.isEmpty()) return;
        if (!fu_hasTraitMainHand(attacker, "kubejs:corroded")) return;
        const maxDurability = mainHandItem.getMaxDamage();
        const currentDurability = mainHandItem.getDamageValue();
        const remainingDurability = maxDurability - currentDurability;
        const durabilityPercentage = (remainingDurability / maxDurability) * 100;
        let damageMultiplier = 1;
        if (durabilityPercentage < 20) {
            damageMultiplier = 1.25;
        } else if (durabilityPercentage < 50) {
            damageMultiplier = 1.1;
        }
        new_damage(event, STAGE.ADDITIVE, damageMultiplier);
    })
    .register();


RFTrait('kubejs:wolf', 0)
    .beforeHurt(event => {
        const player = event.entity;
        if (!fu_hasTraitAnywhere(player, "kubejs:wolf")) return;
        let uuid = player.getUuid()
        if (uuid && typeof uuid.toString === "function") {
            uuid = uuid.toString();
        }
        const target = event.player;
        let wolf = target.block.createEntity('minecraft:wolf')
        wolf.mergeNbt({ Owner: uuid });
        wolf.spawn()
        player.server.scheduleInTicks(200, () => {
            if (wolf && wolf.isAlive()) {
                wolf.discard();
            }
        });
        return;
    })
    .register();


RFTrait('kubejs:atalphaite', 0)
    .beforeHurt(event => {
        const { source, entity } = event;
        const attacker = source.player || source.actual;
        if (!entity.isLiving() || !attacker || !attacker.isPlayer() || !fu_hasTraitAnywhere(attacker, "kubejs:atalphaite")) {
            return;
        }
        new_damage(event, STAGE.ADDITIVE, 1.25);
        const boom_radius = 1.5;
        const boomdamage = event.damage;
        const boom_attack = boomdamage / 2;
        if (boom_attack < 2) {
            return;
        }
        const nearbyEntities = entity.level.getEntities(
            null,
            entity.getBoundingBox().inflate(boom_radius)
        );
        for (let nearbyEntity of nearbyEntities) {
            if (nearbyEntity.isLiving() &&
                nearbyEntity !== entity &&
                !nearbyEntity.isPlayer()) {
                attackEntity(nearbyEntity, 'explosion', boom_attack, true)
            }
        }
    })
    .register();



//你觉得你是词条吗，我觉得我是
RFTrait('kubejs:seraph', 0)
    .beforeHurt(event => {
        let entity = event.getEntity();
        let value = 0.2;
        if (entity.hasEffect("kubejs:seraph")) {
            if (!(entity.isOnFire() || entity.isInLava())) {
                new_damage(event, STAGE.MULTIPLY, value);
            }
        } return
    })
    .register();


RFTrait('kubejs:numbness_effects', 0)
    .beforeHurt(event => {
        const { source, entity } = event;
        const attacker = source.player || source.actual;
        if (!entity.living || !attacker || !attacker.isPlayer() || !fu_hasTraitAnywhere(attacker, "kubejs:set_numbness")) {
            return;
        }
        entity.potionEffects.add("kubejs:numbness", 20 * 5, 0);
        if (entity.hasEffect("kubejs:numbness")) {
            new_damage(event, STAGE.ADDITIVE, 1.1);
        }
    })
    .beforeHurt(event => {
        const { source, entity } = event;
        const attacker = source.player || source.actual;
        if (!attacker || !attacker.isPlayer() || !entity.living || !fu_hasTraitAnywhere(attacker, "kubejs:set_numbness")) {
            return;
        }
        entity.potionEffects.add("kubejs:numbness", 30, 0);
        attacker.potionEffects.add("minecraft:speed", 60, 0);
    })
    .register();

//怒火攻心
RFTrait('kubejs:life_drain', 0)
    .beforeHurt(event => {
        const { source, entity } = event;
        const attacker = source.player || source.actual;
        if (!attacker || !attacker.isPlayer() || !entity.living || !attacker.hasEffect("kubejs:life_drain")) {
            return;
        }
        let existingEffect = attacker.getEffect("kubejs:life_drain");
        let currentAttackCount = existingEffect ? existingEffect.getAmplifier() : 0;
        let newAttackCount = currentAttackCount + 1;
        if (newAttackCount >= 5) {
            attacker.removeEffect("kubejs:life_drain");
            new_damage(event, STAGE.ADDITIVE, 3);
        } else {
            attacker.potionEffects.add("kubejs:life_drain", 100, newAttackCount);
        }
    })
    .register();

//剥离-满血增伤
RFTrait('kubejs:maxhealth', 0)
    .beforeHurt(event => {
        const { source, entity } = event;
        const attacker = source.player || source.actual;
        if (!attacker || !attacker.isPlayer() || !entity.living || !fu_hasTraitAnywhere(attacker, "kubejs:strip")) {
            return;
        }
        const entity_maxhealth = entity.getMaxHealth()
        if (entity.health === entity_maxhealth) {
            const traitLevel = fu_getHighestTraitLevelAnywhere(attacker, "kubejs:strip");
            const extraDamage = traitLevel + 5;
            attackEntity(entity, 'generic', extraDamage, true)
        }
    })
    .register();


// 消耗经验免疫伤害
RFTrait('kubejs:exalted_beauty_gem', 0)
    .beforeHurt(event => {
        const player = event.entity;
        if (!player || !player.isPlayer()) return
        if (fu_hasTraitAnywhere(player, 'kubejs:exalted_beauty_gem')) {
            const traitLevel = fu_getHighestTraitLevelAnywhere(player, 'kubejs:exalted_beauty_gem');
            const chance = (traitLevel * 2) / 100;
            if (player.xpLevel >= 10) {
                if (Math.random() < chance) {
                    player.xpLevel -= 10
                    event.cancel();
                }
            }
        }
    })
    .register();


/**
 * 每30级经验值+1伤害，等级上限900级
 */
RFTrait('kubejs:citrine', 0)
    .beforeHurt(event => {
        const { source, entity } = event;
        const attacker = source.player || source.actual;
        if (!attacker || !attacker.isPlayer() || !entity.isLiving() || !fu_hasTraitAnywhere(attacker, "kubejs:citrine")) {
            return;
        }
        const playerXpLevel = Math.min(attacker.xpLevel, 900);
        const attackBonus = Math.floor(playerXpLevel / 30);
        if (attackBonus > 0) {
            new_damage(event, STAGE.FLAT, attackBonus);
        }
    })
    .register();


/**
 * 晶华
 * 每5级经验值+1%伤害，等级上限900级
 */
RFTrait('kubejs:intrinsic', 0)
    .beforeHurt(event => {
        const { source, entity } = event;
        const attacker = source.player;
        if (!attacker || !attacker.isPlayer() || !entity.isLiving() || !fu_hasTraitAnywhere(attacker, "kubejs:intrinsic")) {
            return;
        }
        const exp_level = Math.min(attacker.xpLevel, 900);
        const bonusPercent = Math.floor(exp_level / 5);
        if (bonusPercent > 0) {
            new_damage(event, STAGE.ADDITIVE, 1 + bonusPercent / 100);
        }
    })
    .register();


/**
 * 对燃起来的怪物增伤效果
 * 当玩家有fluxing效果时，对任何燃烧的实体造成额外伤害
 */
RFTrait('kubejs:fluxing', 0)
    .beforeHurt(event => {
        const { source, entity } = event;
        const attacker = source.player || source.actual;
        if (!attacker || !attacker.isPlayer() || !entity.isLiving() || !fu_hasTraitAnywhere(attacker, "kubejs:fluxing")) {
            return;
        }
        if (entity.isOnFire() || entity.isInLava()) {
            let traitLevel = fu_getHighestTraitLevelAnywhere(attacker, "kubejs:fluxing");
            let damageMultiplier = 1 + (traitLevel * 0.2);
            new_damage(event, STAGE.ADDITIVE, damageMultiplier);
        }
    })
    .register();


RFTrait('kubejs:systemtime', 0)
    .beforeHurt(event => {
        const { source, entity } = event;
        const attacker = source.player || source.actual;

        if (!attacker || !attacker.isLiving() || !fu_hasTraitAnywhere(attacker, "kubejs:systemtime")) {
            return;
        }

        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes();

        let distanceFromNoon = Math.abs((hours - 12) * 60 + minutes);
        const maxDistance = 720;
        const ratio = Math.min(distanceFromNoon / maxDistance, 1);
        const maxBonus = 0.2;
        const bonus = maxBonus * (1 - ratio);

        const damageMultiplier = 1 + bonus;
        new_damage(event, STAGE.ADDITIVE, damageMultiplier);
    })
    .register();


RFTrait('kubejs:irons_spellbooks_guiding_bolt', 0)
    .leftClick(event => {
        const player = event.player
        if (player.hasEffect("kubejs:garnet")) {
            if (player.isOnFire() || player.isInLava()) {
                trySkill(player, "garnet_guiding_bolt", 100, () => {
                    overLimitSpellCast($ResourceLocation('irons_spellbooks', 'guiding_bolt'), 3, player, false)
                })
            }
        }
    })
    .register();


RFTrait('kubejs:irons_spellbooks_root', 0)
    .leftClick(event => {
        const player = event.player;
        let magicSwitch = player.persistentData.getInt("magicSwitch") || 0;
        if (magicSwitch == 1) {
            const pData = player.persistentData;
            if (fu_hasTraitAnywhere(player, "kubejs:ironwood_ingot")) {
                let currentSanity = pData.getInt(sanity);
                updateplayersanity(player, currentSanity - 15)
                const currentHealth = player.health;
                const maxHealth = player.maxHealth;
                const damageAmount = maxHealth * 0.4;
                if (currentSanity <= -45) {
                    const remainingHealth = currentHealth - damageAmount;
                    if (remainingHealth <= 0) {
                        attackEntity(player, 'out_of_world', damageAmount, true)
                        return;
                    }
                    else {
                        let traitLevel = fu_getHighestTraitLevelAnywhere(player, "kubejs:ironwood_ingot");
                        attackEntity(player, 'out_of_world', damageAmount, true)
                        overLimitSpellCast($ResourceLocation('irons_spellbooks', 'root'), traitLevel - 1, player, false);
                    }
                }
                else {
                    player.potionEffects.add("kubejs:disillusionment", 20 * 2, 0);
                    let traitLevel = fu_getHighestTraitLevelAnywhere(player, "kubejs:ironwood_ingot");
                    overLimitSpellCast($ResourceLocation('irons_spellbooks', 'root'), traitLevel - 1, player, false);
                }
            }
        }
    })
    .register();


RFTrait('kubejs:prismarine_crystals', 0)
    .onTick(23, event => {
        let player = event.player
        if (!fu_hasTraitAnywhere(player, "kubejs:prismarine_crystals")) return
        let lavaLike = "minecraft:water"
        if ([player.getBlock(), player.block.getUp()].some(b => b.id == lavaLike)) {
            player.potionEffects.add("kubejs:prismarine_crystals_1", 20 * 3, 0);
        } return
    })
    .register();


RFTrait('kubejs:calamatium_ingot', 0)
    .onTick(23, event => {
        const player = event.player;
        if (!player || !player.isLiving() || !fu_hasTraitAnywhere(player, "kubejs:calamatium_ingot")) return;
        const radius = 5;
        const effectDuration = 10 * 20;
        const burningEntities = player.level.getEntities(
            player,
            player.getBoundingBox().inflate(radius)
        ).filter(entity =>
            entity.isLiving() &&
            entity.isOnFire() &&
            entity !== player
        );
        const burningCount = burningEntities.length;
        if (burningCount > 0) {
            let traitLevel = fu_getHighestTraitLevelAnywhere(player, "kubejs:calamatium_ingot");
            let effectLevel = traitLevel + burningCount;
            player.potionEffects.add(
                'minecraft:health_boost',
                effectDuration,
                effectLevel - 1,
                false,
                false
            );
        }
    })
    .register();

RFTrait('kubejs:xelkive_ingot', 0)
    .onTick(0, event => {
        let player = event.player
        const tick = player.tickCount;

        if (!player.isLiving() || !fu_hasTraitAnywhere(player, "kubejs:xelkive_ingot")) return;
        const traitLevel = fu_getHighestTraitLevelAnywhere(player, "kubejs:xelkive_ingot");
        const intervalSeconds = Math.max(5, 15 - (traitLevel * 5));
        const intervalTicks = intervalSeconds * 20;

        if (tick % intervalTicks === 0) {
            removeRandomNegativeEffect(player);
        }
    })
    .register();



RFTrait('kubejs:meat_ingots', 0)
    .onTick(1, event => {
        let player = event.player
        const tick = player.tickCount;
        if (tick % 20 !== 0) return;
        if (!player || !player.isLiving()) return;

        if (!fu_hasTraitMainHand(player, "kubejs:meat_ingots")) return;

        const traitLevel = fu_getTraitLevelMainHand(player, "kubejs:meat_ingots");
        if (traitLevel <= 0) return;
        const intervalSeconds = Math.max(1, 6 - traitLevel);
        const intervalTicks = intervalSeconds * 20;

        const triggerInterval = intervalTicks / 20;
        if (Math.floor(tick / 20) % triggerInterval !== 0) return;

        const mainHandItem = player.getMainHandItem();
        if (mainHandItem.isEmpty()) return;

        const maxDurability = mainHandItem.getMaxDamage();
        const currentDurability = mainHandItem.getDamageValue();
        const durabilityCost = traitLevel * traitLevel;

        if (currentDurability + durabilityCost >= maxDurability) {
            return;
        }

        fu_repairDurability(mainHandItem, -durabilityCost, player, "mainhand");
        player.heal(traitLevel);
    })
    .register();


RFTrait('kubejs:moon', 0)
    .onTick(43, event => {
        let player = event.player
        if (!player) return;
        if (player.hasEffect("kubejs:moon")) {
            const moonPhase = event.level.getMoonPhase();
            if (moonPhase == null) return;
            switch (moonPhase) {
                case 0: // 新月
                    player.potionEffects.add("kubejs:new_moon", 80, 0);
                    break;
                case 1: // 残月
                    player.potionEffects.add("kubejs:moon_effect", 80, 0);
                    break;
                case 2: // 峨眉月
                    player.potionEffects.add("kubejs:waxing_crescent", 80, 0);
                    break;
                case 3: // 弦月
                    player.potionEffects.add("kubejs:quarter", 80, 0);
                    break;
                case 4: // 凸月
                    player.potionEffects.add("kubejs:waxing_gibbous", 80, 0);
                    break;
                case 5: // 满月
                    player.potionEffects.add("kubejs:full_moon", 80, 0);
                    break;
            }
        }
    })
    .register();


RFTrait('kubejs:cosmos_aurora_ingot', 0)
    .onTick(43, event => {
        let player = event.player
        if (!player) return;
        if (!fu_hasTraitAnywhere(player, "kubejs:cosmos_aurora_ingot")) return;
        let traitLevel = fu_getHighestTraitLevelAnywhere(player, "kubejs:cosmos_aurora_ingot");

        if (player.getLevel().isThundering()) {
            player.potionEffects.add("kubejs:spell_power_increase", 50, traitLevel - 1);

        } else if (player.getLevel().isRaining()) {
            player.potionEffects.add("kubejs:spell_power_increase", 50, traitLevel - 1);
        }
    })
    .register();


RFTrait('kubejs:emerald', 0)
    .onTick(43, event => {
        let player = event.player
        if (!fu_hasTraitAnywhere(player, "kubejs:emerald")) return;
        const weapon = player.getMainHandItem();
        if (!weapon.isDamageableItem()) return;

        const traitLevel = fu_getHighestTraitLevelAnywhere(player, "kubejs:emerald");
        const effectLevel = Math.floor(traitLevel / 2);
        player.potionEffects.add("minecraft:hero_of_the_village", 60, effectLevel);

        fu_repairDurability(weapon, -4, player, "mainhand");
    })
    .register();



RFTrait('kubejs:celeslar_ingot', 0)
    .onTick(67, event => {
        let player = event.player
        if (!fu_hasTraitAnywhere(player, "kubejs:celeslar_ingot")) return
        const trait_level = fu_getHighestTraitLevelAnywhere(player, "kubejs:celeslar_ingot")

        const nearbyEntities = player.level.getEntities(
            player,
            player.getBoundingBox().inflate(trait_level * 2)
        );

        const livingEntities = nearbyEntities.filter(entity =>
            entity.isLiving() && entity != player
        );

        const count = livingEntities.length;

        if (count > 0) {
            let maxAmplifier = trait_level * 3;
            let amplifier = Math.min(count - 1, maxAmplifier);
            player.potionEffects.add("kubejs:damage_amplification", 6 * 20, amplifier);
        } else {
            player.potionEffects.remove("kubejs:damage_amplification");
        }
    })
    .register();



RFTrait('kubejs:eternal_starlight', 0)
    .onTick(101, event => {
        let player = event.player
        if (!fu_hasTraitAnywhere(player, 'kubejs:eternal_starlight')) return;
        const traitLevel = fu_getHighestTraitLevelAnywhere(player, "kubejs:eternal_starlight");
        if (event.getLevel().getDimension() == "eternal_starlight:starlight") {
            player.potionEffects.add("kubejs:eternal_starlight_attack", 120, traitLevel - 1);
        } else {
            player.potionEffects.add("kubejs:eternal_starlight_speed", 120, traitLevel - 1);
        }
    })
    .register();


RFTrait('kubejs:heartstopFix', 0)
    .onTick(101, event => {
        let player = event.player
        if (!player.hasEffect('irons_spellbooks:heartstop')) {
            return;
        }
        const effect = player.getEffect('irons_spellbooks:heartstop');
        if (effect.getDuration() > 1200) {
            player.removeEffect('irons_spellbooks:heartstop');
            player.potionEffects.add('irons_spellbooks:heartstop', 1200, effect.getAmplifier());
        }
    })
    .register();


RFTrait('kubejs:gaze', 0)
    .onTick(199, event => {
        let player = event.player
        if (!player || !player.hasEffect("kubejs:gaze")) return;
        const entities = player.rayTrace().entity
        if (entities) {
            entities.potionEffects.add("kubejs:eye", 20 * 5, 0);
        }
    })
    .register();


RFTrait('kubejs:cursium_ingot', 0)
    .onTick(397, event => {
        let player = event.player
        if (!player || !fu_hasTraitAnywhere(player, "kubejs:cursium_ingot")) return;
        let traitLevel = fu_getHighestTraitLevelAnywhere(player, "kubejs:cursium_ingot");
        player.potionEffects.add("cataclysm:ghost_form", traitLevel * 30, 0);
    })
    .register();



RFTrait('kubejs:dragonprotection', 0)
    .beforeHurt(event => {
        let player = event.player
        let actual = event.source.actual
        if (!player || !fu_hasTraitAnywhere(player, "kubejs:dragonprotection")) return;
        let traitLevel = fu_getHighestTraitLevelAnywhere(player, "kubejs:dragonprotection");

        if (!actual) return;

        let entityType = actual.getType();
        if (!entityType || !entityType.includes("dragon")) return;

        let reduction = Math.min(0.1 * traitLevel, 0.5);
        new_damage(event, STAGE.MULTIPLY, 1 - reduction);
    })
    .register();


RFTrait('kubejs:glacial_state', 0)
    .beforeHurt(event => {
        const { source, entity } = event;
        const attacker = source.player
        if (!attacker || !attacker.isPlayer() || !entity.isLiving() || !fu_hasTraitAnywhere(attacker, "kubejs:glacial_state")) {
            return;
        }
        const trait_level = fu_getHighestTraitLevelAnywhere(attacker, "kubejs:glacial_state")
        entity.potionEffects.add("kubejs:glacial_state", 20 + trait_level * 10, trait_level - 1);
    })
    .register();


RFTrait('kubejs:deathworm_chitin', 0)
    .onTick(101, event => {
        let player = event.player
        if (!player) return
        if (!fu_hasTraitAnywhere(player, "kubejs:pest_emperor")) return;
        let traitLevel = fu_getHighestTraitLevelAnywhere(player, "kubejs:pest_emperor");
        if (!player.hasEffect("kubejs:pest_defense")) return
        let currentEffect = player.getEffect("kubejs:pest_defense");
        if (currentEffect.getAmplifier() >= 49) return
        player.potionEffects.add("kubejs:pest_defense", 20 + traitLevel * 40, 0)
    })
    .beforeHurt(event => {
        const { source, entity } = event;
        const attacker = source.player
        if (!attacker || !attacker.isPlayer() || !entity.isLiving() || !fu_hasTraitAnywhere(attacker, "kubejs:pest_emperor")) {
            return;
        }

        let trait_level = fu_getHighestTraitLevelAnywhere(attacker, "kubejs:pest_infesting")
        let cooldownTime = 120 - trait_level * 30;

        trySkill(attacker, "pest_emperor", cooldownTime * 20, () => {
            entity.potionEffects.add("kubejs:pest_infesting", 60 + trait_level * 20, trait_level);
        })
    })
    .register();


//特性-月见草
RFTrait('kubejs:moonpools', 0)
    .onTick(101, event => {
        let player = event.player
        if (!player) return
        if (!isNight(player.getLevel())) return
        if (!fu_hasTraitAnywhere(player, "kubejs:moonpools")) return;
        player.heal(2)
        player.potionEffects.add("kubejs:evening_primrose", 140, 0);
        if (!fu_hasTraitMainHand(player, "kubejs:moonpools")) return;
        fu_attemptDamageByHand(player.getMainHandItem(), -3, player, "MAIN_HAND")
    })
    .beforeHurt(event => {
        let player = event.player
        if (!player) return
        if (!isNight(player.getLevel())) return
        if (!player.hasEffect("kubejs:evening_primrose")) return
        new_damage(event, STAGE.MULTIPLY, 0.9)
    })
    .register();


RFTrait('kubejs:ultimine_test', 0)
    .blockBroken(event => {
        const { player, block } = event;
        if (!fu_hasTraitAnywhere(player, "kubejs:ultimine_test")) return;
        if (player.crouching) return;

        const blockId = block.getId().toString();
        const pos = block.getPos();
        executeUltimine(player, pos, blockId);
    })
    .register();


// 引力锚点
RFTrait('kubejs:gravity_anchor', 0)
    .beforeHurt(event => {
        const { source, entity } = event;
        const attacker = source.player || source.actual;
        if (event.source.getType() !== 'arrow') return;

        if (!attacker || !attacker.isLiving() || !fu_hasTraitAnywhere(attacker, "kubejs:gravity_anchor")) {
            return;
        }

        entity.potionEffects.add("reveriefoundry:gravity_anchor", 600, 0);
    })
    .register();



RFTrait('kubejs:ghost_player', 0)
    .beforeHurt(event => {
        const player = event.entity;
        if (!fu_hasTraitAnywhere(player, "kubejs:ghost_player")) return;

        trySkill(player, "ghost_player", 200, () => {
            let ghostId = $RFUtils.summonGhostWithReturn(player);

            if (ghostId !== -1) {
                let ghost = player.level.getEntity(ghostId);

                player.server.scheduleInTicks(200, () => {
                    if (ghost && ghost.isAlive()) {
                        ghost.discard();
                    }
                });
            }
        });

        return;
    })
    .register();


RFTrait('kubejs:unrealium_ingot', 0)
    .onTick(200, event => {
        const player = event.entity;
        if (!fu_hasTraitAnywhere(player, "kubejs:unrealium_ingot")) return;
        player.potionEffects.add("irons_spellbooks:true_invisibility", 20 * 5, 0);
    })
    .beforeHurt(event => {
        const { source, entity } = event;
        const attacker = source.player || source.actual;

        if (!attacker || !attacker.isLiving() || !fu_hasTraitAnywhere(attacker, "kubejs:unrealium_ingot")) {
            return;
        }
        if (!entity.hasEffect("irons_spellbooks:true_invisibility")) return;
        new_damage(event, STAGE.ADDITIVE, 1.5)
    })
    .register();



RFTrait('kubejs:dragonskill', 0)
    .beforeHurt(event => {
        const { source, entity } = event;
        const attacker = source.player || source.actual;

        if (!attacker || !attacker.isLiving() || !fu_hasTraitAnywhere(attacker, "kubejs:dragonskill")) {
            return;
        }
        const isDragon = /dragon/i.test(String(entity.getId()));

        if (!isDragon) {
            entity.potionEffects.add("kubejs:dragon_might", 20 * 5, 0);
        }
    })
    .beforeHurt(event => {
        const { source } = event;
        if (source.actual && source.actual.hasEffect("kubejs:dragon_might")) {
            new_damage(event, STAGE.MULTIPLY, 0.85)
        }
    })
    .register();


/**
* 根据拥有的誓令数量提供攻击力加成
* 每个誓令提供 10% × 词条等级 的伤害加成，最高100%
*/
RFTrait('kubejs:oathbound_strength', 90)
    .beforeHurt(event => {
        const { source, entity } = event;
        const attacker = source.player || source.actual;

        if (!attacker || !attacker.isLiving()) return;
        if (!fu_hasTraitAnywhere(attacker, "kubejs:oathbound_strength")) return;

        const traitLevel = fu_getHighestTraitLevelAnywhere(attacker, "kubejs:oathbound_strength");

        const geasEffects = fu_getGeasEffects(attacker);
        const geasCount = geasEffects.length;

        if (geasCount <= 0) return;

        const bonusPerGeas = 0.1 * traitLevel;
        let damageBonus = geasCount * bonusPerGeas;
        damageBonus = Math.min(damageBonus, 1.0);

        new_damage(event, STAGE.ADDITIVE, 1 + damageBonus);
    })
    .register();



/**
* 攻击时暴露目标灵魂，暴露期间目标受到伤害+15%
*/
RFTrait('kubejs:soul_exposure', 85)
    .beforeHurt(event => {
        const { source, entity } = event;
        const attacker = source.player || source.actual;

        if (!attacker || !attacker.isLiving()) return;
        if (!fu_hasTraitAnywhere(attacker, "kubejs:soul_exposure")) return;

        if (!entity.isLiving()) return;

        const traitLevel = fu_getHighestTraitLevelAnywhere(attacker, "kubejs:soul_exposure");
        const duration = 5 * traitLevel * 20;

        fu_exposeSoul(entity);
        fu_setExposedSoulDuration(entity, duration);
    })
    .beforeHurt(event => {
        const { source, entity } = event;
        const attacker = source.player || source.actual;

        if (!attacker || !attacker.isLiving()) return;
        if (!fu_hasTraitAnywhere(attacker, "kubejs:soul_exposure")) return;

        const exposedDuration = fu_getExposedSoulDuration(entity);
        if (exposedDuration <= 0) return;

        new_damage(event, STAGE.ADDITIVE, 1.15);
    })
    .register();



/**
 * 攻击消耗灵魂护盾百分比，造成额外百分比伤害
 */
RFTrait('kubejs:soul_consumption', 80)
    .beforeHurt(event => {
        const { source, entity } = event;
        const attacker = source.player || source.actual;

        if (!attacker || !attacker.isLiving()) return;
        if (!fu_hasTraitAnywhere(attacker, "kubejs:soul_consumption")) return;

        const traitLevel = fu_getHighestTraitLevelAnywhere(attacker, "kubejs:soul_consumption");

        const currentWard = fu_getCurrentSoulWard(attacker);
        if (currentWard <= 0) return;

        const percentCost = 0.02 * traitLevel;
        const actualCost = Math.floor(currentWard * percentCost);

        if (actualCost <= 0) return;

        fu_reduceSoulWard(attacker, actualCost);

        const bonusPercent = 0.15 * traitLevel;
        new_damage(event, STAGE.ADDITIVE, 1 + bonusPercent);
    })
    .register();



/**
 * 饥饿值归零时自动消耗灵魂护盾代替
 * 灵魂护盾归零时自动消耗饥饿值代替
 */
RFTrait('kubejs:soul_conversion', 60)
    .onTick(20, event => {
        const player = event.player;
        if (!player || !player.isLiving()) return;
        if (!fu_hasTraitAnywhere(player, "kubejs:soul_conversion")) return;

        const foodLevel = player.getFoodLevel();
        const saturation = player.getSaturation();
        const currentWard = fu_getCurrentSoulWard(player);
        const maxFood = 20;

        if (foodLevel <= 0 && currentWard > 0) {
            const lastWardToFood = player.persistentData.getInt("soul_conversion_ward_to_food") || 0;
            if (player.tickCount - lastWardToFood < 100) return;

            const wardCost = Math.min(4, currentWard);
            fu_reduceSoulWard(player, wardCost);

            const foodGain = Math.min(1, maxFood - foodLevel);
            player.setFoodLevel(foodLevel + foodGain);
            player.setSaturation(Math.min(saturation + 0.5, maxFood));

            player.persistentData.putInt("soul_conversion_ward_to_food", player.tickCount);
        }

        if (currentWard <= 0 && foodLevel > 10) {
            const foodCost = Math.min(8, foodLevel - 2);
            const wardGain = Math.floor(foodCost / 2);

            if (wardGain > 0) {
                player.setFoodLevel(foodLevel - foodCost);
                player.setSaturation(Math.max(0, saturation - foodCost));
                fu_addSoulWard(player, wardGain);

                player.potionEffects.add("minecraft:weakness", 30, 254);
            }
        }
    })
    .register();

/**
* 受到攻击时有概率恢复灵魂护盾
*/
RFTrait('kubejs:dream_barrier', 70)
    .beforeHurt(event => {
        const { entity } = event;
        if (!entity.isLiving() || !entity.isPlayer()) return;
        if (!fu_hasTraitAnywhere(entity, "kubejs:dream_barrier")) return;

        const traitLevel = fu_getHighestTraitLevelAnywhere(entity, "kubejs:dream_barrier");

        const chance = 0.1 * traitLevel;
        if (Math.random() < chance) {
            fu_addSoulWard(entity, traitLevel);
        }
    })
    .register();
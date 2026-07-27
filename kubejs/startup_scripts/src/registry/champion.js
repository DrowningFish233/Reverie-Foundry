StartupEvents.registry("champions:affix", event => {
    event.create('sword_of_palermo')
        .settings(setting => {
            setting.withDefault()
                .setPrefix("affix.")
                .setCategory("offense")
        })
        .behavior(behavior => {
            behavior.onAttack((champion, player, damageSource, amount) => {
                if (!player) return false;

                let hasShield = hasSoulWard(player);
                if (!hasShield) return true;

                let bonus = 150;
                if (player.hasEffect("kubejs:fire")) {
                    let fireEffect = player.getEffect("kubejs:fire");
                    if (fireEffect) {
                        let amplifier = fireEffect.getAmplifier();
                        let fireBonus = Math.min(amplifier * 15, 300);
                        bonus += fireBonus;
                    }
                }

                let soulWardBonusDamage = amount * (bonus / 100);
                attackEntity(player, 'generic', soulWardBonusDamage, true);

                return true;
            });
        });
    event.create('duel_climax')
        .settings(setting => {
            setting.withDefault()
                .setPrefix("affix.")
                .setCategory("offense")
        })
        .behavior(behavior => {
            behavior.onAttack((champion, player, damageSource, amount) => {
                if (!player) return false;
                let climaxLevel = 0;
                let currentDuration = 600;

                if (player.hasEffect("kubejs:duel_climax")) {
                    let effect = player.getEffect("kubejs:duel_climax");
                    if (effect) {
                        climaxLevel = effect.getAmplifier() + 1;
                        currentDuration = effect.getDuration();
                    }
                }

                let newLevel = Math.min(climaxLevel + 1, 10);

                player.potionEffects.add("kubejs:duel_climax", currentDuration, newLevel - 1);

                let damageBonus = newLevel * 5;
                let extraDamage = amount * (damageBonus / 100);
                if (extraDamage > 0) {
                    attackEntity(player, 'generic', extraDamage, true);
                }

                if (newLevel >= 5) {
                    let monster = champion.getLivingEntity();
                    if (monster) {
                        let damageAmpLevel = 0;
                        if (monster.hasEffect("kubejs:damage_amplification")) {
                            let current = monster.getEffect("kubejs:damage_amplification");
                            damageAmpLevel = Math.min(current.getAmplifier() + 1, 4);
                        }
                        monster.potionEffects.add("kubejs:damage_amplification", 20 * 30, damageAmpLevel);
                    }
                }

                if (newLevel >= 10) {
                    removeRandomNegativeEffect(player);
                }

                return true;
            });

            behavior.onHurt((champion, source, amount, newAmount) => {
                let attacker = source.getPlayer();
                if (!attacker || !attacker.isPlayer()) return amount;


                let climaxLevel = 0;
                if (attacker.hasEffect("kubejs:duel_climax")) {
                    let effect = attacker.getEffect("kubejs:duel_climax");
                    if (effect) {
                        climaxLevel = effect.getAmplifier() + 1;
                    }
                }

                let damageReduction = climaxLevel * 5;
                let reducedDamage = amount * (1 - damageReduction / 100);

                return Math.max(0, reducedDamage);
            });
        });
    event.create('malum_pact_of_the_lone_druid')
        .settings(setting => {
            setting.withDefault()
                .setPrefix("affix.")
                .setCategory("defense")
            // 必须设置类别：cc、defense、offense
            //offense攻击
            //defense防御
            //cc控制
        })
        .behavior(behavior => {
            behavior.onSpawn((champion) => {
                const entity = champion.getLivingEntity();
                entity.persistentData.putBoolean("malum_pact_of_the_lone_druid", true);
            })
        })
    event.create('malum_pact_of_the_shield')
        .settings(setting => {
            setting.withDefault()
                .setPrefix("affix.")
                .setCategory("defense")
            // 必须设置类别：cc、defense、offense
            //offense攻击
            //defense防御
            //cc控制
        })
        .behavior(behavior => {
            behavior.onSpawn((champion) => {
                const entity = champion.getLivingEntity();
                entity.persistentData.putBoolean("malum_pact_of_the_shield", true);
            })
        })

    event.create('malum_pact_of_patience_repaid')
        .settings(setting => {
            setting.withDefault()
                .setPrefix("affix.")
                .setCategory("defense")
            // 必须设置类别：cc、defense、offense
            //offense攻击
            //defense防御
            //cc控制
        })
        .behavior(behavior => {
            behavior.onSpawn((champion) => {
                const entity = champion.getLivingEntity();
                entity.persistentData.putBoolean("malum_pact_of_patience_repaid", true)
            })
        })

    event.create('malum_pact_of_the_high_priest')
        .settings(setting => {
            setting.withDefault()
                .setPrefix("affix.")
                .setCategory("defense")
            // 必须设置类别：cc、defense、offense
            //offense攻击
            //defense防御
            //cc控制
        })
        .behavior(behavior => {
            behavior.onSpawn((champion) => {
                const entity = champion.getLivingEntity();
                entity.persistentData.putBoolean("malum_pact_of_the_high_priest", true)
            })
        })

    event.create('malum_pact_of_the_berserker')
        .settings(setting => {
            setting.withDefault()
                .setPrefix("affix.")
                .setCategory("defense")
            // 必须设置类别：cc、defense、offense
            //offense攻击
            //defense防御
            //cc控制
        })
        .behavior(behavior => {
            behavior.onSpawn((champion) => {
                const entity = champion.getLivingEntity();
                entity.persistentData.putBoolean("malum_pact_of_the_berserker", true)
            })
        })

    event.create('malum_pact_of_the_warlock')
        .settings(setting => {
            setting.withDefault()
                .setPrefix("affix.")
                .setCategory("defense")
            // 必须设置类别：cc、defense、offense
            //offense攻击
            //defense防御
            //cc控制
        })
        .behavior(behavior => {
            behavior.onSpawn((champion) => {
                const entity = champion.getLivingEntity();
                entity.persistentData.putBoolean("malum_pact_of_the_warlock", true)
            })
        })

    event.create('fire_aura')
        .settings(setting => {
            setting.withDefault()
                .setPrefix("affix.")
                .setCategory("defense")
            setting
        })
        // 定义词缀行为
        .behavior(behavior => {
            // 在服务器更新词缀时
            behavior.onServerUpdate(champion => {
                // 每5秒点燃周围实体3秒
                const entity = champion.getLivingEntity();
                if (entity.tickCount % 100 === 0) {
                    entity.level.getEntities(
                        entity,
                        entity.getBoundingBox().inflate(3)
                    ).forEach(e => {
                        if (e.isPlayer()) {
                            e.setRemainingFireTicks(60)
                        }
                    })
                }
            })
        })

    event.create('protective')
        .settings(setting => {
            setting.withDefault()
                .setPrefix("affix.")
                .setCategory("defense")
        })
        .behavior(behavior => {
            behavior.onServerUpdate(champion => {
                const entity = champion.getLivingEntity();
                if (!entity) return;

                if (entity.tickCount % 100 !== 0) return;

                const entityId = entity.getType();
                const specialBosses = [
                    "darkdoppelganger:dark_doppelganger",
                    "bosses_of_mass_destruction:obsidilith",
                    "cataclysm:ender_guardian"
                ];

                const isSpecialChampion = specialBosses.includes(entityId);
                const amplifier = isSpecialChampion ? 1 : 0;

                entity.potionEffects.add('minecraft:resistance', 20 * 2, amplifier);
            });
        })

    event.create('sanity')
        .settings(setting => {
            setting.withDefault()
                .setPrefix("affix.")
                .setCategory("defense")
            // 必须设置类别：cc、defense、offense
            //offense攻击
            //defense防御
            //cc控制
            setting
        })
        // 定义词缀行为
        .behavior(behavior => {
            // 在服务器更新词缀时
            behavior.onServerUpdate(champion => {
                const entity = champion.getLivingEntity();
                if (entity.tickCount % 100 === 0) {
                    entity.potionEffects.add("kubejs:sanity", 20 * 20, 0);
                }
            })
        })
    event.create('no_mana')
        .settings(setting => {
            setting.withDefault()
                .setPrefix("affix.")
                .setCategory("offense")
            // 必须设置类别：cc、defense、offense
            //offense攻击
            //defense防御
            //cc控制
            setting
        })
        .behavior(behavior => {
            behavior.onAttack((champion, player, damageSource, amount) => {
                if (!player) return false;
                let magicData = getPlayerMagicData(player);
                magicData.addMana(-100);
                return true;
            })
        })
    event.create('radiation')
        .settings(setting => {
            setting.withDefault()
                .setPrefix("affix.")
                .setCategory("offense")
            // 必须设置类别：cc、defense、offense
            //offense攻击
            //defense防御
            //cc控制
            setting
        })
        .behavior(behavior => {
            behavior.onServerUpdate(champion => {
                const entity = champion.getLivingEntity();
                // 每5秒（100tick）执行一次
                if (entity.tickCount % 160 === 0) {
                    entity.level.getEntities(
                        entity,
                        entity.getBoundingBox().inflate(3)
                    ).forEach(e => {
                        if (e && e.isLiving() && e.isPlayer()) {
                            e.potionEffects.add('kubejs:miracle_blight', 20 * 3, 0);
                        }
                    });
                }
            });
        });
    event.create('attack_radiation')
        .settings(setting => {
            setting.withDefault()
                .setPrefix("affix.")
                .setCategory("offense")
            // 必须设置类别：cc、defense、offense
            //offense攻击
            //defense防御
            //cc控制
            setting
        })
        .behavior(behavior => {
            behavior.onAttack((champion, player, damageSource, amount) => {
                if (!player) return false
                player.potionEffects.add('kubejs:miracle_blight', 20 * 5, 0);
                return true;
            })
        })
    event.create('transform')
        .settings(setting => {
            setting.withDefault()
                .setPrefix("affix.")
                .setCategory("offense")
            // 必须设置类别：cc、defense、offense
            //offense攻击
            //defense防御
            //cc控制
            setting
        })
        .behavior(behavior => {
            // 攻击行为
            behavior.onAttack((champion, player, damageSource, amount) => {
                const transform = champion.getLivingEntity();
                const transformID = transform.getType();

                const isNetheriteMonstrosity = transformID === "cataclysm:netherite_monstrosity";

                const maxHealth = transform.getMaxHealth();
                const currentHealth = transform.getHealth();
                const healthPercent = currentHealth / maxHealth * 100;

                if (!player || !player.isPlayer()) return false;

                let tremorAmplifier = 7;
                if (player.isBlocking()) {
                    tremorAmplifier = 3;
                }

                if (!isNetheriteMonstrosity) {
                    tremorAmplifier = Math.floor(tremorAmplifier / 2);
                }

                player.potionEffects.add('kubejs:tremor', 20 * 5, tremorAmplifier);

                if (isNetheriteMonstrosity && healthPercent < 50 && Math.random() < 0.5) {
                    if (player.hasEffect("kubejs:tremor")) {
                        let tremorEffect = player.getEffect("kubejs:tremor");
                        let tremorLevel = tremorEffect.getAmplifier();
                        let newTremorLevel = tremorLevel - 1;
                        player.potionEffects.add("kubejs:hurt", 20 * 8, 0);
                        player.potionEffects.add("minecraft:slowness", 20 * 8, 0);
                        player.removeEffect("kubejs:tremor");
                        if (newTremorLevel < 1) {
                            player.removeEffect("kubejs:tremor");
                        } else {
                            player.potionEffects.add("kubejs:tremor", tremorEffect.getDuration(), newTremorLevel);
                        }
                    }
                }

                return true;
            });

            // 服务器更新行为
            behavior.onServerUpdate(champion => {
                const transform = champion.getLivingEntity();
                const transformID = transform.getType();

                if (transformID !== "cataclysm:netherite_monstrosity") return;

                const maxHealth = transform.getMaxHealth();
                const currentHealth = transform.getHealth();
                const healthPercent = currentHealth / maxHealth * 100;

                // 血量低于50%时，降低周围生物移动速度
                if (healthPercent < 50) {
                    if (transform.tickCount % 100 === 0) {
                        transform.level.getEntities(
                            transform,
                            transform.getBoundingBox().inflate(6)
                        ).forEach(e => {
                            if (e && e.isLiving() && e.isPlayer()) {
                                e.potionEffects.add('minecraft:slowness', 20 * 3, 0);
                            }
                        });
                    }
                }
            });
        });

    event.create('lich')
        .settings(setting => {
            setting.withDefault()
                .setPrefix("affix.")
                .setCategory("offense")
            // 必须设置类别：cc、defense、offense
            //offense攻击
            //defense防御
            //cc控制
            setting
        })

        .behavior(behavior => {
            behavior.onAttack((champion, player, damageSource, amount) => {
                if (!player) return false

                const debuffList = [
                    'kubejs:miracle_blight',
                    "kubejs:bleed",
                    "kubejs:hurt",
                    "kubejs:fire",
                    "kubejs:bloodlust",
                    "kubejs:radiance",
                    'minecraft:slowness',
                    'minecraft:weakness',
                    'minecraft:poison',
                    'minecraft:wither',
                    'minecraft:mining_fatigue',
                    'minecraft:blindness',
                    'minecraft:hunger'
                ];
                const selectedDebuff = debuffList[Math.floor(Math.random() * debuffList.length)];
                const currentEffect = player.getEffect(selectedDebuff);
                const MAX_AMPLIFIER = 5;
                let newAmplifier = 0;
                if (currentEffect) {
                    newAmplifier = Math.min(currentEffect.getAmplifier() + 1, MAX_AMPLIFIER);
                }
                player.potionEffects.add(selectedDebuff, 20 * 5, newAmplifier);
                return true;
            })
            behavior.onHeal((champion, amount) => {
                const entity = champion.getLivingEntity();
                if (!entity) return 1;

                const buffList = [
                    'minecraft:strength',
                    'minecraft:fire_resistance',
                    'minecraft:speed',
                    'minecraft:jump_boost',
                    'minecraft:absorption',
                    'minecraft:health_boost'
                ];
                const selectedBuff = buffList[Math.floor(Math.random() * buffList.length)];
                const currentEffect = entity.getEffect(selectedBuff);
                const MAX_AMPLIFIER = 3;
                let newAmplifier = 0;
                if (currentEffect) {
                    newAmplifier = Math.min(currentEffect.getAmplifier() + 1, MAX_AMPLIFIER);
                }
                entity.potionEffects.add(selectedBuff, 20 * 5, newAmplifier);
                return 2;
            });
        });
    event.create("sticky")
        .settings(setting => {
            setting.withDefault()
                .setPrefix("affix.")
                .setCategory("defense")
        })
        .behavior(behavior => {
            behavior.onAttack((champion, target, damageSource, amount) => {
                if (target.isPlayer()) {
                    let player = target;
                    let itemStack = getCuriosItem(player, 'cataclysm:sticky_gloves');
                    if (itemStack !== null) return true;
                    let item = player.mainHandItem;
                    const EnchantmentLevel = item.getEnchantmentLevel("minecraft:binding_curse");
                    if (EnchantmentLevel == 0) {
                        let level = player.getLevel();
                        let dropedItem = new $ItemEntity(level, player.x, player.y, player.z, item);
                        dropedItem.setPickUpDelay(60);
                        dropedItem.spawn();
                        player.getInventory().removeItem(item);
                    }
                }
                return true;
            })
        })
    event.create("corrodes")
        .settings(s => {
            s.withDefault()
                .setPrefix("affix.")
                .setCategory("defense")
                .build()
        })
        .behavior(behavior => {
            behavior.onHurt((champion, source, amount, newAmount) => {
                if (source != null) {
                    let causingEntity = source.getPlayer();
                    if (causingEntity != null) {
                        let mainHandItem = causingEntity.mainHandItem;
                        if (!mainHandItem.isEmpty() && mainHandItem.isDamageableItem()) {
                            let maxDamage = mainHandItem.getMaxDamage();
                            let damageToApply = Math.max(1, Math.min(100, Math.floor(maxDamage * 0.01)));
                            if (fu_isGear(mainHandItem)) {
                                let currentDamage = mainHandItem.getDamageValue();
                                let remainingDurability = maxDamage - currentDamage;
                                if (remainingDurability > damageToApply && remainingDurability > maxDamage * 0.05) {
                                    fu_attemptDamageByHand(mainHandItem, damageToApply, causingEntity, "MAIN_HAND");
                                }
                            } else {
                                let currentDamage = mainHandItem.getDamageValue();
                                let newDamage = currentDamage + damageToApply;
                                if (newDamage >= maxDamage) {
                                    mainHandItem.shrink(1);
                                } else {
                                    mainHandItem.setDamageValue(newDamage);
                                }
                            }
                        }
                    }
                }
                return amount;
            });
        })

    event.create('reflective')
        .settings(setting => {
            setting.withDefault()
                .setPrefix("affix.")
                .setCategory("offense")
            // 必须设置类别：cc、defense、offense
            //offense攻击
            //defense防御
            //cc控制
        })
        .behavior(behavior => {
            behavior.onDamage((champion, source, amount, newAmount) => {
                const player = source.getPlayer();
                if (player) {
                    const currentHealth = player.getHealth();
                    if (currentHealth <= 2) {
                        const reflect = currentHealth + 1;
                        player.attack($DamageSource("champions:reflection"), reflect);
                    } else {
                        const cap = Math.floor(player.getMaxHealth() * 0.15);
                        const baseReflect = Math.floor(amount * 0.25);
                        const reflect = Math.max(1, Math.min(baseReflect, cap));
                        player.attack($DamageSource("champions:reflection"), reflect);
                    }
                } return newAmount;
            });
        })
    event.create('parry')
        .settings(setting => {
            setting.withDefault()
                .setPrefix("affix.")
                .setCategory("defense")
            // 必须设置类别：cc、defense、offense
            //offense攻击
            //defense防御
            //cc控制
        })
        .behavior(behavior => {
            behavior.onDamage((champion, damageSource, amount, newAmount) => {
                let entity = champion.getLivingEntity()
                if (!entity) return amount;
                if (Math.random() < getDodgeChance(entity)) {
                    return 0; // 招架
                }
                return newAmount;
            });
        });
    event.create('boomer')
        .settings(setting => {
            setting.withDefault()
                .setPrefix("affix.")
                .setCategory("offense")
            // 必须设置类别：cc、defense、offense
            //offense攻击
            //defense防御
            //cc控制
            setting
        })
        .behavior(behavior => {
            behavior.onDeath((champion, damageSource) => {
                // 获取精英怪物的位置和世界
                let entity = champion.getLivingEntity()
                let level = entity.getLevel()
                let pos = entity.blockPosition()

                // 创建爆炸效果
                level.createExplosion(pos.x, pos.y, pos.z)
                    .explosionMode("none")
                    .causesFire(false)
                    .strength(2)
                    .explode();

                return true
            })
        })
    event.create('suppress')
        .settings(setting => {
            setting.withDefault()
                .setPrefix("affix.")
                .setCategory("offense")
            // 必须设置类别：cc、defense、offense
            //offense攻击
            //defense防御
            //cc控制
            setting
        })
        .behavior(behavior => {
            behavior.onAttack((champion, player, damageSource, amount) => {
                if (!player) return false
                if (player.hasEffect('kubejs:maximum_health_reduction')) {
                    let Effect = player.getEffect('kubejs:maximum_health_reduction')
                    let Effect_Level = Math.min(Effect.getAmplifier() + 1, 5)
                    player.potionEffects.add('kubejs:maximum_health_reduction', 20 * 10, Effect_Level);
                } else {
                    player.potionEffects.add('kubejs:maximum_health_reduction', 20 * 10, 0);
                }
                return true;
            })
        })
    //受火者
    event.create('finale')
        .settings(setting => {
            setting.withDefault()
                .setPrefix("affix.")
                .setCategory("offense")
            // 必须设置类别：cc、defense、offense
            //offense攻击
            //defense防御
            //cc控制
            setting
        })
        .behavior(behavior => {
            behavior.onAttack((champion, player, damageSource, amount) => {
                const entity = champion.getLivingEntity();
                const entityID = entity.getType();

                const isFireBoss = entityID === "irons_spellbooks:fire_boss";

                if (!isFireBoss) return false;
                if (!player || !player.isPlayer()) return false;

                const maxHealth = entity.getMaxHealth();
                const currentHealth = entity.getHealth();
                const healthPercent = currentHealth / maxHealth * 100;

                const isPhaseTwo = healthPercent < 35;

                // 根据阶段选择效果类型
                const effectType = isPhaseTwo ? 'kubejs:soul_fire' : 'kubejs:fire';

                // 检查玩家是否已有该效果
                if (player.hasEffect(effectType)) {
                    const currentEffect = player.getEffect(effectType);
                    const currentAmplifier = currentEffect.getAmplifier();
                    const currentDuration = currentEffect.getDuration();

                    const newAmplifier = currentAmplifier + 5;

                    player.potionEffects.add(effectType, currentDuration, newAmplifier);
                    addBaseStrengthAndSync(player, effectType, newAmplifier)
                    if (Math.random() < 0.3) {
                        player.potionEffects.add('kubejs:bleed', 20 * 60, 0);
                    }
                } else {
                    player.potionEffects.add(effectType, 20 * 5, 0);
                    if (Math.random() < 0.3) {
                        player.potionEffects.add('kubejs:bleed', 20 * 60, 0);
                    }
                }
                return true;
            });

            // 服务器更新行为
            behavior.onServerUpdate(champion => {
                const entity = champion.getLivingEntity();
                const entityID = entity.getType();

                if (entityID !== "irons_spellbooks:fire_boss") return;

                const maxHealth = entity.getMaxHealth();
                const currentHealth = entity.getHealth();
                const healthPercent = currentHealth / maxHealth * 100;

                // 血量低于40%时
                if (healthPercent < 40) {
                    if (entity.tickCount % 100 === 0) {
                        entity.level.getEntities(
                            entity,
                            entity.getBoundingBox().inflate(6)
                        ).forEach(e => {
                            if (e && e.isLiving() && e.isPlayer()) {
                                e.potionEffects.add('kubejs:maximum_health_reduction', 20 * 10, 7);
                                if (Math.random() < 0.15) {
                                    e.potionEffects.add('irons_spellbooks:guided', 20 * 3, 0);
                                    entity.potionEffects.add('kubejs:hurt', 20 * 5, 1);
                                    entity.heal(entity.getMaxHealth() / 100)
                                }
                            }
                        });
                    }
                }
            });
        });
})

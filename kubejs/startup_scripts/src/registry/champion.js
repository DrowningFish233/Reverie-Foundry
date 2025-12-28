
// 闪避概率 = (1 - 当前血量百分比) * 0.4，上限 40 %
function getDodgeChance(entity) {
    const maxHealth = entity.getMaxHealth();
    const currentHealth = entity.getHealth();
    return Math.max(0, 1 - currentHealth / maxHealth) * 0.4;
}


StartupEvents.registry("champions:affix", event => {
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
                        entity.potionEffects.add("kubejs:hurt", 20 * 8, 0);
                        entity.potionEffects.add("minecraft:slowness", 20 * 8, 0);
                        entity.removeEffect("kubejs:tremor");
                        if (newTremorLevel < 1) {
                            entity.removeEffect("kubejs:tremor");
                        } else {
                            entity.potionEffects.add("kubejs:tremor", tremorEffect.getDuration(), newTremorLevel);
                        }
                    }
                }

                return true; // 总是返回布尔值
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
                // 随机选择一个debuff
                const selectedDebuff = debuffList[Math.floor(Math.random() * debuffList.length)];
                // 添加debuff
                const currentEffect = player.getEffect(selectedDebuff);
                let newAmplifier = 0;
                // 如果玩家已经有这个debuff，增加其等级
                // 否则添加新的debuff
                if (currentEffect) {
                    newAmplifier = currentEffect.getAmplifier() + 1;
                }
                player.potionEffects.add(selectedDebuff, 20 * 5, newAmplifier);
                return true;
            })
            behavior.onHeal((champion, amount) => {
                const entity = champion.getLivingEntity(); // 先获取实际的实体对象
                if (!entity) return false;

                const buffList = [
                    'minecraft:strength',
                    'minecraft:regeneration',
                    'minecraft:resistance',
                    'minecraft:fire_resistance',
                    'minecraft:speed',
                    'minecraft:jump_boost',
                    'minecraft:absorption',
                    'minecraft:health_boost'
                ];
                const selectedBuff = buffList[Math.floor(Math.random() * buffList.length)];
                const currentEffect = entity.getEffect(selectedBuff);
                let newAmplifier = 0;
                if (currentEffect) {
                    newAmplifier = currentEffect.getAmplifier() + 1;
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
            setting
        })
        .behavior(behavior => {
            behavior.onAttack((champion, target, damageSource, amount) => {
                if (target.isPlayer()) {
                    let player = target;
                    let item = player.mainHandItem;
                    const EnchantmentLevel = item.getEnchantmentLevel("minecraft:looting");
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
                return newAmount;
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
            setting
        })
        .behavior(behavior => {
            behavior.onDamage((champion, source, amount, newAmount) => {
                const player = source.getPlayer();
                if (player) {// 确保是玩家造成的伤害
                    const cap = Math.floor(player.getMaxHealth() * 0.2); // 上限：玩家最大生命 20%
                    const reflect = Math.min(Math.floor(amount * 0.25), cap);
                    player.attack($DamageSource("champions:reflection"), reflect);              // 反伤
                }
                return newAmount;
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
            setting
        })
        .behavior(behavior => {
            behavior.onDamage((champion, damageSource, amount, newAmount) => {
                let entity = champion.getLivingEntity()
                if (!entity) return amount;
                if (Math.random() < getDodgeChance(entity)) {
                    return 0; // 闪避
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

});

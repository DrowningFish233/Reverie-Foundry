let $ItemEntity = Java.loadClass("net.minecraft.world.entity.item.ItemEntity");

StartupEvents.registry("champions:affix", event => {
    event.create('fire_aura')
        .settings(setting => {
            setting.withDefault()
                .setPrefix("fire_aura.")
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
                .setPrefix("sanity.")
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
                .setPrefix("no_mana.")
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
                .setPrefix("radiation.")
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
                .setPrefix("attack_radiation.")
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
    event.create('naga')
        .settings(setting => {
            setting.withDefault()
                .setPrefix("naga.")
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
                const naga = champion.getLivingEntity();
                const maxHealth = naga.getMaxHealth();
                const currentHealth = naga.getHealth();
                const healthPercent = currentHealth / maxHealth * 100;

                if (!player || !player.isPlayer()) return false;
                if (player.isBlocking()) {
                    player.potionEffects.add('kubejs:tremor', 20 * 5, 1);
                }
                return true; // 总是返回布尔值
            });

            // 服务器更新行为
            behavior.onServerUpdate(champion => {
                const naga = champion.getLivingEntity();
                const maxHealth = naga.getMaxHealth();
                const currentHealth = naga.getHealth();
                const healthPercent = currentHealth / maxHealth * 100;

                // 血量低于75%时，增加速度和攻击力
                if (healthPercent < 75) {
                    naga.potionEffects.add('minecraft:strength', 60, 0);
                    naga.potionEffects.add('minecraft:speed', 60, healthPercent < 50 ? 1 : 0);
                }

                // 血量低于50%时，降低周围生物移动速度（降低检测频率）
                if (healthPercent < 50) {
                    if (naga.tickCount % 100 === 0) {
                        naga.level.getEntities(
                            naga,
                            naga.getBoundingBox().inflate(3)
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
                .setPrefix("lich.")
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
                if (!entity) return false; // 防止空指针错误

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
                .setPrefix("sticky.")
                .setCategory("defense")
            setting
        })
        .behavior(behavior => {
            behavior.onAttack((champion, target, damageSource, amount) => {
                if (target.isPlayer()) {
                    let player = target;
                    let item = player.mainHandItem;
                    const EnchantmentLevel = item.getEnchantmentLevel("jlme:curse_of_possession");
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
});

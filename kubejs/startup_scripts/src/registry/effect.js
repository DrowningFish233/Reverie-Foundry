// 酒类效果列表
const alcoholEffects = [
    "kubejs:lightingball", "kubejs:iceball", "kubejs:grape_beer",
    "kubejs:fireball", "kubejs:evergreen_gin", "kubejs:everclear",
    "kubejs:cinnamon_roll", "kubejs:caribbean_rum", "kubejs:bloody_mary",
    "kubejs:star_beam_rye", "kubejs:screwdriver", "kubejs:rum",
    "kubejs:red_wine", "kubejs:purple_haze", "kubejs:old_fashioned",
    "kubejs:moscow_mule", "kubejs:moonshine", "kubejs:margarita",
    "kubejs:white_wine", "kubejs:whiskey", "kubejs:vodka",
    "kubejs:tequila_sunrise", "kubejs:tequila"
];


StartupEvents.registry('mob_effect', event => {
    event.create('custom_effect')
        .color(0x000000)
        .beneficial()
        .effectTick((entity, lvl) => {
            if (!entity || entity.level.isClientSide()) return
            if (entity.server.tickCount % 20 == 0) {
                if (lvl >= 10) {
                    entity.removeEffect('kubejs:custom_effect');
                    return;
                }
                if (entity.hasEffect('kubejs:king')) {
                    if (lvl >= 8) {
                        entity.potionEffects.add('minecraft:fire_resistance', 20 * 3, 0, false, true);
                    }
                }
            }
        })
    event.create('custom_damage_effect')
        .color(0xFF0000)
        .harmful()
        .effectTick((entity, lvl) => {
            if (!entity || entity.level.isClientSide()) return;
            if (entity.server.tickCount % 20 == 0) {
                if (lvl >= 5) {
                    entity.removeEffect('kubejs:custom_damage_effect');
                    const damageAmount = entity.getMaxHealth() * 0.1;
                    entity.setHealth(entity.getHealth() - damageAmount);
                }
            }
        });
    event.create('king')
        .harmful()
        .color(0xFFFF00)
        .modifyAttribute('minecraft:generic.max_health',
            'a71bbf18-cd31-4996-ab5c-08863c704469',
            -5,
            "add_value"
        )
    event.create('hurt')
        .harmful()
        .color(0xFFFF00)
    event.create('towards_light')
        .beneficial()
        .color("white")

    event.create('numbness')
        .harmful()
        .color(0xFFFF00)
        .modifyAttribute('minecraft:generic.movement_speed',
            '26320779-89ab-4959-8925-2d35e8b502fc',
            -0.25,
            "add_multiplied_base"
        )
    event.create('seraph')
        .beneficial()
        .color(0xFFFF00)
    event.create('life_drain')
        .harmful()
        .color(0xFF0000)
        .effectTick((entity, lvl) => {
            if (!entity || entity.level.isClientSide()) return;
            if (entity.server.tickCount % 20 == 0) {
                const damageAmount = entity.getMaxHealth() * 0.05;
                entity.attack(entity.damageSources().magic(), damageAmount);
            }
        });


    event.create('kubejs:bleed')
        .harmful()
        .color("red")
    event.create('gluttony')
        .harmful()
        .color("green")
    event.create('sloth')
        .harmful()
        .color("yellow")
    event.create('morning_moodiness')
        .beneficial()
        .color("yellow")
    event.create('sloth_2')
        .beneficial()
        .color("yellow")
    event.create('morning_moodiness_2')
        .beneficial()
        .color("yellow")
        .modifyAttribute('minecraft:generic.attack_damage',
            '0c9e47f2-97d9-40e4-9191-f99cb363281a',
            -0.8,
            'add_multiplied_base'
        )
        .modifyAttribute('minecraft:generic.attack_speed',
            'b36c6ff9-c90b-410d-94e9-46d620097258',
            -0.99,
            'add_multiplied_base'
        );
    event.create('envy')
        .beneficial()
        .color("purple")
    event.create('wider')
        .beneficial()
        .color("yellow")
    /** 
    .modifyAttribute('additionalentityattributes:generic.model_width',
        '96f7303f-6fb4-4b30-9b5b-06bb963e5e0f',
        0.5,
        'add_value'
    );
    */
    event.create('narrower')
        .beneficial()
        .color("yellow")
    /** 
.modifyAttribute('additionalentityattributes:generic.model_height',
    'e0507131-d302-46b7-a967-bfc602e4beed',
    0.5,
    'add_value'
);
*/
    event.create('lust')
        .beneficial()
        .color("purple")
    event.create('pride')
        .beneficial()
        .color("purple")
    event.create('wrath')
        .beneficial()
        .color("red")
    event.create('wrath_damage')
        .harmful()
        .color("red")
    event.create('greed')
        .beneficial()
        .color("blue")
        .modifyAttribute('additional_attributes:keep_scroll',
            'c1d207fb-7eb3-47ad-b669-9e8ddb81ba40',
            0.15,
            'add_value'
        )
        .modifyAttribute('additional_attributes:looting',
            'aece9dee-0b04-4916-a6a6-15016746463a',
            2,
            'add_value'
        )
        .modifyAttribute('additional_attributes:harvest',
            'be50d492-891b-41e9-a497-12f807b75d42',
            2,
            'add_value'
        )
        .modifyAttribute('additional_attributes:fishing_lure',
            '81f8e10e-b8e9-4e27-949c-ba961a234bee',
            2,
            'add_value'
        )
        .modifyAttribute('apothic_attributes:experience_gained',
            'fc6a2ef3-4460-4558-9a95-07e491a9d350',
            0.30,
            'add_value'
        )
    event.create('random_movement')
        .harmful()
        .color("red")
    event.create('fight_to_death')
        .beneficial()
        .color("pink")

    event.create('fluxing')
        .beneficial()
        .color("pink")

    event.create('exp_drop')
        .beneficial()
        .color("pink")
    event.create('blue_star')
        .beneficial()
        .color("blue")
    event.create('disillusionment')
        .beneficial()
        .color("blue")
    event.create('ban_disillusionment')
        .beneficial()
        .color("blue")
    event.create('six_life_death')
        .harmful()
        .color("blue")
    event.create('pride_2')
        .harmful()
        .color("blue")
        .modifyAttribute('minecraft:generic.attack_speed',
            'a102cdc2-08b4-4a29-833a-2f1e573356ad',
            -0.05,
            'add_multiplied_base'
        )
        .modifyAttribute('minecraft:generic.attack_damage',
            '6e70d7df-e2bc-4a6d-b58b-30542d0b2bd1',
            0.1,
            'add_multiplied_base'
        )
    //理智
    event.create('sanity')
        .harmful()
        .color("blue")
    //opal
    event.create('bloodjade')
        .harmful()
        .color("blue")
    event.create('naughty')
        .harmful()
        .color("blue")
    event.create('pearl')
        .harmful()
        .color("blue")
        .modifyAttribute('minecraft:generic.luck',
            '97937a21-766a-467d-a4dc-905f011e6bd3',
            1,
            'add_value'
        )

    event.create('fire')
        .beneficial()
        .color("red")
        .effectTick((entity, lvl) => {
            if (!entity || entity.level.isClientSide()) return;
            if (entity.server.tickCount % 100 == 0) {
                const fireEffect = entity.getEffect("kubejs:fire");

                const currentLevel = fireEffect.getAmplifier() + 1;
                const newLevel = Math.floor(currentLevel / 2);

                entity.attack($DamageSource("lava"), currentLevel * 2);
                entity.removeEffect("kubejs:fire");
                if (newLevel > 0) {
                    entity.potionEffects.add("kubejs:fire", 300, newLevel - 1);
                }
            }
        });
    event.create('soul_fire')
        .beneficial()
        .color("red")
        .effectTick((entity, lvl) => {
            if (!entity || entity.level.isClientSide()) return;
            if (entity.server.tickCount % 80 == 0) {
                const fireEffect = entity.getEffect("kubejs:soul_fire");

                const currentLevel = fireEffect.getAmplifier() + 1;
                const newLevel = Math.floor(currentLevel / 2);

                entity.attack($DamageSource("lava"), currentLevel * 2 * 1.5);
                entity.removeEffect("kubejs:soul_fire");
                if (newLevel > 0) {
                    entity.potionEffects.add("kubejs:soul_fire", 300, newLevel - 1);
                }
            }
        });
    event.create('miracle_blight')
        .harmful()
        .color("red")
        .effectTick((entity, lvl) => {
            if (!entity || entity.level.isClientSide()) return;
            if (entity.server.tickCount % 20 == 0) {
                if (entity.hasEffect("kubejs:decay")) {
                    if (entity.isPlayer()) {
                        const maxHealth = entity.getMaxHealth();
                        const damageAmount = maxHealth * 0.1;
                        const currentHealth = entity.getHealth();

                        let newHealth = currentHealth - damageAmount;
                        if (newHealth < 0) {
                            newHealth = 0;
                        }
                        entity.setHealth(newHealth);

                        if (newHealth <= 0) {
                            entity.kill();
                        }
                    } else {
                        const currentHealth = entity.getHealth();

                        let newHealth = currentHealth - 5;
                        if (newHealth < 0) {
                            newHealth = 0;
                        }
                        entity.setHealth(newHealth);

                        if (newHealth <= 0) {
                            entity.kill();
                        }
                    }
                }
            }
        });
    event.create('damage_amplification')
        .beneficial()
        .color("red")
    event.create('rose')
        .beneficial()
        .color("red")
    event.create('blood_rose')
        .beneficial()
        .color("red")
    //脑袋尖尖buff ↓
    event.create('spinel')
        .color(0x000000)
        .beneficial()
        .effectTick((entity, lvl) => {
            if (!entity || entity.level.isClientSide()) return
            if (entity.server.tickCount % 50 == 0) {
                let spinel_level = lvl
                entity.potionEffects.add('minecraft:strength', 20 * 3, spinel_level, false, true);
            }
        })
    event.create('no_adrenaline')
        .beneficial()
        .color("red")
    event.create('use_adrenaline')
        .beneficial()
        .color("red")
    event.create('heart_of_darkness')
        .beneficial()
        .color("red")
    event.create('verdun')
        .beneficial()
        .color("red")
    event.create('dragonsteel_lightning_ingot_attack')
        .beneficial()
        .color("aqua")
    event.create('dragonsteel_ice_ingot_attack')
        .beneficial()
        .color("aqua")
    event.create('dragonsteel_ice_ingot_ice')
        .beneficial()
        .color("aqua")
        .modifyAttribute('minecraft:generic.movement_speed',
            '1aaaf8d5-ac1b-4d91-81cc-c07e9f1a25e6',
            -1,
            'add_multiplied_total'
        )
    event.create('dragonsteel_armor_break')
        .harmful()
        .color("red")
        .modifyAttribute('minecraft:generic.armor',
            '47ffc42d-8987-45cf-a536-9cfe3f2ee0b3',
            -5,
            'add_value'
        )
    event.create('moon')
        .beneficial()
        .color("blue")
    event.create('thermal_springstone_ingot')
        .beneficial()
        .color("red")
        .modifyAttribute('eternal_starlight:generic.fire_resistance',
            '28b863d2-ecf2-45cb-94a3-19b427a272dc',
            '0.19',
            'add_value'
        )

    event.create('chainmail_arrow')
        .beneficial()
        .color("yelow")
    event.create('achroous_ingot')
        .beneficial()
        .color("green")
    event.create('overload_buff_1')
        .beneficial()
        .color("yelow")
        .modifyAttribute('minecraft:generic.knockback_resistance',
            '2dfd0d88-5af6-4de4-b5cd-7e73a6b9a355',
            1,
            'add_value'
        )
    event.create('overload_buff_2')
        .beneficial()
        .color("yelow")
        .modifyAttribute('minecraft:generic.movement_speed',
            '2db249c2-f1b5-4b2b-b402-75ba513553b5',
            1,
            'add_multiplied_base'
        )
    event.create('overload_debuff_1')
        .beneficial()
        .color("yelow")
        .modifyAttribute('minecraft:generic.max_health',
            '0c1df930-7a70-48fb-b84b-3f2f98337093',
            -0.5,
            'add_multiplied_total'
        )
    event.create('absorption')
        .beneficial()
        .color("yelow")
        .modifyAttribute('minecraft:generic.max_absorption',
            '47b94def-98c5-4faa-a49f-3cd178f3c741',
            20,
            'add_value'
        )

    event.create('prismarine_crystals_1')
        .beneficial()
        .color("yelow")
        .modifyAttribute('minecraft:generic.attack_speed',
            'c23002d4-caf4-4f2b-8686-0ef8df37ad2e',
            0.5,
            'add_multiplied_base'
        )
        .modifyAttribute('minecraft:generic.movement_speed',
            'cf7d48cf-38ab-4543-8098-090ab0a39f0d',
            0.3,
            'add_multiplied_base'
        )
    event.create('vomit')
        .color(0x000000)
        .harmful()
        .effectTick((entity, lvl) => {
            if (!entity || entity.level.isClientSide()) return;
            if (entity.server.tickCount % 20 == 0) {
                if (entity.getType() !== "minecraft:player") return;
                let currentFood = entity.getFoodLevel();
                let foodReduction = (lvl + 1) * 2;
                entity.setFoodLevel(Math.max(currentFood - foodReduction, 0));
                let currentSaturation = entity.getSaturation();
                entity.setSaturation(Math.max(currentSaturation - foodReduction, 0));
                entity.removeEffect("kubejs:vomit");
            }
        });
    event.create('gold_body')
        .beneficial()
        .color("gold")
    event.create('echo_shard')
        .beneficial()
        .color("green")

    event.create('ponder')
        .color(0x000000)
        .harmful()
        .effectTick((entity, lvl) => {
            if (!entity || entity.level.isClientSide()) return;
            if (entity.server.tickCount % 20 == 0) {
                const direction = Math.floor(Math.random() * 4);
                let dx = 0;
                let dz = 0;
                entity.hurtMarked = true

                switch (direction) {
                    case 0: dz = 0.8; break;  // 前
                    case 1: dz = -0.8; break; // 后
                    case 2: dx = 0.8; break;  // 右
                    case 3: dx = -0.8; break; // 左
                }
                entity.setMotion(dx, 0, dz);
            }
        });
    event.create('ponder_up')
        .color(0x000000)
        .harmful()
        .effectTick((entity, lvl) => {
            if (!entity || entity.level.isClientSide()) return;
            if (entity.server.tickCount % 20 == 0) {
                entity.hurtMarked = true
                entity.setMotion(0, lvl, 0);
                entity.removeEffect("kubejs:ponder_up");
            }
        });
    event.create('taunt')
        .color(0x000000)
        .harmful()
        .effectTick((mob, lvl) => {
            if (!mob || mob.level.isClientSide()) return
            if (mob.server.tickCount % 20 == 0) {
                let mobAABB = mob.boundingBox.inflate(8)
                mob.level.getEntitiesWithin(mobAABB).forEach(entity => {
                    if (!entity) return
                    if (entity === mob) return
                    if (!entity.isLiving() || !entity.isAlive()) return;
                    if (typeof entity.setTarget === 'function') {
                        entity.setTarget(mob);
                    }
                })
            }
        });
    event.create('taunt_2')
        .color(0x000000)
        .harmful()
        .effectTick((mob, lvl) => {
            if (!mob || mob.level.isClientSide()) return
            if (mob.server.tickCount % 20 == 0) {
                let mobAABB = mob.boundingBox.inflate(10)
                mob.level.getEntitiesWithin(mobAABB).forEach(entity => {
                    if (!entity) return
                    // 排除实体自身，防止自残
                    if (entity === mob) return
                    if (!entity.isLiving() || !entity.isAlive()) return;
                    if (typeof entity.setTarget === 'function') {
                        mob.setTarget(entity);
                    }
                })
            }
        });
    event.create('attack_taunt')
        .color(0x000000)
        .beneficial()
        .modifyAttribute('minecraft:generic.attack_damage',
            'd7d41070-2b63-4903-b3ec-e540b5b7cc96',
            -0.3,
            "add_multiplied_total"
        );
    event.create('one_six_seven_four')
        .color(0x000000)
        .beneficial()
    event.create('tremor')
        .color(0x000000)
        .harmful()
        .modifyAttribute('minecraft:generic.movement_speed',
            '3e5d6e4d-d4af-4974-90bc-967c96064fec',
            -0.05,
            "add_multiplied_total"
        );
    event.create('eye')
        .color(0x000000)
        .harmful()
    event.create('gaze')
        .color(0x000000)
        .beneficial()
    event.create('ignitium_ingot')
        .color(0x000000)
        .beneficial()

    event.create('chaotic_teleport')
        .color(0x000000)
        .beneficial()


    event.create('blazing_magic')
        .color(0x000000)
        .beneficial()
        .modifyAttribute('irons_spellbooks:spell_power',
            '7d0ac0b5-0fee-4016-935d-eaa1f697f4ff',
            0.04,
            "add_multiplied_total"
        );


    event.create('ghost_ingot')
        .color(0x000000)
        .harmful()
    event.create('protect')
        .color(0x000000)
        .beneficial()
    //加护
    event.create('protection')
        .color(0x000000)
        .beneficial()
        .modifyAttribute('minecraft:generic.attack_damage',
            '0815c826-4fd2-4124-bcfd-d3da31af4a2c',
            -0.1,
            "add_multiplied_base"
        );
    //绝望
    event.create('despair')
        .color(0x000000)
        .beneficial()
        .modifyAttribute('minecraft:generic.attack_damage',
            '21027bce-43bb-4329-b434-a9e0dabdcf5e',
            0.3,
            "add_multiplied_base"
        );
    event.create('fiery_tears_1')
        .color("red")
        .beneficial()
        .modifyAttribute('irons_spellbooks:fire_spell_power',
            '669ddce3-bc77-477f-abb5-066d433d9ad7',
            0.1,
            "add_multiplied_base"
        );
    event.create('fiery_tears_2')
        .color("red")
        .beneficial()

    //harmful_effect:
    event.create('no_block')
        .color("red")
        .harmful()

    event.create('bloodlust')
        .color("red")
        .harmful()
    event.create('bloodlust_attack')
        .color("red")
        .beneficial()

    event.create('moon_effect')
        .color("red")
        .beneficial()
        .modifyAttribute('irons_spellbooks:casting_movespeed',
            '0c4fff55-4009-4970-9715-8770b3ddc49a',
            0.4,
            "add_multiplied_base"
        )
        .modifyAttribute('irons_spellbooks:cooldown_reduction',
            'd18e5cf8-8e74-40d1-aea3-a8a0aa868ea8',
            -0.2,
            "add_multiplied_base"
        );
    event.create('quarter')
        .color("red")
        .beneficial()
        .modifyAttribute('minecraft:generic.max_health',
            '79159634-6e87-47d9-b876-565a2b215f42',
            0.2,
            "add_multiplied_base"
        )
        .modifyAttribute('minecraft:generic.attack_damage',
            '84cd0fd2-5a85-4070-a684-b990a5e67672',
            0.2,
            "add_multiplied_base"
        );
    event.create('waxing_gibbous')
        .color("red")
        .beneficial()
        .modifyAttribute('irons_spellbooks:spell_power',
            '14fd5d4c-7990-40a4-8398-5b8adf77a053',
            -0.2,
            "add_multiplied_base"
        )
        .modifyAttribute('irons_spellbooks:mana_regen',
            '995d0e8c-8fbf-4a97-a54d-43c2cad4b19a',
            0.2,
            "add_multiplied_base"
        );
    event.create('new_moon')
        .color("red")
        .beneficial()
        .modifyAttribute('minecraft:generic.movement_speed',
            '8cbc7ade-b03d-4788-84b1-9af42bb42b3b',
            0.2,
            "add_multiplied_base"
        )
        .modifyAttribute('minecraft:generic.armor',
            'b85a5f1a-d024-4061-83dd-c53b2ac0d9af',
            -0.2,
            "add_multiplied_base"
        )
        .modifyAttribute('minecraft:generic.armor_toughness',
            '41bab2ab-98df-4e4d-b606-8e0c5446a52c',
            -0.2,
            "add_multiplied_base"
        )
        .modifyAttribute('minecraft:generic.attack_damage',
            'd4d1779f-435f-43f2-a755-37a8732d4b83',
            0.35,
            "add_multiplied_base"
        );
    event.create('full_moon')
        .color("red")
        .beneficial()
        .modifyAttribute('irons_spellbooks:spell_power',
            '37053933-c4a7-45d9-a36d-cb1c70c84535',
            0.3,
            "add_multiplied_base"
        )
    event.create('waxing_crescent')
        .color("red")
        .beneficial()
        .modifyAttribute('malum:malignant_conversion',
            '8d466453-d2c2-462b-afeb-ccc581985e33',
            0.5,
            "add_multiplied_base"
        );

    event.create('rune_of_deflection')
        .color("blue")
        .beneficial()
    event.create('instant_death')
        .beneficial()
        .color("black")
        .effectTick((entity, lvl) => {
            if (!entity || entity.level.isClientSide()) return;
            if (entity.server.tickCount % 20 == 0) {
                entity.kill()
            }
        });
    event.create('adaptive_damage_reduction')
        .beneficial()
        .color("black")
    event.create('ignore_cooldown')
        .beneficial()
        .color("blue")
    event.create('eternal_life')
        .beneficial()
        .color("blue")
    event.create('is_addiction')
        .harmful()
        .color("pink_dye")
    event.create('addiction')
        .harmful()
        .color("red")
        .effectTick((entity, lvl) => {
            if (!entity || entity.level.isClientSide()) return;
            if (entity.server.tickCount % 400 == 0) {
                if (!entity.isPlayer()) return;
                const pData = entity.persistentData;
                let addiction_Integer = pData.getInt('addiction') ?? 0;

                // 如果当前吃了溶液
                if (entity.hasEffect("kubejs:is_addiction")) {
                    const is_addiction_level = entity.getEffect("kubejs:is_addiction")
                    const Level = is_addiction_level.getAmplifier() + 1;
                    entity.potionEffects.add('kubejs:damage_amplification', 200, Level);
                    if (addiction_Integer > 16) {
                        pData.putInt('addiction', 0);
                        entity.kill();
                    }
                    return;
                }
                // 正常检查所有效果
                if (addiction_Integer > 8 && addiction_Integer <= 8) {
                    entity.potionEffects.add('minecraft:nausea', 200, 0);
                    entity.potionEffects.add('kubejs:vomit', 200, 0);
                    entity.potionEffects.add('kubejs:king', 300, 0);
                } else if (addiction_Integer > 12 && addiction_Integer <= 12) {
                    entity.potionEffects.add('minecraft:nausea', 200, 0);
                    entity.potionEffects.add('minecraft:darkness', 200, 0);
                    entity.potionEffects.add('minecraft:blindness', 200, 0);
                    entity.potionEffects.add('kubejs:vomit', 200, 1);
                    entity.potionEffects.add('kubejs:king', 300, 1);
                } else if (addiction_Integer > 16) {
                    pData.putInt('addiction', 0);
                    entity.kill();
                }
            }
        });
    event.create('withdrawal')
        .harmful()
        .color("red")
        .modifyAttribute('irons_spellbooks:max_mana',
            'bfcc1114-242d-4949-802c-fa784c2fb4ce',
            -0.5,
            "add_multiplied_base"
        )
        .modifyAttribute('malum:healing_received',
            '6c61e869-1213-4e95-b9c1-191b419446e2',
            -0.5,
            "add_multiplied_base"
        )
    event.create('plague')
        .harmful()
        .color("green")
    event.create('radiance')
        .harmful()
        .color("green")
    event.create('alcohol_poisoning')
        .harmful()
        .color("green")
        .effectTick((entity, lvl) => {
            if (!entity || entity.level.isClientSide()) return;
            if (entity.server.tickCount % 20 == 0) {
                let maxHealth = entity.getMaxHealth();
                let baseDamage = maxHealth * 0.03;

                let effectCount = 0;
                alcoholEffects.forEach(effectId => {
                    if (entity.hasEffect(effectId)) effectCount++;
                });

                let damage = baseDamage + (maxHealth * 0.02 * effectCount);
                let newHealth = Math.max(1, entity.getHealth() - damage);
                entity.setHealth(newHealth);
            }
        });
    event.create('grape_beer')
        .beneficial()
        .color("pink")
        .modifyAttribute('minecraft:generic.armor',
            '64b83f3a-c1a7-4ff4-8d15-d7ed385be23b',
            -0.03,
            "add_multiplied_base"
        )
        .modifyAttribute('minecraft:generic.armor_toughness',
            '6c61e869-1213-4e95-b9c1-191b419446e2',
            -0.03,
            "add_multiplied_base"
        )
    event.create('red_wine')
        .beneficial()
        .color("red")
        .modifyAttribute('malum:healing_received',
            'a4cb8df6-a815-44c2-be3a-c633bcd1bcae',
            -0.1,
            "add_multiplied_base"
        )
    event.create('whiskey')
        .beneficial()
        .color("red")
        .modifyAttribute('minecraft:generic.armor',
            'c516356b-31a8-43d8-a458-2bf53f9dd766',
            -0.1,
            "add_multiplied_base"
        )
        .modifyAttribute('minecraft:generic.armor_toughness',
            'dea3c052-8b28-46b5-84c9-056276080bb0',
            -0.1,
            "add_multiplied_base"
        )
        .modifyAttribute('apothic_attributes:crit_chance',
            'a233df5c-6dca-464d-803e-805f3aabd5ec',
            0.02,
            "add_multiplied_base"
        )
        .modifyAttribute('minecraft:generic.attack_knockback',
            '5248f5f0-01ff-47cc-9415-be09a459b705',
            0.2,
            "add_multiplied_base"
        )
    event.create('tequila')
        .beneficial()
        .color("red")
        .modifyAttribute('minecraft:generic.armor',
            '128435f4-9578-4d27-9f8d-13cbeb7c1ee3',
            5,
            "add_value"
        )
        .modifyAttribute('minecraft:generic.attack_knockback',
            '2acc3b98-c7e0-4a2d-a824-415490db304f',
            0.1,
            "add_multiplied_base"
        )
        .modifyAttribute('apothic_attributes:crit_chance',
            'a233df5c-6dca-464d-803e-805f3aabd5ec',
            0.04,
            "add_multiplied_base"
        )
        .modifyAttribute('malum:healing_received',
            '76b2017c-f2d3-46f4-a984-72b8269aa00e',
            -0.15,
            "add_multiplied_base"
        )
    event.create('rum')
        .beneficial()
        .color("red")
        .modifyAttribute('malum:healing_received',
            '5826fa12-51ff-4a78-9b36-8c40bee7c512',
            0.2,
            "add_multiplied_base"
        )
        .modifyAttribute('minecraft:generic.armor',
            'c9b2b18a-057d-4cfa-b149-9c2cc3a88f39',
            -0.05,
            "add_multiplied_base"
        )
        .modifyAttribute('minecraft:generic.movement_speed',
            '80f7e649-de3e-4042-8833-52a95dfd6f35',
            0.1,
            "add_multiplied_base"
        )
    event.create('fireball')
        .beneficial()
        .color("red")
        .modifyAttribute('irons_spellbooks:fire_spell_power',
            '53e26a4c-a0bb-4461-8585-5feb2fbc5d13',
            0.25,
            "add_multiplied_base"
        )
        .modifyAttribute('irons_spellbooks:fire_magic_resist',
            '24f0405b-5a18-448f-9ad7-4c8fb8c06d4e',
            0.15,
            "add_multiplied_base"
        )
        .modifyAttribute('malum:healing_received',
            '7060fbe5-cfa2-4ced-bd26-1df25d10348e',
            -0.2,
            "add_multiplied_base"
        )
    event.create('iceball')
        .beneficial()
        .color("red")
        .modifyAttribute('irons_spellbooks:ice_spell_power',
            '13113e8e-f505-4336-b483-1403d547277a',
            0.25,
            "add_multiplied_base"
        )
        .modifyAttribute('irons_spellbooks:ice_magic_resist',
            '0c7277d3-2528-4d46-b59b-702250aa3974',
            0.15,
            "add_multiplied_base"
        )
        .modifyAttribute('malum:healing_received',
            'feba44a1-7a0d-447f-b6a1-2ef6b5cc6016',
            -0.2,
            "add_multiplied_base"
        )
    event.create('lightingball')
        .beneficial()
        .color("red")
        .modifyAttribute('irons_spellbooks:lightning_spell_power',
            'd23c7dfc-9817-4e43-8cf8-7e4a0b3db367',
            0.25,
            "add_multiplied_base"
        )
        .modifyAttribute('irons_spellbooks:lightning_magic_resist',
            '647a5570-75e0-4d71-bbbb-761a48047eec',
            0.15,
            "add_multiplied_base"
        )
        .modifyAttribute('malum:healing_received',
            '55cb1127-5f29-43c2-9714-a44eb7aa3316',
            -0.2,
            "add_multiplied_base"
        )
    event.create('purple_haze')
        .beneficial()
        .modifyAttribute('minecraft:generic.armor',
            '10591619-2abe-4c3c-a0f1-584b9b9f5229',
            -0.1,
            "add_multiplied_base"
        )
        .modifyAttribute('minecraft:generic.armor_toughness',
            'c856de69-8221-40f0-a59e-877de436e9ef',
            -0.1,
            "add_multiplied_base"
        )
        .modifyAttribute('aces_spell_utils:evasive',
            '5b386986-bb0e-4543-ac3a-1723ea9e48c3',
            2,
            "add_value"
        )
    /**
event.create('purple_haze_attack')
    .beneficial()
     */
    event.create('vodka')
        .beneficial()
        .modifyAttribute('apothic_attributes:crit_chance',
            '6d04d6fe-30c0-4803-9b3b-5bc7cdaed954',
            0.02,
            "add_multiplied_base"
        )
        .modifyAttribute('malum:healing_received',
            '101fa4ca-2391-4a5c-bd71-71612a01f2fb',
            -0.1,
            "add_multiplied_base"
        )
        .modifyAttribute('minecraft:generic.armor',
            'f600df87-0523-45cd-b2db-f05ab0e883ca',
            -0.05,
            "add_multiplied_base"
        )
        .modifyAttribute('minecraft:generic.armor_toughness',
            '43ecc079-d763-4c63-8ef0-7b6718c31f45',
            -0.05,
            "add_multiplied_base"
        )
    event.create('screwdriver')
        .beneficial()
        .modifyAttribute('apothic_attributes:draw_speed',
            '9afc298b-649a-419c-bedd-cab3fc4dde64',
            0.25,
            "add_multiplied_base"
        )
        .modifyAttribute('apothic_attributes:projectile_damage',
            'b9221249-dbeb-49e9-846c-e22d5dd640d0',
            0.25,
            "add_multiplied_base"
        )
        .modifyAttribute('malum:healing_received',
            '101fa4ca-2391-4a5c-bd71-71612a01f2fb',
            -0.1,
            "add_multiplied_base"
        )
    event.create('white_wine')
        .beneficial()
        .modifyAttribute('irons_spellbooks:spell_power',
            '1196fa4a-615a-4749-a80f-8be1e0a1c48a',
            0.08,
            "add_multiplied_base"
        )
        .modifyAttribute('malum:healing_received',
            'cc8ab85e-9182-4c94-b98e-625839a33ed8',
            -0.1,
            "add_multiplied_base"
        )
        .modifyAttribute('minecraft:generic.armor',
            '69702d20-7d4b-48a3-8c95-d5a453afc650',
            -0.06,
            "add_multiplied_base"
        )
        .modifyAttribute('minecraft:generic.armor_toughness',
            'f84a3e34-28a8-410a-87ad-1cec38f28b89',
            -0.06,
            "add_multiplied_base"
        )
    event.create('evergreen_gin')
        .beneficial()
        .modifyAttribute('minecraft:generic.attack_damage',
            '393c2a38-e89c-4262-a6ff-0393a720370c',
            0.08,
            "add_multiplied_base"
        )
        .modifyAttribute('malum:healing_received',
            '8c46adb3-12ea-458b-afc7-163fe408ae01',
            -0.1,
            "add_multiplied_base"
        );
    event.create('caribbean_rum')
        .beneficial()
        .modifyAttribute('malum:healing_received',
            'b78ac305-5e67-47cb-9b77-96199353c4a1',
            0.2,
            "add_multiplied_base"
        )
        .modifyAttribute('minecraft:generic.movement_speed',
            '7c8fbcbd-ff83-48c4-80f2-0c83483d1d27',
            0.1,
            "add_multiplied_base"
        )
        .modifyAttribute('minecraft:generic.armor',
            '69b67c79-dd5d-4097-8a2e-396f264a92e0',
            -0.05,
            "add_multiplied_base"
        )
        .modifyAttribute('minecraft:generic.armor_toughness',
            '6dabae31-6fd3-4b5b-b88a-79ceed5921f2',
            -0.05,
            "add_multiplied_base"
        )
    event.create('margarita')
        .beneficial()
    event.create('old_fashioned')
        .beneficial()
        .modifyAttribute('malum:healing_received',
            '964e828c-1e9c-4d66-88fa-23b3dbcf3296',
            0.5,
            "add_multiplied_base"
        )
    event.create('everclear')
        .beneficial()
        .modifyAttribute('malum:healing_received',
            '789be927-f1e1-4820-b6e7-e566bc53301f',
            -0.4,
            "add_multiplied_base"
        )
        .modifyAttribute('minecraft:generic.armor',
            '8f7a4012-13dd-4409-b894-5b89e198ba78',
            -0.3,
            "add_multiplied_base"
        )
        .modifyAttribute('minecraft:generic.armor_toughness',
            '99445c68-18d7-431b-a864-32c239d4ef32',
            -0.3,
            "add_multiplied_base"
        )
    event.create('bloody_mary')
        .beneficial()
        .modifyAttribute('minecraft:generic.armor',
            '11d99f6f-99f6-4c45-bd8f-30ca03367e0a',
            -0.04,
            "add_multiplied_base"
        )
        .modifyAttribute('minecraft:generic.armor_toughness',
            'd0b3d51b-5f5b-40ef-91ce-b5dd64e234fe',
            -0.04,
            "add_multiplied_base"
        )
        .modifyAttribute('malum:healing_received',
            '8e4b695e-2027-4763-b79f-16ca9987aeb7',
            -0.35,
            "add_multiplied_base"
        )
        .modifyAttribute('minecraft:generic.movement_speed',
            '0d9353b6-d26d-4112-bd67-2034b8eceb79',
            0.1,
            "add_multiplied_base"
        )
    event.create('star_beam_rye')
        .beneficial()
        .modifyAttribute('minecraft:generic.armor',
            '317e6fff-97d7-4237-89bd-9af20b4a1b34',
            -0.06,
            "add_multiplied_base"
        )
        .modifyAttribute('minecraft:generic.armor_toughness',
            '2a219bf3-6ec2-4778-9bf4-2a643229d5d3',
            -0.06,
            "add_multiplied_base"
        )
        .modifyAttribute('malum:healing_received',
            '307842e6-17f5-4f21-af63-60f4b558a214',
            -0.2,
            "add_multiplied_base"
        )
        .modifyAttribute('irons_spellbooks:spell_power',
            'cf0631c3-98b1-4008-9789-c94d232bdcd8',
            0.08,
            "add_multiplied_base"
        )
    event.create('moonshine')
        .beneficial()
        .modifyAttribute('malum:healing_received',
            '5b6035a9-bb70-4fc7-97fe-ae32e86035a3',
            -0.1,
            "add_multiplied_base"
        )
        .modifyAttribute('minecraft:generic.armor',
            'cdcbafb7-b1bc-4603-8b2a-ab4097d45391',
            10,
            "add_value"
        )
    event.create('moscow_mule')
        .beneficial()
        .modifyAttribute('minecraft:generic.attack_knockback',
            'b210878e-38c4-49cc-a366-5f05864bf959',
            0.5,
            "add_multiplied_base"
        )
        .modifyAttribute('terra_entity:player.summon_knockback',
            'd74521fb-bce6-4b44-a3d4-b4a7d7bb5982',
            0.5,
            "add_multiplied_base"
        )
        .modifyAttribute('apothic_attributes:crit_chance',
            '798e547c-f5ab-4582-ad60-8172b20aef60',
            0.03,
            "add_multiplied_base"
        )
        .modifyAttribute('malum:healing_received',
            'f2f2e024-f94f-4f94-a775-b36bdaf214e8',
            -0.3,
            "add_multiplied_base"
        )
    event.create('cinnamon_roll')
        .beneficial()
        .modifyAttribute('irons_spellbooks:mana_regen',
            '3723ba6f-2620-4b5c-902c-06daf4465737',
            0.5,
            "add_multiplied_base"
        );
    event.create('tequila_sunrise')
        .beneficial()
    event.create('electrified')
        .harmful()
        .modifyAttribute('irons_spellbooks:lightning_magic_resist',
            '267b83cf-6d6e-425b-8374-5db5c2ac5482',
            0.02,
            "add_multiplied_base"
        );

    event.create('melting_eyeball_ego_effect')
        .beneficial()

    event.create('lucid')
        .beneficial()

    event.create('eternal_starlight')
        .beneficial()
    event.create('eternal_starlight_speed')
        .beneficial()
        .modifyAttribute('minecraft:generic.attack_speed',
            'a86e2bf0-c9fc-4f59-bdc1-fdc94b193a86',
            0.1,
            "add_multiplied_base"
        );
    event.create('eternal_starlight_attack')
        .beneficial()
        .modifyAttribute('minecraft:generic.attack_damage',
            '4bcab1ec-6399-4b2d-8ed4-8f36f7cb2d06',
            0.1,
            "add_multiplied_base"
        );
    event.create('minion_capacity')
        .beneficial()
        .modifyAttribute('terra_entity:player.minion_capacity',
            'b25729d3-cb4d-4239-a32e-906f4fd37983',
            1,
            "add_value"
        )
        .modifyAttribute('irons_spellbooks:evocation_spell_power',
            '1a6b3a79-a59e-4875-b40d-2a33be090a46',
            0.15,
            "add_multiplied_base"
        )
        .modifyAttribute('terra_entity:player.summon_damage',
            '287085dd-bf43-48dd-8c47-535c45264ea3',
            0.15,
            "add_multiplied_base"
        );
    event.create('tenacious_vine')
        .beneficial()
    event.create('paralysis')
        .harmful()
    event.create('plunder')
        .beneficial()
    event.create('terraulite_ingot_effect')
        .beneficial()
        .modifyAttribute('malum:healing_received',
            'bd5950dc-79cb-4567-89e8-0d560deb397a',
            0.2,
            "add_multiplied_total"
        );

    event.create('maximum_health_reduction')
        .harmful()
        .color(0xFFFF00)
        .modifyAttribute('minecraft:generic.max_health',
            'a2d6b5be-7e9a-4604-9201-897eb8143d79',
            -0.05,
            "add_multiplied_base"
        )
    event.create('smoldering')
        .harmful()
    event.create('decay')
        .harmful()
    event.create('elemental_mix')
        .harmful()
    event.create('spell_power_increase')
        .beneficial()
        .color(0xFFFF00)
        .modifyAttribute('irons_spellbooks:spell_power',
            '4a8a687f-ba07-411e-a58f-90ab6154a4c1',
            0.1,
            "add_multiplied_base"
        )

}); 
const $DamageSource = Java.loadClass("net.minecraft.world.damagesource.DamageSource");

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
    event.create('strip')
        .beneficial()
        .color(0xFFFF00)
    event.create('set_numbness')
        .beneficial()
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
    event.create('twin_shadows')
        .beneficial()
        .color("white_dye")
        .modifyAttribute('minecraft:generic.attack_speed',
            'c047331e-1678-47e0-b6df-c9c4b2ac29e8',
            0.5,
            'add_multiplied_base'
        )
        .modifyAttribute('minecraft:generic.attack_damage',
            '5d7cbf71-f7ba-46c0-a2b9-6303529f76a9',
            -0.25,
            "add_multiplied_base"
        );
    event.create('exalted_beauty_gem')
        .beneficial()
        .color("green")
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
        .modifyAttribute('additionalentityattributes:generic.model_width',
            '96f7303f-6fb4-4b30-9b5b-06bb963e5e0f',
            0.5,
            'add_value'
        );
    event.create('narrower')
        .beneficial()
        .color("yellow")
        .modifyAttribute('additionalentityattributes:generic.model_height',
            'e0507131-d302-46b7-a967-bfc602e4beed',
            0.5,
            'add_value'
        );
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
        .modifyAttribute('additionalentityattributes:player.bonus_loot_count_rolls',
            'aece9dee-0b04-4916-a6a6-15016746463a',
            5,
            'add_value'
        )
        .modifyAttribute('additionalentityattributes:player.bonus_rare_loot_rolls',
            'be50d492-891b-41e9-a497-12f807b75d42',
            5,
            'add_value'
        )
        .modifyAttribute('additionalentityattributes:player.collection_range',
            '81f8e10e-b8e9-4e27-949c-ba961a234bee',
            2,
            'add_value'
        )
        .modifyAttribute('additionalentityattributes:player.dropped_experience',
            'fc6a2ef3-4460-4558-9a95-07e491a9d350',
            0.35,
            'add_value'
        )
    event.create('random_movement')
        .harmful()
        .color("red")
    event.create('fight_to_death')
        .beneficial()
        .color("pink")
    event.create('intrinsic')
        .beneficial()
        .color("pink")
    event.create('fluxing')
        .beneficial()
        .color("pink")
    event.create('amns')
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
    event.create('corroded')
        .beneficial()
        .color("blue")
    event.create('six_life_death_set')
        .beneficial()
        .color("blue")
    event.create('six_life_death')
        .harmful()
        .color("blue")
    event.create('pride_2')
        .harmful()
        .color("blue")
        .modifyAttribute('minecraft:generic.attack_damage',
            '6f94b580-3749-4f33-ae3c-c8e400beebfc',
            -0.1,
            'add_multiplied_base'
        )
        .modifyAttribute('minecraft:generic.attack_speed',
            'a102cdc2-08b4-4a29-833a-2f1e573356ad',
            -0.1,
            'add_multiplied_base'
        )
    //理智
    event.create('sanity')
        .harmful()
        .color("blue")
    //孔赛石
    event.create('multicolor')
        .harmful()
        .color("blue")
    //opal
    event.create('iridescence')
        .harmful()
        .color("blue")
    event.create('bloodjade')
        .harmful()
        .color("blue")
    event.create('bloodjade_set')
        .harmful()
        .color("blue")
    event.create('topaz')
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
    event.create('amber')
        .harmful()
        .color("blue")
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
    event.create('miracle_blight')
        .beneficial()
        .color("red")
    event.create('damage_amplification')
        .harmful()
        .color("red")
    event.create('rose')
        .beneficial()
        .color("red")
    event.create('blood_rose')
        .beneficial()
        .color("red")
    event.create('citrine')
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
    event.create('dragonsteel_lightning_ingot')
        .beneficial()
        .color("aqua")
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
    event.create('dragonsteel_ice_ingot')
        .beneficial()
        .color("red")
    event.create('dragonsteel_fire_ingot')
        .beneficial()
        .color("blue")
    event.create('dragonsteel_armor_break')
        .harmful()
        .color("red")
        .modifyAttribute('minecraft:generic.armor',
            '47ffc42d-8987-45cf-a536-9cfe3f2ee0b3',
            -5,
            'add_value'
        )
    event.create('garnet')
        .beneficial()
        .color("blue")
    event.create('moonstone')
        .beneficial()
        .color("blue")
    event.create('fiery_ingot')
        .beneficial()
        .color("red")
    event.create('alexandrite')
        .beneficial()
        .color("red")
    event.create('tanzanite')
        .beneficial()
        .color("red")
    event.create('luck')
        .beneficial()
        .color("green")
    event.create('wolf')
        .beneficial()
        .color("green")
    event.create('arrow')
        .beneficial()
        .color("yelow")
    event.create('chainmail_arrow_1')
        .beneficial()
        .color("yelow")
    event.create('chainmail_arrow_2')
        .beneficial()
        .color("yelow")
    event.create('chainmail_arrow_3')
        .beneficial()
        .color("yelow")
    event.create('chainmail_arrow_4')
        .beneficial()
        .color("yelow")
    event.create('achroous_ingot')
        .beneficial()
        .color("green")
        .modifyAttribute('minecraft:generic.movement_speed',
            'f9c76446-2c13-43b0-ae7c-31da951af8d5',
            0.5,
            'add_value'
        )
    event.create('animated_steel_ingot')
        .beneficial()
        .color("yelow")
    event.create('carbonatite_ingot')
        .beneficial()
        .color("yelow")

    event.create('overload')
        .beneficial()
        .color("yelow")
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
    event.create('acril_ingot')
        .beneficial()
        .color("yelow")
    event.create('prismarine_crystals')
        .beneficial()
        .color("yelow")
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

    event.create('emerald')
        .beneficial()
        .color("green")
    event.create('exp_to_death')
        .beneficial()
        .color("green")
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
    event.create('enderman')
        .beneficial()
        .color("green")
    event.create('systemtime')
        .beneficial()
        .color("green")
    event.create('echo_shard')
        .beneficial()
        .color("green")
    event.create('knockback')
        .beneficial()
        .color("gold")
        .modifyAttribute('minecraft:generic.movement_speed',
            'fd7a70b9-4d09-48d8-946b-8322714e4097',
            -0.3,
            'add_multiplied_base'
        )
    event.create('set_ponder')
        .beneficial()
        .color("gold")

    event.create('ponder')
        .color(0x000000)
        .harmful()
        .effectTick((entity, lvl) => {
            if (!entity || entity.level.isClientSide()) return;
            if (entity.server.tickCount % 20 == 0) {
                const direction = Math.floor(Math.random() * 4);
                let dx = 0;
                let dz = 0;

                switch (direction) {
                    case 0: dz = 0.8; break;  // 前
                    case 1: dz = -0.8; break; // 后
                    case 2: dx = 0.8; break;  // 右
                    case 3: dx = -0.8; break; // 左
                }
                entity.setMotion(dx, 0, dz);
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
    event.create('spell_level_up_2')
        .color(0x000000)
        .beneficial()
    event.create('one_six_seven_four')
        .color(0x000000)
        .beneficial()
    event.create('aquamarine')
        .color(0x000000)
        .beneficial()
    event.create('boom_effects')
        .color(0x000000)
        .beneficial()
    event.create('monkey')
        .color(0x000000)
        .beneficial()
    event.create('bismuthgems')
        .color(0x000000)
        .beneficial()
    event.create('tremor')
        .color(0x000000)
        .harmful()
        .modifyAttribute('minecraft:generic.movement_speed',
            '3e5d6e4d-d4af-4974-90bc-967c96064fec',
            -0.15,
            "add_multiplied_total"
        );
    event.create('eye')
        .color(0x000000)
        .harmful()
    event.create('gaze')
        .color(0x000000)
        .beneficial()
    event.create('magic_mob')
        .color(0x000000)
        .beneficial()
    event.create('ignitium_ingot')
        .color(0x000000)
        .beneficial()
    event.create('cursium_ingot')
        .color(0x000000)
        .beneficial()
    event.create('chaotic_teleport')
        .color(0x000000)
        .beneficial()
    event.create('wither_howitzer')
        .color(0x000000)
        .beneficial()
    event.create('mana_potion')
        .color(0x000000)
        .beneficial()
    event.create('ironwood_ingot')
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
    event.create('blazing_magic_set')
        .color(0x000000)
        .beneficial()
    event.create('mana_quenching')
        .color(0x000000)
        .beneficial()
    event.create('mithril_ingot')
        .color(0x000000)
        .beneficial()
    event.create('ghost_ingot')
        .color(0x000000)
        .harmful()
    event.create('malignant_pewter_ingot')
        .color(0x000000)
        .beneficial()
    event.create('protect')
        .color(0x000000)
        .beneficial()
    event.create('lacrima')
        .color(0x000000)
        .beneficial()
    event.create('fiery_tears')
        .color("red")
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
});        
// priority: 10
//暴怒
// 暴怒效果
// 暴怒效果
RFTrait('kubejs:wrath', 999)
    // 被动：对上一次攻击自己的生物施加报复对象10秒
    .beforeHurt(event => {
        const { source, entity } = event;
        const attacker = source.actual;

        // 受伤时：entity是玩家，attacker是攻击者
        if (!entity || !entity.isLiving() || !entity.isPlayer()) return;
        if (!entity.hasEffect("kubejs:wrath")) return;
        if (!attacker || !attacker.isLiving()) return;

        const lastAttacker = entity.lastHurtByMob;
        if (lastAttacker && lastAttacker.isLiving()) {
            lastAttacker.potionEffects.add('kubejs:wrath_damage', 200, 0);
        }

        // 被动：每当自身受到敌方单位攻击时，使自身获得2层仇怨(每10秒最多2次)
        const cooldownKey = "wrath_grudge_cooldown";
        if (!$CooldownManager.hasCooldown(entity, cooldownKey)) {
            // 增加2层仇怨
            if (entity.hasEffect('kubejs:grudge')) {
                addBaseStrengthAndSync(entity, 'kubejs:grudge', 2);
                addEffectLayers(entity, 'kubejs:grudge', 2);
            } else {
                entity.potionEffects.add('kubejs:grudge', 400, 1);
                setBaseStrengthAndSync(entity, 'kubejs:grudge', 2);
            }

            $CooldownManager.setCooldown(entity, cooldownKey, 100);
        }

        if (attacker.hasEffect('kubejs:wrath_damage')) {
            if (entity.hasEffect('kubejs:grudge')) {
                addBaseStrengthAndSync(entity, 'kubejs:grudge', 1);
                addEffectLayers(entity, 'kubejs:grudge', 1);
            } else {
                entity.potionEffects.add('kubejs:grudge', 400, 1);
                setBaseStrengthAndSync(entity, 'kubejs:grudge', 1);
            }
        }
    })

    // 攻击时的效果 + 被动：若目标带有报复对象，则造成的伤害增加20%
    .beforeHurt(event => {
        const { source, entity } = event;
        const attacker = source.player || source.actual;
        if (!attacker || !attacker.isLiving() || !attacker.hasEffect("kubejs:wrath")) {
            return;
        }

        // 被动：若目标带有报复对象，则造成的伤害增加20%（独立乘区）
        if (entity.hasEffect('kubejs:wrath_damage')) {
            new_damage(event, STAGE.MULTIPLY, 1.2);
        }

        // 获取当前烧伤强度
        const fireStrength = getBaseStrength(attacker, 'kubejs:fire');
        const targetFireStrength = getBaseStrength(entity, 'kubejs:fire');
        const totalFireStrength = fireStrength + targetFireStrength;

        // 获取仇怨层数
        const grudgeLayers = getEffectLayers(attacker, 'kubejs:grudge');

        // 获取攻击者生命值百分比
        const healthPercent = attacker.getHealth() / attacker.getMaxHealth();
        const lostHealthPercent = 1 - healthPercent;

        // 检查是否带有强化纹身药水效果
        const hasTattoo = attacker.hasEffect('kubejs:enhanced_tattoo');

        // 生成1-6的随机数（总比例为1+2+3=6）
        const random = Math.floor(Math.random() * 6) + 1;

        // 检查冷却
        const cooldownKey = "wrath_skill_cooldown";
        if ($CooldownManager.hasCooldown(attacker, cooldownKey)) {
            return; // 冷却中不触发技能
        }

        // 按1:2:3比例随机选择技能
        if (random <= 1) {
            // 1/6的概率触发技能1
            WrathSkill3(attacker, entity, event, fireStrength, targetFireStrength, totalFireStrength, grudgeLayers, lostHealthPercent);
        } else if (random <= 3) {
            // 2/6的概率触发技能2
            WrathSkill2(attacker, entity, event, fireStrength, targetFireStrength, hasTattoo);
        } else {
            // 3/6的概1率触发技能3
            WrathSkill1(attacker, entity, event, fireStrength, targetFireStrength, hasTattoo);
        }

        // 设置3秒冷却
        $CooldownManager.setCooldown(attacker, cooldownKey, 60);
    })

    // 被动：自身不会因烧伤伤害而使生命值降至1点以下
    .beforeHurt(event => {
        const { source, entity } = event;

        if (!entity.hasEffect("kubejs:wrath")) return;

        // 检查是否是烧伤伤害
        if (source.getType() === 'kubejs:fire' || source.getType() === 'onFire' || source.getType() === 'inFire') {
            const newHealth = entity.getHealth() - event.damage;
            if (newHealth < 1) {
                new_damage(event, STAGE.MULTIPLY, 0)
            }
        }
    })

    // 被动：受到致死伤害时，若烧伤强度不低于30级，则使用技能4 (CD:120秒)
    .beforeHurt(event => {
        const { source, entity } = event;

        if (!entity.hasEffect("kubejs:wrath")) return;

        // 检查是否是致死伤害
        if (entity.getHealth() - event.damage <= 0) {
            const fireStrength = getBaseStrength(entity, 'kubejs:fire');

            // 检查烧伤强度是否不低于30
            if (fireStrength >= 30) {
                // 检查冷却
                const cooldownKey = "wrath_skill4_cooldown";
                if (!$CooldownManager.hasCooldown(entity, cooldownKey)) {
                    // 触发技能4
                    WrathSkill4(entity, event, fireStrength);

                    // 设置120秒冷却
                    $CooldownManager.setCooldown(entity, cooldownKey, 2400); // 120秒 = 2400 ticks

                    event.cancel()
                }
            }
        }
    })

    .register();

// 技能1函数
function WrathSkill1(attacker, target, event, fireStrength, targetFireStrength, totalFireStrength, hasTattoo) {

    // [攻击时]:若自身的烧伤强度不低于10级，则使本技能造成的伤害+10%
    if (fireStrength >= 10) {
        new_damage(event, STAGE.ADDITIVE, 1.1);
    }

    // [攻击时]:使自身增加9级烧伤层数，对自身施加1层烧伤
    if (attacker.hasEffect('kubejs:fire')) {
        addBaseStrengthAndSync(attacker, 'kubejs:fire', 9);
        addEffectLayers(attacker, 'kubejs:fire', 1);
    } else {
        // 如果没有烧伤效果，先施加基础效果
        attacker.potionEffects.add('kubejs:fire', 2400, 0);
        setBaseStrengthAndSync(attacker, 'kubejs:fire', 9);
        // 再施加1层烧伤
        addEffectLayers(attacker, 'kubejs:fire', 1);
    }

    // [攻击时]:自身的烧伤层数与目标的烧伤层数之和每有10点，造成的伤害+10%（最多+20%）
    const layerSum = getEffectLayers(attacker, 'kubejs:fire') + getEffectLayers(target, 'kubejs:fire');
    const layerBonus = Math.min(20, Math.floor(layerSum / 10) * 10);
    if (layerBonus > 0) {
        new_damage(event, STAGE.ADDITIVE, 1 + layerBonus / 100);
    }

    // [攻击时]:使目标增加2级烧伤强度
    if (target.hasEffect('kubejs:fire')) {
        addBaseStrengthAndSync(target, 'kubejs:fire', 2);
    } else {
        target.potionEffects.add('kubejs:fire', 2400, 0);
        setBaseStrengthAndSync(target, 'kubejs:fire', 2);
    }

    // [攻击时]:若自身的烧伤强度不低于10级，则使目标额外增加3级强度
    if (fireStrength >= 10) {
        addBaseStrengthAndSync(target, 'kubejs:fire', 3);
    }

    // [攻击时]:若自身带有强化纹身，则对目标施加1层麻痹
    if (hasTattoo) {
        target.potionEffects.add('kubejs:paralysis', 2400, 0);
    }

}

// 技能2函数
function WrathSkill2(attacker, target, event, fireStrength, targetFireStrength, totalFireStrength, hasTattoo) {

    // [攻击时]:若自身的烧伤强度不低于10级，则使本技能造成的伤害+10%
    if (fireStrength >= 10) {
        new_damage(event, STAGE.ADDITIVE, 1.1);
    }

    // [攻击时]:对自身施加4层烧伤
    if (attacker.hasEffect('kubejs:fire')) {
        for (let i = 0; i < 4; i++) {
            addEffectLayers(attacker, 'kubejs:fire', 1);
        }
    } else {
        attacker.potionEffects.add('kubejs:fire', 200, 3); // 基础层数4（amplifier 3）
        setBaseStrengthAndSync(attacker, 'kubejs:fire', fireStrength || 1);
    }

    // [攻击时]:自身的烧伤强度与目标的烧伤强度之和每有4点，造成的伤害+10%（最多+20%）
    const strengthSum = fireStrength + targetFireStrength;
    const strengthBonus = Math.min(20, Math.floor(strengthSum / 4) * 10);
    if (strengthBonus > 0) {
        new_damage(event, STAGE.ADDITIVE, 1 + strengthBonus / 100);
    }

    // [攻击时]:使目标增加5级烧伤强度
    if (target.hasEffect('kubejs:fire')) {
        addBaseStrengthAndSync(target, 'kubejs:fire', 5);
    } else {
        target.potionEffects.add('kubejs:fire', 2400, 0);
        setBaseStrengthAndSync(target, 'kubejs:fire', 5);
    }

    // [攻击时]:若目标的烧伤烧伤强度不低于15级，则额外对其施加2层烧伤
    if (targetFireStrength >= 15) {
        for (let i = 0; i < 2; i++) {
            addEffectLayers(target, 'kubejs:fire', 1);
        }
    }

    // [攻击时]:若自身带有强化纹身，则对目标施加1层麻痹与1层缓慢
    if (hasTattoo) {
        target.potionEffects.add('kubejs:paralysis', 200, 0); // 麻痹3秒
        target.potionEffects.add('minecraft:slowness', 100, 0); // 缓慢3秒
    }

}

// 技能3函数
function WrathSkill3(attacker, target, event, fireStrength, targetFireStrength, grudgeLayers, lostHealthPercent) {
    // [使用时]:自身每带有5层仇怨，使本技能造成的伤害+10%(最多+30%)
    const grudgeBonus = Math.min(30, Math.floor(grudgeLayers / 5) * 10);
    if (grudgeBonus > 0) {
        new_damage(event, STAGE.ADDITIVE, 1 + grudgeBonus / 100);
    }

    // [使用时]:消耗自身所有仇怨，每消耗5层获得1层强化纹身
    if (attacker.hasEffect('kubejs:grudge')) {
        // 计算可获得多少层强化纹身
        const tattooGain = Math.floor(grudgeLayers / 5);

        // 移除仇怨效果
        attacker.removeEffect('kubejs:grudge');

        // 获得强化纹身
        if (tattooGain > 0) {
            if (attacker.hasEffect('kubejs:enhanced_tattoo')) {
                addEffectLayers(attacker, 'kubejs:enhanced_tattoo', tattooGain);
            } else {
                attacker.potionEffects.add('kubejs:enhanced_tattoo', 2400, tattooGain - 1);
            }
        }
    }

    // [攻击时]:使自身增加7级烧伤强度并对自身施加1层烧伤
    if (attacker.hasEffect('kubejs:fire')) {
        addBaseStrengthAndSync(attacker, 'kubejs:fire', 7);
        addEffectLayers(attacker, 'kubejs:fire', 1);
    } else {
        attacker.potionEffects.add('kubejs:fire', 2400, 0);
        setBaseStrengthAndSync(attacker, 'kubejs:fire', 7);
        addEffectLayers(attacker, 'kubejs:fire', 1);
    }

    // [攻击时]:自身的烧伤强度与目标的烧伤强度之和每有10点，使本技能造成的伤害+10%(最多+20%)
    const strengthSum = fireStrength + targetFireStrength;
    const strengthBonus = Math.min(20, Math.floor(strengthSum / 10) * 10);
    if (strengthBonus > 0) {
        new_damage(event, STAGE.ADDITIVE, 1 + strengthBonus / 100);
    }

    // [使用时]:自身每失去30%体力，使本技能造成的伤害+10%(最多+20%)
    const healthBonus = Math.min(20, Math.floor(lostHealthPercent / 0.3) * 10);
    if (healthBonus > 0) {
        new_damage(event, STAGE.ADDITIVE, 1 + healthBonus / 100);
    }

    // [攻击时]:使目标增加6级烧伤强度，使目标增加1层烧伤
    if (target.hasEffect('kubejs:fire')) {
        addBaseStrengthAndSync(target, 'kubejs:fire', 6);
        addEffectLayers(target, 'kubejs:fire', 1);
    } else {
        target.potionEffects.add('kubejs:fire', 2400, 0);
        setBaseStrengthAndSync(target, 'kubejs:fire', 6);
        addEffectLayers(target, 'kubejs:fire', 1);
    }

    // [攻击后]:若杀死了带有复仇对象的目标，降低10点沉沦值
    if (target.getHealth() - event.getDamage() <= 0 && target.hasEffect('kubejs:wrath_damage')) {
        const currentSinking = attacker.persistentData.contains('depravity') ?
            attacker.persistentData.getInt('depravity') : 0;
        const newSinking = Math.max(0, currentSinking - 10);
        attacker.persistentData.putInt('depravity', newSinking);
    }
}
// 技能4函数
function WrathSkill4(user, event, fireStrength) {
    // 获取生命值百分比
    const healthPercent = user.getHealth() / user.getMaxHealth();
    const lostHealthPercent = 1 - healthPercent;

    // [攻击前]:自身每失去20%体力，使本技能的攻击范围+1(最多+3)
    const rangeBonus = Math.min(3, Math.floor(lostHealthPercent / 0.2));
    const baseRange = 3;
    const finalRange = baseRange + rangeBonus;

    // 获取周围3格内的所有实体
    const entities = user.level.getEntities();
    const targets = [];

    entities.forEach(entity => {
        if (entity.isLiving() && entity !== user && entity.distanceTo(user) <= finalRange) {
            targets.push(entity);
        }
    });

    // 获取烧伤层数
    const fireLayers = getEffectLayers(user, 'kubejs:fire');

    // [使用时]:随机选取周遭3格内所有实体，造成当前生命值上限*烧伤层数的伤害
    // 随机选取一个目标
    if (targets.length > 0) {
        const randomTarget = targets[Math.floor(Math.random() * targets.length)];

        // 计算伤害基础值
        let baseDamage = randomTarget.maxHealth * fireLayers;

        // 创建新的伤害事件用于技能4
        const skillEvent = {
            getDamage: () => baseDamage,
            setDamage: (value) => { baseDamage = value; }
        };

        // [使用时]:自身每带有5级烧伤强度，使本技能造成的伤害+12.5%(最多+50%)
        const strengthBonus = Math.min(50, Math.floor(fireStrength / 5) * 12.5);
        if (strengthBonus > 0) {
            new_damage(skillEvent, STAGE.ADDITIVE, 1 + strengthBonus / 100);
        }

        // [使用时]:自身的烧伤强度与目标的烧伤强度之和每有10点，使本技能造成的伤害+10%(最多+20%)
        const targetFireStrength = getBaseStrength(randomTarget, 'kubejs:fire');
        const strengthSum = fireStrength + targetFireStrength;
        const sumBonus = Math.min(20, Math.floor(strengthSum / 10) * 10);
        if (sumBonus > 0) {
            new_damage(skillEvent, STAGE.ADDITIVE, 1 + sumBonus / 100);
        }

        // [使用时]:自身每失去30%体力，使本技能造成的伤害+10%(最多+30%)
        const healthBonus = Math.min(30, Math.floor(lostHealthPercent / 0.3) * 10);
        if (healthBonus > 0) {
            new_damage(skillEvent, STAGE.ADDITIVE, 1 + healthBonus / 100);
        }

        // 造成伤害
        attackEntity(randomTarget, 'kubejs:magic', baseDamage, true);

        // [攻击时]:使目标增加8级烧伤强度
        if (randomTarget.hasEffect('kubejs:fire')) {
            addBaseStrengthAndSync(randomTarget, 'kubejs:fire', 8);
        } else {
            randomTarget.potionEffects.add('kubejs:fire', 2400, 0);
            setBaseStrengthAndSync(randomTarget, 'kubejs:fire', 8);
        }
    }
}


/*
## 暴怒：
# 攻击倍率修改为1.2
# [攻击时]:随机选取以下效果，随机比例为1:2:3 ，效果触发后会进入3秒冷却
- 1
[攻击时]:若自身的烧伤强度不低于10级，则使本技能造成的伤害+10%
[攻击时]:使自身增加9级烧伤层数，对自身施加1层烧伤
[攻击时]:自身的烧伤层数与目标的烧伤层数之和每有10点，造成的伤害+10%（最多+20%）
[攻击时]:使目标增加2级烧伤强度
[攻击时]:若自身的烧伤强度不低于10级，则使目标额外增加3级强度
[攻击时]:若自身带有强化纹身，则对目标施加1层麻痹
- 2：
[攻击时]:若自身的烧伤强度不低于10级，则使本技能造成的伤害+10%
[攻击时]:对自身施加4层烧伤
[攻击时]:自身的烧伤强度与目标的烧伤强度之和每有4点，造成的伤害+10%（最多+20%）
[攻击时]:使目标增加5级烧伤强度
[攻击时]:若目标的烧伤烧伤强度不低于15级，则额外对其施加2层烧伤
[攻击时]:若自身带有强化纹身，则对目标施加1层麻痹与1层缓慢
- 3:
[使用时]:自身每带有5层仇怨，使本技能造成的伤害+10%(最多+30%)
[攻击时]:使自身增加7级烧伤强度并对自身施加1层烧伤
[攻击时]:自身的烧伤强度与目标的烧伤强度之和每有10点，使本技能造成的伤害+10%(最多+20%)
[使用时]:自身每失去30%体力，使本技能造成的伤害+10%(最多+20%)
[攻击时]:使目标增加6级烧伤强度，使目标增加1层烧伤
[攻击后]:若杀死了带有复仇对象的目标，降低10点沉沦值
* 被动能力：
# 对上一次攻击自己的生物施加报复对象10秒
# 自身不会因烧伤伤害而使生命值降至1点以下
# 每当自身受到敌方单位攻击时，使自身获得2层仇怨(每10秒最多2次)
# 若攻击自身的目标带有报复对象，则使自身额外获得1层中指-仇怨
# 受到致死伤害时，若烧伤强度不低于30级，则使用技能4 (CD:120秒)
- 4：
[攻击前]:自身每失去20%体力，使本技能的攻击范围+1(最多+3)
[使用时]:随机选取周遭3格内所有实体，造成当前生命值上限*烧伤层数的伤害
[使用时]:自身每带有5级烧伤强度，使本技能造成的伤害+12.5%(最多+50%)
[使用时]:自身的烧伤强度与目标的烧伤强度之和每有10点，使本技能造成的伤害+10%(最多+20%)
[使用时]:自身每失去30%体力，使本技能造成的伤害+10%(最多+30%)
[攻击时]:使目标增加8级烧伤强度
- 仇怨
若目标带有报复对象，则造成的伤害增加20%
*/

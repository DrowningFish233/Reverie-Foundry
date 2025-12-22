const $LivingHealEvent = Java.loadClass("net.neoforged.neoforge.event.entity.living.LivingHealEvent");

//猩红法术强度影响受到治疗倍率
NativeEvents.onEvent($LivingHealEvent, event => {
    const entity = event.getEntity();
    if (!entity || entity.getType() !== "minecraft:player") return;

    let power = entity.getAttribute('irons_spellbooks:blood_spell_power')?.value ?? 1;

    let multiplier = Math.min(1 + power * 0.2, 3);
    let Amount = event.getAmount()
    let newAmount = Amount * multiplier;
    event.setAmount(newAmount);

});

//禁疗-超位崩解
NativeEvents.onEvent($LivingHealEvent, event => {
    const entity = event.getEntity();
    if (!entity || !entity.living || !entity.hasEffect("kubejs:miracle_blight")) return;
    event.setCanceled(true);
});


//禁疗-酒精中毒
NativeEvents.onEvent($LivingHealEvent, event => {
    const entity = event.getEntity();
    if (!entity || !entity.living || !entity.hasEffect("kubejs:alcohol_poisoning")) return;
    event.setCanceled(true);
});


// 辐射禁疗效果
NativeEvents.onEvent($LivingHealEvent, event => {
    const entity = event.getEntity();
    if (!entity.isLiving() || event.isCanceled()) return;

    if (!entity.hasEffect('kubejs:radiance')) return;

    const radianceEffect = entity.getEffect('kubejs:radiance');
    const amplifier = radianceEffect.getAmplifier();
    const originalHealAmount = event.getAmount();
    const currentHealth = entity.getHealth();
    const maxHealth = entity.getMaxHealth();

    // 检查疫病效果
    if (entity.hasEffect('kubejs:plague')) {
        const plagueAmplifier = entity.getEffect('kubejs:plague').getAmplifier();

        if (plagueAmplifier >= 0) {
            switch (amplifier) {
                case 0: // 禁用生命恢复
                    event.setCanceled(true);
                    return;

                case 1: // 治疗转换为真实伤害
                    entity.setHealth(Math.max(0, currentHealth - originalHealAmount));
                    event.setCanceled(true);
                    return;

                case 2: // 治疗转换为伤害，额外附加伤害
                default:
                    const plagueMultiplier = (plagueAmplifier + 1) * 0.1;
                    const totalDamage = originalHealAmount * (1 + plagueMultiplier);
                    entity.setHealth(Math.max(0, currentHealth - totalDamage));
                    event.setCanceled(true);
                    return;
            }
        }
    }

    if (amplifier >= 3) {
        event.setCanceled(true);
        return;
    }

    const healThreshold = maxHealth * [0.75, 0.5, 0.25][amplifier];

    if (currentHealth >= healThreshold) {
        event.setCanceled(true);
        return;
    }

    const healthAfterHeal = currentHealth + originalHealAmount;
    if (healthAfterHeal > healThreshold) {
        event.setAmount(Math.max(0, healThreshold - currentHealth));
    }
});
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

//禁疗
NativeEvents.onEvent($LivingHealEvent, event => {
    const entity = event.getEntity();
    if (!entity || !entity.living || !entity.hasEffect("kubejs:miracle_blight")) return;
    event.setCanceled(true);
});
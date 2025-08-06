const $LivingDamageEvent$Pre = Java.loadClass("net.neoforged.neoforge.event.entity.living.LivingDamageEvent$Pre");
const $GearSickleItem = Java.loadClass("net.silentchaos512.gear.item.gear.GearSickleItem");

NativeEvents.onEvent($LivingDamageEvent$Pre, event => {
    $GearSickleItem.livingDamage$Pre(event);
});

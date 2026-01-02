//让镰刀正确的进行横扫攻击
NativeEvents.onEvent($LivingDamageEvent$Pre, event => {
    if (event.getSource().getType() == "scythe_melee") {
        $GearSickleItem.livingDamage$Pre(event);
    }
});
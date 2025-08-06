function kubejs_emerald(event, player) {
    const effect = player.getEffect("kubejs:emerald");
    if (!effect) return;

    const weapon = player.getMainHandItem();
    if (!weapon.isDamageableItem()) return;

    const effectLevel = Math.floor(effect.getAmplifier() / 2);
    player.potionEffects.add("minecraft:hero_of_the_village", 60, effectLevel);
    // 每2秒消耗4点耐久度
    const newDamage = weapon.getDamageValue() + 4;
    if (newDamage >= weapon.getMaxDamage()) {
        weapon.shrink(1);
    } else {
        weapon.setDamageValue(newDamage);
    }
}
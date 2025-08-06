/**
 * 黄玉12耐久倍数加伤效果
 */
function topaz(event) {
    const { source, entity } = event;
    const player = source.player || source.actual;

    if (!player?.player || !entity?.living || !player.hasEffect("kubejs:topaz")) {
        return;
    }

    const mainHandItem = player.getMainHandItem();
    if (mainHandItem.isEmpty()) return;

    const components = mainHandItem.components;
    if (!components) {
        return;
    }

    let modelKey = components.get("silentgear:model_key");
    if (!modelKey || !modelKey.includes("kubejs:gem/topaz")) {
        return;
    }
    const maxDurability = mainHandItem.getMaxDamage();
    const currentDurability = mainHandItem.getDamageValue();
    const remainingDurability = maxDurability - currentDurability;
    if (remainingDurability > 0 && remainingDurability % 12 == 0) {
        const effectLevel = player.getEffect("kubejs:topaz")?.amplifier + 1 || 0;
        const bonusDamage = 10 * effectLevel;
        new_damage(event, STAGE.FLAT, bonusDamage);
    }
}


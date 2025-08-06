//如果同时持有两种效果，则阻止执行
function is_Magical_Girl(event, player) {
    if (player.hasEffect("kubejs:lacrima") && player.hasEffect("kubejs:fiery_tears")) {
        return true;
    }
    return false;
}
function lacrima(event, player) {
    if (!player || !player.isPlayer() || !player.hasEffect("kubejs:lacrima")) {
        return;
    }
    if (is_Magical_Girl(event, player)) return;
    let pData = player.persistentData
    let P_sanity = pData.getInt(sanity)
    if (P_sanity > 0) {
        player.potionEffects.add("kubejs:protection", 3 * 20, 1);
        player.potionEffects.add("kubejs:protect", 3 * 20, 0);
    }
    if (P_sanity < 0) {
        player.potionEffects.add("kubejs:despair", 3 * 20, 0);
        player.potionEffects.add("kubejs:hurt", 3 * 20, 0);
    }
}



//泪石(炽热)
function fiery_tears(event, player, tick) {
    if (!player || !player.isPlayer() || !player.hasEffect("kubejs:fiery_tears")) {
        return;
    }
    if (is_Magical_Girl(event, player)) return;
    let pData = player.persistentData
    let P_sanity = pData.getInt(sanity)
    if (P_sanity > 0) {
        player.potionEffects.add("kubejs:protection", 3 * 20, 0);
        player.potionEffects.add("kubejs:fiery_tears_1", 3 * 20, 0);
        player.potionEffects.add("kubejs:protect", 3 * 20, 0);
    }
    if (P_sanity < 0) {
        player.potionEffects.add("kubejs:despair", 3 * 20, 0);
        player.potionEffects.add("kubejs:hurt", 3 * 20, 0);
    }
    if (tick % 160 === 0) {
        player.potionEffects.add("kubejs:fiery_tears_2", 120, 0);
    }
}

function fiery_tears_attack(event) {
    const { source, entity } = event;
    const attacker = source.player || source.actual;

    if (!attacker || !attacker.player || !entity.living || !attacker.hasEffect("kubejs:fiery_tears_2")) {
        return;
    }
    const fiery_tearsEffect = attacker.getEffect("kubejs:fiery_tears");
    const Level = fiery_tearsEffect.getAmplifier() + 1;
    entity.potionEffects.add("kubejs:fire", 30 * 20, Level * 10);
}
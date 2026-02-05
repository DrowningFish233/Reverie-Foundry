/**
 * 神圣庇护
 */
function hallowed_ingot_attack(event) {
    const { entity } = event;
    if (!entity.isPlayer()) return;
    let COOLDOWN_KEY = "hallowed_ingot_COOLDOWN_KEY"
    if ($CooldownManager.hasCooldown(entity, COOLDOWN_KEY)) return
    if (!fu_hasTraitAnywhere(entity, 'kubejs:hallowed_ingot')) return
    $CooldownManager.setCooldown(entity, COOLDOWN_KEY, 600)
    event.cancel()
}
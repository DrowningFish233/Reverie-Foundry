/**
 * 铁块的回声 
 * @param {$BeforeLivingEntityHurtKubeEvent_} event 
 * @returns 
 */
function echo_ingot(event) {
    const { source, entity } = event;
    const attacker = source.player
    if (!attacker || !attacker.isLiving()) return;

    const COOLDOWN_KEY = "echo_ingot_COOLDOWN_KEY"
    if ($CooldownManager.hasCooldown(attacker, COOLDOWN_KEY)) return
    if (!fu_hasTraitAnywhere(attacker, "kubejs:echo_ingot")) return;
    let Trait_Level = fu_getHighestTraitLevelAnywhere(attacker, "kubejs:echo_ingot")

    $AddEffect(entity, "kubejs:bleed", Trait_Level * 2 - 1, true)
    $AddEffect(entity, "kubejs:paralysis", Trait_Level - 1, false, 200)
    $AddEffect(entity, "minecraft:slowness", Trait_Level - 1, true)

    $CooldownManager.setCooldown(attacker, COOLDOWN_KEY, 15 * 20)


}
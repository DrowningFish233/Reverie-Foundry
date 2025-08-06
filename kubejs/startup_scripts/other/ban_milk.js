let effectsToCancel = [
    "effect.kubejs.bleed",
    "effect.kubejs.custom_effect",
    "effect.kubejs.custom_damage_effect",
    "effect.kubejs.king",
    "effect.kubejs.hurt",
    "effect.kubejs.kings",
    "effect.kubejs.strip",
    "effect.kubejs.set_numbness",
    "effect.kubejs.towards_light",
    "effect.kubejs.numbness",
    "effect.kubejs.seraph",
    "effect.kubejs.life_drain",
    "effect.kubejs.twin_shadows",
    "effect.kubejs.exalted_beauty_gem",
    "effect.kubejs.gluttony",
    "effect.kubejs.sloth",
    "effect.kubejs.morning_moodiness",
    "effect.kubejs.sloth_2",
    "effect.kubejs.morning_moodiness_2",
    "effect.kubejs.envy",
    "effect.kubejs.wider",
    "effect.kubejs.narrower",
    "effect.kubejs.lust",
    "effect.kubejs.pride",
    "effect.kubejs.wrath",
    "effect.kubejs.wrath_damage",
    "effect.kubejs.greed",
    "effect.kubejs.random_movement",
    "effect.kubejs.fight_to_death",
    "effect.kubejs.intrinsic",
    "effect.kubejs.amns",
    "effect.kubejs.exp_drop",
    "effect.kubejs.blue_star",
    "effect.kubejs.fluxing",
    "effect.kubejs.disillusionment",
    "effect.kubejs.six_life_death_set",
    "effect.kubejs.corroded",
    "effect.kubejs.six_life_death",
    "effect.kubejs.pride_2",
    "effect.kubejs.multicolor",
    "effect.kubejs.sanity",
    "effect.kubejs.iridescence",
    "effect.kubejs.amber",
    "effect.kubejs.bloodjade",
    "effect.kubejs.bloodjade_set",
    "effect.kubejs.topaz",
    "effect.kubejs.naughty",
    "effect.kubejs.pearl"

];
const $MobEffectEvent$Remove = Java.loadClass("net.neoforged.neoforge.event.entity.living.MobEffectEvent$Remove");

//禁用牛奶效果
NativeEvents.onEvent($MobEffectEvent$Remove, event => {
    const entity = event.getEntity();
    if (entity.getType() !== "minecraft:player") {
        return;
    }

    const mainHandItem = entity.getMainHandItem();

    if (!mainHandItem || mainHandItem.isEmpty()) {
        return;
    }

    const milkItems = [
        "minecraft:milk_bucket",
        "farmersdelight:milk_bottle"
    ];
    const effectInstance = event.effectInstance;
    if (milkItems.includes(mainHandItem.getItem().toString())) {
        if (effectInstance && effectsToCancel.includes(effectInstance.descriptionId)) {
            event.setCanceled(true);
        }
    }
});
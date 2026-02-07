
// priority: 0
const protectedEffects = [
    "kubejs:bleed",
    "kubejs:custom_effect",
    "kubejs:custom_damage_effect",
    'kubejs:grape_beer',
    'kubejs:red_wine',
    'kubejs:white_wine',
    'kubejs:whiskey',
    'kubejs:tequila',
    'kubejs:vodka',
    'kubejs:everclear',
    'kubejs:moonshine',
    'kubejs:rum',
    'kubejs:caribbean_rum',
    'kubejs:fireball',
    'kubejs:iceball',
    'kubejs:lightingball',
    'kubejs:purple_haze',
    'kubejs:screwdriver',
    'kubejs:moscow_mule',
    'kubejs:tequila_sunrise',
    'kubejs:margarita',
    'kubejs:old_fashioned',
    'kubejs:bloody_mary',
    'kubejs:evergreen_gin',
    'kubejs:star_beam_rye',
    'kubejs:cinnamon_roll',
    'kubejs:custom_damage_effect',
    'kubejs:king',
    'kubejs:hurt',
    'kubejs:numbness',
    'kubejs:life_drain',
    'kubejs:bleed',
    'kubejs:gluttony',
    'kubejs:sloth',
    'kubejs:wrath_damage',
    'kubejs:random_movement',
    'kubejs:six_life_death',
    'kubejs:pride_2',
    'kubejs:sanity',
    'kubejs:bloodjade',
    'kubejs:naughty',
    'kubejs:pearl',
    'kubejs:miracle_blight',
    'kubejs:dragonsteel_armor_break',
    'kubejs:vomit',
    'kubejs:ponder',
    'kubejs:ponder_up',
    'kubejs:taunt',
    'kubejs:taunt_2',
    'kubejs:tremor',
    'kubejs:eye',
    'kubejs:ghost_ingot',
    'kubejs:no_block',
    'kubejs:bloodlust',
    'kubejs:is_addiction',
    'kubejs:addiction',
    'kubejs:withdrawal',
    'kubejs:plague',
    'kubejs:radiance',
    'kubejs:alcohol_poisoning',
    'kubejs:electrified',
    'kubejs:maximum_health_reduction',
    'kubejs:smoldering',
    'kubejs:decay',
    'kubejs:elemental_mix',
    'kubejs:paralysis'
];

NativeEvents.onEvent($MobEffectEvent$Remove, event => {

    try {
        global.handleEffectRemoval(event);
    } catch (e) {
        console.error(`[ERROR] 效果移除处理失败: ${e}`);
    }
});

global.handleEffectRemoval = event => {
    if (!event || !event.entity || !event.effectInstance || !event.effectInstance.effect) return;

    const { entity, effectInstance, cure } = event;

    if (!entity.isPlayer()) return;

    if (!cure || cure == null) return;
    const effectId = effectInstance.effect.getRegisteredName();

    if (protectedEffects.includes(effectId)) {
        if (cure.toString().includes("milk")) {
            event.setCanceled(true);
        }
    }
};

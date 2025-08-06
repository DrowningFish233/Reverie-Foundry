const sanity = "sanity"
const depravity = "depravity"
const Maxsanity = "Maxsanity"
const idleTimer = "idleTimer"
const defaultMaxsanity = 45
const GLUTTONY_nutrition = "GLUTTONY_nutrition"
const gluttony_strength = "gluttony_strength"
const envy_number = "envy_number"
const IDLE_TIME = 200;
const depravityDamageApplied = "depravityDamageApplied"
const sloth_cumulative_damage = "sloth_cumulative_damage"
const adrenaline = "adrenaline"
const garnet = "garnet"
const wendigo = "wendigo"
const exp_to_cd = "exp_to_cd"
const wither_howitzer = "wither_howitzer"
const magicSwitch = "magicSwitch"
const sanityDrainRate = "sanityDrainRate"

const key_bind_weapons = [
    "silentgear:katana",
    "silentgear:sword"
];
const sins = {
    WRATH: "kubejs:sin_wrath",
    GREED: "kubejs:sin_greed",
    SLOTH: "kubejs:sin_sloth",
    PRIDE: "kubejs:sin_pride",
    LUST: "kubejs:sin_lust",
    ENVY: "kubejs:sin_envy",
    GLUTTONY: "kubejs:sin_gluttony"
};
const entity_curios_Boss = [
    'bosses_of_mass_destruction:void_blossom',
    'bosses_of_mass_destruction:lich',
    'bosses_of_mass_destruction:gauntlet',
    'bosses_of_mass_destruction:obsidilith'
]

const kubejs_player = [
    'minecraft:player'
]

// 法术学派映射表
const SPELL_SCHOOL_MAP = {
    //炽焰法术流派
    "irons_spellbooks:fire_breath": "irons_spellbooks:fire",
    "irons_spellbooks:magma_bomb": "irons_spellbooks:fire",
    "irons_spellbooks:blaze_storm": "irons_spellbooks:fire",
    "irons_spellbooks:firebolt": "irons_spellbooks:fire",
    "irons_spellbooks:flaming_barrage": "irons_spellbooks:fire",
    "irons_spellbooks:flaming_strike": "irons_spellbooks:fire",
    "gametechbcs_spellbooks:meteor_storm": "irons_spellbooks:fire",
    "irons_spellbooks:fireball": "irons_spellbooks:fire",
    "irons_spellbooks:heat_surge": "irons_spellbooks:fire",
    "irons_spellbooks:wall_of_fire": "irons_spellbooks:fire",
    "irons_spellbooks:scorch": "irons_spellbooks:fire",
    "irons_spellbooks:fire_arrow": "irons_spellbooks:fire",
    "irons_spellbooks:burning_dash": "irons_spellbooks:fire",
    "gametechbcs_spellbooks:flames_reborn": "irons_spellbooks:fire",
    "irons_spellbooks:raise_hell": "irons_spellbooks:fire",

    //自然法术流派
    "irons_spellbooks:poison_arrow": "irons_spellbooks:nature",
    "gametechbcs_spellbooks:aerial_collapse": "irons_spellbooks:nature",
    "irons_spellbooks:touch_dig": "irons_spellbooks:nature",
    "irons_spellbooks:root": "irons_spellbooks:nature",
    "gametechbcs_spellbooks:acid_rain": "irons_spellbooks:nature",
    "irons_spellbooks:blight": "irons_spellbooks:nature",
    "irons_spellbooks:acid_orb": "irons_spellbooks:nature",
    "irons_spellbooks:poison_breath": "irons_spellbooks:nature",
    "gametechbcs_spellbooks:ensnare": "irons_spellbooks:nature",
    "irons_spellbooks:earthquake": "irons_spellbooks:nature",
    "irons_spellbooks:poison_splash": "irons_spellbooks:nature",
    "irons_spellbooks:oakskin": "irons_spellbooks:nature",
    "irons_spellbooks:spider_aspect": "irons_spellbooks:nature",
    "irons_spellbooks:firefly_swarm": "irons_spellbooks:nature",
    "irons_spellbooks:stomp": "irons_spellbooks:nature",
    "irons_spellbooks:gluttony": "irons_spellbooks:nature",

    //召唤法术流派
    "irons_spellbooks:gust": "irons_spellbooks:evocation",
    "irons_spellbooks:invisibility": "irons_spellbooks:evocation",
    "irons_spellbooks:summon_vex": "irons_spellbooks:evocation",
    "irons_spellbooks:wololo": "irons_spellbooks:evocation",
    "irons_spellbooks:spectral_hammer": "irons_spellbooks:evocation",
    "gametechbcs_spellbooks:lingering_strain": "irons_spellbooks:evocation",
    "irons_spellbooks:arrow_volley": "irons_spellbooks:evocation",
    "irons_spellbooks:fang_ward": "irons_spellbooks:evocation",
    "irons_spellbooks:fang_strike": "irons_spellbooks:evocation",
    "irons_spellbooks:chain_creeper": "irons_spellbooks:evocation",
    "irons_spellbooks:lob_creeper": "irons_spellbooks:evocation",
    "gametechbcs_spellbooks:ashen_breath": "irons_spellbooks:evocation",
    "irons_spellbooks:shield": "irons_spellbooks:evocation",
    "irons_spellbooks:summon_horse": "irons_spellbooks:evocation",
    "irons_spellbooks:slow": "irons_spellbooks:evocation",
    "irons_spellbooks:firecracker": "irons_spellbooks:evocation",

    //末影法术流派
    "gametechbcs_spellbooks:astral_sense": "irons_spellbooks:ender",
    "irons_spellbooks:evasion": "irons_spellbooks:ender",
    "irons_spellbooks:recall": "irons_spellbooks:ender",
    "irons_spellbooks:magic_arrow": "irons_spellbooks:ender",
    "irons_spellbooks:teleport": "irons_spellbooks:ender",
    "gametechbcs_spellbooks:displacement": "irons_spellbooks:ender",
    "irons_spellbooks:echoing_strikes": "irons_spellbooks:ender",
    "irons_spellbooks:summon_swords": "irons_spellbooks:ender",
    "irons_spellbooks:portal": "irons_spellbooks:ender",
    "irons_spellbooks:black_hole": "irons_spellbooks:ender",
    "irons_spellbooks:magic_missile": "irons_spellbooks:ender",
    "irons_spellbooks:summon_ender_chest": "irons_spellbooks:ender",
    "irons_spellbooks:dragon_breath": "irons_spellbooks:ender",
    "irons_spellbooks:counterspell": "irons_spellbooks:ender",
    "irons_spellbooks:starfall": "irons_spellbooks:ender",
    "hazennstuff:chaotic_teleport": "irons_spellbooks:ender",

    //冰霜法术流派
    "irons_spellbooks:frostbite": "irons_spellbooks:ice",
    "gametechbcs_spellbooks:shatterpoint": "irons_spellbooks:ice",
    "irons_spellbooks:ray_of_frost": "irons_spellbooks:ice",
    "irons_spellbooks:cone_of_cold": "irons_spellbooks:ice",
    "irons_spellbooks:frostwave": "irons_spellbooks:ice",
    "irons_spellbooks:summon_polar_bear": "irons_spellbooks:ice",
    "irons_spellbooks:icicle": "irons_spellbooks:ice",
    "irons_spellbooks:ice_spikes": "irons_spellbooks:ice",
    "irons_spellbooks:ice_block": "irons_spellbooks:ice",
    "irons_spellbooks:frost_step": "irons_spellbooks:ice",
    "irons_spellbooks:ice_tomb": "irons_spellbooks:ice",
    "irons_spellbooks:snowball": "irons_spellbooks:ice",

    //旋律法术流派
    "alshanex_familiars:birds_spell": "alshanex_familiars:sound",
    "alshanex_familiars:music_bolt": "alshanex_familiars:sound",
    "alshanex_familiars:sonata": "alshanex_familiars:sound",
    "alshanex_familiars:explosion_melody": "alshanex_familiars:sound",
    "alshanex_familiars:default_note": "alshanex_familiars:sound",
    "alshanex_familiars:lullaby": "alshanex_familiars:sound",
    "alshanex_familiars:guardian_angel": "alshanex_familiars:sound",
    "alshanex_familiars:harp_symphony": "alshanex_familiars:sound",

    //神圣法术流派
    "irons_spellbooks:healing_circle": "irons_spellbooks:holy",
    "irons_spellbooks:blessing_of_life": "irons_spellbooks:holy",
    "irons_spellbooks:cleanse": "irons_spellbooks:holy",
    "irons_spellbooks:sunbeam": "irons_spellbooks:holy",
    "irons_spellbooks:heal": "irons_spellbooks:holy",
    "irons_spellbooks:wisp": "irons_spellbooks:holy",
    "irons_spellbooks:divine_smite": "irons_spellbooks:holy",
    "irons_spellbooks:greater_heal": "irons_spellbooks:holy",
    "gametechbcs_spellbooks:nullflare": "irons_spellbooks:holy",
    "irons_spellbooks:angel_wing": "irons_spellbooks:holy",
    "irons_spellbooks:fortify": "irons_spellbooks:holy",
    "gametechbcs_spellbooks:banish": "irons_spellbooks:holy",
    "irons_spellbooks:guiding_bolt": "irons_spellbooks:holy",
    "irons_spellbooks:haste": "irons_spellbooks:holy",
    "irons_spellbooks:cloud_of_regeneration": "irons_spellbooks:holy",

    //猩红法术流派
    "gametechbcs_spellbooks:crimson_downpour": "irons_spellbooks:blood",
    "irons_spellbooks:raise_dead": "irons_spellbooks:blood",
    "irons_spellbooks:blood_slash": "irons_spellbooks:blood",
    "irons_spellbooks:blood_step": "irons_spellbooks:blood",
    "alshanex_familiars:summon_shadows": "irons_spellbooks:blood",
    "irons_spellbooks:acupuncture": "irons_spellbooks:blood",
    "irons_spellbooks:blood_needles": "irons_spellbooks:blood",
    "irons_spellbooks:sacrifice": "irons_spellbooks:blood",
    "irons_spellbooks:devour": "irons_spellbooks:blood",
    "gametechbcs_spellbooks:call_forth_the_dead_king": "irons_spellbooks:blood",
    "irons_spellbooks:ray_of_siphoning": "irons_spellbooks:blood",
    "irons_spellbooks:heartstop": "irons_spellbooks:blood",
    "irons_spellbooks:wither_skull": "irons_spellbooks:blood",

    //雷霆法术流派
    "irons_spellbooks:ascension": "irons_spellbooks:lightning",
    "irons_spellbooks:shockwave": "irons_spellbooks:lightning",
    "irons_spellbooks:electrocute": "irons_spellbooks:lightning",
    "irons_spellbooks:lightning_bolt": "irons_spellbooks:lightning",
    "irons_spellbooks:ball_lightning": "irons_spellbooks:lightning",
    "irons_spellbooks:chain_lightning": "irons_spellbooks:lightning",
    "irons_spellbooks:thunder_step": "irons_spellbooks:lightning",
    "irons_spellbooks:thunderstorm": "irons_spellbooks:lightning",
    "irons_spellbooks:lightning_lance": "irons_spellbooks:lightning",
    "irons_spellbooks:charge": "irons_spellbooks:lightning",

    //幻梦法术流派
    "kubejs:gold_body": "kubejs:dream",
    "kubejs:one_six_seven_four": "kubejs:dream",

    //远古巫术
    "irons_spellbooks:telekinesis": "irons_spellbooks:eldritch",
    "gametechbcs_spellbooks:blackout": "irons_spellbooks:eldritch",
    "irons_spellbooks:planar_sight": "irons_spellbooks:eldritch",
    "irons_spellbooks:eldritch_blast": "irons_spellbooks:eldritch",
    "irons_spellbooks:abyssal_shroud": "irons_spellbooks:eldritch",
    "irons_spellbooks:sonic_boom": "irons_spellbooks:eldritch",
    "irons_spellbooks:sculk_tentacles": "irons_spellbooks:eldritch",
    "gametechbcs_spellbooks:psychic_bolt": "irons_spellbooks:eldritch",
    "gametechbcs_spellbooks:reversal": "irons_spellbooks:eldritch",
    "gametechbcs_spellbooks:spectral_blink": "irons_spellbooks:eldritch",
    "irons_spellbooks:pocket_dimension": "irons_spellbooks:eldritch"
};

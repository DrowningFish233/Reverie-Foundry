// priority: 500
// 所有酒类效果列表
const alcoholEffects = [
    "kubejs:lightingball",
    "kubejs:iceball",
    "kubejs:grape_beer",
    "kubejs:fireball",
    "kubejs:evergreen_gin",
    "kubejs:everclear",
    "kubejs:cinnamon_roll",
    "kubejs:caribbean_rum",
    "kubejs:bloody_mary",
    "kubejs:star_beam_rye",
    "kubejs:screwdriver",
    "kubejs:rum",
    "kubejs:red_wine",
    "kubejs:purple_haze",
    "kubejs:old_fashioned",
    "kubejs:moscow_mule",
    "kubejs:moonshine",
    "kubejs:margarita",
    "kubejs:white_wine",
    "kubejs:whiskey",
    "kubejs:vodka",
    "kubejs:tequila_sunrise",
    "kubejs:tequila"
];
const GearsEffect = {
    "creed_of_the_blight_eater": "食枯徒信条",
    "oath_of_the_overburdened_mind": "重负意识誓约",
    "oath_of_the_overeager_fist": "鲁莽重拳誓约",
    "oath_of_the_overkeen_eye": "犀利锐眼誓约",
    "oath_of_the_undiscerned_maw": "无恕渊喉誓约",
    "oath_of_unsighted_resistance": "虚形抗性誓约",
    "oath_of_unmakers_disdain": "毁存鄙夷誓约",
    "pact_of_combustion": "燃焰条约",
    "pact_of_contentedness": "完满条约",
    "pact_of_defiance": "违抗条约",
    "pact_of_patience_repaid": "耐心回报条约",
    "pact_of_self_care": "自我养护条约",
    "pact_of_reciprocation": "反照条约",
    "pact_of_rune_exploitation": "符文竭耗条约",
    "pact_of_the_arcanaphage": "噬魔条约",
    "pact_of_the_berserker": "狂战士条约",
    "pact_of_the_blastweaver": "爆炸编织者条约",
    "pact_of_the_cloudskipper": "云跃者条约",
    "pact_of_the_continuing_shot": "接续射击条约",
    "pact_of_the_fortress": "垒塞条约",
    "pact_of_the_high_priest": "祭司长条约",
    "pact_of_the_lifeweaver": "织命者条约",
    "pact_of_the_lone_druid": "孤身德鲁伊条约",
    "pact_of_the_parasite": "寄生条约",
    "pact_of_the_profane_ascetic": "腐烂苦修条约",
    "pact_of_the_profane_glutton": "腐烂暴食条约",
    "pact_of_the_prospector": "勘探工条约",
    "pact_of_the_reaper": "收割者条约",
    "pact_of_the_shattering_addict": "破念瘾君条约",
    "pact_of_the_shield": "坚盾条约",
    "pact_of_the_skybreaker": "裂天者条约",
    "pact_of_the_warlock": "恶巫条约",
    "pact_of_the_windswept": "风拂条约",
    "pact_of_tidal_affinity": "潮汐亲和条约",
    "pact_of_wyrd_reconstruction": "命运重构条约"
}
const sanity = "sanity"
const depravity = "depravity"
const Maxsanity = "Maxsanity"
const idleTimer = "idleTimer"
const defaultMaxsanity = 45
const GLUTTONY_nutrition = "GLUTTONY_nutrition"
const gluttony_strength = "gluttony_strength"
const envy_number = "envy_number"
const IDLE_TIME = 150;
const depravityDamageMultiplier = "depravityDamageMultiplier"
const sloth_cumulative_damage = "sloth_cumulative_damage"
const adrenaline = "adrenaline"
const garnet = "garnet"
const wendigo = "wendigo"
const exp_to_cd = "exp_to_cd"
const wither_howitzer = "wither_howitzer"
const magicSwitch = "magicSwitch"
const sanityDrainRate = "sanityDrainRate"
const addiction = "addiction"
const depression = "depression"
const $playersound = "playSound(net.minecraft.world.entity.player.Player,double,double,double,net.minecraft.sounds.SoundEvent,net.minecraft.sounds.SoundSource,float,float)"
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

// Boss生物 列表
const BOSS_LIST = [
    "cataclysm:ignis",
    "cataclysm:the_leviathan",
    "cataclysm:ancient_remnant",
    "cataclysm:maledictus",
    "cataclysm:scylla",
    "cataclysm:the_harbinger",
    "cataclysm:ender_guardian",
    "cataclysm:netherite_monstrosity",
    "minecraft:wither",
    "minecraft:ender_dragon",
    "bosses_of_mass_destruction:gauntlet",
    "bosses_of_mass_destruction:lich",
    "bosses_of_mass_destruction:obsidilith",
    "bosses_of_mass_destruction:void_blossom",
    "irons_spellbooks:fire_boss",
    "terra_entity:dungeon_guardian",
    "terra_entity:skeletron",
    "terra_entity:king_slime",
    "terra_entity:eye_of_cthulhu",
    "terra_entity:brain_of_cthulhu",
    "terra_entity:queen_bee",
    "irons_spellbooks:dead_king"
];

const kubejs_player = [
    'minecraft:player'
]


// 黑名单配置 
const DIFFICULTY_BLACKLIST = [
    "cataclysm:ignis",
    "cataclysm:the_leviathan",
    "cataclysm:ancient_remnant",
    "cataclysm:maledictus",
    "cataclysm:scylla",
    "cataclysm:the_harbinger",
    "cataclysm:ender_guardian",
    "cataclysm:netherite_monstrosity",
    "minecraft:wither",
    "minecraft:ender_dragon",
    "bosses_of_mass_destruction:gauntlet",
    "bosses_of_mass_destruction:lich",
    "bosses_of_mass_destruction:obsidilith",
    "bosses_of_mass_destruction:void_blossom",
    "irons_spellbooks:fire_boss",
    "terra_entity:dungeon_guardian",
    "terra_entity:skeletron",
    "terra_entity:king_slime",
    "terra_entity:eye_of_cthulhu",
    "terra_entity:brain_of_cthulhu",
    "terra_entity:queen_bee",
    "irons_spellbooks:dead_king"
];

// 基础难度配置
const GAME_DIFFICULTY_LEVELS = {
    "EASY": {
        health: 1.0,
        attack: 1.0,
        armor: 1.0,
        toughness: 1.0,
        follow_range: 0
    },
    "NORMAL": {
        health: 1.2,
        attack: 1.2,
        armor: 1.2,
        toughness: 1.0,
        follow_range: 0
    },
    "HARD": {
        health: 1.5,
        attack: 1.5,
        armor: 1.5,
        toughness: 1.0,
        follow_range: 10
    }
};

// 玩家阶段难度加成
const STAGE_DIFFICULTY_BONUS = {
    'difficult_0': { health: 1, attack: 1, armor: 1, toughness: 1, level: 0 },
    'difficult_1': { health: 2, attack: 2, armor: 2, toughness: 2, level: 1 },
    'difficult_2': { health: 3, attack: 3, armor: 3, toughness: 3, level: 2 },
    'difficult_3': { health: 4, attack: 4, armor: 4, toughness: 4, level: 3 },
    'difficult_4': { health: 5, attack: 5, armor: 5, toughness: 5, level: 4 },
    'difficult_5': { health: 6, attack: 6, armor: 6, toughness: 6, level: 5 },
    'difficult_6': { health: 8, attack: 8, armor: 8, toughness: 8, level: 6 }
};


// 最终BOSS
const FINAL_BOSS = "darkdoppelganger:dark_doppelganger";

// Sephirah 名称映射
const SEPHIRAH_NAMES = [
    { minKills: 3, name: "Malchut" },
    { minKills: 6, name: "Yesod" },
    { minKills: 9, name: "Hod" },
    { minKills: 12, name: "Netzach" },
    { minKills: 15, name: "Tiphereth" },
    { minKills: 18, name: "Geburah" },
    { minKills: 21, name: "Chesed" },
    { minKills: 24, name: "Binah" },
    { minKills: 27, name: "Cochma" },
    { minKills: 30, name: "Kether" }
];

const HEALTH_MODIFIER_ID = 'death_based_health';
const DEATH_COUNT_KEY = 'player_deaths';
const SYSTEM_ENABLED_KEY = 'death_system_enabled';

// 全局系统状态
const systemEnabledByDefault = false;


// 位阶消息键值映射
const RANK_MESSAGE_KEYS = {
    "Malchut": { prefix: "message.sephirah.malchut.prefix", message: "message.sephirah.malchut.message" },
    "Yesod": { prefix: "message.sephirah.yesod.prefix", message: "message.sephirah.yesod.message" },
    "Hod": { prefix: "message.sephirah.hod.prefix", message: "message.sephirah.hod.message" },
    "Netzach": { prefix: "message.sephirah.netzach.prefix", message: "message.sephirah.netzach.message" },
    "Tiphereth": { prefix: "message.sephirah.tiphereth.prefix", message: "message.sephirah.tiphereth.message" },
    "Geburah": { prefix: "message.sephirah.geburah.prefix", message: "message.sephirah.geburah.message" },
    "Chesed": { prefix: "message.sephirah.chesed.prefix", message: "message.sephirah.chesed.message" },
    "Binah": { prefix: "message.sephirah.binah.prefix", message: "message.sephirah.binah.message" },
    "Cochma": { prefix: "message.sephirah.cochma.prefix", message: "message.sephirah.cochma.message" },
    "Kether": { prefix: "message.sephirah.kether.prefix", message: "message.sephirah.kether.message" }
};

// 降级消息
const DEMOTION_MESSAGE = {
    prefix: "message.sephirah.demotion.prefix",
    message: "message.sephirah.demotion.message"
};

// 缓存可移除类型
let REMOVABLE_TYPES_CACHE = null
/*
// 法术学派映射表
// 我为什么要写他？？
const SPELL_SCHOOL_MAP = {
    // 炽焰法术流派 (irons_spellbooks:fire)
    "irons_spellbooks:fire": [
        "irons_spellbooks:fire_breath",
        "irons_spellbooks:magma_bomb",
        "irons_spellbooks:blaze_storm",
        "irons_spellbooks:firebolt",
        "irons_spellbooks:flaming_barrage",
        "irons_spellbooks:flaming_strike",
        "gametechbcs_spellbooks:meteor_storm",
        "irons_spellbooks:fireball",
        "irons_spellbooks:heat_surge",
        "irons_spellbooks:wall_of_fire",
        "irons_spellbooks:scorch",
        "irons_spellbooks:fire_arrow",
        "irons_spellbooks:burning_dash",
        "gametechbcs_spellbooks:flames_reborn",
        "irons_spellbooks:raise_hell",
        "cataclysm_spellbooks:infernal_strike",
        "cataclysm_spellbooks:tectonic_tremble",
        "cataclysm_spellbooks:ashen_breath",
        "cataclysm_spellbooks:conjure_ignited_reinforcement",
        "cataclysm_spellbooks:abyss_fireball",
        "cataclysm_spellbooks:bone_storm",
        "cataclysm_spellbooks:piercing_bone",
        "cataclysm_spellbooks:hellish_blade",
        "cataclysm_spellbooks:incineration",
        "hazennstuff:brimstone_hellblast",
        "hazennstuff:cinderous_step",
        "hazennstuff:scorching_slash",
        "hazennstuff:fiery_dagger"
    ],

    // 自然法术流派 (irons_spellbooks:nature)
    "irons_spellbooks:nature": [
        "irons_spellbooks:poison_arrow",
        "gametechbcs_spellbooks:aerial_collapse",
        "irons_spellbooks:touch_dig",
        "irons_spellbooks:root",
        "gametechbcs_spellbooks:acid_rain",
        "irons_spellbooks:blight",
        "irons_spellbooks:acid_orb",
        "irons_spellbooks:poison_breath",
        "gametechbcs_spellbooks:ensnare",
        "irons_spellbooks:earthquake",
        "irons_spellbooks:poison_splash",
        "irons_spellbooks:oakskin",
        "irons_spellbooks:spider_aspect",
        "irons_spellbooks:firefly_swarm",
        "irons_spellbooks:stomp",
        "irons_spellbooks:gluttony",
        "cataclysm_spellbooks:conjure_amethyst_crab",
        "cataclysm_spellbooks:desert_winds",
        "cataclysm_spellbooks:amethyst_puncture",
        "cataclysm_spellbooks:sandstorm",
        "cataclysm_spellbooks:monolith_crash",
        "hazennstuff:shard_sword",
        "hazennstuff:counterspell_spider_lily",
        "hazennstuff:death_sentence",
        "hazennstuff:thorn_chakram"
    ],

    // 唤魔法术流派 (irons_spellbooks:evocation)
    "irons_spellbooks:evocation": [
        "irons_spellbooks:gust",
        "irons_spellbooks:invisibility",
        "irons_spellbooks:summon_vex",
        "irons_spellbooks:wololo",
        "irons_spellbooks:spectral_hammer",
        "gametechbcs_spellbooks:lingering_strain",
        "irons_spellbooks:arrow_volley",
        "irons_spellbooks:fang_ward",
        "irons_spellbooks:fang_strike",
        "irons_spellbooks:chain_creeper",
        "irons_spellbooks:lob_creeper",
        "gametechbcs_spellbooks:ashen_breath",
        "irons_spellbooks:shield",
        "irons_spellbooks:summon_horse",
        "irons_spellbooks:slow",
        "irons_spellbooks:firecracker",
        "cataclysm_spellbooks:pilfer",
        "irons_spellbooks:throw",
        "hazennstuff:spectral_axe"
    ],

    // 末影法术流派 (irons_spellbooks:ender)
    "irons_spellbooks:ender": [
        "gametechbcs_spellbooks:astral_sense",
        "irons_spellbooks:evasion",
        "irons_spellbooks:recall",
        "irons_spellbooks:magic_arrow",
        "irons_spellbooks:teleport",
        "gametechbcs_spellbooks:displacement",
        "irons_spellbooks:echoing_strikes",
        "hazennstuff:chaotic_teleport",
        "irons_spellbooks:summon_swords",
        "irons_spellbooks:portal",
        "irons_spellbooks:black_hole",
        "irons_spellbooks:magic_missile",
        "irons_spellbooks:summon_ender_chest",
        "irons_spellbooks:dragon_breath",
        "irons_spellbooks:counterspell",
        "irons_spellbooks:starfall",
        "cataclysm_spellbooks:void_rune",
        "cataclysm_spellbooks:gravity_storm",
        "cataclysm_spellbooks:gravitation_pull",
        "cataclysm_spellbooks:void_bulwark",
        "irons_spellbooks:shadow_slash"
    ],

    // 冰霜法术流派 (irons_spellbooks:ice)
    "irons_spellbooks:ice": [
        "irons_spellbooks:frostbite",
        "gametechbcs_spellbooks:shatterpoint",
        "irons_spellbooks:ray_of_frost",
        "irons_spellbooks:cone_of_cold",
        "irons_spellbooks:frostwave",
        "irons_spellbooks:summon_polar_bear",
        "irons_spellbooks:icicle",
        "irons_spellbooks:ice_tomb",
        "irons_spellbooks:ice_spikes",
        "irons_spellbooks:ice_block",
        "irons_spellbooks:frost_step",
        "irons_spellbooks:snowball",
        "cataclysm_spellbooks:conjure_thralls",
        "cataclysm_spellbooks:malevolent_battlefield",
        "cataclysm_spellbooks:cursed_rush",
        "hazennstuff:crystal_volley",
        "hazennstuff:ice_arrow"
    ],

    // 远古巫术 (irons_spellbooks:eldritch)
    "irons_spellbooks:eldritch": [
        "irons_spellbooks:telekinesis",
        "gametechbcs_spellbooks:blackout",
        "irons_spellbooks:planar_sight",
        "irons_spellbooks:eldritch_blast",
        "irons_spellbooks:abyssal_shroud",
        "irons_spellbooks:sonic_boom",
        "irons_spellbooks:sculk_tentacles",
        "gametechbcs_spellbooks:psychic_bolt",
        "irons_spellbooks:pocket_dimension",
        "gametechbcs_spellbooks:reversal",
        "gametechbcs_spellbooks:spectral_blink",
        "hazennstuff:soul_seekers"
    ],

    // 旋律法术流派 (familiarslib:sound)
    "familiarslib:sound": [
        "alshanex_familiars:birds_spell",
        "alshanex_familiars:music_bolt",
        "alshanex_familiars:sonata",
        "alshanex_familiars:explosion_melody",
        "alshanex_familiars:default_note",
        "alshanex_familiars:lullaby",
        "alshanex_familiars:guardian_angel",
        "alshanex_familiars:harp_symphony"
    ],

    // 神圣法术流派 (irons_spellbooks:holy)
    "irons_spellbooks:holy": [
        "irons_spellbooks:healing_circle",
        "irons_spellbooks:blessing_of_life",
        "irons_spellbooks:cleanse",
        "irons_spellbooks:sunbeam",
        "irons_spellbooks:heal",
        "irons_spellbooks:wisp",
        "irons_spellbooks:divine_smite",
        "irons_spellbooks:greater_heal",
        "gametechbcs_spellbooks:nullflare",
        "irons_spellbooks:angel_wing",
        "irons_spellbooks:fortify",
        "gametechbcs_spellbooks:banish",
        "irons_spellbooks:guiding_bolt",
        "irons_spellbooks:haste",
        "irons_spellbooks:cloud_of_regeneration",
        "cataclysm_spellbooks:summon_koboleton",
        "cataclysm_spellbooks:conjure_koboldiator",
        "hazennstuff:golden_shower"
    ],

    // 猩红法术流派 (irons_spellbooks:blood)
    "irons_spellbooks:blood": [
        "gametechbcs_spellbooks:crimson_downpour",
        "irons_spellbooks:raise_dead",
        "irons_spellbooks:blood_slash",
        "irons_spellbooks:blood_step",
        "alshanex_familiars:summon_shadows",
        "irons_spellbooks:acupuncture",
        "irons_spellbooks:blood_needles",
        "irons_spellbooks:sacrifice",
        "irons_spellbooks:devour",
        "gametechbcs_spellbooks:call_forth_the_dead_king",
        "irons_spellbooks:ray_of_siphoning",
        "irons_spellbooks:heartstop",
        "irons_spellbooks:wither_skull"
    ],

    // 雷霆法术流派 (irons_spellbooks:lightning)
    "irons_spellbooks:lightning": [
        "irons_spellbooks:ascension",
        "irons_spellbooks:shockwave",
        "irons_spellbooks:electrocute",
        "irons_spellbooks:lightning_bolt",
        "irons_spellbooks:ball_lightning",
        "irons_spellbooks:chain_lightning",
        "irons_spellbooks:thunder_step",
        "irons_spellbooks:thunderstorm",
        "irons_spellbooks:lightning_lance",
        "irons_spellbooks:charge",
        "irons_spellbooks:volt_strike",
        "hazennstuff:energy_burst"
    ],

    // 幻梦法术流派 (kubejs:dream)
    "kubejs:dream": [
        "kubejs:gold_body",
        "kubejs:one_six_seven_four",
        "kubejs:rune_of_deflection",
        "kubejs:clear_cooldown",
        "kubejs:fire_arrow",
        "kubejs:explosion",
        "kubejs:eternal_life_spell",
        "kubejs:demon_conch",
        "kubejs:phantom_pain"
    ],

    // 深渊法术流派 (cataclysm_spellbooks:abyssal)
    "cataclysm_spellbooks:abyssal": [
        "cataclysm_spellbooks:depth_charge",
        "cataclysm_spellbooks:void_beam",
        "cataclysm_spellbooks:abyssal_predator",
        "cataclysm_spellbooks:tidal_grab",
        "cataclysm_spellbooks:dimensional_rift",
        "cataclysm_spellbooks:abyssal_slash",
        "cataclysm_spellbooks:abyssal_blast"
    ],

    // 光辉法术流派 (hazennstuff:radiance)
    "hazennstuff:radiance": [
        "hazennstuff:syringe_barrage",
        "hazennstuff:call_forth_terraprisma",
        "hazennstuff:terraprismic_barrage",
        "hazennstuff:stellar_collapse",
        "hazennstuff:shooting_star"
    ],

    // 暗影法术流派 (hazennstuff:shadow)
    "hazennstuff:shadow": [
        "hazennstuff:nights_edge_strike"
    ]
};
*/
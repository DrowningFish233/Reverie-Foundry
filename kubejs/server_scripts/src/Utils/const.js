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
    GLOOM: "kubejs:sin_gloom",
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
    'difficult_1': { health: 2, attack: 1.2, armor: 2, toughness: 2, level: 1 },
    'difficult_2': { health: 3, attack: 1.4, armor: 3, toughness: 3, level: 2 },
    'difficult_3': { health: 4, attack: 1.6, armor: 4, toughness: 4, level: 3 },
    'difficult_4': { health: 5, attack: 1.8, armor: 5, toughness: 5, level: 4 },
    'difficult_5': { health: 6, attack: 2, armor: 6, toughness: 6, level: 5 },
    'difficult_6': { health: 8, attack: 3, armor: 8, toughness: 8, level: 6 }
};


// 最终BOSS
const FINAL_BOSS = "darkdoppelganger:dark_doppelganger";

// Sephirah 映射
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


let pactToGeasMap = {
    'malum_pact_of_the_lone_druid': 'pact_of_defiance',
    'malum_pact_of_the_shield': 'pact_of_the_shield',
    'malum_pact_of_patience_repaid': 'pact_of_patience_repaid',
    'malum_pact_of_the_high_priest': 'pact_of_the_high_priest',
    'malum_pact_of_the_berserker': 'pact_of_the_berserker',
    'malum_pact_of_the_warlock': 'pact_of_the_warlock'
};

// 降级消息
const DEMOTION_MESSAGE = {
    prefix: "message.sephirah.demotion.prefix",
    message: "message.sephirah.demotion.message"
};

// 缓存
let REMOVABLE_TYPES_CACHE = null
const panicEffect = "kubejs:panic";

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


// 位阶消息键值映射
const RANK_MESSAGE_KEYS = {
    "Malchut": { prefix: "sephirah.malchut.prefix", message: "sephirah.malchut.message" },
    "Yesod": { prefix: "sephirah.yesod.prefix", message: "sephirah.yesod.message" },
    "Hod": { prefix: "sephirah.hod.prefix", message: "sephirah.hod.message" },
    "Netzach": { prefix: "sephirah.netzach.prefix", message: "sephirah.netzach.message" },
    "Tiphereth": { prefix: "sephirah.tiphereth.prefix", message: "sephirah.tiphereth.message" },
    "Geburah": { prefix: "sephirah.geburah.prefix", message: "sephirah.geburah.message" },
    "Chesed": { prefix: "sephirah.chesed.prefix", message: "sephirah.chesed.message" },
    "Binah": { prefix: "sephirah.binah.prefix", message: "sephirah.binah.message" },
    "Cochma": { prefix: "sephirah.cochma.prefix", message: "sephirah.cochma.message" },
    "Kether": { prefix: "sephirah.kether.prefix", message: "sephirah.kether.message" }
};

// 降级消息
const DEMOTION_MESSAGE = {
    prefix: "sephirah.demotion.prefix",
    message: "sephirah.demotion.message"
};

// Boss 击杀计数逻辑
EntityEvents.death(event => {
    const player = event.source.player;
    if (!player) return;

    const pData = player.persistentData;
    const entityType = event.entity.type;


    // 检查是否是最终BOSS
    if (entityType === FINAL_BOSS) {
        const currentKills = pData.getInt("kill") || 0;

        // 确保击杀数不会低于0
        const newKills = Math.max(0, currentKills - 3);
        pData.putInt("kill", newKills);
        event.server.tell(
            Text.join(
                Text.translate(DEMOTION_MESSAGE.prefix).color("#FF5555"),
                " ",
                Text.translate(DEMOTION_MESSAGE.message).color("#FFFFFF")
            )
        );
        return;
    }

    // 如果是普通 Boss，增加 kill 计数
    if (BOSS_LIST.includes(entityType)) {
        const currentKills = pData.getInt("kill") || 0;
        // 如果已经达到最大击杀数，不再增加
        if (currentKills >= 30) {
            return;
        }

        const newKills = currentKills + 1;
        pData.putInt("kill", newKills);

        // 检查是否达到位阶要求
        for (let sephirah of SEPHIRAH_NAMES) {
            if (newKills === sephirah.minKills) {
                const messageKeys = RANK_MESSAGE_KEYS[sephirah.name];
                if (messageKeys) {
                    const playerName = getplayerName(player.toString());

                    event.server.tell(
                        Text.join(
                            Text.of(playerName).color("#FFD700"),
                            " ",
                            Text.translate(messageKeys.prefix).color("#66CCFF"),
                            " ",
                            Text.translate(messageKeys.message).color("#FFFFFF")
                        )
                    );
                }
                break;
            }
        }
    }
});
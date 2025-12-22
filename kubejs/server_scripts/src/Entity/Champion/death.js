

// 最终BOSS
const FINAL_BOSS = "darkdoppelganger:dark_doppelganger";

// Sephirah 名称映射
const SEPHIRAH_NAMES = [
    { requiredKills: 2, name: "Yesod" },
    { requiredKills: 4, name: "Hod" },
    { requiredKills: 6, name: "Netzach" },
    { requiredKills: 8, name: "Tiphereth" },
    { requiredKills: 10, name: "Geburah" },
    { requiredKills: 12, name: "Chesed" },
    { requiredKills: 14, name: "Binah" },
    { requiredKills: 16, name: "Cochma" },
    { requiredKills: 18, name: "Kether" }
];


// 位阶消息键值映射
const RANK_MESSAGE_KEYS = {
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

    const entityType = event.entity.type;
    const pData = player.persistentData;

    // 检查是否是最终BOSS
    if (entityType === FINAL_BOSS) {
        const currentKills = pData.getInt("kill") || 0;

        // 确保击杀数不会低于0
        const newKills = Math.max(0, currentKills - 2);
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
        if (currentKills >= 18) {
            return;
        }

        const newKills = currentKills + 1;
        pData.putInt("kill", newKills);

        // 检查是否达到位阶要求
        for (let sephirah of SEPHIRAH_NAMES) {
            if (newKills === sephirah.requiredKills) {
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
// Boss 击杀计数逻辑
EntityEvents.death(event => {
    const player = event.source.player;
    if (!player) return;

    const pData = player.persistentData;
    const entityType = event.entity.getType();

    // 检查是否是最终BOSS
    if (entityType === FINAL_BOSS) {
        const currentKills = pData.getInt("kill") || 0;
        const oldRank = getSephirahName(currentKills);

        // 确保击杀数不会低于0
        const newKills = Math.max(0, currentKills - 3);
        pData.putInt("kill", newKills);

        const newRank = getSephirahName(newKills);

        // 只有当位阶实际降低时才显示提示
        if (oldRank !== newRank && oldRank !== "Malchut") {
            const oldRankIndex = getSephirahIndex(oldRank);
            const newRankIndex = getSephirahIndex(newRank);

            if (oldRankIndex > newRankIndex) {
                const playerName = getplayerName(player.toString());

                event.server.tell(
                    Text.join(
                        Text.of(playerName).color("#FFD700"),
                        " ",
                        Text.translate(DEMOTION_MESSAGE.prefix).color("#FF5555"),
                        " ",
                        Text.translate(DEMOTION_MESSAGE.message).color("#FFFFFF"),
                        Text.of(" (" + oldRank + " → " + newRank + ")").color("#AAAAAA")
                    )
                );
            }
        }
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

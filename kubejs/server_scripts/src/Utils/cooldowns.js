/**
 * 通用冷却管理器
 */
const $CooldownManager = {
    /**
     * 设置冷却
     * @param {Internal.Player} player 玩家对象
     * @param {string} cooldownKey 冷却键名
     * @param {number} durationTicks 冷却时间(ticks)
     */
    setCooldown: function (player, cooldownKey, durationTicks) {
        const pData = player.persistentData;
        const startTick = player.tickCount;

        // 存储开始时间和持续时间
        pData.putLong(cooldownKey + "_start", startTick);
        pData.putInt(cooldownKey + "_duration", durationTicks);
    },

    /**
     * 检查是否有冷却
     * @param {Internal.Player} player 玩家对象
     * @param {string} cooldownKey 冷却键名
     * @returns {boolean}
     */
    hasCooldown: function (player, cooldownKey) {
        const pData = player.persistentData;
        const currentTick = player.tickCount;

        // 检查是否有冷却数据
        if (!pData.contains(cooldownKey + "_start") || !pData.contains(cooldownKey + "_duration")) {
            return false;
        }

        const startTick = pData.getLong(cooldownKey + "_start");
        const duration = pData.getInt(cooldownKey + "_duration");
        const elapsed = currentTick - startTick;
        const hasCD = elapsed < duration;

        return hasCD;
    },

    /**
     * 获取剩余冷却时间(ticks)
     * @param {Internal.Player} player 玩家对象
     * @param {string} cooldownKey 冷却键名
     * @returns {number}
     */
    getRemainingTicks: function (player, cooldownKey) {
        const pData = player.persistentData;
        const currentTick = player.tickCount;

        if (!pData.contains(cooldownKey + "_start") || !pData.contains(cooldownKey + "_duration")) {
            return 0;
        }

        const startTick = pData.getLong(cooldownKey + "_start");
        const duration = pData.getInt(cooldownKey + "_duration");
        const elapsed = currentTick - startTick;
        const remaining = duration - elapsed;
        return Math.max(0, remaining);
    },

    /**
     * 获取剩余冷却时间(秒)
     * @param {Internal.Player} player 玩家对象
     * @param {string} cooldownKey 冷却键名
     * @returns {number}
     */
    getRemainingSeconds: function (player, cooldownKey) {
        return Math.ceil(this.getRemainingTicks(player, cooldownKey) / 20);
    },

    /**
     * 清除冷却
     * @param {Internal.Player} player 玩家对象
     * @param {string} cooldownKey 冷却键名
     */
    clearCooldown: function (player, cooldownKey) {
        const pData = player.persistentData;
        pData.remove(cooldownKey + "_start");
        pData.remove(cooldownKey + "_duration");
    },

    /**
     * 清理玩家所有冷却数据
     * @param {Internal.Player} player 玩家对象
     */
    cleanupPlayer: function (player) {
        const pData = player.persistentData;
        // 定义已知的冷却键名列表
        const knownCooldowns = [
            "acril_ingot_COOLDOWN_KEY",
            "garnet_guiding_bolt",
            "exp_to_death_cd",
            "echo_ingot_COOLDOWN_KEY",
            "mana_cloak_COOLDOWN_KEY"
        ];

        // 清理冷却数据
        knownCooldowns.forEach(cooldownKey => {
            pData.remove(cooldownKey + "_start");
            pData.remove(cooldownKey + "_duration");
        });

    }
};

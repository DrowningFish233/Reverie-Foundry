/**
 * 启用嵌孔效果
 * @param {Internal.ServerPlayer} player 玩家
 * @param {string} itemId 物品ID (如 "minecraft:diamond")
 * @returns {boolean} 是否成功
 */
function socketEnable(player, itemId) {
    if (!player) return false;
    $SocketStateAPI.enable(player, itemId);
    return true;
}

/**
 * 禁用嵌孔效果
 * @param {Internal.ServerPlayer} player 玩家
 * @param {string} itemId 物品ID
 * @returns {boolean} 是否成功
 */
function socketDisable(player, itemId) {
    if (!player) return false;
    $SocketStateAPI.disable(player, itemId);
    return true;
}

/**
 * 检查嵌孔效果是否启用
 * @param {Internal.ServerPlayer} player 玩家
 * @param {string} itemId 物品ID
 * @returns {boolean} 是否启用
 */
function socketIsEnabled(player, itemId) {
    if (!player) return false;
    return $SocketStateAPI.isEnabled(player, itemId);
}

/**
 * 清除玩家所有嵌孔效果
 * @param {Internal.ServerPlayer} player 玩家
 */
function socketClearAll(player) {
    if (!player) return;
    $SocketStateAPI.clearAll(player);
}

/**
 * 获取玩家所有已启用的嵌孔效果列表
 * @param {Internal.ServerPlayer} player 玩家
 * @returns {string[]} 物品ID数组
 */
function socketGetEnabledList(player) {
    if (!player) return [];
    let features = $SocketStateAPI.getEnabledFeatures(player);
    let result = [];
    let entries = features.entrySet().toArray();
    for (let i = 0; i < entries.length; i++) {
        let entry = entries[i];
        if (entry.getValue() === true) {
            result.push(entry.getKey());
        }
    }
    return result;
}


/**
 * 检查主手武器是否嵌入了指定物品（任意槽位）
 * @param {Internal.ServerPlayer} player 玩家
 * @param {string} itemId 物品ID
 * @returns {boolean} 是否嵌入
 */
function socketHas(player, itemId) {
    if (!player) return false;
    let weapon = player.getMainHandItem();
    if (weapon.isEmpty()) return false;
    return $SocketStateAPI.hasSocketItem(weapon, itemId);
}

/**
 * 检查主手武器指定槽位是否嵌入了指定物品
 * @param {Internal.ServerPlayer} player 玩家
 * @param {number} slot 槽位索引 (0开始)
 * @param {string} itemId 物品ID
 * @returns {boolean} 是否嵌入
 */
function socketHasAtSlot(player, slot, itemId) {
    if (!player) return false;
    let weapon = player.getMainHandItem();
    if (weapon.isEmpty()) return false;
    return $SocketStateAPI.isSocketItem(weapon, slot, itemId);
}

/**
 * 获取主手武器指定槽位嵌入的物品ID
 * @param {Internal.ServerPlayer} player 玩家
 * @param {number} slot 槽位索引
 * @returns {string} 物品ID，空字符串表示无物品
 */
function socketGetAtSlot(player, slot) {
    if (!player) return "";
    return $SocketStateAPI.getSocketItemId(player, slot);
}

/**
 * 获取主手武器所有槽位的嵌入物品信息
 * @param {Internal.ServerPlayer} player 玩家
 * @returns {Array<{slot: number, itemId: string}>} 槽位信息数组
 */
function socketGetAllSlots(player) {
    if (!player) return [];
    let result = [];
    for (let i = 0; i < 10; i++) {
        let itemId = socketGetAtSlot(player, i);
        if (itemId !== "") {
            result.push({ slot: i, itemId: itemId });
        }
    }
    return result;
}

/**
 * 嵌入物品到主手武器指定槽位（自动刷新效果）
 * @param {Internal.ServerPlayer} player 玩家
 * @param {number} slot 槽位索引
 * @param {string} itemId 物品ID
 * @returns {boolean} 是否成功
 */
function socketInstall(player, slot, itemId) {
    if (!player) return false;
    $SocketStateAPI.setSocketItemAndUpdate(player, slot, itemId);
    return true;
}

/**
 * 移除主手武器指定槽位的嵌入物品（自动刷新效果）
 * @param {Internal.ServerPlayer} player 玩家
 * @param {number} slot 槽位索引
 * @returns {boolean} 是否成功
 */
function socketRemove(player, slot) {
    if (!player) return false;
    $SocketStateAPI.setSocketItemAndUpdate(player, slot, "");
    return true;
}

/**
 * 刷新玩家所有武器嵌孔效果
 * @param {Internal.ServerPlayer} player 玩家
 */
function socketRefresh(player) {
    if (!player) return;
    $SocketStateAPI.refreshPlayerEffects(player);
}

/**
 * 批量嵌入物品到主手武器（自动找空槽位）
 * @param {Internal.ServerPlayer} player 玩家
 * @param {string[]} itemIds 物品ID数组
 * @returns {Array<{slot: number, itemId: string}>} 已嵌入的物品信息
 */
function socketInstallAll(player, itemIds) {
    if (!player) return [];
    let installed = [];
    for (let i = 0; i < itemIds.length; i++) {
        let itemId = itemIds[i];
        if (!socketHas(player, itemId)) {
            for (let slot = 0; slot < 10; slot++) {
                let current = socketGetAtSlot(player, slot);
                if (current === "") {
                    socketInstall(player, slot, itemId);
                    installed.push({ slot: slot, itemId: itemId });
                    break;
                }
            }
        }
    }
    return installed;
}

/**
 * 移除主手武器所有槽位的嵌入物品
 * @param {Internal.ServerPlayer} player 玩家
 */
function socketRemoveAll(player) {
    if (!player) return;
    for (let slot = 0; slot < 10; slot++) {
        socketRemove(player, slot);
    }
}


/**
 * 如果玩家启用了指定嵌孔效果则执行回调
 * @param {Internal.ServerPlayer} player 玩家
 * @param {string} itemId 物品ID
 * @param {Function} callback 回调函数
 * @returns {boolean} 是否执行了回调
 */
function socketIfEnabled(player, itemId, callback) {
    if (socketIsEnabled(player, itemId)) {
        callback();
        return true;
    }
    return false;
}

/**
 * 存储玩家临时数据
 * @param {Internal.ServerPlayer} player 玩家
 * @param {string} key 键名
 * @param {any} value 值
 */
function socketSetData(player, key, value) {
    if (!player) return;
    $SocketStateAPI.setValue(player, key, value);
}

/**
 * 获取玩家临时数据
 * @param {Internal.ServerPlayer} player 玩家
 * @param {string} key 键名
 * @returns {any} 存储的值
 */
function socketGetData(player, key) {
    if (!player) return null;
    return $SocketStateAPI.getValue(player, key);
}

/**
 * 删除玩家临时数据
 * @param {Internal.ServerPlayer} player 玩家
 * @param {string} key 键名
 */
function socketRemoveData(player, key) {
    if (!player) return;
    $SocketStateAPI.removeValue(player, key);
}
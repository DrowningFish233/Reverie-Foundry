/**
 * 判断玩家是否装备了指定的饰品，仅检查是否装备，不检查具体槽位。
 * @param {Player} player - 玩家对象
 * @param {string} itemId - 饰品的物品ID
 * @returns {CurioSlot|null} 如果玩家装备了该饰品，返回对应的槽位对象；否则返回null。
 */
function getCuriosItem(player, itemId) {
    let slotResult = new $CuriosApi()
        .getCuriosHelper()
        .findEquippedCurio(Item.of(itemId), player);
    if (slotResult.isPresent()) {
        return slotResult.get().getRight()
    }
    return null;
}

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


/**
 * 获取玩家第一个匹配条件的饰品信息
 * @param {Player} player - 玩家对象
 * @param {Function} predicate - 判断函数 (item) => boolean
 * @returns {{item: ItemStack, identifier: string, index: number}|null}
 */
function findFirstCurio(player, predicate) {
    let curiosInventory = $CuriosApi.getCuriosInventory(player);
    if (!curiosInventory.isPresent()) return null;

    let inv = curiosInventory.get();
    let equippedCurios = inv.getEquippedCurios();
    if (!equippedCurios) return null;

    let size = equippedCurios.getSlots();
    for (let i = 0; i < size; i++) {
        let item = equippedCurios.getStackInSlot(i);
        if (item && !item.isEmpty() && predicate(item)) {
            let identifier = '';
            let curiosMap = inv.getCurios();
            for (let [key, handler] of Object.entries(curiosMap)) {
                if (handler && handler.getSlots() > i) {
                    let stackInSlot = handler.getStackInSlot(i);
                    if (stackInSlot && stackInSlot.equals(item, true)) {
                        identifier = key;
                        break;
                    }
                }
            }
            return {
                item: item,
                identifier: identifier,
                index: i
            };
        }
    }
    return null;
}
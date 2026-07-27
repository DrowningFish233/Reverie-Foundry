ItemEvents.rightClicked('kubejs:remove_armor', event => {
    const { player, item } = event

    const armorSlotIndexes = [39, 38, 37, 36]
    const inventory = player.getInventory()

    let hasArmor = false
    for (let i = 0; i < armorSlotIndexes.length; i++) {
        let item = inventory.extractItem(armorSlotIndexes[i], 64, true)
        if (item && !item.isEmpty()) {
            hasArmor = true
            break
        }
    }

    if (!hasArmor) return;

    let removedCount = 0
    for (let i = 0; i < armorSlotIndexes.length; i++) {
        let slotIndex = armorSlotIndexes[i]
        let item = inventory.extractItem(slotIndex, 64, true)

        if (item && !item.isEmpty()) {
            player.give(item.copy())
            inventory.extractItem(slotIndex, 64, false)
            removedCount++
        }
    }

    if (removedCount > 0) {
        if (!player.isCreative()) {
            item.count--
        }
    }
})
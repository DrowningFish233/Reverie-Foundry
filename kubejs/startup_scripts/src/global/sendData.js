let $PotionRegistry = Java.loadClass('io.redspace.ironsspellbooks.registries.PotionRegistry')
let $PotionItem = Java.loadClass('net.minecraft.world.item.PotionItem')
let $DataComponents = Java.loadClass('net.minecraft.core.component.DataComponents')
let $ItemStack = Java.loadClass('net.minecraft.world.item.ItemStack')
let $SpellRegistry = Java.loadClass('io.redspace.ironsspellbooks.api.registry.SpellRegistry')
let $CuriosApi = Java.loadClass('top.theillusivec4.curios.api.CuriosApi')

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


ISSEvents.spellSelection(event => {
    if (!event.entity.level.isClientSide()) return
    let manaFlower = getCuriosItem(event.entity, 'kubejs:mana_flower')

    if (!manaFlower) return

    if (event.manager.getSelection() != null) {
        let selection = event.manager.getSelection()
        let spelllevel = selection.spellData.getLevel()

        // 直接发送网络包，让服务端检查法力并决定是否喝药
        // 沟槽的方法拿不到server
        event.entity.sendData('kubejs:mana_flower', {
            spellId: selection.spellData.getSpell().getSpellId(),
            spellLevel: spelllevel
        })
    }
})
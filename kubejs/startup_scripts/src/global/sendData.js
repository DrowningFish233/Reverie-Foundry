let $PotionRegistry = Java.loadClass('io.redspace.ironsspellbooks.registries.PotionRegistry')
let $PotionItem = Java.loadClass('net.minecraft.world.item.PotionItem')
let $DataComponents = Java.loadClass('net.minecraft.core.component.DataComponents')
let $ItemStack = Java.loadClass('net.minecraft.world.item.ItemStack')
let $SpellRegistry = Java.loadClass('io.redspace.ironsspellbooks.api.registry.SpellRegistry')
let $CuriosApi = Java.loadClass('top.theillusivec4.curios.api.CuriosApi')


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
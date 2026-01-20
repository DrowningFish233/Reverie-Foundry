/**
 * @typedef {import("dev.latvian.mods.kubejs.item.ItemBuilder").$ItemBuilder$$Type} $ItemBuilder$$Type
 * @typedef {import("net.minecraft.world.item.ItemStack").$ItemStack$$Type} $ItemStack$$Type
 * @typedef {import("net.minecraft.resources.ResourceLocation").$ResourceLocation$$Type} $ResourceLocation$$Type
 * @typedef {import("net.minecraft.world.entity.ai.attributes.Attribute").$Attribute$$Type} $Attribute$$Type
 * @typedef {import("net.minecraft.world.entity.ai.attributes.AttributeModifier$Operation").$AttributeModifier$Operation$$Type} $AttributeModifier$Operation$$Type
 */


/**
 * itemid与cap的全局映射表
 * @type {Map<String, $CurioCapBuilder>}
 */
const curiosCapabilities = new Map()

/**
 * 包装ItemBuilder
 * @param {$ItemBuilder$$Type} itemBuilder
 */
function $ItemBuilderWrapper(itemBuilder) {
    this._id = itemBuilder.id.getNamespace() + ":" + itemBuilder.id.getPath()
}
$ItemBuilderWrapper.prototype = {
    /**
     * 用于绑定构建器实例
     * @param {$CurioCapBuilder} curiosCapBuilder
     */
    attachCurioCap: function (curiosCapBuilder) {
        curiosCapabilities.set(this._id, curiosCapBuilder)
    }
}

/**
 * 由ItemStack获取其对应的$CurioCapBuilder
 * @param {$ItemStack$$Type} itemStack
 * @returns {$CurioCapBuilder}
 */
function getCurioCapBuilder(itemStack) {
    let itemId = String(itemStack.getId())
    return curiosCapabilities.has(itemId) ? curiosCapabilities.get(itemId) : null
}

function $CurioCapBuilder() {
    this._handlers = {}
    this._attributes = []
}

$CurioCapBuilder.prototype = {
    /**
     * 穿戴饰品时触发
     * @param {*} callback 只保存回调，不负责参数限制
     * @returns {$CurioCapBuilder}
     */
    onEquip: function (callback) {
        this._handlers.onEquip = callback
        return this
    },
    /**
     * 取下饰品时触发
     * @param {*} callback
     * @returns {$CurioCapBuilder}
     */
    onUnequip: function (callback) {
        this._handlers.onUnequip = callback
        return this
    },
    canEquip: function (callback) {
        this._handlers.canEquip = callback
        return this
    },
    canUnequip: function (callback) {
        this._handlers.canUnequip = callback
        return this
    },

    /**
     * 用于添加属性
     * @param {$Attribute$$Type} attribute
     * @param {$AttributeModifier$Operation$$Type} operation
     * @param {double} ammount
     * @param {$ResourceLocation$$Type} id
     * @returns {$CurioCapBuilder}
     */
    addAttribute: function (attribute, operation, ammount, id) {
        this._attributes.push({
            attribute: attribute,
            modifier: {
                operation: operation,
                ammount: ammount,
                id: id
            }
        })
        return this
    }

}


NativeEvents.onEvent(
    Java.loadClass("top.theillusivec4.curios.api.event.CurioChangeEvent"),
    event => {
        const { entity, from, to, slotIndex, identifier } = event
        let toBuilder = getCurioCapBuilder(to)
        let fromBuilder = getCurioCapBuilder(from)
        if (toBuilder?._handlers?.onEquip) {
            // 装备
            toBuilder._handlers.onEquip(entity, from, to, slotIndex, identifier)
        }
        if (fromBuilder?._handlers?.onUnequip) {
            // 卸下
            fromBuilder._handlers.onUnequip(entity, from, to, slotIndex, identifier)
        }
    }
)

NativeEvents.onEvent(
    Java.loadClass("top.theillusivec4.curios.api.event.CurioCanEquipEvent"),
    event => {
        const { entity, stack, equipResult, slotContext } = event
        let builder = getCurioCapBuilder(stack)
        if (builder?._handlers?.canEquip) {
            builder._handlers.canEquip(entity, stack, equipResult, slotContext)
        }
    }
)

NativeEvents.onEvent(
    Java.loadClass("top.theillusivec4.curios.api.event.CurioCanUnequipEvent"),
    event => {
        const { entity, stack, unequipResult, slotContext } = event
        let builder = getCurioCapBuilder(stack)
        if (builder?._handlers?.canUnequip) {
            builder._handlers.canUnequip(entity, stack, unequipResult, slotContext)
        }
    }
)

NativeEvents.onEvent(
    Java.loadClass("top.theillusivec4.curios.api.event.CurioAttributeModifierEvent"),
    event => {
        const { itemStack } = event
        let builder = getCurioCapBuilder(itemStack)
        if (builder && Array.isArray(builder._attributes)) {
            builder._attributes.forEach(attribute => {
                event.addModifier(attribute.attribute, {
                    operation: attribute.modifier.operation,
                    amount: attribute.modifier.ammount,
                    id: attribute.modifier.id
                })
            })
        }
    }
)

//正式注册
StartupEvents.registry('item', event => {
    event.create("blue_star")
        .texture('kubejs:item/curios/blue_star')
        .tag("curios:ego")
        .unstackable()
        .component($ConfluenceMagicLib.MOD_RARITY, $ModRarity.MASTER)
    /*
    .attachCurioCap(
        new $CurioCapBuilder()
            .onEquip(entity => {
                if (entity instanceof $Player) {
                    entity.abilities.mayfly = true
                    entity.onUpdateAbilities()
                }
            })
            .onUnequip(entity => {
                if (entity instanceof $Player) {
                    if (entity.isCreative()) return
                    entity.abilities.mayfly = false
                    entity.abilities.flying = false
                    entity.onUpdateAbilities()
                }
            })
            .addAttribute("generic.luck", "add_value", 1, "kubejs:blue_star.luckadd")
    )
    */
    event.create("red_skull")
        .texture('kubejs:item/curios/red_skull')
        .tag("curios:head")
        .unstackable()
        .component($ConfluenceMagicLib.MOD_RARITY, $ModRarity.MASTER)
    event.create("sanity_curios")
        .texture('kubejs:item/curios/sanity_curios')
        .tag("curios:necklace")
        .unstackable()
        .component($ConfluenceMagicLib.MOD_RARITY, $ModRarity.MASTER)
    event.create("heart_of_darkness")
        .texture('kubejs:item/curios/heart_of_darkness')
        .tag("curios:ego")
        .unstackable()
        .component($ConfluenceMagicLib.MOD_RARITY, $ModRarity.MASTER)
    event.create("low_heart_of_darkness")
        .texture('kubejs:item/curios/low_heart_of_darkness')
        .tag("curios:ego")
        .unstackable()
        .component($ConfluenceMagicLib.MOD_RARITY, $ModRarity.MASTER)
    event.create("draedon_heart")
        .texture('kubejs:item/curios/draedon_heart')
        .tag("curios:ego")
        .unstackable()
        .component($ConfluenceMagicLib.MOD_RARITY, $ModRarity.MASTER)
    new $ItemBuilderWrapper(
        event.create("mana_flower")
            .texture('kubejs:item/curios/mana_flower')
            .tag("curios:accessory")
            .unstackable()
            .component($ConfluenceMagicLib.MOD_RARITY, $ModRarity.MASTER)
    )
        .attachCurioCap(
            new $CurioCapBuilder()
                .addAttribute("irons_spellbooks:max_mana", "add_value", 100, "kubejs:mana_flower.max_mana")
        )
    event.create("totem_of_undying")
        .texture('kubejs:item/curios/totem_of_undying')
        .tag("curios:charm")
        .unstackable()
        .component($ConfluenceMagicLib.MOD_RARITY, $ModRarity.MASTER)
    event.create("red_shoes")
        .texture('kubejs:item/curios/red_shoes')
        .tag("curios:ego")
        .unstackable()
        .component($ConfluenceMagicLib.MOD_RARITY, $ModRarity.MASTER)
    event.create("fragment_of_the_universe")
        .texture('kubejs:item/curios/fragment_of_the_universe')
        .tag("curios:ego")
        .unstackable()
        .component($ConfluenceMagicLib.MOD_RARITY, $ModRarity.MASTER)
    event.create("fluid_sac")
        .texture('kubejs:item/curios/fluid_sac')
        .tag("curios:ego")
        .unstackable()
        .component($ConfluenceMagicLib.MOD_RARITY, $ModRarity.MASTER)
    event.create("melting_eyeball")
        .texture('kubejs:item/curios/melting_eyeball')
        .tag("curios:ego")
        .unstackable()
        .component($ConfluenceMagicLib.MOD_RARITY, $ModRarity.MASTER)
    event.create("papyrus_scarab")
        .texture('kubejs:item/curios/papyrus_scarab')
        .tag("curios:necklace")
        .unstackable()
        .component($ConfluenceMagicLib.MOD_RARITY, $ModRarity.MASTER)
    event.create("necromantic_scroll")
        .texture('kubejs:item/curios/necromantic_scroll')
        .tag("curios:necklace")
        .unstackable()
        .component($ConfluenceMagicLib.MOD_RARITY, $ModRarity.MASTER)
    new $ItemBuilderWrapper(
        event.create("mana_regeneration_band")
            .texture('kubejs:item/curios/mana_regeneration_band')
            .tag("curios:accessory")
            .unstackable()
            .component($ConfluenceMagicLib.MOD_RARITY, $ModRarity.MASTER)
    )
        .attachCurioCap(
            new $CurioCapBuilder()
                .addAttribute("irons_spellbooks:mana_regen", "add_multiplied_base", 0.2, "kubejs:mana_regeneration_band.mana_regen")
                .addAttribute("irons_spellbooks:max_mana", "add_value", 50, "kubejs:mana_regeneration_band.max_mana")
        )
    new $ItemBuilderWrapper(
        event.create("arcane_flower")
            .texture('kubejs:item/curios/arcane_flower')
            .tag("curios:accessory")
            .unstackable()
            .component($ConfluenceMagicLib.MOD_RARITY, $ModRarity.MASTER)
    )
        .attachCurioCap(
            new $CurioCapBuilder()
                .addAttribute("terra_curio:player.aggro", "add_value", -400, "kubejs:arcane_flower.aggro")
                .addAttribute("irons_spellbooks:max_mana", "add_value", 100, "kubejs:arcane_flower.max_mana")
        )
    event.create("mana_cloak")
        .texture('kubejs:item/curios/mana_cloak')
        .tag("curios:accessory")
        .unstackable()
        .component($ConfluenceMagicLib.MOD_RARITY, $ModRarity.MASTER)
    new $ItemBuilderWrapper(
        event.create("band_of_starpower")
            .texture('kubejs:item/curios/band_of_starpower')
            .tag("curios:accessory")
            .unstackable()
            .component($ConfluenceMagicLib.MOD_RARITY, $ModRarity.MASTER)
    )
        .attachCurioCap(
            new $CurioCapBuilder()
                .addAttribute("irons_spellbooks:max_mana", "add_value", 50, "kubejs:band_of_starpower.max_mana")
        )
    new $ItemBuilderWrapper(
        event.create("magnet_flower")
            .texture('kubejs:item/curios/magnet_flower')
            .tag("curios:accessory")
            .unstackable()
            .component($ConfluenceMagicLib.MOD_RARITY, $ModRarity.MASTER)
    )
        .attachCurioCap(
            new $CurioCapBuilder()
                .addAttribute("terra_curio:player.pickup_range", "add_multiplied_base", 0.4, "kubejs:magnet_flower.pickup_range")
        )
    event.create("magic_cuffs")
        .texture('kubejs:item/curios/magic_cuffs')
        .tag("curios:accessory")
        .unstackable()
        .component($ConfluenceMagicLib.MOD_RARITY, $ModRarity.MASTER)

});


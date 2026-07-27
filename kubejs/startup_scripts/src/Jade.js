const $WailaClientRegistration = Java.loadClass("snownee.jade.impl.WailaClientRegistration")
const $BlockAccessor = Java.loadClass("snownee.jade.api.BlockAccessor")

const tinOres = [
    "alltheores:tin_ore",
    "alltheores:deepslate_tin_ore",
    "alltheores:nether_tin_ore",
    "alltheores:end_tin_ore",
    "alltheores:other_tin_ore",
]

StartupEvents.postInit(() => {
    $WailaClientRegistration.instance().addTooltipCollectedCallback(0, (rootElement, accessor) => {
        if (!(accessor instanceof $BlockAccessor)) return
        let item = accessor.getPickedResult()
        if (!tinOres.includes(item.item.id)) return

        rootElement["add(net.minecraft.network.chat.Component)"](
            Text.translate("tooltip.common.core_suppression_unit_form_one").darkGreen()
        )
    })
})
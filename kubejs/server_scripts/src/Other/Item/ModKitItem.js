ItemEvents.firstRightClicked('silentgear:mod_kit', event => {
    const item = event.item
    const player = event.player

    if (!(item.getItem() instanceof $ModKitItem)) return

    // 决定切换方向
    const direction = player.isCrouching() ? "PREVIOUS" : "NEXT"

    // 执行切换
    const result = cyclePartType(item, player, direction)

    if (result.success) {
        // 显示切换结果
        const directionKey = result.direction === "PREVIOUS" ? "previous" : "next"
        player.tell(Text.translate('tooltip.kubejs.mod_kit.switched.' + directionKey))
        player.tell(Text.translate('tooltip.kubejs.mod_kit.current_part_type', result.displayName))
    } else {
        player.tell(Text.translate('tooltip.kubejs.mod_kit.switch_failed', result.message))
    }
})

ItemEvents.firstLeftClicked('silentgear:mod_kit', event => {
    const item = event.item
    const player = event.player

    if (!(item.getItem() instanceof $ModKitItem)) return

    const info = getCurrentPartTypeInfo(item)

    if (info.success) {
        player.tell(Text.translate('tooltip.kubejs.mod_kit.header'))
        player.tell(Text.translate('tooltip.kubejs.mod_kit.current_part_type', info.displayName))

        if (info.isNone) {
            const removableTypes = getRemovableTypesFromRegistry()
            if (removableTypes.length > 0) {
                player.tell(Text.translate('tooltip.kubejs.mod_kit.right_click_to_cycle', removableTypes.length))
            } else {
                player.tell(Text.translate('tooltip.kubejs.mod_kit.no_available_types'))
            }
        }
    } else {
        player.tell(Text.translate('tooltip.kubejs.mod_kit.get_info_failed', info.error))
    }
})
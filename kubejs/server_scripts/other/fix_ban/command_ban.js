const commandMap = {
    "tp": {
        "disabled": false, // 是否禁用该命令（true=禁用，false=不强制禁用）
        "permissionLevel": 4,  // 权限等级（0-4，默认OP是4）
        // "stage": "admin",  // 阶段名称（可选）
        // "dimension": "minecraft:overworld"  // 维度限制（可选）
    },
}

ServerEvents.command(event => {
    const { parseResults, commandName } = event
    const source = parseResults.getContext().getSource()
    if (!source.isPlayer()) return

    const commandConfig = commandMap[commandName]
    if (!commandConfig) return

    const player = source.getPlayer()

    if (commandConfig.disabled) {
        player.sendSystemMessage(
            { text: "⚠ 该命令已被禁用", color: "red" },
            true
        )
        event.cancel()
        return
    }

    // 权限检查
    if (commandConfig.permissionLevel && !source.hasPermission(commandConfig.permissionLevel)) {
        player.sendSystemMessage(
            { text: "⚠ 你的权限等级不足（要求≥" + commandConfig.permissionLevel + "）", color: "red" },
            true
        )
        event.cancel()
        return
    }

    // 阶段检查
    if (commandConfig.stage && !player.stages.has(commandConfig.stage)) {
        player.sendSystemMessage(
            { text: "⚠ 你需要完成阶段 '" + commandConfig.stage + "' 才能使用此命令", color: "red" },
            true
        )
        event.cancel()
        return
    }

    // 维度检查
    const currentDimension = source.getLevel().id
    if (commandConfig.dimension && commandConfig.dimension !== currentDimension) {
        player.sendSystemMessage(
            { text: "⚠ 你必须在维度 " + commandConfig.dimension + " 才能使用此命令", color: "red" },
            true
        )
        event.cancel()
    }
})
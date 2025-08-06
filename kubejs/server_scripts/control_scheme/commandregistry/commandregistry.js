// 注册命令
ServerEvents.commandRegistry(event => {
    const { commands: Commands, arguments: Arguments } = event;

    event.register(
        Commands.literal('rf')
            .requires(source => source.hasPermission(2))
            //温迪戈状态
            .then(
                Commands.literal('wendigosystem')
                    .then(
                        Commands.literal('toggle')
                            .executes(context => {
                                const player = context.source.player;
                                if (!player) {
                                    context.source.sendFailure('只有玩家可以执行此命令');
                                    return 0;
                                }

                                // 切换温迪戈状态（0=关闭，1=开启）
                                const current = player.persistentData.getInt('wendigo');
                                const newState = current === 0 ? 1 : 0;
                                player.persistentData.putInt('wendigo', newState);

                                player.tell(`§a温迪戈状态已${newState === 1 ? '§c激活' : '§a关闭'}`);
                                return 1;
                            })
                    )
                    .then(
                        Commands.literal('status')
                            .executes(context => {
                                const player = context.source.player;
                                if (!player) {
                                    context.source.sendFailure('只有玩家可以执行此命令');
                                    return 0;
                                }

                                const wendigoState = player.persistentData.getInt('wendigo');
                                player.tell([
                                    `§6[温迪戈系统]`,
                                    `§a当前状态: ${wendigoState === 1 ? '§c已激活' : '§a未激活'}`,
                                    `§e输入 "/rf wendigosystem toggle" 切换状态`
                                ]);
                                return 1;
                            })
                    )
            )
            //死亡惩罚系统
            .then(
                Commands.literal('deathsystem')
                    .then(
                        Commands.literal('toggle')
                            .executes(context => {
                                const player = context.source.player;
                                if (!player) {
                                    context.source.sendFailure('只有玩家可以执行此命令');
                                    return 0;
                                }

                                const newState = !isSystemEnabledForPlayer(player);
                                setSystemEnabledForPlayer(player, newState);
                                player.tell(`§a易碎灵魂已${newState ? '启用' : '禁用'}`);
                                return 1;
                            })
                    )
                    .then(
                        Commands.literal('status')
                            .executes(context => {
                                const player = context.source.player;
                                if (!player) {
                                    context.source.sendFailure('只有玩家可以执行此命令');
                                    return 0;
                                }

                                const enabled = isSystemEnabledForPlayer(player);
                                const deaths = player.persistentData.contains(DEATH_COUNT_KEY)
                                    ? player.persistentData.getInt(DEATH_COUNT_KEY)
                                    : 0;

                                player.tell([
                                    `§6[易碎灵魂]`,
                                    `§a系统状态: §f${enabled ? '启用' : '禁用'}`,
                                    `§a死亡次数: §f${deaths}`,
                                    `§a当前生命上限: §f${player.getMaxHealth()}`,
                                    `§e使用"/rf deathsystem toggle"切换系统状态`
                                ]);
                                return 1;
                            })
                    )
                    .then(
                        Commands.literal('reset')
                            .executes(context => {
                                const player = context.source.player;
                                if (!player) {
                                    context.source.sendFailure('只有玩家可以执行此命令');
                                    return 0;
                                }

                                player.persistentData.putInt(DEATH_COUNT_KEY, 0);
                                updateHealth(player);
                                player.tell('§a死亡次数已重置，生命值将在下次重生时恢复');
                                return 1;
                            })
                    )
            )
            // 实体清理命令
            .then(
                Commands.literal('entityclean')
                    .executes(context => {
                        const player = context.source.player;
                        if (!player) {
                            context.source.sendFailure('只有玩家可以执行此命令');
                            return 0;
                        }

                        const cleanedCount = executeEntityCleanup(player.level, player.blockPosition());
                        context.source.sendSuccess(
                            Text.of(`§a[清理系统] §f已清理 §c${cleanedCount} §f个实体`),
                            false
                        );
                        return 1;
                    })
            )
    );
});

ServerEvents.commandRegistry(event => {
    const { commands: Commands } = event;

    event.register(
        Commands.literal('rf')
            .requires(source => source.hasPermission(2))
            // 温迪戈系统
            .then(
                Commands.literal('wendigosystem')
                    .then(
                        Commands.literal('toggle')
                            .executes(context => {
                                const player = context.source.player;
                                if (!player) {
                                    context.source.sendFailure(Text.translate('error.command.player_only'));
                                    return 0;
                                }

                                const current = player.persistentData.getInt('wendigo');
                                const newState = current === 0 ? 1 : 0;
                                player.persistentData.putInt('wendigo', newState);

                                player.tell(
                                    Text.translate('message.wendigo.toggle', [
                                        newState === 1 ?
                                            Text.translate('message.state.enabled').color('red') :
                                            Text.translate('message.state.disabled').color('green')
                                    ]).color('green')
                                );
                                return 1;
                            })
                    )
                    .then(
                        Commands.literal('status')
                            .executes(context => {
                                const player = context.source.player;
                                if (!player) {
                                    context.source.sendFailure(Text.translate('error.command.player_only'));
                                    return 0;
                                }

                                const wendigoState = player.persistentData.getInt('wendigo');
                                player.tell([
                                    Text.translate('title.wendigo').color('gold'),
                                    Text.translate('message.wendigo.status', [
                                        wendigoState === 1 ?
                                            Text.translate('message.state.enabled').color('red') :
                                            Text.translate('message.state.disabled').color('green')
                                    ]).color('green'),
                                    Text.translate('message.wendigo.usage').color('yellow')
                                ]);
                                return 1;
                            })
                    )
            )
            // 死亡惩罚系统
            .then(
                Commands.literal('deathsystem')
                    .then(
                        Commands.literal('toggle')
                            .executes(context => {
                                const player = context.source.player;
                                if (!player) {
                                    context.source.sendFailure(Text.translate('error.command.player_only'));
                                    return 0;
                                }

                                const newState = !isSystemEnabledForPlayer(player);
                                setSystemEnabledForPlayer(player, newState);
                                player.tell(
                                    Text.translate('message.deathsystem.toggle', [
                                        Text.translate(newState ? 'message.state.enabled' : 'message.state.disabled')
                                    ]).color('green')
                                );
                                return 1;
                            })
                    )
                    .then(
                        Commands.literal('status')
                            .executes(context => {
                                const player = context.source.player;
                                if (!player) {
                                    context.source.sendFailure(Text.translate('error.command.player_only'));
                                    return 0;
                                }

                                const enabled = isSystemEnabledForPlayer(player);
                                const deaths = player.persistentData.contains(DEATH_COUNT_KEY) ?
                                    player.persistentData.getInt(DEATH_COUNT_KEY) : 0;

                                player.tell([
                                    Text.translate('title.deathsystem').color('gold'),
                                    Text.translate('message.deathsystem.status', [
                                        Text.translate(enabled ? 'message.state.enabled' : 'message.state.disabled').color('white')
                                    ]).color('green'),
                                    Text.translate('message.deathsystem.deaths', [
                                        Text.of(deaths).color('white')
                                    ]).color('green'),
                                    Text.translate('message.deathsystem.health', [
                                        Text.of(player.getMaxHealth()).color('white')
                                    ]).color('green'),
                                    Text.translate('message.deathsystem.usage').color('yellow')
                                ]);
                                return 1;
                            })
                    )
                    .then(
                        Commands.literal('reset')
                            .executes(context => {
                                const player = context.source.player;
                                if (!player) {
                                    context.source.sendFailure(Text.translate('error.command.player_only'));
                                    return 0;
                                }

                                player.persistentData.putInt(DEATH_COUNT_KEY, 0);
                                updateHealth(player);
                                player.tell(Text.translate('message.deathsystem.reset').color('green'));
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
                            context.source.sendFailure(Text.translate('error.command.player_only'));
                            return 0;
                        }

                        const cleanedCount = executeEntityCleanup(player.level, player.blockPosition());
                        context.source.sendSuccess(
                            Text.translate('message.cleanup.result', [
                                Text.of(cleanedCount).color('red')
                            ]).color('green'),
                            false
                        );
                        return 1;
                    })
            )
    );
});
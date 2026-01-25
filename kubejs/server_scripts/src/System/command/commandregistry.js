// priority: 0
//base
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
            // 抑郁状态
            .then(
                Commands.literal('depression')
                    .then(
                        Commands.literal('toggle')
                            .executes(context => {
                                const player = context.source.player;
                                if (!player) {
                                    context.source.sendFailure(Text.translate('error.command.player_only'));
                                    return 0;
                                }

                                const current = player.persistentData.contains('depression') ?
                                    player.persistentData.getInt('depression') : 0;

                                const newState = current === 0 ? 1 : 0;
                                player.persistentData.putInt('depression', newState);
                                // 发送切换成功的消息
                                player.tell(
                                    Text.translate('message.depression.toggle', [
                                        newState === 1 ?
                                            Text.translate('message.state.enabled').color('dark_purple') :
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

                                const depressionState = player.persistentData.contains('depression') ?
                                    player.persistentData.getInt('depression') : 0;

                                player.tell([
                                    Text.translate('message.depression.status', [
                                        depressionState === 1 ?
                                            Text.translate('message.state.enabled').color('dark_purple') :
                                            Text.translate('message.state.disabled').color('green')
                                    ]).color('green'),
                                    Text.translate('message.depression.usage').color('yellow')
                                ]);
                                return 1;
                            })
                    )
            )
    );
});


//orestage
ServerEvents.commandRegistry(event => {
    const { commands: Commands, arguments: Arguments } = event;

    event.register(
        Commands.literal('rf')
            .requires(source => source.hasPermission(2))
            .then(
                Commands.literal('orestage')
                    .executes(context => {
                        var sender = context.getSource();
                        var highestStage = ReverieFoundry.getHighestUnlockedStage();
                        var stageName = ReverieFoundry.getCurrentStageName();

                        var message = Text.translate('reveriefoundry.status.header')
                            .append(Text.translate('reveriefoundry.status.current_stage', stageName, (highestStage + 1), ReverieFoundry.stages.length))
                            .append(Text.translate('reveriefoundry.status.unlocked_stages', (highestStage + 1)))
                            .append(Text.translate('reveriefoundry.status.config_path', ORE_STAGE_CONFIG_PATH))
                            .append(Text.translate('reveriefoundry.status.open_config')
                                .clickOpenFile(ORE_STAGE_CONFIG_PATH))
                            .append(Text.translate('reveriefoundry.status.separator'));

                        // 显示所有阶段状态
                        for (var i = 0; i < ReverieFoundry.stages.length; i++) {
                            var stageInfo = ReverieFoundry.getStageInfo(i);
                            var statusKey = stageInfo.unlocked ? 'reveriefoundry.status.unlocked' : 'reveriefoundry.status.locked';
                            message = message.append(Text.translate('reveriefoundry.status.stage_display', (i + 1), stageInfo.name)
                                .append(Text.translate(statusKey)));
                        }

                        sender.sendSuccess(message, false);
                        return 1;
                    })
                    .then(
                        Commands.literal('reset')
                            .executes(context => {
                                var sender = context.getSource();
                                ReverieFoundry.reset();
                                sender.sendSuccess(Text.translate('reveriefoundry.reset.success'), true);
                                return 1;
                            })
                    )
                    .then(
                        Commands.literal('reload')
                            .executes(context => {
                                var sender = context.getSource();
                                ReverieFoundry.loadConfig();
                                sender.sendSuccess(Text.translate('reveriefoundry.reload.success'), true);
                                return 1;
                            })
                    )
                    .then(
                        Commands.literal('validate')
                            .executes(context => {
                                var sender = context.getSource();
                                var validCount = 0;
                                var totalCount = ReverieFoundry.stages.length;

                                for (var i = 0; i < ReverieFoundry.stages.length; i++) {
                                    if (ReverieFoundry.validateStageConfig(i)) {
                                        validCount++;
                                    }
                                }

                                var statusKey = validCount === totalCount ? 'reveriefoundry.validate.all_valid' : 'reveriefoundry.validate.partial_valid';
                                sender.sendSuccess(
                                    Text.translate('reveriefoundry.validate.header')
                                        .append(Text.translate('reveriefoundry.validate.valid_stages', validCount, totalCount))
                                        .append(Text.translate('reveriefoundry.validate.status'))
                                        .append(Text.translate(statusKey))
                                        .append(Text.translate('reveriefoundry.validate.cleanup')),
                                    true
                                );

                                // 执行清理并保存
                                ReverieFoundry.cleanupInvalidConfig();
                                ReverieFoundry.saveConfig();

                                return 1;
                            })
                    )
                    .then(
                        Commands.literal('info')
                            .executes(context => {
                                var sender = context.getSource();

                                var message = Text.translate('reveriefoundry.info.header');

                                for (var i = 0; i < ReverieFoundry.stages.length; i++) {
                                    var stageInfo = ReverieFoundry.getStageInfo(i);
                                    message = message.append(Text.translate('reveriefoundry.info.stage_header', (i + 1), stageInfo.name));
                                    message = message.append(Text.translate(stageInfo.unlocked ? 'reveriefoundry.info.unlocked' : 'reveriefoundry.info.locked'));

                                    if (stageInfo.progress && stageInfo.progress.killRequirements) {
                                        for (var j = 0; j < stageInfo.progress.killRequirements.length; j++) {
                                            var killReq = stageInfo.progress.killRequirements[j];
                                            var statusKey = killReq.completed ? 'reveriefoundry.info.completed' : 'reveriefoundry.info.not_completed';
                                            message = message.append(Text.translate('reveriefoundry.info.kill_requirement',
                                                killReq.entity,
                                                killReq.currentCount,
                                                killReq.requiredCount)
                                                .append(Text.translate(statusKey)));
                                        }
                                    }
                                }

                                sender.sendSuccess(message, false);
                                return 1;
                            })
                    )
            )
    );
});
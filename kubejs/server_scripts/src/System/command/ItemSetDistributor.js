// priority: 0
/**
 * 物品分发:
 * 
 * - 自己使用：
 *   - 用法: `/rf give giveItemSet1`
 *   - 描述: 允许任何玩家执行此命令为自己获取物品。
 *     如果命令设置为一次性使用（`oneUse: true`），非管理员玩家只能使用一次。
 *
 * - 指定其他玩家（player）：
 *   - 用法: `/rf give giveItemSet1 玩家名`
 *   - 描述: 管理员可以指定其他玩家给予该套装物品。
 *     对于一次性命令，命令状态会针对目标玩家标记为已使用。
 *
 * - 清除命令状态（clear）：
 *   - 用法: `/rf give giveItemSet2 玩家名 clear`
 *   - 描述: 管理员可以重置一次性命令对特定玩家的使用状态，
 *     允许该玩家再次接收物品。此命令会向执行者和被清除状态的玩家发送反馈信息。
 * 
 * 注意：
 * - 只有管理员可以使用带玩家参数或'clear'选项的命令。
 * - 如果玩家尝试在执行过一次性命令后再次使用，他们会收到提示信息表明已接收过物品。
 *
 * -------------------------------------------------------------------------------------------
 * 
 * 定义用于命令注册的物品套装：
 * 每个物品套装都是一个对象数组，其中：
 * - 'command': 命令名称（例如 giveItemSet1）
 * - 'oneUse': 布尔值，表示非管理员玩家是否只能使用一次
 *            （默认为 false，表示无限制使用）
 * - 'id': 物品id
 * - 'count': 给予的物品数量；可选，未指定时默认为 1
 *
 * 示例格式：
 * [
 *   { command: "commandName", oneUse: boolean },
 *   { id: "itemId", count: number },
 *   ...
 * ]
 *
 * 注意：
 * - 数组中的第一个对象必须包含 'command'，可选择包含 'oneUse'
 * - 后续对象定义要给予的物品，需指定 'id' 和 'count'
 */

const itemSet0 = [
    { command: "randomenchanted", oneUse: true },
    { id: () => getRandomEnchantedBookId(), count: 1 }]

const itemSet1 = [
    { command: "randomscrollid", oneUse: true },
    { id: () => getRandomScrollId(), count: 1 }]

const itemSet2 = [
    { command: "drunkard", oneUse: true },
    { id: `minecraft:bundle[bundle_contents=[{count:1,id:"kubejs:bloody_mary"},{count:1,id:"kubejs:star_beam_rye"},{count:1,id:"kubejs:lightingball"},{count:1,id:"kubejs:everclear"},{count:1,id:"kubejs:evergreen_gin"},{count:1,id:"kubejs:rum"},{count:1,id:"kubejs:caribbean_rum"},{count:1,id:"kubejs:screwdriver"},{count:1,id:"kubejs:white_wine"},{count:1,id:"kubejs:fireball"},{count:1,id:"kubejs:cinnamon_roll"},{count:1,id:"kubejs:moscow_mule"},{count:1,id:"kubejs:purple_haze"},{count:1,id:"kubejs:margarita"},{count:1,id:"kubejs:red_wine"},{count:1,id:"kubejs:tequila"}]]` },
    { id: "kubejs:hangover_tea", count: 6 },
    { id: () => getRandomScrollId(), count: 1 },

];

const itemSet3 = [
    { command: "traveler", oneUse: true },
    { id: "sophisticatedbackpacks:copper_backpack", count: 1 },
    { id: () => getRandomEnchantedBookId(), count: 1 },
    { id: () => getRandomEnchantedBookId(), count: 1 },
    { id: () => getRandomEnchantedBookId(), count: 1 },
    { id: () => getRandomScrollId(), count: 1 },
    { id: "kubejs:exploding_chocolate_bar", count: 5 }
];

const itemSet4 = [
    { command: "sorcerer", oneUse: true },
    { id: "sophisticatedbackpacks:backpack", count: 1 },
    { id: "irons_spellbooks:iron_spell_book", count: 1 },
    { id: "irons_spellbooks:graybeard_staff", count: 1 },
    { id: () => getRandomScrollId(), count: 1 },
    { id: () => getRandomScrollId(), count: 1 },
    { id: () => getRandomScrollId(), count: 1 },
];

const itemSet5 = [
    { command: "warrior", oneUse: true },
    { id: "sophisticatedbackpacks:backpack", count: 1 },
    { id: 'gobber2:gobber2_gooey_bread', count: 8 },
    { id: 'minecraft:iron_sword', count: 1 },
    { id: 'enderscape:end_stone_rubble_shield', count: 1 },
    { id: 'kubejs:everclear', count: 1 },
    { id: () => getRandomScrollId(), count: 1 },

];


// 存储所有奖励设置
const allItemSets = [itemSet0, itemSet1, itemSet2, itemSet3, itemSet4, itemSet5];

// 命令跟踪的全局子类别
const commandSubcategory = 'itemCommands';

ServerEvents.commandRegistry(event => {
    const Commands = event.commands;
    const Arguments = event.arguments;

    const giveCommand = Commands.literal('give');

    allItemSets.forEach(items => {
        if (!items || !items.length || !items[0].command) return;

        const commandName = items[0].command;
        const oneUse = items[0].oneUse || false;

        const itemSetCommand = Commands.literal(commandName)
            // 对非管理员进行检查
            .executes(ctx => {
                const player = ctx.source.player;
                if (ctx.source.hasPermission(2) || manageCommandState(player, commandName, 'canRun', oneUse)) {
                    giveItems(player, items);
                    if (oneUse && !ctx.source.hasPermission(2)) manageCommandState(player, commandName, 'markRun');
                    return 1;
                }
                ctx.source.sendFailure(Component.translatable('rf.command.give.already_received', commandName));
                return 0;
            })
            // 指定其他玩家的权限检查
            .then(
                Commands.argument('player', Arguments.PLAYER.create(event))
                    .requires(source => source.hasPermission(2))
                    .executes(ctx => {
                        let targetPlayer;
                        try {
                            targetPlayer = Arguments.PLAYER.getResult(ctx, 'player');
                            if (!manageCommandState(targetPlayer, commandName, 'canRun', oneUse)) {
                                ctx.source.sendFailure(Component.translatable('rf.command.give.player_already_received', commandName));
                                return 0;
                            }
                            giveItems(targetPlayer, items);
                            if (oneUse) manageCommandState(targetPlayer, commandName, 'markRun');
                            return 1;
                        } catch (error) {
                            if (error.message.includes("No player was found")) {
                                ctx.source.sendFailure(Component.translatable('rf.command.common.player_not_found'));
                            } else {
                                console.error(`意外错误: ${error.message}`);
                                ctx.source.sendFailure(Component.translatable('rf.command.common.unexpected_error'));
                            }
                            return 0;
                        }
                    })
                    .then(
                        Commands.literal('clear')
                            .executes(ctx => {
                                let targetPlayer;
                                try {
                                    targetPlayer = Arguments.PLAYER.getResult(ctx, 'player');
                                    manageCommandState(targetPlayer, commandName, 'clearRun');
                                    ctx.source.sendSystemMessage(Component.translatable('rf.command.give.cleared', commandName, targetPlayer.getName().getString()));
                                    targetPlayer.server.tell(Component.translatable('rf.command.give.cleared_notify', commandName));
                                    return 1;
                                } catch (error) {
                                    if (error.message.includes("No player was found")) {
                                        ctx.source.sendFailure(Component.translatable('rf.command.common.player_not_found'));
                                    } else {
                                        console.error(`意外错误: ${error.message}`);
                                        ctx.source.sendFailure(Component.translatable('rf.command.common.unexpected_error'));
                                    }
                                    return 0;
                                }
                            })
                    )
            );

        giveCommand.then(itemSetCommand);
    });

    event.register(
        Commands.literal('rf')
            .then(giveCommand)
    );
});

/**
 * v2 修复随机附魔不随机.png
 */
function giveItems(player, items) {
    try {
        items.forEach(item => {
            if (item.id) {
                let itemId = item.id;
                if (typeof item.id === 'function') {
                    itemId = item.id();
                }
                player.give(Item.of(itemId, item.count || 1));
            }
        });
        player.server.tell(Component.translatable('rf.command.give.success', items[0].command, player.getName().getString()));
    } catch (error) {
        console.error(`给予物品时出错: ${error.message}`);
        player.server.tell(Component.translatable('rf.command.give.error', items[0].command, error.message));
    }
}

function manageCommandState(player, commandName, action, state) {
    if (!player.persistentData.contains(commandSubcategory)) {
        player.persistentData.put(commandSubcategory, {});
    }

    const data = player.persistentData.get(commandSubcategory);

    switch (action) {
        case 'canRun':
            return !state || data.get(commandName) === null || data.get(commandName) === false;
        case 'markRun':
            data.putBoolean(commandName, true);
            break;
        case 'clearRun':
            data.remove(commandName);
            break;
    }
}
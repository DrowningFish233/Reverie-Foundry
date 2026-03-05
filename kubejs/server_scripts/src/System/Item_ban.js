// 禁用物品列表
let bannedItems = [
    'allthemodium:teleport_pad',
    'malum:weavers_workbench',
    'malum:esoteric_spool',
    'alltheores:enderium_plate',
    /*
    'naraka:soul_infused_redstone_block',
    'naraka:soul_infused_copper_block',
    'naraka:soul_infused_gold_block',
    'naraka:soul_infused_nectarium_sword',
    'naraka:soul_infused_amethyst_sword',
    'naraka:purified_soul_sword',
    'naraka:soul_infused_lapis_sword',
    'naraka:soul_infused_diamond_sword',
    'naraka:soul_infused_emerald_sword',
    'naraka:soul_infused_gold_sword',
    'naraka:soul_infused_copper_sword',
    'naraka:soul_infused_redstone_sword',
    'naraka:purified_soul_upgrade_smithing_template',
    'naraka:soul_stabilizer',
    'naraka:soul_smithing_block',
    'naraka:purified_soul_metal',
    'naraka:soul_infused_nectarium',
    'naraka:soul_infused_amethyst',
    'naraka:soul_infused_lapis',
    'naraka:soul_infused_diamond',
    'naraka:soul_infused_emerald',
    'naraka:soul_infused_gold',
    'naraka:soul_infused_copper',
    'naraka:soul_infused_redstone',
    'naraka:purified_soul_metal_block',
    'naraka:soul_infused_nectarium_block',
    'naraka:soul_infused_amethyst_block',
    'naraka:soul_infused_lapis_block',
    'naraka:soul_infused_diamond_block',
    'naraka:soul_infused_emerald_block'
    */
];

// 材料替换配置(前:需要替换的材料.后:替换为的材料)
const materialMap = {
    'terra_curio:destroyer_emblem': 'kubejs:destroyer_emblem',
    'terra_curio:sorcerer_emblem': 'kubejs:sorcerer_emblem',
    'terra_curio:avenger_emblem': 'kubejs:avenger_emblem',
    'terra_curio:angler_earring': 'kubejs:angler_earring',
    'alltheores:silver_ingot': 'iceandfire:silver_ingot',
    'terra_curio:flying_carpet': 'minecraft:diamond_block',
    'hazennstuff:spider_fang': 'alshanex_familiars:spider_fang',
    'alltheores:zinc_ingot': 'create:zinc_ingot',
    'alltheores:brass_ingot': 'create:brass_ingot',
    'alltheores:brass_nugget': 'create:brass_nugget',
    'silentgems:tanzanite': 'kubejs:tanzanite',
    'silentgems:aquamarine': 'kubejs:aquamarine',
    'silentgems:pearl': 'kubejs:pearl',
    'alltheores:sapphire': 'iceandfire:sapphire_gem',
    'silentgems:sapphire': 'alltheores:sapphire',
    'alltheores:sapphire_block': 'iceandfire:sapphire_block',
    'silentgems:sapphire_block': 'alltheores:sapphire_block',
    'silentgems:garnet': 'kubejs:garnet',
    'silentgems:peridot': 'alltheores:peridot',
    'silentgems:peridot_block': 'alltheores:peridot_block',
    'silentgems:ruby_block': 'alltheores:ruby_block',
    'silentgems:ruby': 'kubejs:ruby',
    'alltheores:ruby': 'kubejs:ruby',
    'silentgems:rose_quartz': 'create:rose_quartz',
    'alltheores:brass_block': 'create:brass_block',
    'alltheores:netherite_plate': 'kubejs:netherite_plate',
    'alltheores:netherite_dust': 'kubejs:netherite_dust',
    'alltheores:netherite_rod': 'kubejs:netherite_rod',
    'silentgear:bronze_ingot': 'alltheores:bronze_ingot'

};

// 移除禁用物品的配方
ServerEvents.recipes(event => {
    // 移除禁用物品配方
    bannedItems.forEach(item => {
        event.remove({ output: item });
    });

    // 移除旧材料配方
    Object.keys(materialMap).forEach(oldItem => {
        event.remove({ output: oldItem });
    });

    // 替换输入材料
    Object.keys(materialMap).forEach(oldItem => {
        const newItem = materialMap[oldItem];
        event.replaceInput({}, oldItem, newItem);
    });

    // 替换输出材料
    Object.keys(materialMap).forEach(oldItem => {
        const newItem = materialMap[oldItem];
        event.replaceOutput({}, oldItem, newItem);
    });
});



// 物品变化监听
PlayerEvents.inventoryChanged(event => {
    const player = event.player;
    const changedItem = event.item;
    const inventory = player.inventory.items;

    // 处理禁用物品
    if (bannedItems.includes(changedItem.id)) {
        event.server.tell([
            Text.darkRed("[警告] ").bold(),
            Text.gold(changedItem.id).bold(),
            Text.gray("这件物品已被禁用")
        ]);

        // 移除物品
        for (let i = 0; i < inventory.length; i++) {
            if (inventory[i]?.id === changedItem.id) {
                inventory[i].count = 0;
            }
        }
        return;
    }

    // 处理材料替换
    if (materialMap[changedItem.id]) {
        const newItem = materialMap[changedItem.id];
        const count = changedItem.count;

        // 移除旧物品
        for (let item of inventory) {
            if (item?.id === changedItem.id) {
                item.count = 0;
            }
        }

        // 添加新物品
        if (count > 0) {
            player.give(Item.of(newItem, count));
        }

        event.server.tell([
            Text.darkGreen("[材料转换] ").bold(),
            Text.gold(changedItem.id),
            Text.gray(" 已转换为 "),
            Text.aqua(newItem)
        ]);
    }
});


// 物品变化监听
PlayerEvents.inventoryChanged(event => {
    const player = event.player;
    const changedItem = event.item;
    const inventory = player.inventory.items;
    const mimicream_blacklist = [
        "kubejs:mark"
    ]
    // 处理禁用物品
    if (mimicream_blacklist.includes(changedItem.id)) {
        event.server.tell([
            Text.translate("message.mark.ban").bold(),
        ]);
        // 移除物品
        for (let i = 0; i < inventory.length; i++) {
            if (inventory[i]?.id === changedItem.id) {
                inventory[i].count = 0;
            }
        }
        return;
    }
});

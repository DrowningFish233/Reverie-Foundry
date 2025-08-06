/*
ItemEvents.rightClicked(event => {
    const player = event.player;
    const mainHandItem = player.getMainHandItem();

    if (mainHandItem.isEmpty()) return;

    // 提取命名空间和物品ID
    const [modNamespace, itemId] = mainHandItem.id.split(':');

    // 定义各mod的材料路径映射
    const modPathMap = {
        'minecraft': 'kubejs/data/kubejs/config/silentgear_materials',
        'silentgear': 'kubejs/data/kubejs/config/silentgear_materials',
        'silentgems': 'kubejs/data/silentgems/silentgear_materials',
        'irons_spellbooks': 'kubejs/data/kubejs/silentgear_materials',
        'default': 'kubejs/data/kubejs/silentgear_materials'
    };

    // 获取对应mod的路径，没有则使用默认路径
    const basePath = modPathMap[modNamespace] || modPathMap['default'];
    const jsonPath = `${basePath}/rod/${itemId}.json`;

    const jsonData = JsonIO.read(jsonPath);

    if (!jsonData || !jsonData.properties || !jsonData.properties["silentgear:rod"]) {
        player.tell(`§c${modNamespace}:${itemId} 的材料配置不存在于路径: ${jsonPath}`);
        return;
    }

    const rodProps = jsonData.properties["silentgear:rod"];

    // 操作类型映射
    const formatOperation = (op) => ({
        "MULTIPLY_TOTAL": "总乘算",
        "ADD": "直接相加",
        "MULTIPLY_BASE": "基础乘算"
    })[op] || op;

    // 属性显示配置（简化为核心属性）
    const propertyConfig = {
        "armor": { name: "护甲值" },
        "armor_durability": { name: "护甲耐久" },
        "armor_toughness": { name: "护甲韧性" },
        "attack_damage": { name: "攻击伤害" },
        "attack_speed": { name: "攻击速度" },
        "durability": { name: "耐久度" },
        "enchantment_value": { name: "附魔等级" },
        "harvest_speed": { name: "采集速度" },
        "magic_armor": { name: "魔法抗性" },
        "magic_damage": { name: "魔法伤害" },
        "ranged_damage": { name: "远程伤害" },
        "rarity": { name: "稀有度" },

        // 特殊部件属性
        "arrow_speed": { name: "箭速" },
        "arrow_accuracy": { name: "箭精度" },
        "charge_velocity": { name: "充能速度" },
        "coating_efficiency": { name: "涂层效率" }
    };

    let message = `§6[ ${modNamespace}:${itemId} 属性 ]§r\n§7----------------§r\n`;

    // 智能数值显示
    Object.entries(propertyConfig).forEach(([prop, config]) => {
        if (rodProps[prop]) {
            const value = rodProps[prop].value;
            const operation = rodProps[prop].operation;

            let displayValue;
            if (operation === "ADD") {
                // 加算属性：显示原始值
                displayValue = (value > 0 ? '+' : '') + value;
            } else {
                // 乘算属性：显示百分比
                displayValue = (value > 0 ? '+' : '') + Math.round(value * 100) + '%';
            }

            message += `§a${config.name}: §f${displayValue} `;
            message += `§7(${formatOperation(operation)})§r\n`;
        }
    });

    // 特性显示
    if (rodProps.traits?.length > 0) {
        message += `§a特性: §f${rodProps.traits.map(t => t.split(':')[1]).join(', ')}§r`;
    }

    player.tell(message);
});

*/
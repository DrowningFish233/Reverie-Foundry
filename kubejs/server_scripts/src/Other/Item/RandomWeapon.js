ItemEvents.firstRightClicked('kubejs:randomweapon', event => {
    let player = event.player;

    let weaponTypes = [
        "silentgear:pickaxe",
        "silentgear:shovel",
        "silentgear:axe",
        "silentgear:hoe",
        "silentgear:shears",
        "silentgear:hammer",
        "silentgear:excavator",
        "silentgear:saw",
        "silentgear:sickle",
        "silentgear:mattock",
        "silentgear:paxel",
        "silentgear:prospector_hammer",
        "silentgear:sword",
        "silentgear:katana",
        "silentgear:machete",
        "silentgear:spear",
        "silentgear:mace",
        "silentgear:dagger",
        "silentgear:knife",
        "silentgear:bow",
        "silentgear:crossbow",
        "silentgear:slingshot",
        "silentgear:trident",
        "silentgear:fishing_rod",
        "silentgear:shield",
        "silentgear:helmet",
        "silentgear:chestplate",
        "silentgear:leggings",
        "silentgear:boots",
        "silentgear:elytra",
        "silentgear:arrow",
        "silentgear:bracelet",
        "silentgear:necklace",
        "silentgear:ring"
    ];

    let randomWeapon = weaponTypes[Math.floor(Math.random() * weaponTypes.length)];
    try {
        let itemId = $ResourceLocation.tryParse(randomWeapon);
        let item = $BuiltInRegistries.ITEM.get(itemId);

        if (!item) return;

        if (item instanceof $GearItem) {
            // 尝试创建武器，最多重试10次
            let randomGear = null;
            let attempts = 0;
            let maxAttempts = 10;

            while (attempts < maxAttempts) {
                attempts++;

                randomGear = $GearGenerator.create(item);

                if (randomGear && !randomGear.isEmpty() && validateGear(randomGear)) {
                    // 获取稀有度数值
                    let rarityValue = getRarityValue(randomGear);

                    let isAllowed = RarityCheck(player, rarityValue);

                    if (isAllowed) {
                        break;
                    } else {
                        randomGear = null;
                        continue;
                    }
                } else {
                    randomGear = null;
                }
            }

            if (randomGear && !randomGear.isEmpty()) {
                // 给予玩家
                let success = player.give(randomGear);
                let gearName = randomGear.getDisplayName().getString();
                player.tell(Text.translate('message.reverie_foundry.gear_obtained', gearName));
                event.item.count--;
            } else {
                player.tell(Text.translate('message.reverie_foundry.gear_failed'))
                event.item.count--;
                console.log(`[Reverie Foundry]未能生成有效装备 (最大尝试次数: ${maxAttempts})`);
            }
            return;
        }
        return;
    } catch (error) {
        console.log('[Reverie Foundry]创建随机武器时出错:', error);
    }
});

// 验证武器是否有效
function validateGear(itemStack) {
    try {
        if (!$GearHelper.isGear(itemStack)) {
            return false;
        }
        // 检查是否破损
        if ($GearHelper.isBroken(itemStack)) {
            return false;
        }

        // 检查耐久度
        let maxDamage = itemStack.getMaxDamage();
        if (maxDamage <= 0) {
            return false;
        }

        let properties = $GearData.getProperties(itemStack);
        if (!properties) {
            return false;
        }

        let construction = $GearData.getConstruction(itemStack);
        if (!construction || construction.parts().isEmpty()) {
            return false;
        }

        return true;
    } catch (e) {
        console.log('[Reverie Foundry]验证武器时出错:', e);
        return false;
    }
}

// 获取具体的稀有度数值
function getRarityValue(itemStack) {
    try {
        // 获取属性数据
        let properties = $GearData.getProperties(itemStack);
        let rarity = Math.round(properties.getNumber($GearProperties.RARITY.get()));

        return rarity;
    } catch (e) {
        console.log('[Reverie Foundry]获取稀有度数值时出错:', e);
        return 10;
    }
}

function RarityCheck(player, rarityValue) {
    let pData = player.persistentData;
    let killCount = pData.getInt("kill") || 0;

    const baseMaxRarity = 10; // 基础上限
    const rarityPerKill = 10; // 每击杀一个boss增加的稀有度上限

    // 计算总稀有度上限
    let maxAllowedRarity = baseMaxRarity + (killCount * rarityPerKill);

    return rarityValue <= maxAllowedRarity;
}

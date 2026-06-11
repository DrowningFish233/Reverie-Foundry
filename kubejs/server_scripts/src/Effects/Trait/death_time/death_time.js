//时间节点:濒死
function death_time(event) {
    const player = event.player;
    if (!player || !player.isLiving()) return
    const currentHealth = player.getHealth();
    const MaxHealth = player.getMaxHealth();
    const damage = event.damage;
    if (currentHealth <= damage) {
        fight_to_death(event, player) //死斗
        exp_to_death(event, player)//浸血阅历
        one_six_seven_four(event, player)
        gift_Heaven(event, player)
    }
    if (MaxHealth == currentHealth) {
        gold_body(event, player, currentHealth) //万金之躯
    }
}


function fight_to_death(event, player) {
    if (!player.hasEffect('kubejs:fight_to_death')) return;
    event.cancel();
}

function gift_Heaven(event, player) {
    let originalItem = player.getMainHandItem()
    let hasTraitInHand = fu_hasTrait(originalItem, "kubejs:gift_heaven");
    let hasTraitInArmor = fu_hasTraitArmor(player, "kubejs:gift_heaven");

    if (!hasTraitInHand && !hasTraitInArmor) return;

    // 检查物品ID是否为指定的Silent Gear武器
    let validItems = [
        'silentgear:sword',
        'silentgear:hammer',
        'silentgear:excavator',
        'silentgear:saw',
        'silentgear:prospector_hammer',
        'silentgear:hoe',
        'silentgear:mattock',
        'silentgear:sickle',
        'silentgear:shears',
        'silentgear:fishing_rod',
        'silentgear:machete',
        'silentgear:katana',
        'silentgear:paxel',
        'silentgear:trident',
        'silentgear:knife',
        'silentgear:dagger',
        'silentgear:mace',
        'silentgear:bow',
        'silentgear:slingshot',
        'silentgear:shovel',
        'silentgear:pickaxe',
        'silentgear:axe',
        'silentgear:shield'
    ];

    if (!validItems.includes(originalItem.id)) return;

    let displayItem = originalItem.copy()

    player.sendData("gift_Heaven", {
        gift_Heaven: true,
        itemId: originalItem.id
    });

    originalItem.shrink(1)
    if (originalItem.count <= 0) {
        player.setMainHandItem(Item.of('minecraft:air'))
    }
    player.setHealth(2)
    player.heal(6)
    event.cancel();
}



function gold_body(event, player, currentHealth) {
    if (!player.hasEffect('kubejs:gold_body')) return;
    if (currentHealth == player.getMaxHealth() && event.damage >= currentHealth) {
        player.setHealth(1);
        player.removeEffect("kubejs:gold_body");
        event.cancel();
    }
}

function one_six_seven_four(event, player) {
    if (!player.hasEffect('kubejs:one_six_seven_four')) return;

    const sanity = player.persistentData.getInt("sanity");
    const isHeads = flipCoin(sanity) === 1;
    if (isHeads) {
        // 正面：免疫伤害并恢复10点生命值
        player.setHealth(Math.min(player.getMaxHealth(), 10));
        player.removeEffect("kubejs:one_six_seven_four"); // 触发后移除效果
        event.cancel();
    }
}


function exp_to_death(event, player) {
    const COOLDOWN_KEY = "exp_to_death_cd"

    if (!fu_hasTraitAnywhere(player, "kubejs:exp_to_death")) {
        return
    }

    if ($CooldownManager.hasCooldown(player, COOLDOWN_KEY)) return

    let xplevel = player.getXpLevel()
    player.setXpLevel(0)
    player.setXp(0)
    player.potionEffects.add("minecraft:absorption", xplevel, (xplevel / 5) * 20)

    $CooldownManager.setCooldown(player, COOLDOWN_KEY, 12000)
}

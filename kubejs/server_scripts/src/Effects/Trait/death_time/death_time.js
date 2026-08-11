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
    let equippedItem = null;
    let slotToClear = -1;
    let isCurio = false;
    let curioIndex = -1;

    let inventory = player.getInventory();

    let curiosInventory = $CuriosApi.getCuriosInventory(player);
    if (curiosInventory.isPresent()) {
        let inv = curiosInventory.get();
        let equippedCurios = inv.getEquippedCurios();
        if (equippedCurios) {
            let size = equippedCurios.getSlots();
            for (let i = 0; i < size; i++) {
                let item = equippedCurios.getStackInSlot(i);
                if (!item.isEmpty() && fu_hasTrait(item, "kubejs:gift_heaven") && fu_isGear(item)) {
                    equippedItem = item;
                    isCurio = true;
                    curioIndex = i;
                    break;
                }
            }
        }
    }

    if (!equippedItem) {
        let mainHand = player.getMainHandItem();
        if (!mainHand.isEmpty() && fu_hasTrait(mainHand, "kubejs:gift_heaven") && fu_isGear(mainHand)) {
            equippedItem = mainHand;
            slotToClear = 0;
        }
    }

    if (!equippedItem) {
        let offHand = player.getOffhandItem();
        if (!offHand.isEmpty() && fu_hasTrait(offHand, "kubejs:gift_heaven") && fu_isGear(offHand)) {
            equippedItem = offHand;
            slotToClear = 40;
        }
    }

    if (!equippedItem) {
        let armorSlots = [39, 38, 37, 36];
        for (let i of armorSlots) {
            let item = inventory.extractItem(i, 1, true);
            if (!item.isEmpty() && fu_hasTrait(item, "kubejs:gift_heaven") && fu_isGear(item)) {
                equippedItem = item;
                slotToClear = i;
                break;
            }
        }
    }

    if (!equippedItem) return;

    player.sendData("gift_Heaven", {
        gift_Heaven: true,
        itemId: equippedItem.id
    });

    if (isCurio) {
        let curiosInventory = $CuriosApi.getCuriosInventory(player);
        if (curiosInventory.isPresent()) {
            let inv = curiosInventory.get();
            let equippedCurios = inv.getEquippedCurios();
            if (equippedCurios) {
                equippedCurios.setStackInSlot(curioIndex, Item.of('minecraft:air'));
            }
        }
    } else {
        if (slotToClear === 0) {
            player.setMainHandItem(Item.of('minecraft:air'));
        } else if (slotToClear === 40) {
            player.setOffHandItem(Item.of('minecraft:air'));
        } else {
            inventory.extractItem(slotToClear, 1, false);
        }
    }

    player.setHealth(2);
    player.heal(6);
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
    if (!fu_hasTraitAnywhere(player, "kubejs:exp_to_death")) return;

    trySkill(player, "exp_to_death", 600, () => {
        let xplevel = player.getXpLevel()
        player.setXpLevel(0)
        player.setXp(0)
        player.potionEffects.add("minecraft:absorption", xplevel, (xplevel / 5) * 20)
    })
}
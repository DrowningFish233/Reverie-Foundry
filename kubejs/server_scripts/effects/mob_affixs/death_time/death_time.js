//时间节点:濒死
function death_time(event) {
    const player = event.player;
    if (!player || !player.living) return
    const currentHealth = player.getHealth();
    const MaxHealth = player.getMaxHealth();
    const damage = event.damage;
    if (currentHealth <= damage) {
        fight_to_death(event, player) //死斗
        exp_to_death(event, player)//浸血阅历
        one_six_seven_four(event, player)
    }
    if (MaxHealth == currentHealth) {
        gold_body(event, player, currentHealth) //万金之躯
    }
}


function fight_to_death(event, player) {
    if (!player.hasEffect('kubejs:fight_to_death')) {
        return;
    }
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
    const pData = player.persistentData;
    if (pData.getInt("exp_to_cd") === 0) {
        if (!player.hasEffect('kubejs:exp_to_death')) {
            return;
        }
        let xplevel = player.getXpLevel()
        player.setXpLevel(0)
        player.setXp(0)
        player.potionEffects.add("minecraft:absorption", xplevel, (xplevel / 5) * 20);
        pData.putInt("exp_to_cd", 1);
        event.server.scheduleInTicks(20 * 600, () => {
            pData.putInt("gaexp_to_cdrnet", 0);
        });
    }
}
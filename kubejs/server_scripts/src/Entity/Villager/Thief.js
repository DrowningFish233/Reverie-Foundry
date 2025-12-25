//当玩家因犯罪而受到惩罚时
ThiefEvents.crimeCommited(event => {

})

//当玩家向村民赠送礼物时触发
ThiefEvents.giftGiven(event => {
    let player = event.entity
    if (!fu_hasTraitAnywhere(player, "kubejs:bribery") || !player.isPlayer()) return
    let pData = player.persistentData;
    let Sanity = pData.getInt(sanity) || 0;
    player.heal(1)

    updateplayersanity(player, Sanity + 1)

    player.potionEffects.add(
        "minecraft:hero_of_the_village",
        1 * 30 * 20,
        0,
        false,
        true
    );
})



//当实体的村民声望等级发生变化时触发 v2
//只有附近有村民时触发
ThiefEvents.reputationLevelChanged(event => {
    const criminal = event.criminal();
    const newRep = event.newReputation().toString();

    if (!criminal.isPlayer()) return

    let level = criminal.level
    let pos = criminal.blockPosition()
    let entityType = "minecraft:villager"

    let count = $EntityUtils.getSpecificEntityCountAt(
        level,           // arg0: 世界
        pos,             // arg1: 位置
        6.0,             // arg2: x范围
        6.0,             // arg3: y范围  
        6.0,             // arg4: z范围
        entityType       // arg5: 实体类型
    )
    if (count >= 3) {
        //受敬重
        if (newRep === "RESPECTED" && criminal.isPlayer()) {

            criminal.potionEffects.add(
                "minecraft:hero_of_the_village",
                3 * 60 * 20,
                0,
                false,
                true
            );
        }
        //遭憎恶
        if (newRep === "HATED" && criminal.isPlayer()) {

            criminal.potionEffects.add(
                "fruitsdelight:rage_aura",
                3 * 60 * 20,
                0,
                false,
                true
            );
        }
    }
});

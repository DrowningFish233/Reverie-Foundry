// 定义Boss击杀与阶段解锁的映射列表
const BOSS_STAGES = [
    {
        boss: "irons_spellbooks:dead_king",
        stage: "first_kill_dead_king",
        messages: [
            { text: "first_kill_dead_king.message.a", color: "#ffcc00ff" },
            { text: "first_kill_dead_king.message.b", color: "#ff9d00ff" }
        ]
    },
    {
        boss: "irons_spellbooks:fire_boss",
        stage: "first_kill_fire_boss",
        messages: [
            { text: "first_kill_fire_boss.message.a", color: "#ffcc00ff" },
        ]
    },
    {
        boss: "cataclysm:ender_guardian",
        stage: "first_kill_ender_guardian",
        messages: [
            { text: "first_kill_ender_guardian.message.a", color: "#1ae8ff" },
        ]
    },
    {
        boss: "terra_entity:skeletron",
        stage: "first_kill_skeletron",
        messages: [
            { text: "first_kill_skeletron.message.a", color: "#cfffff" },
        ]
    }
];

// 阶段限制 - 击杀逻辑
EntityEvents.death(event => {
    const player = event.source.player;
    if (!player) return;

    const entityType = event.entity.type;

    // 遍历所有定义的Boss阶段
    BOSS_STAGES.forEach(bossStage => {
        if (!AStages.playerHasStage(bossStage.stage, player) &&
            entityType === bossStage.boss) {

            AStages.addStageToPlayer(bossStage.stage, player);

            bossStage.messages.forEach(msg => {
                event.server.tell(
                    Text.of("")
                        .append(Text.translate(msg.text).color(msg.color))
                );
            });
        }
    });
});
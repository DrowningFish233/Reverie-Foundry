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

EntityEvents.death(event => {
    const { entity, source, server, level } = event;

    const killer = source.player;
    if (!killer) return;

    const entityType = entity.getType();

    BOSS_STAGES.forEach(bossStage => {
        if (entityType === bossStage.boss) {

            let nearbyPlayers = level.getPlayers().filter(player =>
                player.distanceToSqr(entity) <= 256
            );

            nearbyPlayers.forEach(nearbyPlayer => {
                if (!AStages.playerHasStage(bossStage.stage, nearbyPlayer)) {
                    AStages.addStageToPlayer(bossStage.stage, nearbyPlayer);
                }
            });

            if (nearbyPlayers.length > 0) {
                bossStage.messages.forEach(msg => {
                    server.tell(
                        Text.of("").append(Text.translate(msg.text).color(msg.color))
                    );
                });
            }
        }
    });
});
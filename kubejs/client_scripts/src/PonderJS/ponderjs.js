Ponder.registry((event) => {
    event.create(["iceandfire:dragonforge_lightning_core", "iceandfire:dragonforge_ice_core", "iceandfire:dragonforge_fire_core", "iceandfire:dragonforge_lightning_input", "iceandfire:dragonforge_fire_input", "iceandfire:dragonforge_ice_input"])
        .scene("dragonforge_lightning_input", "如何制作龙钢锻炉", (scene, util) => {
            scene.showBasePlate()
            scene.idle(20)
            scene.text(60, "在开始制作之前,你必须拥有:\n龙骨块x8\n龙钢锻炉砖块x17\n龙钢锻炉核心x1\n龙钢锻炉焰孔x1").attachKeyFrame()
            scene.idle(40)
            scene.world.setBlocks([1, 1, 1], "iceandfire:dragon_bone_block");
            scene.world.showSection([1, 1, 1], Direction.DOWN)
            scene.idle(5)

            scene.world.setBlocks([2, 1, 1], "iceandfire:dragonforge_fire_brick");
            scene.world.showSection([2, 1, 1], Direction.DOWN)
            scene.idle(5)

            scene.world.setBlocks([3, 1, 1], "iceandfire:dragon_bone_block");
            scene.world.showSection([3, 1, 1], Direction.DOWN)
            scene.idle(5)


            scene.world.setBlocks([1, 1, 2], "iceandfire:dragonforge_fire_brick");
            scene.world.showSection([1, 1, 2], Direction.DOWN)
            scene.idle(5)

            scene.world.setBlocks([2, 1, 2], "iceandfire:dragonforge_fire_brick");
            scene.world.showSection([2, 1, 2], Direction.DOWN)
            scene.idle(5)

            scene.world.setBlocks([3, 1, 2], "iceandfire:dragonforge_fire_brick");
            scene.world.showSection([3, 1, 2], Direction.DOWN)
            scene.idle(5)


            scene.world.setBlocks([1, 1, 3], "iceandfire:dragon_bone_block");
            scene.world.showSection([1, 1, 3], Direction.DOWN)
            scene.idle(5)

            scene.world.setBlocks([2, 1, 3], "iceandfire:dragonforge_fire_brick");
            scene.world.showSection([2, 1, 3], Direction.DOWN)
            scene.idle(5)

            scene.world.setBlocks([3, 1, 3], "iceandfire:dragon_bone_block");
            scene.world.showSection([3, 1, 3], Direction.DOWN)
            scene.idle(5)



            scene.world.setBlocks([1, 2, 1], "iceandfire:dragonforge_fire_brick");
            scene.world.showSection([1, 2, 1], Direction.DOWN)
            scene.idle(5)

            scene.world.setBlocks([2, 2, 1], "iceandfire:dragonforge_fire_input");
            scene.world.showSection([2, 2, 1], Direction.DOWN)
            scene.text(60, "焰孔必须置于外侧", [2, 2, 1]).attachKeyFrame()
            scene.idle(60)

            scene.world.setBlocks([3, 2, 1], "iceandfire:dragonforge_fire_brick");
            scene.world.showSection([3, 2, 1], Direction.DOWN)
            scene.idle(5)


            scene.world.setBlocks([1, 2, 2], "iceandfire:dragonforge_fire_brick");
            scene.world.showSection([1, 2, 2], Direction.DOWN)
            scene.idle(5)

            scene.world.setBlocks([2, 2, 2], "iceandfire:dragonforge_fire_core");
            scene.world.showSection([2, 2, 2], Direction.DOWN)
            scene.text(60, "锻炉核心则置于内部", [2, 3, 2]).attachKeyFrame()
            scene.idle(60)

            scene.world.setBlocks([3, 2, 2], "iceandfire:dragonforge_fire_brick");
            scene.world.showSection([3, 2, 2], Direction.DOWN)
            scene.idle(5)


            scene.world.setBlocks([1, 2, 3], "iceandfire:dragonforge_fire_brick");
            scene.world.showSection([1, 2, 3], Direction.DOWN)
            scene.idle(5)

            scene.world.setBlocks([2, 2, 3], "iceandfire:dragonforge_fire_brick");
            scene.world.showSection([2, 2, 3], Direction.DOWN)
            scene.idle(5)

            scene.world.setBlocks([3, 2, 3], "iceandfire:dragonforge_fire_brick");
            scene.world.showSection([3, 2, 3], Direction.DOWN)
            scene.idle(5)



            scene.world.setBlocks([1, 3, 1], "iceandfire:dragon_bone_block");
            scene.world.showSection([1, 3, 1], Direction.DOWN)
            scene.idle(5)

            scene.world.setBlocks([2, 3, 1], "iceandfire:dragonforge_fire_brick");
            scene.world.showSection([2, 3, 1], Direction.DOWN)
            scene.idle(5)

            scene.world.setBlocks([3, 3, 1], "iceandfire:dragon_bone_block");
            scene.world.showSection([3, 3, 1], Direction.DOWN)
            scene.idle(5)


            scene.world.setBlocks([1, 3, 2], "iceandfire:dragonforge_fire_brick");
            scene.world.showSection([1, 3, 2], Direction.DOWN)
            scene.idle(5)

            scene.world.setBlocks([2, 3, 2], "iceandfire:dragonforge_fire_brick");
            scene.world.showSection([2, 3, 2], Direction.DOWN)
            scene.idle(5)

            scene.world.setBlocks([3, 3, 2], "iceandfire:dragonforge_fire_brick");
            scene.world.showSection([3, 3, 2], Direction.DOWN)
            scene.idle(5)


            scene.world.setBlocks([1, 3, 3], "iceandfire:dragon_bone_block");
            scene.world.showSection([1, 3, 3], Direction.DOWN)
            scene.idle(5)

            scene.world.setBlocks([2, 3, 3], "iceandfire:dragonforge_fire_brick");
            scene.world.showSection([2, 3, 3], Direction.DOWN)
            scene.idle(5)

            scene.world.setBlocks([3, 3, 3], "iceandfire:dragon_bone_block");
            scene.world.showSection([3, 3, 3], Direction.DOWN)
            scene.idle(20)
            scene.text(60, "等到出现炉子标志即为建造成功").attachKeyFrame()
            scene.idle(60)
        });
});
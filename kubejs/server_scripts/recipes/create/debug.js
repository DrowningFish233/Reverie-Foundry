// priority: 1
ServerEvents.recipes((event) => {
    // 重要提示：这必须是事件处理程序的第一行
    addCreateRecipeHandler(event);

    // 测试配方系统的非标准配方示例

    // 压缩配方：将4种石头材料合并为深板岩
    event.recipes.createCompacting(
        "minecraft:cobbled_deepslate",
        [
            "minecraft:cobblestone",
            "minecraft:andesite",
            "minecraft:granite",
            "minecraft:diorite",
        ]
    )

    // 粉碎配方：带有概率掉落的多重输出
    event.recipes.create.crushing(
        [
            "4x kelp",
            withChance("minecraft:kelp", 0.5, 2),
            withChance("minecraft:wheat_seeds", 1 / 3),
            withChance("minecraft:bone_meal", 0.5),
            withChance("create:experience_nugget", 0.1),
        ],
        ["dried_kelp_block"]
    );

    // 切割配方：基础材料加工
    event.recipes.create.cutting(
        [
            "minecraft:cobblestone",
            "minecraft:stick",
            withChance("minecraft:stick", 0.5),
        ],
        ["minecraft:stone"]
    ).id("inexplicable_sticks");

    // 部署配方：材料组合
    event.recipes.createDeploying(
        "create:brass_ingot",
        [
            "create:andesite_alloy",
            "#c:ingots/copper",
        ]
    );

    // 排空配方：流体提取
    event.recipes.createEmptying(
        ["minecraft:sponge", Fluid.of("water", 250)],
        "minecraft:wet_sponge"
    );

    // 填充配方：流体注入
    event.recipes.createFilling(
        "minecraft:wet_sponge",
        [
            "minecraft:sponge",
            Fluid.of("water", 250),
        ],
    );

    // 灵魂火炼制：特殊转化
    event.recipes.createHaunting(
        [
            "create:nixie_tube",
            "minecraft:iron_nugget",
        ],
        "create:electron_tube"
    );

    // 物品应用：材料合成
    event.recipes.createItemApplication(
        "slime_block",
        [
            "minecraft:hay_block",
            "minecraft:slime_ball",
        ],
    );

    // 机械合成：图案式制作
    event.recipes.createMechanicalCrafting(
        "minecraft:piston",
        ["CPIPC", "CPRPC", "CCCCC"],
        {
            C: "#c:cobblestones",
            P: "#minecraft:planks",
            R: "#c:dusts/redstone",
            I: "#c:ingots/iron",
        }
    ).id("wide_piston_hehe");

    // 研磨配方：材料粉碎
    event.recipes.createMilling(
        [
            "obsidian",
            withChance("create:powdered_obsidian", 0.2),
        ],
        "minecraft:obsidian"
    ).id("inefficient_obsidian_dust_from_milling");

    // 混合配方：高温合成
    event.recipes.createMixing(
        "create:chromatic_compound",
        [
            "#c:dusts/glowstone",
            "#c:dusts/glowstone",
            "#c:dusts/glowstone",
            "create:powdered_obsidian",
            "create:powdered_obsidian",
            "create:powdered_obsidian",
            "create:polished_rose_quartz",
        ]
    ).superheated();

    // 压制配方：材料压缩
    event.recipes.createPressing(
        [
            "scaffolding",
            withChance("stick", 0.5),
        ],
        "bamboo"
    )

    // 抛光配方：表面处理
    event.recipes.createSandpaperPolishing(
        [
            "create:brass_sheet",
        ],
        "create:brass_ingot"
    ).id("high_effort_brass_sheet");

    // 序列组装：多步骤制作过程
    event.recipes.createSequencedAssembly(
        "farmersdelight:organic_compost",
        "farmersdelight:rich_soil",
        [
            event.recipes.createDeploying(
                "farmersdelight:rich_soil",
                [
                    "farmersdelight:rich_soil",
                    "red_mushroom",
                ]
            ),
            event.recipes.createDeploying(
                "farmersdelight:rich_soil",
                [
                    "farmersdelight:rich_soil",
                    "brown_mushroom",
                ]
            ),
        ]
    ).loops(2).transitionalItem("farmersdelight:rich_soil");

    // 复杂序列组装：带有多个处理步骤
    event.recipes
        .createSequencedAssembly(
            [
                withChance("create:large_cogwheel", 32.0, 6),
                withChance("create:brass_ingot", 2.0),
                "minecraft:andesite",
                "create:cogwheel",
                "minecraft:stick",
                "minecraft:iron_nugget",
            ],
            "create:brass_ingot",
            [
                event.recipes.createDeploying("create:large_cogwheel", [
                    "create:large_cogwheel",
                    "#minecraft:planks",
                ]),
                event.recipes.createDeploying("create:large_cogwheel", [
                    "create:large_cogwheel",
                    "#minecraft:wooden_buttons",
                ]),
                event.recipes
                    .createCutting("create:large_cogwheel", "create:large_cogwheel")
                    .processingTime(50),
            ]
        )
        .transitionalItem("create:large_cogwheel")
        .loops(6);

    //这必须是事件处理程序的最后一行
    event.recipes.create.finalize();
});
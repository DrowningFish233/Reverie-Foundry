/**
 * 流体合金配方
 * @param {Array} fluids - 输入流体数组
 * @param {Object} result - 输出流体
 * @param {number} speed - 处理速度
 */
function FluidAlloyingRecipe(fluids, result, speed) {
    this.type = "productivemetalworks:fluid_alloying";
    this.fluids = fluids;
    this.result = {
        amount: result.amount,
        id: result.id
    };
    this.speed = speed;
}

// 原型方法
FluidAlloyingRecipe.prototype = {
    /**
     * 设置处理速度
     * @param {number} speed - 处理速度
     */
    setSpeed: function (speed) {
        this.speed = speed;
        return this;
    }
};

// 流体辅助函数
function createFluid(fluidId, amount) {
    return {
        amount: amount,
        fluid: fluidId
    };
}

// 专门的标签创建函数
function createFluidTag(tagId, amount) {
    return {
        amount: amount,
        tag: tagId
    };
}

ServerEvents.recipes(event => {
    // 包装注册函数
    const register = recipe => {
        const json = JSON.parse(JSON.stringify(recipe));
        event.custom(json);
    };

    register(
        new FluidAlloyingRecipe(
            [
                createFluidTag("c:molten_diamond", 6),
                createFluidTag("c:molten_gold", 3)
            ],
            {
                amount: 9,
                id: "kubejs:enlighted_gold"
            },
            6
        )
    );

    register(
        new FluidAlloyingRecipe(
            [
                createFluidTag("c:molten_aluminum", 5),
                createFluidTag("c:molten_iron", 5)
            ],
            {
                amount: 10,
                id: "kubejs:aluminum"
            },
            6
        )
    );

    register(
        new FluidAlloyingRecipe(
            [
                createFluidTag("c:molten_copper", 15),
                createFluidTag("c:molten_gold", 15)
            ],
            {
                amount: 30,
                id: "kubejs:scepbo"
            },
            6
        )
    );

    register(
        new FluidAlloyingRecipe(
            [
                createFluidTag("c:molten_aluminum", 15),
                createFluidTag("c:molten_silver", 15)
            ],
            {
                amount: 30,
                id: "kubejs:frigidite"
            },
            6
        )
    );

    register(
        new FluidAlloyingRecipe(
            [
                createFluid("kubejs:golden_apple", 15),
                createFluid("kubejs:blood_orb", 10),
                createFluidTag("c:molten_iron", 15),
                createFluidTag("c:molten_diamond", 4)
            ],
            {
                amount: 30,
                id: "kubejs:terraulite"
            },
            6
        )
    );

    register(
        new FluidAlloyingRecipe(
            [
                createFluidTag("c:molten_gold", 15),
                createFluidTag("c:molten_copper", 15)
            ],
            {
                amount: 30,
                id: "kubejs:scepbo"
            },
            6
        )
    );

    register(
        new FluidAlloyingRecipe(
            [
                createFluidTag("c:molten_silver", 15),
                createFluidTag("c:molten_nickel", 15)
            ],
            {
                amount: 30,
                id: "kubejs:silver"
            },
            6
        )
    );

    register(
        new FluidAlloyingRecipe(
            [
                createFluidTag("c:molten_steel", 15),
                createFluid("productivemetalworks:molten_quartz", 15)
            ],
            {
                amount: 30,
                id: "kubejs:silicon"
            },
            6
        )
    );

    register(
        new FluidAlloyingRecipe(
            [
                createFluid("productivemetalworks:molten_redstone", 15),
                createFluidTag("c:molten_copper", 15)
            ],
            {
                amount: 30,
                id: "kubejs:palladium"
            },
            6
        )
    );

    register(
        new FluidAlloyingRecipe(
            [
                createFluid("productivemetalworks:molten_quartz", 10),
                createFluidTag("c:molten_iron", 10),
                createFluidTag("c:molten_aluminum", 10)
            ],
            {
                amount: 30,
                id: "kubejs:palladium"
            },
            6
        )
    );

    register(
        new FluidAlloyingRecipe(
            [
                createFluid("productivemetalworks:molten_slime", 5),
                createFluidTag("c:molten_uranium", 5)
            ],
            {
                amount: 10,
                id: "kubejs:uranium"
            },
            6
        )
    );

    register(
        new FluidAlloyingRecipe(
            [
                createFluid("productivemetalworks:molten_blaze", 10),
                createFluid("productivemetalworks:molten_lapis", 10),
                createFluidTag("c:molten_uranium", 10)
            ],
            {
                amount: 30,
                id: "kubejs:thorium"
            },
            6
        )
    );

    register(
        new FluidAlloyingRecipe(
            [
                createFluidTag("c:molten_copper", 10),
                createFluidTag("c:molten_lead", 10),
                createFluid("productivemetalworks:molten_amethyst", 5)
            ],
            {
                amount: 20,
                id: "kubejs:lead"
            },
            8
        )
    );

    register(
        new FluidAlloyingRecipe(
            [
                createFluid("productivemetalworks:molten_carbon", 10),
                createFluidTag("c:molten_iron", 10),
                createFluid("productivemetalworks:molten_amethyst", 2)
            ],
            {
                amount: 10,
                id: "kubejs:steel"
            },
            8
        )
    );

    register(
        new FluidAlloyingRecipe(
            [
                createFluid("productivemetalworks:molten_steel", 10),
                createFluid("productivemetalworks:molten_amethyst", 4)
            ],
            {
                amount: 10,
                id: "kubejs:steel"
            },
            8
        )
    );

    register(
        new FluidAlloyingRecipe(
            [
                createFluid("productivemetalworks:molten_lapis", 10),
                createFluid("productivemetalworks:molten_redstone", 10),
                createFluidTag("c:molten_iron", 10)

            ],
            {
                amount: 30,
                id: "kubejs:magnetite"
            },
            6
        )
    );

    register(
        new FluidAlloyingRecipe(
            [
                createFluid("minecraft:water", 10),
                createFluid("kubejs:fluorite", 15),
                createFluidTag("c:molten_nickel", 15),
                createFluidTag("c:molten_uranium", 5)
            ],
            {
                amount: 45,
                id: "kubejs:rhodium"
            },
            6
        )
    );

    register(
        new FluidAlloyingRecipe(
            [
                createFluid("minecraft:water", 10),
                createFluid("kubejs:fluorite", 20),
                createFluidTag("c:molten_zinc", 15)
            ],
            {
                amount: 45,
                id: "kubejs:scandium"
            },
            6
        )
    );

    register(
        new FluidAlloyingRecipe(
            [
                createFluidTag("c:molten_bronze", 5),
                createFluid("kubejs:fluorite", 5)
            ],
            {
                amount: 10,
                id: "kubejs:strontium"
            },
            6
        )
    );

    register(
        new FluidAlloyingRecipe(
            [
                createFluid("kubejs:blood_orb", 20),
                createFluidTag("c:molten_steel", 15),
                createFluidTag("kubejs:blood", 10)
            ],
            {
                amount: 45,
                id: "kubejs:vibranite"
            },
            6
        )
    );

    register(
        new FluidAlloyingRecipe(
            [
                createFluid("productivemetalworks:molten_netherite", 10),
                createFluid("kubejs:mithril", 10),
                createFluid("kubejs:viculeam", 10),
                createFluid("kubejs:soul_stained_steel", 10)
            ],
            {
                amount: 30,
                id: "kubejs:ultimate"
            },
            6
        )
    );

    register(
        new FluidAlloyingRecipe(
            [
                createFluid("minecraft:water", 5),
                createFluid("kubejs:blood_orb", 5),
            ],
            {
                amount: 10,
                id: "irons_spellbooks:blood"
            },
            6
        )
    );

    // 铂
    register(
        new FluidAlloyingRecipe(
            [
                createFluidTag("c:molten_gold", 10),
                createFluidTag("c:molten_nickel", 10)
            ],
            {
                amount: 20,
                id: "productivemetalworks:molten_platinum"
            },
            6
        )
    );

    // 铱
    register(
        new FluidAlloyingRecipe(
            [
                createFluidTag("c:molten_platinum", 10),
                createFluidTag("c:molten_uranium", 10)
            ],
            {
                amount: 20,
                id: "productivemetalworks:molten_iridium"
            },
            8
        )
    );

    register(
        new FluidAlloyingRecipe(
            [
                createFluid("kubejs:fluorite", 10),
                createFluidTag("c:molten_iron", 10)
            ],
            {
                amount: 20,
                id: "productivemetalworks:molten_osmium"
            },
            8
        )
    );

    register(
        new FluidAlloyingRecipe(
            [
                createFluid("productivemetalworks:molten_redstone", 5),
                createFluidTag("c:molten_silver", 5)
            ],
            {
                amount: 10,
                id: "productivemetalworks:molten_signalum"
            },
            8
        )
    );
});

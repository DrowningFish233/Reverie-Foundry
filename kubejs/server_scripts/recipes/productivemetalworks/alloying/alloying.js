/*
* 用于制作流体配方(流体+流体=新流体)
*/
ServerEvents.recipes(event => {
  // 合金配方列表
  const alloying = [
    {
      inputs: [ // 输入流体
        { fluid: "kubejs:tellurium", amount: 50 },
        { fluid: "kubejs:isovol", amount: 40 }
      ],
      output: { fluid: "kubejs:gobber2", amount: 90 }, // 输出配置
      speed: 10
    },
    {
      inputs: [ // 输入流体
        { fluid: "kubejs:tellurium", amount: 50 },
        { fluid: "kubejs:isovol", amount: 40 }
      ],
      output: { fluid: "kubejs:gobber2_nether", amount: 90 }, // 输出配置
      speed: 10
    }
  ];

  // 动态生成配方
  alloying.forEach(recipe => {
    event.custom({
      type: "productivemetalworks:fluid_alloying",
      fluids: recipe.inputs,
      result: {
        id: recipe.output.fluid,
        amount: recipe.output.amount
      },
      speed: recipe.speed
    });
  });
});
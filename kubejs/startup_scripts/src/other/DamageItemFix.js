// priority: 0
const attackBonuses = {
    'kubejs:crowbar': 15,
    'allthemodium:allthemodium_sword': -5,
    'allthemodium:allthemodium_pickaxe': -5,
    'allthemodium:allthemodium_axe': -5,
    'allthemodium:allthemodium_hoe': -5,
    'allthemodium:allthemodium_shovel': -5,
    'allthemodium:allthemodium_mace': -5,
    'allthemodium:vibranium_sword': -10,
    'allthemodium:vibranium_pickaxe': -10,
    'allthemodium:vibranium_axe': -10,
    'allthemodium:vibranium_shovel': -10,
    'allthemodium:vibranium_hoe': -10,
    'allthemodium:vibranium_mace': -10,
    'allthemodium:unobtainium_sword': -20,
    'allthemodium:unobtainium_pickaxe': -20,
    'allthemodium:unobtainium_axe': -20,
    'allthemodium:unobtainium_shovel': -20,
    'allthemodium:unobtainium_mace': -20,
    'allthemodium:unobtainium_hoe': -20,
    'kubejs:starfury': 2,
    'kubejs:narrator': 1

};

NativeEvents.onEvent(ItemAttrEvent, event => {
    let itemId = event.itemStack.id;
    let bonus = attackBonuses[itemId];
    if (bonus == null) return;

    event.addModifier("minecraft:generic.attack_damage", {
        id: itemId + "_attack_mod",
        amount: bonus,
        operation: "add_value"
    }, "mainhand");
});
/*
ItemEvents.modification(event => {
    for (let itemId in attackBonuses) {
        event.modify(itemId, item => {
            item.setMaxStackSize(1)
            item.setDamage(item.get("damage") * 3);
            item.setMaxDamage(item.get("max_damage") * 3);
        });
    }
});
*/


const attackspeed = {
    'kubejs:narrator': 2.4
};

NativeEvents.onEvent(ItemAttrEvent, event => {
    let itemId = event.itemStack.id;
    let bonus = attackspeed[itemId];
    if (bonus == null) return;

    event.addModifier("minecraft:generic.attack_speed", {
        id: itemId + "_attack_speed_mod",
        amount: bonus,
        operation: "add_value"
    }, "mainhand");
});

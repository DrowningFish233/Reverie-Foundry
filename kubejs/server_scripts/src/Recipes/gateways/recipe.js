ServerEvents.recipes(event => {
    event.custom({
        "type": "gateways:gate_recipe",
        "group": "gateways",
        "pattern": [
            "FFF",
            "FAF",
            "FFF"
        ],
        "key": {
            "F": {
                "item": "minecraft:ender_pearl"
            },
            "A": {
                "item": "minecraft:heart_of_the_sea"
            }
        },
        "result": {
            "id": "gateways:gate_pearl"
        },
        "gateway": "gateways:basic/ocean"
    })
})
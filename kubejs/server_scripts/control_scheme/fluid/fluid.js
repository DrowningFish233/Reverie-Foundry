PlayerEvents.tick(event => {
    const player = event.player;
    if (!player || player.tickCount % 10 !== 0) return;
    if (isNaN(player.health)) player.setHealth(0);
    let lavaLike = [
        "kubejs:abiding_alloy",
        "kubejs:achroous",
        "kubejs:adamanite",
        "kubejs:acril",
        "kubejs:aero_steel",
        "kubejs:aluminum",
        "kubejs:animated_steel",
        "kubejs:berkelium",
        "kubejs:boron",
        "kubejs:brass",
        "kubejs:bronze",
        "kubejs:calamatium",
        "kubejs:carbonatite",
        "kubejs:celeslar",
        "kubejs:chalyblux",
        "kubejs:chromium",
        "kubejs:cobalt",
        "kubejs:cosmos_aurora",
        "kubejs:dark_cryopla",
        "kubejs:echo",
        "kubejs:electrum",
        "kubejs:enlighted_gold",
        "kubejs:estalt",
        "kubejs:europium",
        "kubejs:frigidite",
        "kubejs:invar",
        "kubejs:iridium",
        "kubejs:isovol",
        "kubejs:lead",
        "kubejs:lustful_haze_alloy",
        "kubejs:luteous",
        "kubejs:magmanite",
        "kubejs:magnesium",
        "kubejs:magnetite",
        "kubejs:midnight_abyssal",
        "kubejs:mythril",
        "kubejs:neptunium",
        "kubejs:nickel",
        "kubejs:nlatstone",
        "kubejs:osmium",
        "kubejs:palladium",
        "kubejs:platinum",
        "kubejs:plumbumanite",
        "kubejs:plutonium",
        "kubejs:polonium",
        "kubejs:rhexis",
        "kubejs:rhodium",
        "kubejs:scandium",
        "kubejs:scepbo",
        "kubejs:silicon",
        "kubejs:silver",
        "kubejs:solimrith",
        "kubejs:starinium",
        "kubejs:starlight_mythril",
        "kubejs:steel",
        "kubejs:stellar",
        "kubejs:strontium",
        "kubejs:tellurium",
        "kubejs:thlanium",
        "kubejs:terraulite",
        "kubejs:thorium",
        "kubejs:thulium",
        "kubejs:tin",
        "kubejs:titanium",
        "kubejs:tungsten",
        "kubejs:ultimate",
        "kubejs:unstable_luminescence",
        "kubejs:uranium",
        "kubejs:vibranite",
        "kubejs:viculeam",
        "kubejs:void",
        "kubejs:vorant",
        "kubejs:xeproda",
        "kubejs:yttrium",
        "kubejs:zapolgium",
        "kubejs:zinc",
        "kubejs:zirconium",
        "kubejs:xelkive",
        "kubejs:lunium_nova",
        "kubejs:gobber2",
        "kubejs:gobber2_nether",
        "kubejs:gobber2_end"
    ];
    let directDamage = 2;
    let fireSecond = 5 * 20;

    let blockUnder = player.block;
    let blockAbove = blockUnder.up;
    if (
        (blockUnder && lavaLike.includes(blockUnder.id.toString())) ||
        (blockAbove && lavaLike.includes(blockAbove.id.toString()))
    ) {
        player.setRemainingFireTicks(fireSecond);
        player.attack(player.damageSources().lava(), directDamage);
    }
});


RecipeViewerEvents.addInformation('item', event => {
    // 海王钓竿
    event.add('aquaculture:neptunium_fishing_rod', [
        '我就是海王!',
        '懂不懂抛竿就收钩的含金量啊！！！'
    ]);

    event.add('malum:eldritch_spirit', [
        '「邪术精魂」',
        '获取方式：击杀末影人、末影螨等末影生物',
        '"萦绕着空间扭曲能量的紫色灵魂"'
    ]);

    event.add('malum:infernal_spirit', [
        '「狱火精魂」',
        '获取方式：击杀烈焰人、岩浆怪等地狱生物',
        '"燃烧着永不熄灭的炼狱之火"'
    ]);

    event.add('malum:wicked_spirit', [
        '「邪恶精魂」',
        '获取方式：击杀僵尸、骷髅等敌对生物',
        '"充满负面情绪的漆黑灵魂"'
    ]);

    event.add('malum:earthen_spirit', [
        '「大地精魂」',
        '获取方式：击杀僵尸类和原版地面动物可获得',
        '"散发着泥土芬芳的厚重灵魂"'
    ]);

    event.add('malum:aerial_spirit', [
        '「澄空精魂」',
        '获取方式：击杀原版马，蜘蛛以及飞行类生物可获得',
        '"如清风般轻盈透明的纯净灵体"'
    ]);

    event.add('malum:sacred_spirit', [
        '「神圣精魂」',
        '获取方式：击杀几乎所有友善生物均可获得',
        '"闪耀着温暖光芒的圣洁灵魂"'
    ]);

    event.add('malum:arcane_spirit', [
        '「奥术精魂」',
        '获取方式：击杀原版任何生物均可获得',
        '"蕴含着原始魔法能量的蓝色光团"'
    ]);

    event.add('malum:aqueous_spirit', [
        '「碧水精魂」',
        '获取方式：击杀溺尸等水生生物获得',
        '"流动着液态生命的水之精华"'
    ]);

    event.add('malum:runic_sap', [
        '「符文树脂」',
        '获取方式：手持玻璃瓶右键去皮富脂符文原木获得',
    ]);

    event.add('malum:cursed_sap', [
        '「诅咒树脂」',
        '获取方式：手持玻璃瓶右键去皮富脂灵魂原木获得',
    ]);

    event.add('alshanex_familiars:pet_soul', [
        '使用玻璃瓶右键捕捉迷失之魂获得'
    ]);
});



//从EMi中删除LGBTQ内容
RecipeViewerEvents.removeEntries('item', event => {
    event.remove('malum:ace_prideweave');
    event.remove('malum:agender_prideweave');
    event.remove('malum:aro_prideweave');
    event.remove('malum:aroace_prideweave');
    event.remove('malum:bi_prideweave');
    event.remove('malum:demiboy_prideweave');
    event.remove('malum:demigirl_prideweave');
    event.remove('malum:enby_prideweave');
    event.remove('malum:gay_prideweave');
    event.remove('malum:genderfluid_prideweave');
    event.remove('malum:genderqueer_prideweave');
    event.remove('malum:intersex_prideweave');
    event.remove('malum:lesbian_prideweave');
    event.remove('malum:pan_prideweave');
    event.remove('malum:plural_prideweave');
    event.remove('malum:poly_prideweave');
    event.remove('malum:pride_prideweave');
    event.remove('malum:trans_prideweave');
    event.remove('malum:weavers_workbench');
})
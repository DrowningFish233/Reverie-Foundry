const $SpellRarity = Java.loadClass("io.redspace.ironsspellbooks.api.spells.SpellRarity");
const $SchoolType = Java.loadClass("io.redspace.ironsspellbooks.api.spells.SchoolType");
const $MagicData = Java.loadClass("io.redspace.ironsspellbooks.api.magic.MagicData")

//扣你法力条
function getPlayerMagicData(player) {
    return $MagicData.getPlayerMagicData(player);
}


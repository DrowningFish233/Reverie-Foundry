// priority: 1000
const $SpellRegistry = Java.loadClass('io.redspace.ironsspellbooks.api.registry.SpellRegistry')
const $CuriosApi = Java.loadClass('top.theillusivec4.curios.api.CuriosApi')
const $DamageSource = Java.loadClass("net.minecraft.world.damagesource.DamageSource");
const $AttributeRegistry = Java.loadClass("io.redspace.ironsspellbooks.api.registry.AttributeRegistry")
const $MagicData = Java.loadClass("io.redspace.ironsspellbooks.api.magic.MagicData")
const $CastSource = Java.loadClass("io.redspace.ironsspellbooks.api.spells.CastSource")
const $resourceLocation = Java.loadClass("net.minecraft.resources.ResourceLocation")
const curiosHelper = $CuriosApi.getCuriosHelper();
const $Random = Java.loadClass("java.util.Random");
const random = new $Random();
const $EnchantmentHelper = Java.loadClass("net.minecraft.world.item.enchantment.EnchantmentHelper");
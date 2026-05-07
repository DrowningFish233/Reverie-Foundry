// priority: 999999
function require(className) {
    return Java.loadClass(className);
}
const $RFUtils = require('com.drowningfish233.reveriefoundry.Utils.RFUtils');
const $DataComponent = require("net.rain.kubejs_datacomponent.KubeJSDataComponent$DataComponentAPI")
const $MobEffectEvent$Remove = require("net.neoforged.neoforge.event.entity.living.MobEffectEvent$Remove");
const ItemAttrEvent = require("net.neoforged.neoforge.event.ItemAttributeModifierEvent");
const $SpellRarity = require("io.redspace.ironsspellbooks.api.spells.SpellRarity");
const $SchoolType = require("io.redspace.ironsspellbooks.api.spells.SchoolType");
const $MagicData = require("io.redspace.ironsspellbooks.api.magic.MagicData")
const $ItemEntity = require("net.minecraft.world.entity.item.ItemEntity");
const $GearHelper = require('net.silentchaos512.gear.util.GearHelper');
const $DamageTypes = require('net.minecraft.world.damagesource.DamageTypes')
const $ModDamageTypes = require('top.theillusivec4.champions.common.registry.ModDamageTypes')
const $ModRarity = require("org.confluence.lib.common.component.ModRarity");
const $ConfluenceMagicLib = require("org.confluence.lib.ConfluenceMagicLib")
const $Player = require("net.minecraft.world.entity.player.Player")
const $SummonManager = require("io.redspace.ironsspellbooks.capabilities.magic.SummonManager")
const $BloodNeedle = require('io.redspace.ironsspellbooks.entity.spells.blood_needle.BloodNeedle')
const $DamageSource = require("net.minecraft.world.damagesource.DamageSource");
const $PotionRegistry = require('io.redspace.ironsspellbooks.registries.PotionRegistry')
const $PotionItem = require('net.minecraft.world.item.PotionItem')
const $DataComponents = require('net.minecraft.core.component.DataComponents')
const $ItemStack = require('net.minecraft.world.item.ItemStack')
const $SpellRegistry = require('io.redspace.ironsspellbooks.api.registry.SpellRegistry')
const $CuriosApi = require('top.theillusivec4.curios.api.CuriosApi')
const $IExtendedMobEffect = require('com.drowningfish233.reveriefoundry.api.IExtendedMobEffect')
const $LivingEquipmentChangeEvent = require("net.neoforged.neoforge.event.entity.living.LivingEquipmentChangeEvent")
const $LivingHealEvent = require("net.neoforged.neoforge.event.entity.living.LivingHealEvent");
const $RegisterKeyMappingsEvent = require("net.neoforged.neoforge.client.event.RegisterKeyMappingsEvent");
const $keyMapping = require("net.minecraft.client.KeyMapping");
const $GameType = require('net.minecraft.world.level.GameType');


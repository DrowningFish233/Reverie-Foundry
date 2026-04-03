// priority: 999
function require(className) {
    return Java.loadClass(className);
}
const $ClientBookRegistry = require('vazkii.patchouli.client.book.ClientBookRegistry')
const $I18n = require('net.minecraft.client.resources.language.I18n');
const $Minecraft = require('net.minecraft.client.Minecraft');
const $Component = require('net.minecraft.network.chat.Component');
const $ResourceLocation = require('net.minecraft.resources.ResourceLocation');
const $FluidStack = require('net.neoforged.neoforge.fluids.FluidStack');
const $Fluids = require('net.minecraft.world.level.material.Fluids');
const $ItemStack = require('net.minecraft.world.item.ItemStack');
const $NonNullList = require('net.minecraft.core.NonNullList');
const $ItemStackHandler = require('net.neoforged.neoforge.items.ItemStackHandler');
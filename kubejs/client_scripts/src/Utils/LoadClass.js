// priority: 999
function require(className) {
    return Java.loadClass(className);
}
const $ClientBookRegistry = require('vazkii.patchouli.client.book.ClientBookRegistry')
const $I18n = require('net.minecraft.client.resources.language.I18n');
const $Minecraft = require('net.minecraft.client.Minecraft');
const $ModularUIScreen = require('com.lowdragmc.lowdraglib2.gui.holder.ModularUIScreen');
const $Component = require('net.minecraft.network.chat.Component');
const $Sprites = require('com.lowdragmc.lowdraglib2.gui.ui.styletemplate.Sprites');
const $Horizontal = require('com.lowdragmc.lowdraglib2.gui.ui.data.Horizontal');
const $ResourceLocation = require('net.minecraft.resources.ResourceLocation');
const $YogaFlexDirection = require('org.appliedenergistics.yoga.YogaFlexDirection');
const $FluidStack = require('net.neoforged.neoforge.fluids.FluidStack');
const $Fluids = require('net.minecraft.world.level.material.Fluids');
const $ItemStack = require('net.minecraft.world.item.ItemStack');
const $NonNullList = require('net.minecraft.core.NonNullList');
const $ItemStackHandler = require('net.neoforged.neoforge.items.ItemStackHandler');
const $CycleItemStackHandler = require('com.lowdragmc.lowdraglib2.misc.CycleItemStackHandler');
const $Scroller = require('com.lowdragmc.lowdraglib2.gui.ui.elements.Scroller');
const $List = require('java.util.List');
const $Arrays = require('java.util.Arrays');
const $FluidTank = require('net.neoforged.neoforge.fluids.capability.templates.FluidTank');
const $ItemHandlerSlot = require('com.lowdragmc.lowdraglib2.gui.slot.ItemHandlerSlot');
const $ChatFormatting = require('net.minecraft.ChatFormatting');
const $SyncStrategy = require('com.lowdragmc.lowdraglib2.gui.sync.bindings.SyncStrategy');
const $Float = require('java.lang.Float');
const $String = require('java.lang.String');
const $ModularUIContainerMenu = require('com.lowdragmc.lowdraglib2.gui.holder.ModularUIContainerMenu');
const $PlayerUIMenuType = require('com.lowdragmc.lowdraglib2.gui.factory.PlayerUIMenuType');
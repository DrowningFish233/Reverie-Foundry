ItemEvents.modification((event) => {
    event.modify("kubejs:spell_resistance_helmet", (item) => {
        const modifiers = [
            {
                slot: "armor",
                attribute: "minecraft:generic.armor",
                modifier: { amount: 6, operation: "add_value", id: "b8c6f79b-386f-493c-899d-d32a06a8f888" },
            },
            {
                slot: "armor",
                attribute: "minecraft:generic.attack_damage",
                modifier: { amount: 0.1, operation: "add_multiplied_base", id: "0f322007-dfa1-41d5-bfcc-974d9d3649c5" },
            },
            {
                slot: "armor",
                attribute: "irons_spellbooks:spell_resist",
                modifier: { amount: 0.25, operation: "add_multiplied_base", id: "8b944c0b-6bda-4b64-b74e-1ba1de665530" },
            },
            {
                slot: "armor",
                attribute: "irons_spellbooks:spell_power",
                modifier: { amount: -0.25, operation: "add_multiplied_base", id: "72dd6541-bfd8-43de-8c7c-f79a63f00e8f" },
            },
            {
                slot: "armor",
                attribute: "irons_spellbooks:mana_regen",
                modifier: { amount: -0.25, operation: "add_multiplied_base", id: "3ad7414f-745b-472d-bfce-b4ce44fd2d2b" },
            },
            {
                slot: "armor",
                attribute: "irons_spellbooks:max_mana",
                modifier: { amount: -0.25, operation: "add_multiplied_base", id: "25dd61ee-a4c6-4acc-ac55-d342254c328d" },
            },
            {
                slot: "armor",
                attribute: "minecraft:generic.movement_speed",
                modifier: { amount: 0.1, operation: "add_multiplied_base", id: "8564f797-7d70-41f5-9e45-3dd647616574" },
            }
        ];
        item.setAttributeModifiers(modifiers);
    });
    event.modify("kubejs:spell_resistance_chestplate", (item) => {
        const modifiers = [
            {
                slot: "armor",
                attribute: "minecraft:generic.armor",
                modifier: { amount: 10, operation: "add_value", id: "0e849510-d6f0-44f2-a2ed-a355e3b3a765" },
            },
            {
                slot: "armor",
                attribute: "minecraft:generic.attack_damage",
                modifier: { amount: 0.1, operation: "add_multiplied_base", id: "8b56f28b-adf5-4273-8633-0233ec35b29c" },
            },
            {
                slot: "armor",
                attribute: "irons_spellbooks:spell_resist",
                modifier: { amount: 0.25, operation: "add_multiplied_base", id: "46cbc29d-42c0-4bf9-8cc1-ac3659aa22bb" },
            },
            {
                slot: "armor",
                attribute: "irons_spellbooks:spell_power",
                modifier: { amount: -0.25, operation: "add_multiplied_base", id: "0f7ae3bb-7c79-4386-b473-baec0171102d" },
            },
            {
                slot: "armor",
                attribute: "irons_spellbooks:mana_regen",
                modifier: { amount: -0.25, operation: "add_multiplied_base", id: "cdd2ef0a-be43-46ae-a020-d5f4e29c5696" },
            },
            {
                slot: "armor",
                attribute: "irons_spellbooks:max_mana",
                modifier: { amount: -0.25, operation: "add_multiplied_base", id: "8204314b-7720-4f4b-8d8a-b4817672653e" },
            },
            {
                slot: "armor",
                attribute: "minecraft:generic.movement_speed",
                modifier: { amount: 0.1, operation: "add_multiplied_base", id: "c77234b0-334d-4af2-ac9a-a7a4ec9a7314" },
            }
        ];
        item.setAttributeModifiers(modifiers);
    });
    event.modify("kubejs:spell_resistance_leggings", (item) => {
        const modifiers = [
            {
                slot: "armor",
                attribute: "minecraft:generic.armor",
                modifier: { amount: 8, operation: "add_value", id: "4a30ac1c-b631-43b1-a292-c2ad6927420c" },
            },
            {
                slot: "armor",
                attribute: "minecraft:generic.attack_damage",
                modifier: { amount: 0.1, operation: "add_multiplied_base", id: "0fd72934-1f6d-48e3-84f7-fd983b1f3dcf" },
            },
            {
                slot: "armor",
                attribute: "irons_spellbooks:spell_resist",
                modifier: { amount: 0.25, operation: "add_multiplied_base", id: "de7c6439-c3c2-4cd0-9f82-e245714dcff7" },
            },
            {
                slot: "armor",
                attribute: "irons_spellbooks:spell_power",
                modifier: { amount: -0.25, operation: "add_multiplied_base", id: "bb265c68-1128-48ea-b399-7a86d14a2ba6" },
            },
            {
                slot: "armor",
                attribute: "irons_spellbooks:mana_regen",
                modifier: { amount: -0.25, operation: "add_multiplied_base", id: "e4e33da2-cb86-4164-827f-6bdb3894e73b" },
            },
            {
                slot: "armor",
                attribute: "irons_spellbooks:max_mana",
                modifier: { amount: -0.25, operation: "add_multiplied_base", id: "805c5174-3436-40a1-8548-c50000d82cba" },
            },
            {
                slot: "armor",
                attribute: "minecraft:generic.movement_speed",
                modifier: { amount: 0.1, operation: "add_multiplied_base", id: "ad7715cc-cb8b-46b2-9f22-7eb15e060422" },
            }
        ];
        item.setAttributeModifiers(modifiers);
    });
    event.modify("kubejs:spell_resistance_boots", (item) => {
        const modifiers = [
            {
                slot: "armor",
                attribute: "minecraft:generic.armor",
                modifier: { amount: 5, operation: "add_value", id: "b6a10667-7759-46ea-b2d1-cf0f07a89ce0" },
            },
            {
                slot: "armor",
                attribute: "minecraft:generic.attack_damage",
                modifier: { amount: 0.1, operation: "add_multiplied_base", id: "958c6a89-d9f2-42b3-977a-678428e3ce93" },
            },
            {
                slot: "armor",
                attribute: "irons_spellbooks:spell_resist",
                modifier: { amount: 0.25, operation: "add_multiplied_base", id: "3a1f5cbb-0cf1-42ff-9b53-a919b909d1fa" },
            },
            {
                slot: "armor",
                attribute: "irons_spellbooks:spell_power",
                modifier: { amount: -0.25, operation: "add_multiplied_base", id: "c30c4bec-5a39-4f3b-8166-6a99fb4d68b3" },
            },
            {
                slot: "armor",
                attribute: "irons_spellbooks:mana_regen",
                modifier: { amount: -0.25, operation: "add_multiplied_base", id: "15f5f7a8-8344-4041-9109-0d535dbfd7d8" },
            },
            {
                slot: "armor",
                attribute: "irons_spellbooks:max_mana",
                modifier: { amount: -0.25, operation: "add_multiplied_base", id: "fb891e98-7046-4f98-a228-eaa83719b8c9" },
            },
            {
                slot: "armor",
                attribute: "minecraft:generic.movement_speed",
                modifier: { amount: 0.1, operation: "add_multiplied_base", id: "d32c829e-f63e-4229-af53-d6875c8f336b" },
            }
        ];
        item.setAttributeModifiers(modifiers);
    });
    event.modify("kubejs:azure_dawnbreaker_helmet", (item) => {
        const modifiers = [
            {
                slot: "armor",
                attribute: "minecraft:generic.armor",
                modifier: { amount: 5, operation: "add_value", id: "7a09ab50-b876-4987-8204-ea4ed4240255" },
            },
            {
                slot: "armor",
                attribute: "apothic_attributes:arrow_damage",
                modifier: { amount: 0.25, operation: "add_multiplied_base", id: "616a0731-782e-4bbe-a766-d1f32b583534" },
            },
            {
                slot: "armor",
                attribute: "apothic_attributes:arrow_velocity",
                modifier: { amount: 0.25, operation: "add_multiplied_base", id: "9e81d8b5-f640-4074-897d-75fadeaa5a78" },
            },
            {
                slot: "armor",
                attribute: "apothic_attributes:draw_speed",
                modifier: { amount: 0.1, operation: "add_multiplied_base", id: "e5567aca-785c-40f8-90e2-b4f31b43b4d4" },
            },
        ];
        item.setAttributeModifiers(modifiers);
    });
    event.modify("kubejs:azure_dawnbreaker_chestplatet", (item) => {
        const modifiers = [
            {
                slot: "armor",
                attribute: "minecraft:generic.armor",
                modifier: { amount: 6, operation: "add_value", id: "ee45231c-1ce7-4ba5-8b5a-b15e06691f33" },
            },
            {
                slot: "armor",
                attribute: "apothic_attributes:arrow_damage",
                modifier: { amount: 0.25, operation: "add_multiplied_base", id: "d9a2676c-8514-48f0-bc60-1a4c83f348fc" },
            },
            {
                slot: "armor",
                attribute: "apothic_attributes:arrow_velocity",
                modifier: { amount: 0.25, operation: "add_multiplied_base", id: "f0b90d6f-0f6a-4959-b9c4-35a3dad1086e" },
            },
            {
                slot: "armor",
                attribute: "apothic_attributes:draw_speed",
                modifier: { amount: 0.1, operation: "add_multiplied_base", id: "48b896fe-6363-4f78-afef-a196d346571b" },
            },
        ];
        item.setAttributeModifiers(modifiers);
    });
    event.modify("kubejs:azure_dawnbreaker_leggings", (item) => {
        const modifiers = [
            {
                slot: "armor",
                attribute: "minecraft:generic.armor",
                modifier: { amount: 6, operation: "add_value", id: "9e4d07d4-b2e8-4e38-81f8-4fb79490f584" },
            },
            {
                slot: "armor",
                attribute: "apothic_attributes:arrow_damage",
                modifier: { amount: 0.25, operation: "add_multiplied_base", id: "48ff3121-e174-4ed4-a74d-f99aa70fe51c" },
            },
            {
                slot: "armor",
                attribute: "apothic_attributes:arrow_velocity",
                modifier: { amount: 0.25, operation: "add_multiplied_base", id: "b028825b-e413-4470-98a4-e1337d4d1302" },
            },
            {
                slot: "armor",
                attribute: "apothic_attributes:draw_speed",
                modifier: { amount: 0.1, operation: "add_multiplied_base", id: "73b8cfdc-be41-446b-9167-f0ad0df11eae" },
            },
        ];
        item.setAttributeModifiers(modifiers);
    });
    event.modify("kubejs:azure_dawnbreaker_boots", (item) => {
        const modifiers = [
            {
                slot: "armor",
                attribute: "minecraft:generic.armor",
                modifier: { amount: 4, operation: "add_value", id: "58a7fa42-9abe-4316-84fa-4897e4521a04" },
            },
            {
                slot: "armor",
                attribute: "apothic_attributes:arrow_damage",
                modifier: { amount: 0.25, operation: "add_multiplied_base", id: "a9f2ec70-3d9d-4233-bfde-d224ddaa8576" },
            },
            {
                slot: "armor",
                attribute: "apothic_attributes:arrow_velocity",
                modifier: { amount: 0.25, operation: "add_multiplied_base", id: "a9f2ec70-3d9d-4233-bfde-d224ddaa8576" },
            },
            {
                slot: "armor",
                attribute: "apothic_attributes:draw_speed",
                modifier: { amount: 0.1, operation: "add_multiplied_base", id: "5eaef39c-27f8-4d9c-84ff-084d89b16750" },
            },
        ];
        item.setAttributeModifiers(modifiers);
    });
    event.modify("kubejs:crowbar", (item) => {
        const modifiers = [
            {
                slot: "mainhand",
                attribute: "minecraft:generic.attack_damage",
                modifier: { amount: 18, operation: "add_value", id: "f707fffd-f541-4fae-83c9-2af1321459b5" },
            }
        ];
        item.setAttributeModifiers(modifiers);
    });
});




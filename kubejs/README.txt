client_scripts           
├─ src                   # 脚本存放区
│  ├─ EMI                # EMI魔改
│  │  └─ EMI.js          
│  ├─ PonderJS           # 我寻思魔改
│  │  └─ ponderjs.js     
│  ├─ I18nUpdate.js      # 自动汉化
│  ├─ key_bind.js        # 按键注册
│  ├─ RenderJS.js        # 渲染魔改
│  ├─ tooltip_add.js     # tooltip添加轮子
│  ├─ tooltip_curios.js  # tooltip饰品轮子
│  └─ tooltip_remove.js  # tooltip移除
└─ jsconfig.json         

server_scripts                              
├─ src                                      # 脚本存放区
│  ├─ Curios                                # 饰品内容实现
│  │  ├─ Other_curios                       # 需要其他效果的饰品实现区
│  │  │  └─ mana_flower.js                  # 魔力花效果实现
│  │  ├─ curios_api.js                      # 用于饰品的工具类
│  │  ├─ curios_event_attack.js             # 饰品实现事件流:攻击
│  │  ├─ curios_event_death.js              # 饰品实现事件流:击杀
│  │  ├─ curios_event_hurt.js               # 饰品实现事件流:受击
│  │  ├─ curios_event_tick.js               # 饰品实现事件流:tick
│  │  ├─ curios_key_bind.js                 # 饰品实现事件流:按键
│  │  └─ curios_player_death.js             # 饰品实现事件流:死亡
│  ├─ debug                                 # Debug测试模块
│  │  ├─ debug.js                           
│  │  └─ more_debug.js                      
│  ├─ Effects                               # 效果模块
│  │  ├─ Mob_effect                         # 药水效果模块
│  │  │  ├─ mod_effect_fix                  # 药水效果修复
│  │  │  │  └─ heart_stop.js                
│  │  │  ├─ bleed.js                        
│  │  │  ├─ bloodlust_attack.js             
│  │  │  ├─ bloody_mary.js                  
│  │  │  ├─ damage_amplification.js         
│  │  │  ├─ disillusionment.js              
│  │  │  ├─ everclear_effect.js             
│  │  │  ├─ gaze.js                         
│  │  │  ├─ ghost_ingot.js                  
│  │  │  ├─ harmful_effect.js               
│  │  │  ├─ melting_eyeball_ego_effect.js   
│  │  │  ├─ moonshine.js                    
│  │  │  ├─ moscow_mule.js                  
│  │  │  ├─ old_fashioned.js                
│  │  │  ├─ paralysis.js                    
│  │  │  ├─ protect.js                      
│  │  │  ├─ purple_haze.js                  
│  │  │  ├─ rune_of_deflection.js           
│  │  │  ├─ vodka.js                        
│  │  │  └─ whiskey.js                      
│  │  ├─ Trait                              # 装备词缀模块
│  │  │  ├─ death_time                      # 濒死事件流
│  │  │  │  └─ death_time.js                
│  │  │  ├─ monster                         # 怪物词缀
│  │  │  │  └─ sanity.js                    
│  │  │  ├─ Trait_right                     # 装备词缀模块 - 右键模块
│  │  │  │  ├─ fire_charge.js               
│  │  │  │  └─ starfury.js                  
│  │  │  ├─ achroous_ingot.js               
│  │  │  ├─ acril_ingot.js                  
│  │  │  ├─ aethersent_ingot.js             
│  │  │  ├─ alexandrite.js                  
│  │  │  ├─ amber.js                        
│  │  │  ├─ amns.js                         
│  │  │  ├─ ancient_metal_ingot.js          
│  │  │  ├─ animated_steel_ingot.js         
│  │  │  ├─ aquamarine.js                   
│  │  │  ├─ arrow.js                        
│  │  │  ├─ attack_taunt.js                 
│  │  │  ├─ bismuthgems.js                  
│  │  │  ├─ blazing_magic.js                
│  │  │  ├─ bloodjade_set.js                
│  │  │  ├─ boom.js                         
│  │  │  ├─ calamatium_ingot.js             
│  │  │  ├─ carbonatite_ingot.js            
│  │  │  ├─ citrine.js                      
│  │  │  ├─ combustion_boost.js             
│  │  │  ├─ Comet.js                        
│  │  │  ├─ cursium_ingot.js                
│  │  │  ├─ dragonsteel_fire_ingot.js       
│  │  │  ├─ dragonsteel_ice_ingot.js        
│  │  │  ├─ dragonsteel_lightning_ingot.js  
│  │  │  ├─ echo_shard.js                   
│  │  │  ├─ emerald.js                      
│  │  │  ├─ enderman.js                     
│  │  │  ├─ eternal_life.js                 
│  │  │  ├─ eternal_starlight.js            
│  │  │  ├─ exalted_beauty_gem.js           
│  │  │  ├─ fluxing.js                      
│  │  │  ├─ garnet.js                       
│  │  │  ├─ generic_luck.js                 
│  │  │  ├─ hurt.js                         
│  │  │  ├─ ignitium_ingot.js               
│  │  │  ├─ ignore_cooldown.js              
│  │  │  ├─ intrinsic.js                    
│  │  │  ├─ iridescence.js                  
│  │  │  ├─ ironwood.js                     
│  │  │  ├─ knockback.js                    
│  │  │  ├─ lacrima.js                      
│  │  │  ├─ life_drain.js                   
│  │  │  ├─ lunium_nova.js                  
│  │  │  ├─ malarite.js                     
│  │  │  ├─ malignant_pewter_ingot.js       
│  │  │  ├─ mana_quenching.js               
│  │  │  ├─ maxhealth.js                    
│  │  │  ├─ meat_ingots.js                  
│  │  │  ├─ mithril_ingot.js                
│  │  │  ├─ monkey.js                       
│  │  │  ├─ moonstone.js                    
│  │  │  ├─ multicolor.js                   
│  │  │  ├─ naughty.js                      
│  │  │  ├─ numbness.js                     
│  │  │  ├─ overload.js                     
│  │  │  ├─ pearl.js                        
│  │  │  ├─ plunder.js                      
│  │  │  ├─ prismarine_crystals.js          
│  │  │  ├─ sanityattack.js                 
│  │  │  ├─ seraph.js                       
│  │  │  ├─ set_numbness.js                 
│  │  │  ├─ set_ponder.js                   
│  │  │  ├─ shivering_gel_tick.js           
│  │  │  ├─ six_life_death.js               
│  │  │  ├─ spinel.js                       
│  │  │  ├─ starfire.js                     
│  │  │  ├─ systemtime.js                   
│  │  │  ├─ tanzanite.js                    
│  │  │  ├─ tenacious_vine.js               
│  │  │  ├─ thermal_springstone_ingot.js    
│  │  │  ├─ tooth_of_hunger.js              
│  │  │  ├─ topaz.js                        
│  │  │  ├─ witherbone.js                   
│  │  │  ├─ wither_howitzer.js              
│  │  │  ├─ wolf.js                         
│  │  │  └─ zapolgium_ingot.js              
│  │  ├─ effect_Added.js                    # 药水效果施加事件
│  │  ├─ effect_Expired.js                  # 药水效果移除事件
│  │  └─ Trait_events.js                    # 词缀触发总事件流
│  ├─ Entity                                # 用于实体的脚本
│  │  ├─ Champion                           # 冠军强敌内容
│  │  │  ├─ death.js                        # 击杀Boss增强世界上冠军的生成数量
│  │  │  └─ Sephiah.js                      # 数量定义及显示
│  │  ├─ EGO                                # EGO饰品
│  │  │  └─ blue_star.js                    
│  │  ├─ Player                             # 用于玩家的脚本
│  │  │  ├─ Sin                             # 七宗罪
│  │  │  │  ├─ envy.js                      
│  │  │  │  ├─ envy_tick.js                 
│  │  │  │  ├─ gluttony.js                  
│  │  │  │  ├─ gluttony_foodeaten.js        
│  │  │  │  ├─ gluttony_tick.js             
│  │  │  │  ├─ greed.js                     
│  │  │  │  ├─ lust.js                      
│  │  │  │  ├─ pride.js                     
│  │  │  │  ├─ sloth.js                     
│  │  │  │  └─ wrath.js                     
│  │  │  ├─ FluidHandler.js                 
│  │  │  ├─ foodevents.js                   
│  │  │  ├─ loggedIn.js                     
│  │  │  ├─ Player_tick.js                  
│  │  │  └─ SinErosion.js                   
│  │  ├─ Stages                             # 阶段控制
│  │  │  ├─ boss.js                         
│  │  │  ├─ kill.js                         
│  │  │  ├─ mob.js                          
│  │  │  ├─ ore.js                          
│  │  │  ├─ recipe.js                       
│  │  │  └─ structure.js                    
│  │  ├─ Villager                           # 村民魔改
│  │  │  ├─ MerchantJS.js                   
│  │  │  ├─ Thief.js                        
│  │  │  └─ villager.js                     
│  │  ├─ dynamic_damage.js                  
│  │  └─ magic_mob.js                       
│  ├─ Irons_spellbooks                      # 铁魔法机制修改/添加
│  │  ├─ MinionPower.js                     
│  │  ├─ SpellSystem.js                     
│  │  └─ spell_type.js                      
│  ├─ Other                                 # 其他杂项功能
│  │  ├─ FancyItems                         # 时尚小玩具
│  │  │  └─ TP.js                           
│  │  ├─ Block.js                           
│  │  ├─ fillet_knife.js                    
│  │  ├─ key_bind.js                        
│  │  └─ loot.js                            
│  ├─ Recipes                               # 合成配方模块
│  │  ├─ alshanex_familiars                 # Alshanex's Familiars mod 配方魔改
│  │  │  └─ ritual_recipe.js                
│  │  ├─ apothic_enchanting                 # 神化:附魔 配方魔改
│  │  │  └─ infusion.js                     
│  │  ├─ create                             # 机械动力 配方魔改
│  │  │  ├─ addInformation.js               
│  │  │  ├─ create_compat.js                
│  │  │  └─ debug.js                        
│  │  ├─ farmersdelight                     # 农夫乐事 配方魔改
│  │  │  └─ extradelight                    
│  │  │     └─ vat                          
│  │  │        └─ vat.js                    
│  │  ├─ gateways                           # 永恒之门 配方魔改
│  │  │  └─ recipe.js                       
│  │  ├─ malum                              # 灵灾 配方魔改
│  │  │  ├─ favor_of_the_void.js            
│  │  │  ├─ runeworking.js                  
│  │  │  ├─ spirit_focusing.js              
│  │  │  ├─ spirit_infusion.js              
│  │  │  ├─ spirit_repair.js                
│  │  │  └─ spirit_transmutation.js         
│  │  ├─ productivemetalworks               # productivemetalworks mod 配方魔改
│  │  │  ├─ casting                         
│  │  │  │  ├─ ItemCastingRecipe.js         
│  │  │  │  ├─ plate_cast.js                
│  │  │  │  ├─ rod_cast.js                  
│  │  │  │  └─ wire_cast.js                 
│  │  │  ├─ FluidAlloyingRecipe.js          
│  │  │  └─ ItemMeltingRecipe.js            
│  │  ├─ recipe                             # 杂项原版配方魔改
│  │  │  ├─ more_recipe.js                  
│  │  │  ├─ recipe_shapeless.js             
│  │  │  └─ remove.js                       # 配方移除(大部分在这里,小部分为了方便会和替换的配方写在一起)
│  │  ├─ mimicream.js                       
│  │  └─ tossIntoFluidInteraction.js        # 世界合成配方
│  ├─ System                                # 自定义游戏系统
│  │  ├─ command                            # 命令注册及修改
│  │  │  ├─ commandregistry.js              
│  │  │  └─ command_ban.js                  
│  │  ├─ entity_clean.js                    
│  │  ├─ flipCoin.js                        
│  │  ├─ GearSickleItem.js                  
│  │  ├─ Item_ban.js                        
│  │  └─ WorldDifficulty.js                 
│  ├─ Utils                                 # 工具类函数
│  │  ├─ const.js                           
│  │  ├─ cooldowns.js                       
│  │  ├─ fragile_soul.js                    
│  │  ├─ function_sins.js                   
│  │  ├─ ironspell_utils.js                 
│  │  ├─ loadclass.js                       
│  │  ├─ TraitHelper.js                     
│  │  └─ Utils.js                           
│  └─ Tag.js                                # Tag施加/移除
└─ jsconfig.json                            

startup_scripts               
├─ src                        # 脚本存放区
│  ├─ event                   # 事件流
│  │  └─ livinghealevent.js   
│  ├─ global                  # 全局内容
│  │  ├─ global_materials.js  
│  │  ├─ loadclass.js         
│  │  └─ sendData.js          
│  ├─ other                   # 杂项内容
│  │  ├─ ban_milk.js          
│  │  ├─ fix_armor_item.js    
│  │  ├─ fix_damage_item.js   
│  │  ├─ magicdata.js         
│  │  └─ sounds.js            
│  ├─ registry                # 物品注册
│  │  ├─ champion.js          
│  │  ├─ create_tab.js        
│  │  ├─ curio.js             
│  │  ├─ effect.js            
│  │  ├─ entity.js            
│  │  ├─ fluid.js             
│  │  ├─ food.js              
│  │  ├─ Item.js              
│  │  ├─ new_helmet.js        
│  │  ├─ spell.js             
│  │  ├─ spell_school.js      
│  │  └─ toolsjs.js           
│  ├─ armor_set_bonus.js      # 套装奖励
│  └─ key_bind_register.js    # 按键注册
└─ jsconfig.json              


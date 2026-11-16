ServerEvents.recipes(event => {

    event.remove({id: 'minecraft:iron_ingot_from_iron_block'})
    event.remove({id:'iron_ingot_from_nuggets'})
    event.remove({id:'minecraft:iron_nugget'})
    event.remove({id:'minecraft:iron_block'})
//-------------------------------------

    // =====================================
    // METAL RECYCLING HELPER
    // =====================================

    function addMetalMeltRecipe(item, fluid, amount) {
        event.recipes.create.mixing(
            Fluid.of(fluid, amount),
            [Ingredient.of(item)]
        ).heated()
    }

    // =====================================
    // IRON MATERIALS
    // =====================================

    addMetalMeltRecipe('minecraft:iron_ingot', 'kubejs:molten_iron', 90)
    addMetalMeltRecipe('minecraft:iron_nugget', 'kubejs:molten_iron', 10)
    addMetalMeltRecipe('minecraft:iron_block', 'kubejs:molten_iron', 810)
    addMetalMeltRecipe('minecraft:raw_iron', 'kubejs:molten_iron', 90)
    //addMetalMeltRecipe('minecraft:raw_iron_block', 'kubejs:molten_iron', 810)
    addMetalMeltRecipe('minecraft:iron_bars','kubejs:molten_iron', 33.75)
    addMetalMeltRecipe('create:iron_sheet','kubejs:molten_iron',90)

    // =====================================
    // GOLD MATERIALS
    // =====================================

    addMetalMeltRecipe('minecraft:gold_ingot', 'kubejs:molten_gold', 90)
    addMetalMeltRecipe('minecraft:gold_nugget', 'kubejs:molten_gold', 10)
    addMetalMeltRecipe('minecraft:gold_block', 'kubejs:molten_gold', 810)
    addMetalMeltRecipe('minecraft:raw_gold', 'kubejs:molten_gold', 90)
   // addMetalMeltRecipe('minecraft:raw_gold_block', 'kubejs:molten_gold', 810)
    addMetalMeltRecipe('create:brass_sheet','kubejs:molten_brass',90)
    addMetalMeltRecipe('createaddition:zinc_sheet','kubejs:molten_zinc',90)

    // =====================================
    // COPPER MATERIALS
    // =====================================

    addMetalMeltRecipe('minecraft:copper_ingot', 'kubejs:molten_copper', 90)
    addMetalMeltRecipe('minecraft:copper_block', 'kubejs:molten_copper', 810)
    addMetalMeltRecipe('minecraft:raw_copper', 'kubejs:molten_copper', 90)
   // addMetalMeltRecipe('minecraft:raw_copper_block', 'kubejs:molten_copper', 810)
    addMetalMeltRecipe('create:copper_sheet','kubejs:molten_copper',90)

    // =====================================
    // DURABILITY RANGE HELPER
    // =====================================

    function damageRange(item, minDamage, maxDamage) {
        let variants = []

        for (let damage = minDamage; damage <= maxDamage; damage++) {
            variants.push(`${item}[minecraft:damage=${damage}]`)
        }

        return Ingredient.of(variants)
    }

    // =====================================
    // EQUIPMENT RECYCLING HELPER
    // =====================================

    function addEquipment(item, fluid, maxDurability, fullYield) {

        // 67-100% durability = 100% yield
        let highMin = Math.ceil(maxDurability * 0.00)
        let highMax = Math.floor(maxDurability * 0.33)

        // 34-66% durability = 2/3 yield
        let midMin = highMax + 1
        let midMax = Math.floor(maxDurability * 0.66)

        // 1-33% durability = 1/3 yield
        let lowMin = midMax + 1
        let lowMax = maxDurability - 1

        event.recipes.create.mixing(
            Fluid.of(fluid, fullYield),
            [damageRange(item, highMin, highMax)]
        ).heated()

        event.recipes.create.mixing(
            Fluid.of(fluid, Math.floor(fullYield * 2 / 3)),
            [damageRange(item, midMin, midMax)]
        ).heated()

        event.recipes.create.mixing(
            Fluid.of(fluid, Math.floor(fullYield / 3)),
            [damageRange(item, lowMin, lowMax)]
        ).heated()
    }

    // =====================================
    // IRON EQUIPMENT
    // =====================================

    const iron = 'kubejs:molten_iron'

    addEquipment('minecraft:iron_sword', iron, 250, 180)
    addEquipment('minecraft:iron_pickaxe', iron, 250, 270)
    addEquipment('minecraft:iron_axe', iron, 250, 270)
    addEquipment('minecraft:iron_shovel', iron, 250, 90)
    addEquipment('minecraft:iron_hoe', iron, 250, 180)
    addEquipment('minecraft:shears', iron, 238, 180)

    addEquipment('minecraft:iron_helmet', iron, 165, 450)
    addEquipment('minecraft:iron_chestplate', iron, 240, 720)
    addEquipment('minecraft:iron_leggings', iron, 225, 630)
    addEquipment('minecraft:iron_boots', iron, 195, 360)

    // =====================================
    // GOLD EQUIPMENT
    // =====================================

    const gold = 'kubejs:molten_gold'

    addEquipment('minecraft:golden_sword', gold, 32, 180)
    addEquipment('minecraft:golden_pickaxe', gold, 32, 270)
    addEquipment('minecraft:golden_axe', gold, 32, 270)
    addEquipment('minecraft:golden_shovel', gold, 32, 90)
    addEquipment('minecraft:golden_hoe', gold, 32, 180)

    addEquipment('minecraft:golden_helmet', gold, 77, 450)
    addEquipment('minecraft:golden_chestplate', gold, 112, 720)
    addEquipment('minecraft:golden_leggings', gold, 105, 630)
    addEquipment('minecraft:golden_boots', gold, 91, 360)

    // =====================================
    // COPPER EQUIPMENT
    // =====================================

    const copper = 'kubejs:molten_copper'
    addEquipment('create_sa:copper_pickaxe', copper, 131, 270)

    // ZINC — Tools: 250 durability
    const zinc = 'kubejs:molten_zinc'

    addEquipment('create_sa:zinc_sword', zinc, 250, 180)
    addEquipment('create_sa:zinc_pickaxe', zinc, 250, 270)
    addEquipment('create_sa:zinc_axe', zinc, 250, 270)
    addEquipment('create_sa:zinc_shovel', zinc, 250, 90)
    addEquipment('create_sa:zinc_hoe', zinc, 250, 180)

    // Zinc armor: helmet, chestplate, leggings, boots
    addEquipment('create_sa:zinc_helmet', zinc, 220, 450)
    addEquipment('create_sa:zinc_chestplate', zinc, 320, 720)
    addEquipment('create_sa:zinc_leggings', zinc, 300, 630)
    addEquipment('create_sa:zinc_boots', zinc, 260, 360)

    // BRASS — Tools: 450 durability
    const brass = 'kubejs:molten_brass'

    addEquipment('create_sa:brass_sword', brass, 450, 180)
    addEquipment('create_sa:brass_pickaxe', brass, 450, 270)
    addEquipment('create_sa:brass_axe', brass, 450, 270)
    addEquipment('create_sa:brass_shovel', brass, 450, 90)
    addEquipment('create_sa:brass_hoe', brass, 450, 180)

    // Brass armor: helmet, chestplate, leggings, boots
    addEquipment('create_sa:brass_helmet', brass, 275, 450)
    addEquipment('create_sa:brass_chestplate', brass, 400, 720)
    addEquipment('create_sa:brass_leggings', brass, 375, 630)
    addEquipment('create_sa:brass_boots', brass, 325, 360)

    //-------------------------------------

    event.recipes.create.mixing(
        '1x create:limestone',
        [
            '8x minecraft:cobblestone',
            Fluid.of('minecraft:water', 1000)
        ]
    ).heated()

    event.recipes.create.crushing(
        [
            '2x kubejs:lime_powder'
        ],
        'create:limestone'
    )

    event.recipes.create.mixing(
        '2x kubejs:flux_powder',
        [
            'kubejs:lime_powder',
            'minecraft:charcoal'
        ]
    )

    event.recipes.create.mixing(
        Fluid.of('kubejs:molten_iron', 180),
        [
            'minecraft:raw_iron',
            'kubejs:flux_powder'
        ]
    ).heated()

    event.recipes.create.mixing(
        Fluid.of('kubejs:molten_zinc', 180),
        [
            'create:raw_zinc',
            'kubejs:flux_powder'
        ]
    ).heated()

    event.recipes.create.mixing(
        Fluid.of('kubejs:molten_iron', 180),
        [
            'create:crushed_raw_iron',
            'kubejs:flux_powder'
        ]
    ).heated()

    event.recipes.create.mixing(
        Fluid.of('kubejs:molten_iron', 1620),
        [
            'minecraft:raw_iron_block',
            'kubejs:flux_powder',
            'kubejs:flux_powder',
            'kubejs:flux_powder'
        ]
    ).heated()

    event.recipes.create.mixing(
        Fluid.of('kubejs:molten_gold', 1620),
        [
            'minecraft:raw_gold_block',
            'kubejs:flux_powder',
            'kubejs:flux_powder',
            'kubejs:flux_powder'
        ]
    ).heated()

    event.recipes.create.mixing(
        Fluid.of('kubejs:molten_copper', 1620),
        [
            'minecraft:raw_copper_block',
            'kubejs:flux_powder',
            'kubejs:flux_powder',
            'kubejs:flux_powder'
        ]
    ).heated()

    event.recipes.create.mixing(
        Fluid.of('kubejs:molten_zinc', 1620),
        [
            'create:raw_zinc_block',
            'kubejs:flux_powder',
            'kubejs:flux_powder',
            'kubejs:flux_powder'
        ]
    ).heated()

    event.recipes.create.mixing(
        Fluid.of('kubejs:molten_gold', 180),
        [
            'create:crushed_raw_gold',
            'kubejs:flux_powder'
        ]
    ).heated()

    event.recipes.create.mixing(
        Fluid.of('kubejs:molten_copper', 180),
        [
            'create:crushed_raw_copper',
            'kubejs:flux_powder'
        ]
    ).heated()

    event.recipes.create.mixing(
        'petrochem:bronze_ingot',
        [
            Fluid.of('kubejs:molten_copper', 90),
            'petrochem:tin_nugget'
        ]
    ).heated()

    event.remove({id:'petrochem:mixing/bronze_alloy'})

    event.recipes.create.mixing(
        Fluid.of('kubejs:molten_zinc', 180),
        [
            'create:crushed_raw_zinc',
            'kubejs:flux_powder'
        ]
    ).heated()

    event.recipes.create.mixing(
        Fluid.of('kubejs:molten_gold', 180),
        [
            'minecraft:raw_gold',
            'kubejs:flux_powder'
        ]
    ).heated()

    event.recipes.create.mixing(
        Fluid.of('kubejs:molten_copper', 180),
        [
            'minecraft:raw_copper',
            'kubejs:flux_powder'
        ]
    ).heated()

    // Duplicate create:raw_zinc + flux_powder -> 180 mB molten zinc recipe removed.
    event.recipes.create.mixing(
        Fluid.of('kubejs:molten_brass', 270),
        [
            Fluid.of('kubejs:molten_zinc', 90),
            Fluid.of('kubejs:molten_copper', 90)
        ]
    ).heated()

    event.recipes.create.mixing(
        Fluid.of('kubejs:molten_andesite_alloy', 90),
        [
            'minecraft:andesite',
            'kubejs:flux_powder',
            Fluid.of('kubejs:molten_iron', 10)
        ]
    ).heated()

    event.recipes.create.compacting(
        'kubejs:ingot_mold',
        [
            'minecraft:clay_ball',
            [
                'minecraft:iron_ingot',
                'minecraft:copper_ingot',
                'minecraft:gold_ingot'
            ]
        ]
    )

    event.recipes.create.sequenced_assembly(
        ['kubejs:iron_mold_stage_2'],
        'kubejs:ingot_mold',
        [
            // First: Fill the mold
            event.recipes.create.filling(
                'kubejs:iron_mold_stage',
                [
                    'kubejs:ingot_mold',
                    Fluid.of('kubejs:molten_iron', 180)
                ]
            ),

            // Second: First press
            event.recipes.create.pressing(
                'kubejs:iron_mold_stage',
                'kubejs:iron_mold_stage'
            ),

            // Third: Second press
            event.recipes.create.pressing(
                'kubejs:iron_mold_stage',
                'kubejs:iron_mold_stage'
            )
        ]
    )
        .transitionalItem('kubejs:iron_mold_stage')
        .loops(1)

    // Final iron casting press
    event.recipes.create.pressing(
        [
            Item.of('minecraft:iron_ingot', 2),
            'kubejs:ingot_mold'
        ],
        'kubejs:iron_mold_stage_2'
    )

    // COPPER CASTING
    event.recipes.create.sequenced_assembly(
        ['kubejs:copper_mold_stage_2'],
        'kubejs:ingot_mold',
        [
            // Fill with molten copper
            event.recipes.create.filling(
                'kubejs:copper_mold_stage',
                [
                    'kubejs:ingot_mold',
                    Fluid.of('kubejs:molten_copper', 180)
                ]
            ),

            // First press
            event.recipes.create.pressing(
                'kubejs:copper_mold_stage',
                'kubejs:copper_mold_stage'
            ),

            // Second press
            event.recipes.create.pressing(
                'kubejs:copper_mold_stage',
                'kubejs:copper_mold_stage'
            )
        ]
    )
        .transitionalItem('kubejs:copper_mold_stage')
        .loops(1)

    // Final copper press
    event.recipes.create.pressing(
        [
            Item.of('minecraft:copper_ingot', 2),
            'kubejs:ingot_mold'
        ],
        'kubejs:copper_mold_stage_2'
    )

    // GOLD CASTING
    event.recipes.create.sequenced_assembly(
        ['kubejs:gold_mold_stage_2'],
        'kubejs:ingot_mold',
        [
            // Fill with molten gold
            event.recipes.create.filling(
                'kubejs:gold_mold_stage',
                [
                    'kubejs:ingot_mold',
                    Fluid.of('kubejs:molten_gold', 180)
                ]
            ),

            // First press
            event.recipes.create.pressing(
                'kubejs:gold_mold_stage',
                'kubejs:gold_mold_stage'
            ),

            // Second press
            event.recipes.create.pressing(
                'kubejs:gold_mold_stage',
                'kubejs:gold_mold_stage'
            )
        ]
    )
        .transitionalItem('kubejs:gold_mold_stage')
        .loops(1)

    // Final gold press
    event.recipes.create.pressing(
        [
            Item.of('minecraft:gold_ingot', 2),
            'kubejs:ingot_mold'
        ],
        'kubejs:gold_mold_stage_2'
    )

    // METAL CASTING RECIPE GENERATOR
    function addMetalCasting(
        mold,
        stage,
        ready,
        fluid,
        fluidAmount,
        output,
        outputCount
    ) {
        event.recipes.create.sequenced_assembly(
            [Item.of(ready)],
            mold,
            [
                // Fill mold
                event.recipes.create.filling(
                    Item.of(stage),
                    [
                        mold,
                        Fluid.of(fluid, fluidAmount)
                    ]
                ),

                // First press
                event.recipes.create.pressing(
                    Item.of(stage),
                    Item.of(stage)
                ),

                // Second press
                event.recipes.create.pressing(
                    Item.of(stage),
                    Item.of(stage)
                )
            ]
        )
            .transitionalItem(Item.of(stage))
            .loops(1)

        // Final press: output + reusable mold
        event.recipes.create.pressing(
            [
                Item.of(output, outputCount),
                Item.of(mold)
            ],
            Item.of(ready)
        )
    }

    // IRON NUGGETS
    addMetalCasting(
        'kubejs:nugget_mold',
        'kubejs:iron_nugget_mold_stage',
        'kubejs:iron_nugget_mold_stage_2',
        'kubejs:molten_iron',
        10,
        'minecraft:iron_nugget',
        1
    )

    // COPPER NUGGETS
    addMetalCasting(
        'kubejs:nugget_mold',
        'kubejs:copper_nugget_mold_stage',
        'kubejs:copper_nugget_mold_stage_2',
        'kubejs:molten_copper',
        10,
        'create:copper_nugget',
        1
    )

    // GOLD NUGGETS
    addMetalCasting(
        'kubejs:nugget_mold',
        'kubejs:gold_nugget_mold_stage',
        'kubejs:gold_nugget_mold_stage_2',
        'kubejs:molten_gold',
        10,
        'minecraft:gold_nugget',
        1
    )

    // IRON BLOCKS
    addMetalCasting(
        'kubejs:block_mold',
        'kubejs:iron_block_mold_stage',
        'kubejs:iron_block_mold_stage_2',
        'kubejs:molten_iron',
        810,
        'minecraft:iron_block',
        1
    )

    // COPPER BLOCKS
    addMetalCasting(
        'kubejs:block_mold',
        'kubejs:copper_block_mold_stage',
        'kubejs:copper_block_mold_stage_2',
        'kubejs:molten_copper',
        810,
        'minecraft:copper_block',
        1
    )

    // GOLD BLOCKS
    addMetalCasting(
        'kubejs:block_mold',
        'kubejs:gold_block_mold_stage',
        'kubejs:gold_block_mold_stage_2',
        'kubejs:molten_gold',
        810,
        'minecraft:gold_block',
        1
    )

    addMetalCasting(
        'kubejs:ingot_mold',
        'kubejs:andesite_mold_stage',
        'kubejs:andesite_mold_stage_2',
        'kubejs:molten_andesite_alloy',
        90,
        'create:andesite_alloy',
        1
    )

    event.remove({id:'gold_ingot_from_nuggets'})
    event.remove({id:'gold_block'})
    event.remove({id:'create:crafting/materials/copper_ingot'})
    event.remove({id:'minecraft:copper_block'})
    event.remove({id:'create:crafting/materials/zinc_ingot_from_compacting'})
    event.remove({id:'create:crafting/materials/zinc_block_from_compacting'})
    event.remove({id:'create:crafting/materials/brass_ingot_from_compacting'})
    event.remove({id:'create:crafting/materials/brass_block_from_compacting'})
})


ServerEvents.recipes(event => {

    // =====================================
    // RECIPE REMOVALS
    // =====================================

    event.remove({ id: 'minecraft:iron_ingot_from_iron_block' })
    event.remove({ id: 'minecraft:iron_ingot_from_nuggets' })
    event.remove({ id: 'minecraft:iron_nugget' })
    event.remove({ id: 'minecraft:iron_block' })

    event.remove({ id: 'minecraft:gold_ingot_from_nuggets' })
    event.remove({ id: 'minecraft:gold_block' })

    event.remove({ id: 'create:crafting/materials/copper_ingot' })
    event.remove({ id: 'minecraft:copper_block' })

    event.remove({ id: 'create:crafting/materials/zinc_ingot_from_compacting' })
    event.remove({ id: 'create:crafting/materials/zinc_block_from_compacting' })

    event.remove({ id: 'create:crafting/materials/brass_ingot_from_compacting' })
    event.remove({ id: 'create:crafting/materials/brass_block_from_compacting' })


    // =====================================
    // METAL MELTING HELPER
    // =====================================

    function addMetalMeltRecipe(item, fluid, amount) {
        event.recipes.create.mixing(
            Fluid.of(fluid, amount),
            [Ingredient.of(item)]
        ).heated()
    }

    // Batch melting helper
    function addBatchMeltRecipe(item, count, fluid, amount) {
        event.recipes.create.mixing(
            Fluid.of(fluid, amount),
            [`${count}x ${item}`]
        ).heated()
    }


    // =====================================
    // METAL MATERIAL MELTING
    // =====================================

    const metalMaterials = [
        // Iron
        ['minecraft:iron_ingot', 'kubejs:molten_iron', 90],
        ['minecraft:iron_nugget', 'kubejs:molten_iron', 10],
        ['minecraft:iron_block', 'kubejs:molten_iron', 810],
        ['minecraft:iron_bars', 'kubejs:molten_iron', 33.75],
        ['create:iron_sheet', 'kubejs:molten_iron', 90],

        // Gold
        ['minecraft:gold_ingot', 'kubejs:molten_gold', 90],
        ['minecraft:gold_nugget', 'kubejs:molten_gold', 10],
        ['minecraft:gold_block', 'kubejs:molten_gold', 810],
        ['create:golden_sheet', 'kubejs:molten_gold', 90],

        // Copper
        ['minecraft:copper_ingot', 'kubejs:molten_copper', 90],
        ['create:copper_nugget', 'kubejs:molten_copper', 10],
        ['minecraft:copper_block', 'kubejs:molten_copper', 810],
        ['create:copper_sheet', 'kubejs:molten_copper', 90],

        // Zinc
        ['create:zinc_ingot', 'kubejs:molten_zinc', 90],
        ['create:zinc_nugget', 'kubejs:molten_zinc', 10],
        ['create:zinc_block', 'kubejs:molten_zinc', 810],
        ['createaddition:zinc_sheet', 'kubejs:molten_zinc', 90],

        // Brass
        ['create:brass_ingot', 'kubejs:molten_brass', 90],
        ['create:brass_nugget', 'kubejs:molten_brass', 10],
        ['create:brass_block', 'kubejs:molten_brass', 810],
        ['create:brass_sheet', 'kubejs:molten_brass', 90]
    ]

    metalMaterials.forEach(([item, fluid, amount]) => {
        addMetalMeltRecipe(item, fluid, amount)
    })

    // 16 iron bars = 540 mB
    addBatchMeltRecipe(
        'minecraft:iron_bars',
        16,
        'kubejs:molten_iron',
        540
    )


    // =====================================
    // EQUIPMENT DURABILITY INGREDIENT HELPER
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

        // 0–33% damage: full yield
        let highMin = 0
        let highMax = Math.floor(maxDurability * 0.33)

        // 34–66% damage: 2/3 yield
        let midMin = highMax + 1
        let midMax = Math.floor(maxDurability * 0.66)

        // 67–100% damage: 1/3 yield
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
    // EQUIPMENT CONFIGURATION
    // =====================================

    const equipmentSets = [

        // IRON TOOLS
        {
            fluid: 'kubejs:molten_iron',
            items: [
                ['minecraft:iron_sword', 250, 180],
                ['minecraft:iron_pickaxe', 250, 270],
                ['minecraft:iron_axe', 250, 270],
                ['minecraft:iron_shovel', 250, 90],
                ['minecraft:iron_hoe', 250, 180],
                ['minecraft:shears', 238, 180]
            ]
        },

        // IRON ARMOR
        {
            fluid: 'kubejs:molten_iron',
            items: [
                ['minecraft:iron_helmet', 165, 450],
                ['minecraft:iron_chestplate', 240, 720],
                ['minecraft:iron_leggings', 225, 630],
                ['minecraft:iron_boots', 195, 360]
            ]
        },

        // GOLD TOOLS
        {
            fluid: 'kubejs:molten_gold',
            items: [
                ['minecraft:golden_sword', 32, 180],
                ['minecraft:golden_pickaxe', 32, 270],
                ['minecraft:golden_axe', 32, 270],
                ['minecraft:golden_shovel', 32, 90],
                ['minecraft:golden_hoe', 32, 180]
            ]
        },

        // GOLD ARMOR
        {
            fluid: 'kubejs:molten_gold',
            items: [
                ['minecraft:golden_helmet', 77, 450],
                ['minecraft:golden_chestplate', 112, 720],
                ['minecraft:golden_leggings', 105, 630],
                ['minecraft:golden_boots', 91, 360]
            ]
        },

        // COPPER TOOLS
        {
            fluid: 'kubejs:molten_copper',
            items: [
                ['create_sa:copper_sword', 130, 180],
                ['create_sa:copper_pickaxe', 131, 270],
                ['create_sa:copper_axe', 130, 270],
                ['create_sa:copper_shovel', 130, 90],
                ['create_sa:copper_hoe', 130, 180]
            ]
        },

        // COPPER ARMOR
        {
            fluid: 'kubejs:molten_copper',
            items: [
                ['create_sa:copper_helmet', 165, 450],
                ['create_sa:copper_chestplate', 240, 720],
                ['create_sa:copper_leggings', 225, 630],
                ['create_sa:copper_boots', 195, 360]
            ]
        },

        // ZINC TOOLS
        {
            fluid: 'kubejs:molten_zinc',
            items: [
                ['create_sa:zinc_sword', 250, 180],
                ['create_sa:zinc_pickaxe', 250, 270],
                ['create_sa:zinc_axe', 250, 270],
                ['create_sa:zinc_shovel', 250, 90],
                ['create_sa:zinc_hoe', 250, 180]
            ]
        },

        // ZINC ARMOR
        {
            fluid: 'kubejs:molten_zinc',
            items: [
                ['create_sa:zinc_helmet', 220, 450],
                ['create_sa:zinc_chestplate', 320, 720],
                ['create_sa:zinc_leggings', 300, 630],
                ['create_sa:zinc_boots', 260, 360]
            ]
        },

        // BRASS TOOLS
        {
            fluid: 'kubejs:molten_brass',
            items: [
                ['create_sa:brass_sword', 450, 180],
                ['create_sa:brass_pickaxe', 450, 270],
                ['create_sa:brass_axe', 450, 270],
                ['create_sa:brass_shovel', 450, 90],
                ['create_sa:brass_hoe', 450, 180]
            ]
        },

        // BRASS ARMOR
        {
            fluid: 'kubejs:molten_brass',
            items: [
                ['create_sa:brass_helmet', 275, 450],
                ['create_sa:brass_chestplate', 400, 720],
                ['create_sa:brass_leggings', 375, 630],
                ['create_sa:brass_boots', 325, 360]
            ]
        }
    ]

    equipmentSets.forEach(set => {
        set.items.forEach(([item, durability, yieldAmount]) => {
            addEquipment(item, set.fluid, durability, yieldAmount)
        })
    })


    // =====================================
    // LIMESTONE AND FLUX PRODUCTION
    // =====================================

    event.recipes.create.mixing(
        '1x create:limestone',
        [
            '8x minecraft:cobblestone',
            Fluid.of('minecraft:water', 1000)
        ]
    ).heated()

    event.recipes.create.crushing(
        ['2x kubejs:lime_powder'],
        'create:limestone'
    )

    event.recipes.create.mixing(
        '2x kubejs:flux_powder',
        [
            'kubejs:lime_powder',
            'minecraft:charcoal'
        ]
    )


    // =====================================
    // RAW ORE + FLUX PROCESSING
    // =====================================

    function addFluxOreRecipes(raw, crushed, block, fluid) {

        // Raw ore
        event.recipes.create.mixing(
            Fluid.of(fluid, 180),
            [raw, 'kubejs:flux_powder']
        ).heated()

        // Crushed raw ore
        event.recipes.create.mixing(
            Fluid.of(fluid, 180),
            [crushed, 'kubejs:flux_powder']
        ).heated()

        // Raw ore block
        event.recipes.create.mixing(
            Fluid.of(fluid, 1620),
            [
                block,
                '3x kubejs:flux_powder'
            ]
        ).heated()
    }

    addFluxOreRecipes(
        'minecraft:raw_iron',
        'create:crushed_raw_iron',
        'minecraft:raw_iron_block',
        'kubejs:molten_iron'
    )

    addFluxOreRecipes(
        'minecraft:raw_gold',
        'create:crushed_raw_gold',
        'minecraft:raw_gold_block',
        'kubejs:molten_gold'
    )

    addFluxOreRecipes(
        'minecraft:raw_copper',
        'create:crushed_raw_copper',
        'minecraft:raw_copper_block',
        'kubejs:molten_copper'
    )

    addFluxOreRecipes(
        'create:raw_zinc',
        'create:crushed_raw_zinc',
        'create:raw_zinc_block',
        'kubejs:molten_zinc'
    )


    // =====================================
    // ALLOY RECIPES
    // =====================================

    // Bronze
    event.remove({ id: 'petrochem:mixing/bronze_alloy' })

    event.recipes.create.mixing(
        'petrochem:bronze_ingot',
        [
            Fluid.of('kubejs:molten_copper', 90),
            'petrochem:tin_nugget'
        ]
    ).heated()

    // Brass
    event.recipes.create.mixing(
        Fluid.of('kubejs:molten_brass', 270),
        [
            Fluid.of('kubejs:molten_zinc', 90),
            Fluid.of('kubejs:molten_copper', 90)
        ]
    ).heated()

    // Andesite alloy
    event.recipes.create.mixing(
        Fluid.of('kubejs:molten_andesite_alloy', 90),
        [
            'minecraft:andesite',
            'kubejs:flux_powder',
            Fluid.of('kubejs:molten_iron', 10)
        ]
    ).heated()


    // =====================================
    // MOLD CRAFTING
    // =====================================

    event.recipes.create.compacting(
        'kubejs:ingot_mold',
        [
            'minecraft:clay_ball',
            [
                'minecraft:iron_ingot',
                'minecraft:copper_ingot',
                'minecraft:gold_ingot',
                'create:zinc_ingot',
                'create:brass_ingot'
            ]
        ]
    )

    event.recipes.create.compacting(
        'kubejs:block_mold',
        [
            'minecraft:clay',
            [
                'minecraft:iron_block',
                'minecraft:copper_block',
                'minecraft:gold_block',
                'create:zinc_block',
                'create:brass_block'
            ]
        ]
    )

    event.recipes.create.compacting(
        'kubejs:nugget_mold',
        [
            'minecraft:clay_ball',
            [
                'minecraft:iron_nugget',
                'minecraft:gold_nugget',
                'create:copper_nugget',
                'create:zinc_nugget',
                'create:brass_nugget'
            ]
        ]
    )


    // =====================================
    // GENERIC METAL CASTING HELPER
    // =====================================

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

        // Final press returns the mold
        event.recipes.create.pressing(
            [
                Item.of(output, outputCount),
                Item.of(mold)
            ],
            Item.of(ready)
        )
    }


    // =====================================
    // INGOT CASTING
    // =====================================

    const ingotCasting = [
        ['iron', 'kubejs:molten_iron', 'minecraft:iron_ingot'],
        ['copper', 'kubejs:molten_copper', 'minecraft:copper_ingot'],
        ['gold', 'kubejs:molten_gold', 'minecraft:gold_ingot'],
        ['zinc', 'kubejs:molten_zinc', 'create:zinc_ingot'],
        ['brass', 'kubejs:molten_brass', 'create:brass_ingot']
    ]

    ingotCasting.forEach(([metal, fluid, output]) => {
        addMetalCasting(
            'kubejs:ingot_mold',
            `kubejs:${metal}_mold_stage`,
            `kubejs:${metal}_mold_stage_2`,
            fluid,
            180,
            output,
            2
        )
    })


    // =====================================
    // NUGGET CASTING
    // =====================================

    const nuggetCasting = [
        ['iron', 'kubejs:molten_iron', 'minecraft:iron_nugget'],
        ['copper', 'kubejs:molten_copper', 'create:copper_nugget'],
        ['gold', 'kubejs:molten_gold', 'minecraft:gold_nugget'],
        ['zinc', 'kubejs:molten_zinc', 'create:zinc_nugget'],
        ['brass', 'kubejs:molten_brass', 'create:brass_nugget']
    ]

    nuggetCasting.forEach(([metal, fluid, output]) => {
        addMetalCasting(
            'kubejs:nugget_mold',
            `kubejs:${metal}_nugget_mold_stage`,
            `kubejs:${metal}_nugget_mold_stage_2`,
            fluid,
            10,
            output,
            1
        )
    })


    // =====================================
    // BLOCK CASTING
    // =====================================

    const blockCasting = [
        ['iron', 'kubejs:molten_iron', 'minecraft:iron_block'],
        ['copper', 'kubejs:molten_copper', 'minecraft:copper_block'],
        ['gold', 'kubejs:molten_gold', 'minecraft:gold_block'],
        ['zinc', 'kubejs:molten_zinc', 'create:zinc_block'],
        ['brass', 'kubejs:molten_brass', 'create:brass_block']
    ]

    blockCasting.forEach(([metal, fluid, output]) => {
        addMetalCasting(
            'kubejs:block_mold',
            `kubejs:${metal}_block_mold_stage`,
            `kubejs:${metal}_block_mold_stage_2`,
            fluid,
            810,
            output,
            1
        )
    })


    // =====================================
    // ANDESITE ALLOY CASTING
    // =====================================

    addMetalCasting(
        'kubejs:ingot_mold',
        'kubejs:andesite_mold_stage',
        'kubejs:andesite_mold_stage_2',
        'kubejs:molten_andesite_alloy',
        180,
        'create:andesite_alloy',
        2
    )

})

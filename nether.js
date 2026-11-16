ServerEvents.recipes(event => {
    event.recipes.create.haunting([
        CreateItem.of('minecraft:crimson_roots', 0.5),
        CreateItem.of('minecraft:warped_roots', 0.5)
    ], 'minecraft:short_grass')

    event.recipes.create.compacting(
        'minecraft:crimson_nylium',
        [
            'minecraft:netherrack',
            'minecraft:crimson_roots',
            'minecraft:crimson_fungus',
            'minecraft:bone_meal'
        ]
    )

    event.recipes.create.compacting(
        'minecraft:warped_nylium',
        [
            'minecraft:netherrack',
            'minecraft:warped_roots',
            'minecraft:warped_fungus',
            'minecraft:bone_meal'
        ]
    )

   event.recipes.create.mixing(
       [ 'minecraft:basalt',
        'minecraft:blue_ice',
            Fluid.of('minecraft:lava', 500),
            'minecraft:soul_soil'
        ],
        [
            'minecraft:blue_ice',
            Fluid.of('minecraft:lava', 500),
            'minecraft:soul_soil'
        ]
    )

    event.recipes.summoningrituals.altar("minecraft:flint_and_steel")
        .itemInputs([
            Item.of("minecraft:obsidian", 4),
            Item.of("minecraft:wheat_seeds", 4)
        ])
        .itemOutputs([
            Item.of("minecraft:nether_wart", 4)
        ])
        .ticks(100)

    event.recipes.summoningrituals.altar("minecraft:torch")
        .itemInputs([
            Item.of("minecraft:gunpowder", 3),
            ("irons_spellbooks:arcane_essence")
        ])
        .entityOutputs([
            'minecraft:blaze'
        ])
        .ticks(140)

    event.recipes.summoningrituals.altar("minecraft:fire_charge")
        .itemInputs([
            Item.of("minecraft:gunpowder", 3),
            ("irons_spellbooks:arcane_essence"),
            "minecraft:blaze_rod"
        ])
        .entityOutputs([
            "minecraft:blaze",
            "minecraft:blaze",
            "minecraft:blaze",
            "minecraft:blaze",
            "minecraft:blaze"
        ])
        .ticks(140)

    event.recipes.create.crushing(
        [
            CreateItem.of('minecraft:skeleton_skull', 0.02),
            CreateItem.of('minecraft:bone_block', 0.3)
        ],
        'minecraft:bone_block'
    )

    event.recipes.summoningrituals.altar("minecraft:skeleton_skull")
        .itemInputs([
            Item.of("minecraft:coal_block", 4),
            Item.of("minecraft:fire_charge", 4),
            Item.of('minecraft:enchanted_book[stored_enchantments={levels:{"minecraft:silk_touch":1}}]')
        ])
        .entityInputs(
            "minecraft:villager"
        )
        .itemOutputs([
            Item.of("minecraft:wither_skeleton_skull", 1)
        ])
        .ticks(100)
})

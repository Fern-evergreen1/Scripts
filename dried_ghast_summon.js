ServerEvents.recipes(event => {
    event.recipes.summoningrituals.altar("minecraft:egg")
        .itemInputs([
            Item.of("minecraft:bone_block", 4),
            Item.of("minecraft:ice", 2)
        ])
        .entityOutputs([
            "kubejs:dried_ghast"
        ])
        .entityInputZone([10, 10, 10])
        .ticks(120)

    event.recipes.summoningrituals.altar("minecraft:nether_wart")
        .itemInputs([
            Item.of("minecraft:netherrack", 4),
            Item.of("minecraft:soul_sand", 2),
            Item.of("fire_charge", 1)
        ])
        .entityInputs([
            "kubejs:dried_ghast"
        ])
        .entityOutputs([
            "minecraft:ghast",
            "minecraft:ghast"
        ])
        .entityInputZone([10, 10, 10])
        .ticks(120)

    event.shaped(
        'summoningrituals:altar',
        [
            'GCG',
            'DDD',
            'NDN'
        ],
        {
            D: '#minecraft:logs',
            C: 'minecraft:red_carpet',
            G: 'minecraft:gold_ingot',
            N: 'minecraft:gold_nugget'
        }
    )
})

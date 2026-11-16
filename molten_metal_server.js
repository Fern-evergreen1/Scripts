const moltenMetalBlocks = [
    'kubejs:molten_iron',
    'kubejs:molten_copper',
    'kubejs:molten_gold',
    'kubejs:molten_andesite_alloy',
    'kubejs:molten_zinc',
    'kubejs:molten_brass'
]

ServerEvents.tick(event => {
    const server = event.server
    if (server.overworld().time % 10 !== 0) return

    server.getAllLevels().forEach(level => {
        level.getEntities().forEach(entity => {
            if (!entity.isAlive()) return

            if (entity.isPlayer() && entity.isSpectator()) return

            const feet = entity.block
            const head = level.getBlock(
                entity.blockX,
                entity.blockY + 1,
                entity.blockZ
            )

            if (
                moltenMetalBlocks.includes(String(feet.id)) ||
                moltenMetalBlocks.includes(String(head.id))
            ) {
                entity.attack(entity.damageSources().lava(), 4)
                entity.setRemainingFireTicks(300)
            }
        })
    })
})


const Ghast = Java.loadClass(
    'net.minecraft.world.entity.monster.Ghast'
)

StartupEvents.registry('entity_type', event => {
    const driedGhast = event.createCustom(
        'dried_ghast',
        Ghast,
        modify => {}
    )

    driedGhast
        .displayName('Dried Ghast')
        .mobCategory('creature')
        .sized(4.0, 4.0)
        .clientTrackingRange(10)
        .updateInterval(3)

    if (Platform.isClientEnvironment()) {
        driedGhast.setRendererFromType('minecraft:ghast')
    }
})

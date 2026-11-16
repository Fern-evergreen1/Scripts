
EntityJSEvents.modifyEntity(event => {

    // Custom Dried Ghast
    event.modify('kubejs:dried_ghast', modify => {
        modify.setTextureLocation(() =>
            'kubejs:textures/entity/dried_ghast.png'
        )
    })

    // Vanilla Ghast
    event.modify('minecraft:ghast', modify => {
        modify.setTextureLocation(() =>
            'kubejs:textures/entity/ghast.png'
        )
    })

})

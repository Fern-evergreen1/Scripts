EntityJSEvents.modifyEntity(event => {
    event.modify('minecraft:ghast', modify => {
        modify.setTextureLocation(() =>
            'kubejs:textures/entity/ghast.png'
        )
    })
})
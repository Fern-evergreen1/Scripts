ServerEvents.recipes(event => {
    event.remove({ id: 'create_sa:netherrack_recipe' })
    event.remove({ id: 'createaddition:mixing/netherrack' })
    event.remove({ id: 'create:mixing/andesite_alloy' })
    event.remove({ id: 'create:mixing/andesite_alloy_from_zinc' })
})

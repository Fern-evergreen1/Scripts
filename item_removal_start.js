const metals = [
    'iron',
    'copper',
    'gold',
    'zinc',
    'brass',
    'andesite_alloy'
]

StartupEvents.modifyCreativeTab('minecraft:search', event => {
    metals.forEach(metal => {
        event.remove(`kubejs:${metal}_ingot_stage`)
    })
})
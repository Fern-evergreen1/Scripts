const metals = [
    'iron',
    'copper',
    'gold',
    'zinc',
    'brass',
    'andesite'
]

RecipeViewerEvents.removeEntries('item', event => {
    metals.forEach(metal => {
        event.remove(`kubejs:${metal}_mold_stage`)
    })
     metals.forEach(metal => {
        event.remove(`kubejs:${metal}_mold_stage_2`)
    })
})


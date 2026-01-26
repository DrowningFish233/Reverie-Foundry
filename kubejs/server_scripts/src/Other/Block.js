const fireBrickColors = [
    'gray', 'light_gray', 'cyan', 'purple', 'blue', 'brown',
    'green', 'red', 'pink', 'black', 'white', 'orange',
    'magenta', 'light_blue', 'yellow', 'lime'
]

fireBrickColors.forEach(color => {
    BlockEvents.placed(`productivemetalworks:${color}_fire_bricks`, event => {
        event.block.set(`productivemetalworks:${color}_fire_bricks`)
    })
})

const foundryTypes = ['drain', 'tank', 'capacitor']
const foundryColors = ['white', 'gray', 'light_gray', 'cyan', 'purple', 'blue', 'brown', 'green', 'red', 'pink', 'black', 'orange', 'magenta', 'light_blue', 'yellow', 'lime']

foundryColors.forEach(color => {
    foundryTypes.forEach(type => {
        BlockEvents.placed(`productivemetalworks:${color}_foundry_${type}`, event => {
            event.block.set(`productivemetalworks:${color}_foundry_${type}`)
        })
    })
})


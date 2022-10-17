const ShipArray = require('./index');

test('check random Number', () => {
    expepct(
        ShipFactory.getRandomInt(9).toBeLessThan(10)
    )
})


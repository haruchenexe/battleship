var ShipFactory = {
    shipArray: [
        {
            name: 'destroyer',
            direction: [
                [0, 0],
                [0, 1]
            ]
        }
    ],
    init() {
        this.getRandomInt();
        this.cacheJSDom();
        this.computerHit();
        this.playerHit();
    },
    getRandomInt(maxNum) {
        return Math.floor(Math.random() * maxNum)
    },
    cacheJSDom() {
        this.$playerTurn = document.querySelector('#playerTable');
        this.$computerTurn = document.querySelector('#computerTable');
    },
    computerHit() {     
        // computer fires & hits me randomly? Most likely need an eventlistender with click to trigger this event
        let x_coord_hit = String(this.getRandomInt(10));
        let y_coord_hit = String(this.getRandomInt(10));

        let computer_hit_coords = `[${x_coord_hit}, ${y_coord_hit}]`;
        return computer_hit_coords

        // let hit_location = document.getElementById(`[${x_coord_hit}, ${y_coord_hit}]`);
        // hit_location.style.backgroundColor = 'red'
    },
    playerHit(id) {
        let player_hit_coords = document.getElementById(id);

        return player_hit_coords
    }
}

module.exports = ShipFactory;


var Player = {
    player: 0,
    computer: 1,
    init() {
        this.cacheDom();
        this.turnPlay();
    },
    cacheDom() {
        this.$playerTable = document.querySelector('#playerTable');
        this.$computerTable = document.querySelector('#computerTable');
    },
    turnPlay() {
        let turn = this.player

    }
}



module.exports = Player;
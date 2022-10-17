/* 
1. Create battleships that are in a length between 1-4 cells. Typically there should be more than 1 cell vs 4 cell. 
        1a. Or we can simply paint over the cell block to be some color or give it a border-style shad to determine the difference
2. Create a bot that randomizes a spot in your 10x10 grid. Everytime the user finishes pressing the bot will randomly place an “X” mark on your 10x10 grid.
3. Create a function that tracks the number of ships that’s been hit. Whoever’s counter hits 0 first loses
4. Create a 10x10 square grid 
*/

import './style.css';


// cache doms
const playerTable = document.querySelector('#playerTable');
const computerTable = document.querySelector('#computerTable');
const shipBtn = document.querySelectorAll('.ships')


var ShipFactory = {
        shipArray: [
                {
                        name: 'destroyer',
                        direction: [
                                [0, 0],
                                [0, 1]
                        ]
                },
                {
                        name: 'submarine',
                        direction: [
                                [0, 0],
                                [0, 1],
                                [0, 2]
                        ]
                },
                {
                        name: 'cruiser',
                        direction: [
                                [0, 0],
                                [0, 1],
                                [0, 2],
                                [0, 3]
                        ]
                },
                {
                        name: 'carrier',
                        direction: [
                                [0, 0],
                                [0, 1],
                                [0, 2],
                                [0, 3],
                                [0, 4]
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
    




var GameBoard = {
        init() {
                this.cacheDom();
                this.assignTable();
                this.cacheJSDom();
                this.selectShips();
                this.placeShip();
                this.loopCells();
        },
        cacheDom() {
                this.$playerTable = document.querySelector('#playerTable');
                this.$computerTable = document.querySelector('#computerTable');
                this.$ships = document.querySelectorAll('.ships');
                this.$destroyer = document.querySelector('#destroyer');
        },
        cacheJSDom() {
                this.$computerCells = this.$computerTable.querySelectorAll('td');             // allows you to select "td" within the element id "playerTable"
                this.$playerCells = this.$playerTable.querySelectorAll('td');
        },
        generateTable() {
                const table = document.createElement('table');
                const tblBody = document.createElement('tbody');

                for (let i=0; i<10; i++) {
                const rows = document.createElement('tr');
                for (let j=0; j<10; j++) {
                        const cells = document.createElement('td');
                        cells.setAttribute('id', `[${i}, ${j}]`);
                        cells.setAttribute('class', 'empty');
                        rows.append(cells)
                }
                
                tblBody.append(rows)
                }

                // table.setAttribute('border', 1);
                // table.setAttribute('width', 600);
                // table.setAttribute('height', 600);
                table.append(tblBody);
                
                return table
        },
        assignTable() {
                // assigns table to player & computer divs

                this.$playerTable.append(this.generateTable());
                // this.$computerTable.append(this.generateTable());
        },
        selectShips() {

                this.$ships.forEach(button => 
                        button.addEventListener('dragstart', e=> {

                                this.dragStart()
                                // this.searchforShip(e.target.id)
                                console.log(e.target.children)                  // returns the children elements

                        }))

        },
        searchforShip(event) {

                let array = [];

                for (let i=0; i<ShipFactory.shipArray.length; i++) {
                        if (event === ShipFactory.shipArray[i].name) {
                                array.push(ShipFactory.shipArray[i].direction)
                        }
                }

                console.log(array)
        },
        placeShip() {

                // this.$playerCells.forEach(element =>
                //         element.addEventListener('dragenter', e=> {
                //                 // if(e.target.classList.contains("sea-water")) {
                //                 //         e.target.classList.add("dragover")
                //                 // }

                //                 let resultArray = [];
                //                 resultArray.push(e.target.id)

                //                 this.displayShipOnTable(array, resultArray)
                //         })
                
                // )

                this.$playerCells.forEach(element =>
                        element.addEventListener('dragend', e=> {
                                this.dragDrop()
                                this.dragEnd()
                        }))
      
        },
        loopCells() {
                for (const playerCell of this.$playerCells) {
                        playerCell.addEventListener('dragover', this.dragOver);
                        playerCell.addEventListener('dragenter', this.dragEnter);
                        playerCell.addEventListener('dragleave', this.dragLeave);
                        playerCell.addEventListener('drop', this.dragDrop);
                }
        },
        dragStart() {
                this.className += ' hold';
                setTimeout(() => this.className = 'invisible', 0);
                
                
                console.log('start')
        },
        dragEnd() {
                console.log('end')
        },
        dragOver(e) {
                e.preventDefault();
                console.log('over')
   
        },
        dragEnter(e) {
                e.preventDefault();
                this.className += ' hovered'
                console.log('enter')
        },
        dragLeave() {
                this.className = 'empty';
                console.log('leave')
        },
        dragDrop() {

                this.className = 'destroyer'                            // this is where you change the class name


                console.log('drop')

        }
}

GameBoard.init()










// // https://www.youtube.com/watch?v=C22hQKE_32c&ab_channel=TraversyMedia         This will teach me how to do drag & drop






// // when you select a space from the id add the array.
// // for example if I select 'destroyer' at space [0, 0] I would have the ship occupy the space [0, 0] & [0, 1]










// // this logic works for color coding ship locations

// // const Ship = ['[0, 0]', '[0, 1]'];

// // for (let i=0; i<Ship.length; i++) {
// //     let ShipLocation = document.getElementById(Ship[i])
// //     console.log(ShipLocation)
// //     ShipLocation.style.backgroundColor = 'red'
// // }






// // function turns() {
// //     const player = document.querySelector('#playerTable');
// //     const computer = document.querySelector('#computerTable');

// //     let turn = 0;

// //     if (turn == 0) {
// //         computer.forEach(element => 
// //             element.addEventListener('click', e=> {
// //                 let playerhitcoords = ShipFactory.hit();
// //                 let coords = document.getElementById(playerhitcoords);
// //                 coords.style.backgroundColor = 'red'
// //                 turn = 1
// //             }))
// //     } 
// // }

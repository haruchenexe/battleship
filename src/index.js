/* 
1. Create battleships that are in a length between 1-4 cells. Typically there should be more than 1 cell vs 4 cell. 
        1a. Or we can simply paint over the cell block to be some color or give it a border-style shad to determine the difference
2. Create a bot that randomizes a spot in your 10x10 grid. Everytime the user finishes pressing the bot will randomly place an “X” mark on your 10x10 grid.
3. Create a function that tracks the number of ships that’s been hit. Whoever’s counter hits 0 first loses
4. Create a 10x10 square grid 
*/

import { slice } from 'lodash';
import './style.css';

var ShipFactory = {
        destroyerlifePoint: 2,
        submarinelifePoint: 3,
        cruiserlifePoint: 4,
        carrierlifePoint: 5,
        shipArray: [
                {
                        name: 'destroyer',
                        verticalshipLength: [
                                [0, 0],
                                [0, 1]
                        ],
                        horizontalshipLength: [
                                [0, 0],
                                [1, 0]
                        ]
                },
                {
                        name: 'submarine',
                        verticalshipLength: [
                                [0, 0],
                                [0, 1],
                                [0, 2]
                        ],
                        horizontalshipLength: [
                                [0, 0],
                                [1, 0],
                                [2, 0]
                        ]
                },
                {
                        name: 'cruiser',
                        verticalshipLength: [
                                [0, 0],
                                [0, 1],
                                [0, 2],
                                [0, 3]
                        ],
                        horizontalshipLength: [
                                [0, 0],
                                [1, 0],
                                [2, 0],
                                [3, 0]
                        ]
                },
                {
                        name: 'carrier',
                        verticalshipLength: [
                                [0, 0],
                                [0, 1],
                                [0, 2],
                                [0, 3],
                                [0, 4]
                        ],
                        horizontalshipLength: [
                                [0, 0],
                                [1, 0],
                                [2, 0],
                                [3, 0],
                                [4, 0]
                        ]
                }
        ],
        init() {
            this.getRandomInt();
            this.cacheDom();
            this.cacheJSDom();
            this.Hit();
        },
        getRandomInt(maxNum) {
            return Math.floor(Math.random() * maxNum)
        },
        cacheDom() {
                const playerTable = document.querySelector('#playerTable');
                const computerTable = document.querySelector('#computerTable');
                const shipBtn = document.querySelectorAll('.ships');
        },
        cacheJSDom() {
            this.$playerTurn = document.querySelector('#playerTable');
            this.$computerTurn = document.querySelector('#computerTable');
        },
        Hit() {     
            // computer fires & hits me randomly? Most likely need an eventlistender with click to trigger this event
            let x_coord_hit = String(this.getRandomInt(9));
            let y_coord_hit = String(this.getRandomInt(9));
    
            let computer_hit_coords = `[${x_coord_hit},${y_coord_hit}]`;
            return computer_hit_coords
        }
}

ShipFactory.init()



var GameBoard = {
        shipInfo: {name: '', verticalshipLength:'', horizontalshipLength:''},
        verticalSelected: true,
        horizaontalSelect: false,
        allshipPlaced: false,
        init() {
                this.cacheDom();
                this.assignTable();
                this.cacheJSDom();
                this.selectaShip();
                this.shipdirectionSelection();
                this.computershipPlacement();
                this.resetGame();
        },
        cacheDom() {
                this.$playerTable = document.querySelector('#playerTable');
                this.$computerTable = document.querySelector('#computerTable');
                this.$verticalships = document.querySelectorAll('.vertical-ships');
                this.$verticalgrid = document.querySelector('.grid-vertical-display');
                this.$shipName = document.querySelectorAll('.shipName');
                this.$shipColors = document.querySelectorAll('.shipColors');
                this.$rotateBtn = document.querySelector('#rotateBtn');
                this.$playerTableTag = this.$playerTable.getElementsByTagName("td");
                this.$computerTableTag = this.$computerTable.getElementsByTagName("td");
                this.$resetBtn = document.querySelector('#resetBtn');
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
                                const coords = document.createElement('coords');

                                cells.setAttribute('id', `[${i},${j}]`);
                                cells.setAttribute('class', 'empty');
                                cells.setAttribute('data-columns', `[${i},${j}]`);

                                rows.append(cells);
                        }
                tblBody.append(rows);
                }

                table.append(tblBody);
                
                return table
        },
        assignTable() {

                this.$playerTable.append(this.generateTable());                                 // assigns table to player & computer divs
                this.$computerTable.append(this.generateTable());
        },
        shipdirectionSelection() {
                this.$rotateBtn.addEventListener('click', e=> {
                        if (this.verticalSelected == true) {
                                this.horizaontalSelect = true
                                this.verticalSelected = false

                                this.$verticalgrid.className = 'grid-horizontal-display'
                                this.$verticalships.forEach(grid => {
                                        grid.className = 'horizontal-ships'
                                })

                        } else {
                                this.horizaontalSelect = false
                                this.verticalSelected = true
                                
                                let horizontalgrid = document.querySelector('.grid-horizontal-display');
                                let horizontalships = document.querySelectorAll('.horizontal-ships');

                                horizontalgrid.className = 'grid-vertical-display'
                                horizontalships.forEach(grid => {
                                        grid.className = 'vertical-ships'
                                })
                        }
                })
        },
        selectaShip() {

                this.$shipName.forEach(ship => 
                        ship.addEventListener('click', e=> {

                                if (this.verticalSelected == true) {
                                        let shipidName = this.searchforShip(e.target.id).shipName;
                                        let verticalshipLength = this.searchforShip(e.target.id).verticalshipLength;
        
                                        this.shipInfo.name = shipidName;
                                        this.shipInfo.verticalshipLength = verticalshipLength;
        
        
                                        this.shipselectionDisappear();
                                        this.shipplacementOperation('mouseenter', 'shipColors');
                                        this.shipplacementOperation('mouseleave', 'empty');
                                        this.placeShipOnGrid();

                                } else {
                                        let shipidName = this.searchforShip(e.target.id).shipName;
                                        let horizontalshipLength = this.searchforShip(e.target.id).horizontalshipLength;
        
                                        this.shipInfo.name = shipidName;
                                        this.shipInfo.horizontalshipLength = horizontalshipLength;
        
        
                                        this.shipselectionDisappear();
                                        this.shipplacementOperation('mouseenter', 'shipColors');
                                        this.shipplacementOperation('mouseleave', 'empty');
                                        this.placeShipOnGrid();
                                }

                                }
                        )
                )
        },
        searchforShip(shipName) {

                for (let i=0; i<ShipFactory.shipArray.length; i++) {
                        if(shipName === ShipFactory.shipArray[i].name) {
                                if (this.verticalSelected == true) {
                                        let verticalshipLength = ShipFactory.shipArray[i].verticalshipLength
                                        return {
                                                'verticalshipLength': verticalshipLength,
                                                'shipName': ShipFactory.shipArray[i].name
                                        } 
                                } else {
                                        let horizontalshipLength = ShipFactory.shipArray[i].horizontalshipLength
                                        return {
                                                'horizontalshipLength': horizontalshipLength,
                                                'shipName': ShipFactory.shipArray[i].name
                                        }
                                }
                        }
                }
        },
        shipselectionDisappear() {
                let allshipidName = document.querySelectorAll(`#${this.shipInfo.name}`);

                // whites out the box in the ship selection
                for (let i=0; i<allshipidName.length; i++) {
                        allshipidName[i].className = '.shipSelected'
                };
        },
        shipplacementOperation(eventlistender, className) {

                this.$playerCells.forEach(cell => 
                        cell.addEventListener(eventlistender, e=> {

                                if (this.verticalSelected == true) {
                                        let idCoords = e.target.id
                                        let idArray = this.convertidtoArray(idCoords);                  
                                        let arrayLength = this.sumArray(idArray, this.shipInfo.verticalshipLength);          
                                        let slicedLength = this.sliceArray(arrayLength, 2);             
                                        let final = this.arraytoString(slicedLength);                   
        
                                        this.addClassName(final, className); 
                                } else {
                                        let idCoords = e.target.id
                                        let idArray = this.convertidtoArray(idCoords);                  
                                        let arrayLength = this.sumArray(idArray, this.shipInfo.horizontalshipLength);          
                                        let slicedLength = this.sliceArray(arrayLength, 2);             
                                        let final = this.arraytoString(slicedLength);                   
        
                                        this.addClassName(final, className); 
                                }

                                }
                        )
                )     
        },
        placeShipOnGrid() {
                this.$playerCells.forEach(cell => {
                        cell.addEventListener('click', e=> {
                                
                                if (this.verticalSelected == true) {
                                        let targetId = e.target.id
                                        let idArray = this.convertidtoArray(targetId);
                                        let arrayLength = this.sumArray(idArray, this.shipInfo.verticalshipLength);
                                        let slicedLength = this.sliceArray(arrayLength, 2);
                                        let greaterthan10 = ''
        
                                        for (let i=0; i<slicedLength.length; i++) {
                                                for (let k=0; k<slicedLength.length; k++) {
                                                        if (slicedLength[i][k] >= 10) {
                                                                greaterthan10 = true
                                                                break
        
                                                        } else {
                                                                greaterthan10 = false
                                                        }
                                                }
                                        }
        
        
                                        let final = this.arraytoString(slicedLength);
        
                                        if (greaterthan10 == true) {
                                                this.applycolortocell(final, '.empty', "")
                                        } else {
                                                this.applycolortocell(final, "", this.shipInfo.name)
                                        }
        
        
                                        this.shipInfo.name = ''
                                        this.shipInfo.verticalshipLength = ''
        
                                        this.allshipplacedChecker()   
                                } else {
                                        let targetId = e.target.id
                                        let idArray = this.convertidtoArray(targetId);
                                        let arrayLength = this.sumArray(idArray, this.shipInfo.horizontalshipLength);
                                        let slicedLength = this.sliceArray(arrayLength, 2);
                                        let greaterthan10 = ''
        
                                        for (let i=0; i<slicedLength.length; i++) {
                                                for (let k=0; k<slicedLength.length; k++) {
                                                        if (slicedLength[i][k] >= 10) {
                                                                greaterthan10 = true
                                                                break
        
                                                        } else {
                                                                greaterthan10 = false
                                                        }
                                                }
                                        }
        
                                        let final = this.arraytoString(slicedLength);
        
                                        if (greaterthan10 == true) {
                                                this.applycolortocell(final, '.empty', "")
                                        } else {
                                                this.applycolortocell(final, "", this.shipInfo.name)
                                        }
        
                                        this.shipInfo.name = ''
                                        this.shipInfo.horizontalshipLength = ''
        
                                        this.allshipplacedChecker()
                                }
                        })
                })
        },
        convertidtoArray(id) {
                const array = [];

                for (let i=0; i<id.length; i++) {
                        if (!(isNaN(id[i]))) {
                                array.push(Number(id[i]))
                        }
                };

                return array
        },
        sumArray(array1, array2) {
                let array = []

                for (let i=0; i<array2.length; i++) {
                        for (let k=0; k<array2[i].length; k++) {
                                array.push(array1[k] + array2[i][k]) 
                        }
                };

                return array
        },
        sliceArray(array, size) {                    
                const result = [];
                while (array.length > 0) {
                        const chunk = array.splice(0, size);
                        result.push(chunk)
                }
                return result
        },
        arraytoString(array) {
                let result = [];

                for (let i=0; i<array.length; i++) {
                        result.push(`[${array[i].toString()}]`)
                }
                return result
        },
        addClassName(array, shipClassName) {
                for (let i=0; i<array.length; i++) {
                        let eventId = document.getElementById(array[i]);
                        
                        if (!(eventId == null)) {
                                eventId.className = shipClassName 
                        } else {
                                return
                        }
                }
        },
        applycolortocell(array, csname, idname) {

                if (csname != "") {
                        for (let i=0; i<array.length; i++) {

                                let eventclassName = document.getElementById(array[i]);
                                eventclassName.className = csname
                        }
                } else {
                        for (let i=0; i<array.length; i++) {

                                let eventid = document.getElementById(array[i]);
                                eventid.id = idname
                        }  
                }
        },
        uniqufunction(value, index, self) {
                return self.indexOf(value) === index;
        },
        allshipplacedChecker() {
                let shipNames = [];

                this.$playerCells.forEach(cell => {
                        if (cell.id.includes('destroyer')) {
                                shipNames.push(cell.id)
                        } else if (cell.id.includes('submarine')) {
                                shipNames.push(cell.id)
                        } else if (cell.id.includes('cruiser')) {
                                shipNames.push(cell.id)
                        } else if (cell.id.includes('carrier')) {
                                shipNames.push(cell.id)
                        } else {
                                return
                         }
                })

                let uniqueShipNames = shipNames.filter(this.uniqufunction)
                
                if (uniqueShipNames.length >= 4) {
                        this.allshipPlaced = true                             
                }
        },
        computershipPlacement() {
                this.createcomputerShips('destroyer');
                this.createcomputerShips('submarine');
                this.createcomputerShips('cruiser');
                this.createcomputerShips('carrier');
                this.reseterrorboard();
        },
        checkcoordSize(finalcoords) {

                let greaterthan10 = '';

                for (let i=0; i<finalcoords.length; i++) {
                        for (let k=0; k<finalcoords.length; k++) {
                                if (finalcoords[i][k] > 9) {
                                        greaterthan10 = true;
                                        break
                                } else {
                                        greaterthan10 = false;
                                }
                        }
                }

                return greaterthan10
        },
        generatecomputerarrays(selectedShip) {
                const randomCoordinate = ShipFactory.Hit();
                const selectedShipLength = this.searchforShip(selectedShip).verticalshipLength; 

                let targetId = randomCoordinate
                let idArray = this.convertidtoArray(targetId);
                let arrayLength = this.sumArray(idArray, selectedShipLength);
                let slicedLength = this.sliceArray(arrayLength, 2);

                return slicedLength
        },
        createcomputerShips(shipName) {
                
                let shipArray = this.generatecomputerarrays(shipName);
                let final = this.arraytoString(shipArray);
                let greaterthan10Results = this.checkcoordSize(shipArray);

                if (greaterthan10Results != true) {
                        this.matchcomputershipID(final, shipName);
                } else if (greaterthan10Results == true) {
                        this.shipalreadyPlaced(shipName);
                        this.createcomputerShips(shipName);
                }
        },
        matchcomputershipID(final, shipName) {

                        
                for (let i=0; i<this.$computerTableTag.length; i++) {
                      
                        for (let k=0; k<final.length; k++) {

                                if (this.$computerTableTag [i].id == final[k] && this.$computerTableTag [i].className == 'empty') {

                                        this.$computerTableTag [i].className = shipName

                                } else if (this.$computerTableTag [i].id == final[k] && this.$computerTableTag [i].className != 'empty') {
                                        
                                        this.shipalreadyPlaced(shipName)
                                        this.createcomputerShips(shipName)
                                        break
                                }
                        }  
                }
        },
        shipalreadyPlaced(shipName) {
                const shipclassName = document.querySelectorAll(`.${shipName}`);

                for (let i=0; i<shipclassName.length; i++) {
                        shipclassName[i].className = 'empty'
                }
        },
        reseterrorboard() {

                const totalShipsonBoard = [];
                let destroyercount = 0;
                let submarinecount = 0;
                let cruisercount = 0;
                let carriercount = 0;
                
                for (let i=0; i < this.$computerTableTag.length; i++) {
                        if (this.$computerTableTag[i].className != "empty") {
                                totalShipsonBoard.push(this.$computerTableTag[i].className)
                        }
                }

                for (let k=0; k<totalShipsonBoard.length; k++) {
                        switch(totalShipsonBoard[k]) {
                                case 'destroyer': destroyercount++
                                break
                                case 'submarine': submarinecount++
                                break
                                case 'cruiser': cruisercount++
                                break
                                case 'carrier': carriercount++
                                break
                        }
                }

                if (destroyercount > 2 || submarinecount > 3 || cruisercount > 4 || carriercount > 5) {
                        this.resetwholeboard();
                        this.computershipPlacement();

                        destroyercount = 0;
                        submarinecount = 0;
                        cruisercount = 0;
                        carriercount = 0;
                }
        },
        resetwholeboard() {
                for (let i=0; i < this.$computerTableTag.length; i++) {
                        this.$computerTableTag[i].className = 'empty'
                };
        },
        resetGame() {
                this.$resetBtn.addEventListener('click', e=> {
                        window.location.reload();
                })
        }
}

GameBoard.init()





var Player = {
        uniqueplayerCoords: [],
        playerLife: 0,
        computerLife: 0,
        destroyerLifePoint: 2,
        submarinelifePoint: 3,
        cruiserlifePoint: 4,
        carrierlifePoint: 5,
        init() {
                this.cacheDom();
                this.playerAttacks();
                this.displaylifePoint();
                this.uniqueCoords();
        },
        cacheDom() {
                this.$playerTable = document.querySelector('#playerTable');
                this.$computerTable = document.querySelector('#computerTable');
                this.$computerCells = this.$computerTable.querySelectorAll('td');
                this.$playerCells = this.$playerTable.querySelectorAll('td'); 
                this.$playertargets = this.$playerTable.querySelectorAll('.targets');
                this.$computertargets = this.$computerTable.querySelectorAll('.targets');
                this.$destroyerlifepoint = document.querySelector('#destroyerlifepoint');
                this.$submarinelifepoint = document.querySelector('#submarinelifepoint');
                this.$cruiserlifepoint = document.querySelector('#cruiserlifepoint');
                this.$carrierlifepoint = document.querySelector('#carrierlifepoint');
                this.$shipHolder = document.querySelectorAll('#shipHolder')
                this.$shipContainer = document.querySelector('#shipContainer');
        },
        playerAttacks() {
                this.$computerCells.forEach(cell => {
                        cell.addEventListener('click', e=> {

                                if (GameBoard.allshipPlaced == true) {
                                        if (e.target.className == 'empty') {
                                                if (e.target.id == 'hit' || e.target.id == 'miss') {
                                                        return 
                                                } else {
                                                        e.target.id = 'miss'   
                                                }
                                        } else {

                                                if (e.target.id == 'hit' || e.target.id == 'miss') {
                                                        return 
                                                } else if (e.target.id != 'hit') {
                                                        let computerID = e.target.dataset.columns                           
                                                        this.enemyshiphit(e);
                                                        e.target.id = 'hit'                                               
                                                        this.displaylifePoint(); 
                                                }
                                        }
                                        this.computerAttacks();
                                }
                                this.playerLifePoint();
                                this.computerLifePoint();
                                this.gameResult();
                        })
                })
        },
        enemyshiphit(e) {
                if (e.target.className == "destroyer") {
                        this.destroyerLifePoint -= 1
                } else if (e.target.className == "submarine") {
                        this.submarinelifePoint -= 1
                } else if (e.target.className == "cruiser") {
                        this.cruiserlifePoint -= 1
                } else if (e.target.className == "carrier") {
                        this.carrierlifePoint -= 1
                }
        },
        displaylifePoint() {
                this.$destroyerlifepoint.textContent = this.destroyerLifePoint;
                this.$submarinelifepoint.textContent = this.submarinelifePoint;
                this.$cruiserlifepoint.textContent = this.cruiserlifePoint;
                this.$carrierlifepoint.textContent = this.carrierlifePoint;
        },
        uniqueCoords() {

                this.$playerCells.forEach(cell => {
                        this.uniqueplayerCoords.push(cell.id)
                });

        },
        uniqueHitCoords() {

                let randomcomputerHit = ShipFactory.Hit();
                let searchCoords = this.uniqueplayerCoords.find(coord => coord == randomcomputerHit)
                
                const index = this.uniqueplayerCoords.indexOf(searchCoords)

                if (index > -1) {
                        this.uniqueplayerCoords.splice(index, 1);
                } else if (index == -1) {
                        this.computerAttacks()
                }

                return randomcomputerHit
        },
        computerAttacks() {

                let randomcomputerHit = this.uniqueHitCoords();

                for (let i=0; i<this.$playerCells.length; i++) {

                        if ((this.$playerCells[i].dataset.columns == randomcomputerHit && this.$playerCells[i].id == 'destroyer')) { 
                                setTimeout(() => {
                                        this.$playerCells[i].id = 'hit' 
                                }, 500)
                        } else if ((this.$playerCells[i].dataset.columns == randomcomputerHit && this.$playerCells[i].id == 'submarine')) {
                                setTimeout(() => {
                                        this.$playerCells[i].id = 'hit' 
                                }, 500)
                        } else if ((this.$playerCells[i].dataset.columns == randomcomputerHit && this.$playerCells[i].id == 'cruiser')) {
                                setTimeout(() => {
                                        this.$playerCells[i].id = 'hit' 
                                }, 500)
                        } else if ((this.$playerCells[i].dataset.columns == randomcomputerHit && this.$playerCells[i].id == 'carrier')) {
                                setTimeout(() => {
                                        this.$playerCells[i].id = 'hit' 
                                }, 500)
                        } else if ((this.$playerCells[i].dataset.columns == randomcomputerHit && this.$playerCells[i].id != 'hit')) {
                                setTimeout(() => {
                                        this.$playerCells[i].id = 'miss'
                                }, 500)
                        }
                }
        },
        playerLifePoint() {

                let count = 0
                this.$playerCells.forEach(cell => {
                        if (cell.id == 'submarine' || cell.id == 'destroyer' || cell.id == 'cruiser' || cell.id == 'carrier') {
                                count++
                        }
                })
                
                this.playerLife = count
        },
        computerLifePoint() {
                let count = Number(this.$cruiserlifepoint.textContent) + Number(this.$destroyerlifepoint.textContent) + Number(this.$carrierlifepoint.textContent) + Number(this.$submarinelifepoint.textContent);
                
                this.computerLife = count
        },
        gameResult() {
                if (this.playerLife == 0) {
                        alert('Computer Wins!')
                } else if (this.computerLife == 0) {
                        alert('Playert Wins!')
                }
        }
}

Player.init()

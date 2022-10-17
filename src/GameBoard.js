var GameBoard = {
    init() {
        this.cacheDom();
        this.assignTable();
        this.cacheJSDom();
        this.selectCell();
    },
    cacheDom() {
        this.$playerTable = document.querySelector('#playerTable');
        this.$computerTable = document.querySelector('#computerTable');
    },
    cacheJSDom() {
        this.$computerCells = computerTable.querySelectorAll('td');             // allows you to select "td" within the element id "playerTable"
    },
    generateTable() {
        const table = document.createElement('table');
        const tblBody = document.createElement('tbody');

        for (let i=0; i<10; i++) {
            const rows = document.createElement('tr');
            for (let j=0; j<10; j++) {
                const cells = document.createElement('td');
                cells.setAttribute('id', `[${i}, ${j}]`);
                cells.setAttribute('class', 'non-filled-space');
                rows.append(cells)
            }
            
        tblBody.append(rows)
        }

        table.setAttribute('border', 1);
        table.setAttribute('width', 500);
        table.setAttribute('height', 500);
        table.append(tblBody);
        
        return table
    },
    assignTable() {
        // assigns table to player & computer divs

        this.$playerTable.append(this.generateTable());
        this.$computerTable.append(this.generateTable());
    },
    selectCell() {              // player selecting computer cell
        this.$computerCells.forEach(element => 
            element.addEventListener('click', e=> {
                console.log(e.target)
            }))
    }

}

module.exports = GameBoard;
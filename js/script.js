const mainContainer = document.getElementById('main-container');
const darkMode = document.getElementById('dark-mode')
const mineCount = document.querySelector('#minecount')
const board = document.querySelector('#board');


let gameBoard = [];
let rows = 16;
let columns = 16;

let totalMines = 5;
let minesLocation = [];

mineCount.textContent = `Total Mines: ${totalMines}`;

renderBoard()
setMines()

const tile = document.querySelectorAll('#board > div');

board.addEventListener('click', e => {
    if (!e.target.classList.contains('tile')) return;

    let currentTile = e.target;
    currentTile.classList.add('clicked');
    if (minesLocation.includes(currentTile.id)) {
        // game over function
        for (let i = 0; i < minesLocation.length; i++) {
            let mineTile = document.getElementById(minesLocation[i])
            mineTile.innerHTML = '<i class="fa-solid fa-bomb"></i>';
        }
    }
})



function renderBoard() {
    board.style.setProperty('--rows', rows);
    board.style.setProperty('--columns', columns);

    for (let r = 0; r < rows; r++) {
        let row = [];
        for (let c = 0; c < columns; c++) {
            let tile = document.createElement('div');
            tile.id = `${r}-${c}`;
            tile.classList.add('tile');
            board.appendChild(tile)
            row.push(tile)
        }
        gameBoard.push(row);
    }
}

function setMines() {
    let mineTracker = totalMines;
    
    while (mineTracker > 0) {
        let row = Math.floor(Math.random() * rows);
        let column = Math.floor(Math.random() * columns);
        let id = `${row}-${column}`;
        
        if (!minesLocation.includes(id)) {
            minesLocation.push(id)
            mineTracker -= 1;
        }
    }
}

// function checkMine(r,c) {
//     if ()
// }

darkMode.addEventListener('click', () => {
    mainContainer.classList.toggle('dark-mode')
    mainContainer.classList.toggle('light-mode')
    if (darkMode.innerHTML === '<i class="fa-solid fa-moon"></i>Dark') {
        darkMode.innerHTML = '<i class="fa-solid fa-sun" style="color: #ffffff;"></i><span style="color: #fff;"> Light</span>';
    } else {
        darkMode.innerHTML = '<i class="fa-solid fa-moon"></i>Dark'
    }
})

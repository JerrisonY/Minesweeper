const mainContainer = document.getElementById('main-container');
const darkMode = document.getElementById('dark-mode')
const mineCount = document.querySelector('#minecount')
const board = document.querySelector('#board');
const difficulty = document.querySelector('#difficulty')
const beginner = document.querySelector('#beginner');
const intermediate = document.querySelector('#intermediate');
const expert = document.querySelector('#expert');

let gameBoard = [];
let rows = 8;
let columns = 8;

let minesLocation = [];
let totalMines = 10;


mineCount.textContent = `Total Mines: ${totalMines}`;
difficulty.textContent = `Difficulty: Beginner`;

renderBoard()
setMines()



board.addEventListener('click', e => {
    if (!e.target.classList.contains('tile')) return;

    let currentId = e.target.id.split('-');
    let r = parseInt(currentId[0]);
    let c = parseInt(currentId[1]);

    if (minesLocation.includes(`${r}-${c}`)) {
        for (let i = 0; i < minesLocation.length; i++) {
            let mineTile = document.getElementById(minesLocation[i])
            if (mainContainer.classList.contains('dark-mode')) {
                mineTile.innerHTML = '<span style="color: black;"><i class="fa-solid fa-bomb"></i></span>';
            } else {
                mineTile.innerHTML = '<i class="fa-solid fa-bomb"></i>';
            }
        }
        return;
    }
    checkTile(r,c);
})

function renderBoard() {
    board.style.setProperty('--rows', rows);
    board.style.setProperty('--columns', columns);

    board.innerHTML = '';

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

function checkTile(r,c) {
    if (gameBoard[r][c].classList.contains('clicked')) return;
    gameBoard[r][c].classList.add('clicked');

    let closeMines = 0;

    closeMines += checkMine(r-1,c-1);
    closeMines += checkMine(r-1,c);
    closeMines += checkMine(r-1,c+1);

    closeMines += checkMine(r,c-1);
    closeMines += checkMine(r,c+1);

    closeMines += checkMine(r+1,c-1);
    closeMines += checkMine(r+1,c);
    closeMines += checkMine(r+1,c+1);

    if (closeMines > 0) {
        gameBoard[r][c].textContent = closeMines;
        gameBoard[r][c].classList.add(`n${closeMines}`);
    } else {
        checkTile(r-1, c-1);   
        checkTile(r-1, c);      
        checkTile(r-1, c+1);   

        checkTile(r, c-1);     
        checkTile(r, c+1);      
        
        checkTile(r+1, c-1);
        checkTile(r+1, c);  
        checkTile(r+1, c+1); 
    }
}

function checkMine(r,c) {
    if (minesLocation.includes(`${r}-${c}`)) {
        return 1;
    } else {
        return 0;
    }
}

function reset(r,c,m) {
    rows = r;
    columns = c;
    totalMines = m;
    gameBoard = [];
    minesLocation = [];
    renderBoard()
    setMines()
}

beginner.addEventListener('click', () => {
    reset(8,8,10);
});

intermediate.addEventListener('click', () => {
    reset(16,16,40);
});

expert.addEventListener('click', () => {
    reset(21,21,99);
})

darkMode.addEventListener('click', () => {
    mainContainer.classList.toggle('dark-mode')
    // mainContainer.classList.toggle('light-mode')
    if (darkMode.innerHTML === '<i class="fa-solid fa-moon"></i>Dark') {
        darkMode.innerHTML = '<i class="fa-solid fa-sun" style="color: #ffffff;"></i><span style="color: #fff;"> Light</span>';
    } else {
        darkMode.innerHTML = '<i class="fa-solid fa-moon"></i>Dark'
    }
})

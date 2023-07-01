const mainContainer = document.getElementById('main-container');
const darkMode = document.getElementById('dark-mode')
const mineCount = document.querySelector('#minecount')
const board = document.querySelector('#board');
const difficulty = document.querySelector('#difficulty')
const beginner = document.querySelector('#beginner');
const intermediate = document.querySelector('#intermediate');
const expert = document.querySelector('#expert');

init();

// ** event listeners **
window.addEventListener('contextmenu', e => {
    e.preventDefault();
    console.log(e.target)
    let currentId = e.target.id.split('-');
    let r = parseInt(currentId[0]);
    let c = parseInt(currentId[1]);
    if (e.target.classList.contains('tile')) {
        gameBoard[r][c].innerHTML = '<span style="color: darkred;"><i class="fa-solid fa-flag"></i></span>'
    }
})

board.addEventListener('click', e => {
    if (!e.target.classList.contains('tile')) return;

    let currentId = e.target.id.split('-');
    let r = parseInt(currentId[0]);
    let c = parseInt(currentId[1]);

    if (gameBoard[r][c].innerHTML === '<span style="color: darkred;"><i class="fa-solid fa-flag"></i></span>') return;

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

beginner.addEventListener('click', () => {
    reset(8,8,10,'Beginner');
});

intermediate.addEventListener('click', () => {
    reset(16,16,40,'Intermediate');
});

expert.addEventListener('click', () => {
    reset(21,21,99,'Expert');
})

darkMode.addEventListener('click', () => {
    let btn = document.querySelectorAll('.btn-container > button');
    btn.forEach(button => {
        button.classList.toggle('dark-mode');
    })
    mainContainer.classList.toggle('dark-mode')
    if (darkMode.innerHTML === '<i class="fa-solid fa-moon"></i>Dark') {
        darkMode.innerHTML = '<i class="fa-solid fa-sun" style="color: #ffffff;"></i><span style="color: #fff;"> Light</span>';
    } else {
        darkMode.innerHTML = '<i class="fa-solid fa-moon"></i>Dark'
    }
})

// ** functions **
function renderBoard() {
    board.style.setProperty('--rows', rows);
    board.style.setProperty('--columns', columns);

    board.innerHTML = '';

    for (let r = 0; r < rows; r++) {
        let row = [];
        for (let c = 0; c < columns; c++) {
            let tile = document.createElement('div');
            if (difficultyLevel === 'Beginner') {
                tile.style.fontSize = '2em';
            } else if (difficultyLevel === 'Intermediate') {
                tile.style.fontSize = '1.3em';
            }
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

function reset(r,c,m,l) {
    rows = r;
    columns = c;
    totalMines = m;
    gameBoard = [];
    minesLocation = [];
    difficultyLevel = l;
    mineCount.textContent = `Total Mines: ${totalMines}`;
    difficulty.textContent = `Difficulty: ${difficultyLevel}`;
    renderBoard()
    setMines()
}

function init() {
    reset(8,8,10,'Beginner');
}
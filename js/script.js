const mainContainer = document.getElementById('main-container');
const darkMode = document.getElementById('dark-mode')
const mineCount = document.querySelector('#minecount')
const board = document.querySelector('#board');


let rows = 16;
let columns = 16;
let mines = 0;

renderBoard()

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
        // board.push(row)
    }
}



darkMode.addEventListener('click', () => {
    mainContainer.classList.toggle('dark-mode')
    mainContainer.classList.toggle('light-mode')
    if (darkMode.innerHTML === '<i class="fa-solid fa-moon"></i>Dark') {
        darkMode.innerHTML = '<i class="fa-solid fa-sun" style="color: #ffffff;"></i>Light';
    } else {
        darkMode.innerHTML = '<i class="fa-solid fa-moon"></i>Dark'
    }
})

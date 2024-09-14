const cells = document.querySelectorAll('.cell');
const statusText = document.querySelector('#statusText');
const restartBtn = document.querySelector('#restartBtn');
const startBtn = document.querySelector('#startBtn');
const player1 = document.querySelector('#player1');
const player2 = document.querySelector('#player2');

const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer;
let running = false;
let playerMarks = {};

function initializeGame() {
    startBtn.addEventListener('click', () => {
        const player1Name = player1.value.trim();
        const player2Name = player2.value.trim();
        

        if (!player1Name || !player2Name) {
            statusText.textContent = 'Both player names are required!';
            return;
        }
        
        playerMarks[player1Name] = 'X';
        playerMarks[player2Name] = 'O';

        currentPlayer = player1Name;
        statusText.textContent = `It's ${currentPlayer}'s turn`;
        running = true;
        
    })
    
    cells.forEach((cell, index) => {
        cell.setAttribute('data-index', index); 
        cell.addEventListener('click', cellClicked);
    });

    restartBtn.addEventListener('click', restartGame);
}


initializeGame();

function cellClicked() {
    const cellIndex = this.getAttribute('data-index'); 
    if (options[cellIndex] !== "" || !running) {
        return;
    }
    updateCell(this, cellIndex);
    checkWinner();
}

function updateCell(cell, index) {
    options[index] = playerMarks[currentPlayer];
    cell.textContent = playerMarks[currentPlayer];
}

function changePlayer() {
    currentPlayer = (currentPlayer === player1.value.trim()) ? player2.value.trim() : player1.value.trim();
    statusText.textContent = `${currentPlayer}'s turn`;
}

function checkWinner() {
    let roundWon = false;

    for (let i = 0; i < winConditions.length; i++) {
        const [a, b, c] = winConditions[i];
        if (options[a] && options[a] === options[b] && options[a] === options[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusText.textContent = `${currentPlayer} wins!`;
        running = false;
    } else if (!options.includes("")) {
        statusText.textContent = `Draw!`;
        running = false;
    } else {
        changePlayer();
    }
}

function restartGame() {
    options = ["", "", "", "", "", "", "", "", ""];
    cells.forEach(cell => cell.textContent = "");
    statusText.textContent = `It's ${player1.value.trim()}'s turn`;
    currentPlayer = player1.value.trim();
    running = true;
}

// const socket = io('http://127.0.0.1:5000'); // Ensure this points to your server

// const gameBoard = document.getElementById('gameBoard');
// const gameStatus = document.getElementById('gameStatus');
// const restartButton = document.getElementById('restartButton');

// let board = ['', '', '', '', '', '', '', '', ''];
// let currentPlayer = 'X';
// let gameActive = true;

// const urlParams = new URLSearchParams(window.location.search);
// const gameId = urlParams.get('gameId');

// socket.emit('joinGame', { gameId });

// function createBoard() {
//     board.forEach((cell, index) => {
//         const cellElement = document.createElement('div');
//         cellElement.classList.add('cell');
//         cellElement.dataset.index = index;
//         cellElement.addEventListener('click', handleCellClick);
//         gameBoard.appendChild(cellElement);
//     });
// }

// function handleCellClick(event) {
//     const index = event.target.dataset.index;
//     if (board[index] !== '' || !gameActive) return;

//     board[index] = currentPlayer;
//     event.target.textContent = currentPlayer;
//     socket.emit('makeMove', { gameId, index, player: currentPlayer });
// }

// function handleMove(data) {
//     const { index, player } = data;
//     board[index] = player;
//     const cell = document.querySelector(`.cell[data-index="${index}"]`);
//     cell.textContent = player;
//     checkResult();

//     currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
//     updateStatus();
// }

// function checkResult() {
//     const winPatterns = [
//         [0, 1, 2],
//         [3, 4, 5],
//         [6, 7, 8],
//         [0, 3, 6],
//         [1, 4, 7],
//         [2, 5, 8],
//         [0, 4, 8],
//         [2, 4, 6],
//     ];

//     let roundWon = false;
//     for (let i = 0; i < winPatterns.length; i++) {
//         const [a, b, c] = winPatterns[i];
//         if (board[a] && board[a] === board[b] && board[a] === board[c]) {
//             roundWon = true;
//             break;
//         }
//     }

//     if (roundWon) {
//         gameStatus.textContent = `${currentPlayer} has won!`;
//         gameActive = false;
//         return;
//     }

//     if (!board.includes('')) {
//         gameStatus.textContent = 'Draw!';
//         gameActive = false;
//         return;
//     }
// }

// function updateStatus() {
//     gameStatus.textContent = `It's ${currentPlayer}'s turn`;
// }

// restartButton.addEventListener('click', restartGame);

// function restartGame() {
//     board = ['', '', '', '', '', '', '', '', ''];
//     currentPlayer = 'X';
//     gameActive = true;
//     gameBoard.innerHTML = '';
//     createBoard();
//     updateStatus();
//     socket.emit('restartGame', gameId);
// }

// // Initialize the game board
// createBoard();
// updateStatus();

// socket.on('moveMade', handleMove);
// socket.on('restartGame', () => {
//     restartGame();
// });





// const socket = io('http://127.0.0.1:5000');

// const gameBoard = document.getElementById('gameBoard');
// const gameStatus = document.getElementById('gameStatus');
// const restartButton = document.getElementById('restartButton');

// let board = ['', '', '', '', '', '', '', '', ''];
// let currentPlayer = 'X';
// let gameActive = true;
// let gameId = null;

// const urlParams = new URLSearchParams(window.location.search);
// gameId = urlParams.get('gameId');

// socket.emit('joinGame', { gameId });

// function createBoard() {
//     console.log("WELCOME TO BOARD");
//     board.forEach((cell, index) => {
//         const cellElement = document.createElement('div');
//         cellElement.classList.add('cell');
//         cellElement.dataset.index = index;
//         cellElement.addEventListener('click', handleCellClick);
//         gameBoard.appendChild(cellElement);
//     });
// }

// function handleCellClick(event) {
//     const index = event.target.dataset.index;
//     console.log(index,"INDEX");
//     if (board[index] !== '' || !gameActive || currentPlayer !== 'X') return;

//     board[index] = currentPlayer;
//     event.target.textContent = currentPlayer;
//     socket.emit('makeMove', { gameId, index, player: currentPlayer });
//     console.log("MAKEMOVE",currentPlayer)
//     checkResult();
// }

// function handleMove(data) {
//     console.log("HANDLEMIOVE", data);
//     const { index, player } = data;
//     board[index] = player;
//     const cell = document.querySelector(`.cell[data-index="${index}"]`);
//     if(cell){
//         console.log(player,"PLYER");
//     cell.textContent = player;
// }
//     console.log("PRE CHCEK RESULT");
//     checkResult();
//     console.log("POST CHECK RESULT");
//     currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
//     console.log(currentPlayer, "CURRENTPLAYER");
//     updateStatus();
// }

// function checkResult() {
//     const winPatterns = [
//         [0, 1, 2],
//         [3, 4, 5],
//         [6, 7, 8],
//         [0, 3, 6],
//         [1, 4, 7],
//         [2, 5, 8],
//         [0, 4, 8],
//         [2, 4, 6],
//     ];

//     let roundWon = false;
//     for (let i = 0; i < winPatterns.length; i++) {
//         const [a, b, c] = winPatterns[i];
//         if (board[a] && board[a] === board[b] && board[a] === board[c]) {
//             roundWon = true;
//             break;
//         }
//     }

//     if (roundWon) {
//         gameStatus.textContent = `${currentPlayer} has won!`;
//         gameActive = false;
//         return;
//     }

//     if (!board.includes('')) {
//         gameStatus.textContent = 'Draw!';
//         gameActive = false;
//         return;
//     }
// }

// function updateStatus() {
//     gameStatus.textContent = `It's ${currentPlayer}'s turn`;
// }

// restartButton.addEventListener('click', restartGame);

// function restartGame() {
//     board = ['', '', '', '', '', '', '', '', ''];
//     currentPlayer = 'X';
//     gameActive = true;
//     gameBoard.innerHTML = '';
//     createBoard();
//     updateStatus();
//     socket.emit('restartGame', gameId);
// }

// // Initialize the game board
// createBoard();
// updateStatus();

// socket.on('moveMade', handleMove);
// socket.on('restartGame', restartGame);





// const socket = io('http://127.0.0.1:5000');

// const gameBoard = document.getElementById('gameBoard');
// const gameStatus = document.getElementById('gameStatus');
// const restartButton = document.getElementById('restartButton');

// let board = ['', '', '', '', '', '', '', '', ''];
// let currentPlayer = 'X';
// let gameActive = true;
// let gameId = null;

// const urlParams = new URLSearchParams(window.location.search);
// gameId = urlParams.get('gameId');

// if (!gameId) {
//     console.error('No gameId found in URL');
//     // Handle error accordingly
// }

// socket.emit('joinGame', { gameId });

// function createBoard() {
//     console.log("WELCOME TO BOARD");
//     board.forEach((cell, index) => {
//         const cellElement = document.createElement('div');
//         cellElement.classList.add('cell');
//         cellElement.dataset.index = index;
//         cellElement.addEventListener('click', handleCellClick);
//         gameBoard.appendChild(cellElement);
//     });
// }

// function handleCellClick(event) {
//     const index = event.target.dataset.index;
//     console.log(index, "INDEX");
//     if (board[index] !== '' || !gameActive || currentPlayer !== 'X') return;

//     board[index] = currentPlayer;
//     event.target.textContent = currentPlayer;
//     socket.emit('makeMove', { gameId, index, player: currentPlayer });
//     console.log("MAKEMOVE", currentPlayer);
//     checkResult();
// }

// function handleMove(data) {
//     console.log("HANDLEMOVE", data);
//     const { index, player } = data;
//     board[index] = player;
//     const cell = document.querySelector(`.cell[data-index="${index}"]`);
//     if (cell) {
//         console.log(player, "PLAYER");
//         cell.textContent = player;
//     }
//     console.log("PRE CHECK RESULT");
//     checkResult();
//     console.log("POST CHECK RESULT");
//     currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
//     console.log(currentPlayer, "CURRENT PLAYER");
//     updateStatus();
// }

// function checkResult() {
//     const winPatterns = [
//         [0, 1, 2],
//         [3, 4, 5],
//         [6, 7, 8],
//         [0, 3, 6],
//         [1, 4, 7],
//         [2, 5, 8],
//         [0, 4, 8],
//         [2, 4, 6],
//     ];

//     let roundWon = false;
//     for (let i = 0; i < winPatterns.length; i++) {
//         const [a, b, c] = winPatterns[i];
//         if (board[a] && board[a] === board[b] && board[a] === board[c]) {
//             roundWon = true;
//             break;
//         }
//     }

//     if (roundWon) {
//         gameStatus.textContent = `${currentPlayer} has won!`;
//         gameActive = false;
//         return;
//     }

//     if (!board.includes('')) {
//         gameStatus.textContent = 'Draw!';
//         gameActive = false;
//         return;
//     }
// }

// function updateStatus() {
//     gameStatus.textContent = `It's ${currentPlayer}'s turn`;
// }

// restartButton.addEventListener('click', restartGame);

// function restartGame() {
//     board = ['', '', '', '', '', '', '', '', ''];
//     currentPlayer = 'X';
//     gameActive = true;
//     gameBoard.innerHTML = '';
//     createBoard();
//     updateStatus();
//     socket.emit('restartGame', gameId);
// }

// // Initialize the game board
// createBoard();
// updateStatus();

// socket.on('moveMade', handleMove);
// socket.on('restartGame', restartGame);




// const socket = io('http://127.0.0.1:5000');

// const gameBoard = document.getElementById('gameBoard');
// const gameStatus = document.getElementById('gameStatus');
// const restartButton = document.getElementById('restartButton');

// let board = ['', '', '', '', '', '', '', '', ''];
// let currentPlayer = 'X';
// let gameActive = true;
// let gameId = null;

// const urlParams = new URLSearchParams(window.location.search);
// gameId = urlParams.get('gameId');

// if (!gameId) {
//     console.error('No gameId found in URL');
//     // Handle error accordingly
// }

// socket.emit('joinGame', { gameId });

// function createBoard() {
//     console.log("WELCOME TO BOARD");
//     board.forEach((cell, index) => {
//         const cellElement = document.createElement('div');
//         cellElement.classList.add('cell');
//         cellElement.dataset.index = index;
//         cellElement.addEventListener('click', handleCellClick);
//         gameBoard.appendChild(cellElement);
//     });
// }

// function handleCellClick(event) {
//     const index = event.target.dataset.index;
//     console.log(index, "cell cliked INDEX");
//     if (board[index] !== '' || !gameActive || currentPlayer !== 'X') return;

//     board[index] = currentPlayer;
//     event.target.textContent = currentPlayer;
//     console.log("Emitting makeMove:", { gameId, index, player: currentPlayer });
//     socket.emit('makeMove', { gameId, index, player: currentPlayer });
//     console.log("MAKEMOVE", currentPlayer);
//     checkResult();
// }

// function handleMove(data) {
//     console.log("HANDLEMOVE", data);
//     const { index, player } = data;
//     board[index] = player;
//     const cell = document.querySelector(`.cell[data-index="${index}"]`);
//     if (cell) {
//         console.log(player, "PLAYER");
//         cell.textContent = player;
//     }
//     console.log("PRE CHECK RESULT");
//     checkResult();
//     console.log("POST CHECK RESULT");
//     currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
//     console.log(currentPlayer, "CURRENT PLAYER");
//     updateStatus();
// }

// function checkResult() {
//     const winPatterns = [
//         [0, 1, 2],
//         [3, 4, 5],
//         [6, 7, 8],
//         [0, 3, 6],
//         [1, 4, 7],
//         [2, 5, 8],
//         [0, 4, 8],
//         [2, 4, 6],
//     ];

//     let roundWon = false;
//     for (let i = 0; i < winPatterns.length; i++) {
//         const [a, b, c] = winPatterns[i];
//         if (board[a] && board[a] === board[b] && board[a] === board[c]) {
//             roundWon = true;
//             break;
//         }
//     }

//     if (roundWon) {
//         gameStatus.textContent = `${currentPlayer} has won!`;
//         gameActive = false;
//         return;
//     }

//     if (!board.includes('')) {
//         gameStatus.textContent = 'Draw!';
//         gameActive = false;
//         return;
//     }
// }

// function updateStatus() {
//     gameStatus.textContent = `It's ${currentPlayer}'s turn`;
// }

// restartButton.addEventListener('click', restartGame);

// function restartGame() {
//     board = ['', '', '', '', '', '', '', '', ''];
//     currentPlayer = 'X';
//     gameActive = true;
//     gameBoard.innerHTML = '';
//     createBoard();
//     updateStatus();
//     socket.emit('restartGame', gameId);
//     console.log("POST RESTART CLIENT", gameId);
// }

// // Initialize the game board
// createBoard();
// updateStatus();

// socket.on('moveMade', handleMove);
// socket.on('restartGame', restartGame);





// const urlParams = new URLSearchParams(window.location.search);
// const gameId = urlParams.get('gameId');
// const socketId = urlParams.get('socketId');

// if (!gameId || !socketId) {
//     console.error('No gameId or socketId found in URL');
//     // Handle error accordingly
// }

// // Create a new socket connection using the socketId from the query parameter
// const socket = io('http://127.0.0.1:5000', {
//     query: { socketId }
// });

// socket.emit('joinGame', { gameId });

// let board = ['', '', '', '', '', '', '', '', ''];
// let currentPlayer = 'X';
// let gameActive = true;

// const gameBoard = document.getElementById('gameBoard');
// const gameStatus = document.getElementById('gameStatus');
// const restartButton = document.getElementById('restartButton');

// function createBoard() {
//     console.log("WELCOME TO BOARD");
//     board.forEach((cell, index) => {
//         const cellElement = document.createElement('div');
//         cellElement.classList.add('cell');
//         cellElement.dataset.index = index;
//         cellElement.addEventListener('click', handleCellClick);
//         gameBoard.appendChild(cellElement);
//     });
// }

// function handleCellClick(event) {
//     const index = event.target.dataset.index;
//     console.log(index, "cell clicked INDEX");
//     if (board[index] !== '' || !gameActive || currentPlayer !== 'X') return;

//     board[index] = currentPlayer;
//     event.target.textContent = currentPlayer;
//     console.log("Emitting makeMove:", { gameId, index, player: currentPlayer });
//     socket.emit('makeMove', { gameId, index, player: currentPlayer });
//     console.log("MAKE MOVE", currentPlayer);
//     checkResult();
// }

// function handleMove(data) {
//     console.log("HANDLE MOVE", data);
//     const { index, player } = data;
//     board[index] = player;
//     const cell = document.querySelector(`.cell[data-index="${index}"]`);
//     if (cell) {
//         console.log(player, "PLAYER");
//         cell.textContent = player;
//     }
//     console.log("PRE CHECK RESULT");
//     checkResult();
//     console.log("POST CHECK RESULT");
//     currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
//     console.log(currentPlayer, "CURRENT PLAYER");
//     updateStatus();
// }

// function checkResult() {
//     const winPatterns = [
//         [0, 1, 2],
//         [3, 4, 5],
//         [6, 7, 8],
//         [0, 3, 6],
//         [1, 4, 7],
//         [2, 5, 8],
//         [0, 4, 8],
//         [2, 4, 6],
//     ];

//     let roundWon = false;
//     for (let i = 0; i < winPatterns.length; i++) {
//         const [a, b, c] = winPatterns[i];
//         if (board[a] && board[a] === board[b] && board[a] === board[c]) {
//             roundWon = true;
//             break;
//         }
//     }

//     if (roundWon) {
//         gameStatus.textContent = `${currentPlayer} has won!`;
//         gameActive = false;
//         return;
//     }

//     if (!board.includes('')) {
//         gameStatus.textContent = 'Draw!';
//         gameActive = false;
//         return;
//     }
// }

// function updateStatus() {
//     gameStatus.textContent = `It's ${currentPlayer}'s turn`;
// }

// restartButton.addEventListener('click', restartGame);

// function restartGame() {
//     board = ['', '', '', '', '', '', '', '', ''];
//     currentPlayer = 'X';
//     gameActive = true;
//     gameBoard.innerHTML = '';
//     createBoard();
//     updateStatus();
//     socket.emit('restartGame', gameId);
//     console.log("POST RESTART CLIENT", gameId);
// }

// // Initialize the game board
// createBoard();
// updateStatus();

// socket.on('moveMade', handleMove);
// socket.on('restartGame', restartGame);




// const urlParams = new URLSearchParams(window.location.search);
// const gameId = urlParams.get('gameId');
// const userId = urlParams.get('userId');

// if (!gameId || !userId) {
//     console.error('No gameId or userId found in URL');
//     // Handle error accordingly
// }

// // Create a new socket connection
// const socket = io('http://127.0.0.1:5000');

// //socket.emit('joinGame', { gameId, userId });

// let board = ['', '', '', '', '', '', '', '', ''];
// let currentPlayer = 'X';
// let gameActive = true;

// const gameBoard = document.getElementById('gameBoard');
// const gameStatus = document.getElementById('gameStatus');
// const restartButton = document.getElementById('restartButton');

// function createBoard() {
//     console.log("WELCOME TO BOARD");
//     board.forEach((cell, index) => {
//         const cellElement = document.createElement('div');
//         cellElement.classList.add('cell');
//         cellElement.dataset.index = index;
//         cellElement.addEventListener('click', handleCellClick);
//         gameBoard.appendChild(cellElement);
//     });
// }

// function handleCellClick(event) {
//     const index = event.target.dataset.index;
//     console.log(index, "cell clicked INDEX");
//     if (board[index] !== '' || !gameActive || currentPlayer !== 'X') return;

//     board[index] = currentPlayer;
//     event.target.textContent = currentPlayer;
//     console.log("Emitting makeMove:", { gameId, index, player: currentPlayer });
//     socket.emit('makeMove', { gameId, index, player: currentPlayer });
//     console.log("MAKE MOVE", currentPlayer);
//     checkResult();
// }

// function handleMove(data) {
//     console.log("HANDLE MOVE", data);
//     const { index, player } = data;
//     board[index] = player;
//     const cell = document.querySelector(`.cell[data-index="${index}"]`);
//     if (cell) {
//         console.log(player, "PLAYER");
//         cell.textContent = player;
//     }
//     console.log("PRE CHECK RESULT");
//     checkResult();
//     console.log("POST CHECK RESULT");
//     currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
//     console.log(currentPlayer, "CURRENT PLAYER");
//     updateStatus();
// }

// function checkResult() {
//     const winPatterns = [
//         [0, 1, 2],
//         [3, 4, 5],
//         [6, 7, 8],
//         [0, 3, 6],
//         [1, 4, 7],
//         [2, 5, 8],
//         [0, 4, 8],
//         [2, 4, 6],
//     ];

//     let roundWon = false;
//     for (let i = 0; i < winPatterns.length; i++) {
//         const [a, b, c] = winPatterns[i];
//         if (board[a] && board[a] === board[b] && board[a] === board[c]) {
//             roundWon = true;
//             break;
//         }
//     }

//     if (roundWon) {
//         gameStatus.textContent = `${currentPlayer} has won!`;
//         gameActive = false;
//         return;
//     }

//     if (!board.includes('')) {
//         gameStatus.textContent = 'Draw!';
//         gameActive = false;
//         return;
//     }
// }

// function updateStatus() {
//     gameStatus.textContent = `It's ${currentPlayer}'s turn`;
// }

// restartButton.addEventListener('click', restartGame);

// function restartGame() {
//     board = ['', '', '', '', '', '', '', '', ''];
//     currentPlayer = 'X';
//     gameActive = true;
//     gameBoard.innerHTML = '';
//     createBoard();
//     updateStatus();
//     socket.emit('restartGame', gameId);
//     console.log("POST RESTART CLIENT", gameId);
// }

// // Initialize the game board
// createBoard();
// updateStatus();

// socket.on('moveMade', handleMove);
// socket.on('restartGame', restartGame);




const urlParams = new URLSearchParams(window.location.search);
const gameId = urlParams.get('gameId');
const userId = urlParams.get('userId');

if (!gameId || !userId) {
    console.error('No gameId or userId found in URL');
    // Handle error accordingly
}

// Create a new socket connection
const socket = io('http://127.0.0.1:5000');

let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameActive = true;

const gameBoard = document.getElementById('gameBoard');
const gameStatus = document.getElementById('gameStatus');
const restartButton = document.getElementById('restartButton');

function createBoard() {
    console.log("WELCOME TO BOARD");
    board.forEach((cell, index) => {
        const cellElement = document.createElement('div');
        cellElement.classList.add('cell');
        cellElement.dataset.index = index;
        cellElement.addEventListener('click', handleCellClick);
        gameBoard.appendChild(cellElement);
    });
}

function handleCellClick(event) {
    const index = event.target.dataset.index;
    console.log(index, "cell clicked INDEX");
    if (board[index] !== '' || !gameActive || currentPlayer !== 'X') return;

    board[index] = currentPlayer;
    event.target.textContent = currentPlayer;
    console.log("Emitting makeMove:", { gameId, index, player: currentPlayer });
    socket.emit('makeMove', { gameId, index, player: currentPlayer });
    console.log("MAKE MOVE", currentPlayer);
    checkResult();
}

function handleMove(data) {
    console.log("HANDLE MOVE", data);
    const { index, player } = data;
    board[index] = player;
    const cell = document.querySelector(`.cell[data-index="${index}"]`);
    if (cell) {
        console.log(player, "PLAYER");
        cell.textContent = player;
    }
    console.log("PRE CHECK RESULT");
    checkResult();
    console.log("POST CHECK RESULT");
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    console.log(currentPlayer, "CURRENT PLAYER");
    updateStatus();
}

function checkResult() {
    const winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    let roundWon = false;
    for (let i = 0; i < winPatterns.length; i++) {
        const [a, b, c] = winPatterns[i];
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        gameStatus.textContent = `${currentPlayer} has won!`;
        gameActive = false;
        return;
    }

    if (!board.includes('')) {
        gameStatus.textContent = 'Draw!';
        gameActive = false;
        return;
    }
}

function updateStatus() {
    gameStatus.textContent = `It's ${currentPlayer}'s turn`;
}

restartButton.addEventListener('click', restartGame);

function restartGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameActive = true;
    gameBoard.innerHTML = '';
    createBoard();
    updateStatus();
    socket.emit('restartGame', gameId);
    console.log("POST RESTART CLIENT", gameId);
}

// Initialize the game board
createBoard();
updateStatus();

socket.on('moveMade', handleMove);
socket.on('restartGame', restartGame);

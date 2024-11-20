
// document.addEventListener('DOMContentLoaded', () => {
//     console.log("DOMCONTENTLOADED");
//     const socket = io('http://127.0.0.1:5000'); // Server URL

//     // Get elements
//     const waitingRoom = document.getElementById('waitingRoom');
//     const gameBoardSection = document.getElementById('gameBoardSection');
//     const waitingMessage = document.getElementById('waitingMessage');
//     const opponentFound = document.getElementById('opponentFound');
//     const startGameButton = document.getElementById('startGameButton');
//     const gameBoard = document.getElementById('gameBoard');
//     const gameStatus = document.getElementById('gameStatus');
//     const restartButton = document.getElementById('restartButton');

//     let board = ['', '', '', '', '', '', '', '', ''];
//     let currentPlayer = 'X';
//     let gameActive = true;

//     // Join the waiting room when the page loads
//     const user = JSON.parse(localStorage.getItem('user'));
//     if (!user) {
//         console.error('User data not found');
//         return;
//     }
//     socket.emit('joinWaitingRoom', JSON.stringify(user));

//     // Handle waiting room status
//     socket.on('waitingRoomStatus', (status) => {
//         console.log(status);
//         waitingMessage.innerText = status;
//     });

//     // Handle opponent found event
//     socket.on('opponentFound', (gameData) => {
//         console.log("Opponent found", gameData);
//         waitingMessage.style.display = 'none';
//         opponentFound.style.display = 'block';
//         startGameButton.style.display = 'block';

//         // Store gameId and userId in localStorage or proceed directly
//         localStorage.setItem('gameId', gameData.gameId);
//     });

//     // Handle Start Game button click
//     startGameButton.addEventListener('click', () => {
//         console.log("Start game button clicked");
//         socket.emit('startGame');
//     });

//     // Start game when the server emits the 'startGame' event
//     socket.on('startGame', (gameData) => {
//         console.log('Game starting', gameData);

//         // Hide Waiting Room and show Game Board
//         waitingRoom.style.display = 'none';
//         gameBoardSection.style.display = 'block';

//         // Initialize the game board
//         createBoard();
//         updateStatus();
//     });

//     function createBoard() {
//         gameBoard.innerHTML = '';
//         board.forEach((cell, index) => {
//             const cellElement = document.createElement('div');
//             cellElement.classList.add('cell');
//             cellElement.dataset.index = index;
//             cellElement.addEventListener('click', handleCellClick);
//             gameBoard.appendChild(cellElement);
//         });
//     }

//     function handleCellClick(event) {
//         const index = event.target.dataset.index;
//         console.log(index, "cell clicked INDEX");

//         const gameId = localStorage.getItem('gameId');
//         if (!gameId) {
//             console.error('Game ID not found');
//             return;
//         }
        
//         if (board[index] !== '' || !gameActive || currentPlayer !== 'X') return;

//         board[index] = currentPlayer;
//         event.target.textContent = currentPlayer;
//         console.log("Emitting makeMove:", { gameId, index, player: currentPlayer });
//         socket.emit('makeMove', { gameId, index, player: currentPlayer });
//         checkResult();
//     }

//     function handleMove(data) {
//         console.log("HANDLE MOVE", data);
//         const { index, player } = data;
//         board[index] = player;
//         const cell = document.querySelector(`.cell[data-index="${index}"]`);
//         if (cell) {
//             cell.textContent = player;
//         }
//         checkResult();
//         currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
//         updateStatus();
//     }

//     function updateStatus() {
//         gameStatus.textContent = `Current Player: ${currentPlayer}`;
//     }

//     function checkResult() {
//         const winner = checkWinner(board);
//         if (winner) {
//             gameStatus.textContent = `Winner: ${winner}`;
//             gameActive = false;
//         } else if (isBoardFull(board)) {
//             gameStatus.textContent = 'Draw!';
//             gameActive = false;
//         }
//     }

//     function restartGame() {
//         board = ['', '', '', '', '', '', '', '', ''];
//         gameActive = true;
//         currentPlayer = 'X';
//         createBoard();
//         updateStatus();
//         socket.emit('restartGame');
//     }

//     restartButton.addEventListener('click', restartGame);

//     // Listen for moveMade event
//     socket.on('moveMade', handleMove);

//     // Listen for gameOver event
//     socket.on('gameOver', (data) => {
//         gameStatus.textContent = `Game Over! Winner: ${data.winner}`;
//         gameActive = false;
//     });

//     // Listen for restartGame event
//     socket.on('restartGame', () => {
//         restartGame();
//     });

//     function checkWinner(board) {
//         const winningCombinations = [
//             [0, 1, 2],
//             [3, 4, 5],
//             [6, 7, 8],
//             [0, 3, 6],
//             [1, 4, 7],
//             [2, 5, 8],
//             [0, 4, 8],
//             [2, 4, 6]
//         ];

//         for (const combination of winningCombinations) {
//             const [a, b, c] = combination;
//             if (board[a] && board[a] === board[b] && board[a] === board[c]) {
//                 return board[a];
//             }
//         }

//         return null;
//     }

//     function isBoardFull(board) {
//         return board.every(cell => cell);
//     }
// });




// document.addEventListener('DOMContentLoaded', () => {
//     console.log("DOMCONTENTLOADED");
//     const socket = io('http://127.0.0.1:5000'); // Server URL

//     // Get elements
//     const waitingRoom = document.getElementById('waitingRoom');
//     const gameBoardSection = document.getElementById('gameBoardSection');
//     const waitingMessage = document.getElementById('waitingMessage');
//     const opponentFound = document.getElementById('opponentFound');
//     const startGameButton = document.getElementById('startGameButton');
//     const gameBoard = document.getElementById('gameBoard');
//     const gameStatus = document.getElementById('gameStatus');
//     const restartButton = document.getElementById('restartButton');

//     let board = [['', '', ''], ['', '', ''], ['', '', '']]; // 2D array
//     let currentPlayer = 'X';
//     let gameActive = true;

//     // Join the waiting room when the page loads
//     const user = JSON.parse(localStorage.getItem('user'));
//     if (!user) {
//         console.error('User data not found');
//         return;
//     }
//     socket.emit('joinWaitingRoom', JSON.stringify(user));

//     // Handle waiting room status
//     socket.on('waitingRoomStatus', (status) => {
//         console.log(status);
//         waitingMessage.innerText = status;
//     });

//     // Handle opponent found event
//     socket.on('opponentFound', (gameData) => {
//         console.log("Opponent found", gameData);
//         waitingMessage.style.display = 'none';
//         opponentFound.style.display = 'block';
//         startGameButton.style.display = 'block';

//         // Store gameId and userId in localStorage or proceed directly
//         localStorage.setItem('gameId', gameData.gameId);
//     });

//     // Handle Start Game button click
//     startGameButton.addEventListener('click', () => {
//         console.log("Start game button clicked");
//         socket.emit('startGame');
//     });

//     // Start game when the server emits the 'startGame' event
//     socket.on('startGame', (gameData) => {
//         console.log('Game starting', gameData);

//         // Hide Waiting Room and show Game Board
//         waitingRoom.style.display = 'none';
//         gameBoardSection.style.display = 'block';

//         // Initialize the game board
//         createBoard();
//         updateStatus();
//     });


//     // Handle New Game Started event
//     socket.on('newGameStarted', (gameData) => {
//         console.log('New game started', gameData);

//         // Update the game ID and reset the game state
//         localStorage.setItem('gameId', gameData.gameId);
//         board = [['', '', ''], ['', '', ''], ['', '', '']]; // Reset to empty 2D array
//         currentPlayer = 'X';
//         gameActive = true;

//         // Hide Waiting Room and show Game Board
//         waitingRoom.style.display = 'none';
//         gameBoardSection.style.display = 'block';

//         // Initialize the game board
//         createBoard();
//         updateStatus();
//     });

//     function createBoard() {
//         gameBoard.innerHTML = '';
//         board.forEach((row, rowIndex) => {
//             row.forEach((cell, colIndex) => {
//                 const cellElement = document.createElement('div');
//                 cellElement.classList.add('cell');
//                 cellElement.dataset.row = rowIndex;
//                 cellElement.dataset.col = colIndex;
//                 cellElement.addEventListener('click', handleCellClick);
//                 gameBoard.appendChild(cellElement);
//             });
//         });
//     }

//     function handleCellClick(event) {
//         const row = parseInt(event.target.dataset.row,10);
//         const col = parseInt(event.target.dataset.col,10);
//         console.log(`Cell clicked: row ${row}, col ${col}`);

//         const gameId = localStorage.getItem('gameId');
//         if (!gameId) {
//             console.error('Game ID not found');
//             return;
//         }
        
//         if (board[row][col] !== '' || !gameActive) return;

        
//         console.log("BOARD", board);
//         board[row][col] = currentPlayer;
//         event.target.textContent = currentPlayer;
//         console.log("Emitting makeMove:", { gameId, row, col, player: currentPlayer });
//         socket.emit('makeMove', { gameId, row, col, player: currentPlayer });
//         checkResult();
//         console.log("POST RESULTCHECK")
//     }

//     function handleMove(data) {
//         console.log("HANDLE MOVE", data);
//         const { row, col, player } = data;
//         board[row][col] = player;
//         const cell = document.querySelector(`.cell[data-row="${row}"][data-col="${col}"]`);
//         if (cell) {
//             cell.textContent = player;
//         }
//         checkResult();
//         currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
//         updateStatus();
//     }

//     function updateStatus() {
//         gameStatus.textContent = `Current Player: ${currentPlayer}`;
//     }

//     function checkResult() {
//         const winner = checkWinner(board);
//         console.log("W?INNER", winner);
//         if (winner) {
//             gameStatus.textContent = `Winner: ${winner}`;
//             gameActive = false;
//         } else if (isBoardFull(board)) {
//             gameStatus.textContent = 'Draw!';
//             gameActive = false;
//         }
//     }

//     function restartGame() {
//         board = [['', '', ''], ['', '', ''], ['', '', '']]; // Reset to empty 2D array
//         gameActive = true;
//         currentPlayer = 'X';
//         createBoard();
//         updateStatus();
//         socket.emit('restartGame');
//     }

//     restartButton.addEventListener('click', restartGame);

//     // Listen for moveMade event
//     socket.on('moveMade', handleMove);

//     // Listen for gameOver event
//     socket.on('gameOver', (data) => {
//         gameStatus.textContent = `Game Over! Winner: ${data.winner}`;
//         gameActive = false;
//     });


//     socket.on('notYourTurn', (message, row, col) => {
        
//         console.log(message,row,col);
//         alert(message);
//         board[row][col] = '';  // Revert the board state
//        // event.target.textContent = '';  // Revert the cell content
//        const cell = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
//        if (cell) {
//            cell.textContent = '';  // Revert the cell content
//        } else {
//            console.error('Cell not found in DOM');
//        }
//     })

//     // Listen for restartGame event
//     socket.on('restartGame', () => {
//         console.log("EVENT RESTART");
//         restartGame();
//     });

//     function checkWinner(board) {
//         const winningCombinations = [
//             // Rows
//             [[0, 0], [0, 1], [0, 2]],
//             [[1, 0], [1, 1], [1, 2]],
//             [[2, 0], [2, 1], [2, 2]],
//             // Columns
//             [[0, 0], [1, 0], [2, 0]],
//             [[0, 1], [1, 1], [2, 1]],
//             [[0, 2], [1, 2], [2, 2]],
//             // Diagonals
//             [[0, 0], [1, 1], [2, 2]],
//             [[0, 2], [1, 1], [2, 0]]
//         ];

//         for (const combination of winningCombinations) {
//             const [a, b, c] = combination;
//             if (board[a[0]][a[1]] && board[a[0]][a[1]] === board[b[0]][b[1]] && board[a[0]][a[1]] === board[c[0]][c[1]]) {
//                 return board[a[0]][a[1]];
//             }
//         }

//         return null;
//     }

//     function isBoardFull(board) {
//         return board.flat().every(cell => cell !== ''); // Flatten 2D array and check if all cells are filled
//     }
// });





document.addEventListener('DOMContentLoaded', () => {
    console.log("DOMCONTENTLOADED");
    const socket = io('http://127.0.0.1:5000'); // Server URL

    // Get elements
    const waitingRoom = document.getElementById('waitingRoom');
    const gameBoardSection = document.getElementById('gameBoardSection');
    const waitingMessage = document.getElementById('waitingMessage');
    const opponentFound = document.getElementById('opponentFound');
    const startGameButton = document.getElementById('startGameButton');
    const gameBoard = document.getElementById('gameBoard');
    const gameStatus = document.getElementById('gameStatus');
    const restartButton = document.getElementById('restartButton');
    const gameInfo = document.querySelector('.gameInfo');
    const leaderboardButton = document.getElementById('view-leaderboard');

    let board = [['', '', ''], ['', '', ''], ['', '', '']]; // 2D array
    let currentPlayer = 'X';
    let gameActive = true;

    // Join the waiting room when the page loads
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
        console.error('User data not found');
        return;
    }
    socket.emit('joinWaitingRoom', JSON.stringify(user));

    // Handle waiting room status
    socket.on('waitingRoomStatus', (status) => {
        console.log(status);
        waitingMessage.innerText = status;
    });

    // Handle opponent found event
    socket.on('opponentFound', (gameData) => {
        console.log("Opponent found", gameData);
        const playerRole = gameData.player;
        gameInfo.innerText = `You are player: ${playerRole}`;
        gameInfo.style.display = 'none'
        waitingMessage.style.display = 'none';
        opponentFound.style.display = 'block';
        startGameButton.style.display = 'block';
        gameInfo.classList.remove('playerX', 'playerO');
    
    // Add the class based on the player's role
    gameInfo.classList.add(playerRole === 'X' ? 'playerX' : 'playerO');

        // Store gameId and userId in localStorage or proceed directly
        localStorage.setItem('gameId', gameData.gameId);
    });

    // Handle Start Game button click
    startGameButton.addEventListener('click', () => {
        console.log("Start game button clicked");
        
        socket.emit('startGame');
        startGameButton.style.display = 'none';
        opponentFound.style.display = 'none';
        gameBoardSection.style.display = 'block';
        gameInfo.style.display = 'block';
    });

    // Start game when the server emits the 'startGame' event
    socket.on('startGame', (gameData) => {
        console.log('Game starting', gameData);

        // Hide Waiting Room and show Game Board
        waitingRoom.style.display = 'none';
        gameBoardSection.style.display = 'block';
        gameInfo.style.display = 'block';

        // Initialize the game board
        createBoard();
        updateStatus();
    });

    // Handle New Game Started event
    socket.on('newGameStarted', (gameData) => {
        console.log('New game started', gameData);

        // Update the game ID and reset the game state
        localStorage.setItem('gameId', gameData.gameId);
        board = [['', '', ''], ['', '', ''], ['', '', '']]; // Reset to empty 2D array
        currentPlayer = 'X';
        gameActive = true;

        // Hide Waiting Room and show Game Board
        waitingRoom.style.display = 'none';
        gameBoardSection.style.display = 'block';
        leaderboardButton.style.display = 'none';

        // Initialize the game board
        createBoard();
        updateStatus();
    });

    function createBoard() {
        gameBoard.innerHTML = '';
        board.forEach((row, rowIndex) => {
            row.forEach((cell, colIndex) => {
                const cellElement = document.createElement('div');
                cellElement.classList.add('cell');
                cellElement.dataset.row = rowIndex;
                cellElement.dataset.col = colIndex;
                cellElement.addEventListener('click', handleCellClick);
                gameBoard.appendChild(cellElement);
            });
        });
    }

    function handleCellClick(event) {
        const row = parseInt(event.target.dataset.row, 10);
        const col = parseInt(event.target.dataset.col, 10);
        console.log(`Cell clicked: row ${row}, col ${col}`);

        const gameId = localStorage.getItem('gameId');
        if (!gameId) {
            console.error('Game ID not found');
            return;
        }
        
        if (board[row][col] !== '' || !gameActive) return;

        console.log("BOARD", board);
        board[row][col] = currentPlayer;
        event.target.textContent = currentPlayer;
        console.log("Emitting makeMove:", { gameId, row, col, player: currentPlayer });
        socket.emit('makeMove', { gameId, row, col, player: currentPlayer });
        checkResult();
    }

    function handleMove(data) {
        console.log("HANDLE MOVE", data);
        const { row, col, player } = data;
        board[row][col] = player;
        const cell = document.querySelector(`.cell[data-row="${row}"][data-col="${col}"]`);
        if (cell) {
            cell.textContent = player;
        }
        checkResult();
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        updateStatus();
    }

    function updateStatus() {
        gameStatus.textContent = `Current Player: ${currentPlayer}`;
    }

    function checkResult() {
        const winner = checkWinner(board);
        console.log("Winner", winner);
        if (winner) {
            gameStatus.textContent = `Winner: ${winner}`;
            gameActive = false;
        } else if (isBoardFull(board)) {
            gameStatus.textContent = 'Draw!';
            gameActive = false;
        }
    }

    function restartGame() {
        board = [['', '', ''], ['', '', ''], ['', '', '']]; // Reset to empty 2D array
        gameActive = true;
        currentPlayer = 'X';
        createBoard();
        updateStatus();
        socket.emit('restartGame', { gameId: localStorage.getItem('gameId') });
        console.log("RESTART GAMe");
    }

    restartButton.addEventListener('click', restartGame);
    
    // socket.on('restartGameRequested', ()=> {
    //     if (document.visibilityState === 'visible') {
    //     const agree = confirm("do you agree for restart game?");
    //     if(agree){
    //         socket.emit('agreeRestart');
    //     }
    // }else {
    //     console.log("Tab is not active, suppressing confirm dialog.");
    // }
    // })



    socket.on('restartGameRequested', (data) => {
        console.log("DATA", data);
        const modal = document.getElementById('customConfirmModal');
        modal.style.display = 'block';
    
        const yesButton = document.getElementById('confirmYes');
        const noButton = document.getElementById('confirmNo');
    
        yesButton.onclick = () => {
            socket.emit('agreeRestart', data);
            modal.style.display = 'none';
        };
    
        noButton.onclick = () => {
            modal.style.display = 'none';
        };
    });
    

    // Listen for moveMade event
    socket.on('moveMade', handleMove);

    // Listen for gameOver event
    socket.on('gameOver', (data) => {
        if(data.winner === "Draw")
            gameStatus.textContent = `Game Over! Winner: ${data.winner}`;
        else
        gameStatus.textContent = `Game Over! Winner: ${data.winner} gets 3 points`;
        leaderboardButton.style.display = "block";
        leaderboardButton.addEventListener('click', function() {
            //window.location.href = 'http://127.0.0.1:5000/leaderboard/index.html';
            window.open('http://127.0.0.1:5000/leaderboard/index.html', '_blank');
        });
        gameActive = false;
    });

    socket.on('notYourTurn', (message, row, col) => {
        console.log(message, row, col);
        alert(message);
        board[row][col] = '';  // Revert the board state
        const cell = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
        if (cell) {
            cell.textContent = '';  // Revert the cell content
        } else {
            console.error('Cell not found in DOM');
        }
    });

    // Listen for restartGame event from the server
    socket.on('restartGame', () => {
        console.log("EVENT RESTART");
        restartGame();
    });

    socket.on('gameReset', (data) => {
        console.log("Game Reset Received");
        board = data.board;
        currentPlayer = data.currentPlayer;
        gameActive = true;


        createBoard();
        updateStatus();
    })

    function checkWinner(board) {
        const winningCombinations = [
            // Rows
            [[0, 0], [0, 1], [0, 2]],
            [[1, 0], [1, 1], [1, 2]],
            [[2, 0], [2, 1], [2, 2]],
            // Columns
            [[0, 0], [1, 0], [2, 0]],
            [[0, 1], [1, 1], [2, 1]],
            [[0, 2], [1, 2], [2, 2]],
            // Diagonals
            [[0, 0], [1, 1], [2, 2]],
            [[0, 2], [1, 1], [2, 0]]
        ];

        for (const combination of winningCombinations) {
            const [a, b, c] = combination;
            if (board[a[0]][a[1]] && board[a[0]][a[1]] === board[b[0]][b[1]] && board[a[0]][a[1]] === board[c[0]][c[1]]) {
                return board[a[0]][a[1]];
            }
        }

        return null;
    }

    function isBoardFull(board) {
        return board.flat().every(cell => cell !== ''); // Flatten 2D array and check if all cells are filled
    }
});

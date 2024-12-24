

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
    const logoutBtn = document.getElementById('logoutBtn');
    const timerDisplay = document.getElementById('timer');
    const alertBox = document.getElementById('alertBox');

    // Get modal elements
    const modal = document.getElementById('result-modal');
    const resultHeading = document.getElementById('result-heading');
    const resultMessage = document.getElementById('result-message');
    const closeModal = document.getElementById('close-modal');

    let board = [['', '', ''], ['', '', ''], ['', '', '']]; // 2D array
    let currentPlayer = 'X';
    let gameActive = true;

    // Join the waiting room when the page loads



    // Detect browser/tab close and notify the server
    window.addEventListener('beforeunload', () => {
        const user = JSON.parse(localStorage.getItem('user'));
        const gameId = localStorage.getItem('gameId');
        if (user && gameId) {
            // Emit an event to notify the server about the disconnection
            socket.emit('intentionalDisconnect', { userId: user._id, gameId });
        }
    });



    // Function to show modal
function showModal(result) {
    resultHeading.textContent = result.heading;
    resultMessage.textContent = result.message;
    modal.classList.add('show');
  }
  
  // Close modal on button click
  closeModal.addEventListener('click', () => {
    modal.classList.remove('show');
  });
  




    const showAlert = (message) => {
        alertBox.textContent = message;
        alertBox.style.display = 'block';
        setTimeout(() => {
            alertBox.style.display = 'none'; // Auto-hide after 5 seconds
        }, 2000);
    };



    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
        console.error('User data not found');
        window.location.href = 'http://127.0.0.1:5000/login/index.html';
        return;
    }
    socket.emit('joinWaitingRoom', JSON.stringify(user));


    socket.on('gameAborted', (data) => {
        console.log(data.message); // Debugging output
        showAlert(data.message);

        // Optionally, update the game status and UI
        gameStatus.innerText = data.message;
        gameStatus.style.color = 'red';
        gameBoardSection.style.display = 'none'; // Hide game board
        waitingRoom.style.display = 'block'; // Show waiting room again
    });

    // Handle waiting room status
    socket.on('waitingRoomStatus', (status) => {
        console.log(status);
        showAlert(status);
        waitingMessage.innerText = status;
    });

    socket.on('timer update', ({ timer }) => {
        if (timer === 0) {
            // Hide the timer and show a clean UI
            timerDisplay.style.display = 'none';
        } else {
            // Update the timer display
            timerDisplay.textContent = `Time left: ${timer} seconds`;
        }
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
        console.log("HIOHIHIH");
        timerDisplay.style.display = 'none';

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



    //// Detect browser/tab close and call logout API
    logoutBtn.addEventListener('click', function () {
        // Call the logout API to destroy the session
        const user = JSON.parse(localStorage.getItem('user'));

        console.log(user, "USER");

        fetch('http://127.0.0.1:5000/api/auth/logout', {
            method: 'POST',
            credentials: 'include', // Ensure cookies are included in the request
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userId: user._id })
        })
            .then(response => response.json())
            .then(data => {
                console.log('Logged out:', data.message);
                window.location.href = data.redirectTo;
            })
            .catch(err => console.error('Error logging out:', err));

        // Clear any localStorage data on logout
        localStorage.clear();
    });




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

            socket.emit('restart-rejected', {
                message: 'Restart Request rejected. Refresh the browser to go back to waiting room to find another opponent or close the browser to get logged out!',
            });
        };
    });



    socket.on('opponent-rejected-restart', function (message) {
        alert(message);  // Opponent ko notify karna ki restart request reject ho gayi
    });



    // Listen for moveMade event
    socket.on('moveMade', handleMove);

    // Listen for gameOver event
    socket.on('gameOver', (data) => {
        if (data.winner === "Draw"){

            gameStatus.textContent = `Game Over! Winner: ${data.winner}`;
            result = { heading: 'Game Over!', message: `Winner is : ${data.winner}` };
        }
        else{
            gameStatus.textContent = `Game Over! Winner: ${data.winner} gets 3 points`;
            result = { heading: 'Game Over!', message: `Winner is : ${data.winner}` };
        }
        showModal(result);
        leaderboardButton.style.display = "block";
        logoutBtn.style.display = "block";
        leaderboardButton.addEventListener('click', function () {
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


const Game = require('./models/games.models'); // Adjust the path according to your project structure
const User = require('./models/users.models');
let waitingPlayers = []; // Array to store players waiting in the waiting room
let playerX;
let playerO;

module.exports = function (io) {
    io.on('connection', (socket) => {
        console.log('A user connected', socket.id);

        // Event listener for joining the waiting room
        socket.on('joinWaitingRoom', async (user) => {
            const userData = JSON.parse(user);
            console.log('User data:', userData);

            // Add the player to the waiting room
            waitingPlayers.push({ userId: userData._id, socketId: socket.id });
            console.log('Current waiting players:', waitingPlayers);

            //timer logic
            let timer = 60;
            const interval = setInterval(async () => {
                timer--;


                // If there are at least two players waiting, start the game
                if (waitingPlayers.length >= 2 && timer > 0) {
                    //console.log(interval, "INTERVAL");
                    clearInterval(interval);
                    playerX = waitingPlayers.shift();
                    playerO = waitingPlayers.shift();

                    // Create a new game document in the database
                    const game = new Game({
                        playerX: playerX.userId,
                        playerO: playerO.userId,
                        status: 'waiting',
                        board: [['', '', ''], ['', '', ''], ['', '', '']],
                        currentPlayer: 'X'
                    });
                    await game.save();

                    const roomId = game._id.toString();

                    // Join both players to the game room
                    io.sockets.sockets.get(playerX.socketId).join(roomId);
                    io.sockets.sockets.get(playerO.socketId).join(roomId);

                    console.log(`Player ${playerX.userId} and Player ${playerO.userId} joined room ${roomId}`);

                    // Notify both players that an opponent has been found
                    io.to(playerX.socketId).emit('opponentFound', { gameId: roomId, player: 'X' });
                    io.to(playerO.socketId).emit('opponentFound', { gameId: roomId, player: 'O' });

                    // Attach event listeners for both players
                    attachEventListeners(io, roomId, playerX.socketId, game);
                    attachEventListeners(io, roomId, playerO.socketId, game);
                } else if (timer <= 0) {
                    io.to(socket.id).emit('timer update', { timer: 0 });
                    clearInterval(interval);
                    const index = waitingPlayers.findIndex(p => p.socketId === socket.id);
                    if (index !== -1) {
                        waitingPlayers.splice(index, 1); // Remove the player from the waiting room
                        socket.emit('waitingRoomStatus', 'No opponent found. Try again later by refreshing.');
                    }
                    //
                }
                else {
                    //socket.emit('waitingRoomStatus', 'Waiting for another player...');
                    socket.emit('timer update', { timer });
                }

            }, 1000);


        });

        // Event listener for disconnects
        socket.on('disconnect', () => {
            console.log('A user disconnected', socket.id);


            waitingPlayers = waitingPlayers.filter(player => player.socketId !== socket.id);
            console.log('Current waiting players:', waitingPlayers);
        });


        socket.on('intentionalDisconnect', async ({ userId, gameId }) => {
            console.log(`Player with ID ${userId} disconnected from game ${gameId}`);
            const gameDetails = await Game.findOne({ _id: gameId, status: 'ongoing' });
            if (!gameDetails) {
                console.log("Game details incorrect, not found!");
            } else {
                const winnerPlayer = userId == gameDetails.playerX ? gameDetails.playerO : gameDetails.playerX;
                console.log(winnerPlayer, "WINNER IS RAJ");

                gameDetails.status = 'finished';
                gameDetails.winner = userId == gameDetails.playerX ? 'O' : 'X';
                await gameDetails.save();
                await User.findByIdAndUpdate(winnerPlayer, { $inc: { points: 3 } });

                //notifying other players 
                const remainingSocketId =
                    winnerPlayer === gameDetails.playerX ? playerX.socketId : playerO.socketId;
                io.to(remainingSocketId).emit('gameAborted', { message: 'Game aborted by opponent. You won.' });
            }


        });



    });
};

// Function to attach event listeners for each player
function attachEventListeners(io, roomId, socketId, game) {
    const playerSocket = io.sockets.sockets.get(socketId);

    console.log(`Attaching event listeners for socket: ${socketId}`);

    // Start game event listener
    playerSocket.on('startGame', async () => {
        console.log("Game started by", socketId);
        game.status = 'ongoing';
        await game.save();
        io.to(roomId).emit('startGame', { gameId: roomId });
    });

    // Make move event listener
    playerSocket.on('makeMove', async (moveData) => {
        if (game.status === 'finished' && game.winner !== null) {
            game.board = [['', '', ''], ['', '', ''], ['', '', '']];
            game.currentPlayer = 'X';
            game.status = 'ongoing';
            game.winner = null;

            await game.save();
        }

        console.log("Move made by", socketId, "Data:", moveData);
        //console.log(game.board,"GAMEBOARD");

        if ((moveData.player === 'X' && playerX.socketId !== socketId) || (moveData.player === 'O' && playerO.socketId !== socketId)) {
            playerSocket.emit('notYourTurn', 'It\'s not your turn!', moveData.row, moveData.col);
            return;
        } else {
            const row = moveData.row;
            const col = moveData.col;

            game.board[row][col] = moveData.player;  // 2D array update
            game.currentPlayer = game.currentPlayer === 'X' ? 'O' : 'X';

            await game.save();
            console.log(game.board, "GAMEBOARD");
            io.to(roomId).emit('moveMade', moveData);

            const winner = checkWinner(game.board);
            if (winner) {
                game.status = 'finished';
                game.winner = winner;
                await game.save();

                // Update winner's points
                const winnerUserId = winner === 'X' ? playerX.userId : playerO.userId;
                await User.findByIdAndUpdate(winnerUserId, { $inc: { points: 3 } });

                io.to(roomId).emit('gameOver', { winner });
            } else if (isBoardFull(game.board)) {
                game.status = 'finished';
                game.winner = 'Draw';
                await game.save();
                io.to(roomId).emit('gameOver', { winner: 'Draw' });
            }
        }
    });

    // Restart game event listener
    playerSocket.on('restartGame', async (data) => {
        console.log("Restart game requested by", socketId);
        console.log("DATA", data);
        const { gameId } = data;
        // Notify both players that the game will be restarted
        console.log("GAMEID:", gameId);
        io.to(roomId).emit('restartGameRequested', gameId);
    });



    playerSocket.on('restart-rejected', (data) => {
        io.to(roomId).emit('opponent-rejected-restart', data.message);
    })

    playerSocket.on('agreeRestart', async (data) => {
        console.log("SOCID", socketId);
        console.log("DATA", data);
        try {
            const game = await Game.findOne({ _id: data, status: 'finished' });
            if (game) {
                console.log("GAME", game);
                if (!game.restartRequests) {
                    game.restartRequests = [];
                }
                game.restartRequests.push(socketId);
                await game.save();
                console.log(game.restartRequests.length, "GAMERESTARTSLENGTH");
                if (game.restartRequests.length >= 2) {
                    game.board = [['', '', ''], ['', '', ''], ['', '', '']];
                    game.currentPlayer = 'X';
                    game.status = 'ongoing';
                    game.winner = null;
                    game.restartRequests = [];

                    await game.save();
                    console.log(game.board, "GAMEBOARD");
                    //console.log(roomId,"ROOMID", gameId, "GAMEID");
                    io.to(roomId).emit('gameReset', { board: game.board, currentPlayer: game.currentPlayer });

                    // else{
                    //      await game.save();
                    // }
                }
            }
        } catch (error) {
            console.error("Error in Restart:", error);
        }
    })
    // Create a new game document
    // const newGame = new Game({
    //     playerX: playerX.userId,
    //     playerO: playerO.userId,
    //     status: 'ongoing',
    //     board: [['', '', ''], ['', '', ''], ['', '', '']],
    //     currentPlayer: 'X'
    // });
    // await newGame.save();
    // const newRoomId = newGame._id.toString();

    // // Notify both players about the new game
    // io.to(playerX.socketId).emit('newGameStarted', { gameId: newRoomId });
    // io.to(playerO.socketId).emit('newGameStarted', { gameId: newRoomId });

    // // Join both players to the new game room
    // io.sockets.sockets.get(playerX.socketId).join(newRoomId);
    // io.sockets.sockets.get(playerO.socketId).join(newRoomId);

    // // Attach event listeners for the new game
    // attachEventListeners(io, newRoomId, playerX.socketId, newGame);
    // attachEventListeners(io, newRoomId, playerO.socketId, newGame);
    //});
}

// Helper function to check for a winner using a 2D array
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

// Helper function to check if the board is full (for a draw) using a 2D array
function isBoardFull(board) {
    return board.flat().every(cell => cell !== ''); // Flatten 2D array and check if all cells are filled
}

// const socket = io();

// socket.emit('joinWaitingRoom');

// socket.on('gameStart', (data) => {
//     window.location.href = `/game/index.html?gameId=${data.gameId}`;
// });



// // waiting-room/script.js
// const socket = io('http://localhost:5000'); // Adjust the URL if needed

// socket.on('connect', () => {
//     console.log('Connected to the server');
//     socket.emit('joinWaitingRoom');
// });

// socket.on('waitingRoomStatus', (status) => {
//     document.getElementById('status').innerText = status;
// });

// socket.on('startGame', (gameData) => {
//     console.log('Game starting', gameData);
//     // Redirect to the game page or initialize game logic here
//     window.location.href = '../game/index.html';
// });



// Updated waiting-room/script.js
// document.addEventListener('DOMContentLoaded', () => {
//     const socket = io('http://localhost:5000');

//     const user = JSON.parse(localStorage.getItem('user'));
//     if (!user) {
//         window.location.href = '/frontend/login/index.html';
//         return;
//     }

//     socket.emit('joinWaitingRoom', user);

//     socket.on('startGame', (game) => {
//         window.location.href = `/frontend/game/index.html?gameId=${game._id}`;
//     });
// });



// document.addEventListener('DOMContentLoaded', () => {
//     const socket = io('http://127.0.0.1:5000'); // Ensure the URL is correct for your server

//     socket.emit('joinWaitingRoom', localStorage.getItem('userId')); // Send userId to server

//     socket.on('waitingRoomStatus', (status) => {
//         document.getElementById('status').innerText = status;
//     });

//     socket.on('startGame', (gameData) => {
//         console.log('Game starting', gameData);
//         // Redirect to the game page with gameId
//         window.location.href = `/game/index.html?gameId=${gameData.gameId}`;
//     });
// });



// document.addEventListener('DOMContentLoaded', () => {
//     const socket = io('http://127.0.0.1:5000'); // Ensure the URL is correct for your server

//     // Join the waiting room when the page loads
//     //const userId = localStorage.getItem('user');
//     //console.log('Userid from localstorage', userId);
//     socket.emit('joinWaitingRoom', localStorage.getItem('user')); // Send userId to server

//     // Remove or comment out this block if 'status' element doesn't exist
//     // socket.on('waitingRoomStatus', (status) => {
//     //     document.getElementById('status').innerText = status;
//     // });

//     // Start game when the server emits the 'startGame' event
//     socket.on('startGame', (gameData) => {
//         console.log('Game starting', gameData);
//         // Redirect to the game page with gameId
//         window.location.href = `/game/index.html?gameId=${gameData.gameId}`;
//     });

//     // Update the player list in the waiting room
//     socket.on('updatePlayerList', (playerNames) => {
//         const playerList = document.getElementById('playerList');
//         playerList.innerHTML = ''; // Clear existing list
//         playerNames.forEach(player => {
//             const li = document.createElement('li');
//             li.innerText = player;
//             playerList.appendChild(li);
//         });

//         // Enable start button if there are enough players
//         const startButton = document.getElementById('startButton');
//         startButton.disabled = playerNames.length < 2; // Adjust the number according to your game logic
//     });

//     // Add event listener to start the game
//     document.getElementById('startButton').addEventListener('click', () => {
//         socket.emit('startGame');
//     });
// });




// document.addEventListener('DOMContentLoaded', () => {
//     const socket = io('http://127.0.0.1:5000'); // Server URL

//     // Join the waiting room when the page loads
//     const user = JSON.parse(localStorage.getItem('user'));
//     socket.emit('joinWaitingRoom', user);

//     // Handle opponent found event
//     socket.on('opponentFound', () => {
//         console.log("SCRIPT OPP FOUNd");
//         // Hide waiting message and show opponent found message
//         document.getElementById('waitingMessage').style.display = 'none';
//         document.getElementById('opponentFound').style.display = 'block';
//     });

//     // Handle Start Game button click
//     document.getElementById('startGameButton').addEventListener('click', () => {
//         socket.emit('startGame');
//     });

//     // Start game when the server emits the 'startGame' event
//     socket.on('startGame', (gameData) => {
//         console.log('Game starting', gameData);
//         // Redirect to the game page with gameId
//         window.location.href = `/game/index.html?gameId=${gameData.gameId}`;
//     });
// });





// document.addEventListener('DOMContentLoaded', () => {
//     const socket = io('http://127.0.0.1:5000'); // Server URL

//     // Join the waiting room when the page loads
//     const user = JSON.parse(localStorage.getItem('user'));
//     socket.emit('joinWaitingRoom', JSON.stringify(user));

//     // Handle opponent found event
//     socket.on('opponentFound', () => {
//         console.log("Opponent found");
//         // Hide waiting message and show opponent found message
//         document.getElementById('waitingMessage').style.display = 'none';
//         document.getElementById('opponentFound').style.display = 'block';
//         // Show the start game button
//         document.getElementById('startGameButton').style.display = 'block';
//     });

//     // Handle Start Game button click
//     document.getElementById('startGameButton').addEventListener('click', () => {
//         console.log("Start game button clicked");
//         socket.emit('startGame');
//     });

//     // Start game when the server emits the 'startGame' event
//     socket.on('startGame', (gameData) => {
//         console.log('Game starting', gameData);
//         // Redirect to the game page with gameId
//         window.location.href = `/game/index.html?gameId=${gameData.gameId}`;
//     });
// });




// document.addEventListener('DOMContentLoaded', () => {

    

//     const socket = io('http://127.0.0.1:5000'); // Server URL

//     // Join the waiting room when the page loads
//     const user = JSON.parse(localStorage.getItem('user'));
//     socket.emit('joinWaitingRoom', JSON.stringify(user));

//     // Handle waiting room status
//     socket.on('waitingRoomStatus', (status) => {
//         console.log(status);
//         document.getElementById('waitingMessage').innerText = status;
//     });

//     // Handle opponent found event
//     socket.on('opponentFound', () => {
//         console.log("Opponent found");
//         // Hide waiting message and show opponent found message
//         document.getElementById('waitingMessage').style.display = 'none';
//         document.getElementById('opponentFound').style.display = 'block';
//         // Show the start game button
//         document.getElementById('startGameButton').style.display = 'block';
//     });

//     // Handle Start Game button click
//     document.getElementById('startGameButton').addEventListener('click', () => {
//         console.log("Start game button clicked");
//         socket.emit('startGame');
//     });

//     // Start game when the server emits the 'startGame' event
//     socket.on('startGame', (gameData) => {
//         console.log('Game starting', gameData);
//         // Redirect to the game page with gameId
//         window.location.href = `/game/index.html?gameId=${gameData.gameId}`;
//     });
// });





// document.addEventListener('DOMContentLoaded', () => {
//     const socket = io('http://127.0.0.1:5000'); // Server URL

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
//         document.getElementById('waitingMessage').innerText = status;
//     });

//     // Handle opponent found event
//     socket.on('opponentFound', () => {
//         console.log("Opponent found");
//         document.getElementById('waitingMessage').style.display = 'none';
//         document.getElementById('opponentFound').style.display = 'block';
//         document.getElementById('startGameButton').style.display = 'block';
//     });

//     // Handle Start Game button click
//     document.getElementById('startGameButton').addEventListener('click', () => {
//         console.log("Start game button clicked");
//         socket.emit('startGame');
//     });

//     // Start game when the server emits the 'startGame' event
//     socket.on('startGame', (gameData) => {
//         console.log('Game starting', gameData);
//         window.location.href = `/game/index.html?gameId=${gameData.gameId}`;
//     });
// });




// document.addEventListener('DOMContentLoaded', () => {
//     const socket = io('http://127.0.0.1:5000'); // Server URL

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
//         document.getElementById('waitingMessage').innerText = status;
//     });

//     // Handle opponent found event
//     socket.on('opponentFound', () => {
//         console.log("Opponent found");
//         document.getElementById('waitingMessage').style.display = 'none';
//         document.getElementById('opponentFound').style.display = 'block';
//         document.getElementById('startGameButton').style.display = 'block';
//         console.log("SOCKETID", socket.id)
//     });

//     // Handle Start Game button click
//     document.getElementById('startGameButton').addEventListener('click', () => {
//         console.log("Start game button clicked");
//         socket.emit('startGame');
//     });

//     // Start game when the server emits the 'startGame' event
//     socket.on('startGame', (gameData) => {
//         console.log('Game starting', gameData);

//         window.location.href = `/game/index.html?gameId=${gameData.gameId}&socketId=${socket.id}`;
//     });
// });




// document.addEventListener('DOMContentLoaded', () => {
//     const socket = io('http://127.0.0.1:5000'); // Server URL

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
//         document.getElementById('waitingMessage').innerText = status;
//     });

//     // Handle opponent found event
//     socket.on('opponentFound', () => {
//         console.log("Opponent found");
//         document.getElementById('waitingMessage').style.display = 'none';
//         document.getElementById('opponentFound').style.display = 'block';
//         document.getElementById('startGameButton').style.display = 'block';
//         console.log("SOCKETID", socket.id);
//     });

//     // Handle Start Game button click
//     document.getElementById('startGameButton').addEventListener('click', () => {
//         console.log("Start game button clicked");
//         socket.emit('startGame');
//     });

//     // Start game when the server emits the 'startGame' event
//     socket.on('startGame', (gameData) => {
//         console.log('Game starting', gameData);

//         window.location.href = `/game/index.html?gameId=${gameData.gameId}&userId=${user._id}`;
//         console.log("Game starting", gameData);
//     });
// });




document.addEventListener('DOMContentLoaded', () => {
    console.log("DOMCONTENTLOADED");
    const socket = io('http://127.0.0.1:5000'); // Server URL

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
        document.getElementById('waitingMessage').innerText = status;
    });

    // Handle opponent found event
    socket.on('opponentFound', (gameData) => {
        console.log("Opponent found", gameData);
        document.getElementById('waitingMessage').style.display = 'none';
        document.getElementById('opponentFound').style.display = 'block';
        document.getElementById('startGameButton').style.display = 'block';

        // Store gameId and userId in localStorage or proceed directly
        localStorage.setItem('gameId', gameData.gameId);
    });

    // Handle Start Game button click
    document.getElementById('startGameButton').addEventListener('click', () => {
        console.log("Start game button clicked");
        socket.emit('startGame');
    });

    // Start game when the server emits the 'startGame' event
    socket.on('startGame', (gameData) => {
        console.log('Game starting', gameData);

        window.location.href = `/game/index.html?gameId=${gameData.gameId}&userId=${user._id}`;
        console.log("Game starting", gameData);
    });
});

// // Function to fetch leaderboard data from the server
// async function fetchLeaderboard() {
//     try {
//         const response = await fetch('http://127.0.0.1:5000/api/auth/leaderboard');  // Adjust the URL as per your backend setup
//         if (!response.ok) {  // Check if response is OK
//             throw new Error('Network response was not ok');
//         }
//         const result = await response.json();

//         console.log('Fetched Leaderboard Data:', result);

//         if (result.success) {
//             const playerList = document.getElementById('player-list');
//             playerList.innerHTML = '';  // Clear previous data

//             result.data.forEach((user, index) => {
//                 const row = document.createElement('tr');
//                 row.innerHTML = `
//                     <td>${index + 1}</td>  <!-- Rank -->
//                     <td>${user.username}</td>  <!-- Username -->
//                     <td>${user.points}</td>  <!-- Points -->
//                 `;
//                 playerList.appendChild(row);
//             });
//         } else {
//             console.error('Failed to fetch leaderboard:', result.message);
//         }
//     } catch (error) {
//         console.error('Error fetching leaderboard:', error);
//     }
// }

// // Call the fetchLeaderboard function on page load
// document.addEventListener('DOMContentLoaded', fetchLeaderboard);




let currentPage = 1;
const limit = 5; // Number of users per page

// Function to fetch leaderboard data from the server
async function fetchLeaderboard(page = 1, search = '') {
    try {
        const response = await fetch(`http://127.0.0.1:5000/api/auth/leaderboard?page=${page}&limit=${limit}&search=${search}`);
        console.log(response,"RESPONSE");
        const result = await response.json();
        console.log("RESULT", result);
        if(result.success && search !== ''){
            const playerList = document.getElementById('player-list');
            playerList.innerHTML = '';  // Clear previous data

            result.data.forEach((user, index) => {
                if(user.username.toLowerCase().includes(search.toLowerCase())){

                
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${result.rank}</td>  <!-- Rank based on pagination -->
                    <td>${user.username}</td>  <!-- Username -->
                    <td>${user.points}</td>  <!-- Points -->
                `;
                playerList.appendChild(row);
                }
            });
        }
        else if (result.success) {
            const playerList = document.getElementById('player-list');
            playerList.innerHTML = '';  // Clear previous data

            result.data.forEach((user, index) => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${(page - 1) * limit + index + 1}</td>  <!-- Rank based on pagination -->
                    <td>${user.username}</td>  <!-- Username -->
                    <td>${user.points}</td>  <!-- Points -->
                `;
                playerList.appendChild(row);
            });

            // Update page info
            document.querySelector('.page-info').innerText = `Page ${page} of ${result.totalPages}`;
        } else {
            console.error('Failed to fetch leaderboard:', result.message);
        }
    } catch (error) {
        console.error('Error fetching leaderboard:', error);
    }
}

// Pagination: Previous and Next button click
document.querySelector('.prev-btn').addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        fetchLeaderboard(currentPage, document.querySelector('.search-bar').value);
    }
});

document.querySelector('.next-btn').addEventListener('click', () => {
    currentPage++;
    fetchLeaderboard(currentPage, document.querySelector('.search-bar').value);
});

//Search: Handle search input
document.querySelector('.search-bar').addEventListener('input', (e) => {
    currentPage = 1; // Reset to page 1 when searching
    fetchLeaderboard(currentPage, e.target.value); // Fetch leaderboard with search term
});

// Fetch the initial leaderboard on page load
document.addEventListener('DOMContentLoaded', () => {
    fetchLeaderboard();
});





// let currentPage = 1;
// const limit = 5; // Number of users per page

// // Function to fetch leaderboard data (with optional search term)
// async function fetchLeaderboard(page = 1, search = '') {
//     try {
//         let url = `http://127.0.0.1:5000/api/auth/leaderboard?page=${page}&limit=${limit}`;
        
//         if (search) {
//             // If search term exists, call the search API instead of leaderboard
//             url = `http://127.0.0.1:5000/api/auth/leaderboard?username=${search}`;
//         }
        
//         const response = await fetch(url);
//         const result = await response.json();

//         if (result.success) {
//             const playerList = document.getElementById('player-list');
//             playerList.innerHTML = '';  // Clear previous data

//             if (search) {
//                 // Handle search result
//                 const user = result.data; // Since search API gives single user
//                 const row = document.createElement('tr');
//                 row.innerHTML = `
//                     <td>${user.rank}</td>  <!-- Original rank -->
//                     <td>${user.username}</td>
//                     <td>${user.points}</td>
//                 `;
//                 playerList.appendChild(row);
//                 // Hide pagination in search mode
//                 document.querySelector('.pagination').style.display = 'none';
//             } else {
//                 // Handle leaderboard result
//                 result.data.forEach((user, index) => {
//                     const row = document.createElement('tr');
//                     row.innerHTML = `
//                         <td>${(page - 1) * limit + index + 1}</td>  <!-- Rank based on pagination -->
//                         <td>${user.username}</td>
//                         <td>${user.points}</td>
//                     `;
//                     playerList.appendChild(row);
//                 });

//                 // Show pagination in leaderboard mode
//                 document.querySelector('.pagination').style.display = 'block';
//                 document.querySelector('.page-info').innerText = `Page ${page} of ${result.totalPages}`;
//             }
//         } else {
//             console.error('Failed to fetch leaderboard:', result.message);
//         }
//     } catch (error) {
//         console.error('Error fetching leaderboard:', error);
//     }
// }

// // Pagination: Previous and Next button click
// document.querySelector('.prev-btn').addEventListener('click', () => {
//     if (currentPage > 1) {
//         currentPage--;
//         fetchLeaderboard(currentPage, document.querySelector('.search-bar').value);
//     }
// });

// document.querySelector('.next-btn').addEventListener('click', () => {
//     currentPage++;
//     fetchLeaderboard(currentPage, document.querySelector('.search-bar').value);
// });

// // Search: Handle search input
// document.querySelector('.search-bar').addEventListener('input', (e) => {
//     const searchTerm = e.target.value.trim();
//     currentPage = 1; // Reset to page 1 when searching
//     fetchLeaderboard(currentPage, searchTerm); // Fetch leaderboard or search result
// });

// // Fetch the initial leaderboard on page load
// document.addEventListener('DOMContentLoaded', () => {
//     fetchLeaderboard();
// });

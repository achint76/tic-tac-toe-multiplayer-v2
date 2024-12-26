
// const userModel = require('../models/users.models');
// const client = require('../index.js');

// const UserService = {
//     async getLeaderBoard() {
//         return new Promise(async (resolve, reject) => {
//             try {
//                 // Ensure the Redis client is connected
//                 console.log("PRE LCIENTOPEN")
//                 if (!client.isOpen) {
//                     console.error('Redis client is not connected. Connecting now...');
//                     await client.connect();
//                     console.log('Connected to Redis');
//                 }

//                 console.log('Attempting to retrieve leaderboard from Redis...');

//                 // Attempt to retrieve the leaderboard from Redis
//                 client.get('leaderboard', async (err, leaderboardData) => {
//                     console.log("227")
//                     if (err) {
//                         console.error('Redis Error:', err);
//                         return reject(err);
//                     }

//                     if (leaderboardData) {
//                         console.log('Leaderboard found in Redis cache:', leaderboardData);
//                         return resolve(JSON.parse(leaderboardData));
//                     } else {
//                         console.log('Leaderboard not found in Redis, fetching from MongoDB...');
//                         try {
//                             // Fetch leaderboard from MongoDB
//                             const leaderboard = await userModel.find({}, 'username points')
//                                 .sort({ points: -1 })
//                                 .limit(5);

//                             console.log('Leaderboard fetched from MongoDB:', leaderboard);

//                             // Store fetched leaderboard in Redis with expiration
//                             client.setEx('leaderboard', 60, JSON.stringify(leaderboard), (err, reply) => {
//                                 console.log("SETDATA248")
//                                 if (err) {
//                                     console.log('Error storing leaderboard in Redis: ', err);
//                                 } else {
//                                     console.log('Leaderboard stored in Redis:', reply);
//                                 }
//                             });

//                             console.log("LEaderboard data fetched from mongodb:", leaderboard);
//                             return resolve(leaderboard);
//                         } catch (error) {
//                             console.error('Error fetching leaderboard from MongoDB:', error);
//                             return reject(error);
//                         }
//                     }
//                 });
//             } catch (error) {
//                 console.error('Error during Redis operation:', error);
//                 return reject(error);
//             }
//         });
//     }
// };

// module.exports = UserService;



// const userModel = require('../models/users.models');
// const client = require('../index.js');
// const UserService = {
//     async getLeaderBoard(page = 1, limit = 5, search = '') {
//         try {
//             const skip = (page - 1) * limit; // Calculate how many records to skip for pagination
//             const query = search ? { username: { $regex: search } } : {}; // Search by username
            
//             // Fetch leaderboard data from MongoDB with pagination and search
//             const users = await userModel.find(query, 'username points')
//                 .sort({ points: -1 }) // Sort by points (highest first)
//                 .skip(skip)
//                 .limit(limit);

//             const totalUsers = await userModel.countDocuments(query); // Total users matching the query
//             const totalPages = Math.ceil(totalUsers / limit); // Calculate total pages

//             return {
//                 users,
//                 totalPages,
//                 currentPage: page,
//             };
//         } catch (error) {
//             console.error('Error in getLeaderBoard:', error);
//             throw error;
//         }
//     },


//     async register(data){
//                 try{
//                     const existingUser = await userModel.findOne({ email: data.email });
//                     if(existingUser){
//                         throw new Error('email already exists');
//                     }
//                     console.log(existingUser,"EXISTINGUSER");
//                     const user = await userModel.create(data);
//                     console.log("USER", user);
                    
//                     return user;
//                 }catch(error){
//                     throw error;
//                 }
//             },
// };


// module.exports = UserService;




const userModel = require('../models/users.models');
const client = require('../index.js');

const UserService = {
    async getLeaderBoard(page = 1, limit = 5, search = '') {
        try {
            const skip = (page - 1) * limit; // Calculate how many records to skip for pagination
            const query = search ? { username: search} : {}; // Search by username (case insensitive)
            
            // Fetch leaderboard data from MongoDB with pagination and search
            const users = await userModel.find(query, 'username points')
                .sort({ points: -1 }) // Sort by points (highest first)
                .skip(skip)
                .limit(limit);
            //console.log(users,"USERS");
            const totalUsers = await userModel.countDocuments(query); // Total users matching the query
            const totalPages = Math.ceil(totalUsers / limit); // Calculate total pages

            let rank = null;
            if (search) {
                // Fetch all users sorted by points to calculate rank of the searched user
                const allUsers = await userModel.find({}, 'username points').sort({ points: -1 });

                // Find the index of the searched user
                const userIndex = allUsers.findIndex(u => u.username.toLowerCase() === search.toLowerCase());
                console.log(userIndex,"USERINDEX");
                // If user is found, calculate rank
                if (userIndex !== -1) {
                    rank = userIndex + 1; // Rank is index + 1
                }
            }

            return {
                users,
                totalPages,
                currentPage: page,
                rank, // Return rank in case of search
            };
        } catch (error) {
            console.error('Error in getLeaderBoard:', error);
            throw error;
        }
    },

    async register(data){
        try{
            const existingUser = await userModel.findOne({ email: data.email });
            if(existingUser){
                throw new Error('email already exists');
            }
            console.log(existingUser,"EXISTINGUSER");
            const user = await userModel.create(data);
            console.log("USER", user);
            
            return user;
        }catch(error){
            throw error;
        }
    },
};

module.exports = UserService;

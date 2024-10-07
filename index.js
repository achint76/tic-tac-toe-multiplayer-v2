require('dotenv').config();
const express = require('express');
const app = express();
const http = require('http').Server(app);
const cors = require('cors');
const session = require('express-session');
const path = require('path');
const redis = require('redis');
const client = redis.createClient({ host: '127.0.0.1', port: 6379 });

// Redis server se connect hone ke baad log message
// client.on('connect', () => {
//     console.log('Connected to Redis');
// });

(async () => {
    try {
        await client.connect();
        console.log('Connected to Redis');
    } catch (err) {
        console.error('Redis connection error:', err);
    }
})();

// Agar error aaye to usko handle karna
client.on('error', (err) => {
    console.log('Redis error: ', err);
});

module.exports = client;


const connectDB = require('./config/db.config');
const authRoutes = require('./routes/users.routes');

const io = require('socket.io')(http);
require('./socketServer')(io);
connectDB();

//app.use(cors());

app.use(cors({
    //origin: 'http://127.0.0.1:5500', // Allow the frontend server
    origin: 'http://127.0.0.1:5000',
    credentials: true
}));

app.use(express.json());

//setting up session middleware with expiry time
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        maxAge: 3600000  //1hr in milliseconds
    }
}))

app.use('/api/auth', authRoutes);

app.use(express.static(path.join(__dirname, '..', 'frontend')));

// Redis server se connect hone ke baad log message
client.on('connect', () => {
    console.log('Connected to Redis');
});

// Agar error aaye to usko handle karna
client.on('error', (err) => {
    console.log('Redis error: ', err);
});


const PORT = process.env.PORT || 5000;
http.listen(PORT, ()=> {
    console.log(`Server is running on port ${PORT}`);
})
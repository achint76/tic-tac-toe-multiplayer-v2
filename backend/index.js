require('dotenv').config();
const express = require('express');
const app = express();
const http = require('http').Server(app);
const cors = require('cors');
const session = require('express-session');
const path = require('path');
const RedisStore = require('connect-redis').default;
const redis = require('redis');
const redisClient = redis.createClient({ host: '127.0.0.1', port: 6379 });

// Redis server se connect hone ke baad log message
// client.on('connect', () => {
//     console.log('Connected to Redis');
// });

(async () => {
    try {
        await redisClient.connect();
        console.log('Connected to Redis');
    } catch (err) {
        console.error('Redis connection error:', err);
    }
})();

// Agar error aaye to usko handle karna
redisClient.on('error', (err) => {
    console.log('Redis error: ', err);
});

module.exports = redisClient;

app.use(express.json());

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



//setting up session middleware with expiry time
app.use(session({
    store: new RedisStore({ client: redisClient }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
        maxAge: 3600000  //1hr in milliseconds
    }
}))



app.get('/', (req, res) => {
    if (req.session.views) {
        req.session.views++;
        res.send(`You have visited this page ${req.session.views} times`);
    } else {
        req.session.views = 1;
        res.send('Welcome to the session demo. Refresh!');
    }
});



app.use('/api/auth', authRoutes);

app.use(express.static(path.join(__dirname, '..', 'frontend')));

// Redis server se connect hone ke baad log message
redisClient.on('connect', () => {
    console.log('Connected to Redis');
});

// Agar error aaye to usko handle karna
redisClient.on('error', (err) => {
    console.log('Redis error: ', err);
});


const PORT = process.env.PORT || 5000;
http.listen(PORT, ()=> {
    console.log(`Server is running on port ${PORT}`);
})



//C:\Program Files\Redis

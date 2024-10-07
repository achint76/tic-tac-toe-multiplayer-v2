const express = require('express');
const router = express.Router();
const userController = require('../controllers/users.controllers');
const userMiddleware = require('../middleware/user.middleware');

router.post('/register', userController.create);
router.post('/login', userController.login);
router.get('/profile', userMiddleware.isAuthenticated, userController.profile);
router.get('/leaderboard', userController.getLeaderBoard);

//router.get('/leaderboard/search', userController.searchLeaderBoardByUsername);

module.exports = router;
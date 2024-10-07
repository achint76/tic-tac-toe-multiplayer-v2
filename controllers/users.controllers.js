const mongoose = require('mongoose');
const { ObjectId } = require('mongodb');
const bcrypt = require('bcrypt');
const userService = require('../services/users.services');
const userModel = require('../models/users.models');
const UserService = require('../services/users.services');
const client = require('../index.js');

const UserController = {
    async create(req, res) {
        try{
        const data = req.body;
        if (!data.username || !data.password || !data.email)
            res.status(400).json({ message: 'Required field is missing!' });
        
        const hashedPassword = await bcrypt.hash(data.password, 10);
        data.password = hashedPassword;
        const user = await userService.register(data);
        if(!user)
            res.status(400).json({ message: 'User cannot be registered, check your details once!', error: error.message});
        res.status(200).json({
            success: true,
            message: 'User registered successfully!',
            
        })
    }catch(error){
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            error: error.message
        });
    }
    },
    async login(req, res) {
        try{
            const { email, password } = req.body;
            const user = await userModel.findOne({ email });
            if(!user){
                return res.status(400).json({ message: 'Invalid email, please check again!'});
            }
            const isMatch = await bcrypt.compare(password, user.password);
            console.log("ismatch", isMatch);
            if(!isMatch){
                return res.status(400).json({message: 'Incorrect password!'});
            }
            req.session.user = {
                id: user._id,
                email: user.email
            };
            return res.status(200).json({
                success: true,
                message: 'Login successful',
                redirectTo: 'http://127.0.0.1:5000/game-room/index.html',
                //redirectTo: 'http://127.0.0.1:5000/waiting-room/index.html',
                data: user
            });
        }catch(error){
            return res.status(500).json({
                success: false,
                message: 'Internal Server Error',
                error: error.message
            });
        }
    },
    async profile(req, res){
        // if(!req.session.user){
        //     res.status(401).json({ message: 'Not Authenticated'});
        // }
        // res.status(200).json({user: req.session.user});
        try{
            console.log(req.session.user,"PROFILE");
            const user = await userModel.findById(req.session.user.id);
            if(!user)
                return res.status(404).json({message:' User not found '});
            res.status(200).json(user);
        }catch(error){
            res.status(500).json({message: 'Server error', error: error.message});
        }
    },

    // async getLeaderBoard(req, res){
    //     try{
    //         const leaderboard = await UserService.getLeaderBoard();
    //          res.status(200).json({
    //             success: true,
    //             data: leaderboard
    //         })
    //         console.log(leaderboard,"LEADERBOARD");
    //     }catch(error){
    //          res.status(500).json({
    //             success: false,
    //             message: 'Internal Server Error',
    //             error: error.message
    //         });
    //     }
    // }


    async getLeaderBoard(req, res) {
        try {
            const { page = 1, limit = 5, search = '' } = req.query; // Default page is 1, limit is 5
            const leaderboard = await UserService.getLeaderBoard(page, limit, search);
            console.log("LEADERBOARD", leaderboard);
            res.status(200).json({
                success: true,
                data: leaderboard.users,
                totalPages: leaderboard.totalPages,
                currentPage: leaderboard.currentPage,
                rank: leaderboard.rank, // Send rank in case of search
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Internal Server Error',
                error: error.message
            });
        }
    }
    
}

module.exports = UserController;

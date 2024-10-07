const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
    playerX: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    playerO: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    board: {
        type: [[String]],
        default: [['', '', ''], ['', '', ''], ['', '', '']]
    },
    currentPlayer: {
        type: String,
        enum: ['X', 'O'],
        default: 'X'
    },
    status: {
        type: String,
        enum: ['waiting', 'ongoing', 'finished'],
        default: 'waiting'
    },
    winner: {
        type: String,
        default: null
    }
}, { versionKey: false, timestamps: true });

module.exports = mongoose.model('Game', gameSchema);

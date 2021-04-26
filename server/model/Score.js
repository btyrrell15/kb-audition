const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ScoreSchema = new Schema({
    Performer: {
        type: String,
    },
    Name: {
        type: String,
    },
    Vocal: {
        type: String,
    },
    Dance: {
        type: String,
    },
    Presence: {
        type: String,
    },
    Overall: {
        type: String,
    },
    Notes: {
        type: String,
    },
    Callback: {
        type: String,
    },
    AuditionID: {
        type: String,
    },
    JudgeID: {
        type: String,
    },
    Image: {
        type: String,
    },
    
});

module.exports = mongoose.model('Score', ScoreSchema)
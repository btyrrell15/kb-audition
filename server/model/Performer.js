const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PerformerSchema = new Schema({
    
    Name: {
        type: String,
    },
    Email: {
        type: String,
    },
    Phone: {
        type: String,
    },
    Resume: {
        type: String,
    },
    Specialties: {
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
    AuditionID: {
        type: String,
    },
    JudgeID: {
        type: String,
    },
    UserID: {
        type: String,
    },
    Scored: {
        type: String,
    },
    Registered: {
        type: String,
    },
    Image: {
        type: String,
    },
    
});

module.exports = mongoose.model('Performer', PerformerSchema)
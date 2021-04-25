const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AuditionSchema = new Schema({
    AuditionName: {
        type: String,
    },
    AuditionDescription: {
        type: String,
    },
    Location: {
        type: String,
    },
    Roles: {
        type: String,
    },
    RoleNames: {
        type: Array,
    },
    AuditionDate: {
        type: String,
    },
    Judges: {
        type: Array,
    },
    PerformerID: {
        type: String,
    },
    CompID: {
        type: String,
    },
});

module.exports = mongoose.model('Audition', AuditionSchema)
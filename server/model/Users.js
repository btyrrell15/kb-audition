const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    CompanyName: {
        type: String,
    },
    Image: {
        type: String,
    },
    FirstName: {
        type: String,
    },
    LastName: {
        type: String,
    },
    Phone: {
        type: String,
    },
    Email: {
        type: String,
    },
    Address: {
        type: String,
    },
    City: {
        type: String,
    },
    State: {
        type: String,
    },
    Zip: {
        type: String,
    },
    Role: {
        type: String,
    },
    Username: {
        type: String,
    },
    Password: {
        type: String,
    },
    AuditionID: {
        type: Array,
    },
    Scores: {
        type: Array,
    },
});

module.exports = mongoose.model('Users', UserSchema)
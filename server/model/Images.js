const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
    Name: {
        type: String,
    },
    File: {
        type: String,
    },
    Location: {
        type: String,
    },
    
});

module.exports = mongoose.model('Image', ImageSchema)
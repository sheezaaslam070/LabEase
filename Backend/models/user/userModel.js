const mongoose = require('mongoose');

// user schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    userType: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
});

const User = mongoose.model('user', userSchema);

module.exports = User;
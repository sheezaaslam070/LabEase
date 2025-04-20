const mongoose = require('mongoose');

// message schema
const messageSchema = new mongoose.Schema({
    senderName: {
        type: String,
        required: true,
    },
    senderUsername: {
        type: String,
        required: true,
    },
    senderEmail: {
        type: String,
        required: true,
    },
    senderPhone: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    isSeen: {
        type: Boolean,
        default: false, // message is not seen by default
    },
});

const Message = mongoose.model('message', messageSchema);

module.exports = Message;
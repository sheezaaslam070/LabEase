const messageModel = require('../models/messageModel');

// sending a message
const sendMessage = async (req, res) => {
    try {
        const { senderName, senderEmail, senderPhone, message } = req.body;
        await messageModel.create({
            senderName,
            senderEmail,
            senderPhone,
            senderUsername: req.cookies.user.username,
            message,
        })
        res.status(200).json({ message: 'Message sent successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// getting all messages
const getMessages = async (req, res) => {
    try {
        const messages = await messageModel.find();
        res.status(200).json({ messages });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// getting a message by id
const getMessageById = async (req, res) => {
    try {
        const { messageId } = req.params;
        const message = await messageModel.findById(messageId);
        res.status(200).json({ message });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// getting only unseen messages
const getUnseenMessages = async (req, res) => {
    try {
        const messages = await messageModel.find({ isSeen: false });
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// marking a message as seen
const markAsSeen = async (req, res) => {
    try {
        const { messageId } = req.body;
        await messageModel.findByIdAndUpdate(messageId, { isSeen: true });
        res.status(200).json({ message: 'Message marked as seen' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    sendMessage,
    getMessages,
    getMessageById,
    getUnseenMessages,
    markAsSeen,
}
const express = require('express');
const router = express.Router();
const validateMessage = require('../middlewares/validateMessage');
const {sendMessage, getMessageById, getMessages, getUnseenMessages, markAsSeen} = require('../controllers/messageController');

router.post('/send', validateMessage, sendMessage);
router.put('/mark-as-seen', markAsSeen);
router.get('/get-all', getMessages);
router.get('/get-unseen', getUnseenMessages);
router.get('/get/:messageId', getMessageById);

module.exports = router;
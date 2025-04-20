const xss = require('xss');

const validateMessage = (req, res, next) => {
    try {
        const { senderName, senderEmail, senderPhone, message } = req.body;
        if (!message || !senderName || !senderEmail || !senderPhone) {
            return res.status(400).json({ message: 'Invalid Data' });
        }
        req.body.message = xss(message);
        req.body.senderName = xss(senderName);
        req.body.senderEmail = xss(senderEmail);
        req.body.senderPhone = xss(senderPhone);
        next();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = validateMessage;
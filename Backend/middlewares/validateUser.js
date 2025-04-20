const xss = require('xss');

const validateUser = (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }
        req.body.email = xss(email);
        req.body.password = xss(password);
        next();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = validateUser;
const xss = require('xss');

const filterProblemDetail = (req, res, next) => {
    const { problemDetail } = req.body;
    if (!problemDetail) {
        return res.status(400).json({ message: 'Problem detail is required' });
    }

    // sanitizing the problem detail
    req.body.problemDetail = xss(problemDetail);

    next();
};

module.exports = filterProblemDetail;
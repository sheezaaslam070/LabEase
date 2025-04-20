const baseModel = require('./baseModel');
const mongoose = require('mongoose');

// Internet Problem schema
const internetIssueSchema = new mongoose.Schema({
    pcNo: {
        type: String,
        required: true
    }
});

// Creating a model for Internet Problem by extending the base model
const internetProblem = baseModel.discriminator('InternetProblem', internetIssueSchema);

module.exports = internetProblem;
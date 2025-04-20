const baseModel = require('./baseModel');
const mongoose = require('mongoose');

// PC Problem schema
const pcProblemSchema = new mongoose.Schema({
    pcNo: {
        type: String,
        required: true
    }
});

// Creating a model for PC Problem by extending the base model
const pcProblem = baseModel.discriminator('PCProblem', pcProblemSchema);

module.exports = pcProblem;
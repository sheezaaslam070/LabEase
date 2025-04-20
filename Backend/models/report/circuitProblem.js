const baseModel = require('./baseModel');
const mongoose = require('mongoose');

// Circuit Problem schema
const circuitProblem = baseModel.discriminator('CircuitProblem', new mongoose.Schema({}));

module.exports = circuitProblem;
const baseModel = require('./baseModel');
const mongoose = require('mongoose');

// Furniture Problem schema
const furnitureProblem = baseModel.discriminator('FurnitureProblem', new mongoose.Schema({}));

module.exports = furnitureProblem;
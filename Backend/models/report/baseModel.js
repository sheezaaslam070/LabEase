const mongoose = require('mongoose');

// Base schema with common attributes
const reportBaseSchema = new mongoose.Schema({
    labName: {
        type: String,
        required: true
    },
    issueType: {
        type: String,
        required: true
    },
    problemDetail: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'Not Started',
    },
    isSeen: {
        type: Boolean,
        default: false // Initially unseen
    },
    username: {
        type: String,
        required: true
    },
    issueDate: {
        type: Date,
        default: Date.now // Automatically set to the current date when the report is created
    },
    resolvedDate: {
        type: Date,
        default: null // Initially null, can be updated when the issue is resolved
    }
}, { discriminatorKey: 'reportType' }); // Use discriminatorKey to differentiate between report types

const baseModel = mongoose.model('report', reportBaseSchema);

module.exports = baseModel;
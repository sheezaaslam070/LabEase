const mongoose = require('mongoose');

const labSchema = new mongoose.Schema({
    labName: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
    },
    deptName: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
    },
}, { timestamps: true });

labSchema.index({ labName: 1, deptName: 1 }, { unique: true }); // Unique per department

const Lab = mongoose.model('lab', labSchema);
module.exports = Lab;

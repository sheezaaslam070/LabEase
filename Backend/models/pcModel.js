const mongoose = require('mongoose');

const pcSchema = new mongoose.Schema({
    pcName: {
        type: String,
        required: true,
        trim: true,
        lowercase: true, // Ensure case-insensitive uniqueness
    },
    labName: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        ref: 'lab', // Ensure lab exists before adding a PC
    },
}, { timestamps: true });

pcSchema.index({ pcName: 1, labName: 1 }, { unique: true }); // Ensure uniqueness within a lab

const PCModel = mongoose.model('pc', pcSchema);
module.exports = PCModel;

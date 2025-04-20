const mongoose = require('mongoose');

// technician schema
const technicianSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phone: {
        type: String,
        required: true,
    },
    techType: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        default: null,
    },
});

const Technician = mongoose.model('technician', technicianSchema);

module.exports = Technician;
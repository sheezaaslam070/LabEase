const technicianModel = require('../../models/user/technicianModel');
const fs = require('fs');
const path = require('path');

const loginTechnician = async (req, res) => {
    try {
        const { email, password } = req.body;
        const technician = await technicianModel.findOne({ email });
        if (!technician || password !== "technician") {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        // setting technician cookie
        res.cookie('technician', technician, { 
            httpOnly: true,
            secure: false, // I should convert it to true before deploying
            sameSite: 'Strict',
            maxAge: 60 * 60 * 1000, // cookie life: 1 hour
        });
        res.status(200).json({message: 'Logged in successfully'});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const addTechnician = async (req, res) => {
    try {
        const { name, email, phone, techType } = req.body;

        // Check if all required fields exist
        if (!name || !email || !phone || !techType) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        // Check if a technician with the same email already exists
        let existingTechnician = await technicianModel.findOne({ email });
        if (existingTechnician) {
            return res.status(400).json({ message: 'Technician with this email already exists.' });
        }

        existingTechnician = await technicianModel.findOne({ phone });
        if (existingTechnician) {
            return res.status(400).json({ message: 'Technician with this phone number already exists.' });
        }

        // Image path
        let imagePath = null;
        if (req.file) {
            imagePath = `/uploads/${req.file.filename}`; // Store relative path
        }

        // Create new technician object
        await technicianModel.create({
            name,
            email,
            phone,
            techType,
            image: imagePath,
        });

        res.status(201).json({ message: 'Technician added successfully.' });
    } catch (error) {
        console.error('Error adding technician:', error);
        res.status(500).json({ message: 'Server error. Please try again later.' });
    }
};

// function to get all technicians
const getAllTechnicians = async (req, res) => {
    try {
        const technicians = await technicianModel.find();
        res.status(200).json(technicians);
    } catch (error) {
        console.error('Error fetching technicians:', error);
        res.status(500).json({ message: 'Server error. Please try again later.' });
    }
};

// delete a technician by id
const deleteTechnician = async (req, res) => {
    try {
        const { id } = req.params;

        // Check if technician exists
        const technician = await technicianModel.findById(id);
        if (!technician) {
            return res.status(404).json({ message: 'Technician not found.' });
        }
        // removing the file from /uploads folder
        if (technician.image) {
            const imagePath = path.join(__dirname, '../../uploads', technician.image.split('/').pop());
            fs.unlinkSync(imagePath);
        }

        await technicianModel.findByIdAndDelete(id);

        res.status(200).json({ message: 'Technician deleted successfully.' });
    } catch (error) {
        console.error('Error deleting technician:', error);
        res.status(500).json({ message: 'Server error. Please try again later.' });
    }
};

// get a technician by id
const getTechnicianById = async (req, res) => {
    try {
        const { id } = req.params;
        const technician = await technicianModel.findById(id);
        if (!technician) {
            return res.status(404).json({ message: 'Technician not found.' });
        }
        res.status(200).json(technician);
    } catch (error) {
        console.error('Error fetching technician:', error);
        res.status(500).json({ message: 'Server error. Please try again later.' });
    }
};

// update a technician by id
const updateTechnician = async (req, res) => {
    try {
        const { id, name, email, phone, techType } = req.body;

        // Check if technician exists
        const technician = await technicianModel.findById(id);
        if (!technician) {
            return res.status(404).json({ message: 'Technician not found.' });
        }

        // Check if a technician with the same email already exists
        let existingTechnician = await technicianModel.findOne({ email });
        if (existingTechnician && existingTechnician._id.toString() !== id) {
            return res.status(400).json({ message: 'Technician with this email already exists.' });
        }

        existingTechnician = await technicianModel.findOne({ phone });
        if (existingTechnician && existingTechnician._id.toString() !== id) {
            return res.status(400).json({ message: 'Technician with this phone number already exists.' });
        }

        await technicianModel.findByIdAndUpdate(id, {
            name,
            phone,
            techType,
            email
        });

        res.status(200).json({ message: 'Technician updated successfully.' });
    } catch (error) {
        console.error('Error updating technician:', error);
        res.status(500).json({ message: 'Server error. Please try again later.' });
    }
};

module.exports = { 
    loginTechnician,
    addTechnician,
    getAllTechnicians,
    deleteTechnician,
    getTechnicianById,
    updateTechnician,
};

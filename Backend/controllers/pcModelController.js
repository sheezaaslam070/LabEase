const pcModel = require('../models/pcModel');
const labModel = require('../models/labModel');

// Add a new PC
const addPC = async (req, res) => {
    let { pcName, labName } = req.body;
    pcName = pcName.trim().toLowerCase();
    labName = labName.trim().toLowerCase();

    try {
        const labExists = await labModel.findOne({ labName });
        if (!labExists) {
            return res.status(400).json({ message: 'Lab does not exist' });
        }

        const existingPC = await pcModel.findOne({ pcName, labName });
        if (existingPC) {
            return res.status(400).json({ message: 'PC already exists in this lab' });
        }

        await pcModel.create({ pcName, labName });
        res.status(201).json({ message: 'PC added successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// get all pcs
const getAllPCs = async (req, res) => {
    try {
        const pcs = await pcModel.find();
        res.status(200).json(pcs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// get a pc by id
const getPCById = async (req, res) => {
    const { id } = req.params;
    try {
        const pc = await pcModel.findById(id);
        res.status(200).json(pc);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// delete pc by id
const deletePC = async (req, res) => {
    const { id } = req.params;
    try {
        await pcModel.findByIdAndDelete(id);
        res.status(200).json({ message: 'PC deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update PC (Renaming PC & Moving it to Another Lab)
const updatePC = async (req, res) => {
    const { id } = req.params;
    let { pcName, labName } = req.body;
    pcName = pcName.trim().toLowerCase();
    labName = labName.trim().toLowerCase();

    try {
        const pc = await pcModel.findById(id);
        if (!pc) {
            return res.status(404).json({ message: 'PC not found' });
        }

        const labExists = await labModel.findOne({ labName });
        if (!labExists) {
            return res.status(400).json({ message: 'Target lab does not exist' });
        }

        const duplicatePC = await pcModel.findOne({ pcName, labName });
        if (duplicatePC && duplicatePC._id.toString() !== id) {
            return res.status(400).json({ message: 'PC with this name already exists in the target lab' });
        }

        await pcModel.findByIdAndUpdate(id, { pcName, labName });
        res.status(200).json({ message: 'PC updated successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { addPC, getAllPCs, deletePC, getPCById, updatePC };
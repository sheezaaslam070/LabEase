const labModel = require('../models/labModel');
const pcModel = require('../models/pcModel');

// Add a new Lab
const addLab = async (req, res) => {
    let { labName, deptName } = req.body;
    labName = labName.trim().toLowerCase();
    deptName = deptName.trim().toLowerCase();

    try {
        const existingLab = await labModel.findOne({ labName, deptName });
        if (existingLab) {
            return res.status(400).json({ message: 'Lab already exists in this department' });
        }

        await labModel.create({ labName, deptName });
        res.status(201).json({ message: 'Lab added successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// get all labs
const getAllLabs = async (req, res) => {
    try {
        const labs = await labModel.find();
        res.status(200).json(labs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// get a lab by id
const getLabById = async (req, res) => {
    const { id } = req.params;
    try {
        const lab = await labModel.findById(id);
        res.status(200).json(lab);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// delete lab by id
const deleteLab = async (req, res) => {
    const { id } = req.params;
    try {
        const lab = await labModel.findById(id);
        const pcs = await pcModel.find({ labName: lab.labName });
        pcs.forEach(async (pc) => {
            await pcModel.findByIdAndDelete(pc._id);
        });
        await labModel.findByIdAndDelete(id);
        res.status(200).json({ message: 'Lab deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a Lab (Renaming Lab & Updating Dept)
const updateLab = async (req, res) => {
    const { id } = req.params;
    const { labName, deptName } = req.body;
    let newlabName = labName.trim().toLowerCase();
    let newdeptName = deptName.trim().toLowerCase();

    try {
        const existingLab = await labModel.findOne({ newlabName, newdeptName });
        if (existingLab) {
            return res.status(400).json({ message: 'Lab already exists in this department' });
        }

        const lab = await labModel.findById(id);
        if (!lab) {
            return res.status(404).json({ message: 'Lab not found' });
        }

        // Update associated PCs if labName changes
        if (lab.labName !== newlabName) {
            await pcModel.updateMany({ labName: lab.labName }, { $set: { labName: newlabName } });
        }

        await labModel.findByIdAndUpdate(id, { labName: newlabName, deptName: newdeptName });
        res.status(200).json({ message: 'Lab updated successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// check if lab exists by name
const checkLabExists = async (req, res) => {
    const { labName } = req.params;
    try {
        const lab = await labModel.findOne({ labName });
        if (lab) {
            res.status(200).json({ message: 'Lab exists' });
        } else {
            res.status(404).json({ message: 'Lab does not exist' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    addLab,
    getAllLabs,
    getLabById,
    deleteLab,
    updateLab,
    checkLabExists,
};
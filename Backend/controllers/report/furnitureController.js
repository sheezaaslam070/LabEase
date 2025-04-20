const furnitureProblem = require('../../models/report/furnitureProblem');

const addNewFurnitureReport = async (req, res) => {
    const { labName, issueType, problemDetail } = req.body;
    try {
        const newReport = await furnitureProblem.create({
            labName: labName,
            issueType: issueType,
            problemDetail: problemDetail,
            username: req.cookies.user.username,
        });
        res.status(201).json({ message: 'New Furniture report created successfully'});
    } catch (error) {
        res.status(500).json({ error: 'Failed to create new Furniture report' });
    }
}

// get all furniture reports
const getAllFurnitureReports = async (req, res) => {
    try {
        const reports = await furnitureProblem.find();
        res.status(200).json(reports);
    } catch (error) {
        res.status(500).json({ error: 'Failed to get all Furniture reports' });
    }
}

// get a furniture report by id
const getFurnitureReportById = async (req, res) => {
    const { reportId } = req.params;
    try {
        const report = await furnitureProblem.findById(reportId);
        res.status(200).json(report);
    } catch (error) {
        res.status(500).json({ error: 'Failed to get Furniture report' });
    }
}

// mark a report as seen
const markFurnitureReportAsSeen = async (req, res) => {
    const { reportId } = req.body;
    try {
        await furnitureProblem.findByIdAndUpdate(reportId, { isSeen: true });
        res.status(200).json({ message: 'Furniture report marked as seen' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to mark Furniture report as seen' });
    }
}

// get all unseen furniture reports
const getAllUnseenFurnitureReports = async (req, res) => {
    try {
        const reports = await furnitureProblem.find({ isSeen: false });
        res.status(200).json(reports);
    } catch (error) {
        res.status(500).json({ error: 'Failed to get all unseen Furniture reports' });
    }
}

// update the status of a report
const updateFurnitureReportStatus = async (req, res) => {
    const { reportId, status } = req.body;
    try {
        if (status !== 'Completed') {
            await furnitureProblem.findByIdAndUpdate(reportId, { status: status, resolvedDate: null });
        } else {
            await furnitureProblem.findByIdAndUpdate(reportId, { status: status, resolvedDate: new Date() });
        }
        res.status(200).json({ message: 'Furniture report status updated successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update Furniture report status' });
    }
}

// delete a furniture report by id
const deleteFurnitureReport = async (req, res) => {
    const { reportId } = req.body;
    try {
        await furnitureProblem.findByIdAndDelete(reportId);
        res.status(200).json({ message: 'Furniture report deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete Furniture report' });
    }
}

const moveFurnitureReportToStorage = async (req, res) => {
    const { reportId } = req.body;
    try {
        await furnitureProblem.findByIdAndUpdate(reportId, { status: 'In Storage' });
        res.status(200).json({ message: 'Furniture report moved to storage successfully' });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to move Furniture report to storage' });
    }
}

const getAllFurnitureReportsInStorage = async (req, res) => {
    try {
        const reports = await furnitureProblem.find({ status: 'In Storage' });
        res.status(200).json(reports);
    } catch (error) {
        res.status(500).json({ error: 'Failed to get all Furniture reports in storage' });
    }
}

module.exports = {
    addNewFurnitureReport,
    getAllFurnitureReports,
    getFurnitureReportById,
    markFurnitureReportAsSeen,
    getAllUnseenFurnitureReports,
    updateFurnitureReportStatus,
    deleteFurnitureReport,
    moveFurnitureReportToStorage,
    getAllFurnitureReportsInStorage,
};
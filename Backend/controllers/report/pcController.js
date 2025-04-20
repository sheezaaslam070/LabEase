const pcProblem = require('../../models/report/pcProblem');

const addNewPCReport = async (req, res) => {
    const { labName, issueType, problemDetail, pcNo } = req.body;
    try {
        const newReport = await pcProblem.create({
            labName: labName,
            issueType: issueType,
            problemDetail: problemDetail,
            username: req.cookies.user.username,
            pcNo: pcNo,
        });
        res.status(201).json({ message: 'New PC report created successfully'});
    } catch (error) {
        res.status(500).json({ error: 'Failed to create new PC report' });
    }
}

// get all pc reports
const getAllPCReports = async (req, res) => {
    try {
        const reports = await pcProblem.find();
        res.status(200).json(reports);
    } catch (error) {
        res.status(500).json({ error: 'Failed to get all PC reports' });
    }
}

// get a pc report by id
const getPCReportById = async (req, res) => {
    const { reportId } = req.params;
    try {
        const report = await pcProblem.findById(reportId);
        res.status(200).json(report);
    } catch (error) {
        res.status(500).json({ error: 'Failed to get PC report' });
    }
}

// mark a report as seen
const markPCReportAsSeen = async (req, res) => {
    const { reportId } = req.body;
    try {
        await pcProblem.findByIdAndUpdate(reportId, { isSeen: true });
        res.status(200).json({ message: 'PC report marked as seen' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to mark PC report as seen' });
    }
}

// get all unseen pc reports
const getAllUnseenPCReports = async (req, res) => {
    try {
        const reports = await pcProblem.find({ isSeen: false });
        res.status(200).json(reports);
    } catch (error) {
        res.status(500).json({ error: 'Failed to get all unseen PC reports' });
    }
}

// update the status of a report
const updatePCReportStatus = async (req, res) => {
    const { reportId, status } = req.body;
    try {
        if (status !== 'Completed') {
            await pcProblem.findByIdAndUpdate(reportId, { status: status, resolvedDate: null });
        } else {
            await pcProblem.findByIdAndUpdate(reportId, { status: status, resolvedDate: new Date() });
        }
        res.status(200).json({ message: 'PC report status updated' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update PC report status' });
    }
}

// delete a report by id
const deletePCReportById = async (req, res) => {
    const { reportId } = req.params;
    try {
        await pcProblem.findByIdAndDelete(reportId);
        res.status(200).json({ message: 'PC report deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete PC report' });
    }
}

// updating a report's status to "In Storage"
const movePCReportToStorage = async (req, res) => {
    const { reportId } = req.body;
    try {
        await pcProblem.findByIdAndUpdate(reportId, { status: "In Storage"});
        res.status(200).json({ message: 'PC report moved to storage' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to move PC report to storage' });
    }
}

const getAllPCReportsInStorage = async (req, res) => {
    try {
        const reports = await pcProblem.find({ status: "In Storage" });
        res.status(200).json(reports);
    } catch (error) {
        res.status(500).json({ error: 'Failed to get all PC reports in storage' });
    }
}

module.exports = {
    addNewPCReport,
    getAllPCReports,
    getPCReportById,
    markPCReportAsSeen,
    getAllUnseenPCReports,
    updatePCReportStatus,
    deletePCReportById,
    movePCReportToStorage,
    getAllPCReportsInStorage,
};
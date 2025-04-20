const circuitProblem = require('../../models/report/circuitProblem');

const addNewCircuitReport = async (req, res) => {
    const { labName, issueType, problemDetail } = req.body;
    try {
        const newReport = await circuitProblem.create({
            labName: labName,
            issueType: issueType,
            problemDetail: problemDetail,
            username: req.cookies.user.username,
        });
        res.status(201).json({ message: 'New Circuit report created successfully'});
    } catch (error) {
        res.status(500).json({ error: 'Failed to create new Circuit report' });
    }
}

// get all circuit reports
const getAllCircuitReports = async (req, res) => {
    try {
        const reports = await circuitProblem.find();
        res.status(200).json(reports);
    } catch (error) {
        res.status(500).json({ error: 'Failed to get all Circuit reports' });
    }
}

// get a circuit report by id
const getCircuitReportById = async (req, res) => {
    const { reportId } = req.params;
    try {
        const report = await circuitProblem.findById(reportId);
        res.status(200).json(report);
    } catch (error) {
        res.status(500).json({ error: 'Failed to get Circuit report' });
    }
}

// mark a report as seen
const markCircuitReportAsSeen = async (req, res) => {
    const { reportId } = req.body;
    try {
        await circuitProblem.findByIdAndUpdate(reportId, { isSeen: true });
        res.status(200).json({ message: 'Circuit report marked as seen' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to mark Circuit report as seen' });
    }
}

// get all unseen circuit reports
const getAllUnseenCircuitReports = async (req, res) => {
    try {
        const reports = await circuitProblem.find({ isSeen: false });
        res.status(200).json(reports);
    } catch (error) {
        res.status(500).json({ error: 'Failed to get all unseen Circuit reports' });
    }
}

// update the status of a report
const updateCircuitReportStatus = async (req, res) => {
    const { reportId, status } = req.body;
    try {
        if (status !== 'Completed') {
            await circuitProblem.findByIdAndUpdate(reportId, { status: status, resolvedDate: null });
        } else {
            await circuitProblem.findByIdAndUpdate(reportId, { status: status, resolvedDate: new Date() });
        }
        res.status(200).json({ message: 'Circuit report status updated' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update Circuit report status' });
    }
}

// delete a report by id
const deleteCircuitReport = async (req, res) => {
    const { reportId } = req.params;
    try {
        await circuitProblem.findByIdAndDelete(reportId);
        res.status(200).json({ message: 'Circuit report deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete Circuit report' });
    }
}

const moveCircuitReportToStorage = async (req, res) => {
    const { reportId } = req.body;
    try {
        await circuitProblem.findByIdAndUpdate(reportId, { status: 'In Storage' });
        res.status(200).json({ message: 'Circuit report moved to storage' });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to move Circuit report to storage' });
    }
}

const getAllCircuitReportsInStorage = async (req, res) => {
    try {
        const reports = await circuitProblem.find({ status: 'In Storage' });
        res.status(200).json(reports);
    } catch (error) {
        res.status(500).json({ error: 'Failed to get all Circuit reports in storage' });
    }
}

module.exports = {
    addNewCircuitReport,
    getAllCircuitReports,
    getCircuitReportById,
    markCircuitReportAsSeen,
    getAllUnseenCircuitReports,
    updateCircuitReportStatus,
    deleteCircuitReport,
    moveCircuitReportToStorage,
    getAllCircuitReportsInStorage,
};
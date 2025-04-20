const internetProblem = require('../../models/report/internetProblem');

const addNewInternetReport = async (req, res) => {
    const { labName, issueType, problemDetail, pcNo } = req.body;
    try {
        const newReport = await internetProblem.create({
            labName: labName,
            issueType: issueType,
            problemDetail: problemDetail,
            username: req.cookies.user.username,
            pcNo: pcNo,
        });
        res.status(201).json({ message: 'New Internet report created successfully'});
    } catch (error) {
        res.status(500).json({ error: 'Failed to create new Internet report' });
    }
}

// get all internet reports
const getAllInternetReports = async (req, res) => {
    try {
        const reports = await internetProblem.find();
        res.status(200).json(reports);
    } catch (error) {
        res.status(500).json({ error: 'Failed to get all Internet reports' });
    }
}

// get an internet report by id
const getInternetReportById = async (req, res) => {
    const { reportId } = req.params;
    try {
        const report = await internetProblem.findById(reportId);
        res.status(200).json(report);
    } catch (error) {
        res.status(500).json({ error: 'Failed to get Internet report' });
    }
}

// mark a report as seen
const markInternetReportAsSeen = async (req, res) => {
    const { reportId } = req.body;
    try {
        await internetProblem.findByIdAndUpdate(reportId, { isSeen: true });
        res.status(200).json({ message: 'Internet report marked as seen' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to mark Internet report as seen' });
    }
}

// get all unseen internet reports
const getAllUnseenInternetReports = async (req, res) => {
    try {
        const reports = await internetProblem.find({ isSeen: false });
        res.status(200).json(reports);
    } catch (error) {
        res.status(500).json({ error: 'Failed to get all unseen Internet reports' });
    }
}

// update the status of a report
const updateInternetReportStatus = async (req, res) => {
    const { reportId, status } = req.body;
    try {
        if (status !== 'Completed') {
            await internetProblem.findByIdAndUpdate(reportId, { status: status, resolvedDate: null });
        } else {
            await internetProblem.findByIdAndUpdate(reportId, { status: status, resolvedDate: new Date() });
        }
        res.status(200).json({ message: 'Internet report status updated successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update Internet report status' });
    }
}

// delete an internet report by id
const deleteInternetReport = async (req, res) => {
    const { reportId } = req.params;
    try {
        await internetProblem.findByIdAndDelete(reportId);
        res.status(200).json({ message: 'Internet report deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete Internet report' });
    }
}

const moveInternetReportToStorage = async (req, res) => {
    const { reportId } = req.body;
    try {
        await internetProblem.findByIdAndUpdate(reportId, { status: "In Storage"});
        res.status(200).json({ message: 'Internet report moved to storage' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to move Internet report to storage' });
    }
}

const getAllInternetReportsInStorage = async (req, res) => {
    try {
        const reports = await internetProblem.find({ status: "In Storage" });
        res.status(200).json(reports);
    } catch (error) {
        res.status(500).json({ error: 'Failed to get all Internet reports in storage' });
    }
}

module.exports = {
    addNewInternetReport,
    getAllInternetReports,
    getInternetReportById,
    markInternetReportAsSeen,
    getAllUnseenInternetReports,
    updateInternetReportStatus,
    deleteInternetReport,
    moveInternetReportToStorage,
    getAllInternetReportsInStorage,
};
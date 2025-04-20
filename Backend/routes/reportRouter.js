const express = require('express');
const router = express.Router();
const filterProblemDetail = require('../middlewares/filterProblemDetail')
const {addNewPCReport, 
        getAllPCReports,
        getAllPCReportsInStorage,
        getPCReportById,
        markPCReportAsSeen, 
        getAllUnseenPCReports,
        updatePCReportStatus,
        deletePCReportById,
        movePCReportToStorage} = require('../controllers/report/pcController');
        
const {addNewInternetReport,
        getAllInternetReports,
        getAllInternetReportsInStorage,
        getInternetReportById,
        markInternetReportAsSeen,
        getAllUnseenInternetReports,
        updateInternetReportStatus,
        deleteInternetReport,
        moveInternetReportToStorage} = require('../controllers/report/internetController');

const {addNewFurnitureReport,
        getAllFurnitureReports,
        getAllFurnitureReportsInStorage,
        getFurnitureReportById,
        markFurnitureReportAsSeen,
        getAllUnseenFurnitureReports,
        updateFurnitureReportStatus,
        deleteFurnitureReport,
        moveFurnitureReportToStorage} = require('../controllers/report/furnitureController');

const {addNewCircuitReport,
        getAllCircuitReports,
        getAllCircuitReportsInStorage,
        getCircuitReportById,
        markCircuitReportAsSeen,
        getAllUnseenCircuitReports,
        updateCircuitReportStatus,
        deleteCircuitReport,
        moveCircuitReportToStorage} = require('../controllers/report/circuitController');

// POST requests for adding new reports
router.post('/pc', filterProblemDetail, addNewPCReport);
router.post('/internet', filterProblemDetail, addNewInternetReport);
router.post('/furniture', filterProblemDetail, addNewFurnitureReport);
router.post('/circuit', filterProblemDetail, addNewCircuitReport);

// GET requests for getting all reports
router.get('/all-pc-reports', getAllPCReports);
router.get('/all-internet-reports', getAllInternetReports);
router.get('/all-furniture-reports', getAllFurnitureReports);
router.get('/all-circuit-reports', getAllCircuitReports);

// GET requests for getting all reports in storage
router.get('/all-pc-reports-IS', getAllPCReportsInStorage);
router.get('/all-internet-reports-IS', getAllInternetReportsInStorage);
router.get('/all-furniture-reports-IS', getAllFurnitureReportsInStorage);
router.get('/all-circuit-reports-IS', getAllCircuitReportsInStorage);

// GET requests for getting a report by id
router.get('/pc/:reportId', getPCReportById);
router.get('/internet/:reportId', getInternetReportById);
router.get('/furniture/:reportId', getFurnitureReportById);
router.get('/circuit/:reportId', getCircuitReportById);

// GET requests for getting all unseen reports
router.get('/unseen-pc-reports', getAllUnseenPCReports);
router.get('/unseen-internet-reports', getAllUnseenInternetReports);
router.get('/unseen-furniture-reports', getAllUnseenFurnitureReports);
router.get('/unseen-circuit-reports', getAllUnseenCircuitReports);

// PUT requests for marking a report as seen
router.put('/pc/mark-as-seen', markPCReportAsSeen);
router.put('/internet/mark-as-seen', markInternetReportAsSeen);
router.put('/furniture/mark-as-seen', markFurnitureReportAsSeen);
router.put('/circuit/mark-as-seen', markCircuitReportAsSeen);

// PUT request for updating the status of a report
router.put('/pc/update-status', updatePCReportStatus);
router.put('/internet/update-status', updateInternetReportStatus);
router.put('/furniture/update-status', updateFurnitureReportStatus);
router.put('/circuit/update-status', updateCircuitReportStatus);

// PUT rqeuest for moving a report to storage
router.put('/pc/move-to-storage', movePCReportToStorage);
router.put('/internet/move-to-storage', moveInternetReportToStorage);
router.put('/furniture/move-to-storage', moveFurnitureReportToStorage);
router.put('/circuit/move-to-storage', moveCircuitReportToStorage);

// DELETE request for deleting a report by id
router.delete('/pc/delete/:reportId', deletePCReportById);
router.delete('/internet/delete/:reportId', deleteInternetReport);
router.delete('/furniture/delete/:reportId', deleteFurnitureReport);
router.delete('/circuit/delete/:reportId', deleteCircuitReport);

module.exports = router;
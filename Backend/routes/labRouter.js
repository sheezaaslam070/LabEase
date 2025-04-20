const express = require('express');
const router = express.Router();
const { addLab, getAllLabs, deleteLab, getLabById, updateLab, checkLabExists } = require('../controllers/labController');

router.post('/add', addLab);
router.get('/all', getAllLabs);
router.get('/get/:id', getLabById);
router.delete('/delete/:id', deleteLab);
router.put('/update/:id', updateLab);
// router.get('/check/:labName', checkLabExists);

module.exports = router;
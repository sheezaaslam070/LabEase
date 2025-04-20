const express = require('express');
const router = express.Router();

const { addPC, getAllPCs, deletePC, getPCById, updatePC } = require('../controllers/pcModelController');

router.post('/add', addPC);
router.get('/all', getAllPCs);
router.get('/get/:id', getPCById);
router.delete('/delete/:id', deletePC);
router.put('/update/:id', updatePC);

module.exports = router;
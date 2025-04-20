const express = require('express');
const router = express.Router();
const upload = require('../middlewares/uploadFile');
const validateUser = require('../middlewares/validateUser');
const {loginTechnician, addTechnician, getAllTechnicians, deleteTechnician, getTechnicianById, updateTechnician} = require('../controllers/user/technicianController');

router.post('/login', validateUser, loginTechnician);
router.post('/add', upload.single('image') ,addTechnician);
router.delete('/delete/:id', deleteTechnician);
router.get('/all', getAllTechnicians);
router.get('/get/:id', getTechnicianById);
router.put('/update', updateTechnician);

module.exports = router;
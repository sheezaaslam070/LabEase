const express = require('express');
const router = express.Router();
const validateUser = require('../middlewares/validateUser');
const {loginUser, authenticateUser, getUserByUsername, getUsers, getStudents, deleteStudent, getStudentByID, updateStudent, addNewStudent} = require('../controllers/user/userController');

router.post('/login', validateUser, loginUser);
router.get('/check-auth', authenticateUser);
router.get('/get-all', getUsers);
router.get('/get/:username', getUserByUsername);
router.get('/get-student/:id', getStudentByID);
router.get('/get-all-students', getStudents);
router.delete('/delete-student/:id', deleteStudent);
router.put('/update-student', updateStudent);
router.post('/add-student', addNewStudent);

module.exports = router;
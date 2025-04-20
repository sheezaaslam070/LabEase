const userModel = require('../../models/user/userModel');

// logging a user in
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email, password });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        // setting user cookie
        res.cookie('user', user, { 
            httpOnly: true,
            secure: false, // I should convert it to true before deploying
            sameSite: 'Strict',
            maxAge: 60 * 60 * 1000, // cookie life: 1 hour
        });
        res.status(200).json({message: 'Logged in successfully'});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// authenticating a user
const authenticateUser = async (req, res) => {
    try {
        const user = req.cookies.user;
        if (!user) {
            return res.status(400).json({ message: 'User not authenticated' });
        }
        res.status(200).json({ message: 'User authenticated' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// getting all users
const getUsers = async (req, res) => {
    try {
        const users = await userModel.find();
        res.status(200).json({ users });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// getting all students
const getStudents = async (req, res) => {
    try {
        const students = await userModel.find({ userType: 'Student' });
        res.status(200).json(students);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// getting a user by username
const getUserByUsername = async (req, res) => {
    try {
        const { username } = req.params;
        const user = await userModel.findOne({ username });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// deleting a student by id
const deleteStudent = async (req, res) => {
    try {
        const { id } = req.params;
        const student = await userModel.findByIdAndDelete(id);
        if (!student) {
            return res.status(400).json({ message: 'Student not found' });
        }
        res.status(200).json({ message: 'Student deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// getting a student by id
const getStudentByID = async (req, res) => {
    try {
        const { id } = req.params;
        const student = await userModel.findOne({ _id: id });
        res.status(200).json(student);
    }   catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// updating a student
const updateStudent = async (req, res) => {
    try {
        const { id, name, email, password, gender } = req.body;
        const existingStudent = await userModel.findOne({ email });
        if (existingStudent && existingStudent._id.toString() !== id) {
            return res.status(400).json({ message: 'Student with this email already exists' });
        }
        const student = await userModel.findByIdAndUpdate(id, { username: name, email, password, gender });
        if (!student) {
            return res.status(400).json({ message: 'Student not found' });
        }
        res.status(200).json({ message: 'Student updated successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// adding a new student
const addNewStudent = async (req, res) => {
    try {
        const { username, email, password, gender } = req.body;
        console.log('Request body:', req.body);
        const student = await userModel.findOne({ username, email });
        if (student) {
            return res.status(400).json({ message: 'Student already exists' });
        }
        await userModel.create({ 
                username,
                email,
                password,
                userType: "Student",
                gender,
            });
        res.status(201).json({ message: 'Student added successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { 
    loginUser,
    authenticateUser,
    getUsers,
    getUserByUsername,
    getStudents,
    deleteStudent,
    getStudentByID,
    updateStudent,
    addNewStudent,
};
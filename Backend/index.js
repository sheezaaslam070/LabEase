require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const { connectDB } = require('./database');
const reportRouter = require('./routes/reportRouter');
const userRouter = require('./routes/userRouter');
const messageRouter = require('./routes/messageRouter');
const technicianRouter = require('./routes/technicianRouter');
const labRouter = require('./routes/labRouter');
const pcRouter = require('./routes/pcRouter');
const app = express();
const PORT = 3000;

// Connecting with database
connectDB();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
    origin: process.env.FrontendURL,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/uploads/:fileName', (req, res) => {
    const { fileName } = req.params;
    const filePath = path.join(__dirname, 'uploads', fileName);
    res.sendFile(filePath);
});

app.use('/api/report', reportRouter);
app.use('/api/user', userRouter);
app.use('/api/message', messageRouter);
app.use('/api/technician', technicianRouter);
app.use('/api/lab', labRouter);
app.use('/api/pc', pcRouter);

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
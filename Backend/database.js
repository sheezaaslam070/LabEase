const mongoose = require("mongoose")

const connectDB = async () => {
    try {
        const conn = await mongoose.connect("mongodb://localhost:27017/lab-ease")
        console.log("Database conected at", conn.connection.host)
    } catch (err) {
        console.log("Error in connecting to database. ", err)
    }
}

module.exports = {connectDB}
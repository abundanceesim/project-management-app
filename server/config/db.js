const mongoose = require('mongoose')

// async func because mongoose functions return promises
const connectDB = async () => {
    const conn = await mongoose.connect(process.env.MONGO_URI)

    // need to import colors into index.js to use it here
    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.bold);
}

module.exports = connectDB
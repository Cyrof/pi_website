// script to create connection to mongodb

const mongoose = require('mongoose');

const connectdb = async (DATABASE_URL) => {
    try{
        const conn = await mongoose.connect(DATABASE_URL, { useNewUrlParser: true });
        console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch (error){
        console.error(error);
        process.exit(0);
    }
}

module.exports = connectdb;

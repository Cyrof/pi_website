// script to create connection to mongodb

const mongoose = require('mongoose');

const options = {
    useNewUrlParser: true,
    // reconnectTries: Number.MAX_VALUE,
    // reconnectInterval: 500,
    connectTimeoutMS: 10000,
  };
  

const connectdb = async (DATABASE_URL) => {
    try{
        const conn = await mongoose.connect(DATABASE_URL, options);
        console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch (error){
        console.error(error);
        process.exit(0);
    }
}

module.exports = connectdb;

const mongoose = require('mongoose');


const connectDB = async () => {
    try {
        mongoose.set('strictQuery', false);
        await mongoose.connect(process.env.MONGO_URI).then(res => {
            console.log(`DB connected at ${res.connection.host}`);
        });
    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }
}

module.exports =  connectDB;  
const mongoose = require("mongoose");

const db = process.env.MONGODB_URI;


//Connect Mongo DB

const connectDB = async () => {
    try {
        await mongoose.connect(db, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        });
        console.log("MongoDB is connected...");
    }
    catch (err) {
        console.log(err.message);
        process.exit(1);
    }
};

module.exports = connectDB;
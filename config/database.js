const mongoose = require("mongoose");

const connectDatabase = async () => {
    try {
      const conn = await mongoose.connect(process.env.DB_URI, {
        useNewUrlParser: true,
      });
      console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
      console.error(error.message);
      process.exit(1);
    }
  }

module.exports=connectDatabase;
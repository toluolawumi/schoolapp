/**
 *  1. Create a connection function for mongodb
 *  2. Start a local mongodb server connection
 */

 const mongoose = require('mongoose');
 require('dotenv').config();
 const { CONNECTIONURI } = process.env;
 
 
 // Create the connection function
 // const connectDB = () => {
 //   mongoose.connect(MONGO_URI, {
 //     useNewUrlParser: true,
 //     useCreateIndex: true,
 //     useUnifiedTopology: true,
 //     useFindAndModify: false
 //   })
 //   .then(() => {
 //     console.log("MongoDB connected...");
 
 //   })
 //   .catch((err) => {
 //     console.error(err.message);
 
 //     // Exit with failure
 //     process.exit(1);
 //   })
 // }
 
 // Async mongoose connection
 const connectDB = async () => {
   try {
     await mongoose.connect(CONNECTIONURI, {
       useNewUrlParser: true,
       useCreateIndex: true,
       useUnifiedTopology: true,
       useFindAndModify: false
     });
 
     console.log("School app DB connected...");
 
   } catch (err) {
     console.error(err.message);
 
     // Exit with failure;
     process.exit(1);
   }
 }
 
 module.exports = connectDB;
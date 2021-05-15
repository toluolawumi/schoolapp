//create express server
//connect to mongodb
//initilize express
//initialize express middleware
//create a simple get request route
//inject routes
//listen to app connection
const express = require('express');
const connectDB = require('./db');
require('dotenv').config(); // allows us to use the environmental variables in .env
const { PORT } = process.env;


// Connect to db
connectDB();

// Initialise express
const app = express();

// Initialise Express middleware
app.use(express.json({ extended: false }));

// Create a basic express route
app.get('/', (req, res) => res.json({ message: "Welcome to School app!"}));

// PORT
const port = process.env.PORT || PORT;

// Listen to connection
app.listen(port, () => console.log(`app running on port ${port}`));







const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

// Creates the express server
const app = express();
const port = process.env.PORT || 5000;

// Cors 'middleware'
app.use(cors());
app.use(express.json()); // Server is sending and recieving json

// 
const uri = process.env.ATLAS_URI; // The database uri
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true}); // Starts the connection
const connection = mongoose.connection;
connection.once('open', ()=> {
    console.log("GOTTEM AGAIN! MongoDB database connection established successfully")
}); 

//importing and using the api endpoints
const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');
app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);

// This starts the server
app.listen(port, () => {
    console.log(`GOTTEM! The server is listening on port ${port}`);
});

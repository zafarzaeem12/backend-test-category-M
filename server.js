const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv')
const UserRoute = require('./routes/Users')
const app = express();

app.use(express.json());
app.use(cors());
app.use('/users/' , UserRoute )

dotenv.config();






app.listen( process.env.PORT , () => {
    console.log(`Server is running on ${process.env.PORT} Port`)
})
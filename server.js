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


const Mongo_Db_Url = 
`mongodb+srv://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@cluster0.yl84chg.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`;

mongoose
.connect(Mongo_Db_Url)
.then((res) => console.log(`Database Connected Successfully`))
.catch((err) => console.log(`Database Not Connected`))


app.listen( process.env.PORT , () => {
    console.log(`Server is running on ${process.env.PORT} Port`)
})
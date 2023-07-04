const express = require('express');
const app = express();

app.use(express.json());

app.get('/' , (req,res) => {
    const Fetched_Data = 'Welcome to the Node.js server!'
    res.send({
        message:'Data Fetched successfully',
        status:200,
        data : Fetched_Data
    })
})

const PORT = 3000

app.listen( PORT ,() => {
    console.log(`Server is running on ${PORT} port`)
})
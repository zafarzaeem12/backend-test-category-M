const express = require('express');
const app = express();
const readFiles = require('./middleware/readAsyncFile')

app.use(express.json());


app.get('/', (req, res) => {
    readFiles.readFileAsync('./instruction.txt')
        .then(response => {
            res.send({
                message: 'Data Fetched successfully',
                status: 200,
                data: response
            })
        })
        .catch(error => {
            console.error(error);
        });

})

const PORT = 3000

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT} port`)
})
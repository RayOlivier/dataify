const express = require('express');

const app = express();
const port = 8080;

app.get('/', (req, res) => {
    const data = {
        text: 'Hello World!'
    }
    res.json(data);

})

app.listen(port, () => {
    console.log(`Express app listening at  http://localhost:${port}`)
})
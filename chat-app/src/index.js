const express = require('express');
const path = require('path');
const router = express.Router();
const app = express();

const port = process.env.PORT || 3000;
const publicDirectoryPath = path.join(__dirname, '../public');

router.get('/', (req,res) => {
    res.sendFile(publicDirectoryPath + '/index.html');
});

app.use('/', router);
app.listen(port, () => {
    console.log(`chat app listening on port ${port}!`)
});
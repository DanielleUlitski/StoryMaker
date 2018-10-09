const express = require('express');
const router = express();

router.get('/newStory', (req, res) => {
    res.sendfile('./newStory/index.html')
})
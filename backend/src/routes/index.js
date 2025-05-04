const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Hola desde /');
});

module.exports = router;
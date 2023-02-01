const express = require('express');
const router = express.Router();

router.use('/', require('./swagger'));
router.use('/cookbookSections', require('./cookbookSections'))

module.exports = router;
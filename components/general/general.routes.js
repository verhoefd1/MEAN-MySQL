const
    express = require('express'),
    router = express.Router(),
    GeneralController = require('./general.controller');

router.get('/', GeneralController.renderHomePage);

module.exports = router;
const
    express = require('express'),
    router = express.Router(),
    GeneralController = require('./general.controller');

router.get('/', GeneralController.renderHomePage);
router.get('/about', GeneralController.renderAboutPage);

module.exports = router;
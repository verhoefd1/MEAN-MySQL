const GeneralService = require("./general.service");

class GeneralController {
    static async renderHomePage(req, res) {
        try {
            res.render('general/index');
        } catch (error) {
            console.error('Error getting index page:', error);
            res.status(500).send('Internal Server Error');
        }
    }
    static renderAboutPage(req, res) {
        res.render('about', { page: 'about' });
    }
    static renderGettingStartedPage(req, res) {
        res.render('getting-started', { page: 'getting-started' });
    }
}

module.exports = GeneralController;
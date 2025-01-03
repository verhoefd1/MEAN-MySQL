const AuthService = require('./auth.service');

class AuthController {
    static async renderRegistration(req, res) {
        try {
            res.render('auth/signup');
        } catch (error) {
            console.error('Error rendering registration page:', error);
            res.status(500).send('Server error');
        }
    }
    static async renderLogin(req, res) {
        try {
            res.render('auth/login');
        } catch (error) {
            console.error('Error rendering login page:', error);
            res.status(500).send('Server error');
        }
    }
    static async createUser(req, res) {
        console.log("made it to create user controller function")
        try {
            const userDetails = {
                userId: req.generatedUUID, //retrieved from middleware (middle ware returns req.generatedUUID)
                email: req.body.email,
                password: req.body.password,
                userType: "requestor"//req.body.userType
            };
            console.log("userDetails = ", userDetails.userId);

            await AuthService.createUser(userDetails); // pass the user object to the service to add to db
            res.redirect('/user/dashboard'); // redirect after successful registration (to dashboard)
        } catch (error) {
            console.error('Error in createUser controller:', error);
            res.status(500).send('Error creating user');
        }
    }

    static async loginUser(req, res) {

    }
}

module.exports = AuthController;
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
                firstName: req.body.firstName,
                lastName: req.body.lastName
            };
            console.log("userDetails = ", userDetails.userId);

            await AuthService.createUser(userDetails); // pass the user object to the service to add to db
            res.redirect('/'); // redirect after successful registration (to dashboard)
        } catch (error) {
            console.error('Error in createUser controller:', error);
            res.status(500).send('Error creating user');
        }
    }

    static async loginUser(req, res) {
        console.log("Made it to the login controller function");
        //get user details from body.
        try { 
            const {email, password} = req.body;
            console.log(email, password);
            if (!email || !password) {
                return res.status(400).send('Email and password are required.');
            }
            // Call the service to authenticate the user.
            const user = await AuthService.loginUser(email, password);
            if(user){
                req.session.userId = user.id
                console.log("Session set for user:", req.session.userId);
                res.redirect('/');
            } else {
                res.status(401).send("Invalid email or password");
            }
        } catch (error) {
            console.error('Error in loginUser controller:', error);
            res.status(500).send('Error logging in.');
        }
    }

    static async logoutUser(req, res) {
        delete req.session.userId;
        // Set the flash message
        req.flash('success', 'You have successfully logged out!');
        // Redirect to login (or wherever you want to show the success message)
        res.redirect('/auth/login');
    }
}

module.exports = AuthController;
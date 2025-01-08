const
    AuthService = require('./auth.service'),
    bcrypt = require('bcrypt');
;


async function createUUID(req, res, next) {
    try {
        const UUID = await AuthService.generateUUID(); //call the service to generate the UUID
        req.generatedUUID = UUID; // attach the uuid to the request object
        console.log(req.generatedUUID);
        next(); // pass control to the next middleware or route handler.
    } catch (error) {
        console.error('Error in createUUID middleware:', error);
        next(error); //pass the error to the error-handling middleware? 
    }
}

//Middleware to validate password
function validatePasswordMiddleware(req, res, next) {
    //take the password
    console.log("validating password");
    const { password } = req.body;
    console.log("captured password: ", password);
    //test to make sure it matches the password policy
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    //if it does, pass it to the password encryption 
    if (!regex.test(password)) {
        console.log("password failed validation");
        req.flash('error', 'Password must be at least 8 characters long, include an uppercase letter, a number, and a special character.');
        return res.redirect('/auth/register'); // return to registration page to reenter password
    }
    next();
};

async function hashPasswordMiddleware(req, res, next) {
    try {
        const { password } = req.body;
        if (!password) {
            return res.status(400).send('Password is required.');
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        //replace plain text password with password hash
        req.body.password = hashedPassword;
        console.log("Hashed password: ", req.body.password);
        next(); // proceed to next middleware or controller
    } catch (error) {
        console.error('Error in hashPasswordMiddleware:', error);
        return res.status(500).send('Internal server error.');
    }
}

// need password matching middleware?



module.exports = { createUUID, validatePasswordMiddleware, hashPasswordMiddleware };
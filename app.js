// initializing default variables
const
    express = require("express"),
    session = require("express-session"),
    MySQLStore = require("express-mysql-session")(session),
    app = express(),
    bodyParser = require("body-parser"),
    methodOverride = require("method-override"),
    flash = require("connect-flash"),
    serverName = "Chemical Spill",
    port = process.env.PORT || 8080,
    mysql = require("mysql2"),
    { db } = require("./utils"),
    { sessionStore } = require("./utils"),
    //userRoutes = require('./components/user/user.routes'),
    //companyRoutes = require('./components/company/company.routes'),
    //requestRoutes = require('./components/request/request.routes'),
    authRoutes = require('./components/auth/auth.routes'),
    bcrypt = require("bcrypt"),
    generalRoutes = require('./components/general/general.routes')//,
    //{ attachUserToRequest } = require('./components/user/user.middleware');
;

//serves all files in public directory to /
app.use(express.static(__dirname + "/public"));
// app.use('/bootstrap', express.static(__dirname, 'node_modules/bootstrap'));
//creates middleware link with bodyparser to be able to parse HTTPS calls
app.use(bodyParser.urlencoded({ extended: true }));
//create middleware link for handling PUT method requests: 
app.use(methodOverride('_method'));
//adds middleware to all routes without explicitly adding it ie ejs allowing to call just the name of the file in views
app.set("views", __dirname + "/views/");
app.set("view engine", "ejs");

// set up express sessions - to be removed for session storage in MySQL or REDIS
app.use(session({
    key: 'service_app_cookie',
    secret: 'alsdkfajs2-amsdkfDkj2l-a;lskfjewdfFDa',       // Replace with a secure secret key
    resave: false,                   // Forces the session to be saved back to the session store, even if it wasn't modified during the request
    store: sessionStore,
    saveUninitialized: false,        // Don't create a session until something is stored
    cookie: {
        maxAge: 1000 * 60 * 60 * 24,  // 1-day expiration
        sameSite: 'lax',  // Adjust this if needed
        secure: false  // Set to true if using HTTPS
    }
}));

//attach user profile to all routes
//app.use(attachUserToRequest);
app.use(flash());

//attach flash to all routes
app.use((req, res, next) => {
    res.locals.successMessage = req.flash('success');
    res.locals.errorMessage = req.flash('error');
    next();
});

// LOAD IN ROUTES ==================================================================================================
app.use('/', generalRoutes);
app.use('/auth', authRoutes);
//app.use('/user', userRoutes);
// app.use('/company', companyRoutes);
// app.use('/requests', requestRoutes);


app.listen(port, function () {
    // using the ${port} syntax means that it takes it as a template literaly and will pull in the port number dynamically
    console.log(serverName + " is now listening on port: " + port);
});


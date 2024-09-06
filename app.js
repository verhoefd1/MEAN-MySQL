// initializing default variables
const
    express = require("express"),
    session = require("express-session"),
    app = express(),
    bodyParser = require("body-parser"),
    serverName = "MEAN-SQL Server",
    port = process.env.PORT || 8080,
    mysql = require("mysql2"),
    bcrypt = require("bcrypt");



//serves all files in public directory to /
app.use(express.static(__dirname + "/public"));
// app.use('/bootstrap', express.static(__dirname, 'node_modules/bootstrap'));
//creates middleware link with bodyparser
app.use(bodyParser.urlencoded({ extended: true }));
//adds middleware to all routes without explicitly adding it ie ejs
app.set("views", __dirname + "/views/");
app.set("view engine", "ejs");
// set up express sessions
app.use(session({
    secret: 'alsdkfajs2-amsdkfDkj2l-a;lskfjewdfFDa',       // Replace with a secure secret key
    resave: false,                   // Forces the session to be saved back to the session store, even if it wasn't modified during the request
    saveUninitialized: false,        // Don't create a session until something is stored
    cookie: { secure: false }        // Set to `true` if you're using HTTPS; otherwise, keep it `false` for development
}));

app.get("/", function (req, res) {
    res.render("index");
});

const db = mysql.createConnection({
    host: 'app_database',
    user: 'root',
    password: '1023md-123123fj-1231j23m',
    database: 'service_db'
});


app.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL database.');
});
app.listen(port, function () {
    // using the ${port} syntax means that it takes it as a template literaly and will pull in the port number dynamically
    console.log(serverName + " is now listening on port: " + port);
});


const
    express = require('express'),
    session = require("express-session"),
    MySQLStore = require("express-mysql-session")(session),
    app = express(),
    bodyParser = require("body-parser"),
    methodOverride = require("method-override"),
    serverName = "MEAN-SQL Server",
    mysql = require("mysql2"),
    router = express.Router();

// DB CONNECTION UTILITIES
const db = mysql.createConnection({
    host: 'chem_spill_app_database',
    port: 3306,
    user: 'root',
    password: 'alsdkfajs2-amsdkfDkj2l-a;lskfjewdfFDa',
    database: 'chemical_spill_db'
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        process.exit(1);
    }
    console.log('Connected to MySQL database');
});

const sessionStore = new MySQLStore({
    host: 'chem_spill_app_database',
    port: 3306,
    user: 'root',
    password: 'alsdkfajs2-amsdkfDkj2l-a;lskfjewdfFDa',
    database: 'session_db'
});

// Auth utility Functions: 

// Password validation function
const validatePassword = (password) => {
    // Regular expression to enforce the password policy
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
};

const generateUserId = (callback) => {
    db.query('SELECT UUID() AS user_id', (err, results) => {
        if (err) throw err;             // Throw an error if the query fails
        console.log(results[0].user_id);
        callback(results[0].user_id);        // Call the callback function with the generated UUID
    });
};

const generateUUID = (returnedUUID) => {
    db.query('SELECT UUID() AS uuid', (err, results) => {
        if (err) throw err;             // Throw an error if the query fails
        console.log(results[0].uuid);
        returnedUUID(results[0].uuid);        // Call the callback function with the generated UUID
    });
};


module.exports = {
    db,
    sessionStore,
    validatePassword,
    generateUserId,
    generateUUID
};
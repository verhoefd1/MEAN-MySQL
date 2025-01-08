const { db } = require("../../utils"),
bcrypt = require("bcrypt");

class AuthService {
    static generateUUID() {
        const sql = 'SELECT UUID() AS uuid';
        return new Promise((resolve, reject) => {
            db.query(sql, (err, results) => {
                if (err) {
                    reject(err); //reject promise with an error if the query fails
                } else {
                    resolve(results[0].uuid); //resolve with generated uuid
                }
            });
        });
    }
    static async createUser(userDetails) {
        const sql = 'INSERT INTO Users (id, email, userPassword, firstName, lastName) VALUES (?, ?, ?, ?, ?)';
        const values = [userDetails.userId, userDetails.email, userDetails.password, userDetails.firstName, userDetails.lastName]

        return new Promise((resolve, reject) => {
            db.query(sql, values, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    }

    static async loginUser(email, password) {
        const sql = 'SELECT * FROM Users WHERE email = ?';
        const values = [email];

        return new Promise((resolve, reject) => {
            db.query(sql, values, async (err, results) => {
                if(err) return reject(err); 

                if(results.length > 0) {
                    const user = results[0];
                  
                    //Compare provided password with hashed password
                    const isMatch = await bcrypt.compare(password, user.userPassword);
                    if(isMatch) {
                        console.log("Password matched for user:", user.id);
                        resolve(user);
                    } else {
                        console.log("Invalid email or password", email);
                        results(null);
                    }
                } else {
                    console.log("No user found with email:", email);
                    resolve(null); // User not found
                }
            });
        });
    }
}

module.exports = AuthService;
const { db } = require("../../utils");

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
        const sql = 'INSERT INTO users (user_id, user_email, user_pass, user_type) VALUES (?, ?, ?, ?)';
        const values = [userDetails.userId, userDetails.email, userDetails.password, userDetails.userType]

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
}

module.exports = AuthService;
const connection = require("../config/database");

class Users {
  static async Register(email, password) {
    return new Promise((resolve, reject) => {
      const query = "INSERT INTO users (email, password) VALUES (?, ?)";
      connection.query(query, [email, password], function (err, result) {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  static async Login(email) {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM users WHERE email = ?";
      connection.query(query, [email], function (err, result) {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }
}

module.exports = Users;

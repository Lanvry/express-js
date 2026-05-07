const connection = require("../config/database");

class Kategori {
  static async getAll() {
    return new Promise((resolve, reject) => {
      connection.query("SELECT * FROM Kategori", function (err, data) {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }
  static async store(nama_kategori) {
    return new Promise((resolve, reject) => {
      const query = "INSERT INTO Kategori (nama_kategori) VALUES (?)";
      connection.query(query, [nama_kategori], function (err, result) {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  static async update(id_kategori, nama_kategori) {
    return new Promise((resolve, reject) => {
      const query = "UPDATE Kategori SET nama_kategori = ? WHERE id_kategori = ?";
      connection.query(query, [nama_kategori, id_kategori], function (err, result) {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  static async delete(id_kategori) {
    return new Promise((resolve, reject) => {
      const query = "DELETE FROM Kategori WHERE id_kategori = ?";
      connection.query(query, [id_kategori], function (err, result) {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  static async getById(id_kategori) {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM Kategori WHERE id_kategori = ?";
      connection.query(query, [id_kategori], function (err, result) {
        if (err) {
          reject(err);
        } else {
          resolve(result[0]);
        }
      });
    });
  }
}

module.exports = Kategori;

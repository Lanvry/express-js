const connection = require("../config/database");

class Produk {
  static async getAll() {
    return new Promise((resolve, reject) => {
      connection.query("SELECT * FROM produk", function (err, data) {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }

  static async store(nama_produk, harga, stok, id_kategori, gambar) {
    return new Promise((resolve, reject) => {
      const query = "INSERT INTO produk (nama_produk, harga, stok, id_kategori, gambar) VALUES (?, ?, ?, ?, ?)";
      connection.query(query, [nama_produk, harga, stok, id_kategori, gambar], function (err, result) {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  static async update(id_produk, nama_produk, harga, stok, id_kategori, gambar) {
    return new Promise((resolve, reject) => {
      let query = "UPDATE produk SET nama_produk = ?, harga = ?, stok = ?, id_kategori = ?";
      let params = [nama_produk, harga, stok, id_kategori];
      if (gambar) {
        query += ", gambar = ?";
        params.push(gambar);
      }
      query += " WHERE id_produk = ?";
      params.push(id_produk);

      connection.query(query, params, function (err, result) {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  static async delete(id_produk) {
    return new Promise((resolve, reject) => {
      const query = "DELETE FROM produk WHERE id_produk = ?";
      connection.query(query, [id_produk], function (err, result) {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  static async getById(id_produk) {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM produk WHERE id_produk = ?";
      connection.query(query, [id_produk], function (err, result) {
        if (err) {
          reject(err);
        } else {
          resolve(result[0]);
        }
      });
    });
  }
}

module.exports = Produk;

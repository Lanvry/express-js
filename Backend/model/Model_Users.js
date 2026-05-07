const connection = require('../config/database');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class Model_Users {

    /**
     * Mengambil semua data pengguna dari tabel users
     * Data diurutkan berdasarkan ID terbaru
     */
    static async getAll() {
        return new Promise((resolve, reject) => {
            connection.query('SELECT id_users, email FROM users ORDER BY id_users DESC', (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    /**
     * Menambahkan data pengguna baru secara umum ke dalam database
     */
    static async Store(Data) {
        return new Promise((resolve, reject) => {
            connection.query('INSERT INTO users SET ?', Data, (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    /**
     * Mencari data pengguna berdasarkan ID spesifik
     */
    static async getId(id) {
        return new Promise((resolve, reject) => {
            connection.query('SELECT id_users, email FROM users WHERE id_users = ?', [id], (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    /**
     * Memperbarui data pengguna berdasarkan ID
     */
    static async Update(id, Data) {
        return new Promise((resolve, reject) => {
            connection.query('UPDATE users SET ? WHERE id_users = ?', [Data, id], (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    /**
     * Menghapus data pengguna dari database berdasarkan ID
     */
    static async Delete(id) {
        return new Promise((resolve, reject) => {
            connection.query('DELETE FROM users WHERE id_users = ?', [id], (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    /**
     * Mencari data pengguna berdasarkan username
     * Digunakan untuk pengecekan saat registrasi dan login
     */
    static async getByEmail(email) {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM users WHERE email = ?', [email], (err, rows) => {
                if (err) reject(err);
                else resolve(rows[0]);
            });
        });
    }

    /**
     * Fungsi Registrasi: Melakukan hashing password sebelum disimpan
     */
    static async registerUser(email, password) {
        return new Promise(async (resolve, reject) => {
            try {
                const hashedPassword = await bcrypt.hash(password, 10);
                connection.query(
                    'INSERT INTO users (email, password) VALUES (?, ?)',
                    [email, hashedPassword],
                    (err, result) => {
                        if (err) reject(err);
                        else resolve(result);
                    }
                );
            } catch (error) {
                reject(error);
            }
        });
    }

    /**
     * Alias Register (Capital) untuk mendukung routes/index.js
     */
    static async Register(email, hashedPassword) {
        return new Promise((resolve, reject) => {
            connection.query(
                'INSERT INTO users (email, password) VALUES (?, ?)',
                [email, hashedPassword],
                (err, result) => {
                    if (err) reject(err);
                    else resolve(result);
                }
            );
        });
    }

    /**
     * Fungsi Login: Memverifikasi password dan menghasilkan Token JWT
     */
    static async login(email, password) {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM users WHERE email = ?';
            connection.query(sql, [email], async (err, results) => {
                if (err) return reject({ status: 500, message: 'Error pada server', error: err });

                if (results.length === 0) {
                    return reject({ status: 401, message: 'Email tidak ditemukan' });
                }

                const user = results[0];
                const isMatch = await bcrypt.compare(password, user.password);
                
                if (!isMatch) {
                    return reject({ status: 401, message: 'Password salah' });
                }

                const token = jwt.sign(
                    {
                        id: user.id_users,
                        email: user.email
                    },
                    process.env.JWT_SECRET,
                    { expiresIn: '1h' }
                );
                
                resolve({ token });
            });
        });
    }

    /**
     * Method Login (Capital) untuk mendukung routes/index.js (Session Based)
     * Mengembalikan array hasil query agar kompatibel dengan logic di index.js
     */
    static async Login(email) {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM users WHERE email = ?', [email], (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });
    }
}

module.exports = Model_Users;
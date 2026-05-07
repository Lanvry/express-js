var express = require('express');
var router = express.Router();
const Model_Users = require('../../model/Model_Users');
const multer = require('multer');
const upload = multer();

router.post('/', upload.none(), async (req, res) => {
    const email = req.body.email || req.query.email;
    const password = req.body.password || req.query.password;

    if (!email || !password) {
        return res.status(400).json({ message: 'email dan password harus diisi' });
    }

    try {
        const result = await Model_Users.login(email, password);
        res.json(result);
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message });
    }
});

module.exports = router;


var express = require('express');
var router = express.Router();
const AuthController = require('../../auth/AuthController');

router.get('/logout', AuthController.logout);

module.exports = router;